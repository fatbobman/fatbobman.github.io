const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/subscriberModalShower.i0qlteqo.js","_astro/preload-helper.CLcXU_4U.js"])))=>i.map(i=>d[i]);
import{_ as m}from"./preload-helper.CLcXU_4U.js";const f=40*1e3,v=60*60*4*1e3,c="subcribeModalLastShownTime";let n,o={subscribeText:"",placeholder:""};function r(){const e=localStorage.getItem(c),t=Date.now();if(!e)return!0;const s=t-parseInt(e,10);return console.log("timeDiff",s),s>=v}function l(){localStorage.setItem(c,Date.now().toString())}function i(){n&&clearTimeout(n),n=setTimeout(()=>{r()?(d(),l(),m(()=>import("./subscriberModalShower.i0qlteqo.js"),__vite__mapDeps([0,1])).then(e=>{e.showModal({subscribeText:o.subscribeText,placeholder:o.placeholder})})):console.log("not load modal")},f)}function a(){["mousemove","keydown","scroll","click"].forEach(t=>{document.addEventListener(t,i)})}function d(){["mousemove","keydown","scroll","click"].forEach(t=>{document.removeEventListener(t,i)})}function u({subscribeText:e,placeholder:t}){o.subscribeText=e,o.placeholder=t,a(),i()}document.addEventListener("DOMContentLoaded",u);const L={initModalIdleChecker:u,setupEventListeners:a,removeEventListeners:d,canShowModal:r,updateLastShownTime:l};export{L as default};
