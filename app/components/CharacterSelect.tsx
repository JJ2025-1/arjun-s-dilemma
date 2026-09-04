"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { CharacterKey } from "./GameAvatars";

export interface ChampionProfile {
  id: CharacterKey;
  name: string;
  sanskritName: string;
  epithet: string;
  portrait: string;
  weapon: string;
  themeColor: "amber" | "emerald" | "sky" | "rose";
  borderClass: string;
  glowClass: string;
  startingBonus: {
    dharma: number;
    loyalty: number;
    survival: number;
    label: string;
  };
  moralVow: string;
  loreBio: string;
  signatureQuote: string;
}

export const CHAMPIONS: ChampionProfile[] = [
  {
    id: "Karna",
    name: "Karna (Radheya)",
    sanskritName: "कर्णः • दानवीर सूर्यपुत्रः",
    epithet: "The Sun's Firstborn • King of Anga",
    portrait: "/portraits/karna.png",
    weapon: "Celestial Kavach, Kundal & Vijaya Bow",
    themeColor: "amber",
    borderClass: "border-amber-500 hover:border-amber-400",
    glowClass: "shadow-[0_0_25px_rgba(245,158,11,0.5)]",
    startingBonus: {
      dharma: 10,
      loyalty: 5,
      survival: -5,
      label: "+10 Dharma • +5 Loyalty • Bound by Sacred Charity",
    },
    moralVow: "The Inviolable Vow of Munificence (Daan-Veer)",
    loreBio:
      "Cast into the sacred Ganga at birth to conceal royal shame, Karna rose from humility through divine archer prowess. Crowned King of Anga by Duryodhana, he bound his destiny to unbreakable friendship, scorning gods who demanded his loyalty waiver.",
    signatureQuote:
      "“A petitioner shall never leave Karna's threshold empty-handed, even if he demands my mortal flesh.”",
  },
  {
    id: "Arjuna",
    name: "Arjuna (Dhananjaya)",
    sanskritName: "अर्जुनः • गाण्डीवधारी पार्थः",
    epithet: "The Sovereign Archer • Third Pandava",
    portrait: "/portraits/arjuna.png",
    weapon: "Celestial Gandiva Bow & Inexhaustible Quivers",
    themeColor: "emerald",
    borderClass: "border-emerald-500 hover:border-emerald-400",
    glowClass: "shadow-[0_0_25px_rgba(16,185,129,0.5)]",
    startingBonus: {
      dharma: 5,
      loyalty: 0,
      survival: 10,
      label: "+10 Survival • +5 Dharma • Peerless Martial Focus",
    },
    moralVow: "The Kshatriya Code of Dharmayuddha (Chivalric War)",
    loreBio:
      "Supreme disciple of Drona and champion of the Pandavas. On the twilight fields of Kurukshetra, his bow faltered at the horror of slaying revered kin, prompting Lord Krishna to unveil the immortal verses of the Bhagavad Gita.",
    signatureQuote:
      "“Guide my chariot between the two armies, Krishna! Let my arrows strike for righteous order, not petty vengeance.”",
  },
  {
    id: "Krishna",
    name: "Lord Krishna (Madhava)",
    sanskritName: "कृष्णः • जगद्गुरुः योगेश्वरः",
    epithet: "Cosmic Charioteer • The Divine Guide",
    portrait: "/portraits/krishna.png",
    weapon: "Sudarshana Chakra & Divine Moral Counsel",
    themeColor: "sky",
    borderClass: "border-sky-500 hover:border-sky-400",
    glowClass: "shadow-[0_0_25px_rgba(14,165,233,0.5)]",
    startingBonus: {
      dharma: 10,
      loyalty: 5,
      survival: 5,
      label: "+10 Dharma • +5 Loyalty • +5 Survival • Universal Insight",
    },
    moralVow: "Universal Cosmic Balance (Sanatana Dharma)",
    loreBio:
      "Refusing to draw steel in battle, Krishna chose instead to grip the reins of Arjuna's four white horses. As the divine consciousness of the epic, he unravels mechanical dogmas to teach that righteous duty transcends temporal outcome.",
    signatureQuote:
      "“You have a right only to perform your prescribed duty, never to the fruits of action.” — Bhagavad Gita",
  },
  {
    id: "Draupadi",
    name: "Queen Draupadi (Panchali)",
    sanskritName: "द्रौपदी • याज्ञसेनी पाञ्चाली",
    epithet: "Born from the Sacrificial Fire • Empress",
    portrait: "/portraits/draupadi.png",
    weapon: "Indomitable Moral Will & Sacred Fire",
    themeColor: "rose",
    borderClass: "border-rose-500 hover:border-rose-400",
    glowClass: "shadow-[0_0_25px_rgba(244,63,94,0.5)]",
    startingBonus: {
      dharma: 5,
      loyalty: 15,
      survival: -5,
      label: "+15 Loyalty • +5 Dharma • Uncompromising Truth",
    },
    moralVow: "Sacred Dignity & Retribution for Injustice",
    loreBio:
      "Emerged fully grown from the flames of King Drupada's yajna altar. When humiliated in Hastinapur's royal court while Kuru patriarchs sat mute, her fierce questions struck the heart of hypocrisy, demanding moral accountability.",
    signatureQuote:
      "“Where was the sacred code of the elders when dharma was dragged by the hair in the royal hall of Hastinapur?”",
  },
  {
    id: "Yudhishthira",
    name: "King Yudhishthira",
    sanskritName: "युधिष्ठिरः • धर्मराजः कौन्तेयः",
    epithet: "Emperor of Righteousness • Eldest Pandava",
    portrait: "/portraits/yudhishthira.png",
    weapon: "Royal Sceptre & Inviolable Truth",
    themeColor: "amber",
    borderClass: "border-amber-500 hover:border-amber-400",
    glowClass: "shadow-[0_0_25px_rgba(245,158,11,0.5)]",
    startingBonus: {
      dharma: 15,
      loyalty: 10,
      survival: -10,
      label: "+15 Dharma • +10 Loyalty • Sovereign Righteousness",
    },
    moralVow: "The Unbending Law of Cosmic Truth (Satya-Vrata)",
    loreBio:
      "Son of Dharma and rightful sovereign of Indraprastha. Even when provoked or tested in the deepest fires of adversity, his steadfast adherence to moral truth guides the Pandava destiny.",
    signatureQuote:
      "“Righteousness is the only friend that accompanies the soul even in death. Everything else perishes with the body.”",
  },
  {
    id: "Drona",
    name: "Guru Dronacharya",
    sanskritName: "द्रोणाचार्यः • धनुर्वेद गुरुः",
    epithet: "Master of Celestial Astras • Supreme Preceptor",
    portrait: "/portraits/drona.png",
    weapon: "Brahmashira Astra & Divine Bow",
    themeColor: "amber",
    borderClass: "border-amber-500 hover:border-amber-400",
    glowClass: "shadow-[0_0_25px_rgba(245,158,11,0.5)]",
    startingBonus: {
      dharma: 10,
      loyalty: 10,
      survival: 0,
      label: "+10 Dharma • +10 Loyalty • Guru of the Kurus",
    },
    moralVow: "Sacred Duty to the Throne of Hastinapur",
    loreBio:
      "The preceptor of both Pandavas and Kauravas, master of every divine weapon. Bound by royal obligation to protect Hastinapur, his tragedy is opposing the pupils he loved as sons.",
    signatureQuote:
      "“A warrior does not lay down his arms until destiny itself commands the retreat.”",
  },
];

interface CharacterSelectProps {
  onSelect: (champion: ChampionProfile) => void;
  onBack: () => void;
}

export function CharacterSelect({ onSelect, onBack }: CharacterSelectProps) {
  const [selectedId, setSelectedId] = useState<CharacterKey>("Karna");

  const activeChampion =
    CHAMPIONS.find((c) => c.id === selectedId) || CHAMPIONS[0];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between text-neutral-100 p-3 sm:p-6 select-none">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 bg-[#070709] overflow-hidden pointer-events-none">
        <img
          src="/epic_key_art.png"
          alt="Backdrop"
          className="w-full h-full object-cover opacity-15 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-[#070709]" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between pb-3 pr-28 sm:pr-36 border-b border-amber-500/30">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-xs font-serif text-neutral-300 hover:text-amber-300 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Title Screen</span>
        </button>

        <div className="text-center">
          <h2 className="text-sm sm:text-lg font-serif font-bold text-amber-300 uppercase tracking-widest">
            CHOOSE YOUR CHAMPION OF DESTINY
          </h2>
          <span className="text-[10px] text-neutral-400 font-serif">
            नायक चयनम् • Select your moral lens before the dilemmas begin
          </span>
        </div>

        <button
          onClick={() => onSelect(activeChampion)}
          className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-serif font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
        >
          <span>Begin</span>
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Grid of Champion Cards */}
      <main className="relative z-10 w-full max-w-6xl my-auto py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CHAMPIONS.map((champ) => {
            const isSelected = champ.id === selectedId;

            return (
              <div
                key={champ.id}
                onClick={() => setSelectedId(champ.id)}
                className={`relative rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 border-2 ${champ.borderClass} ${champ.glowClass} scale-102`
                    : "bg-neutral-950/80 hover:bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 opacity-80 hover:opacity-100"
                }`}
              >
                {/* Active Selection Badge */}
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-serif font-bold uppercase tracking-widest shadow-md flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Chosen Champion</span>
                  </div>
                )}

                {/* Coin Medallion with .portrait-bob animation */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 my-2 rounded-full p-1 border-2 border-amber-400/90 bg-gradient-to-b from-amber-600 via-amber-950 to-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] portrait-bob">
                  <img
                    src={champ.portrait}
                    alt={champ.name}
                    className="w-full h-full object-cover rounded-full select-none image-crisp"
                    style={{ imageRendering: "crisp-edges" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/portraits/arjuna.png";
                    }}
                  />
                  <div className="absolute inset-0 rounded-full border border-amber-200/30 pointer-events-none" />
                </div>

                {/* Names */}
                <h3 className="text-base font-serif font-bold text-amber-200 mt-2">
                  {champ.name}
                </h3>
                <p className="text-[10px] font-serif text-amber-500/80 mb-2">
                  {champ.sanskritName}
                </p>

                {/* Starting Karmic Alignment Badge */}
                <div className="w-full py-1 px-2 rounded-xl bg-neutral-900/90 border border-amber-500/20 text-[10px] font-mono text-amber-300 font-semibold mb-2">
                  {champ.startingBonus.label}
                </div>

                {/* Bio Excerpt */}
                <p className="text-[11px] text-neutral-300 font-sans leading-relaxed line-clamp-3 mb-3">
                  {champ.loreBio}
                </p>

                {/* Signature Quote */}
                <div className="mt-auto pt-2 border-t border-amber-500/20 text-[10px] font-serif italic text-amber-300/80">
                  {champ.signatureQuote}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Champion Detail Banner */}
        <div className="mt-5 p-4 rounded-2xl bg-neutral-950/90 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-12 h-12 rounded-full border border-amber-400 overflow-hidden shrink-0">
              <img
                src={activeChampion.portrait}
                alt={activeChampion.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wide">
                Active Allegiance: {activeChampion.name}
              </div>
              <p className="text-[11px] text-neutral-400">
                Weapon: <span className="text-neutral-200">{activeChampion.weapon}</span> • Vow:{" "}
                <span className="text-amber-400/90">{activeChampion.moralVow}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelect(activeChampion)}
            className="rpg-btn-sheen px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-serif font-bold text-xs uppercase tracking-widest shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer shrink-0 flex items-center space-x-2"
          >
            <span>CONFIRM & ENTER DILEMMAS</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-2 text-[10px] font-serif text-neutral-500">
        You can explore all scenarios regardless of champion choice • Chosen champion sets your moral avatar & starting karmic affinities
      </footer>
    </div>
  );
}
