const y=document.getElementById("loadingAuth"),x=document.getElementById("mainContent"),d=document.getElementById("kvStatus"),h=document.getElementById("totalAds"),p=document.getElementById("logoutButton"),i=document.getElementById("adsList"),f=document.getElementById("createAdButton"),r=document.getElementById("adModal"),E=document.getElementById("closeModal"),k=document.getElementById("cancelButton"),v=document.getElementById("modalTitle"),l=document.getElementById("adForm");let c=null,s=null;async function b(){try{(await fetch("/api/admin/test-auth")).ok?(y.classList.add("hidden"),x.classList.remove("hidden"),w(),u()):window.location.href="/admin/login"}catch(t){console.error("Auth check failed:",t),window.location.href="/admin/login"}}async function w(){try{const t=await fetch("/test-kv?action=status"),e=await t.json();t.ok?(d.textContent=e.mode.includes("Mock")?"⚠️ Mock":"✓ Connected",d.className=e.mode.includes("Mock")?"text-2xl font-bold text-yellow-600 dark:text-yellow-400":"text-2xl font-bold text-green-600 dark:text-green-400"):(d.textContent="✗ Error",d.className="text-2xl font-bold text-red-600 dark:text-red-400")}catch{d.textContent="✗ Failed",d.className="text-2xl font-bold text-red-600 dark:text-red-400"}}async function u(){try{const t=await fetch("/api/admin/ads"),e=await t.json();t.ok&&e.success?(c=e.data,h.textContent=e.count.toString(),B(e.data.schedules)):i.innerHTML=`
            <div class="text-center py-8 text-red-600 dark:text-red-400">
              Failed to load advertisements: ${e.error||"Unknown error"}
            </div>
          `}catch(t){i.innerHTML=`
          <div class="text-center py-8 text-red-600 dark:text-red-400">
            Error: ${t.message}
          </div>
        `}}function B(t){if(t.length===0){i.innerHTML=`
          <div class="text-center py-8 text-gray-500 dark:text-gray-400">
            No advertisements yet. Click "Create New Ad" to get started.
          </div>
        `;return}i.innerHTML=t.map(e=>{const n=new Date(e.startDate)<=new Date&&new Date<=new Date(e.endDate),a=e.enabled?n?"green":"blue":"gray",o=e.enabled?n?"🟢 Active":"🔵 Scheduled":"⚪ Disabled";return`
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">
                    ${e.sponsor}
                  </h3>
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-${a}-100 dark:bg-${a}-900/30 text-${a}-700 dark:text-${a}-300">
                    ${o}
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
        `}).join(""),document.querySelectorAll(".edit-ad").forEach(e=>{e.addEventListener("click",n=>{const a=n.target.closest("button")?.dataset.id;a&&I(a)})}),document.querySelectorAll(".delete-ad").forEach(e=>{e.addEventListener("click",n=>{const a=n.target.closest("button")?.dataset.id;a&&D(a)})})}f.addEventListener("click",()=>{s=null,v.textContent="Create Advertisement",l.reset(),document.getElementById("adId").value="",document.getElementById("variants").value=JSON.stringify({zh:[{id:"example-zh-v1",title:"示例标题",description:"示例描述",cta:"了解更多",link:"https://example.com",logo:"https://example.com/logo.png",features:["特性 1","特性 2"],badge:"赞助商"}],en:[{id:"example-en-v1",title:"Example Title",description:"Example description",cta:"Learn More",link:"https://example.com",logo:"https://example.com/logo.png",features:["Feature 1","Feature 2"],badge:"Sponsor"}]},null,2),r.classList.remove("hidden")});function I(t){const e=c.schedules.find(n=>n.id===t);e&&(s=t,v.textContent="Edit Advertisement",document.getElementById("adId").value=e.id,document.getElementById("sponsor").value=e.sponsor,document.getElementById("startDate").value=e.startDate,document.getElementById("endDate").value=e.endDate,document.getElementById("enabled").value=e.enabled.toString(),document.getElementById("notes").value=e.notes||"",document.getElementById("variants").value=JSON.stringify(e.variants,null,2),r.classList.remove("hidden"))}E.addEventListener("click",()=>r.classList.add("hidden"));k.addEventListener("click",()=>r.classList.add("hidden"));l.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData(l);let n;try{n=JSON.parse(document.getElementById("variants").value)}catch{alert("Invalid JSON in variants field. Please check your syntax.");return}const a={id:s,sponsor:e.get("sponsor"),startDate:e.get("startDate"),endDate:e.get("endDate"),enabled:e.get("enabled")==="true",notes:e.get("notes"),variants:n};try{const m=await fetch("/api/admin/ads",{method:s?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),g=await m.json();m.ok&&g.success?(r.classList.add("hidden"),u()):alert(`Failed to save: ${g.error||"Unknown error"}`)}catch(o){alert(`Error: ${o.message}`)}});async function D(t){const e=c.schedules.find(n=>n.id===t);if(e&&confirm(`Are you sure you want to delete the advertisement for "${e.sponsor}"?`))try{const n=await fetch(`/api/admin/ads?id=${t}`,{method:"DELETE"}),a=await n.json();n.ok&&a.success?u():alert(`Failed to delete: ${a.error||"Unknown error"}`)}catch(n){alert(`Error: ${n.message}`)}}p.addEventListener("click",()=>{document.cookie="admin_session=; Path=/; Max-Age=0",window.location.href="/admin/login"});b();
