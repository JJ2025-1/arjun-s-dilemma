"use client";
import React, { useState } from "react";
import { ChevronRight, ShieldAlert, Sparkles } from "lucide-react";
import { CinematicDilemma, StoryBeat, ChoiceOption } from "@/app/data/cinematicDilemmas";

interface CinematicPlayerProps {
  dilemma: CinematicDilemma;
  onChoiceConfirmed: (
    impact: { dharma: number; loyalty: number; survival: number },
    choice?: ChoiceOption,
    choiceIndex?: number
  ) => void;
}

export function CinematicPlayer({ dilemma, onChoiceConfirmed }: CinematicPlayerProps) {
  const [mode, setMode] = useState<"cutscene" | "decision" | "reaction">("cutscene");
  const [beatIndex, setBeatIndex] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  const currentBeat: StoryBeat =
    mode === "cutscene"
      ? dilemma.cutsceneBeats[beatIndex]
      : selectedChoiceIdx !== null
      ? dilemma.choices[selectedChoiceIdx].reactionBeat
      : dilemma.cutsceneBeats[0];

  const handleNextBeat = () => {
    if (beatIndex < dilemma.cutsceneBeats.length - 1) {
      setBeatIndex((prev) => prev + 1);
    } else {
      setMode("decision");
    }
  };

  const handleSelectChoice = (idx: number) => {
    setSelectedChoiceIdx(idx);
    setMode("reaction");
  };

  const handleProceed = () => {
    if (selectedChoiceIdx !== null) {
      const choice = dilemma.choices[selectedChoiceIdx];
      onChoiceConfirmed(choice.impact, choice, selectedChoiceIdx);
    }
  };

  // Keyboard navigation support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (mode === "cutscene") {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
          e.preventDefault();
          handleNextBeat();
        }
      } else if (mode === "decision") {
        if (e.key === "1" || e.key.toLowerCase() === "a") {
          e.preventDefault();
          handleSelectChoice(0);
        } else if (e.key === "2" || e.key.toLowerCase() === "b") {
          e.preventDefault();
          handleSelectChoice(1);
        }
      } else if (mode === "reaction") {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleProceed();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, beatIndex, selectedChoiceIdx]);

  const getCueStyle = () => {
    return "";
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden bg-neutral-950/90 border border-amber-500/40 backdrop-blur-xl shadow-2xl flex flex-col transition-all duration-300 ${getCueStyle()}`}>
      {/* 1. Header Navigation */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-amber-500/20 bg-black/60">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-serif tracking-[0.25em] text-amber-400 uppercase">
            {dilemma.location}
          </span>
        </div>
        <span className="text-[11px] font-serif tracking-widest text-neutral-400 uppercase">
          {mode === "cutscene" && `Story Beat ${beatIndex + 1} of ${dilemma.cutsceneBeats.length}`}
          {mode === "decision" && "Ethical Crossroads"}
          {mode === "reaction" && "Karmic Consequence"}
        </span>
      </div>

      {/* 2. Cinematic Character Interaction Stage */}
      <div className="p-8 flex flex-col md:flex-row gap-6 items-center min-h-[220px]">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full border-2 border-amber-400/80 bg-neutral-900 overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-pulse">
            <img
              src={`/portraits/${currentBeat.avatarKey}.png`}
              alt={currentBeat.speaker}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
            />
          </div>
          <span className="absolute -bottom-2 inset-x-0 mx-auto text-center px-2 py-0.5 rounded bg-black/90 border border-amber-500/50 text-[10px] font-serif text-amber-300 uppercase tracking-widest whitespace-nowrap">
            {currentBeat.speaker}
          </span>
        </div>

        <div className="flex-1 space-y-3 text-left">
          <p className="text-lg md:text-xl font-serif text-neutral-100 leading-relaxed italic">
            "{currentBeat.text}"
          </p>
        </div>
      </div>

      {/* 3. Bottom Interactive Drawer */}
      <div className="p-6 bg-black/80 border-t border-amber-500/20">
        {mode === "cutscene" && (
          <button
            onClick={handleNextBeat}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition cursor-pointer"
          >
            <span>Continue Scene</span>
            <ChevronRight className="w-4 h-4"/>
          </button>
        )}

        {mode === "decision" && (
          <div className="space-y-4 animate-page-entrance">
            <div className="text-center text-xs font-serif text-amber-300 uppercase tracking-widest pb-1 flex items-center justify-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400"/>
              {dilemma.dilemmaPrompt}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dilemma.choices.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectChoice(idx)}
                  className="p-4 rounded-xl text-left bg-neutral-900/90 border border-amber-500/30 hover:border-amber-400 hover:bg-neutral-800/80 transition active:scale-[0.98] cursor-pointer group space-y-1.5"
                >
                  <span className="text-xs font-serif font-bold text-amber-300 group-hover:text-amber-200">
                    Option {idx === 0 ? "A" : "B"}: {c.label}
                  </span>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    {c.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === "reaction" && (
          <button
            onClick={handleProceed}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-[0.99] transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4"/>
            <span>Lock Karma & Proceed to Next Juncture</span>
          </button>
        )}
      </div>
    </div>
  );
}
