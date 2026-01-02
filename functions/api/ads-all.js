/**
 * 获取所有广告数据 (用于预览)
 *
 * 从 KV 读取完整的广告数据,包括所有排期广告和默认广告
 * 无需身份验证,公开访问
 *
 * Usage: GET /api/ads-all
 *
 * 返回示例:
 * {
 *   "schedules": [
 *     {
 *       "id": "...",
 *       "sponsorId": "boltai",
 *       "startDate": "2025-12-01",
 *       "endDate": "2025-12-07",
 *       "enabled": true,
 *       "variants": {
 *         "zh": [{ "version": 1, "style": 1, ... }],
 *         "en": [{ "version": 1, "style": 1, ... }]
 *       }
 *     }
 *   ],
 *   "default": {
 *     "zh": [{ "version": 1, "style": 1, ... }],
 *     "en": [{ "version": 1, "style": 1, ... }]
 *   },
 *   "metadata": {
 *     "lastUpdated": "2025-12-04T...",
 *     "version": "1.0"
 *   }
 * }
 */

import { getKV } from '../_shared/mock-kv.js';

const ADS_KEY = 'adsSchedule';

export async function onRequestGet(context) {
  const { env } = context;

  // CORS headers - 允许所有来源
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=60, stale-while-revalidate=300', // 缓存 1 分钟
  });

  try {
    // 获取 KV 实例
    const kv = await getKV(env, false);

    // 从 KV 读取广告数据
    const rawData = await kv.get(ADS_KEY, { type: 'text' });

    if (!rawData) {
      // 如果 KV 中没有数据,返回空结构
      const emptyData = {
        schedules: [],
        default: {
          zh: [],
          en: []
        },
        metadata: {
          lastUpdated: null,
          version: '0.0'
        }
      };

      return new Response(JSON.stringify(emptyData, null, 2), {
        status: 200,
        headers,
      });
    }

    // 解析并重新序列化 JSON 以确保格式正确
    // 这样可以修复 KV 中可能存在的未转义字符问题
    let parsedData;
    try {
      parsedData = JSON.parse(rawData);
    } catch (parseError) {
      console.error('[ads-all] Failed to parse KV data:', parseError);
      return new Response(JSON.stringify({
        error: 'Invalid JSON in KV storage',
        details: parseError.message,
        schedules: [],
        default: { zh: [], en: [] },
        metadata: { lastUpdated: null, version: 'parse-error' }
      }, null, 2), {
        status: 500,
        headers,
      });
    }

    // 返回格式化的 JSON
    return new Response(JSON.stringify(parsedData, null, 2), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('[ads-all] Error fetching ads data:', error);

    return new Response(JSON.stringify({
      error: 'Failed to fetch ads data',
      details: error.message,
      schedules: [],
      default: { zh: [], en: [] },
      metadata: { lastUpdated: null, version: 'error' }
    }, null, 2), {
      status: 500,
      headers,
    });
  }
}

// 支持 CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
}
