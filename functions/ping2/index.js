import { renderAdByStyle } from '../_shared/ad-renderer.js';

export async function onRequest(context) {
  return new Response('pong2 with ad-renderer', { status: 200 });
}
