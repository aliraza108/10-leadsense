export const API_BASE = "https://10-leadsense-api.vercel.app";

export const statusColors = {
  HOT: { bg: "#F97316", text: "🔥 HOT" },
  WARM: { bg: "#FBBF24", text: "🟠 WARM" },
  NURTURE: { bg: "#34D399", text: "🟡 NURTURE" },
  COLD: { bg: "#60A5FA", text: "🔵 COLD" },
  DISQUALIFIED: { bg: "#F87171", text: "🚫 DISQUALIFIED" },
  PENDING: { bg: "#94A3B8", text: "⏳ PENDING" },
} as const;

export const actionStyles = {
  CALL_NOW: { color: "#F97316", label: "📞 Call Now" },
  SEND_DEMO: { color: "#7C3AED", label: "🎥 Send Demo" },
  NURTURE_CAMPAIGN: { color: "#34D399", label: "📧 Nurture" },
  FOLLOW_UP: { color: "#06B6D4", label: "🔔 Follow Up" },
  IGNORE: { color: "#64748B", label: "🚫 Ignore" },
} as const;

export const filters = [
  { key: "ALL", label: "ALL" },
  { key: "HOT", label: "🔥 HOT" },
  { key: "WARM", label: "🟠 WARM" },
  { key: "NURTURE", label: "🟡 NURTURE" },
  { key: "COLD", label: "🔵 COLD" },
  { key: "DISQUALIFIED", label: "DISQUALIFIED" },
] as const;

export const messageTypes = ["Email", "LinkedIn", "SMS", "Call Script"] as const;
export const tones = ["Professional", "Friendly", "Urgent", "Casual"] as const;

export type LeadStatus = keyof typeof statusColors;
export type LeadAction = keyof typeof actionStyles;
