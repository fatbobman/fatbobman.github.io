/**
 * Advertisement Management API
 *
 * CRUD operations for advertisement schedules
 * Protected endpoint requiring authentication
 */

import { requireAuth } from '../../_shared/auth.js';
import { getKV } from '../../_shared/mock-kv.js';

const ADS_KEY = 'ads-schedule';

export async function onRequest(context) {
  const { request, env } = context;

  // Check authentication
  const authError = requireAuth(request);
  if (authError) return authError;

  // Get KV instance
  const kv = await getKV(env, true);

  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  try {
    // Handle default/fallback ad management separately
    if (action === 'update-default') {
      return await handleUpdateDefault(kv, request);
    }

    switch (request.method) {
      case 'GET':
        return await handleList(kv);

      case 'POST':
        return await handleCreate(kv, request);

      case 'PUT':
        return await handleUpdate(kv, request);

      case 'DELETE':
        return await handleDelete(kv, request);

      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * GET - List all advertisement schedules
 */
async function handleList(kv) {
  const rawData = await kv.get(ADS_KEY, { type: 'text' });

  let adsData;
  if (rawData) {
    try {
      adsData = JSON.parse(rawData);
    } catch (e) {
      return new Response(JSON.stringify({
        error: 'Failed to parse ads data',
        details: e.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } else {
    // Initialize with empty structure if no data exists
    adsData = {
      schedules: [],
      default: {
        zh: {
          id: 'default-zh',
          title: '在此投放广告，触达 Swift 开发者',
          description: '在博客和周刊中推广您的框架、工具、服务或应用，精准触达高度专注的 iOS 和 Swift 开发者受众。',
          cta: '成为赞助商',
          link: '/zh/sponsorship/',
          logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
          badge: '示例赞助商'
        },
        en: {
          id: 'default-en',
          title: 'Reach Swift Developers. Share Your Product.',
          description: 'Promote your framework, tool, service, or app to a highly targeted iOS & Swift developer audience across blog and newsletter placements.',
          cta: 'Become a sponsor',
          link: '/en/sponsorship/',
          logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
          badge: 'Example Sponsor'
        }
      },
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0'
      }
    };
  }

  return new Response(JSON.stringify({
    success: true,
    data: adsData,
    count: adsData.schedules.length,
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * POST - Create new advertisement schedule
 * Body: { sponsor, startDate, endDate, enabled, variants, notes }
 */
async function handleCreate(kv, request) {
  const body = await request.json();
  const { sponsor, startDate, endDate, enabled = true, variants, notes = '' } = body;

  // Validate required fields
  if (!sponsor || !startDate || !endDate || !variants) {
    return new Response(JSON.stringify({
      error: 'Missing required fields: sponsor, startDate, endDate, variants'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Validate variants structure and content
  const variantsValidation = validateVariants(variants);
  if (!variantsValidation.valid) {
    return new Response(JSON.stringify({
      error: 'Invalid variants data',
      details: variantsValidation.errors
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get existing data
  const rawData = await kv.get(ADS_KEY, { type: 'text' });
  let adsData;

  if (rawData) {
    try {
      adsData = JSON.parse(rawData);
    } catch (e) {
      return new Response(JSON.stringify({
        error: 'Failed to parse existing ads data'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } else {
    // Initialize with empty structure
    adsData = {
      schedules: [],
      default: {
        zh: {
          id: 'default-zh',
          title: '在此投放广告，触达 Swift 开发者',
          description: '在博客和周刊中推广您的框架、工具、服务或应用，精准触达高度专注的 iOS 和 Swift 开发者受众。',
          cta: '成为赞助商',
          link: '/zh/sponsorship/',
          logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
          badge: '示例赞助商'
        },
        en: {
          id: 'default-en',
          title: 'Reach Swift Developers. Share Your Product.',
          description: 'Promote your framework, tool, service, or app to a highly targeted iOS & Swift developer audience across blog and newsletter placements.',
          cta: 'Become a sponsor',
          link: '/en/sponsorship/',
          logo: 'https://cdn.fatbobman.com/placeholder-tools.svg',
          badge: 'Example Sponsor'
        }
      },
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0'
      }
    };
  }

  // Generate UUID for new schedule
  const id = generateUUID();

  // Create new schedule
  const newSchedule = {
    id,
    sponsor,
    startDate,
    endDate,
    enabled,
    variants,
    notes
  };

  // Add to schedules array
  adsData.schedules.push(newSchedule);

  // Update metadata
  adsData.metadata.lastUpdated = new Date().toISOString();

  // Save to KV
  await kv.put(ADS_KEY, JSON.stringify(adsData));

  return new Response(JSON.stringify({
    success: true,
    message: 'Advertisement schedule created successfully',
    data: newSchedule,
    timestamp: new Date().toISOString()
  }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * PUT - Update existing advertisement schedule
 * Body: { id, sponsor?, startDate?, endDate?, enabled?, variants?, notes? }
 */
async function handleUpdate(kv, request) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return new Response(JSON.stringify({
      error: 'Missing required field: id'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get existing data
  const rawData = await kv.get(ADS_KEY, { type: 'text' });

  if (!rawData) {
    return new Response(JSON.stringify({
      error: 'No advertisement data found'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let adsData;
  try {
    adsData = JSON.parse(rawData);
  } catch (e) {
    return new Response(JSON.stringify({
      error: 'Failed to parse ads data'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Find schedule by ID
  const scheduleIndex = adsData.schedules.findIndex(s => s.id === id);

  if (scheduleIndex === -1) {
    return new Response(JSON.stringify({
      error: 'Advertisement schedule not found'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Validate variants if provided
  if (updates.variants) {
    const variantsValidation = validateVariants(updates.variants);
    if (!variantsValidation.valid) {
      return new Response(JSON.stringify({
        error: 'Invalid variants data',
        details: variantsValidation.errors
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Update schedule with provided fields
  adsData.schedules[scheduleIndex] = {
    ...adsData.schedules[scheduleIndex],
    ...updates
  };

  // Update metadata
  adsData.metadata.lastUpdated = new Date().toISOString();

  // Save to KV
  await kv.put(ADS_KEY, JSON.stringify(adsData));

  return new Response(JSON.stringify({
    success: true,
    message: 'Advertisement schedule updated successfully',
    data: adsData.schedules[scheduleIndex],
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * DELETE - Delete advertisement schedule
 * Query param: ?id=xxx
 */
async function handleDelete(kv, request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({
      error: 'Missing required query parameter: id'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get existing data
  const rawData = await kv.get(ADS_KEY, { type: 'text' });

  if (!rawData) {
    return new Response(JSON.stringify({
      error: 'No advertisement data found'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let adsData;
  try {
    adsData = JSON.parse(rawData);
  } catch (e) {
    return new Response(JSON.stringify({
      error: 'Failed to parse ads data'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Find schedule by ID
  const scheduleIndex = adsData.schedules.findIndex(s => s.id === id);

  if (scheduleIndex === -1) {
    return new Response(JSON.stringify({
      error: 'Advertisement schedule not found'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Remove schedule
  const deletedSchedule = adsData.schedules.splice(scheduleIndex, 1)[0];

  // Update metadata
  adsData.metadata.lastUpdated = new Date().toISOString();

  // Save to KV
  await kv.put(ADS_KEY, JSON.stringify(adsData));

  return new Response(JSON.stringify({
    success: true,
    message: 'Advertisement schedule deleted successfully',
    data: deletedSchedule,
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * PUT - Update default/fallback advertisement
 * Body: { zh: {...}, en: {...} }
 */
async function handleUpdateDefault(kv, request) {
  const body = await request.json();
  const { zh, en } = body;

  // Validate required fields
  if (!zh || !en) {
    return new Response(JSON.stringify({
      error: 'Missing required fields: zh and en default ads'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Validate zh default ad
  const zhValidation = validateAdVariant(zh, 'zh');
  if (!zhValidation.valid) {
    return new Response(JSON.stringify({
      error: `Invalid zh default ad: ${zhValidation.errors.join(', ')}`
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Validate en default ad
  const enValidation = validateAdVariant(en, 'en');
  if (!enValidation.valid) {
    return new Response(JSON.stringify({
      error: `Invalid en default ad: ${enValidation.errors.join(', ')}`
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get existing data
  const rawData = await kv.get(ADS_KEY, { type: 'text' });
  let adsData;

  if (rawData) {
    try {
      adsData = JSON.parse(rawData);
    } catch (e) {
      return new Response(JSON.stringify({
        error: 'Failed to parse existing ads data'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } else {
    adsData = {
      schedules: [],
      default: {},
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0'
      }
    };
  }

  // Update default ads
  adsData.default = { zh, en };
  adsData.metadata.lastUpdated = new Date().toISOString();

  // Save to KV
  await kv.put(ADS_KEY, JSON.stringify(adsData));

  return new Response(JSON.stringify({
    success: true,
    message: 'Default advertisement updated successfully',
    data: adsData.default,
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * Validate advertisement variant structure
 * @param {Object} variant - The ad variant to validate
 * @param {string} lang - Language code for better error messages
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateAdVariant(variant, lang = '') {
  const errors = [];
  const prefix = lang ? `[${lang}] ` : '';

  // Check required fields
  if (!variant.id) errors.push(`${prefix}Missing field: id`);
  if (!variant.title) errors.push(`${prefix}Missing field: title`);
  if (!variant.description) errors.push(`${prefix}Missing field: description`);
  if (!variant.cta) errors.push(`${prefix}Missing field: cta`);
  if (!variant.link) errors.push(`${prefix}Missing field: link`);
  if (!variant.logo) errors.push(`${prefix}Missing field: logo`);
  if (!variant.badge) errors.push(`${prefix}Missing field: badge`);

  // Check features array (optional, but if provided must be array)
  if (variant.features !== undefined && !Array.isArray(variant.features)) {
    errors.push(`${prefix}Field 'features' must be an array (or omit it)`);
  }

  // Validate URL formats
  if (variant.link && !isValidURL(variant.link)) {
    errors.push(`${prefix}Invalid URL format: link`);
  }
  if (variant.logo && !isValidURL(variant.logo)) {
    errors.push(`${prefix}Invalid URL format: logo`);
  }
  if (variant.logoDark && !isValidURL(variant.logoDark)) {
    errors.push(`${prefix}Invalid URL format: logoDark`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate variants structure for schedules
 * @param {Object} variants - The variants object with zh and en arrays
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateVariants(variants) {
  const errors = [];

  if (!variants.zh || !Array.isArray(variants.zh)) {
    errors.push('Missing or invalid zh variants array');
  } else {
    variants.zh.forEach((variant, index) => {
      const validation = validateAdVariant(variant, `zh[${index}]`);
      errors.push(...validation.errors);
    });
  }

  if (!variants.en || !Array.isArray(variants.en)) {
    errors.push('Missing or invalid en variants array');
  } else {
    variants.en.forEach((variant, index) => {
      const validation = validateAdVariant(variant, `en[${index}]`);
      errors.push(...validation.errors);
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Simple URL validation
 */
function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    // Check if it's a relative path (starts with /)
    return string.startsWith('/');
  }
}

/**
 * Generate UUID v4
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
