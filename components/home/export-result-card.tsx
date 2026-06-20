"use client";

import type { AnalysisResult } from "@/components/home/types";

type ExportResultCardProps = {
  analysis: AnalysisResult;
};

const scoreCards = [
  {
    key: "teaStrength",
    title: "Tea Strength",
    emoji: "☕",
    tone: "How spicy the situation feels overall.",
  },
  {
    key: "flirtingScore",
    title: "Flirting Score",
    emoji: "😉",
    tone: "The playful-romantic energy in the chat.",
  },
  {
    key: "ghostingRisk",
    title: "Ghosting Risk",
    emoji: "👻",
    tone: "A soft guess, not a crystal ball.",
  },
  {
    key: "deluluLevel",
    title: "Delulu Level",
    emoji: "💭",
    tone: "How much wishful reading might be happening.",
  },
] as const;

function getScoreValue(analysis: AnalysisResult, key: (typeof scoreCards)[number]["key"]) {
  if (key === "teaStrength" || key === "flirtingScore") {
    return `${analysis[key]}%`;
  }

  return analysis[key];
}

function formatFlagText(items: string[]) {
  if (items.length === 0) {
    return "No major notes";
  }

  return items.slice(0, 3).join(" • ");
}

export function ExportResultCard({ analysis }: ExportResultCardProps) {
  return (
    <div
      style={{
        width: "1080px",
        height: "1080px",
        background: "#F7F7F2",
        borderRadius: "32px",
        padding: "56px",
        color: "#2D3436",
        display: "grid",
        gridTemplateRows: "auto auto auto 1fr auto",
        gap: "24px",
        fontFamily:
          '"Inter", "Manrope", "Avenir Next", "Segoe UI", ui-sans-serif, sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "#6B8F71",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Result
          </p>
          <h2
            style={{
              margin: "12px 0 0",
              fontSize: "60px",
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "-0.05em",
            }}
          >
            🫖 THE TEA HAS BEEN SPILLED
          </h2>
        </div>
        <div
          style={{
            borderRadius: "999px",
            background: "#FFFFFF",
            border: "1px solid rgba(221, 190, 169, 0.34)",
            padding: "14px 22px",
            fontSize: "24px",
            fontWeight: 700,
            color: "#6B8F71",
            whiteSpace: "nowrap",
          }}
        >
          Spill The Tea ☕
        </div>
      </div>

      <div
        style={{
          borderRadius: "28px",
          background: "#FFFFFF",
          border: "1px solid rgba(221, 190, 169, 0.34)",
          padding: "28px 32px",
          boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "24px",
            lineHeight: 1.6,
            color: "#5F6668",
          }}
        >
          Here&apos;s what the chat is giving.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "20px",
        }}
      >
        {scoreCards.map((card) => (
          <article
            key={card.key}
            style={{
              borderRadius: "28px",
              background: "#FFFFFF",
              border: "1px solid rgba(221, 190, 169, 0.34)",
              padding: "28px",
              boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#6B8F71",
                }}
              >
                {card.title}
              </p>
              <span style={{ fontSize: "32px" }}>{card.emoji}</span>
            </div>
            <p
              style={{
                margin: "20px 0 0",
                fontSize: "48px",
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              {getScoreValue(analysis, card.key)}
            </p>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: "18px",
                lineHeight: 1.5,
                color: "#667072",
              }}
            >
              {card.tone}
            </p>
          </article>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "20px",
        }}
      >
        <article
          style={{
            borderRadius: "28px",
            background: "#FFFFFF",
            border: "1px solid rgba(221, 190, 169, 0.34)",
            padding: "28px",
            boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span>🚩</span>
            <span>Red Flags</span>
          </h3>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: "22px",
              lineHeight: 1.6,
              color: "#495255",
            }}
          >
            {formatFlagText(analysis.redFlags)}
          </p>
        </article>

        <article
          style={{
            borderRadius: "28px",
            background: "#FFFFFF",
            border: "1px solid rgba(221, 190, 169, 0.34)",
            padding: "28px",
            boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span>🌿</span>
            <span>Green Flags</span>
          </h3>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: "22px",
              lineHeight: 1.6,
              color: "#495255",
            }}
          >
            {formatFlagText(analysis.greenFlags)}
          </p>
        </article>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        <article
          style={{
            borderRadius: "28px",
            background: "#FFFFFF",
            border: "1px solid rgba(221, 190, 169, 0.34)",
            padding: "28px",
            boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
            display: "grid",
            gridTemplateRows: "auto auto",
            gap: "18px",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "30px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span>✨</span>
              <span>Vibe Summary</span>
            </h3>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: "21px",
                lineHeight: 1.7,
                color: "#5F6668",
              }}
            >
              {analysis.vibeSummary}
            </p>
          </div>
          <div
            style={{
              borderRadius: "24px",
              background: "#FFFFFF",
              border: "1px solid rgba(221, 190, 169, 0.34)",
              padding: "22px 24px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6B8F71",
              }}
            >
              Best Reply
            </p>
            <p
              style={{
                margin: "14px 0 0",
                fontSize: "20px",
                lineHeight: 1.6,
                color: "#3F4749",
              }}
            >
              {analysis.bestReply}
            </p>
          </div>
        </article>

        <article
          style={{
            borderRadius: "28px",
            background: "#FFFFFF",
            border: "1px solid rgba(221, 190, 169, 0.34)",
            padding: "28px",
            boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "30px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span>🫖</span>
              <span>Final Verdict</span>
            </h3>
            <p
              style={{
                margin: "18px 0 0",
                fontSize: "22px",
                lineHeight: 1.7,
                color: "#4F585A",
              }}
            >
              {analysis.finalVerdict}
            </p>
          </div>
          <p
            style={{
              margin: "28px 0 0",
              fontSize: "17px",
              lineHeight: 1.6,
              color: "#6F7779",
            }}
          >
            Your group chat&apos;s smartest unemployed friend.
          </p>
        </article>
      </div>
    </div>
  );
}
