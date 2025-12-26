/**
 * KV Storage Test Edge Function
 *
 * Test endpoints:
 * - GET  /test-kv?action=read&key=xxx     - Read a key
 * - GET  /test-kv?action=write&key=xxx    - Write test data
 * - GET  /test-kv?action=list             - List all keys
 * - GET  /test-kv?action=init             - Initialize with sample data
 * - GET  /test-kv?action=delete&key=xxx   - Delete a key
 */

import { getKV, isMockKV } from '../_shared/mock-kv.js';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const action = url.searchParams.get('action') || 'status';
  const key = url.searchParams.get('key') || 'ads-schedule';

  // Get KV instance (real or mock)
  // Always auto-initialize mock KV with sample data
  const kv = await getKV(env, true);
  const usingMock = isMockKV(env);

  try {
    let result;

    switch (action) {
      case 'read':
        result = await handleRead(kv, key);
        break;

      case 'write':
        result = await handleWrite(kv, key, url.searchParams.get('value'));
        break;

      case 'list':
        result = await handleList(kv, url.searchParams.get('prefix'));
        break;

      case 'init':
        result = await handleInit(kv);
        break;

      case 'delete':
        result = await handleDelete(kv, key);
        break;

      case 'status':
      default:
        result = {
          status: 'KV Test Function Ready',
          mode: usingMock ? '🔧 Development (Mock KV)' : '🚀 Production (Real KV)',
          namespace: 'fatblog (ns-z9VoO3Bn2kL6)',
          boundAs: env.fatblog ? 'fatblog' : env.test1 ? 'test1' : 'mock',
          note: usingMock ? 'Using in-memory mock KV for local development' : 'Connected to EdgeOne KV storage',
          debug: {
            envKeys: Object.keys(env || {}),
            hasTest1: !!env.test1,
            hasFatblog: !!env.fatblog,
            envType: typeof env,
            test1Type: typeof env.test1,
            fatblogType: typeof env.fatblog,
          },
          availableActions: [
            'read - Read a key value',
            'write - Write test data',
            'list - List all keys',
            'init - Initialize with sample advertisement data',
            'delete - Delete a key',
          ],
          examples: [
            '/test-kv?action=status',
            '/test-kv?action=init',
            '/test-kv?action=list',
            '/test-kv?action=read&key=ads-schedule',
            '/test-kv?action=write&key=test&value=hello',
            '/test-kv?action=delete&key=test',
          ],
        };
    }

    return new Response(JSON.stringify(result, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

async function handleRead(kv, key) {
  // Try to get as text first
  const rawValue = await kv.get(key, { type: 'text' });

  // Try to parse as JSON if it looks like JSON
  let value = rawValue;
  if (rawValue && (rawValue.startsWith('{') || rawValue.startsWith('['))) {
    try {
      value = JSON.parse(rawValue);
    } catch (e) {
      // Keep as text if JSON parsing fails
      value = rawValue;
    }
  }

  return {
    action: 'read',
    key: key,
    found: rawValue !== null,
    value: value,
    timestamp: new Date().toISOString(),
  };
}

async function handleWrite(kv, key, value) {
  const data = value || `Test data written at ${new Date().toISOString()}`;
  await kv.put(key, typeof data === 'string' ? data : JSON.stringify(data));

  return {
    action: 'write',
    key: key,
    success: true,
    message: 'Data written successfully',
    timestamp: new Date().toISOString(),
  };
}

async function handleList(kv, prefix) {
  const options = prefix ? { prefix } : {};
  const list = await kv.list(options);

  return {
    action: 'list',
    prefix: prefix || 'all',
    complete: list.complete,
    count: list.keys.length,
    keys: list.keys.map((k) => k.name),
    timestamp: new Date().toISOString(),
  };
}

async function handleDelete(kv, key) {
  await kv.delete(key);

  return {
    action: 'delete',
    key: key,
    success: true,
    message: 'Key deleted successfully',
    timestamp: new Date().toISOString(),
  };
}

async function handleInit(kv) {
  // Sample advertisement schedule data
  const sampleData = {
    schedules: [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        sponsor: 'BoltAI',
        startDate: '2025-12-01',
        endDate: '2025-12-07',
        enabled: true,
        variants: {
          zh: [
            {
              id: 'boltai-zh-v1',
              title: 'Mac 原生 AI 客户端：聚合 GPT、Claude 及本地模型',
              description:
                'BoltAI 将 GPT、Claude、Gemini 和 Ollama 本地模型集成到你的工作流中。支持屏幕感知与代码重构，真正属于开发者的原生神器。',
              cta: '立即试用',
              link: 'https://l.fatbobman.com/sb-boltai-zh',
              logo: 'https://cdn.fatbobman.com/sb-boltai-White512@2x.png',
              features: ['🎉 优惠码: BFCM25 (51% OFF)'],
              badge: 'Sponsor',
            },
            {
              id: 'boltai-zh-v2',
              title: 'BoltAI - 开发者的 AI 神器',
              description:
                '原生 macOS 应用，无缝整合多个 AI 模型。一键重构代码，智能理解屏幕内容，让 AI 真正成为你的编程助手。',
              cta: '免费下载',
              link: 'https://l.fatbobman.com/sb-boltai-zh',
              logo: 'https://cdn.fatbobman.com/sb-boltai-White512@2x.png',
              features: ['🚀 限时优惠 51% OFF'],
              badge: 'Sponsor',
            },
          ],
          en: [
            {
              id: 'boltai-en-v1',
              title: 'Native macOS AI Client: GPT, Claude, Gemini & Local Models',
              description:
                'BoltAI integrates GPT, Claude, Gemini, and Ollama local models directly into your workflow. Features screen context awareness and code refactoring — built for developers.',
              cta: 'Try it now',
              link: 'https://l.fatbobman.com/sb-boltai',
              logo: 'https://cdn.fatbobman.com/sb-boltai-White512@2x.png',
              features: ['🎉 Code: BFCM25 (51% OFF)'],
              badge: 'Sponsor',
            },
          ],
        },
        notes: 'BFCM 2025 campaign',
      },
    ],
    default: {
      zh: {
        id: 'default-zh',
        title: '在此投放广告，触达 Swift 开发者',
        description: '在博客和周刊中推广您的框架、工具、服务或应用，精准触达高度专注的 iOS 和 Swift 开发者受众。',
        cta: '成为赞助商',
        link: '/zh/sponsorship/',
        logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
        badge: '示例赞助商',
      },
      en: {
        id: 'default-en',
        title: 'Reach Swift Developers. Share Your Product.',
        description:
          'Promote your framework, tool, service, or app to a highly targeted iOS & Swift developer audience across blog and newsletter placements.',
        cta: 'Become a sponsor',
        link: '/en/sponsorship/',
        logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
        badge: 'Example Sponsor',
      },
    },
    metadata: {
      lastUpdated: new Date().toISOString(),
      version: '1.0',
    },
  };

  await kv.put('ads-schedule', JSON.stringify(sampleData));

  return {
    action: 'init',
    success: true,
    message: 'Sample advertisement data initialized',
    dataSize: JSON.stringify(sampleData).length,
    schedulesCount: sampleData.schedules.length,
    timestamp: new Date().toISOString(),
    nextSteps: ['Visit /test-kv?action=read&key=ads-schedule to verify', 'Visit /test-kv?action=list to see all keys'],
  };
}
