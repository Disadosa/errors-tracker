import { serve } from "srvx";

const server = serve({
  port: process.env.PORT || 3000,
  async fetch(request) {
    let json;
    try {
      json = await request.json();
    } catch (error) {
      return getResponseWithHeaders();
    }

    if (!json?.message) {
      return getResponseWithHeaders();
    }
 
    const text = JSON.stringify(json, null, 2);

    // Replace with your actual bot token and chat ID
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    return getResponseWithHeaders();
  },
});

function getResponseWithHeaders() {
  return new Response(
    'OK',
    {
      headers: {
        "Content-Type": "text/plain; charset=UTF-8",
        'Cache-Control': 'private, no-cache, no-store, must-revalidate, max-age=0',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
        'Access-Control-Allow-Headers': '*',
      },
    },
  );
}

await server.ready();
console.log(`🚀 Server ready at ${server.url}`);
