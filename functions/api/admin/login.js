/**
 * Admin Login API
 * POST /api/admin/login
 * Body: { password: "xxx" }
 */

import { verifyPassword, createSessionCookie, generateSessionToken } from '../../_shared/auth.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return new Response(JSON.stringify({ error: 'Password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify password (check env.ADMIN_PASSWORD first)
    const isValid = verifyPassword(password, env.ADMIN_PASSWORD);

    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate session token
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;

    // Set cookie and return success
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': createSessionCookie(sessionToken)
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
