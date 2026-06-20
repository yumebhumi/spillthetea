"use client";

import type { AnalysisResult } from "@/components/home/types";
import { forwardRef } from "react";

type ExportResultCardProps = {
  analysis: AnalysisResult | null;
};

const scoreCards = [
  {
    key: "teaStrength",
    title: "Tea Strength",
    emoji: "☕",
  },
  {
    key: "flirtingScore",
    title: "Flirting Score",
    emoji: "😉",
  },
  {
    key: "ghostingRisk",
    title: "Ghosting Risk",
    emoji: "👻",
  },
  {
    key: "deluluLevel",
    title: "Delulu Level",
    emoji: "💭",
  },
] as const;

function getScoreValue(analysis: AnalysisResult, key: (typeof scoreCards)[number]["key"]) {
  if (key === "teaStrength" || key === "flirtingScore") {
    return `${analysis[key]}%`;
  }

  return analysis[key];
}

function joinFlagText(items: string[]) {
  if (items.length === 0) {
    return "No major notes.";
  }

  return items.slice(0, 4).join(" • ");
}

export const ExportResultCard = forwardRef<HTMLDivElement, ExportResultCardProps>(
  function ExportResultCard({ analysis }, ref) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-99999px",
          top: 0,
          width: "1080px",
          minHeight: "1080px",
          height: "auto",
          padding: "64px",
          paddingBottom: "96px",
          background: "#F7F7F2",
          overflow: "visible",
          pointerEvents: "none",
          color: "#2D3436",
          fontFamily:
            '"Inter", "Manrope", "Avenir Next", "Segoe UI", ui-sans-serif, sans-serif',
          boxSizing: "border-box",
        }}
      >
        <div
          ref={ref}
          style={{
            width: "100%",
            minHeight: "952px",
            borderRadius: "32px",
            background: "#F7F7F2",
            display: "grid",
            gridTemplateRows: "auto auto auto auto auto",
            gap: "24px",
            boxSizing: "border-box",
          }}
        >
          {analysis ? (
            <>
              <section
                style={{
                  borderRadius: "32px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(221, 190, 169, 0.34)",
                  boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
                  padding: "40px",
                  display: "grid",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        lineHeight: 1.2,
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#6B8F71",
                      }}
                    >
                      Result
                    </p>
                    <h2
                      style={{
                        margin: "14px 0 0",
                        fontSize: "56px",
                        lineHeight: 0.96,
                        letterSpacing: "-0.05em",
                        fontWeight: 800,
                        color: "#2D3436",
                      }}
                    >
                      🫖 THE TEA HAS BEEN SPILLED
                    </h2>
                  </div>
                  <div
                    style={{
                      flexShrink: 0,
                      borderRadius: "999px",
                      background: "#F7F7F2",
                      border: "1px solid rgba(221, 190, 169, 0.34)",
                      padding: "14px 20px",
                      color: "#6B8F71",
                      fontSize: "22px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Spill The Tea ☕
                  </div>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "23px",
                    lineHeight: 1.65,
                    color: "#5F6668",
                  }}
                >
                  Here&apos;s what the chat is giving.
                </p>
              </section>

              <section
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
                      boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
                      padding: "28px",
                      display: "grid",
                      gap: "14px",
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
                          fontSize: "17px",
                          lineHeight: 1.3,
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#6B8F71",
                        }}
                      >
                        {card.title}
                      </p>
                      <span style={{ fontSize: "30px", lineHeight: 1 }}>{card.emoji}</span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "46px",
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        fontWeight: 800,
                        color: "#2D3436",
                      }}
                    >
                      {getScoreValue(analysis, card.key)}
                    </p>
                  </article>
                ))}
              </section>

              <section
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
                    boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
                    padding: "28px",
                    display: "grid",
                    gap: "14px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "28px",
                      lineHeight: 1.1,
                      fontWeight: 800,
                      color: "#2D3436",
                    }}
                  >
                    🚩 Red Flags
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "21px",
                      lineHeight: 1.65,
                      color: "#495255",
                    }}
                  >
                    {joinFlagText(analysis.redFlags)}
                  </p>
                </article>

                <article
                  style={{
                    borderRadius: "28px",
                    background: "#FFFFFF",
                    border: "1px solid rgba(221, 190, 169, 0.34)",
                    boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
                    padding: "28px",
                    display: "grid",
                    gap: "14px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "28px",
                      lineHeight: 1.1,
                      fontWeight: 800,
                      color: "#2D3436",
                    }}
                  >
                    🌿 Green Flags
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "21px",
                      lineHeight: 1.65,
                      color: "#495255",
                    }}
                  >
                    {joinFlagText(analysis.greenFlags)}
                  </p>
                </article>
              </section>

              <section
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: "20px",
                }}
              >
                <article
                  style={{
                    borderRadius: "28px",
                    background: "#FFFFFF",
                    border: "1px solid rgba(221, 190, 169, 0.34)",
                    boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
                    padding: "30px",
                    display: "grid",
                    gap: "16px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "28px",
                      lineHeight: 1.1,
                      fontWeight: 800,
                      color: "#2D3436",
                    }}
                  >
                    ✨ Vibe Summary
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "21px",
                      lineHeight: 1.75,
                      color: "#5F6668",
                    }}
                  >
                    {analysis.vibeSummary}
                  </p>
                </article>
              </section>

              <section
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: "20px",
                }}
              >
                <article
                  style={{
                    borderRadius: "28px",
                    background: "#FFFFFF",
                    border: "1px solid rgba(221, 190, 169, 0.34)",
                    boxShadow: "0 16px 34px rgba(92, 112, 97, 0.06)",
                    padding: "30px",
                    display: "grid",
                    gap: "16px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      lineHeight: 1.3,
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#6B8F71",
                    }}
                  >
                    Final Verdict
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "22px",
                      lineHeight: 1.75,
                      color: "#4F585A",
                    }}
                  >
                    {analysis.finalVerdict}
                  </p>
                  <div
                    style={{
                      marginTop: "10px",
                      paddingTop: "18px",
                      borderTop: "1px solid rgba(221, 190, 169, 0.34)",
                      display: "grid",
                      gap: "10px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        lineHeight: 1.4,
                        fontWeight: 700,
                        color: "#6B8F71",
                      }}
                    >
                      Spill The Tea ☕
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        lineHeight: 1.6,
                        color: "#6F7779",
                      }}
                    >
                      Your group chat&apos;s smartest unemployed friend.
                    </p>
                  </div>
                </article>
              </section>
            </>
          ) : null}
        </div>
      </div>
    );
  },
);
