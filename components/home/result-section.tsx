"use client";

import type { AnalysisResult } from "@/components/home/types";
import { motion } from "framer-motion";
import { toBlob } from "html-to-image";
import { useRef, useState } from "react";

type ResultSectionProps = {
  analysis: AnalysisResult | null;
  isLoading: boolean;
  loadingMessage: string;
  errorMessage: string;
};

export function ResultSection({
  analysis,
  isLoading,
  loadingMessage,
  errorMessage,
}: ResultSectionProps) {
  const reportRef = useRef<HTMLDivElement | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const scoreCards = [
    {
      title: "Tea Strength",
      emoji: "☕",
      value: analysis ? `${analysis.teaStrength}%` : "--",
      tone: "How spicy the situation feels overall.",
    },
    {
      title: "Flirting Score",
      emoji: "😉",
      value: analysis ? `${analysis.flirtingScore}%` : "--",
      tone: "The playful-romantic energy in the chat.",
    },
    {
      title: "Ghosting Risk",
      emoji: "👻",
      value: analysis?.ghostingRisk ?? "--",
      tone: "A soft guess, not a crystal ball.",
    },
    {
      title: "Delulu Level",
      emoji: "💭",
      value: analysis?.deluluLevel ?? "--",
      tone: "How much wishful reading might be happening.",
    },
  ];

  const flagCards = [
    {
      title: "Red Flags",
      emoji: "🚩",
      items: analysis?.redFlags ?? [],
    },
    {
      title: "Green Flags",
      emoji: "🌿",
      items: analysis?.greenFlags ?? [],
    },
  ];

  async function buildReportFile() {
    if (!reportRef.current || !analysis) {
      throw new Error("Run an analysis first.");
    }

    const blob = await toBlob(reportRef.current, {
      backgroundColor: "#f3f1ea",
      pixelRatio: 2,
    });

    if (!blob) {
      throw new Error("Could not generate the report image.");
    }

    return new File([blob], "spill-the-tea-report.png", {
      type: "image/png",
    });
  }

  function triggerDownload(file: File) {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleDownloadImage() {
    setIsSharing(true);

    try {
      const file = await buildReportFile();
      triggerDownload(file);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <section id="result" className="px-0 py-8 sm:py-12 lg:py-14">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.45 }}
          className="matcha-card rounded-[1.75rem] p-5 sm:rounded-[2rem] sm:p-8"
        >
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8f71]">
                Result
              </p>
              <h2 className="mt-3 text-[2rem] font-extrabold tracking-[-0.03em] text-[#2d3436] sm:text-4xl">
                🫖 THE TEA HAS BEEN SPILLED
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f6668] sm:text-base">
                {isLoading
                  ? loadingMessage
                  : analysis
                    ? "Here's what the chat is giving."
                    : errorMessage
                      ? "Something went off-script. Fix the input and try again."
                      : "Add chat text or a screenshot, then hit Analyze to spill the tea."}
              </p>
            </div>

            {analysis ? (
              <div className="flex items-center md:justify-end">
                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    disabled={isSharing}
                    aria-label="Download report image"
                    title="Download report image"
                    className="soft-lift flex h-12 w-12 items-center justify-center rounded-full bg-[#6b8f71] text-white transition hover:scale-[1.02] hover:bg-[#5f8165] disabled:cursor-not-allowed disabled:bg-[#a7bca9] disabled:hover:scale-100"
                  >
                    <span className="text-xl">{isSharing ? "…" : "↓"}</span>
                  </button>
              </div>
            ) : null}
          </div>

          <div ref={reportRef}>
            {!analysis && !isLoading && !errorMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
                className="mb-4 rounded-[1.35rem] border border-dashed border-[#d9c8bb] bg-[#f8f5ef] px-4 py-5 text-center sm:rounded-[1.5rem] sm:px-6 sm:py-6"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fcfaf6] text-2xl shadow-sm">
                  🍵
                </div>
                <p className="mt-4 text-lg font-bold text-[#2d3436]">
                  Your tea report will show up here
                </p>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-[#667072] sm:text-base">
                  Paste a chat, drop a screenshot, and the cards below will fill in with a
                  cute, lightweight read on the vibe.
                </p>
              </motion.div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {scoreCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="result-card matcha-card rounded-[1.35rem] p-4 sm:rounded-[1.5rem] sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b8f71]">
                      {card.title}
                    </p>
                    <span className="text-2xl">{card.emoji}</span>
                  </div>
                  <p className="mt-4 text-[2rem] font-extrabold tracking-[-0.03em] text-[#2d3436] sm:text-3xl">
                    {card.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#667072]">{card.tone}</p>
                </motion.article>
              ))}
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-2">
              {flagCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: (index + 4) * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="result-card matcha-card rounded-[1.35rem] p-4 sm:rounded-[1.5rem] sm:p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{card.emoji}</span>
                    <h3 className="text-lg font-bold text-[#2d3436]">{card.title}</h3>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.items.length > 0 ? (
                      card.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#e2d5cb] bg-[#f5f0ea] px-3 py-2 text-sm text-[#495255]"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full border border-[#e2d5cb] bg-[#f5f0ea] px-3 py-2 text-sm text-[#7d8688]">
                        No analysis yet
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: 0.3 }}
                whileHover={{ y: -4 }}
                className="result-card matcha-card rounded-[1.35rem] p-4 sm:rounded-[1.5rem] sm:p-6"
              >
                <h3 className="flex items-center gap-3 text-lg font-bold text-[#2d3436]">
                  <span className="text-2xl">✨</span>
                  Vibe Summary
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#5f6668] sm:text-base">
                  {analysis?.vibeSummary ??
                    "The overall energy will show up here after you run an analysis."}
                </p>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: 0.36 }}
                whileHover={{ y: -4 }}
                className="result-card rounded-[1.35rem] border border-[#e2d5cb] bg-[#f6eee7] p-4 shadow-[0_18px_40px_rgba(92,112,97,0.05)] sm:rounded-[1.5rem] sm:p-6"
              >
                <h3 className="flex items-center gap-3 text-lg font-bold text-[#2d3436]">
                  <span className="text-2xl">💬</span>
                  Best Reply
                </h3>
                <p className="mt-4 rounded-[1.25rem] bg-[#fcfaf6] px-4 py-4 text-sm leading-7 text-[#3f4749] shadow-sm">
                  {analysis?.bestReply ??
                    "A playful reply suggestion will appear here after analysis."}
                </p>
              </motion.article>
            </div>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: 0.42 }}
              whileHover={{ y: -4 }}
              className="result-card mt-4 rounded-[1.35rem] border border-[#d9c8bb] bg-[#edf2e7] p-4 shadow-[0_18px_40px_rgba(92,112,97,0.05)] sm:rounded-[1.5rem] sm:p-6"
            >
              <h3 className="flex items-center gap-3 text-lg font-bold text-[#2d3436]">
                <span className="text-2xl">🫖</span>
                Final Verdict
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#4f585a] sm:text-base">
                {analysis?.finalVerdict ??
                  "The final verdict will land here once the tea has been analyzed."}
              </p>
            </motion.article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
