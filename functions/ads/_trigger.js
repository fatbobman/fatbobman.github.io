// Temporary file to trigger EdgeOne route refresh
// Can be deleted after successful deployment
export async function onRequest() {
  return new Response('Trigger file');
}
