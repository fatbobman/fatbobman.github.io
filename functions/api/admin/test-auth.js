/**
 * Test Protected API
 * GET /api/admin/test-auth
 *
 * This endpoint requires authentication
 */

import { requireAuth } from '../../_shared/auth.js';

export async function onRequestGet(context) {
  const { request } = context;

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
