if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const d=e=>n(e,o),t={module:{uri:o},exports:c,require:d};i[o]=Promise.all(r.map((e=>t[e]||d(e)))).then((e=>(s(...e),c)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-721fd428.css",revision:null},{url:"assets/index-ebfb397f.js",revision:null},{url:"index.html",revision:"d647b4f8a30ec7145c5470a90063ec5b"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"6b8f04f5a6afa41cf2a8e2da04d9c7e4"},{url:"apple-touch-icon.png",revision:"1fd440e8b933d35db4904bafe7c15b44"},{url:"android-chrome-192x192.png",revision:"63cd7d9228818c8852631b4f79902660"},{url:"android-chrome-512x512.png",revision:"ba1ccdd7392d5c8d54871cb4aadeff74"},{url:"maskable_icon.png",revision:"eb7347f2ee10ee3d6e65abb408e29aba"},{url:"manifest.webmanifest",revision:"30c7437d5b6472d57cf1452ce2261374"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
