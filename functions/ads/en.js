const visionOS2025Ad = `
      <div>
        <a href="https://t.ly/4j2kO" target="_blank">
          <div
            class="p-4 bg-orange-100/70 dark:bg-blue-800 border border-orange-300 dark:border-blue-700 rounded-lg shadow-md mt-0 flex flex-col sm:flex-row items-center relative hover:bg-orange-200 dark:hover:bg-blue-700 space-y-0"
          >
            <div class="absolute top-0 right-0 dark:text-blue-200 text-secondary text-xs font-bold rounded mt-2 mr-4">Join Now</div>
            <img
              src="https://cdn.fatbobman.com/ads/wwdc2024.playground.svg"
              alt="let's visionOS 2025"
              style="width: 6rem; height: 6rem;"
              width="96"
              height="96" 
              class="mr-0 sm:mr-4 mb-4 sm:mb-0 hidden sm:block"
              loading="lazy"
              decoding="async"
            />
            <div class="space-y-2">
              <style>
                .align-infinity {
                  vertical-align: 0.1em; /* 调整垂直位置 */
                }
              </style>
              <span class="text-xl font-bold text-orange-700 dark:text-blue-200 align-infinity"
                >Spatial Computing + AI + iOS</span
              ><span class="text-3xl font-bold text-orange-700 dark:text-blue-200"> ∞</span>
              <div class="text-gray-700 dark:text-gray-300 leading-normal font-normal pb-2">
                Join developers from around the world at the
              
                <strong class="text-orange-700 dark:text-blue-200 leading-tight">Let's Vision 2025</strong>, 
                held in <strong class="text-orange-700 dark:text-blue-200 leading-tight">Shanghai, China, from March 1 to March 2, 2025</strong>.
              </div>
              <!-- <div class="text-sm text-gray-600 dark:text-gray-400 italic leading-loose font-medium">赶快报名，不要错过这场技术盛宴！</div> -->
            </div>
          </div>
          <div class="flex justify-center py-2">
            <div
              class="text-default text-xs font-normal hover:text-secondary hover:font-bold cursor-pointer"
              onclick="window.location.href='/en/sponsorship/';"
            >
              Advertise on Blog & Newsletter &rarr;
            </div>
          </div>
        </a>
      </div>
`

const midstAd = `
      <div>
        <a href="https://t.ly/hym2p" target="_blank">
          <div
            class="p-4 bg-orange-100/70 dark:bg-blue-900 border border-orange-300 dark:border-blue-700 rounded-lg shadow-md mt-0 flex flex-col sm:flex-row items-center relative hover:bg-orange-200 dark:hover:bg-blue-800 space-y-0"
          >
            <div class="absolute top-0 right-0 text-secondary text-xs font-bold rounded mt-2 mr-4">SPONSOR</div>
            <img
              src="https://cdn.fatbobman.com/ads/midst-light.webp"
              alt="Midst"
              style="width: 6rem; height: 6rem;"
              class="mr-0 sm:mr-4 mb-4 sm:mb-0 hidden sm:block dark:hidden"
            />
            <img
              src="https://cdn.fatbobman.com/ads/midst-dark.webp"
              alt="Midst"
              style="width: 6rem; height: 6rem;"
              class="mr-0 sm:mr-4 mb-4 sm:mb-0 hidden dark:hidden sm:dark:block"
              loading="lazy"
              decoding="async"
            />
            <div class="space-y-2">
              <style>
                .align-infinity {
                  vertical-align: 0.1em; /* 调整垂直位置 */
                }
              </style>
              <span class="text-xl font-bold text-orange-700 dark:text-blue-400 align-infinity"
                >The Midst: A location first information network.</span
              >
              <div class="text-gray-700 dark:text-gray-300 leading-normal font-normal pb-2">
                Join a platform that allows you to pan across the map to discover what people are sharing across cities,
                countries, and the world.
              </div>
              <!-- <div class="text-sm text-gray-600 dark:text-gray-400 italic leading-loose font-medium">赶快报名，不要错过这场技术盛宴！</div> -->
              <p class="mt-2 text-sm text-orange-700 dark:text-blue-400 italic font-medium">
                Download on the App Store
              </p>
            </div>
          </div>
          <div class="flex justify-center py-2">
            <div
              class="text-default text-xs font-normal hover:text-secondary hover:font-bold cursor-pointer"
              onclick="window.location.href='/en/sponsorship/';"
            >
              Advertise on Blog & Newsletter &rarr;
            </div>
          </div>
        </a>
      </div>
`

const healthNotesAd = `
<div>
  <a href="https://t.ly/7Qg6u" target="_blank" id="ads">
    <div class="p-4 bg-orange-100/70 dark:bg-blue-800 border border-orange-300 dark:border-blue-700 rounded-lg shadow-md mt-0 flex flex-col sm:flex-row items-center relative hover:bg-orange-200 dark:hover:bg-blue-700 space-y-0">
      <div class="hidden sm:block absolute top-0 right-0 dark:text-blue-200 text-secondary text-xs font-bold rounded mt-2 mr-4">App</div>
      <img
              src="https://cdn.fatbobman.com/healthnotes-logo.svg"
              alt="Heath Notes Logo"
              style="width: 4.5rem; height: 4.5rem; margin-left: 1.0rem; margin-right: 1.5rem;"
              width="72"
              height="72" 
              class="mr-0 mb-4 sm:mb-0 hidden sm:block rounded-lg"
              loading="lazy"
              decoding="async"
      />
      <div class="space-y-2 pr-1">
        <span class="text-xl font-bold text-orange-700 dark:text-blue-200 leading-tight">Your Health, Your Data, Your Control</span>
        <div class="text-gray-700 dark:text-gray-300 leading-normal font-normal">
          Health Notes: A versatile iOS, iPad, and macOS app empowering you to create custom health data types, tailored to your unique life and wellness tracking needs.
        </div>
        <p class="mt-2 text-sm text-orange-700 dark:text-blue-200 italic font-medium">Download on the App Store</p>
      </div>
    </div>
  </a>
  <div class="flex justify-center py-2">
     <div 
         class="text-default text-xs font-normal hover:text-secondary hover:font-bold cursor-pointer"
         onclick="window.location.href='/en/sponsorship/';"
     >
     Advertise on Blog & Newsletter &rarr;
     </div>
  </div>
</div>
`;

const getRandomContent = () => {
  const randomIndex = Math.floor(Math.random() * ads.length);
  return ads[randomIndex];
};

const ads = [
  healthNotesAd,
  visionOS2025Ad,
  // midstAd,
]


const currentAd = `
<div class="pt-4 pb-0">
        <a href="https://t.ly/7Qg6u" target="blank" id="ads-wwdc2024">
        <div
          class="flex flex-col px-4 py-6 rounded-lg border-orange-400 dark:border-blue-500 bg-block cursor-pointer relative shadow-lg"
          style="border-width:1.5px;"
        >
          <div class="absolute top-0 right-0 bg-secondary text-invert text-xs rounded px-2 py-0.5 mt-2 mr-2" style="position: absolute; top: -18px; right: 20px;">App</div>
          <div class="mb-4">
            <span
            class="text-2xl font-bold text-transparent bg-clip-text"
            style="
            background-image: linear-gradient(to right, #f59e0b, #f87171, #7c3aed);
            animation: gradient 4s ease infinite;
            background-size: 150% 200%;
            "
          >
              HEALTH NOTES
            </span>
          </div>
          <span class="text-heading text-sm font-normal">
            Capture your health journey your way with Health Notes. This iOS, iPad, and macOS app features flexible, user-defined data types for comprehensive health monitoring.
            <span class="text-secondary font-semibold"> Download on the App Store</span>
          </span>
        </div>
        </a>
      </div>
      <style>
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      </style>
`

const startTime = new Date('2024-05-28T00:00:00Z');
const endTime = new Date('2024-05-29T00:00:00Z');

export async function onRequest(context) {
  const allowedOrigins = [
    'http://localhost:4321',
    'https://fatbobman.com',
    'https://fatbobman.github.io',
    'https://blogsource.edgeone.site'
  ];

  const request = context.request;
  const origin = request.headers.get('Origin');
  const now = new Date();
  const headers = new Headers({
    'content-type': 'text/html; charset=UTF-8',
  });

  // 动态设置 CORS
  if (allowedOrigins.includes(origin)) {
    headers.append('Access-Control-Allow-Origin', origin);
    headers.append('Vary', 'Origin');
  }

  // 判断返回固定广告还是随机广告
  let ad;
  let cacheDuration;
  if (now >= startTime && now <= endTime) {
    ad = currentAd; // 固定广告
    cacheDuration = 1200; // 20 分钟
    headers.append('Cache-Control', `public, max-age=${cacheDuration}, stale-while-revalidate=3600`);
  } else {
    ad = getRandomContent(); // 随机广告
    cacheDuration = 300; // 5分钟
    headers.append('Cache-Control', `public, max-age=${cacheDuration}, stale-while-revalidate=60`);
  }

  // 生成 ETag
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ad));
  const etag = `"${btoa(String.fromCharCode(...new Uint8Array(hash)))}"`;

  if (request.headers.get('If-None-Match') === etag) {
    return new Response(null, { status: 304, headers });
  }

  headers.append('ETag', etag);

  // 返回广告内容
  return new Response(ad, { headers });
}
