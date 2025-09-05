import { NextRequest, NextResponse } from "next/server";

// OpenRouter free-tier API key
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPEN_ROUTE_API_KEY;
const MODEL_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { message, selectedWell, drillingData } = await req.json();

    // Combine all info into a prompt
    const prompt = `
You are a helpful assistant.
Explain the following drill data for well ${selectedWell}:
${JSON.stringify(drillingData)}
User message: ${message}
    `;

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: "AI API Error", details: errText }, { status: response.status });
    }

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ response: aiText });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
