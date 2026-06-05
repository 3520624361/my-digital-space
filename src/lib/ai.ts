import OpenAI from "openai";

type AIProvider = "openai" | "deepseek" | "gemini" | "claude" | "openrouter" | "xiaomi";

interface AIProviderConfig {
  name: AIProvider;
  apiKey: string;
  baseUrl: string;
  models: string[];
}

const providerConfigs: Record<AIProvider, AIProviderConfig> = {
  openai: {
    name: "openai",
    apiKey: process.env.OPENAI_API_KEY || "",
    baseUrl: "https://api.openai.com/v1",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "o1-mini"],
  },
  deepseek: {
    name: "deepseek",
    apiKey: process.env.DEEPSEEK_API_KEY || "",
    baseUrl: "https://api.deepseek.com",
    models: ["deepseek-chat", "deepseek-coder"],
  },
  gemini: {
    name: "gemini",
    apiKey: process.env.GEMINI_API_KEY || "",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    models: ["gemini-2.0-flash", "gemini-1.5-pro"],
  },
  claude: {
    name: "claude",
    apiKey: process.env.CLAUDE_API_KEY || "",
    baseUrl: "https://api.anthropic.com/v1",
    models: ["claude-sonnet-4-6", "claude-haiku-4-5"],
  },
  openrouter: {
    name: "openrouter",
    apiKey: process.env.OPENROUTER_API_KEY || "",
    baseUrl: "https://openrouter.ai/api/v1",
    models: [
      "openai/gpt-4o",
      "anthropic/claude-sonnet-4-6",
      "deepseek/deepseek-chat",
      "google/gemini-2.0-flash",
    ],
  },
  xiaomi: {
    name: "xiaomi",
    apiKey: process.env.XIAOMI_API_KEY || "",
    baseUrl: "https://api.xiaomimimo.com/v1",
    models: ["mimo-v2-flash", "mimo-v2-pro"],
  },
};

export function getAIProvider(provider?: AIProvider) {
  const defaultProvider = (process.env.AI_DEFAULT_PROVIDER as AIProvider) || "openai";
  const config = providerConfigs[provider || defaultProvider];

  if (!config?.apiKey) {
    throw new Error(`API key not configured for provider: ${provider || defaultProvider}`);
  }

  return new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseUrl,
  });
}

export function getDefaultModel(provider?: AIProvider): string {
  const defaultModel = process.env.AI_DEFAULT_MODEL || "gpt-4o-mini";
  if (provider) {
    return providerConfigs[provider]?.models[0] || defaultModel;
  }
  return defaultModel;
}

export const AI_PROVIDERS = Object.keys(providerConfigs) as AIProvider[];

/** 客户端安全的提供者列表（不含 API Key） */
export const AI_PROVIDER_LIST = [
  { value: "openai", label: "OpenAI", models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "o1-mini"] },
  { value: "deepseek", label: "DeepSeek", models: ["deepseek-chat", "deepseek-coder"] },
  { value: "gemini", label: "Gemini", models: ["gemini-2.0-flash", "gemini-1.5-pro"] },
  { value: "claude", label: "Claude", models: ["claude-sonnet-4-6", "claude-haiku-4-5"] },
  { value: "openrouter", label: "OpenRouter", models: ["openai/gpt-4o", "anthropic/claude-sonnet-4-6", "deepseek/deepseek-chat", "google/gemini-2.0-flash"] },
  { value: "xiaomi", label: "小米 MiMo", models: ["mimo-v2-flash", "mimo-v2-pro"] },
] as const;

/** 模型显示名称映射 */
export const MODEL_DISPLAY_NAMES: Record<string, string> = {
  "gpt-4o": "GPT-4o",
  "gpt-4o-mini": "GPT-4o Mini",
  "gpt-4-turbo": "GPT-4 Turbo",
  "o1-mini": "o1 Mini",
  "deepseek-chat": "DeepSeek Chat",
  "deepseek-coder": "DeepSeek Coder",
  "gemini-2.0-flash": "Gemini 2.0 Flash",
  "gemini-1.5-pro": "Gemini 1.5 Pro",
  "claude-sonnet-4-6": "Claude Sonnet 4.6",
  "claude-haiku-4-5": "Claude Haiku 4.5",
  "openai/gpt-4o": "OpenAI GPT-4o",
  "anthropic/claude-sonnet-4-6": "Anthropic Claude 4.6",
  "deepseek/deepseek-chat": "DeepSeek Chat",
  "google/gemini-2.0-flash": "Google Gemini 2.0 Flash",
  "mimo-v2-flash": "MiMo V2 Flash",
  "mimo-v2-pro": "MiMo V2 Pro",
};

export const AI_ASSISTANTS = [
  {
    id: "chat",
    name: "AI 聊天助手",
    description: "日常对话、问答、闲聊",
    icon: "MessageCircle",
    systemPrompt: "你是一个友好的AI助手，用中文回答用户的问题。",
  },
  {
    id: "writing",
    name: "AI 写作助手",
    description: "文章创作、文案优化、内容生成",
    icon: "Pencil",
    systemPrompt: "你是一个专业的写作助手，帮助用户创作和优化文字内容。",
  },
  {
    id: "code",
    name: "AI 代码助手",
    description: "代码编写、调试、优化",
    icon: "Code",
    systemPrompt: "你是一个资深程序员，帮助用户编写、调试和优化代码。",
  },
  {
    id: "translate",
    name: "AI 翻译助手",
    description: "多语言翻译、本地化",
    icon: "Languages",
    systemPrompt: "你是一个专业的翻译助手，提供准确的多语言翻译服务。",
  },
  {
    id: "summary",
    name: "AI 文章总结",
    description: "快速总结文章要点",
    icon: "FileText",
    systemPrompt: "你是一个文章总结助手，提取文章核心要点。",
  },
  {
    id: "study",
    name: "AI 学习助手",
    description: "知识讲解、学习规划",
    icon: "GraduationCap",
    systemPrompt: "你是一个耐心的学习助手，帮助用户理解知识和制定学习计划。",
  },
] as const;
