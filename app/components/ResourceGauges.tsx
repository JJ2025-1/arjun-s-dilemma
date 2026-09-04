import React from "react";
import { Scale, Heart, Crown, AlertTriangle, Sparkles, Skull } from "lucide-react";
import { CombatTag } from "./FloatingCombatText";

interface ResourceGaugesProps {
  dharma: number;
  loyalty: number;
  survival: number;
  combatTags?: CombatTag[];
}

export function ResourceGauges({ dharma, loyalty, survival, combatTags = [] }: ResourceGaugesProps) {
  return (
    <div className="w-full mb-5 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* 1. Dharma Resource Gauge */}
        <SingleGauge
          label="Dharma"
          sanskritLabel="धर्मः"
          value={dharma}
          icon={Scale}
          colorTheme="amber"
          subtitle="Cosmic Righteousness"
          type="dharma"
          tags={combatTags.filter((t) => t.type === "dharma")}
        />

        {/* 2. Loyalty Resource Gauge */}
        <SingleGauge
          label="Loyalty"
          sanskritLabel="मित्र-धर्मः"
          value={loyalty}
          icon={Heart}
          colorTheme="rose"
          subtitle="Sworn Bonds & Fealty"
          type="loyalty"
          tags={combatTags.filter((t) => t.type === "loyalty")}
        />

        {/* 3. Survival Resource Gauge */}
        <SingleGauge
          label="Survival"
          sanskritLabel="राज्यम्"
          value={survival}
          icon={Crown}
          colorTheme="emerald"
          subtitle="Martial Might & Sovereignty"
          type="survival"
          tags={combatTags.filter((t) => t.type === "survival")}
        />
      </div>

      {/* Critical Danger Alert Banner */}
      {(dharma <= 25 || loyalty <= 25 || survival <= 25) && (
        <div className="mt-3 py-1.5 px-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs flex items-center justify-between shadow-[0_0_15px_rgba(239,68,68,0.25)] animate-pulse">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              <strong className="text-red-300 font-serif">CRITICAL WARNING:</strong> A gauge is nearing exhaustion! Dropping to 0% triggers an immediate premature ending.
            </span>
          </div>
          <span className="hidden sm:inline font-mono font-bold text-[10px] uppercase bg-red-900/80 px-2 py-0.5 rounded border border-red-400/40">
            Mortal Peril
          </span>
        </div>
      )}
    </div>
  );
}

interface SingleGaugeProps {
  label: string;
  sanskritLabel: string;
  value: number;
  icon: React.ElementType;
  colorTheme: "amber" | "rose" | "emerald";
  subtitle: string;
  type: "dharma" | "loyalty" | "survival";
  tags?: CombatTag[];
}

function SingleGauge({
  label,
  sanskritLabel,
  value,
  icon: Icon,
  colorTheme,
  subtitle,
  tags = [],
}: SingleGaugeProps) {
  const isCritical = value <= 25;

  const themeConfig = {
    amber: {
      liquid: "bg-gradient-to-r from-amber-700 via-amber-400 to-yellow-200",
      liquidGlow: "shadow-[0_0_12px_rgba(245,158,11,0.6)]",
      frameBorder: "border-amber-500/50",
      iconColor: "text-amber-300",
      iconBg: "bg-amber-950/80 border-amber-500/60",
      badgeColor: "text-amber-300",
      gemColor: "bg-amber-400",
    },
    rose: {
      liquid: "bg-gradient-to-r from-rose-700 via-rose-500 to-amber-300",
      liquidGlow: "shadow-[0_0_12px_rgba(244,63,94,0.6)]",
      frameBorder: "border-rose-500/50",
      iconColor: "text-rose-300",
      iconBg: "bg-rose-950/80 border-rose-500/60",
      badgeColor: "text-rose-300",
      gemColor: "bg-rose-500",
    },
    emerald: {
      liquid: "bg-gradient-to-r from-emerald-700 via-emerald-400 to-teal-200",
      liquidGlow: "shadow-[0_0_12px_rgba(16,185,129,0.6)]",
      frameBorder: "border-emerald-500/50",
      iconColor: "text-emerald-300",
      iconBg: "bg-emerald-950/80 border-emerald-500/60",
      badgeColor: "text-emerald-300",
      gemColor: "bg-emerald-400",
    },
  }[colorTheme];

  return (
    <div
      className={`relative p-2 sm:p-2.5 rounded-2xl bg-gradient-to-b from-neutral-900/95 via-neutral-950/95 to-neutral-950 border ${
        isCritical
          ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse"
          : `${themeConfig.frameBorder} shadow-lg`
      } transition-all duration-300`}
    >
      {/* Floating RPG Stat Tags over this affected meter */}
      {tags.length > 0 && (
        <div className="absolute -top-7 right-2 pointer-events-none z-50 flex flex-col items-end">
          {tags.map((tag) => {
            const isPositive = tag.delta >= 0;
            return (
              <div
                key={tag.id}
                className={`animate-combat-text flex items-center space-x-1 px-2.5 py-0.5 rounded-lg border-2 text-xs font-mono font-extrabold shadow-2xl ${
                  isPositive
                    ? tag.type === "dharma"
                      ? "text-amber-300 border-amber-400 bg-amber-950/95 shadow-[0_0_15px_rgba(245,158,11,0.8)]"
                      : tag.type === "loyalty"
                      ? "text-rose-300 border-rose-400 bg-rose-950/95 shadow-[0_0_15px_rgba(244,63,94,0.8)]"
                      : "text-emerald-300 border-emerald-400 bg-emerald-950/95 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                    : "text-red-400 border-red-500 bg-red-950/95 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                }`}
              >
                {isPositive ? (
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                ) : (
                  <Skull className="w-3.5 h-3.5 text-red-400" />
                )}
                <span>
                  {isPositive ? `+${tag.delta}` : tag.delta} {tag.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Top Header: Icon, Titles & Sanskrit */}
      <div className="flex items-center justify-between mb-1.5 px-0.5">
        <div className="flex items-center space-x-2">
          {/* Ornate MMORPG Gemmed Crest Icon */}
          <div
            className={`w-6 h-6 rounded-lg border ${themeConfig.iconBg} flex items-center justify-center shadow-inner relative`}
          >
            <Icon className={`w-3.5 h-3.5 ${themeConfig.iconColor}`} />
            {/* Tiny Gem in Corner */}
            <div
              className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${themeConfig.gemColor} shadow-[0_0_3px_currentColor]`}
            />
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-neutral-100">
                {label}
              </span>
              <span className="text-[10px] font-serif text-neutral-400">
                {sanskritLabel}
              </span>
            </div>
            <div className="text-[9px] text-neutral-400 hidden sm:block">
              {subtitle}
            </div>
          </div>
        </div>

        {/* Readout Display */}
        <div className="flex items-baseline space-x-0.5">
          <span
            className={`font-mono text-sm sm:text-base font-extrabold ${
              isCritical
                ? "text-red-400"
                : value >= 75
                ? "text-amber-200"
                : themeConfig.badgeColor
            }`}
          >
            {value}
          </span>
          <span className="text-[10px] font-mono text-neutral-400">%</span>
        </div>
      </div>

      {/* MMORPG Liquid Gauge Body with .meter-fill dynamic CSS transition */}
      <div className="relative w-full h-4 sm:h-5 rounded-full bg-neutral-950 p-0.5 border border-amber-500/30 overflow-hidden shadow-inner">
        {/* Background Facet Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.05)_25%,transparent_26%,transparent_49%,rgba(255,255,255,0.05)_50%,transparent_51%,transparent_74%,rgba(255,255,255,0.05)_75%,transparent_76%)] pointer-events-none z-10" />

        {/* Glowing Liquid Fill with .meter-fill class */}
        <div
          className={`h-full rounded-full meter-fill ${themeConfig.liquid} ${themeConfig.liquidGlow} relative`}
          style={{
            width: `${value}%`,
          }}
        >
          {/* Glass Bevel Highlight on Upper Half */}
          <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/40 to-transparent rounded-t-full pointer-events-none" />

          {/* Liquid Leading Edge Bright Dot */}
          {value > 2 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white blur-[0.5px] shadow-[0_0_6px_#fff]" />
          )}
        </div>

        {/* Pip Dividers at 25%, 50%, 75% */}
        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none z-20">
          <div className="w-[1px] h-full bg-neutral-900/60 ml-[25%]" />
          <div className="w-[1px] h-full bg-neutral-900/60 ml-[25%]" />
          <div className="w-[1px] h-full bg-neutral-900/60 ml-[25%]" />
        </div>
      </div>
    </div>
  );
}
