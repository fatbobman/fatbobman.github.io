const I=document.getElementById("loadingAuth"),B=document.getElementById("mainContent"),c=document.getElementById("kvStatus"),k=document.getElementById("totalAds"),b=document.getElementById("logoutButton"),f=document.getElementById("adsList"),L=document.getElementById("createAdButton"),g=document.getElementById("adModal"),D=document.getElementById("closeModal"),A=document.getElementById("cancelButton"),x=document.getElementById("modalTitle"),E=document.getElementById("adForm"),w=document.getElementById("editDefaultButton"),y=document.getElementById("defaultAdModal"),$=document.getElementById("closeDefaultModal"),S=document.getElementById("cancelDefaultButton"),J=document.getElementById("defaultAdForm"),M=document.getElementById("validateDefaultButton"),v=document.getElementById("defaultZhTitle"),p=document.getElementById("defaultEnTitle");let i=null,m=null;async function N(){try{(await fetch("/api/admin/test-auth")).ok?(I.classList.add("hidden"),B.classList.remove("hidden"),T(),h()):window.location.href="/admin/login"}catch(a){console.error("Auth check failed:",a),window.location.href="/admin/login"}}async function T(){try{const a=await fetch("/test-kv?action=status"),e=await a.json();a.ok?(c.textContent=e.mode.includes("Mock")?"⚠️ Mock":"✓ Connected",c.className=e.mode.includes("Mock")?"text-2xl font-bold text-yellow-600 dark:text-yellow-400":"text-2xl font-bold text-green-600 dark:text-green-400"):(c.textContent="✗ Error",c.className="text-2xl font-bold text-red-600 dark:text-red-400")}catch{c.textContent="✗ Failed",c.className="text-2xl font-bold text-red-600 dark:text-red-400"}}async function h(){try{const a=await fetch("/api/admin/ads"),e=await a.json();if(a.ok&&e.success){if(i=e.data,k.textContent=e.count.toString(),C(e.data.schedules),e.data.default){const t=e.data.default.zh;Array.isArray(t)?v.innerHTML=t.map(d=>`<div class="mb-1"><strong>v${d.version}</strong> (style ${d.style||1}): ${d.title||"Untitled"}</div>`).join(""):t?v.textContent=t.title||"Not configured":v.textContent="Not configured";const n=e.data.default.en;Array.isArray(n)?p.innerHTML=n.map(d=>`<div class="mb-1"><strong>v${d.version}</strong> (style ${d.style||1}): ${d.title||"Untitled"}</div>`).join(""):n?p.textContent=n.title||"Not configured":p.textContent="Not configured"}}else f.innerHTML=`
            <div class="text-center py-8 text-red-600 dark:text-red-400">
              Failed to load advertisements: ${e.error||"Unknown error"}
            </div>
          `}catch(a){f.innerHTML=`
          <div class="text-center py-8 text-red-600 dark:text-red-400">
            Error: ${a.message}
          </div>
        `}}function C(a){if(a.length===0){f.innerHTML=`
          <div class="text-center py-8 text-gray-500 dark:text-gray-400">
            No advertisements yet. Click "Create New Ad" to get started.
          </div>
        `;return}f.innerHTML=a.map(e=>{const t=new Date(e.startDate)<=new Date&&new Date<=new Date(e.endDate),n=e.enabled?t?"green":"blue":"gray",d=e.enabled?t?"🟢 Active":"🔵 Scheduled":"⚪ Disabled";return`
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">
                    ${e.sponsorId}
                  </h3>
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-${n}-100 dark:bg-${n}-900/30 text-${n}-700 dark:text-${n}-300">
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
        `}).join(""),document.querySelectorAll(".edit-ad").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.closest("button")?.dataset.id;n&&O(n)})}),document.querySelectorAll(".delete-ad").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.closest("button")?.dataset.id;n&&j(n)})})}L.addEventListener("click",()=>{m=null,x.textContent="Create Advertisement",E.reset(),document.getElementById("adId").value="",document.getElementById("variants").value=JSON.stringify({zh:[{version:1,style:1,title:"示例标题",description:"示例描述",cta:"了解更多",link:"https://example.com",logo:"https://example.com/logo.png",features:["特性 1","特性 2"],badge:"赞助商"},{version:2,style:2,title:"简洁标题",description:"像文章内容一样的描述文字",cta:"优惠信息 →",link:"https://example.com",logo:"https://example.com/icon.png",badge:"本期赞助"}],en:[{version:1,style:1,title:"Example Title",description:"Example description",cta:"Learn More",link:"https://example.com",logo:"https://example.com/logo.png",features:["Feature 1","Feature 2"],badge:"Sponsor"}]},null,2),g.classList.remove("hidden")});function O(a){const e=i.schedules.find(t=>t.id===a);e&&(m=a,x.textContent="Edit Advertisement",document.getElementById("adId").value=e.id,document.getElementById("sponsorId").value=e.sponsorId,document.getElementById("startDate").value=e.startDate,document.getElementById("endDate").value=e.endDate,document.getElementById("enabled").value=e.enabled.toString(),document.getElementById("notes").value=e.notes||"",document.getElementById("variants").value=JSON.stringify(e.variants,null,2),g.classList.remove("hidden"))}D.addEventListener("click",()=>g.classList.add("hidden"));A.addEventListener("click",()=>g.classList.add("hidden"));E.addEventListener("submit",async a=>{a.preventDefault();const e=new FormData(E);let t;try{t=JSON.parse(document.getElementById("variants").value)}catch{alert("Invalid JSON in variants field. Please check your syntax.");return}const n={id:m,sponsorId:e.get("sponsorId"),startDate:e.get("startDate"),endDate:e.get("endDate"),enabled:e.get("enabled")==="true",notes:e.get("notes"),variants:t};try{const s=await fetch("/api/admin/ads",{method:m?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),l=await s.json();s.ok&&l.success?(g.classList.add("hidden"),h()):alert(`Failed to save: ${l.error||"Unknown error"}`)}catch(d){alert(`Error: ${d.message}`)}});async function j(a){const e=i.schedules.find(t=>t.id===a);if(e&&confirm(`Are you sure you want to delete the advertisement for "${e.sponsorId}"?`))try{const t=await fetch(`/api/admin/ads?id=${a}`,{method:"DELETE"}),n=await t.json();t.ok&&n.success?h():alert(`Failed to delete: ${n.error||"Unknown error"}`)}catch(t){alert(`Error: ${t.message}`)}}w.addEventListener("click",()=>{!i||!i.default||(document.getElementById("defaultZhJson").value=JSON.stringify(i.default.zh,null,2),document.getElementById("defaultEnJson").value=JSON.stringify(i.default.en,null,2),document.getElementById("zhValidationErrors")?.classList.add("hidden"),document.getElementById("enValidationErrors")?.classList.add("hidden"),y.classList.remove("hidden"))});$.addEventListener("click",()=>y.classList.add("hidden"));S.addEventListener("click",()=>y.classList.add("hidden"));M.addEventListener("click",()=>{const a=document.getElementById("defaultZhJson").value,e=document.getElementById("defaultEnJson").value,t=[],n=[];let d,o;try{d=JSON.parse(a)}catch{t.push("Invalid JSON format")}try{o=JSON.parse(e)}catch{n.push("Invalid JSON format")}d&&(["id","title","description","cta","link","logo","badge"].forEach(u=>{d[u]||t.push(`Missing field: ${u}`)}),d.features!==void 0&&!Array.isArray(d.features)&&t.push("features must be an array (or omit it)")),o&&(["id","title","description","cta","link","logo","badge"].forEach(u=>{o[u]||n.push(`Missing field: ${u}`)}),o.features!==void 0&&!Array.isArray(o.features)&&n.push("features must be an array (or omit it)"));const s=document.getElementById("zhValidationErrors"),l=document.getElementById("enValidationErrors");t.length>0?(s.classList.remove("hidden"),s.querySelector("ul").innerHTML=t.map(r=>`<li>${r}</li>`).join("")):s.classList.add("hidden"),n.length>0?(l.classList.remove("hidden"),l.querySelector("ul").innerHTML=n.map(r=>`<li>${r}</li>`).join("")):l.classList.add("hidden"),t.length===0&&n.length===0&&alert("✅ Validation passed! All fields are valid.")});J.addEventListener("submit",async a=>{a.preventDefault();const e=document.getElementById("defaultZhJson").value,t=document.getElementById("defaultEnJson").value;let n,d;try{n=JSON.parse(e),d=JSON.parse(t)}catch{alert("Invalid JSON format. Please check your data.");return}try{const o=await fetch("/api/admin/ads?action=update-default",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({zh:n,en:d})}),s=await o.json();if(o.ok&&s.success)y.classList.add("hidden"),h(),alert("✅ Default advertisement updated successfully!");else{const l=s.error||"Unknown error",r=s.details?`

Details:
`+(Array.isArray(s.details)?s.details.join(`
`):s.details):"";alert(`Failed to save: ${l}${r}`)}}catch(o){alert(`Error: ${o.message}`)}});b.addEventListener("click",()=>{document.cookie="admin_session=; Path=/; Max-Age=0",window.location.href="/admin/login"});N();
