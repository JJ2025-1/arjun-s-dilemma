import React from "react";

interface GameHudFrameProps {
  children: React.ReactNode;
}

export function GameHudFrame({ children }: GameHudFrameProps) {
  // Pre-configured positions and animations for rising embers
  const embers = [
    { left: "8%", delay: "0s", duration: "7s", size: "w-1.5 h-1.5" },
    { left: "18%", delay: "2.4s", duration: "9s", size: "w-2 h-2" },
    { left: "28%", delay: "1.1s", duration: "6.5s", size: "w-1 h-1" },
    { left: "39%", delay: "3.7s", duration: "8.2s", size: "w-2.5 h-2.5" },
    { left: "52%", delay: "0.5s", duration: "7.8s", size: "w-1.5 h-1.5" },
    { left: "64%", delay: "4.2s", duration: "6s", size: "w-2 h-2" },
    { left: "75%", delay: "1.8s", duration: "8.5s", size: "w-1 h-1" },
    { left: "86%", delay: "3.1s", duration: "7.2s", size: "w-2 h-2" },
    { left: "94%", delay: "0.9s", duration: "9.5s", size: "w-1.5 h-1.5" },
    { left: "14%", delay: "5.2s", duration: "8s", size: "w-1 h-1" },
    { left: "45%", delay: "2.8s", duration: "6.8s", size: "w-2 h-2" },
    { left: "82%", delay: "4.7s", duration: "7.5s", size: "w-1.5 h-1.5" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#070709] text-neutral-100 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Atmospheric Scene Backdrop (Kurukshetra Twilight Battlefield) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Layer 1: Illustrated Kurukshetra Twilight Horizon SVG */}
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sunTwilight" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#dc2626" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#78350f" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="twilightSkyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#180b06" />
              <stop offset="30%" stopColor="#2c0b0e" />
              <stop offset="55%" stopColor="#451a03" />
              <stop offset="75%" stopColor="#1c1917" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
            <linearGradient id="mistFog" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#09090b" stopOpacity="0" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Sky Gradient */}
          <rect width="1440" height="900" fill="url(#twilightSkyGrad)" />
          {/* Sinking Solar Disc */}
          <circle cx="720" cy="380" r="180" fill="url(#sunTwilight)" />
          <circle cx="720" cy="380" r="80" fill="#f59e0b" opacity="0.3" />
          <circle cx="720" cy="380" r="40" fill="#fef08a" opacity="0.6" />

          {/* Distant Hills / Smoke Plumes */}
          <path
            d="M0 520 Q240 470 500 500 T1000 480 Q1240 460 1440 510 L1440 900 L0 900 Z"
            fill="#1c110a"
            opacity="0.8"
          />
          {/* Silhouettes of War Chariots & Flags */}
          {/* Chariot 1 Left */}
          <path
            d="M180 500 L210 500 L220 480 L195 480 Z M195 480 L195 430 L225 440 L195 450"
            stroke="#b45309"
            strokeWidth="2"
            fill="#451a03"
            opacity="0.6"
          />
          <circle cx="195" cy="505" r="12" stroke="#b45309" strokeWidth="2" fill="none" opacity="0.6" />

          {/* Flags fluttering in Kurukshetra wind */}
          <line x1="360" y1="510" x2="360" y2="440" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
          <polygon points="360,440 395,452 360,465" fill="#dc2626" opacity="0.6" />

          <line x1="1100" y1="510" x2="1100" y2="430" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
          <polygon points="1100,430 1140,445 1100,460" fill="#ea580c" opacity="0.6" />

          {/* Chariot 2 Right */}
          <path
            d="M1240 505 L1270 505 L1280 485 L1255 485 Z M1260 485 L1260 435 L1230 445 L1260 455"
            stroke="#b45309"
            strokeWidth="2"
            fill="#451a03"
            opacity="0.6"
          />
          <circle cx="1260" cy="510" r="12" stroke="#b45309" strokeWidth="2" fill="none" opacity="0.6" />

          {/* Battlefield Ground Silhouette */}
          <path
            d="M0 550 Q360 520 720 540 T1440 530 L1440 900 L0 900 Z"
            fill="#120c07"
            opacity="0.95"
          />
          <rect y="500" width="1440" height="400" fill="url(#mistFog)" />
        </svg>

        {/* Layer 2: Ambient Vignette & Golden Rim Light */}
        <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/40 to-neutral-950/90 pointer-events-none" />

        {/* Layer 3: Dynamic Rising Fire Embers Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {embers.map((ember, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200 shadow-[0_0_8px_#f59e0b] opacity-0 ${ember.size}`}
              style={{
                left: ember.left,
                bottom: "-20px",
                animation: `ember-rise ${ember.duration} linear infinite`,
                animationDelay: ember.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. Main Game HUD Viewport Box with Heavy Golden Bezel */}
      <div className="relative z-10 w-full max-w-6xl xl:max-w-[1220px] rounded-3xl p-1 sm:p-2.5 bg-gradient-to-b from-[#2a1708] via-[#140f0a] to-[#0d0905] border-2 sm:border-3 border-amber-600/80 bezel-gold-shadow backdrop-blur-md">
        {/* Inner Gold Inset Rim */}
        <div className="relative w-full rounded-2xl bg-neutral-950/85 border border-amber-500/40 bezel-gold-inner p-3 sm:p-6 lg:p-7 flex flex-col items-center">
          {/* Classical Corner Filigree Ornaments */}
          <CornerFiligree position="top-left" />
          <CornerFiligree position="top-right" />
          <CornerFiligree position="bottom-left" />
          <CornerFiligree position="bottom-right" />

          {/* Top Center Sovereign Medallion / Crest */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
            <div className="relative px-5 py-1 rounded-full bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 border-2 border-amber-400/90 shadow-[0_4px_15px_rgba(0,0,0,0.9)] flex items-center space-x-2">
              {/* Dharma Chakra / Sun Emblem */}
              <div className="w-4 h-4 rounded-full border border-amber-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              </div>
              <span className="text-[11px] sm:text-xs font-serif font-bold uppercase tracking-[0.25em] text-amber-200 drop-shadow">
                KURUKSHETRA • DHARMA YUDDHA
              </span>
              <div className="w-4 h-4 rounded-full border border-amber-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Golden Embossed Studs Along Bezel Borders */}
          <div className="absolute top-2 left-1/4 w-2 h-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-[0_0_3px_#f59e0b]" />
          <div className="absolute top-2 right-1/4 w-2 h-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-[0_0_3px_#f59e0b]" />
          <div className="absolute bottom-2 left-1/4 w-2 h-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-[0_0_3px_#f59e0b]" />
          <div className="absolute bottom-2 right-1/4 w-2 h-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-[0_0_3px_#f59e0b]" />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-[0_0_3px_#f59e0b]" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-[0_0_3px_#f59e0b]" />

          {/* Children Slot (Main Game Interface) */}
          <div className="w-full pt-3 sm:pt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Classical Intricate Indian Temple / Chariot Filigree Ornaments in SVG
function CornerFiligree({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const positionClasses = {
    "top-left": "top-1 left-1",
    "top-right": "top-1 right-1 -scale-x-100",
    "bottom-left": "bottom-1 left-1 -scale-y-100",
    "bottom-right": "bottom-1 right-1 -scale-x-100 -scale-y-100",
  }[position];

  return (
    <div
      className={`absolute ${positionClasses} pointer-events-none z-10 w-10 h-10 sm:w-14 sm:h-14`}
    >
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      >
        {/* Outer Corner Frame */}
        <path
          d="M3 45 L3 3 L45 3"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M8 35 L8 8 L35 8"
          stroke="#b45309"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Corner Mandala Lotus Floral Scroll */}
        <path
          d="M3 3 C12 8 20 20 25 35"
          stroke="#fef08a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M3 3 C8 12 20 20 35 25"
          stroke="#fef08a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Sacred Gem at Apex */}
        <circle cx="8" cy="8" r="3" fill="#dc2626" stroke="#f59e0b" strokeWidth="1" />
        {/* Spirals */}
        <circle cx="20" cy="6" r="1.5" fill="#f59e0b" />
        <circle cx="6" cy="20" r="1.5" fill="#f59e0b" />
      </svg>
    </div>
  );
}
