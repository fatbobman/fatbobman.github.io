function x(n){const g=n==="right"?"sidebar":"toc",u=n==="right"?"sidebar-content":"toc-content",t=document.getElementById(g),l=document.getElementById("article-area"),d=document.getElementById(u);if(!t||!l){console.error("Required elements not found");return}function p(){d&&requestAnimationFrame(()=>{d.classList.remove("invisible"),d.classList.add("visible","opacity-100")})}function h(i){for(var e=0;i;)e+=i.offsetTop,i=i.offsetParent;return e}const o=n==="right"?50:30,c=150,b=h(t),w=n==="right"?0:4;function r(){if(t.getBoundingClientRect().top<=c){const e=(window.innerWidth-l.getBoundingClientRect().width)/2;if(t.style.position="fixed",t.style.top=c+"px",n==="right")t.style.right=e-o+"px";else{const s=t.getBoundingClientRect().width;t.style.left=e-s-o+"px"}}if(window.scrollY<=b-c)if(t.style.position="absolute",t.style.top=w+"px",n==="right")t.style.right="-"+o+"px";else{const e=t.getBoundingClientRect().width;t.style.left=-(o+e)+"px"}}function a(i,e){let s=0;return function(...m){const f=new Date().getTime();f-s>=e&&(s=f,i(...m))}}document.addEventListener("scroll",a(r,16)),window.addEventListener("resize",a(r,16)),r(),p()}export{x as initFloatSidebar};
