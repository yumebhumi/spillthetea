"use client";

import { useEffect, useState } from "react";
import { ChatInputSection } from "@/components/home/chat-input-section";
import { HeroSection } from "@/components/home/hero-section";
import { PrivacyNote } from "@/components/home/privacy-note";
import { ResultSection } from "@/components/home/result-section";
import type { AnalysisResult } from "@/components/home/types";

type AnalyzeApiSuccess = {
  success: true;
  analysis: AnalysisResult;
};

type AnalyzeApiError = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export function HomePageClient() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("brewing the tea...");

  useEffect(() => {
    if (!isLoading) {
      setLoadingMessage("brewing the tea...");
      return;
    }

    const messages = [
      "brewing the tea...",
      "consulting the group chat experts...",
      "reading between the lines...",
      "preparing today's tea report...",
    ];

    let messageIndex = 0;
    const interval = window.setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [isLoading]);

  async function handleAnalyze(chatText: string, image: File | null) {
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("chatText", chatText);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "The server returned an unexpected response. Refresh the page and try again.",
        );
      }

      const data = (await response.json()) as AnalyzeApiSuccess | AnalyzeApiError;

      if (!response.ok || !data.success) {
        const message =
          "error" in data ? data.error.message : "Something went wrong while spilling the tea.";
        throw new Error(message);
      }

      setAnalysis(data.analysis);
      window.location.hash = "result";
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while spilling the tea.";

      setAnalysis(null);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setAnalysis(null);
    setErrorMessage("");
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f3f1ea] text-[#384042]">
      <HeroSection />
      <ChatInputSection
        isLoading={isLoading}
        loadingMessage={loadingMessage}
        errorMessage={errorMessage}
        onAnalyze={handleAnalyze}
        onResetResult={handleReset}
      />
      <ResultSection
        analysis={analysis}
        isLoading={isLoading}
        loadingMessage={loadingMessage}
        errorMessage={errorMessage}
      />
      <PrivacyNote />
    </main>
  );
}
