/**
 * Public Advertisement Data API
 *
 * Returns all advertisement data for preview purposes
 * No authentication required - read-only endpoint
 *
 * Usage: GET /api/ads-data
 */

import { getKV } from '../_shared/mock-kv.js';

const ADS_KEY = 'adsSchedule';

export async function onRequest(context) {
  const { request, env } = context;

  // Only allow GET requests
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // CORS headers - allow all origins for public API
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Max-Age': '86400',
  });

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    // Get KV instance
    const kv = await getKV(env, false);

    // Read ads data from KV
    const rawData = await kv.get(ADS_KEY, { type: 'text' });

    if (!rawData) {
      return new Response(
        JSON.stringify({
          error: 'No ads data found',
          data: {
            schedules: [],
            default: {
              zh: [],
              en: []
            },
            metadata: {
              lastUpdated: null,
              version: '0.0'
            }
          }
        }),
        { status: 200, headers }
      );
    }

    // Return the raw data
    return new Response(rawData, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Error fetching ads data:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch ads data',
        details: error.message,
      }),
      {
        status: 500,
        headers,
      }
    );
  }
}
