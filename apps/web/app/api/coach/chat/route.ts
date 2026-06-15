// app/api/coach/chat/route.ts

export async function POST(req: Request) {
  // const { message, userId } = await req.json();

  // Build context from last 30 days of trades
  // const context = await buildCoachContext(userId);

  // const stream = await anthropic.messages.stream({
  //   model: 'claude-opus-4-6',
  //   system: COACH_SYSTEM_PROMPT + context,
  //   messages: [...history, { role: 'user', content: message }],
  //   max_tokens: 1024,
  // });

  return new Response(
    JSON.stringify({ message: 'Coach chat endpoint active' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
