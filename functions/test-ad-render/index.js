/**
 * Test Ad Rendering
 *
 * Test endpoint to preview ad rendering with different data
 * GET /test-ad-render?variant=0&lang=zh
 */

import { renderAd } from '../_shared/ad-renderer.js';
import { CSS_VARIABLES, TAILWIND_CONFIG } from '../_shared/test-styles.js';

// Sample ad data for testing
const testAds = {
  zh: [
    {
      id: 'test-zh-v1',
      title: 'Mac 原生 AI 客户端：聚合 GPT、Claude 及本地模型',
      description: 'BoltAI 将 GPT、Claude、Gemini 和 Ollama 本地模型集成到你的工作流中。支持屏幕感知与代码重构，真正属于开发者的原生神器。',
      cta: '立即试用',
      link: 'https://l.fatbobman.com/sb-boltai-zh',
      logo: 'https://cdn.fatbobman.com/sb-boltai-White512@2x.png',
      features: [
        {
          content: {
            text: '🎉 优惠码: <span class="font-bold font-mono">BFCM25</span> <span class="opacity-80">(51% OFF)</span>',
            html: true
          },
          enabled: true,
          highlight: true
        }
      ],
      badge: 'Sponsor',
      showSponsorLink: true,
      sponsorLinkText: '成为赞助商'
    },
    {
      id: 'test-zh-v2',
      title: {
        text: 'BoltAI - <span class="text-orange-700 dark:text-blue-300">开发者的 AI 神器</span>',
        html: true
      },
      description: '原生 macOS 应用，无缝整合多个 AI 模型。一键重构代码，智能理解屏幕内容，让 AI 真正成为你的编程助手。',
      cta: '免费下载',
      link: 'https://l.fatbobman.com/sb-boltai-zh',
      logo: 'https://cdn.fatbobman.com/sb-boltai-White512@2x.png',
      features: ['🚀 限时优惠 51% OFF'],
      badge: 'Sponsor'
    },
    {
      id: 'test-zh-v3',
      title: 'Proxyman - 原生 macOS 网络调试代理',
      description: {
        text: '告别手动证书配置。Proxyman 使用 <strong class="text-orange-700 dark:text-blue-400">Atlantis 框架</strong>自动捕获和解密 HTTPs 流量。',
        html: true
      },
      cta: '免费下载',
      link: 'https://l.fatbobman.com/sb-proxyman-zh',
      logo: 'https://cdn.fatbobman.com/ads/proxyman-icon-blue-trim.webp',
      logoDark: 'https://cdn.fatbobman.com/ads/proxyman-icon-red-trim.webp',
      features: [
        {
          content: '🚀 功能: 零配置调试',
          enabled: true,
          highlight: true
        }
      ],
      badge: 'Sponsor'
    },
    {
      id: 'test-zh-v4',
      title: '示例产品 - 无促销',
      description: '这是一个没有特殊促销信息的广告示例。依然保持简洁优雅的展示效果。',
      cta: '了解更多',
      link: '/zh/sponsorship/',
      logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
      features: [],
      badge: 'Sponsor',
      showSponsorLink: false
    }
  ],
  en: [
    {
      id: 'test-en-v1',
      title: 'Native macOS AI Client: GPT, Claude, Gemini & Local Models',
      description: 'BoltAI integrates GPT, Claude, Gemini, and Ollama local models directly into your workflow. Features screen context awareness and code refactoring — built for developers.',
      cta: 'Try it now',
      link: 'https://l.fatbobman.com/sb-boltai',
      logo: 'https://cdn.fatbobman.com/sb-boltai-White512@2x.png',
      features: [
        {
          content: {
            text: '🎉 Code: <span class="font-bold font-mono">BFCM25</span> <span class="opacity-80">(51% OFF)</span>',
            html: true
          },
          enabled: true,
          highlight: true
        }
      ],
      badge: 'SPONSOR',
      showSponsorLink: true,
      sponsorLinkText: 'Become a sponsor'
    },
    {
      id: 'test-en-v2',
      title: 'Example Product - No Promotion',
      description: 'This is an example ad without special promotional features. Still maintains a clean and elegant display.',
      cta: 'Learn More',
      link: '/en/sponsorship/',
      logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
      features: [],
      badge: 'SPONSOR',
      showSponsorLink: false
    }
  ]
};

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  const lang = url.searchParams.get('lang') || 'zh';
  const variantIndex = parseInt(url.searchParams.get('variant') || '0', 10);
  const format = url.searchParams.get('format') || 'html'; // html or json

  const variants = testAds[lang] || testAds.zh;
  const adData = variants[variantIndex] || variants[0];

  if (format === 'json') {
    return new Response(JSON.stringify(adData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // Render HTML
  const adHtml = renderAd(adData, lang);

  // Wrap in a complete HTML page for testing
  const htmlPage = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ad Render Test - Variant ${variantIndex}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = ${JSON.stringify(TAILWIND_CONFIG)}
  </script>
  <style>
    ${CSS_VARIABLES}

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(to bottom, #f3f4f6, #e5e7eb);
      min-height: 100vh;
      padding: 2rem;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    .controls {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .preview-area {
      background: white;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="controls">
      <h1 class="text-2xl font-bold mb-4">广告渲染测试 / Ad Render Test</h1>
      <div class="flex gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium mb-1">Language:</label>
          <select id="lang" class="border rounded px-3 py-2">
            <option value="zh" ${lang === 'zh' ? 'selected' : ''}>中文 (Chinese)</option>
            <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Variant:</label>
          <select id="variant" class="border rounded px-3 py-2">
            ${variants.map((v, i) => `<option value="${i}" ${i === variantIndex ? 'selected' : ''}>${v.id}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Dark Mode:</label>
          <button id="darkToggle" class="border rounded px-4 py-2 hover:bg-gray-100">
            Toggle
          </button>
        </div>
      </div>
      <button id="refresh" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Refresh Preview
      </button>
    </div>

    <div class="preview-area" id="preview">
      ${adHtml}
    </div>

    <div class="controls mt-4">
      <h2 class="text-lg font-bold mb-2">Ad Data (JSON):</h2>
      <pre class="bg-gray-100 p-4 rounded overflow-auto text-xs">${escapeHtml(JSON.stringify(adData, null, 2))}</pre>
    </div>
  </div>

  <script>
    const lang = document.getElementById('lang');
    const variant = document.getElementById('variant');
    const refresh = document.getElementById('refresh');
    const darkToggle = document.getElementById('darkToggle');
    const preview = document.getElementById('preview');

    refresh.addEventListener('click', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang.value);
      url.searchParams.set('variant', variant.value);
      window.location.href = url.toString();
    });

    darkToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
    });

    // Update variant options when language changes
    lang.addEventListener('change', () => {
      variant.selectedIndex = 0;
    });
  </script>
</body>
</html>
  `;

  return new Response(htmlPage, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
