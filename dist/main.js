/*! For license information please see main.js.LICENSE.txt */
!function(){"use strict";var e,t,n,r={447:function(e,t,n){n(294),n(935);document.body.appendChild(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"hello world",t=document.createElement("div");return t.innerHTML=e,t.className="rounded bg-red-100 border max-w-md m-4 p-4",t.onclick=function(){n.e(34).then(n.bind(n,34)).then((function(e){t.textContent=e.default})).catch((function(e){return console.log(e)}))},t}())}},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={exports:{}};return r[e](n,n.exports,i),n.exports}i.m=r,e=[],i.O=function(t,n,r,o){if(!n){var u=1/0;for(f=0;f<e.length;f++){n=e[f][0],r=e[f][1],o=e[f][2];for(var c=!0,a=0;a<n.length;a++)(!1&o||u>=o)&&Object.keys(i.O).every((function(e){return i.O[e](n[a])}))?n.splice(a--,1):(c=!1,o<u&&(u=o));if(c){e.splice(f--,1);var l=r();void 0!==l&&(t=l)}}return t}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[n,r,o]},i.f={},i.e=function(e){return Promise.all(Object.keys(i.f).reduce((function(t,n){return i.f[n](e,t),t}),[]))},i.u=function(e){return e+".js"},i.miniCssF=function(e){},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t={},n="webpack-demo:",i.l=function(e,r,o,u){if(t[e])t[e].push(r);else{var c,a;if(void 0!==o)for(var l=document.getElementsByTagName("script"),f=0;f<l.length;f++){var d=l[f];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==n+o){c=d;break}}c||(a=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.setAttribute("data-webpack",n+o),c.src=e),t[e]=[r];var s=function(n,r){c.onerror=c.onload=null,clearTimeout(p);var o=t[e];if(delete t[e],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((function(e){return e(r)})),n)return n(r)},p=setTimeout(s.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=s.bind(null,c.onerror),c.onload=s.bind(null,c.onload),a&&document.head.appendChild(c)}},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e}(),function(){var e={179:0};i.f.j=function(t,n){var r=i.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var o=new Promise((function(n,o){r=e[t]=[n,o]}));n.push(r[2]=o);var u=i.p+i.u(t),c=new Error;i.l(u,(function(n){if(i.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.src;c.message="Loading chunk "+t+" failed.\n("+o+": "+u+")",c.name="ChunkLoadError",c.type=o,c.request=u,r[1](c)}}),"chunk-"+t,t)}},i.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,o,u=n[0],c=n[1],a=n[2],l=0;if(u.some((function(t){return 0!==e[t]}))){for(r in c)i.o(c,r)&&(i.m[r]=c[r]);if(a)var f=a(i)}for(t&&t(n);l<u.length;l++)o=u[l],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(f)},n=self.webpackChunkwebpack_demo=self.webpackChunkwebpack_demo||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var u=i.O(void 0,[736],(function(){return i(447)}));u=i.O(u)}();
//# sourceMappingURL=main.js.map