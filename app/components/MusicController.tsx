"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Volume1,
  Play,
  Pause,
  Music,
  Sliders,
  ChevronDown,
  Sparkles,
} from "lucide-react";

interface MusicControllerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  onVolumeChange: (newVol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function MusicController({
  isPlaying,
  onTogglePlay,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}: MusicControllerProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const effectiveVolume = isMuted ? 0 : volume;

  const VolumeIcon =
    isMuted || effectiveVolume === 0
      ? VolumeX
      : effectiveVolume > 0.5
      ? Volume2
      : Volume1;

  return (
    <div
      ref={dropdownRef}
      className="fixed top-3.5 right-3.5 sm:top-4 sm:right-5 z-50 select-none"
    >
      {/* Main Pill Sound Button */}
      <div className="relative flex items-center">
        <div
          className={`flex items-center space-x-1.5 p-1 sm:p-1.5 pr-2.5 sm:pr-3 rounded-full border transition-all duration-300 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.8)] ${
            isPlaying && !isMuted
              ? "border-amber-400/80 bg-neutral-950/90 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
              : "border-neutral-700/80 bg-neutral-950/85 hover:border-amber-500/50"
          }`}
        >
          {/* Quick Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPlaying && !isMuted
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                : "bg-neutral-800 text-neutral-400 hover:text-amber-300 hover:bg-neutral-700"
            }`}
            title={isPlaying ? "Pause Mahabharata Music" : "Play Mahabharata Music"}
          >
            {isPlaying && !isMuted ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Equalizer Waveform Indicator when playing */}
          {isPlaying && !isMuted ? (
            <div className="flex items-center space-x-0.5 px-1">
              <span className="w-0.5 bg-amber-400 rounded-full animate-soundwave-1" />
              <span className="w-0.5 bg-amber-300 rounded-full animate-soundwave-2" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-soundwave-3" />
              <span className="w-0.5 bg-amber-200 rounded-full animate-soundwave-4" />
            </div>
          ) : (
            <Music className="w-3.5 h-3.5 text-neutral-500 ml-1" />
          )}

          {/* Quick Volume / Mute Toggle & Dropdown Opener */}
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center space-x-1 pl-1 cursor-pointer group"
            title="Music Settings & Volume Slider"
          >
            <VolumeIcon
              className={`w-4 h-4 transition-colors ${
                isMuted
                  ? "text-red-400"
                  : isPlaying
                  ? "text-amber-300 group-hover:text-amber-200"
                  : "text-neutral-400 group-hover:text-neutral-200"
              }`}
            />
            <span className="text-[11px] font-mono font-bold text-neutral-300 group-hover:text-amber-300 hidden sm:inline">
              {isMuted ? "MUTED" : `${Math.round(volume * 100)}%`}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                isExpanded ? "rotate-180 text-amber-400" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Golden Volume & Controls Drawer */}
      {isExpanded && (
        <div className="absolute right-0 top-12 w-64 sm:w-72 p-3.5 rounded-2xl bg-gradient-to-b from-neutral-900/98 via-neutral-950/98 to-neutral-950/98 border-2 border-amber-500/60 shadow-[0_15px_35px_rgba(0,0,0,0.95)] backdrop-blur-2xl animate-fade-in z-50">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/20 mb-3">
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-serif font-bold tracking-wider text-amber-300 uppercase">
                Mahabharata Music
              </span>
            </div>
            <span className="text-[9px] font-serif text-neutral-400 italic">
              Vedic Instrumental
            </span>
          </div>

          {/* Track Status */}
          <div className="flex items-center justify-between text-[11px] mb-3 px-1">
            <span className="text-neutral-400 font-serif">Soundtrack:</span>
            <span
              className={`font-serif font-semibold truncate max-w-[130px] ${
                isPlaying && !isMuted ? "text-amber-300" : "text-neutral-400"
              }`}
            >
              {isPlaying && !isMuted ? "Epic Theme (Playing)" : "Theme (Paused)"}
            </span>
          </div>

          {/* Volume Slider Control */}
          <div className="space-y-1.5 bg-neutral-900/90 p-2.5 rounded-xl border border-neutral-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono flex items-center space-x-1">
                <Sliders className="w-3 h-3 text-amber-400" />
                <span>Volume</span>
              </span>
              <span className="font-mono text-xs font-bold text-amber-300">
                {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            <div className="flex items-center space-x-2.5 pt-1">
              <button
                onClick={onToggleMute}
                className="p-1 rounded-lg text-neutral-400 hover:text-amber-300 hover:bg-neutral-800 transition-colors cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                <VolumeIcon className="w-4 h-4" />
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onVolumeChange(val);
                  if (isMuted && val > 0) {
                    onToggleMute();
                  }
                }}
                className="gold-slider flex-1 cursor-pointer"
                aria-label="Volume Slider"
              />
            </div>
          </div>

          {/* Bottom Action Toggles */}
          <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-amber-500/20">
            <button
              onClick={onTogglePlay}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                isPlaying
                  ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-md"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Pause Music</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Play Music</span>
                </>
              )}
            </button>

            <button
              onClick={onToggleMute}
              className={`py-1.5 px-3 rounded-xl text-xs font-serif transition-all cursor-pointer border ${
                isMuted
                  ? "bg-red-950/80 border-red-500/60 text-red-300"
                  : "bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-amber-300"
              }`}
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
