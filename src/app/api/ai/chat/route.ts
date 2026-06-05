import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type AIProvider = "openai" | "deepseek" | "gemini" | "claude" | "openrouter" | "xiaomi";

/** 各提供者的 API Key 与 Base URL 映射 */
const providerEnv = {
  openai:   { key: process.env.OPENAI_API_KEY || "",       baseUrl: "https://api.openai.com/v1" },
  deepseek: { key: process.env.DEEPSEEK_API_KEY || "",     baseUrl: "https://api.deepseek.com" },
  gemini:   { key: process.env.GEMINI_API_KEY || "",       baseUrl: "https://generativelanguage.googleapis.com/v1beta" },
  claude:   { key: process.env.CLAUDE_API_KEY || "",       baseUrl: "https://api.anthropic.com/v1" },
  openrouter: { key: process.env.OPENROUTER_API_KEY || "", baseUrl: "https://openrouter.ai/api/v1" },
  xiaomi:   { key: process.env.XIAOMI_API_KEY || "",       baseUrl: "https://api.xiaomimimo.com/v1" },
} as const;

function buildMessages(body: any): OpenAI.Chat.ChatCompletionMessageParam[] {
  const { messages, systemPrompt } = body;
  const apiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

  if (systemPrompt) {
    apiMessages.push({ role: "system", content: systemPrompt });
  }

  if (messages && Array.isArray(messages)) {
    for (const msg of messages) {
      if (msg.role === "user" || msg.role === "assistant") {
        apiMessages.push({ role: msg.role, content: msg.content });
      }
    }
  }

  return apiMessages;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, model, stream } = body;

    const resolvedProvider: AIProvider = provider || "openai";
    const config = providerEnv[resolvedProvider];

    if (!config?.key) {
      return NextResponse.json(
        { error: `提供者「${resolvedProvider}」未配置 API Key` },
        { status: 400 },
      );
    }

    const resolvedModel = model || "gpt-4o-mini";
    const apiMessages = buildMessages(body);

    const client = new OpenAI({
      apiKey: config.key,
      baseURL: config.baseUrl,
    });

    // ===== 流式响应 =====
    if (stream) {
      const openaiStream = await client.chat.completions.create({
        model: resolvedModel,
        messages: apiMessages,
        max_tokens: 4096,
        temperature: 0.7,
        stream: true,
      });

      const encoder = new TextEncoder();

      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of openaiStream) {
              const delta = chunk.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`),
                );
              }
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          } catch (err) {
            const message = err instanceof Error ? err.message : "流式响应中断";
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`),
            );
          } finally {
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
    }

    // ===== 非流式响应（向下兼容） =====
    const completion = await client.chat.completions.create({
      model: resolvedModel,
      messages: apiMessages,
      max_tokens: 4096,
      temperature: 0.7,
    });

    const content = completion.choices?.[0]?.message?.content || "";
    return NextResponse.json({ content });
  } catch (error: any) {
    console.error("AI chat API error:", error);

    let errorMessage = "AI 响应失败，请稍后重试";
    if (error?.status === 401) errorMessage = "API Key 无效或未配置";
    else if (error?.status === 429) errorMessage = "请求过于频繁，请稍后再试";
    else if (error?.status === 402) errorMessage = "API 余额不足";
    else if (error?.message) errorMessage = error.message;

    return NextResponse.json(
      { error: errorMessage, detail: error?.message },
      { status: error?.status || 500 },
    );
  }
}
