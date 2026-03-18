export async function onRequest(context) {
  return new Response('pong', { status: 200 });
}
