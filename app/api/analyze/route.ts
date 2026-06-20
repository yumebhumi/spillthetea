import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL =
  process.env.GROQ_MODEL ?? "meta-llama/llama-4-scout-17b-16e-instruct";
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? process.env.GEMINI_API_KEY;

type AnalyzeSuccessResponse = {
  success: true;
  analysis: {
    teaStrength: number;
    flirtingScore: number;
    ghostingRisk: "Low" | "Medium" | "High";
    deluluLevel: "Low" | "Medium" | "High";
    redFlags: string[];
    greenFlags: string[];
    vibeSummary: string;
    bestReply: string;
    finalVerdict: string;
  };
};

type AnalyzeErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

type JsonRequestBody = {
  chatText?: unknown;
  text?: unknown;
  image?: {
    data?: unknown;
    mimeType?: unknown;
  };
};

type ParsedInput = {
  chatText: string;
  imageDataUrl: string | null;
};

type GroqMessageContent =
  | string
  | Array<
      | {
          type: "text";
          text: string;
        }
      | {
          type: "image_url";
          image_url: {
            url: string;
          };
        }
    >;

function jsonError(
  message: string,
  status: number,
  code: string,
): NextResponse<AnalyzeErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status },
  );
}

function getPrompt(chatText: string) {
  const trimmedChatText = chatText.trim();

  return [
    "You are Spill The Tea, a playful chat-analysis assistant.",
    "Analyze the user's pasted chat text or screenshot in a light-hearted Gen-Z style.",
    "Important rules:",
    "- Keep it fun and casual",
    "- Do not give serious relationship advice",
    "- Do not claim certainty",
    "- Do not be toxic or offensive",
    "- Do not encourage stalking, manipulation, harassment, or unhealthy behaviour",
    "- If the chat seems sensitive, keep the response gentle and safe",
    "- If the screenshot is unclear, say so gently in vibeSummary instead of inventing details",
    "- Return only valid JSON with no markdown fences or extra text",
    "- Always include at least 1 red flag and 1 green flag when there is enough visible context",
    "- Keep each redFlags and greenFlags item short, specific, and plain text",
    'Return JSON in this exact shape: {"teaStrength": number, "flirtingScore": number, "ghostingRisk": "Low" | "Medium" | "High", "deluluLevel": "Low" | "Medium" | "High", "redFlags": string[], "greenFlags": string[], "vibeSummary": string, "bestReply": string, "finalVerdict": string}',
    "- Use integers from 0 to 100 for teaStrength and flirtingScore",
    trimmedChatText ? `Chat text:\n${trimmedChatText}` : "No chat text was provided.",
  ].join("\n\n");
}

function buildDataUrl(base64Data: string, mimeType: string) {
  return `data:${mimeType};base64,${base64Data}`;
}

async function parseMultipartRequest(request: NextRequest): Promise<ParsedInput> {
  const formData = await request.formData();
  const chatEntry = formData.get("chatText") ?? formData.get("text");
  const imageEntry = formData.get("image") ?? formData.get("screenshot");

  const chatText = typeof chatEntry === "string" ? chatEntry : "";

  if (!(imageEntry instanceof File) || imageEntry.size === 0) {
    return {
      chatText,
      imageDataUrl: null,
    };
  }

  if (!imageEntry.type.startsWith("image/")) {
    throw new Error("Only image files are allowed for screenshot uploads.");
  }

  const imageBuffer = Buffer.from(await imageEntry.arrayBuffer());

  return {
    chatText,
    imageDataUrl: buildDataUrl(imageBuffer.toString("base64"), imageEntry.type),
  };
}

function parseJsonRequest(body: JsonRequestBody): ParsedInput {
  const chatText =
    typeof body.chatText === "string"
      ? body.chatText
      : typeof body.text === "string"
        ? body.text
        : "";

  if (!body.image) {
    return {
      chatText,
      imageDataUrl: null,
    };
  }

  const base64Data = typeof body.image.data === "string" ? body.image.data : "";
  const mimeType = typeof body.image.mimeType === "string" ? body.image.mimeType : "";

  if (!base64Data) {
    return {
      chatText,
      imageDataUrl: null,
    };
  }

  if (!mimeType.startsWith("image/")) {
    throw new Error("Image input must include a valid image mime type.");
  }

  return {
    chatText,
    imageDataUrl: buildDataUrl(base64Data, mimeType),
  };
}

async function parseInput(request: NextRequest): Promise<ParsedInput> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    return parseMultipartRequest(request);
  }

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as JsonRequestBody;
    return parseJsonRequest(body);
  }

  throw new Error("Unsupported content type. Use multipart/form-data or application/json.");
}

function normalizeRisk(value: unknown): "Low" | "Medium" | "High" {
  return value === "Low" || value === "Medium" || value === "High" ? value : "Medium";
}

function normalizeScore(value: unknown) {
  const numericValue = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(numericValue)) {
    return 50;
  }

  return Math.max(0, Math.min(100, Math.round(numericValue)));
}

function normalizeStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/\r?\n|[;,•·]/)
    .map((item) => item.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

function normalizeString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getObjectValue(
  object: Record<string, unknown>,
  keys: string[],
) {
  for (const key of keys) {
    const value = object[key];

    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
}

function parseAnalysis(rawText: string): AnalyzeSuccessResponse["analysis"] {
  const parsed = JSON.parse(rawText) as Record<string, unknown>;

  return {
    teaStrength: normalizeScore(getObjectValue(parsed, ["teaStrength", "tea_strength"])),
    flirtingScore: normalizeScore(
      getObjectValue(parsed, ["flirtingScore", "flirting_score"]),
    ),
    ghostingRisk: normalizeRisk(
      getObjectValue(parsed, ["ghostingRisk", "ghosting_risk"]),
    ),
    deluluLevel: normalizeRisk(
      getObjectValue(parsed, ["deluluLevel", "delulu_level"]),
    ),
    redFlags: normalizeStringArray(getObjectValue(parsed, ["redFlags", "red_flags"])),
    greenFlags: normalizeStringArray(
      getObjectValue(parsed, ["greenFlags", "green_flags"]),
    ),
    vibeSummary: normalizeString(
      getObjectValue(parsed, ["vibeSummary", "vibe_summary"]),
      "The vibe is a little unclear, but there is definitely something to overthink here.",
    ),
    bestReply: normalizeString(
      getObjectValue(parsed, ["bestReply", "best_reply"]),
      "Keep it chill and reply with something simple and honest.",
    ),
    finalVerdict: normalizeString(
      getObjectValue(parsed, ["finalVerdict", "final_verdict"]),
      "Mildly suspicious, mildly interesting, and worth one eyebrow raise.",
    ),
  };
}

async function requestGroqAnalysis(chatText: string, imageDataUrl: string | null) {
  const userContent: GroqMessageContent = imageDataUrl
    ? [
        {
          type: "text",
          text: getPrompt(chatText),
        },
        {
          type: "image_url",
          image_url: {
            url: imageDataUrl,
          },
        },
      ]
    : getPrompt(chatText);

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content: "Return only valid JSON.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      response_format: {
        type: "json_object",
      },
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    let message = "Groq request failed.";

    try {
      const parsed = JSON.parse(responseText) as {
        error?: {
          message?: string;
        };
      };
      message = parsed.error?.message || message;
    } catch {
      if (responseText.trim()) {
        message = responseText;
      }
    }

    throw new Error(`groq:${response.status}:${message}`);
  }

  const payload = JSON.parse(responseText) as {
    choices?: Array<{
      message?: {
        content?: string | null;
      };
    }>;
  };

  return payload.choices?.[0]?.message?.content?.trim() ?? "";
}

export async function POST(request: NextRequest) {
  if (!GROQ_API_KEY) {
    return jsonError(
      "Missing Groq API key. Set GROQ_API_KEY on the server.",
      500,
      "missing_api_key",
    );
  }

  try {
    const { chatText, imageDataUrl } = await parseInput(request);
    const hasChatText = chatText.trim().length > 0;

    if (!hasChatText && !imageDataUrl) {
      return jsonError(
        "Provide chat text or a chat screenshot image.",
        400,
        "missing_input",
      );
    }

    const rawText = await requestGroqAnalysis(chatText, imageDataUrl);

    if (!rawText) {
      return jsonError(
        "Groq returned an empty response.",
        502,
        "empty_model_response",
      );
    }

    const analysis = parseAnalysis(rawText);

    return NextResponse.json<AnalyzeSuccessResponse>({
      success: true,
      analysis,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonError("Invalid JSON request body.", 400, "invalid_json");
    }

    if (error instanceof Error && error.message.startsWith("groq:")) {
      const [, statusText, ...messageParts] = error.message.split(":");
      const status = Number(statusText);

      return jsonError(
        messageParts.join(":") || "Groq request failed.",
        Number.isFinite(status) ? status : 502,
        "groq_api_error",
      );
    }

    if (error instanceof Error) {
      const isClientError =
        error.message.includes("Unsupported content type") ||
        error.message.includes("Only image files") ||
        error.message.includes("valid image mime type");

      return jsonError(
        error.message,
        isClientError ? 400 : 500,
        isClientError ? "invalid_input" : "internal_error",
      );
    }

    return jsonError("Unexpected server error.", 500, "internal_error");
  }
}
