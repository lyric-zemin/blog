import{_ as s,c as a,o as n,O as l}from"./chunks/framework.403748ff.js";const F=JSON.parse('{"title":"bind","description":"javascript中bind的一些用法","frontmatter":{"title":"bind","description":"javascript中bind的一些用法","aside":false,"date":"2022-9-25","tags":["javascript"]},"headers":[],"relativePath":"posts/javascript/bind.md"}'),o={name:"posts/javascript/bind.md"},p=l(`<h1 id="javascript中bind的一些用法" tabindex="-1">javascript中bind的一些用法 <a class="header-anchor" href="#javascript中bind的一些用法" aria-label="Permalink to &quot;javascript中bind的一些用法&quot;">​</a></h1><h2 id="绑定-this" tabindex="-1">绑定 this <a class="header-anchor" href="#绑定-this" aria-label="Permalink to &quot;绑定 this&quot;">​</a></h2><blockquote><p>只能绑定一次 this，并返回一个新函数</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fun </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fun2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fun</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bind</span><span style="color:#A6ACCD;">(someThis)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="绑定参数" tabindex="-1">绑定参数 <a class="header-anchor" href="#绑定参数" aria-label="Permalink to &quot;绑定参数&quot;">​</a></h2><blockquote><p>可以一次绑定多个参数，并返回一个新函数</p></blockquote><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fun </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fun2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fun</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bind</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> arg1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> arg2)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fun3 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fun2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bind</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">null,</span><span style="color:#A6ACCD;"> arg3</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> arg4)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(fun3</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div>`,7),t=[p];function e(c,r,i,D,A,C){return n(),a("div",null,t)}const d=s(o,[["render",e]]);export{F as __pageData,d as default};
