import {
  ApiError,
  createPartFromBase64,
  GoogleGenAI,
  type Part,
} from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

const analysisSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    teaStrength: { type: "integer", minimum: 0, maximum: 100 },
    flirtingScore: { type: "integer", minimum: 0, maximum: 100 },
    ghostingRisk: {
      type: "string",
      enum: ["Low", "Medium", "High"],
    },
    deluluLevel: {
      type: "string",
      enum: ["Low", "Medium", "High"],
    },
    redFlags: {
      type: "array",
      items: { type: "string" },
    },
    greenFlags: {
      type: "array",
      items: { type: "string" },
    },
    vibeSummary: { type: "string" },
    bestReply: { type: "string" },
    finalVerdict: { type: "string" },
  },
  required: [
    "teaStrength",
    "flirtingScore",
    "ghostingRisk",
    "deluluLevel",
    "redFlags",
    "greenFlags",
    "vibeSummary",
    "bestReply",
    "finalVerdict",
  ],
} as const;

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

type ParsedInput = {
  chatText: string;
  imagePart: Part | null;
};

type JsonRequestBody = {
  chatText?: unknown;
  text?: unknown;
  image?: {
    data?: unknown;
    mimeType?: unknown;
  };
};

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

function getGeminiClient() {
  if (!GEMINI_API_KEY) {
    return null;
  }

  return new GoogleGenAI({ apiKey: GEMINI_API_KEY });
}

function getPrompt(chatText: string) {
  const trimmedChatText = chatText.trim();

  return [
    "You are “Spill The Tea”, a fun, playful chat-analysis assistant.",
    "Analyze the user's pasted chat text or screenshot in a light-hearted Gen-Z style.",
    "Important rules:",
    "- Keep it fun and casual",
    "- Do not give serious relationship advice",
    "- Do not claim certainty",
    "- Do not be toxic or offensive",
    "- Do not encourage stalking, manipulation, harassment, or unhealthy behaviour",
    "- If the chat seems sensitive, keep the response gentle and safe",
    "- Return only valid JSON",
    "Return JSON in this exact shape:",
    '{ "teaStrength": number, "flirtingScore": number, "ghostingRisk": "Low" | "Medium" | "High", "deluluLevel": "Low" | "Medium" | "High", "redFlags": string[], "greenFlags": string[], "vibeSummary": string, "bestReply": string, "finalVerdict": string }',
    "Use integers from 0 to 100 for teaStrength and flirtingScore.",
    "If the screenshot is unclear, say so gently in vibeSummary instead of inventing details.",
    trimmedChatText ? `Chat text:\n${trimmedChatText}` : "No chat text was provided.",
  ].join("\n\n");
}

async function parseMultipartRequest(request: NextRequest): Promise<ParsedInput> {
  const formData = await request.formData();
  const chatEntry = formData.get("chatText") ?? formData.get("text");
  const imageEntry = formData.get("image") ?? formData.get("screenshot");

  const chatText = typeof chatEntry === "string" ? chatEntry : "";

  if (!(imageEntry instanceof File) || imageEntry.size === 0) {
    return {
      chatText,
      imagePart: null,
    };
  }

  if (!imageEntry.type.startsWith("image/")) {
    throw new Error("Only image files are allowed for screenshot uploads.");
  }

  const imageBuffer = Buffer.from(await imageEntry.arrayBuffer());

  return {
    chatText,
    imagePart: createPartFromBase64(imageBuffer.toString("base64"), imageEntry.type),
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
      imagePart: null,
    };
  }

  const base64Data = typeof body.image.data === "string" ? body.image.data : "";
  const mimeType = typeof body.image.mimeType === "string" ? body.image.mimeType : "";

  if (!base64Data) {
    return {
      chatText,
      imagePart: null,
    };
  }

  if (!mimeType.startsWith("image/")) {
    throw new Error("Image input must include a valid image mime type.");
  }

  return {
    chatText,
    imagePart: createPartFromBase64(base64Data, mimeType),
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

export async function POST(request: NextRequest) {
  const ai = getGeminiClient();

  if (!ai) {
    return jsonError(
      "Missing Gemini API key. Set GEMINI_API_KEY or GOOGLE_API_KEY on the server.",
      500,
      "missing_api_key",
    );
  }

  try {
    const { chatText, imagePart } = await parseInput(request);
    const hasChatText = chatText.trim().length > 0;

    if (!hasChatText && !imagePart) {
      return jsonError(
        "Provide chat text or a chat screenshot image.",
        400,
        "missing_input",
      );
    }

    const contents: Array<string | Part> = [getPrompt(chatText)];

    if (imagePart) {
      contents.push(imagePart);
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: analysisSchema,
        temperature: 0.5,
      },
    });

    const rawText = response.text?.trim();

    if (!rawText) {
      return jsonError(
        "Gemini returned an empty response.",
        502,
        "empty_model_response",
      );
    }

    const analysis = JSON.parse(rawText) as AnalyzeSuccessResponse["analysis"];

    return NextResponse.json<AnalyzeSuccessResponse>({
      success: true,
      analysis,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonError("Invalid JSON request body.", 400, "invalid_json");
    }

    if (error instanceof ApiError) {
      return jsonError(
        error.message || "Gemini request failed.",
        typeof error.status === "number" ? error.status : 502,
        "gemini_api_error",
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
