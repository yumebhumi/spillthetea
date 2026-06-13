export type AnalysisResult = {
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
