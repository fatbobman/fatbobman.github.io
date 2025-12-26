/**
 * Mock KV Storage for Local Development
 *
 * This provides an in-memory KV implementation that mimics EdgeOne KV API
 * for local development. In production, the real KV binding will be used.
 */

class MockKV {
  constructor() {
    this.storage = new Map();
    this.initialized = false;
  }

  async get(key, options = {}) {
    const value = this.storage.get(key);

    if (value === undefined) {
      return null;
    }

    const type = options.type || 'text';

    switch (type) {
      case 'json':
        try {
          return JSON.parse(value);
        } catch (e) {
          return null;
        }
      case 'text':
      default:
        return value;
    }
  }

  async put(key, value) {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    this.storage.set(key, stringValue);
  }

  async delete(key) {
    this.storage.delete(key);
  }

  async list(options = {}) {
    const { prefix, limit = 1000, cursor } = options;

    let keys = Array.from(this.storage.keys());

    if (prefix) {
      keys = keys.filter((k) => k.startsWith(prefix));
    }

    return {
      keys: keys.map((name) => ({ name })),
      complete: true,
      cursor: null,
    };
  }

  // Helper method to initialize with sample data
  async initializeSampleData() {
    if (this.initialized) {
      return;
    }

    const sampleData = {
      schedules: [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          sponsorId: 'boltai',
          startDate: '2025-12-01',
          endDate: '2025-12-07',
          enabled: true,
          variants: {
            zh: [
              {
                version: 1,
                style: 1,
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
                version: 2,
                style: 2,
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
                version: 1,
                style: 1,
                title: 'Native macOS AI Client: GPT, Claude, Gemini & Local Models',
                description:
                  'BoltAI integrates GPT, Claude, Gemini, and Ollama local models directly into your workflow. Features screen context awareness and code refactoring — built for developers.',
                cta: 'Try it now',
                link: 'https://l.fatbobman.com/sb-boltai',
                logo: 'https://cdn.fatbobman.com/sb-boltai-White512@2x.png',
                features: ['🎉 Code: BFCM25 (51% OFF)'],
                badge: 'Sponsor',
              },
              {
                version: 2,
                style: 2,
                title: 'BoltAI - AI Assistant for Developers',
                description:
                  'Native macOS app that brings multiple AI models to your fingertips. Refactor code with one click, understand screen context intelligently.',
                cta: 'Free Download',
                link: 'https://l.fatbobman.com/sb-boltai',
                logo: 'https://cdn.fatbobman.com/sb-boltai-White512@2x.png',
                features: ['🚀 Limited Offer: 51% OFF'],
                badge: 'Sponsor',
              },
            ],
          },
          notes: 'BFCM 2025 campaign',
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          sponsorId: 'proxyman',
          startDate: '2025-12-08',
          endDate: '2025-12-14',
          enabled: true,
          variants: {
            zh: [
              {
                version: 1,
                style: 1,
                title: 'Proxyman - 原生 macOS 网络调试代理',
                description:
                  '告别手动证书配置。Proxyman 使用 Atlantis 框架自动捕获和解密 HTTPs 流量。原生应用，高性能，专为 Apple Silicon 打造。',
                cta: '免费下载',
                link: 'https://l.fatbobman.com/sb-proxyman-zh',
                logo: 'https://cdn.fatbobman.com/ads/proxyman-icon-blue-trim.webp',
                logoDark: 'https://cdn.fatbobman.com/ads/proxyman-icon-red-trim.webp',
                features: ['🚀 功能: 零配置调试'],
                badge: 'Sponsor',
              },
            ],
            en: [
              {
                version: 1,
                style: 1,
                title: 'Native macOS Web Debugging Proxy',
                description:
                  'Stop manual certificate configuration. Proxyman uses the Atlantis framework to capture and decrypt HTTPs traffic automatically. Native, high-performance, and built for Apple Silicon.',
                cta: 'Free Download',
                link: 'https://l.fatbobman.com/sb-proxyman',
                logo: 'https://cdn.fatbobman.com/ads/proxyman-icon-blue-trim.webp',
                logoDark: 'https://cdn.fatbobman.com/ads/proxyman-icon-red-trim.webp',
                features: ['🚀 Feature: Zero-Config Debugging'],
                badge: 'Sponsor',
              },
            ],
          },
          notes: 'Regular sponsorship week',
        },
      ],
      default: {
        zh: [
          {
            version: 1,
            style: 1,
            title: '在此投放广告，触达 Swift 开发者',
            description: '在博客和周刊中推广您的框架、工具、服务或应用，精准触达高度专注的 iOS 和 Swift 开发者受众。',
            cta: '成为赞助商',
            link: '/zh/sponsorship/',
            logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
            badge: '示例赞助商',
          },
          {
            version: 2,
            style: 2,
            title: '在此投放广告，触达 Swift 开发者',
            description: '在博客和周刊中推广您的框架、工具、服务或应用，精准触达高度专注的 iOS 和 Swift 开发者受众。',
            cta: '成为赞助商',
            link: '/zh/sponsorship/',
            logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
            badge: '示例赞助商',
          },
        ],
        en: [
          {
            version: 1,
            style: 1,
            title: 'Reach Swift Developers. Share Your Product.',
            description:
              'Promote your framework, tool, service, or app to a highly targeted iOS & Swift developer audience across blog and newsletter placements.',
            cta: 'Become a sponsor',
            link: '/en/sponsorship/',
            logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
            badge: 'Example Sponsor',
          },
          {
            version: 2,
            style: 2,
            title: 'Reach Swift Developers. Share Your Product.',
            description:
              'Promote your framework, tool, service, or app to a highly targeted iOS & Swift developer audience across blog and newsletter placements.',
            cta: 'Become a sponsor',
            link: '/en/sponsorship/',
            logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
            badge: 'Example Sponsor',
          },
        ],
      },
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0',
      },
    };

    await this.put('adsSchedule', JSON.stringify(sampleData));
    this.initialized = true;
  }
}

// Global mock KV instance for local development
const mockKVInstance = new MockKV();

/**
 * Get KV instance - returns real KV in production, mock KV in development
 * @param {Object} env - EdgeOne environment object (not used for EdgeOne Pages)
 * @param {boolean} autoInit - Auto-initialize mock data in development
 * @returns {Promise<Object>} KV instance
 */
export async function getKV(env, autoInit = true) {
  // EdgeOne Pages binds KV as global variables (not in env object)
  // Check if test1 global variable exists (our KV binding variable name)
  if (typeof test1 !== 'undefined') {
    return test1;
  }

  // Fallback: also check env object (in case binding method changes)
  const realKV = env?.fatblog || env?.test1;
  if (realKV) {
    return realKV;
  }

  // Use mock KV for local development
  if (autoInit) {
    await mockKVInstance.initializeSampleData();
  }

  return mockKVInstance;
}

/**
 * Check if using mock KV
 * @param {Object} env - EdgeOne environment object
 * @returns {boolean}
 */
export function isMockKV(env) {
  // Check global variable first
  if (typeof test1 !== 'undefined') {
    return false;
  }
  // Fallback to env check
  return !(env?.fatblog || env?.test1);
}
