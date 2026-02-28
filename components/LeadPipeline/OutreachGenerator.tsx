"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { messageTypes, tones } from "../../lib/constants";

export default function OutreachGenerator({
  onGenerate,
}: {
  onGenerate: (type: string, tone: string) => Promise<string>;
}) {
  const [messageType, setMessageType] = useState<string>(messageTypes[0]);
  const [tone, setTone] = useState<string>(tones[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [copied, setCopied] = useState(false);

  const typewriter = useMemo(() => message, [message]);

  useEffect(() => {
    if (!typewriter) return;
    setDisplayed("");
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(typewriter.slice(0, index));
      if (index >= typewriter.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [typewriter]);

  const handleGenerate = async () => {
    setLoading(true);
    setCopied(false);
    try {
      const result = await onGenerate(messageType, tone);
      setMessage(result || "AI-generated outreach will appear here.");
    } catch (err) {
      setMessage("We could not generate a message yet. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!displayed) return;
    await navigator.clipboard.writeText(displayed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-border bg-bg/60 p-4">
      <div className="flex flex-wrap gap-3 text-xs text-muted">
        {messageTypes.map((type) => (
          <button
            key={type}
            onClick={() => setMessageType(type)}
            className={`rounded-full border px-3 py-1 ${messageType === type ? "border-secondary text-text" : "border-border"}`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
        {tones.map((item) => (
          <button
            key={item}
            onClick={() => setTone(item)}
            className={`rounded-full border px-3 py-1 ${tone === item ? "border-primary text-text" : "border-border"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 rounded-full bg-hero px-4 py-2 text-xs font-semibold text-white"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      <div className="mt-4 min-h-[120px] rounded-xl border border-border bg-surface/60 p-3 text-sm text-text">
        {displayed || "Select a message type and tone to generate outreach."}
      </div>
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.96 }}
        animate={copied ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted"
      >
        {copied ? "✓ Copied" : "Copy"}
      </motion.button>
    </div>
  );
}
