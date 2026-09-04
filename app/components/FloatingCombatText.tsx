import React from "react";
import { Sparkles, Skull } from "lucide-react";

export interface CombatTag {
  id: string;
  label: string;
  delta: number;
  type: "dharma" | "loyalty" | "survival";
  xOffset: number; // in pixels
}

interface FloatingCombatTextProps {
  tags: CombatTag[];
}

export function FloatingCombatText({ tags }: FloatingCombatTextProps) {
  if (tags.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-visible">
      {tags.map((tag) => {
        const isPositive = tag.delta >= 0;
        const colorClasses = isPositive
          ? tag.type === "dharma"
            ? "text-amber-300 border-amber-400/80 bg-amber-950/90 shadow-[0_0_15px_rgba(245,158,11,0.7)]"
            : tag.type === "loyalty"
            ? "text-rose-300 border-rose-400/80 bg-rose-950/90 shadow-[0_0_15px_rgba(244,63,94,0.7)]"
            : "text-emerald-300 border-emerald-400/80 bg-emerald-950/90 shadow-[0_0_15px_rgba(16,185,129,0.7)]"
          : "text-red-400 border-red-500/80 bg-red-950/90 shadow-[0_0_18px_rgba(239,68,68,0.8)]";

        return (
          <div
            key={tag.id}
            className={`absolute animate-combat-text flex items-center space-x-1.5 px-3 py-1 rounded-xl border-2 font-mono font-extrabold text-xs sm:text-sm tracking-wider ${colorClasses}`}
            style={{
              transform: `translateX(${tag.xOffset}px)`,
              top: "30%",
            }}
          >
            {isPositive ? (
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            ) : (
              <Skull className="w-3.5 h-3.5 text-red-400" />
            )}
            <span>
              {isPositive ? `+${tag.delta}` : `${tag.delta}`} {tag.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
