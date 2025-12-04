/**
 * Advertisement Management API
 *
 * CRUD operations for advertisement schedules
 * Protected endpoint requiring authentication
 */

import { requireAuth } from '../../_shared/auth.js';
import { getKV } from '../../_shared/mock-kv.js';

const ADS_KEY = 'adsSchedule';

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
    // Handle special actions
    if (action === 'update-default') {
      return await handleUpdateDefault(kv, request);
    }

    if (action === 'import') {
      return await handleImport(kv, request);
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
          link: '/en/sponsorship/',
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
 * Body: { sponsorId, startDate, endDate, enabled, variants, notes }
 */
async function handleCreate(kv, request) {
  const body = await request.json();
  const { sponsorId, startDate, endDate, enabled = true, variants, notes = '' } = body;

  // Validate required fields
  if (!sponsorId || !startDate || !endDate || !variants) {
    return new Response(JSON.stringify({
      error: 'Missing required fields: sponsorId, startDate, endDate, variants'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Validate variants structure and content, auto-generate IDs
  const variantsValidation = validateVariants(variants, sponsorId);
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
          link: '/en/sponsorship/',
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

  // Create new schedule with processed variants (IDs auto-generated)
  const newSchedule = {
    id,
    sponsorId,
    startDate,
    endDate,
    enabled,
    variants: variantsValidation.processedVariants,  // Use processed variants with auto-generated IDs
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
 * Body: { id, sponsorId?, startDate?, endDate?, enabled?, variants?, notes? }
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

  // Determine sponsorId to use for validation
  const sponsorId = updates.sponsorId || adsData.schedules[scheduleIndex].sponsorId;

  // Validate variants if provided and auto-generate IDs
  if (updates.variants) {
    const variantsValidation = validateVariants(updates.variants, sponsorId);
    if (!variantsValidation.valid) {
      return new Response(JSON.stringify({
        error: 'Invalid variants data',
        details: variantsValidation.errors
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    // Use processed variants with auto-generated IDs
    updates.variants = variantsValidation.processedVariants;
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

  // Validate zh default ad (support both array and object formats)
  let zhValidation;
  if (Array.isArray(zh)) {
    // New format: array of versions
    const errors = [];
    for (let i = 0; i < zh.length; i++) {
      const v = validateScheduleVariant(zh[i], `zh[${i}]`, 'default');
      if (!v.valid) {
        errors.push(...v.errors);
      }
    }
    zhValidation = { valid: errors.length === 0, errors };
  } else {
    // Old format: single object
    zhValidation = validateAdVariant(zh, 'zh');
  }

  if (!zhValidation.valid) {
    return new Response(JSON.stringify({
      error: `Invalid zh default ad: ${zhValidation.errors.join(', ')}`
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Validate en default ad (support both array and object formats)
  let enValidation;
  if (Array.isArray(en)) {
    // New format: array of versions
    const errors = [];
    for (let i = 0; i < en.length; i++) {
      const v = validateScheduleVariant(en[i], `en[${i}]`, 'default');
      if (!v.valid) {
        errors.push(...v.errors);
      }
    }
    enValidation = { valid: errors.length === 0, errors };
  } else {
    // Old format: single object
    enValidation = validateAdVariant(en, 'en');
  }

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
 * Validate advertisement variant structure (for DEFAULT ads, which still use id)
 * @param {Object} variant - The ad variant to validate
 * @param {string} lang - Language code for better error messages
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateAdVariant(variant, lang = '') {
  const errors = [];
  const prefix = lang ? `[${lang}] ` : '';

  // Check required fields (DEFAULT ads use 'id' field)
  if (!variant.id) errors.push(`${prefix}Missing field: id`);
  if (!variant.title) errors.push(`${prefix}Missing field: title`);
  if (!variant.description) errors.push(`${prefix}Missing field: description`);
  if (!variant.cta) errors.push(`${prefix}Missing field: cta`);
  if (!variant.link) errors.push(`${prefix}Missing field: link`);
  const styleValue = Number.isInteger(variant.style) ? variant.style : 1;
  if (!variant.logo && styleValue !== 2) {
    errors.push(`${prefix}Missing field: logo`);
  }
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
 * Validate schedule variant structure (uses sponsorId + version)
 * @param {Object} variant - The ad variant to validate
 * @param {string} lang - Language code for better error messages
 * @param {string} sponsorId - The sponsor ID to generate full id
 * @returns {Object} { valid: boolean, errors: string[], id?: string }
 */
function validateScheduleVariant(variant, lang = '', sponsorId = '') {
  const errors = [];
  const prefix = lang ? `[${lang}] ` : '';

  // Check required fields (schedules use 'version' instead of 'id')
  if (!variant.version) {
    errors.push(`${prefix}Missing field: version`);
  } else if (!Number.isInteger(variant.version) || variant.version <= 0) {
    errors.push(`${prefix}Field 'version' must be a positive integer`);
  }

  // Validate style field (optional, must be 1 or 2 if provided)
  if (variant.style !== undefined) {
    if (!Number.isInteger(variant.style) || (variant.style !== 1 && variant.style !== 2)) {
      errors.push(`${prefix}Field 'style' must be 1 (primary) or 2 (secondary)`);
    }
  }

  if (!variant.title) errors.push(`${prefix}Missing field: title`);
  if (!variant.description) errors.push(`${prefix}Missing field: description`);
  if (!variant.cta) errors.push(`${prefix}Missing field: cta`);
  if (!variant.link) errors.push(`${prefix}Missing field: link`);
  const styleValue = Number.isInteger(variant.style) ? variant.style : 1;
  if (!variant.logo && styleValue !== 2) {
    errors.push(`${prefix}Missing field: logo`);
  }
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

  // Generate full ID if validation passes
  let generatedId = '';
  if (sponsorId && lang && variant.version && Number.isInteger(variant.version)) {
    generatedId = `${sponsorId}-${lang}-v${variant.version}`;
  }

  return {
    valid: errors.length === 0,
    errors,
    id: generatedId
  };
}

/**
 * Validate variants structure for schedules and auto-generate IDs
 * @param {Object} variants - The variants object with zh and en arrays
 * @param {string} sponsorId - The sponsor ID to generate full IDs
 * @returns {Object} { valid: boolean, errors: string[], processedVariants?: Object }
 */
function validateVariants(variants, sponsorId = '') {
  const errors = [];
  const processedVariants = { zh: [], en: [] };

  if (!variants.zh || !Array.isArray(variants.zh)) {
    errors.push('Missing or invalid zh variants array');
  } else {
    variants.zh.forEach((variant, index) => {
      const validation = validateScheduleVariant(variant, `zh[${index}]`, sponsorId);
      errors.push(...validation.errors);

      // Add generated ID to variant
      if (validation.valid && validation.id) {
        processedVariants.zh.push({
          ...variant,
          id: validation.id  // Auto-generated: {sponsorId}-zh-v{version}
        });
      } else {
        processedVariants.zh.push(variant);
      }
    });
  }

  if (!variants.en || !Array.isArray(variants.en)) {
    errors.push('Missing or invalid en variants array');
  } else {
    variants.en.forEach((variant, index) => {
      const validation = validateScheduleVariant(variant, `en[${index}]`, sponsorId);
      errors.push(...validation.errors);

      // Add generated ID to variant
      if (validation.valid && validation.id) {
        processedVariants.en.push({
          ...variant,
          id: validation.id  // Auto-generated: {sponsorId}-en-v{version}
        });
      } else {
        processedVariants.en.push(variant);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    processedVariants: errors.length === 0 ? processedVariants : undefined
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
    return string.startsWith('/') || string.startsWith('#');
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

/**
 * POST - Import entire ad data (schedules + default ads)
 * Body: { schedules: [...], default: {...}, metadata: {...} }
 */
async function handleImport(kv, request) {
  const body = await request.json();

  // Validate structure
  if (!body.schedules || !Array.isArray(body.schedules)) {
    return new Response(JSON.stringify({
      error: 'Invalid data: missing schedules array'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!body.default || !body.default.zh || !body.default.en) {
    return new Response(JSON.stringify({
      error: 'Invalid data: missing default ads (zh and en required)'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Update metadata timestamp
  const importData = {
    ...body,
    metadata: {
      ...(body.metadata || {}),
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    }
  };

  // Save to KV
  await kv.put(ADS_KEY, JSON.stringify(importData));

  return new Response(JSON.stringify({
    success: true,
    message: `Imported ${body.schedules.length} schedules and default ads`,
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
