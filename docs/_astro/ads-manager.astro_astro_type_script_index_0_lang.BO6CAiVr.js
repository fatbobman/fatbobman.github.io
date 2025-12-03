const E=document.getElementById("loadingAuth"),x=document.getElementById("mainContent"),c=document.getElementById("kvStatus"),I=document.getElementById("totalAds"),B=document.getElementById("logoutButton"),f=document.getElementById("adsList"),k=document.getElementById("createAdButton"),g=document.getElementById("adModal"),b=document.getElementById("closeModal"),L=document.getElementById("cancelButton"),p=document.getElementById("modalTitle"),v=document.getElementById("adForm"),D=document.getElementById("editDefaultButton"),h=document.getElementById("defaultAdModal"),w=document.getElementById("closeDefaultModal"),A=document.getElementById("cancelDefaultButton"),$=document.getElementById("defaultAdForm"),S=document.getElementById("validateDefaultButton"),J=document.getElementById("defaultZhTitle"),M=document.getElementById("defaultEnTitle");let i=null,m=null;async function N(){try{(await fetch("/api/admin/test-auth")).ok?(E.classList.add("hidden"),x.classList.remove("hidden"),T(),y()):window.location.href="/admin/login"}catch(n){console.error("Auth check failed:",n),window.location.href="/admin/login"}}async function T(){try{const n=await fetch("/test-kv?action=status"),e=await n.json();n.ok?(c.textContent=e.mode.includes("Mock")?"⚠️ Mock":"✓ Connected",c.className=e.mode.includes("Mock")?"text-2xl font-bold text-yellow-600 dark:text-yellow-400":"text-2xl font-bold text-green-600 dark:text-green-400"):(c.textContent="✗ Error",c.className="text-2xl font-bold text-red-600 dark:text-red-400")}catch{c.textContent="✗ Failed",c.className="text-2xl font-bold text-red-600 dark:text-red-400"}}async function y(){try{const n=await fetch("/api/admin/ads"),e=await n.json();n.ok&&e.success?(i=e.data,I.textContent=e.count.toString(),C(e.data.schedules),e.data.default&&(J.textContent=e.data.default.zh?.title||"Not configured",M.textContent=e.data.default.en?.title||"Not configured")):f.innerHTML=`
            <div class="text-center py-8 text-red-600 dark:text-red-400">
              Failed to load advertisements: ${e.error||"Unknown error"}
            </div>
          `}catch(n){f.innerHTML=`
          <div class="text-center py-8 text-red-600 dark:text-red-400">
            Error: ${n.message}
          </div>
        `}}function C(n){if(n.length===0){f.innerHTML=`
          <div class="text-center py-8 text-gray-500 dark:text-gray-400">
            No advertisements yet. Click "Create New Ad" to get started.
          </div>
        `;return}f.innerHTML=n.map(e=>{const t=new Date(e.startDate)<=new Date&&new Date<=new Date(e.endDate),a=e.enabled?t?"green":"blue":"gray",d=e.enabled?t?"🟢 Active":"🔵 Scheduled":"⚪ Disabled";return`
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">
                    ${e.sponsorId}
                  </h3>
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-${a}-100 dark:bg-${a}-900/30 text-${a}-700 dark:text-${a}-300">
                    ${d}
                  </span>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>📅 ${e.startDate} → ${e.endDate}</div>
                  <div>🌐 Variants: ${e.variants.zh?.length||0} Chinese, ${e.variants.en?.length||0} English</div>
                  ${e.notes?`<div>📝 ${e.notes}</div>`:""}
                </div>
              </div>
              <div class="flex items-center gap-2 ml-4">
                <button
                  class="edit-ad px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  data-id="${e.id}"
                >
                  ✏️ Edit
                </button>
                <button
                  class="delete-ad px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  data-id="${e.id}"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        `}).join(""),document.querySelectorAll(".edit-ad").forEach(e=>{e.addEventListener("click",t=>{const a=t.target.closest("button")?.dataset.id;a&&O(a)})}),document.querySelectorAll(".delete-ad").forEach(e=>{e.addEventListener("click",t=>{const a=t.target.closest("button")?.dataset.id;a&&j(a)})})}k.addEventListener("click",()=>{m=null,p.textContent="Create Advertisement",v.reset(),document.getElementById("adId").value="",document.getElementById("variants").value=JSON.stringify({zh:[{version:1,style:1,title:"示例标题",description:"示例描述",cta:"了解更多",link:"https://example.com",logo:"https://example.com/logo.png",features:["特性 1","特性 2"],badge:"赞助商"},{version:2,style:2,title:"简洁标题",description:"像文章内容一样的描述文字",cta:"优惠信息 →",link:"https://example.com",logo:"https://example.com/icon.png",badge:"本期赞助"}],en:[{version:1,style:1,title:"Example Title",description:"Example description",cta:"Learn More",link:"https://example.com",logo:"https://example.com/logo.png",features:["Feature 1","Feature 2"],badge:"Sponsor"}]},null,2),g.classList.remove("hidden")});function O(n){const e=i.schedules.find(t=>t.id===n);e&&(m=n,p.textContent="Edit Advertisement",document.getElementById("adId").value=e.id,document.getElementById("sponsorId").value=e.sponsorId,document.getElementById("startDate").value=e.startDate,document.getElementById("endDate").value=e.endDate,document.getElementById("enabled").value=e.enabled.toString(),document.getElementById("notes").value=e.notes||"",document.getElementById("variants").value=JSON.stringify(e.variants,null,2),g.classList.remove("hidden"))}b.addEventListener("click",()=>g.classList.add("hidden"));L.addEventListener("click",()=>g.classList.add("hidden"));v.addEventListener("submit",async n=>{n.preventDefault();const e=new FormData(v);let t;try{t=JSON.parse(document.getElementById("variants").value)}catch{alert("Invalid JSON in variants field. Please check your syntax.");return}const a={id:m,sponsorId:e.get("sponsorId"),startDate:e.get("startDate"),endDate:e.get("endDate"),enabled:e.get("enabled")==="true",notes:e.get("notes"),variants:t};try{const s=await fetch("/api/admin/ads",{method:m?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),l=await s.json();s.ok&&l.success?(g.classList.add("hidden"),y()):alert(`Failed to save: ${l.error||"Unknown error"}`)}catch(d){alert(`Error: ${d.message}`)}});async function j(n){const e=i.schedules.find(t=>t.id===n);if(e&&confirm(`Are you sure you want to delete the advertisement for "${e.sponsorId}"?`))try{const t=await fetch(`/api/admin/ads?id=${n}`,{method:"DELETE"}),a=await t.json();t.ok&&a.success?y():alert(`Failed to delete: ${a.error||"Unknown error"}`)}catch(t){alert(`Error: ${t.message}`)}}D.addEventListener("click",()=>{!i||!i.default||(document.getElementById("defaultZhJson").value=JSON.stringify(i.default.zh,null,2),document.getElementById("defaultEnJson").value=JSON.stringify(i.default.en,null,2),document.getElementById("zhValidationErrors")?.classList.add("hidden"),document.getElementById("enValidationErrors")?.classList.add("hidden"),h.classList.remove("hidden"))});w.addEventListener("click",()=>h.classList.add("hidden"));A.addEventListener("click",()=>h.classList.add("hidden"));S.addEventListener("click",()=>{const n=document.getElementById("defaultZhJson").value,e=document.getElementById("defaultEnJson").value,t=[],a=[];let d,o;try{d=JSON.parse(n)}catch{t.push("Invalid JSON format")}try{o=JSON.parse(e)}catch{a.push("Invalid JSON format")}d&&(["id","title","description","cta","link","logo","badge"].forEach(u=>{d[u]||t.push(`Missing field: ${u}`)}),d.features!==void 0&&!Array.isArray(d.features)&&t.push("features must be an array (or omit it)")),o&&(["id","title","description","cta","link","logo","badge"].forEach(u=>{o[u]||a.push(`Missing field: ${u}`)}),o.features!==void 0&&!Array.isArray(o.features)&&a.push("features must be an array (or omit it)"));const s=document.getElementById("zhValidationErrors"),l=document.getElementById("enValidationErrors");t.length>0?(s.classList.remove("hidden"),s.querySelector("ul").innerHTML=t.map(r=>`<li>${r}</li>`).join("")):s.classList.add("hidden"),a.length>0?(l.classList.remove("hidden"),l.querySelector("ul").innerHTML=a.map(r=>`<li>${r}</li>`).join("")):l.classList.add("hidden"),t.length===0&&a.length===0&&alert("✅ Validation passed! All fields are valid.")});$.addEventListener("submit",async n=>{n.preventDefault();const e=document.getElementById("defaultZhJson").value,t=document.getElementById("defaultEnJson").value;let a,d;try{a=JSON.parse(e),d=JSON.parse(t)}catch{alert("Invalid JSON format. Please check your data.");return}try{const o=await fetch("/api/admin/ads?action=update-default",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({zh:a,en:d})}),s=await o.json();if(o.ok&&s.success)h.classList.add("hidden"),y(),alert("✅ Default advertisement updated successfully!");else{const l=s.error||"Unknown error",r=s.details?`

Details:
`+(Array.isArray(s.details)?s.details.join(`
`):s.details):"";alert(`Failed to save: ${l}${r}`)}}catch(o){alert(`Error: ${o.message}`)}});B.addEventListener("click",()=>{document.cookie="admin_session=; Path=/; Max-Age=0",window.location.href="/admin/login"});N();
