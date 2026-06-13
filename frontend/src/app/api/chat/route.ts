import { NextRequest } from "next/server";
import OpenAI from "openai";

// ── Groq client (OpenAI-compatible) ────────────────────────────
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

// ── Domain-specific system prompt ──────────────────────────────
const SYSTEM_PROMPT = `You are **Vera**, an expert B2B Leather Sourcing Advisor for the VeraSync platform.

Your expertise covers:
• **Sustainable leathers**: vegetable-tanned, chrome-free, bio-based (Piñatex, Mylo, Desserto cactus leather, apple leather).
• **Exotic leathers**: Nile crocodile, American alligator, python, ostrich, stingray — always with CITES certification guidance.
• **Vegan / alternative materials**: mushroom mycelium, lab-grown collagen, recycled PET-based synthetics.
• **Certifications & compliance**: LWG (Leather Working Group), CITES, REACH, Oeko-Tex, ISO 14001.
• **Technical specifications**: thickness (mm), tensile strength, grain patterns, dye-fastness, finishing techniques.
• **Sourcing logistics**: MOQ (Minimum Order Quantities), lead times, sample requests, supplier regions (Italy, Brazil, South-East Asia, Sub-Saharan Africa).

Guidelines:
1. Always be helpful, professional, and concise — you're speaking to B2B buyers (fashion houses, furniture manufacturers, automotive interiors).
2. When recommending materials, mention relevant certifications, typical thickness ranges, and sustainability attributes.
3. If unsure about something specific to the user's catalog, suggest they check the VeraSync catalog page or request a sample.
4. Respond in the same language the user writes in (English or Italian).
5. Never invent product SKUs or prices — guide users toward the catalog or a sample request instead.
6. Keep responses under 200 words unless the user explicitly asks for a detailed breakdown.`;

// ── POST handler with streaming ────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Call Groq with streaming enabled
    const stream = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    // Build a ReadableStream that forwards SSE chunks to the client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Stream interrupted." })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("[Chat API Error]", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
