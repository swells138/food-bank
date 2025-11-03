export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch (error) {
    body = {};
  }

  console.info('Volunteer form submission received', body);

  return new Response(JSON.stringify({ received: true }), {
    status: 202,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
