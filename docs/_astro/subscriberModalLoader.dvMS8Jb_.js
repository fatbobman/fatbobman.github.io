const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/subscriberModalShower.i0qlteqo.js","_astro/preload-helper.CLcXU_4U.js"])))=>i.map(i=>d[i]);
import{_ as f}from"./preload-helper.CLcXU_4U.js";const v=40*1e3,b=60*60*4*1e3,c="subcribeModalLastShownTime";let i,o={subscribeText:"",placeholder:""},n=!1;document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&n&&(r(),n=!1)});function l(){const e=localStorage.getItem(c),t=Date.now();return e?t-parseInt(e,10)>=b:!0}function a(){localStorage.setItem(c,Date.now().toString())}function s(){i&&clearTimeout(i),i=setTimeout(()=>{l()?(u(),a(),document.visibilityState==="visible"?r():n=!0):console.log("not load modal")},v)}function r(){f(()=>import("./subscriberModalShower.i0qlteqo.js"),__vite__mapDeps([0,1])).then(e=>{e.showModal({subscribeText:o.subscribeText,placeholder:o.placeholder})})}function d(){["mousemove","keydown","scroll","click"].forEach(t=>{document.addEventListener(t,s)})}function u(){["mousemove","keydown","scroll","click"].forEach(t=>{document.removeEventListener(t,s)})}function m({subscribeText:e,placeholder:t}){o.subscribeText=e,o.placeholder=t,d(),s()}document.addEventListener("DOMContentLoaded",m);const h={initModalIdleChecker:m,setupEventListeners:d,removeEventListeners:u,canShowModal:l,updateLastShownTime:a};export{h as default};
