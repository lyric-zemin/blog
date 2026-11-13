---
title: 从零搭建一个无服务端聊天房
description: 基于开源项目 pchat，拆解如何用 Next.js + PeerJS（WebRTC）实现一个一对一、点对点直连、零后端、连场景都在本地生成的聊天房
aside: false
date: 2026-11-13
tags:
  - webrtc
  - peerjs
  - nextjs
  - typescript
---

# 从零搭建一个无服务端聊天房

![pchat 落地页：凭暗号赴约](./pchat-cover.png)

> 源码：[lyric-zemin/pchat](https://github.com/lyric-zemin/pchat) · 线上体验：[lyric-zemin.github.io/pchat](https://lyric-zemin.github.io/pchat/)

pchat 是「一处会随时间变暗的房间」——一个极简的一对一视频聊天房。生成一组暗号开一间房，把暗号递给对方，对方凭暗号推门而入，两人视频相见、发消息、一起调灯光壁炉与天气；窗外的天色跟着真实时钟在清晨、白昼、黄昏、夜晚之间缓慢流转。

它的特别之处不在于功能多，而在于 **「无服务端」做得相当彻底**：音视频与文字都不经过应用服务器，消息不落盘，关掉页面就散了。本文就聊聊这套架构是怎么从零搭起来的。

## 一、全景：什么是「无服务端」

无服务端不是说没有「服务器」二字，而是**应用不再承担任何业务状态的存储与转发**。真正必须的只有一台极轻量的「信令服务器」，它只在两端初次见面时牵个线、交换一下连接信息，之后音视频与文字全部走浏览器之间的 P2P（WebRTC），应用后端完全不存在。

```
                公共/自建信令（仅牵线）
                 PeerJS Cloud 或 自建 PeerServer
                        │ 交换 SDP / ICE
                        ▼
  访客浏览器 ─────────── 点对点直连 ─────────── 房主浏览器
   (WebRTC)     音视频(MediaConnection)       (WebRTC)
                + 文字/氛围(DataConnection)    媒体与数据都不经服务器
```

也就是说，哪怕你把整套前端静态托管在 GitHub Pages 上（连 Node 进程都没有），两个人照样能视频聊天——因为「房间」本身只存在于两端的浏览器内存里。

## 二、暗号即地址：不需要房间目录服务器

普通聊天室需要一个「房间目录」来登记谁在哪个房间，这通常得有个后端数据库。pchat 巧妙地绕开了它：**用暗号本身派生出房主的 Peer ID**。

PeerJS 里每个节点都有一个唯一 ID，别人用这个 ID 就能直接连过来。如果暗号能确定性地映射成一个 ID，那么「同一串暗号总是指向同一间房」就自然成立，根本不需要任何目录服务。

核心在 `src/lib/peer/code.ts`：

```ts
/** 同一串文字（忽略大小写、空格与标点）永远得到同一把钥匙。 */
export function normalizeCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

/**
 * 暗号 → 确定性房主 Peer ID。PeerJS 没有房间目录，这层派生让
 *「凭暗号找到对方」不需要任何后端；非安全上下文下退化为本地哈希。
 */
export async function deriveHostId(raw: string): Promise<string> {
  const input = `pchat:v1:${normalizeCode(raw)}`;
  let hex: string | null = null;
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const digest = await crypto.subtle
      .digest("SHA-256", new TextEncoder().encode(input))
      .catch(() => null);
    if (digest) {
      hex = Array.from(new Uint8Array(digest))
        .slice(0, 8)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
  }
  return `pchat-${hex ?? fallbackHash(input)}`;
}
```

几个设计要点：

- **暗号规范化**：忽略大小写、空格、连字符、易混字符（O/I/L/0/1 在生成时就从字母表剔除），所以 `MIST-7K2`、`mist7k2`、`M I S T 7 K 2` 都指向同一间房，用户复制粘贴不会踩坑。
- **SHA-256 派生**：`pchat:v1:` 前缀 + 规范化后的暗号做哈希，取前 8 字节作为 Host ID。同样的暗号，任何人在任何设备上都会算出同一个 ID，于是「凭暗号赴约」就等于「连接到这个 ID」。
- **无主后端**：访客用随机 `Guest ID` 连接，房主用确定性 `Host ID` 等待。谁先开房谁就是这个 ID 的持有者，第二个人用同一暗号「开房」会因 ID 已被占用而失败——这正好实现了「一暗号一房」。

```ts
export function randomGuestId(): string {
  return `pchat-${randomId("g")}`;
}
```

## 三、连接链路：PeerJS 只做牵线，WebRTC 扛流量

pchat 用 [PeerJS](https://peerjs.com/) 简化了 WebRTC 的复杂度。默认零配置走 PeerJS 官方公共信令（`0.peerjs.com`），牵完线媒体走 P2P。如果你想完全自持，复制 `.env.example` 为 `.env.local` 即可切到自建 PeerServer——业务代码一行都不用改。

`src/lib/peer/config.ts` 把环境变量逐个静态读取，让 Next.js 在构建期把配置内联进客户端包：

```ts
export function getPeerConfig(): PeerRuntimeConfig {
  const debug: 0 | 1 = process.env.NODE_ENV === "development" ? 1 : 0;
  const host = (process.env.NEXT_PUBLIC_PEER_HOST ?? "").trim();

  if (!host) {
    return { options: { debug }, source: "cloud", description: "PeerJS 官方公共信令" };
  }

  const portRaw = (process.env.NEXT_PUBLIC_PEER_PORT ?? "").trim();
  // ...读取 path / secure / key
  const secure = secureRaw ? secureRaw === "true" : portRaw === "443" || !portRaw;
  const port = Number(portRaw) || (secure ? 443 : 9000);
  return { options: { host, port, path: pathRaw || "/", secure, key: keyRaw || "peerjs", debug }, source: "self", description: `${host}:${port}` };
}
```

真正的连接编排在 `src/lib/peer/usePeerRoom.ts` 的 `createRoom` / `joinRoom` 里。房主侧：

```ts
const peer = new PeerClient(hostId, config.options); // 用暗号派生的确定性 ID
peerRef.current = peer;

peer.on("open", () => {
  useRoomStore.getState().setPhase("waiting");
  state.setNotice("房间已经点亮，把暗号递给对方吧");
  playCue("door");
});
peer.on("connection", (conn) => {
  // 一对一守卫：第二个连接只收到「满房」提示，随即关闭
  if (dataRef.current?.open) {
    conn.on("open", () => {
      conn.send({ type: "room-full" });
      later(() => safe(() => conn.close()), 400);
    });
    return;
  }
  attachData(conn);
});
peer.on("call", (call) => {
  // 房主只应答，不主动拨打
  call.answer(localRef.current ?? undefined);
  attachCall(call);
});
```

访客侧则约定**只由访客发起呼叫**，避免双方同时拨号导致协商冲突：

```ts
const conn = peer.connect(hostId, { reliable: true });  // 凭房主 ID 直连
attachData(conn);
conn.on("open", () => {
  send({ type: "hello", nickname: current.nickname });
});
if (localRef.current) {
  const call = peer.call(hostId, localRef.current); // 访客发起媒体呼叫
  if (call) attachCall(call);
}
```

一条 `DataConnection` 承载文字、氛围、时段与进出信令；一条 `MediaConnection` 承载音视频流——两者都走 P2P，不经过应用服务器。

## 四、房间状态机：zustand 把「仪式感」管起来

聊天房的生命周期是个典型状态机：`lobby → entering → waiting → connected → leaving`。pchat 用 zustand 单 store 统一管理，所有 UI 直接订阅切片。

`src/types/room.ts` 定义了一组清晰的联合类型：

```ts
export type Phase = "lobby" | "entering" | "waiting" | "connected" | "leaving";

export interface RoomSnapshot {
  phase: TimePhase;
  timeOverride: TimePhase | null;
  autoTime: boolean;
  atmosphere: AtmosphereState;
  hostNickname: string;
  guestNickname: string;
  hostMedia: MediaState;
}
```

离开时的「熄灯、合门、告别反馈」都在这个状态机里闭环：点「离开」先发 `leave` 信令、切到 `leaving` 阶段、播放告别音效，再延迟把连接拆掉、回到 `lobby`。

```ts
const leaveRoom = useCallback((reason = "manual") => {
  const state = useRoomStore.getState();
  if (state.phase === "lobby" || closingRef.current) return;
  closingRef.current = true;
  clearWelcomeTimer();
  if (reason === "manual") send({ type: "leave", reason: "manual" });
  state.setPhase("leaving");
  state.setNotice("你把灯关了，门正在合上…");
  playCue("leave");
  finishLeave(1600); // 1.6s 后真正拆连接、复位
}, [send, finishLeave, clearWelcomeTimer]);
```

对端收到 `leave` 后也会播放同一段告别音效，于是「对方起身告辞了，灯慢慢暗下去」在两边都看得到——这就是 pchat 想传达的那点人情味。

## 五、环境自然：四段天色 + 房主是时间权威

pchat 最有记忆点的设计是**窗外的天色随真实时钟流转**。一天被切成四段，每段一套配色与文案：

| 时段 | 本机时间 | 窗外 |
|------|---------|------|
| 清晨 dawn | 05:00–08:00 | 蜜色薄雾，光从窗沿慢慢爬进来 |
| 白昼 day | 08:00–17:00 | 通透浅蓝，云影缓慢漂移 |
| 黄昏 dusk | 17:00–20:00 | 橘红晚霞，暖光渐浓 |
| 夜晚 night | 20:00–05:00 | 深蓝星火，灯与壁炉成为主光源 |

`src/lib/time/phases.ts` 把每段主题色抽成数据结构，并写到根元素的 CSS 变量上，让所有玻璃浮层一起换天色：

```ts
export function phaseForHour(hour: number): TimePhase {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}

/** 把当前时段写进根元素的 CSS 变量，让所有玻璃浮层一起换天色。 */
export function applySceneVars(theme: PhaseTheme) {
  const style = document.documentElement.style;
  style.setProperty("--scene-sky-top", theme.skyTop);
  style.setProperty("--scene-sky-bottom", theme.skyBottom);
  style.setProperty("--scene-glow", theme.glow);
  style.setProperty("--stage-ink", theme.ink);
}
```

关键问题是「两端必须看到同一片天色」。pchat 的做法是：**开房方担任时间权威**，每分钟检查一次本地时钟，变化了就向访客广播 `time-sync`；访客在房内完全听房主广播，自己不跑时钟，避免两端时区不同看到两片天色。

```ts
// useSceneClock.ts
const tick = () => {
  const state = useRoomStore.getState();
  if (!state.autoTime) return;
  if (state.role === "guest" && state.phase !== "lobby") return; // 访客不自主走时
  const next = currentPhase(new Date());
  if (next !== state.scenePhase) state.setScenePhase(next);
  if (state.role === "host" && state.phase !== "lobby") {
    broadcastRef.current?.(next, true); // 房主广播给访客
  }
};
window.setInterval(tick, 60_000);
```

访客侧只接受房主的下发（`time-sync` 仅在 `role === "guest"` 时生效），并且天色切换用约 1.2 秒的交叉淡入过渡，不会突然跳色。房主也能手动「预览时段」，访客会同步跟着切。

整个协议（`src/lib/peer/protocol.ts`）对每一条进来的消息都先做**白名单校验再进状态机**，脏消息直接丢弃，避免把界面带崩——这是 P2P 场景里很重要的一道安全闸门。

## 六、零素材的氛围：Web Audio 合成提示音

你听见的敲门声、开门声、对方进门的提示音，**全部由 Web Audio 实时合成，不加载任何音频文件**。这样整个站点才能做到「零图片、零音频素材、零后端」。

```ts
// audio/cues.ts —— 敲门：三下三角波 + 低频噪声
case "knock":
  [0, 0.19, 0.4].forEach((offset, index) => {
    tone(c, 168 - index * 9, t + offset, 0.11, 0.15, "triangle", 92);
    noise(c, t + offset, 0.07, 0.055, 800);
  });
  break;
```

`playCue` 内部用一个共享的 `AudioContext`，首次用户交互后才 `resume()`（浏览器自动播放策略要求），并且把静音偏好存进 `localStorage`，跨房间保留。

## 七、优雅降级：没有摄像头也能用

`getUserMedia` 只在 HTTPS 或 localhost 下可用，而且设备随时可能被占用、权限随时可能被撤回。pchat 把媒体采集写成一条**逐级降级链**：完整音视频 → 仅声音 → 仅画面 → 纯文字。任一级失败都不抛错，房间照样能进。

```ts
// lib/media.ts
export async function acquireLocalMedia(facing = DEFAULT_FACING): Promise<MediaResult> {
  const full = await attempt(constraintsFor(facing));
  if (full) return { stream: full, hasVideo: true, hasAudio: true };

  const audioOnly = await attempt({ audio: MEDIA_CONSTRAINTS.audio, video: false });
  if (audioOnly) return { stream: audioOnly, note: "没打开摄像头，对方暂时只能听见你。", hasVideo: false, hasAudio: true };

  const videoOnly = await attempt({ video: constraintsFor(facing).video, audio: false });
  if (videoOnly) return { stream: videoOnly, note: "麦克风被占用了，对方暂时听不到你。", hasVideo: true, hasAudio: false };

  return { stream: null, note: "摄像头和麦克风都没打开，房间里还能用文字和氛围聊天。", hasVideo: false, hasAudio: false };
}
```

更细致的是，它会监听轨道的 `ended` 事件（比如来电、切后台、权限被撤回），自动重新采集，并通过 `RTCRtpSender.replaceTrack` 热替换轨道，**对端无需重新协商**。

## 八、部署：纯静态，连 Node 进程都没有

因为没有任何后端，pchat 可以直接静态导出丢到 GitHub Pages。发布时 CI 注入 `STATIC_EXPORT=true` 与 `NEXT_PUBLIC_BASE_PATH=/pchat`，走 Next.js 的 `output: 'export'` 把站点导出到 `out/`，再上传。本地的 `dev/build/start` 仍走默认服务端构建，互不影响。

```bash
npm install
npm run dev          # 本地开发，http://localhost:3000
npm run build        # 生产构建
npm run typecheck    # tsc --noEmit
```

想完全自持信令的话，本地起一个 PeerServer 即可：

```bash
npx --yes peer --port 9000 --path / --key peerjs
```

> 注意：服务端包名是 `peer`，但它提供的命令恰好叫 `peerjs`；`peerjs` 本身是浏览器客户端库、没有可执行命令，直接 `npx peerjs` 会报找不到可执行文件。

## 九、踩坑与可扩展

几个实践中值得记下的点：

- **公共信令的可用性**：默认用 PeerJS Cloud 做牵线，它偶尔不稳定。两端若长时间「正在敲门」，多半是信令暂时不可达或暗号打错；自建 PeerServer 能彻底摆脱这个依赖。
- **同一暗号一房**：第二个人用同一暗号「开房」会撞上已存在的 Host ID，得到「暗号已被占用」；第三人加入则收到「房间里已经有两个人了」——这两个守卫分别在 `deriveHostId` 的 ID 占用和 `peer.on("connection")` 的一对一判定里实现。
- **局域网联调**：`http://192.168.x.x` 下浏览器会拒绝摄像头，要么套一层 HTTPS 反向代理，要么给 Chrome 加 `chrome://flags/#unsafely-treat-insecure-origin-as-secure` 白名单。
- **可扩展方向**：目前消息不落盘是刻意为之（关页面即散），但若想做「断线重连补消息」可加一个内存环形缓冲；氛围系统也可接真实天气 API 让窗外跟随真实气象，而不只是本机时钟。

## 结语

pchat 把「无服务端」这件事往前推到了一个比较彻底的程度上：没有房间目录（暗号派生 ID）、没有业务后端（PeerJS 信令 + WebRTC 直连）、没有素材服务器（音视频与场景全本地生成）。它证明了一个有趣的结论——**很多「需要一个后端」的场景，其实只是需要一个确定性的地址和一个牵线人**，而这两件事，浏览器自己就能搞定。

如果你也想做一个「关掉就散、不留痕迹」的小空间，不妨从 `deriveHostId` 这一行 SHA-256 开始。

> 完整实现见 [lyric-zemin/pchat](https://github.com/lyric-zemin/pchat)，技术栈：Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS · PeerJS · framer-motion · zustand · Web Audio · CSS/SVG。
