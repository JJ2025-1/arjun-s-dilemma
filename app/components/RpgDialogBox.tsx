import React from "react";
import {
  ChevronRight,
  Flame,
  Info,
  Sparkles,
  Quote,
  Swords,
  Shield,
  Scroll,
} from "lucide-react";
import { CharacterAvatar, CharacterKey } from "./GameAvatars";

export interface Choice {
  id: "A" | "B";
  label: string;
  actionTitle: string;
  flavor: string;
  moralCommentary: string;
  dharmaDelta: number;
  loyaltyDelta: number;
  survivalDelta: number;
  quoteOnPick: string;
}

export interface Scenario {
  id: string;
  index: number;
  character: CharacterKey;
  characterTitle: string;
  dilemmaTitle: string;
  sanskritSubtitle: string;
  location: string;
  quote: string;
  context: string;
  moralTension: string;
  choiceA: Choice;
  choiceB: Choice;
  illustrationType: "armor" | "dice" | "river" | "dwarka" | "wheel";
}

interface RpgDialogBoxProps {
  scenario: Scenario;
  opponentCharacter: CharacterKey;
  consequenceRipple: string | null;
  lastChoiceQuote: string | null;
  hoveredChoice: Choice | null;
  onHoverChoice: (choice: Choice | null) => void;
  onSelectChoice: (choice: Choice) => void;
  isTransitioning: boolean;
  totalScenarios: number;
  artComponent: React.ReactNode;
}

export function RpgDialogBox({
  scenario,
  opponentCharacter,
  consequenceRipple,
  lastChoiceQuote,
  hoveredChoice,
  onHoverChoice,
  onSelectChoice,
  isTransitioning,
  totalScenarios,
  artComponent,
}: RpgDialogBoxProps) {
  // Determine avatar auras
  const heroAura =
    scenario.character === "Krishna"
      ? "amber"
      : scenario.character === "Yudhishthira"
      ? "azure"
      : "crimson";

  const opponentAura =
    opponentCharacter === "Krishna" || opponentCharacter === "Indra"
      ? "amber"
      : opponentCharacter === "Kunti"
      ? "rose"
      : "crimson";

  return (
    <div
      key={scenario.id}
      className={`w-full flex flex-col ${
        isTransitioning
          ? "animate-dilemma-exit pointer-events-none"
          : "animate-dilemma-enter"
      }`}
    >
      {/* 1. Tactical Battlefield Art Banner */}
      <div className="mb-4 relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
        {artComponent}

        {/* Tactical Location & Chapter Badge */}
        <div className="absolute top-2.5 left-3 flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-950/85 border border-amber-500/50 text-amber-300 font-serif font-bold text-[10px] sm:text-xs tracking-wider uppercase shadow-md flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>
              DILEMMA {scenario.index} OF {totalScenarios}
            </span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-950/80 border border-neutral-700 text-neutral-300 text-[10px] sm:text-xs font-serif hidden sm:inline-block">
            {scenario.location}
          </span>
        </div>
      </div>

      {/* 2. Classic 3D-RPG Dialog Box with Large Left Character Bust */}
      <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#1c140d]/95 via-[#120e0a]/95 to-[#0b0806]/98 border-2 border-amber-500/60 p-4 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.9)] bezel-gold-inner">
        {/* Ornate Engraved Corner Rivets */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_4px_#f59e0b]" />
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_4px_#f59e0b]" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_4px_#f59e0b]" />
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_4px_#f59e0b]" />

        {/* Projecting 3D Gold Speaker Nameplate */}
        <div className="absolute -top-4 sm:-top-5 left-6 sm:left-10 z-20 flex items-center space-x-2">
          <div className="px-4 py-1 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 border-2 border-amber-200 shadow-[0_4px_12px_rgba(0,0,0,0.85)] flex items-center space-x-2">
            <Swords className="w-3.5 h-3.5 text-neutral-950" />
            <span className="text-xs sm:text-sm font-serif font-extrabold uppercase tracking-widest text-neutral-950 drop-shadow">
              {scenario.character}
            </span>
            <span className="text-[10px] sm:text-xs font-serif font-medium text-amber-950 hidden md:inline">
              • {scenario.characterTitle}
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-lg bg-neutral-950/90 border border-amber-500/40 text-[10px] sm:text-xs font-serif text-amber-400 hidden lg:inline">
            {scenario.sanskritSubtitle}
          </span>
        </div>

        {/* Dialogue Box Main Body: Left Avatar Bust + Right Narrative */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 pt-3 sm:pt-2">
          {/* Prominent Large Character Bust (Left Side) */}
          <div className="flex flex-row md:flex-col items-center justify-center gap-3 shrink-0">
            <CharacterAvatar
              character={scenario.character}
              size="lg"
              auraColor={heroAura}
              active={true}
              showNameplate={false}
            />

            {/* Sub-label under avatar */}
            <div className="text-center">
              <div className="text-[11px] font-serif font-bold text-amber-300">
                {scenario.character}
              </div>
              <div className="text-[9px] text-neutral-400 max-w-[100px] truncate hidden md:block">
                {scenario.characterTitle}
              </div>
            </div>

            {/* Opponent Mini-Bust / Confrontation Indicator */}
            <div className="hidden md:flex flex-col items-center mt-2 pt-2 border-t border-amber-500/20 w-full">
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1 font-mono">
                CONFRONTS
              </span>
              <CharacterAvatar
                character={opponentCharacter}
                size="sm"
                auraColor={opponentAura === "rose" ? "crimson" : opponentAura}
                active={false}
                showNameplate={false}
              />
              <span className="text-[10px] font-serif text-amber-400/90 mt-1">
                {opponentCharacter}
              </span>
            </div>
          </div>

          {/* Right Narrative Content (Slide-in animation) */}
          <div className="flex-1 w-full space-y-3 animate-dialogue-slide">
            {/* Title & Subtitle */}
            <div className="space-y-0.5 border-b border-amber-500/20 pb-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-amber-200 tracking-wide drop-shadow flex items-center justify-between">
                <span>{scenario.dilemmaTitle}</span>
              </h2>
              <p className="text-[11px] font-serif tracking-widest text-amber-500/80 uppercase">
                {scenario.sanskritSubtitle}
              </p>
            </div>

            {/* Spoken Dialogue Quotation with Large Antique Quotes */}
            <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-950/70 to-amber-950/30 border-l-4 border-amber-400 text-amber-100 font-serif italic text-xs sm:text-sm leading-relaxed shadow-inner">
              <Quote className="absolute top-2 right-2 w-6 h-6 text-amber-500/20 pointer-events-none" />
              <p className="relative z-10">{scenario.quote}</p>
            </div>

            {/* Narrative Context Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {scenario.context}
            </p>

            {/* Karmic Ripple from earlier decisions (if triggered) */}
            {consequenceRipple && (
              <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-300 flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-spin" />
                <span>{consequenceRipple}</span>
              </div>
            )}

            {/* Moral Dilemma Focus */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start space-x-2.5">
              <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-serif uppercase tracking-wide">
                  The Moral Crossroad:{" "}
                </strong>
                <span className="text-neutral-200">{scenario.moralTension}</span>
              </div>
            </div>

            {/* Recent Pick Decree Feedback */}
            {lastChoiceQuote && (
              <div className="py-1 px-2.5 rounded-lg bg-neutral-950/70 border border-neutral-800 text-[11px] text-neutral-400 italic">
                Decreed: {lastChoiceQuote}
              </div>
            )}
          </div>
        </div>

        {/* 3. Tactile 3D RPG Action Buttons for Choice A & Choice B */}
        <div className="mt-5 pt-4 border-t border-amber-500/30">
          <div className="text-[10px] sm:text-xs font-serif font-bold uppercase tracking-widest text-amber-400/90 mb-2.5 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Choose Your Sacred Decree</span>
            </span>
            <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
              HOTKEYS: [1] OR [2]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Action Button A */}
            <TactileActionButton
              choice={scenario.choiceA}
              optionKey="1"
              onHover={() => onHoverChoice(scenario.choiceA)}
              onLeave={() => onHoverChoice(null)}
              onClick={() => onSelectChoice(scenario.choiceA)}
            />

            {/* Action Button B */}
            <TactileActionButton
              choice={scenario.choiceB}
              optionKey="2"
              onHover={() => onHoverChoice(scenario.choiceB)}
              onLeave={() => onHoverChoice(null)}
              onClick={() => onSelectChoice(scenario.choiceB)}
            />
          </div>
        </div>

        {/* 4. Consequence Preview Bar */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800/90 text-xs text-neutral-300 flex items-center space-x-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-[11px] sm:text-xs">
            {hoveredChoice ? (
              <>
                <strong className="text-amber-300 font-serif">
                  {hoveredChoice.label}:{" "}
                </strong>
                <span className="text-neutral-200">
                  {hoveredChoice.moralCommentary}
                </span>
              </>
            ) : (
              <span className="text-neutral-400">
                Hover over either decree to foresee how your action tips the cosmic scales of Dharma, Loyalty, and Survival.
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

// Tactile 3D Action Button Component
function TactileActionButton({
  choice,
  optionKey,
  onHover,
  onLeave,
  onClick,
}: {
  choice: Choice;
  optionKey: "1" | "2";
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#24170d] via-[#15100c] to-[#0d0906] border-2 border-amber-600/70 hover:border-amber-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] active:scale-[0.98] active:translate-y-0.5 active:shadow-inner transition-all duration-200 cursor-pointer text-left rpg-btn-sheen"
    >
      {/* Top Header Row with Option Badge & Chevron */}
      <div className="flex items-center justify-between mb-2 w-full">
        <div className="flex items-center space-x-2">
          {/* Metallic 3D Keycap Badge */}
          <span className="px-2 py-0.5 rounded-lg bg-gradient-to-b from-amber-400 to-amber-600 border border-amber-200 text-neutral-950 font-mono font-extrabold text-[11px] shadow-sm">
            KEY [{optionKey}]
          </span>
          <span className="text-[11px] font-serif font-bold text-amber-300 uppercase tracking-wider">
            {choice.id === "A" ? "Option Alpha" : "Option Beta"}
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-amber-400/60 group-hover:text-amber-300 group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Main Choice Title & Flavor */}
      <div className="mb-3">
        <h3 className="text-sm sm:text-base font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
          {choice.label}
        </h3>
        <div className="text-[11px] font-medium text-amber-400/90 mb-1 flex items-center space-x-1">
          <Scroll className="w-3 h-3 text-amber-500 shrink-0" />
          <span>{choice.actionTitle}</span>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
          {choice.flavor}
        </p>
      </div>

      {/* Stat Impact Preview Chips */}
      <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center gap-1.5 w-full">
        <span
          className={`px-2 py-0.5 rounded-md font-mono text-[10px] sm:text-[11px] font-bold ${
            choice.dharmaDelta >= 0
              ? "text-amber-300 bg-amber-950/80 border border-amber-500/40"
              : "text-red-400 bg-red-950/80 border border-red-500/40"
          }`}
        >
          {choice.dharmaDelta >= 0 ? "+" : ""}
          {choice.dharmaDelta} Dharma
        </span>

        <span
          className={`px-2 py-0.5 rounded-md font-mono text-[10px] sm:text-[11px] font-bold ${
            choice.loyaltyDelta >= 0
              ? "text-rose-300 bg-rose-950/80 border border-rose-500/40"
              : "text-red-400 bg-red-950/80 border border-red-500/40"
          }`}
        >
          {choice.loyaltyDelta >= 0 ? "+" : ""}
          {choice.loyaltyDelta} Loyalty
        </span>

        <span
          className={`px-2 py-0.5 rounded-md font-mono text-[10px] sm:text-[11px] font-bold ${
            choice.survivalDelta >= 0
              ? "text-emerald-300 bg-emerald-950/80 border border-emerald-500/40"
              : "text-red-400 bg-red-950/80 border border-red-500/40"
          }`}
        >
          {choice.survivalDelta >= 0 ? "+" : ""}
          {choice.survivalDelta} Survival
        </span>
      </div>
    </button>
  );
}
