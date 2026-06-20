"use client";

import { ExportResultCard } from "@/components/home/export-result-card";
import type { AnalysisResult } from "@/components/home/types";
import { forwardRef } from "react";

type ExportResultCardHostProps = {
  analysis: AnalysisResult | null;
};

export const ExportResultCardHost = forwardRef<HTMLDivElement, ExportResultCardHostProps>(
  function ExportResultCardHost({ analysis }, ref) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "-99999px",
          top: "0",
          width: "1080px",
          height: "1080px",
          pointerEvents: "none",
          opacity: 0,
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <div ref={ref}>{analysis ? <ExportResultCard analysis={analysis} /> : null}</div>
      </div>
    );
  },
);
