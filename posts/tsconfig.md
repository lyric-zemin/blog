---
title: tsconfig
description: tsconfig配置文件解析
aside: false
date: 2022-10-8
tags:
  - typescript
---

# tsconfig配置文件解析

```ts
{
  "include": ["src/**/*"], // ts应用目录
  "exclude": ["test.ts"], // 对include中文件进行过滤
  "compilerOptions": { // 编译相关配置
    "jsx": "preserve", // 保留jsx
    "target": "esnext", // 最终编译的文件支持的js版本
    "module": "esnext", // 编译module时支持的方式
    "moduleResolution": "node", // 引入依赖库的方式
    "outDir": "./build" , // 编译好的js文件输出目录
    "rootDir": "./" , // 指定根路径（可以指定多个根路径）
    "strict": true , // 启用严格模式
    "noImplicitAny": true , // 不允许any类型
    "strictNullChecks": true, // 严格判空
    "esModuleInterop": true, // 模块默认值导出方式处理不同
    "skipLibCheck": true , // 跳过库文件类型检查
    "forceConsistentCasingInFileNames": true // 强制文件名大小写敏感
  }
}
```
