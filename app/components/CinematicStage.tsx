"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, ShieldAlert, Sparkles, Compass, Swords } from "lucide-react";
import { CinematicDilemma, StoryBeat, ChoiceOption } from "@/app/data/cinematicEngineData";
import { TypewriterText } from "./TypewriterText";

interface CinematicStageProps {
  dilemma: CinematicDilemma;
  onChoiceConfirmed: (
    impact: { dharma: number; loyalty: number; survival: number },
    choice?: ChoiceOption,
    choiceIndex?: number
  ) => void;
}

export function CinematicStage({ dilemma, onChoiceConfirmed }: CinematicStageProps) {
  const [mode, setMode] = useState<"cutscene" | "decision" | "reaction">("cutscene");
  const [beatIndex, setBeatIndex] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  // Reset state when dilemma changes
  useEffect(() => {
    setMode("cutscene");
    setBeatIndex(0);
    setSelectedChoiceIdx(null);
  }, [dilemma.id]);

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

  // Keyboard navigation
  useEffect(() => {
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
    // Disabled all bouncing, jumping, and translate transforms to keep the dialogue box completely static and stable
    return "";
  };

  return (
    <div
      className={`relative w-full mx-auto rounded-3xl overflow-hidden bg-neutral-950 border border-amber-500/40 backdrop-blur-xl shadow-2xl flex flex-col transition-all duration-300 ${getCueStyle()}`}
    >
      {/* 1. TOP VIEWPORT (380px–500px): HD Scene Image with Crisp Edge Rendering & Zero Blur */}
      <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] lg:h-[500px] overflow-hidden bg-neutral-900 select-none">
        <img
          src={dilemma.sceneBackground}
          alt={dilemma.stageTitle}
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out scale-100 image-crisp"
          style={{
            imageRendering: "crisp-edges",
            filter: "contrast(1.06) saturate(1.05)",
          }}
          onError={(e) => {
            // Fallback to chariot front if specific scene fails
            (e.target as HTMLImageElement).src = "/scenes/chariot_front.jpg";
          }}
        />

        {/* Soft edge vignettes: clear center view with subtle twilight gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/70 pointer-events-none" />

        {/* Gold-Trimmed Scene Meta Tags HUD */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-amber-500/40 backdrop-blur-md shadow-lg">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-serif tracking-[0.2em] text-amber-300 uppercase font-semibold">
              {dilemma.act} • Juncture {dilemma.phaseNumber}
            </span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-black/80 border border-amber-500/40 backdrop-blur-md shadow-lg">
            <span className="text-[11px] font-serif tracking-widest text-neutral-300 uppercase">
              {dilemma.location}
            </span>
          </div>
        </div>

        {/* Floating Scene Title Banner */}
        <div className="absolute bottom-3 left-6 right-6 flex items-end justify-between pointer-events-none">
          <div>
            <span className="text-[10px] sm:text-xs font-serif tracking-[0.3em] text-amber-400/90 uppercase block mb-0.5">
              Historical Scene Witness
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-amber-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {dilemma.stageTitle}
            </h2>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-black/75 border border-amber-500/30 text-[10px] sm:text-xs font-serif text-amber-300 uppercase tracking-widest">
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {mode === "cutscene" && `Beat ${beatIndex + 1} of ${dilemma.cutsceneBeats.length}`}
              {mode === "decision" && "Ethical Crossroads"}
              {mode === "reaction" && "Karmic Consequence"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. LOWER-THIRD VISUAL DIALOGUE BOX */}
      <div className="relative p-6 sm:p-7 md:p-8 bg-neutral-950/95 border-t border-amber-500/30 flex flex-col md:flex-row gap-6 items-start md:items-center min-h-[175px]">
        {/* Left: 92x92px Sharp Character Portrait with Glowing Gold Border & Badge */}
        <div className="relative shrink-0 self-center md:self-start">
          <div className="w-[88px] h-[88px] sm:w-[94px] sm:h-[94px] rounded-2xl border-2 border-amber-400/90 bg-neutral-900 overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.4)] relative">
            <img
              src={`/portraits/${currentBeat.avatarKey}.jpg`}
              alt={currentBeat.speaker}
              className="w-full h-full object-cover object-top image-crisp"
              style={{
                imageRendering: "crisp-edges",
                filter: "contrast(1.08) saturate(1.05)",
              }}
              onError={(e) => {
                // Fallback to png if jpg missing
                (e.target as HTMLImageElement).src = `/portraits/${currentBeat.avatarKey}.png`;
              }}
            />
          </div>
          <span className="absolute -bottom-2.5 inset-x-0 mx-auto text-center px-2 py-0.5 rounded-md bg-black/95 border border-amber-400/80 text-[10px] sm:text-[11px] font-serif text-amber-300 uppercase tracking-widest whitespace-nowrap shadow-md">
            {currentBeat.speaker}
          </span>
        </div>

        {/* Right: Dialogue Text Field with Typewriter Effect */}
        <div className="flex-1 w-full space-y-2 text-left">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
            <span className="text-xs sm:text-sm font-serif font-bold text-amber-400 tracking-wider uppercase">
              {currentBeat.speaker}
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-400 font-mono">
              [Click text to instant reveal]
            </span>
          </div>

          <p className="text-base sm:text-lg md:text-xl font-serif text-neutral-100 leading-relaxed italic min-h-[84px]">
            &ldquo;
            <TypewriterText
              key={`${dilemma.id}-${mode}-${beatIndex}-${selectedChoiceIdx}`}
              text={currentBeat.text}
              speedMs={18}
            />
            &rdquo;
          </p>
        </div>
      </div>

      {/* 3. BOTTOM INTERACTIVE DRAWER (Action buttons & Decision Cards) */}
      <div className="p-5 sm:p-6 md:p-7 bg-black/90 border-t border-amber-500/25">
        {mode === "cutscene" && (
          <button
            onClick={handleNextBeat}
            className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>Continue Dialogue</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        {mode === "decision" && (
          <div className="space-y-4 sm:space-y-5 animate-page-entrance">
            <div className="text-center text-sm sm:text-base font-serif font-bold text-amber-300 uppercase tracking-widest pb-1 flex items-center justify-center gap-2.5">
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-pulse" />
              <span>{dilemma.dilemmaPrompt}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {dilemma.choices.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectChoice(idx)}
                  className="group relative p-5 sm:p-6 md:p-7 rounded-2xl text-left bg-neutral-900/90 hover:bg-neutral-800/95 border-2 border-amber-500/40 hover:border-amber-400 transition-all active:scale-[0.99] cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] flex flex-col justify-between min-h-[160px]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                      <span className="text-sm sm:text-base font-serif font-bold text-amber-300 group-hover:text-amber-200 uppercase tracking-wider">
                        Option {idx === 0 ? "A" : "B"}: {c.label}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-black/60 border border-amber-500/30 text-xs font-mono text-neutral-300 group-hover:text-amber-300 group-hover:border-amber-400">
                        [Key {idx === 0 ? "1" : "2"}]
                      </span>
                    </div>
                    <p className="text-sm sm:text-[15px] text-neutral-200 leading-relaxed font-serif">
                      {c.description}
                    </p>
                  </div>

                  {/* Impact preview chips */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-4 mt-3 border-t border-neutral-800/80 text-xs font-mono font-medium">
                    <span className={`px-2.5 py-1 rounded-lg bg-black/60 border ${c.impact.dharma >= 0 ? "border-emerald-500/30 text-emerald-400" : "border-red-500/30 text-red-400"}`}>
                      {c.impact.dharma >= 0 ? "+" : ""}{c.impact.dharma} Dharma
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg bg-black/60 border ${c.impact.loyalty >= 0 ? "border-amber-500/30 text-amber-400" : "border-red-500/30 text-red-400"}`}>
                      {c.impact.loyalty >= 0 ? "+" : ""}{c.impact.loyalty} Loyalty
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg bg-black/60 border ${c.impact.survival >= 0 ? "border-cyan-500/30 text-cyan-400" : "border-red-500/30 text-red-400"}`}>
                      {c.impact.survival >= 0 ? "+" : ""}{c.impact.survival} Survival
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === "reaction" && (
          <button
            onClick={handleProceed}
            className="w-full py-4 sm:py-4.5 px-8 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-[0.99] transition shadow-lg shadow-emerald-500/25 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Lock Karma & Proceed to Next Juncture</span>
          </button>
        )}
      </div>
    </div>
  );
}
