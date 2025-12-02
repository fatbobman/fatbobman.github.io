/**
 * Test Protected API
 * GET /api/admin/test-auth
 *
 * This endpoint requires authentication
 */

import { requireAuth } from '../../_shared/auth.js';

export async function onRequest(context) {
  const { request } = context;

  // Only allow GET requests
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Check authentication
  const authError = requireAuth(request);
  if (authError) return authError;

  // If authenticated, return success
  return new Response(JSON.stringify({
    success: true,
    message: 'Authentication successful! You have access to admin APIs.',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
