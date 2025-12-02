/**
 * Authentication utilities for Edge Functions
 * Simple password-based authentication with session cookies
 */

// Admin password - should be set in environment variable
const ADMIN_PASSWORD = 'your-secure-password-here'; // TODO: 从环境变量读取

// Session duration: 24 hours
const SESSION_DURATION = 24 * 60 * 60 * 1000;

/**
 * Generate a simple session token
 */
function generateSessionToken() {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

/**
 * Verify password
 */
export function verifyPassword(password, envPassword) {
  // Use environment variable if available, otherwise use default
  const correctPassword = envPassword || ADMIN_PASSWORD;
  return password === correctPassword;
}

/**
 * Create session cookie
 */
export function createSessionCookie(token) {
  const expires = new Date(Date.now() + SESSION_DURATION);
  return `admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${expires.toUTCString()}`;
}

/**
 * Verify session from request
 */
export function verifySession(request) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return false;

  // Parse cookies
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [key, val] = c.trim().split('=');
      return [key, val];
    })
  );

  // Check if valid session exists
  if (!cookies.admin_session) return false;

  // For now, just check if session exists
  // In production, you should validate against a store
  return cookies.admin_session.startsWith('session_');
}

/**
 * Clear session cookie
 */
export function clearSessionCookie() {
  return 'admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0';
}

/**
 * Middleware: require authentication
 */
export function requireAuth(request) {
  if (!verifySession(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return null; // Authentication successful
}
