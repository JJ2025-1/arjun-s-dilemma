"use client";
import React from "react";
import { Play, UserCheck, Volume2, VolumeX } from "lucide-react";

interface OpeningHeroProps {
  onStart: () => void;
  onSelectChampion?: () => void;
  onOpenCharacterSelect?: () => void;
  isAudioPlaying?: boolean;
  audioEnabled?: boolean;
  onToggleAudio?: () => void;
}

export function OpeningHero({
  onStart,
  onSelectChampion,
  onOpenCharacterSelect,
  isAudioPlaying,
  audioEnabled,
  onToggleAudio,
}: OpeningHeroProps) {
  const handleSelectChampion = onSelectChampion || onOpenCharacterSelect || (() => {});
  const isPlaying = isAudioPlaying !== undefined ? isAudioPlaying : audioEnabled;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-neutral-950 flex flex-col justify-between p-6 select-none animate-page-entrance">
      {/* 1. Fullscreen Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
        style={{ backgroundImage: "url('/epic_key_art.png')" }}
      >
        {/* Soft edge vignettes only, keeping center art clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/70" />
      </div>

      {/* 2. Sleek Top Bar (Audio & Minimalist Tag) */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto pr-24 sm:pr-32">
        <div className="text-[11px] font-serif tracking-[0.25em] text-amber-400/80 uppercase">
          Kurukshetra • 3102 BCE
        </div>

        {onToggleAudio && (
          <button
            onClick={onToggleAudio}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-amber-500/30 text-amber-300 text-xs hover:border-amber-400 transition cursor-pointer backdrop-blur-md"
          >
            {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-500" />}
            <span className="tracking-widest uppercase text-[10px]">{isPlaying ? "Sound ON" : "Sound OFF"}</span>
          </button>
        )}
      </header>

      {/* 3. Streamlined Center Title: Larger Font with Rotating Dharma Chakra Below */}
      <div className="relative z-20 flex flex-col items-center text-center my-auto pointer-events-none">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-[0.2em] sm:tracking-[0.24em] text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]">
          DHARMA
        </h1>
        <p className="text-xs sm:text-base md:text-lg font-serif font-bold tracking-[0.35em] sm:tracking-[0.45em] text-amber-200/95 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] mt-1 sm:mt-2">
          The Kurukshetra Dilemmas
        </p>

        {/* Sacred Rotating Dharma Chakra Below Title */}
        <div className="flex items-center justify-center space-x-3 mt-3 sm:mt-4">
          <div className="h-px w-10 sm:w-24 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400" />
          <div className="relative w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-500/25 blur-md animate-pulse" />
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.85)] animate-chakra"
            >
              {/* Outer Beaded Rim */}
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.9" />
              <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3.5,3.5" fill="none" opacity="0.75" />
              {/* Inner Rim & Hub */}
              <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="2" fill="#09090b" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
              {/* 16 Sacred Spokes of Cosmic Dharma */}
              {Array.from({ length: 16 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 40 * Math.cos((i * 22.5 * Math.PI) / 180)}
                  y2={50 + 40 * Math.sin((i * 22.5 * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </div>
          <div className="h-px w-10 sm:w-24 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-400" />
        </div>
      </div>

      {/* 4. Bottom Controls: Anchored Below the Character Faces */}
      <footer className="relative z-20 flex flex-col items-center gap-6 pb-6 w-full max-w-xl mx-auto">
        {/* Primary Action Buttons */}
        <div className="flex items-center gap-4 w-full justify-center">
          <button
            onClick={onStart}
            className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            Begin Epic
          </button>

          <button
            onClick={handleSelectChampion}
            className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-black/60 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-widest hover:bg-amber-500/10 hover:border-amber-400 active:scale-95 transition backdrop-blur-md cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            Champions
          </button>
        </div>

        {/* Minimalist 4-Champion Coin Strip */}
        <div className="flex items-center gap-6 pt-1">
          {[
            { name: "Karna", file: "karna.png" },
            { name: "Arjuna", file: "arjuna.png" },
            { name: "Krishna", file: "krishna.png" },
            { name: "Draupadi", file: "draupadi.png" },
          ].map((c) => (
            <div
              key={c.name}
              onClick={handleSelectChampion}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full p-0.5 border border-amber-500/40 bg-neutral-900/80 group-hover:border-amber-300 group-hover:scale-105 transition-all shadow-md">
                <img
                  src={`/portraits/${c.file}`}
                  alt={c.name}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to text initials if image path fails
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <span className="text-[10px] text-neutral-400 group-hover:text-amber-200 transition font-serif tracking-wider">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
