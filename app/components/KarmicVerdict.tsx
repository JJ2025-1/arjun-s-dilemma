"use client";
import React, { useState } from "react";
import { RotateCcw, Award, Scroll, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export interface DecisionRecord {
  scenarioIndex: number;
  scenarioTitle: string;
  character: string;
  choiceId: "A" | "B";
  choiceTitle: string;
  flavor: string;
  dharmaDelta: number;
  loyaltyDelta: number;
  survivalDelta: number;
}

interface KarmicVerdictProps {
  stats: { dharma: number; loyalty: number; survival: number };
  onRestart: () => void;
  history?: DecisionRecord[];
}

export function KarmicVerdict({ stats, onRestart, history = [] }: KarmicVerdictProps) {
  const [showChronicle, setShowChronicle] = useState(false);

  const getVerdict = () => {
    if (stats.dharma <= 0) {
      return {
        title: "Adharmic Despot (अधर्म चक्रवर्ती)",
        desc: "You preserved temporal power and mortal survival at the absolute cost of cosmic truth. The kingdom is won, but dharma lies vanquished beneath your throne.",
        badgeColor: "border-red-500 text-red-400 bg-red-950/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]",
      };
    }
    if (stats.survival <= 0) {
      return {
        title: "The Martyred Ascetic (त्यागी संन्यासी)",
        desc: "Your conscience remained immaculate and your vows untainted, but without a protector, the world and dynasty collapsed into chaos.",
        badgeColor: "border-emerald-500 text-emerald-400 bg-emerald-950/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      };
    }
    if (stats.loyalty <= 0) {
      return {
        title: "The Scarred Veteran (कुरुक्षेत्रस्य साक्षी)",
        desc: "You walked through the blazing inferno of Kurukshetra, severing fraternal and emotional bonds to uphold cold duty. You bear eternal moral scars.",
        badgeColor: "border-yellow-500 text-yellow-300 bg-yellow-950/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]",
      };
    }
    if (stats.dharma >= 55 && stats.survival >= 30) {
      return {
        title: "Nimitta-Matra: Instrument of Time (निमित्तमात्रम्)",
        desc: "You understood the transcendent counsel of the Bhagavad Gita: you are neither the slayer nor the slain, but an enlightened instrument of cosmic law.",
        badgeColor: "border-cyan-400 text-cyan-300 bg-cyan-950/50 shadow-[0_0_25px_rgba(34,211,238,0.4)]",
      };
    }
    return {
      title: "The Scarred Veteran (कुरुक्षेत्रस्य साक्षी)",
      desc: "Neither pure saint nor despot. You navigated the impossible moral labyrinth of Kurukshetra with courage and profound compromise.",
      badgeColor: "border-amber-500 text-amber-300 bg-amber-950/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    };
  };

  const verdict = getVerdict();

  return (
    <div className="w-full max-w-3xl mx-auto bg-neutral-950/95 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-center space-y-6 animate-page-entrance">
      {/* Badge */}
      <div className="flex justify-center">
        <div
          className={`px-5 py-2 rounded-full border text-xs font-serif tracking-[0.2em] uppercase flex items-center gap-2 ${verdict.badgeColor}`}
        >
          <Award className="w-4 h-4" />
          <span>Karmic Archetype Unlocked</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-200">
          {verdict.title}
        </h2>
        <p className="text-neutral-300 text-sm leading-relaxed max-w-xl mx-auto font-serif">
          {verdict.desc}
        </p>
      </div>

      {/* Resource Stats Overview */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-amber-500/20">
        <div className="p-3.5 bg-neutral-900/80 rounded-2xl border border-emerald-500/30">
          <span className="text-xs font-serif text-neutral-400 uppercase tracking-wider">Dharma</span>
          <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">{stats.dharma}%</p>
        </div>
        <div className="p-3.5 bg-neutral-900/80 rounded-2xl border border-amber-500/30">
          <span className="text-xs font-serif text-neutral-400 uppercase tracking-wider">Loyalty</span>
          <p className="text-2xl font-bold text-amber-400 font-mono mt-1">{stats.loyalty}%</p>
        </div>
        <div className="p-3.5 bg-neutral-900/80 rounded-2xl border border-cyan-500/30">
          <span className="text-xs font-serif text-neutral-400 uppercase tracking-wider">Survival</span>
          <p className="text-2xl font-bold text-cyan-400 font-mono mt-1">{stats.survival}%</p>
        </div>
      </div>

      {/* Decision Chronicle Breakdown Accordion */}
      {history.length > 0 && (
        <div className="pt-2 border-t border-neutral-800 text-left">
          <button
            onClick={() => setShowChronicle((prev) => !prev)}
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-900/70 hover:bg-neutral-900 border border-amber-500/20 text-amber-300 text-xs font-serif flex items-center justify-between transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Scroll className="w-4 h-4 text-amber-400" />
              <span>Decision Chronicle Breakdown ({history.length} Junctures Resolved)</span>
            </div>
            {showChronicle ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showChronicle && (
            <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {history.map((rec, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-black/60 border border-neutral-800 text-xs space-y-1 font-serif"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold">
                      Juncture {rec.scenarioIndex}: {rec.scenarioTitle}
                    </span>
                    <span className="text-[10px] text-neutral-400">{rec.choiceId === "A" ? "Option A" : "Option B"}</span>
                  </div>
                  <p className="text-neutral-200">{rec.choiceTitle}</p>
                  <div className="flex items-center gap-3 pt-1 text-[10px] font-mono">
                    <span className={rec.dharmaDelta >= 0 ? "text-emerald-400" : "text-red-400"}>
                      {rec.dharmaDelta >= 0 ? "+" : ""}{rec.dharmaDelta} Dharma
                    </span>
                    <span className={rec.loyaltyDelta >= 0 ? "text-amber-400" : "text-red-400"}>
                      {rec.loyaltyDelta >= 0 ? "+" : ""}{rec.loyaltyDelta} Loyalty
                    </span>
                    <span className={rec.survivalDelta >= 0 ? "text-cyan-400" : "text-red-400"}>
                      {rec.survivalDelta >= 0 ? "+" : ""}{rec.survivalDelta} Survival
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action: Rewind Time (Restart) */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-amber-500/25 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Rewind Time (पुनः आरम्भः)</span>
        </button>
      </div>
    </div>
  );
}
