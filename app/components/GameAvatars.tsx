import React from "react";

export type CharacterKey =
  | "Karna"
  | "Indra"
  | "Yudhishthira"
  | "Shakuni"
  | "Kunti"
  | "Krishna"
  | "Arjuna"
  | "Draupadi"
  | "Drona";

interface AvatarProps {
  character: CharacterKey;
  size?: "sm" | "md" | "lg" | "xl";
  auraColor?: "amber" | "crimson" | "azure" | "emerald";
  active?: boolean;
  showNameplate?: boolean;
}

const PORTRAIT_IMAGES: Partial<Record<CharacterKey, string>> = {
  Karna: "/portraits/karna.png",
  Arjuna: "/portraits/arjuna.png",
  Krishna: "/portraits/krishna.png",
  Draupadi: "/portraits/draupadi.png",
  Yudhishthira: "/portraits/yudhishthira.png",
  Kunti: "/portraits/kunti.png",
  Drona: "/portraits/drona.png",
};

export function CharacterAvatar({
  character,
  size = "lg",
  auraColor = "amber",
  active = true,
  showNameplate = true,
}: AvatarProps) {
  const dimensionClass =
    size === "xl"
      ? "w-36 h-36 sm:w-44 sm:h-44"
      : size === "lg"
      ? "w-28 h-28 sm:w-36 sm:h-36"
      : size === "md"
      ? "w-20 h-20 sm:w-24 sm:h-24"
      : "w-14 h-14 sm:w-16 sm:h-16";

  const auraClass =
    auraColor === "crimson"
      ? "animate-aura-crimson border-rose-500/80 shadow-[0_0_25px_rgba(225,29,72,0.4)]"
      : auraColor === "azure"
      ? "border-sky-500/80 shadow-[0_0_25px_rgba(14,165,233,0.4)]"
      : auraColor === "emerald"
      ? "border-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.4)]"
      : "animate-aura-gold border-amber-400/90 shadow-[0_0_25px_rgba(245,158,11,0.5)]";

  return (
    <div className="flex flex-col items-center select-none group">
      {/* 3D Shield Frame Container with portrait-bob HUD animation */}
      <div
        className={`relative ${dimensionClass} rounded-full p-1 sm:p-1.5 transition-transform duration-300 portrait-bob ${
          active ? "animate-character-bob" : "opacity-80"
        }`}
      >
        {/* Outer Heavy Gold Bevel Ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 sm:border-3 ${auraClass} bg-gradient-to-b from-amber-600 via-amber-900 to-neutral-950`}
        />

        {/* Outer Engraved Rivets / Studs */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_4px_#f59e0b]" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_4px_#f59e0b]" />
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_4px_#f59e0b]" />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_4px_#f59e0b]" />

        {/* Inner Shield Bezel */}
        <div className="relative w-full h-full rounded-full overflow-hidden border border-amber-300/40 bg-neutral-950 shadow-inner flex items-center justify-center">
          {PORTRAIT_IMAGES[character] ? (
            <img
              src={PORTRAIT_IMAGES[character]}
              alt={character}
              className="w-full h-full object-cover rounded-full select-none"
            />
          ) : (
            <AvatarVector character={character} />
          )}

          {/* Glass Highlight Overlay on top half */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent pointer-events-none rounded-full" />
        </div>

        {/* Corner Filigree Shield Flairs */}
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-300/70 pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-300/70 pointer-events-none" />
      </div>

      {/* Embedded Nameplate */}
      {showNameplate && (
        <div className="relative -mt-3.5 z-10 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 border border-amber-400/80 shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-serif font-bold uppercase tracking-wider text-amber-100 drop-shadow">
            {character}
          </span>
        </div>
      )}
    </div>
  );
}

// Masterfully crafted, mythologically rich SVG portraits
function AvatarVector({ character }: { character: CharacterKey }) {
  if (character === "Karna") {
    return (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="karnaSunGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#b45309" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#451a03" stopOpacity="0.95" />
          </radialGradient>
          <linearGradient id="karnaGoldArmor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="karnaSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbb77a" />
            <stop offset="100%" stopColor="#c26d36" />
          </linearGradient>
        </defs>

        {/* Solar Halo Background */}
        <rect width="160" height="160" fill="url(#karnaSunGlow)" />
        <circle cx="80" cy="70" r="62" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.4" />
        <circle cx="80" cy="70" r="54" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />

        {/* Shoulders & Golden Kavach (Breastplate) */}
        <path
          d="M25 160 C25 125 45 110 80 110 C115 110 135 125 135 160 Z"
          fill="url(#karnaGoldArmor)"
          stroke="#b45309"
          strokeWidth="1.5"
        />
        {/* Sun Crest on Breastplate */}
        <circle cx="80" cy="132" r="10" fill="#78350f" stroke="#fef08a" strokeWidth="1.5" />
        <circle cx="80" cy="132" r="5" fill="#f59e0b" />
        {/* Chest Armor Segment Ribs */}
        <path d="M50 130 Q80 120 110 130" stroke="#fef08a" strokeWidth="1" fill="none" />
        <path d="M42 145 Q80 135 118 145" stroke="#fef08a" strokeWidth="1" fill="none" />

        {/* Muscular Neck */}
        <path d="M68 95 L68 115 Q80 120 92 115 L92 95 Z" fill="url(#karnaSkin)" />

        {/* Warrior Face */}
        <path
          d="M60 62 C60 50 68 45 80 45 C92 45 100 50 100 62 C100 82 92 98 80 98 C68 98 60 82 60 62 Z"
          fill="url(#karnaSkin)"
        />

        {/* Fiery Determined Eyes */}
        <path d="M66 65 Q74 62 78 66 Q74 68 66 65 Z" fill="#1c1917" />
        <circle cx="73" cy="65" r="1.5" fill="#f59e0b" />
        <path d="M82 66 Q86 62 94 65 Q86 68 82 66 Z" fill="#1c1917" />
        <circle cx="87" cy="65" r="1.5" fill="#f59e0b" />

        {/* Strong Kshatriya Eyebrows */}
        <path d="M64 61 Q73 57 79 61" stroke="#262626" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M81 61 Q87 57 96 61" stroke="#262626" strokeWidth="2.5" strokeLinecap="round" />

        {/* Surya Tilak on Forehead */}
        <path d="M80 50 L82 58 L78 58 Z" fill="#dc2626" />
        <circle cx="80" cy="53" r="1.5" fill="#fef08a" />

        {/* Celestial Kundal Earrings (Dazzling Sun Orbs) */}
        <circle cx="56" cy="74" r="5.5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="56" cy="74" r="2" fill="#dc2626" />
        <circle cx="104" cy="74" r="5.5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="104" cy="74" r="2" fill="#dc2626" />

        {/* Royal Crown / Warrior Headband */}
        <path
          d="M58 52 C58 40 70 30 80 30 C90 30 102 40 102 52 L98 56 L62 56 Z"
          fill="url(#karnaGoldArmor)"
          stroke="#78350f"
          strokeWidth="1"
        />
        <polygon points="80,22 84,33 76,33" fill="#dc2626" />
        <circle cx="80" cy="38" r="3" fill="#dc2626" stroke="#fef08a" strokeWidth="0.8" />

        {/* Royal Saffron Angavastram Drape */}
        <path d="M28 140 Q50 115 70 125 L65 160 Z" fill="#ea580c" opacity="0.9" />
      </svg>
    );
  }

  if (character === "Indra") {
    return (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="indraSkyGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0369a1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.95" />
          </radialGradient>
        </defs>

        <rect width="160" height="160" fill="url(#indraSkyGlow)" />

        {/* Lightning Flares in Background */}
        <path d="M30 20 L22 45 L32 45 L18 75" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M135 15 L126 40 L136 40 L124 70" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

        {/* Frail Brahmin Shoulders with Deva Glow */}
        <path
          d="M25 160 C25 128 48 112 80 112 C112 112 135 128 135 160 Z"
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
        {/* Sacred Yajnopavita (Thread) */}
        <path d="M48 115 Q75 140 95 160" stroke="#f59e0b" strokeWidth="2" fill="none" />
        {/* Rudraksha Garland */}
        <circle cx="70" cy="120" r="3" fill="#78350f" />
        <circle cx="80" cy="123" r="3" fill="#78350f" />
        <circle cx="90" cy="120" r="3" fill="#78350f" />

        {/* Slender Neck */}
        <path d="M70 94 L70 115 Q80 118 90 115 L90 94 Z" fill="#fed7aa" />

        {/* Ascetic Face with Divine Piercing Eyes */}
        <path
          d="M62 60 C62 48 70 44 80 44 C90 44 98 48 98 60 C98 80 90 96 80 96 C70 96 62 80 62 60 Z"
          fill="#fed7aa"
        />

        {/* Mystic Piercing Blue-Gold Eyes */}
        <ellipse cx="72" cy="65" rx="5" ry="3" fill="#ffffff" />
        <circle cx="72" cy="65" r="2" fill="#0284c7" />
        <ellipse cx="88" cy="65" rx="5" ry="3" fill="#ffffff" />
        <circle cx="88" cy="65" r="2" fill="#0284c7" />

        {/* Eyebrows */}
        <path d="M66 60 Q73 57 77 60" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M83 60 Q87 57 94 60" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />

        {/* Triple Holy Ash Tripundra Tilak */}
        <line x1="74" y1="50" x2="86" y2="50" stroke="#e2e8f0" strokeWidth="1.5" />
        <line x1="73" y1="53" x2="87" y2="53" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="80" cy="55" r="1.5" fill="#dc2626" />

        {/* Matted Sage Locks / Hidden Indra Mukut */}
        <path
          d="M60 52 C58 35 68 22 80 22 C92 22 102 35 100 52 Z"
          fill="#451a03"
        />
        {/* Subtle Vajra Emblem on Head */}
        <path d="M78 28 L82 28 L80 18 Z" fill="#38bdf8" />
        <circle cx="80" cy="30" r="2.5" fill="#f59e0b" />
      </svg>
    );
  }

  if (character === "Yudhishthira") {
    return (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="yudhiGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#0f172a" stopOpacity="0.95" />
          </radialGradient>
        </defs>

        <rect width="160" height="160" fill="url(#yudhiGlow)" />

        {/* Royal Crowned Dharmaraja */}
        <circle cx="80" cy="70" r="58" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="8,6" opacity="0.3" />

        {/* Royal Embroidered Robes */}
        <path
          d="M25 160 C25 125 45 110 80 110 C115 110 135 125 135 160 Z"
          fill="#1e40af"
          stroke="#f59e0b"
          strokeWidth="1.8"
        />
        {/* Gold Trim Border */}
        <path d="M40 160 L80 114 L120 160" stroke="#fbbf24" strokeWidth="2" fill="none" />

        {/* Neck */}
        <path d="M68 94 L68 114 Q80 118 92 114 L92 94 Z" fill="#fcd34d" opacity="0.9" />

        {/* Dignified Royal Face */}
        <path
          d="M61 60 C61 48 69 44 80 44 C91 44 99 48 99 60 C99 82 91 97 80 97 C69 97 61 82 61 60 Z"
          fill="#fcd34d"
        />

        {/* Serene Yet Weighted Eyes */}
        <path d="M66 64 Q74 61 78 64 Q74 67 66 64 Z" fill="#1c1917" />
        <circle cx="72" cy="64" r="1.3" fill="#38bdf8" />
        <path d="M82 64 Q86 61 94 64 Q86 67 82 64 Z" fill="#1c1917" />
        <circle cx="88" cy="64" r="1.3" fill="#38bdf8" />

        {/* Regal Beard & Mustache */}
        <path d="M72 78 Q80 82 88 78 Q80 90 72 78 Z" fill="#171717" opacity="0.8" />

        {/* Dharma Tilak */}
        <line x1="80" y1="48" x2="80" y2="58" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="80" cy="59" r="1.5" fill="#ef4444" />

        {/* Majestic Sovereign Crown (Mukut) */}
        <path
          d="M58 48 L62 26 L72 34 L80 18 L88 34 L98 26 L102 48 Z"
          fill="#f59e0b"
          stroke="#78350f"
          strokeWidth="1.2"
        />
        <circle cx="80" cy="30" r="3.5" fill="#3b82f6" stroke="#fef08a" strokeWidth="1" />
        <circle cx="68" cy="35" r="2" fill="#ef4444" />
        <circle cx="92" cy="35" r="2" fill="#ef4444" />
      </svg>
    );
  }

  if (character === "Shakuni") {
    return (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="shakuniDark" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#3b0764" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#09090b" stopOpacity="0.98" />
          </radialGradient>
        </defs>

        <rect width="160" height="160" fill="url(#shakuniDark)" />

        {/* Dark Royal Garments */}
        <path
          d="M25 160 C25 125 45 110 80 110 C115 110 135 125 135 160 Z"
          fill="#18181b"
          stroke="#a855f7"
          strokeWidth="1.5"
        />

        {/* Neck */}
        <path d="M70 95 L70 115 Q80 118 90 115 L90 95 Z" fill="#e7e5e4" />

        {/* Sharp, Cunning Face */}
        <path
          d="M62 60 C62 48 70 44 80 44 C90 44 98 48 98 60 C98 82 89 97 80 97 C71 97 62 82 62 60 Z"
          fill="#e7e5e4"
        />

        {/* Squinted Calculating Eyes */}
        <path d="M66 65 Q74 61 78 64" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="73" cy="65" r="1.2" fill="#ef4444" />
        <path d="M82 64 Q86 61 94 65" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="87" cy="65" r="1.2" fill="#ef4444" />

        {/* Sly Smirking Mouth */}
        <path d="M72 82 Q80 82 89 79" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />

        {/* Dark Hood / Gandhara Headdress */}
        <path
          d="M56 50 C54 30 66 22 80 22 C94 22 106 30 104 50 L98 60 L62 60 Z"
          fill="#581c87"
          stroke="#c084fc"
          strokeWidth="1"
        />

        {/* Glowing Ivory Dice in Foreground */}
        <g transform="translate(100, 115) rotate(15)">
          <rect x="0" y="0" width="24" height="24" rx="3" fill="#fafaf9" stroke="#78716c" strokeWidth="1.2" />
          <circle cx="6" cy="6" r="1.8" fill="#dc2626" />
          <circle cx="18" cy="18" r="1.8" fill="#dc2626" />
          <circle cx="12" cy="12" r="2.2" fill="#1c1917" />
        </g>
      </svg>
    );
  }

  if (character === "Kunti") {
    return (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="kuntiGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#881337" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#4c0519" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        <rect width="160" height="160" fill="url(#kuntiGlow)" />

        {/* White-Gold Queen Mother Veil (Pallu) */}
        <path
          d="M45 40 C45 25 60 20 80 20 C100 20 115 25 115 40 C115 70 125 120 135 160 L25 160 C35 120 45 70 45 40 Z"
          fill="#fff1f2"
          stroke="#fb7185"
          strokeWidth="1.2"
        />

        {/* Face */}
        <path
          d="M64 62 C64 50 71 46 80 46 C89 46 96 50 96 62 C96 82 89 95 80 95 C71 95 64 82 64 62 Z"
          fill="#fed7aa"
        />

        {/* Tear-Stained Sorrowful Eyes */}
        <path d="M68 64 Q74 61 78 64 Q74 67 68 64 Z" fill="#1c1917" />
        <path d="M82 64 Q86 61 92 64 Q86 67 82 64 Z" fill="#1c1917" />
        {/* Tear Drop */}
        <circle cx="74" cy="74" r="1.5" fill="#38bdf8" />
        <circle cx="74" cy="80" r="1.2" fill="#38bdf8" />

        {/* Royal Vermilion Sindoor / Bindi */}
        <circle cx="80" cy="54" r="2.5" fill="#dc2626" />

        {/* Pearl Necklace */}
        <path d="M68 110 Q80 120 92 110" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="3,3" fill="none" />
      </svg>
    );
  }

  if (character === "Krishna") {
    return (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="krishnaAura" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#0284c7" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.95" />
          </radialGradient>
          <radialGradient id="peacockEye" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="40%" stopColor="#10b981" />
            <stop offset="80%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
        </defs>

        <rect width="160" height="160" fill="url(#krishnaAura)" />

        {/* Cosmic Sudarshana Chakra Halo */}
        <circle cx="80" cy="65" r="56" stroke="#fef08a" strokeWidth="2" strokeDasharray="12,6" className="animate-chakra" />
        <circle cx="80" cy="65" r="48" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />

        {/* Golden Pitambara Silk Robes */}
        <path
          d="M25 160 C25 125 45 108 80 108 C115 108 135 125 135 160 Z"
          fill="#eab308"
          stroke="#ca8a04"
          strokeWidth="1.5"
        />
        {/* Kaustubha Gem & Vanamala Garland */}
        <circle cx="80" cy="125" r="5" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
        <path d="M55 120 Q80 150 105 120" stroke="#fef08a" strokeWidth="2" fill="none" strokeDasharray="4,4" />

        {/* Divine Shyam (Blue Lotus) Neck */}
        <path d="M68 94 L68 114 Q80 118 92 114 L92 94 Z" fill="#38bdf8" />

        {/* Enchanting Lotus Face */}
        <path
          d="M61 60 C61 46 69 42 80 42 C91 42 99 46 99 60 C99 82 91 96 80 96 C69 96 61 82 61 60 Z"
          fill="#38bdf8"
        />

        {/* Lotus Petal Eyes */}
        <path d="M66 63 Q74 58 78 63 Q74 67 66 63 Z" fill="#ffffff" />
        <circle cx="73" cy="63" r="2.2" fill="#0f172a" />
        <circle cx="74" cy="62" r="0.8" fill="#ffffff" />

        <path d="M82 63 Q86 58 94 63 Q86 67 82 63 Z" fill="#ffffff" />
        <circle cx="87" cy="63" r="2.2" fill="#0f172a" />
        <circle cx="88" cy="62" r="0.8" fill="#ffffff" />

        {/* Gentle Divine Smile */}
        <path d="M72 80 Q80 84 88 80" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />

        {/* Sacred Chandan & Kasturi Tilak */}
        <path d="M77 44 Q80 56 80 58 Q80 56 83 44" stroke="#fef08a" strokeWidth="2" fill="none" />
        <circle cx="80" cy="56" r="1.5" fill="#dc2626" />

        {/* Radiant Golden Crown (Mukut) */}
        <path
          d="M58 46 L62 26 L72 32 L80 18 L88 32 L98 26 L102 46 Z"
          fill="#f59e0b"
          stroke="#78350f"
          strokeWidth="1.2"
        />
        <circle cx="80" cy="28" r="3" fill="#10b981" stroke="#fef08a" strokeWidth="0.8" />

        {/* The Sacred Peacock Feather (Mayur Pankh) */}
        <g transform="translate(80, 16) rotate(15)">
          <path d="M0 0 C-10 -15 -8 -30 0 -38 C8 -30 10 -15 0 0 Z" fill="url(#peacockEye)" />
          <circle cx="0" cy="-22" r="5" fill="#0284c7" />
          <circle cx="0" cy="-22" r="2.5" fill="#0f172a" />
          <line x1="0" y1="0" x2="0" y2="-42" stroke="#eab308" strokeWidth="1" />
        </g>
      </svg>
    );
  }

  if (character === "Arjuna") {
    return (
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="arjunaGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#047857" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#065f46" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#022c22" stopOpacity="0.95" />
          </radialGradient>
          <linearGradient id="silverArmor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>

        <rect width="160" height="160" fill="url(#arjunaGlow)" />

        {/* Master Archer Shoulders & Gandiva Strap */}
        <path
          d="M25 160 C25 124 45 108 80 108 C115 108 135 124 135 160 Z"
          fill="url(#silverArmor)"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        {/* Celestial Gandiva Bow Leather Quiver Strap */}
        <line x1="40" y1="110" x2="120" y2="160" stroke="#78350f" strokeWidth="6" />
        <line x1="40" y1="110" x2="120" y2="160" stroke="#f59e0b" strokeWidth="1.5" />

        {/* Neck */}
        <path d="M68 94 L68 114 Q80 118 92 114 L92 94 Z" fill="#fed7aa" />

        {/* Focused Hero Face */}
        <path
          d="M61 60 C61 48 69 44 80 44 C91 44 99 48 99 60 C99 82 91 97 80 97 C69 97 61 82 61 60 Z"
          fill="#fed7aa"
        />

        {/* Eagle-Sharp Focusing Eyes */}
        <path d="M66 64 Q74 60 78 64 Q74 67 66 64 Z" fill="#1c1917" />
        <circle cx="73" cy="63" r="1.5" fill="#10b981" />
        <path d="M82 64 Q86 60 94 64 Q86 67 82 64 Z" fill="#1c1917" />
        <circle cx="87" cy="63" r="1.5" fill="#10b981" />

        {/* Fierce Kshatriya Eyebrows */}
        <path d="M64 59 Q73 55 79 59" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M81 59 Q87 55 96 59" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />

        {/* Tilak of Victory */}
        <line x1="80" y1="48" x2="80" y2="56" stroke="#ef4444" strokeWidth="2" />
        <circle cx="80" cy="57" r="1.2" fill="#f59e0b" />

        {/* Silver & Gold Warrior Helm */}
        <path
          d="M58 48 C58 32 68 24 80 24 C92 24 102 32 102 48 L98 52 L62 52 Z"
          fill="#f59e0b"
          stroke="#78350f"
          strokeWidth="1.2"
        />
        <polygon points="80,14 84,25 76,25" fill="#f8fafc" />
        <circle cx="80" cy="34" r="3" fill="#10b981" stroke="#fef08a" strokeWidth="0.8" />
      </svg>
    );
  }

  // Drona / Royal Guru
  return (
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full object-cover"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="160" height="160" fill="#292524" />
      <circle cx="80" cy="80" r="50" fill="#d97706" opacity="0.3" />
      <path
        d="M25 160 C25 125 45 110 80 110 C115 110 135 125 135 160 Z"
        fill="#f8fafc"
      />
      <circle cx="80" cy="65" r="24" fill="#fed7aa" />
      <path d="M60 75 Q80 110 100 75 Z" fill="#e7e5e4" />
      <text x="50" y="55" fill="#78350f" fontSize="10" fontWeight="bold">
        DRONA
      </text>
    </svg>
  );
}
