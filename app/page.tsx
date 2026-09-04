"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Scale,
  Heart,
  Crown,
  Swords,
  Scroll,
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  History,
  Sun,
  Award,
  X,
  Share2,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { GameHudFrame } from "./components/GameHudFrame";
import { CharacterKey } from "./components/GameAvatars";
import { ResourceGauges } from "./components/ResourceGauges";
import { FloatingCombatText, CombatTag } from "./components/FloatingCombatText";
import { RpgDialogBox, Choice, Scenario } from "./components/RpgDialogBox";
import { OpeningHero } from "./components/OpeningHero";
import { CharacterSelect, ChampionProfile } from "./components/CharacterSelect";
import { MusicController } from "./components/MusicController";
import { CINEMATIC_ENGINE_CAMPAIGN, CinematicDilemma, ChoiceOption } from "@/app/data/cinematicEngineData";
import { CinematicStage } from "@/app/components/CinematicStage";
import { KarmicVerdict } from "@/app/components/KarmicVerdict";

// Five deep ethical dilemmas of the Mahabharata
const SCENARIOS: Scenario[] = [
  {
    id: "karna_indra",
    index: 1,
    character: "Karna",
    characterTitle: "The Sun's Son • King of Anga",
    dilemmaTitle: "The Brahmin's Celestial Request",
    sanskritSubtitle: "दानवीरस्य महापरीक्षा (The Trial of the Munificent)",
    location: "Sacred Banks of Holy Ganga • Dawn Twilight",
    quote:
      "“A petitioner shall never leave Karna's threshold empty-handed, even if he demands my mortal flesh.”",
    context:
      "At dawn, Lord Surya warns you in a vision: King Indra will disguise himself as a frail Brahmin to beg for your divine Kavach (golden armor) and Kundal (earrings) so Arjuna can defeat you in war. As you finish your morning prayers waist-deep in the Ganga, a trembling Brahmin approaches with an outstretched bowl, pleading for the celestial gold fused to your skin.",
    moralTension:
      "Will you honor your sacred vow of unconditional charity, knowing it leaves you mortal before Arjuna—or preserve the armor to safeguard Duryodhana and your soldiers?",
    choiceA: {
      id: "A",
      label: "Sacrifice the Golden Armor",
      actionTitle: "The Vow of Daan-Veer (Uphold Sacred Charity)",
      flavor:
        "Draw your golden blade and carve the celestial armor from your flesh. Offer it dripping with your sacred blood to the stunned Brahmin.",
      moralCommentary:
        "The cosmos will sing of your peerless munificence for millennia, but you are now vulnerable to the fatal celestial shafts of the Gandiva.",
      dharmaDelta: +25,
      loyaltyDelta: +5,
      survivalDelta: -35,
      quoteOnPick:
        "“Take them, noble Brahmin! Karna's renown for giving shall shine longer than the mortal sun.”",
    },
    choiceB: {
      id: "B",
      label: "Refuse the Disguised God",
      actionTitle: "The Shield of Kshatriya Prudence (Preserve Armor)",
      flavor:
        "Expose Indra's deceit. Declare that a king's solemn duty to protect his soldiers and kingdom overrides gifts to gods acting in subterfuge.",
      moralCommentary:
        "You preserve divine invincibility, guaranteeing temporal martial power, but your sacred vow of charity is broken forever.",
      dharmaDelta: -30,
      loyaltyDelta: -15,
      survivalDelta: +30,
      quoteOnPick:
        "“I see through your beggar robes, King of Gods! Karna is a protector of mortals, not a sacrificial lamb for heaven's favorites.”",
    },
    illustrationType: "armor",
  },
  {
    id: "yudhishthira_dice",
    index: 2,
    character: "Yudhishthira",
    characterTitle: "Dharmaraja • King of Indraprastha",
    dilemmaTitle: "The Gambler's Poisoned Oath",
    sanskritSubtitle: "द्यूतसभायाः दारुणसंकटः (The Dilemma of the Royal Gambling Hall)",
    location: "Royal Sabhā of Hastinapur",
    quote:
      "“When challenged in council by elders or kin, a Kshatriya king cannot retreat without tainting his ancestors' honor.”",
    context:
      "In the royal assembly of Hastinapur, the loaded ivory dice click upon the cloth. Shakuni grins as your kingdom, treasures, and brothers' freedom have been lost in successive throws. Duryodhana taunts: 'Dharmaraja, roll once more! Stake your own liberty or crawl away branded a coward.' The Kuru elders sit paralyzed in shameful silence.",
    moralTension:
      "Does the sacred Kshatriya etiquette of never refusing a challenge compel you to obey a rigged game, or does true Dharma command you to overturn the board?",
    choiceA: {
      id: "A",
      label: "Honor the Challenge & Roll",
      actionTitle: "Strict Kshatriya Protocol (Honor the Code)",
      flavor:
        "Close your eyes and accept the poisoned ivory dice. Cast them onto the marble, clinging to the rigid rule that a warrior never declines a formal summons.",
      moralCommentary:
        "You maintain technical adherence to the warrior etiquette, but you plunge your entire dynasty into thirteen years of exile and slavery.",
      dharmaDelta: -15,
      loyaltyDelta: +20,
      survivalDelta: -35,
      quoteOnPick:
        "“Let destiny speak. A son of Pandu does not flee the board when summoned by his royal kin.”",
    },
    choiceB: {
      id: "B",
      label: "Shatter the Board & Walk Away",
      actionTitle: "Moral Mutiny (Preserve the Realm)",
      flavor:
        "Rise in fury from the cushions and kick over the gaming table. Denounce Shakuni's deceitful dice and command your brothers to depart the corrupt assembly.",
      moralCommentary:
        "You protect the sovereignty of Indraprastha and shield your family, but the venomous accusation of oath-breaking will pursue you across the land.",
      dharmaDelta: -25,
      loyaltyDelta: -20,
      survivalDelta: +30,
      quoteOnPick:
        "“Enough! This is no royal game, but an ambush of thieves. Indraprastha does not gamble away the lives of its free subjects!”",
    },
    illustrationType: "dice",
  },
  {
    id: "karna_kunti",
    index: 3,
    character: "Karna",
    characterTitle: "Radheya • Firstborn of Kunti",
    dilemmaTitle: "Kunti's Sunset Plea on the Ganga",
    sanskritSubtitle: "मातृस्नेहः मित्राज्ञा च (Maternal Tears vs. Friendship's Oath)",
    location: "Twilight Sands of the River Ganges",
    quote:
      "“You cast me into the river as an infant to hide your shame. Now, when your sons need a shield, you offer me a crown?”",
    context:
      "At dusk on the eve of the war, Queen Kunti weeps at your feet. She reveals the burning secret of your birth: you are the firstborn son of Surya, eldest brother to Yudhishthira, Bhima, and Arjuna. She implores: 'Abandon Duryodhana! The Pandavas will crown you King of the Three Realms. End this catastrophic war before blood spills!'",
    moralTension:
      "Will you claim your legitimate imperial crown and unite with your brothers, or stand with Duryodhana, who gave you royal dignity when all others spat upon you?",
    choiceA: {
      id: "A",
      label: "Stand with Duryodhana",
      actionTitle: "Mitra-Dharma (Unshakable Fealty)",
      flavor:
        "Gently raise Kunti from the sand, but refuse the imperial crown. Remind her that Duryodhana stood by you when the world called you low-caste. Vow only to spare four Pandavas, reserving your arrows for Arjuna alone.",
      moralCommentary:
        "You exemplify legendary fealty to your benefactor, but you march knowingly toward fratricidal slaughter against your own blood.",
      dharmaDelta: -10,
      loyaltyDelta: +35,
      survivalDelta: -20,
      quoteOnPick:
        "“Mother, Duryodhana gave me a kingdom when you cast me into the water. I cannot betray him at the hour of his greatest peril.”",
    },
    choiceB: {
      id: "B",
      label: "Embrace Your Bloodline",
      actionTitle: "Avert the Apocalypse (Claim the Throne)",
      flavor:
        "Kneel and touch Kunti's feet in tears. Cross the river into the Pandava camp as the legitimate eldest emperor, uniting the six brothers and preventing war.",
      moralCommentary:
        "You prevent the colossal slaughter of millions of warriors, but history records you as a defector who deserted the friend who made you king.",
      dharmaDelta: +25,
      loyaltyDelta: -35,
      survivalDelta: +25,
      quoteOnPick:
        "“I lay down my grudge, Mother. If my bloodline can avert the annihilation of Bharatavarsha, let me bear the brand of betrayal.”",
    },
    illustrationType: "river",
  },
  {
    id: "krishna_narayani",
    index: 4,
    character: "Arjuna",
    characterTitle: "Dhananjaya • Champion of the Gandiva",
    dilemmaTitle: "The Sovereign Choice at Dwarka",
    sanskritSubtitle: "बलम् अथवा बुद्धिः (Physical Might vs. Divine Counsel)",
    location: "The Council Chamber of Dwarka",
    quote:
      "“One will receive my invincible Narayani Sena—millions of battle-hardened soldiers. The other will have me alone, unarmed and refusing to strike.”",
    context:
      "Both you and Duryodhana arrive in Dwarka seeking Krishna's alliance. Because you sat humbly at Krishna's feet while Duryodhana stood haughtily at his head, Krishna grants you the first choice: either claim the colossal Narayani army with millions of war chariots and elephants, or choose Krishna alone as an unarmed charioteer who will never draw steel.",
    moralTension:
      "Will you choose spiritual righteousness and divine guidance, or the overwhelming military host needed to physically crush the Kaurava vanguard?",
    choiceA: {
      id: "A",
      label: "Choose Krishna Unarmed",
      actionTitle: "The Divine Charioteer (Spiritual Faith)",
      flavor:
        "Bow your head and choose the unarmed Krishna. Surrender millions of seasoned warriors to Duryodhana, trusting that divine wisdom transcends physical legions.",
      moralCommentary:
        "You align your soul with cosmic truth and the sacred wisdom of the Gita, though your physical battle lines are drastically outnumbered.",
      dharmaDelta: +30,
      loyaltyDelta: +15,
      survivalDelta: -20,
      quoteOnPick:
        "“I desire neither armies nor war elephants, Madhava. Guide my chariot through darkness, and righteousness shall conquer.”",
    },
    choiceB: {
      id: "B",
      label: "Claim the Narayani Legion",
      actionTitle: "The Iron Host (Temporal Superiority)",
      flavor:
        "Choose the invincible Narayani army. Fortify your ranks with millions of armored shock cavalry and archers, leaving Krishna as an idle spectator.",
      moralCommentary:
        "You secure overwhelming military supremacy and temporal survival, but you march to battle without the inner moral compass of the Avatar.",
      dharmaDelta: -25,
      loyaltyDelta: -10,
      survivalDelta: +35,
      quoteOnPick:
        "“War is decided in blood and iron, Krishna. Your invincible army guarantees that my brothers will not perish upon the battleground.”",
    },
    illustrationType: "dwarka",
  },
  {
    id: "arjuna_wheel",
    index: 5,
    character: "Arjuna",
    characterTitle: "Arjuna & Krishna • The 17th Day",
    dilemmaTitle: "The Unarmed Chariot Wheel",
    sanskritSubtitle: "धर्मयुद्धस्य अन्त्यसीमा (The Final Boundary of Chivalry)",
    location: "Kurukshetra • Churned Mud of the Battlefield",
    quote:
      "“He stands unarmed, lifting his wheel from the mud! Does Dharmayuddha permit an archer to shoot an opponent who has lowered his bow?”",
    context:
      "On the 17th afternoon of the war, the earth swallows Karna's chariot wheel under Parashurama's ancient curse. Karna leaps into the mud, laying aside his celestial Vijaya bow and shouting: 'Halt, Arjuna! Uphold Kshatriya chivalry until I free my chariot!' Krishna turns to you, divine eyes blazing: 'Shoot him now, Partha! When Abhimanyu was butchered unarmed by seven warriors, where was their chivalry? Slay adharma before it mounts again!'",
    moralTension:
      "Do you maintain strict chivalric war honor and spare an unarmed opponent, or execute pragmatic cosmic justice to destroy the supreme threat to your brothers?",
    choiceA: {
      id: "A",
      label: "Lower the Gandiva Bow",
      actionTitle: "Chivalric Purity (Honor the Warrior Code)",
      flavor:
        "Lower your bowstring. Refuse Krishna's command, insisting that the bloodline of Bharata does not shoot a warrior struggling in the mud with his back turned.",
      moralCommentary:
        "You preserve immaculate chivalric honor, but Karna frees his chariot, invokes the celestial Brahmashira weapon, and threatens your life.",
      dharmaDelta: +25,
      loyaltyDelta: -20,
      survivalDelta: -30,
      quoteOnPick:
        "“I am Arjuna! Let him lift his wheel and take his bow. I will defeat Karna as a warrior, not as an assassin.”",
    },
    choiceB: {
      id: "B",
      label: "Release the Anjalika Arrow",
      actionTitle: "Cosmic Retribution (Obey the Avatar)",
      flavor:
        "Draw the Gandiva back to your ear, invoking the blazing celestial Anjalika arrow. Release it upon Karna while he labors in the mire.",
      moralCommentary:
        "You eliminate the greatest threat to your family and secure final victory, but you bear the eternal stain of shooting an unarmed opponent.",
      dharmaDelta: -20,
      loyaltyDelta: +25,
      survivalDelta: +30,
      quoteOnPick:
        "“By Krishna's decree and in vengeance for Abhimanyu, let the arrow fly! The wheel of karma takes its due.”",
    },
    illustrationType: "wheel",
  },
];

// Map each scenario to its opposing counterpart avatar
const OPPONENTS: Record<string, CharacterKey> = {
  karna_indra: "Indra",
  yudhishthira_dice: "Shakuni",
  karna_kunti: "Kunti",
  krishna_narayani: "Krishna",
  arjuna_wheel: "Karna",
};

interface DecisionRecord {
  scenarioIndex: number;
  scenarioTitle: string;
  character: string;
  choiceId: "A" | "B";
  choiceTitle: string;
  flavor: string;
  dharmaDelta: number;
  loyaltyDelta: number;
  survivalDelta: number;
  prevStats: { dharma: number; loyalty: number; survival: number };
  newStats: { dharma: number; loyalty: number; survival: number };
}

type EndingType =
  | "verdict"
  | "premature_dharma"
  | "premature_loyalty"
  | "premature_survival";

// Audio Synthesizer utilizing Web Audio API (No external sound files required)
class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private droneGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isPlaying = false;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  private start() {
    if (!this.ctx || this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.035, now + 1.8);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, now);

      // Sacred Tanpura Sa (108 Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = "triangle";
      this.osc1.frequency.setValueAtTime(108, now);

      // Sacred Tanpura Pa (162 Hz)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = "sine";
      this.osc2.frequency.setValueAtTime(162, now);

      // LFO for slow breathing drone
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.012, now);
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.15, now);
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.droneGain.gain);

      this.osc1.connect(filter);
      this.osc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.osc1.start(now);
      this.osc2.start(now);
      this.lfo.start(now);

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  private stop() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      if (this.droneGain) {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => {
          this.osc1?.stop();
          this.osc2?.stop();
          this.lfo?.stop();
          this.isPlaying = false;
        }, 850);
      }
    } catch {
      this.isPlaying = false;
    }
  }

  public playChime(freq = 528) {
    this.init();
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.985, now + 1.4);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.9);
    } catch {
      // Audio catch
    }
  }

  public playWarGong() {
    this.init();
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 2.2);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    } catch {
      // Audio catch
    }
  }
}

// Lore Dossier Content
const LORE_ENTRIES = [
  {
    title: "Dharma (धर्मा)",
    subtitle: "Cosmic Righteousness & Universal Order",
    icon: Scale,
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    text: "Dharma is not mere dogma; it is the cosmic principle that sustains the universe. On the battlefields of Kurukshetra, heroes discover that mechanical legality often conflicts with universal righteousness, forcing painful moral choices.",
  },
  {
    title: "Loyalty (मित्र-धर्म / कुल-धर्म)",
    subtitle: "Sacred Fealty to Kin & Sworn Comrades",
    icon: Heart,
    color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    text: "The inviolable bond of friendship, family, and warrior oaths. Karna's unswerving fidelity to Duryodhana and Arjuna's devotion to his brothers represent the agony when personal affection clashes with spiritual duty.",
  },
  {
    title: "Survival & Rajya (राज्यम्)",
    subtitle: "Physical Endurance & Temporal Sovereignty",
    icon: Crown,
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    text: "The practical necessity of statecraft and physical survival. A dead warrior or fallen dynasty can uphold no virtue. Power and self-preservation are the foundation through which righteousness can actually be implemented.",
  },
  {
    title: "Karna (कर्ण • सूर्यपुत्रः)",
    subtitle: "The Sun's Son • Daan-Veer Radheya",
    icon: Sun,
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    text: "The tragic firstborn of Kunti and Surya. Born with impenetrable golden armor, he was abandoned into the river as an infant. Crowned King of Anga by Duryodhana, Karna chose death over deserting the friend who gave him dignity.",
  },
  {
    title: "Yudhishthira (युधिष्ठिर • धर्मराजः)",
    subtitle: "Dharmaraja • The Sovereign of Truth",
    icon: Scale,
    color: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    text: "Eldest Pandava, son of Dharma. Bound by absolute commitment to truth and the Kshatriya warrior code. His tragic flaw was adherence to protocol, which allowed Shakuni to strip him of his realm in the gambling hall.",
  },
  {
    title: "Arjuna (अर्जुन • धनंजयः)",
    subtitle: "Dhananjaya • Master of the Gandiva Bow",
    icon: Swords,
    color: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
    text: "Third Pandava and supreme archer. Receiver of the sacred Bhagavad Gita from Lord Krishna. Arjuna represents humanity's moral wrestling with duty, grief, and the harsh necessities of cosmic justice.",
  },
];

// Vector Illustrations for each Dilemma
function ScenarioArt({ type }: { type: Scenario["illustrationType"] }) {
  if (type === "armor") {
    return (
      <svg
        viewBox="0 0 400 130"
        className="w-full h-24 sm:h-28 bg-gradient-to-b from-amber-950/60 via-neutral-950 to-neutral-950 overflow-hidden"
      >
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="130" fill="url(#sunGlow)" />
        <path
          d="M0 115 Q100 110 200 115 T400 115 L400 130 L0 130 Z"
          fill="#1e293b"
          opacity="0.6"
        />
        <path
          d="M0 120 Q100 125 200 120 T400 120"
          stroke="#f59e0b"
          strokeWidth="0.7"
          opacity="0.4"
          fill="none"
        />
        <circle cx="200" cy="40" r="22" fill="#f59e0b" opacity="0.8" />
        <circle
          cx="200"
          cy="40"
          r="32"
          stroke="#f59e0b"
          strokeWidth="1"
          strokeDasharray="4,4"
          opacity="0.4"
        />
        <path
          d="M175 60 C175 52 190 48 200 48 C210 48 225 52 225 60 C225 80 215 100 200 106 C185 100 175 80 175 60 Z"
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <circle cx="200" cy="72" r="6" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
        <circle cx="150" cy="70" r="5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="250" cy="70" r="5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        <path
          d="M90 20 L80 42 L92 42 L78 68"
          stroke="#38bdf8"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <text
          x="30"
          y="105"
          fill="#94a3b8"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="2"
        >
          LORD SURYA • BANKS OF GANGA
        </text>
        <text
          x="260"
          y="105"
          fill="#f59e0b"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="1.5"
        >
          KAVACH & KUNDAL
        </text>
      </svg>
    );
  }

  if (type === "dice") {
    return (
      <svg
        viewBox="0 0 400 130"
        className="w-full h-24 sm:h-28 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 overflow-hidden"
      >
        <defs>
          <radialGradient id="diceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="130" fill="url(#diceGlow)" />
        <rect x="30" y="10" width="12" height="110" fill="#262626" stroke="#404040" strokeWidth="0.8" />
        <rect x="358" y="10" width="12" height="110" fill="#262626" stroke="#404040" strokeWidth="0.8" />
        <path d="M180 15 L220 15 L225 70 L175 70 Z" fill="#171717" stroke="#b45309" strokeWidth="1" />
        <g transform="translate(160, 52) rotate(14)">
          <rect x="0" y="0" width="34" height="34" rx="4" fill="#fafaf9" stroke="#78716c" strokeWidth="1.5" />
          <circle cx="9" cy="9" r="2.5" fill="#dc2626" />
          <circle cx="25" cy="9" r="2.5" fill="#1c1917" />
          <circle cx="17" cy="17" r="3" fill="#dc2626" />
          <circle cx="9" cy="25" r="2.5" fill="#1c1917" />
          <circle cx="25" cy="25" r="2.5" fill="#dc2626" />
        </g>
        <g transform="translate(210, 60) rotate(-18)">
          <rect x="0" y="0" width="30" height="30" rx="4" fill="#f5f5f4" stroke="#78716c" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="2" fill="#1c1917" />
          <circle cx="22" cy="8" r="2" fill="#1c1917" />
          <circle cx="15" cy="15" r="2.5" fill="#dc2626" />
          <circle cx="8" cy="22" r="2" fill="#1c1917" />
          <circle cx="22" cy="22" r="2" fill="#1c1917" />
        </g>
        <text
          x="55"
          y="110"
          fill="#f87171"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="1.5"
        >
          SHAKUNI&apos;S POISONED DICE
        </text>
        <text
          x="265"
          y="110"
          fill="#a3a3a3"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="1.5"
        >
          HASTINAPUR SABHĀ
        </text>
      </svg>
    );
  }

  if (type === "river") {
    return (
      <svg
        viewBox="0 0 400 130"
        className="w-full h-24 sm:h-28 bg-gradient-to-b from-rose-950/50 via-neutral-950 to-neutral-950 overflow-hidden"
      >
        <defs>
          <linearGradient id="twilightSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#881337" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#78350f" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="400" height="130" fill="url(#twilightSky)" />
        <circle cx="200" cy="80" r="30" fill="#f43f5e" opacity="0.4" />
        <circle cx="200" cy="80" r="20" fill="#fbbf24" opacity="0.8" />
        <path
          d="M0 85 Q100 82 200 85 T400 85 L400 130 L0 130 Z"
          fill="#172554"
          opacity="0.6"
        />
        <path d="M140 92 Q200 90 260 92" stroke="#f59e0b" strokeWidth="1.2" opacity="0.6" fill="none" />
        <path d="M110 98 Q200 95 290 98" stroke="#f59e0b" strokeWidth="0.9" opacity="0.5" fill="none" />
        <path d="M70 106 Q200 103 330 106" stroke="#fb7185" strokeWidth="0.8" opacity="0.4" fill="none" />
        <circle cx="155" cy="74" r="5" fill="#f43f5e" />
        <path d="M150 82 C150 78 160 78 160 82 L162 100 L148 100 Z" fill="#9f1239" />
        <circle cx="245" cy="70" r="6" fill="#f59e0b" />
        <path d="M238 78 C238 74 252 74 252 78 L254 102 L236 102 Z" fill="#b45309" />
        <text
          x="30"
          y="118"
          fill="#f43f5e"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="1.5"
        >
          QUEEN KUNTI&apos;S PLEA
        </text>
        <text
          x="270"
          y="118"
          fill="#fbbf24"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="1.5"
        >
          TWILIGHT ON THE GANGA
        </text>
      </svg>
    );
  }

  if (type === "dwarka") {
    return (
      <svg
        viewBox="0 0 400 130"
        className="w-full h-24 sm:h-28 bg-gradient-to-b from-blue-950/50 via-neutral-950 to-neutral-950 overflow-hidden"
      >
        <defs>
          <radialGradient id="krishnaGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="130" fill="url(#krishnaGlow)" />
        <path
          d="M200 20 C185 35 180 55 200 80 C220 55 215 35 200 20 Z"
          fill="#0284c7"
          stroke="#38bdf8"
          strokeWidth="1.2"
        />
        <circle cx="200" cy="50" r="8" fill="#eab308" />
        <circle cx="200" cy="50" r="4" fill="#0f172a" />
        <path d="M140 50 L260 50" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="160" cy="50" r="1.5" fill="#78350f" />
        <circle cx="180" cy="50" r="1.5" fill="#78350f" />
        <circle cx="220" cy="50" r="1.5" fill="#78350f" />
        <circle cx="240" cy="50" r="1.5" fill="#78350f" />
        <line x1="60" y1="25" x2="60" y2="85" stroke="#64748b" strokeWidth="1.5" />
        <line x1="75" y1="20" x2="75" y2="85" stroke="#64748b" strokeWidth="1.5" />
        <line x1="90" y1="28" x2="90" y2="85" stroke="#64748b" strokeWidth="1.5" />
        <polygon points="60,20 57,28 63,28" fill="#cbd5e1" />
        <polygon points="75,15 72,23 78,23" fill="#cbd5e1" />
        <polygon points="90,23 87,31 93,31" fill="#cbd5e1" />
        <text
          x="30"
          y="112"
          fill="#94a3b8"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="1.5"
        >
          NARAYANI SENA (ARMY)
        </text>
        <text
          x="240"
          y="112"
          fill="#38bdf8"
          fontSize="9"
          fontFamily="serif"
          letterSpacing="1.5"
        >
          KRISHNA (CHARIOTEER)
        </text>
      </svg>
    );
  }

  // Chariot Wheel in mud
  return (
    <svg
      viewBox="0 0 400 130"
      className="w-full h-24 sm:h-28 bg-gradient-to-b from-amber-950/50 via-red-950/40 to-neutral-950 overflow-hidden"
    >
      <defs>
        <radialGradient id="mudGlow" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="130" fill="url(#mudGlow)" />
      <path
        d="M0 90 Q100 80 200 95 T400 85 L400 130 L0 130 Z"
        fill="#3e1c14"
        stroke="#78350f"
        strokeWidth="1"
      />
      <g transform="translate(180, 80) rotate(-15)">
        <circle cx="0" cy="0" r="38" fill="none" stroke="#b45309" strokeWidth="5" />
        <circle cx="0" cy="0" r="10" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
        <line x1="0" y1="-38" x2="0" y2="38" stroke="#b45309" strokeWidth="2" />
        <line x1="-38" y1="0" x2="38" y2="0" stroke="#b45309" strokeWidth="2" />
        <line x1="-27" y1="-27" x2="27" y2="27" stroke="#b45309" strokeWidth="2" />
        <line x1="-27" y1="27" x2="27" y2="-27" stroke="#b45309" strokeWidth="2" />
      </g>
      <path
        d="M270 20 Q315 50 270 90"
        stroke="#eab308"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <line x1="270" y1="20" x2="270" y2="90" stroke="#fef08a" strokeWidth="0.8" strokeDasharray="3,2" />
      <line x1="260" y1="55" x2="310" y2="55" stroke="#ef4444" strokeWidth="2" />
      <polygon points="255,55 264,52 264,58" fill="#ef4444" />
      <text
        x="35"
        y="118"
        fill="#d97706"
        fontSize="9"
        fontFamily="serif"
        letterSpacing="1.5"
      >
        THE EMBEDDED CHARIOT WHEEL
      </text>
      <text
        x="270"
        y="118"
        fill="#ef4444"
        fontSize="9"
        fontFamily="serif"
        letterSpacing="1.5"
      >
        THE ANJALIKA ARROW
      </text>
    </svg>
  );
}

export default function DharmaKurukshetraGame() {
  // Game Flow Stage: "opening" (Key Art Title) -> "character_select" (Optional) -> "dilemma_engine" (HUD Core)
  const [gameStage, setGameStage] = useState<"opening" | "character_select" | "dilemma_engine">("opening");
  const [chosenChampion, setChosenChampion] = useState<ChampionProfile | null>(null);

  // Game Metrics State (Default 50/100 each)
  const [dharma, setDharma] = useState<number>(50);
  const [loyalty, setLoyalty] = useState<number>(50);
  const [survival, setSurvival] = useState<number>(50);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [history, setHistory] = useState<DecisionRecord[]>([]);
  const [activeEnding, setActiveEnding] = useState<EndingType | null>(null);

  // Floating Combat Tags State
  const [combatTags, setCombatTags] = useState<CombatTag[]>([]);

  // UI Interactive States
  const [hoveredChoice, setHoveredChoice] = useState<Choice | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isLoreOpen, setIsLoreOpen] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [lastChoiceQuote, setLastChoiceQuote] = useState<string | null>(null);

  // Mahabharata Instrumental Music State & Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [musicVolume, setMusicVolume] = useState<number>(0.65);
  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(false);

  // Audio Engine Instance
  const soundEngine = useRef<AmbientSoundEngine | null>(null);

  useEffect(() => {
    soundEngine.current = new AmbientSoundEngine();
  }, []);

  // Synchronize audio element volume and mute property
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMusicMuted ? 0 : musicVolume;
    }
  }, [musicVolume, isMusicMuted]);

  // Toggle Mahabharata Instrumental Music
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.volume = isMusicMuted ? 0 : musicVolume;
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio playback was blocked or failed:", err);
        });
    }
  };

  const toggleMusicMute = () => {
    if (!audioRef.current) return;
    if (isMusicMuted) {
      setIsMusicMuted(false);
      audioRef.current.volume = musicVolume;
    } else {
      setIsMusicMuted(true);
      audioRef.current.volume = 0;
    }
  };

  const handleMusicVolumeChange = (newVol: number) => {
    setMusicVolume(newVol);
    if (isMusicMuted && newVol > 0) {
      setIsMusicMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = isMusicMuted ? 0 : newVol;
    }
  };

  const handleStartGame = () => {
    soundEngine.current?.playChime(587);
    setGameStage("dilemma_engine");
  };

  const handleSelectChampion = (champion: ChampionProfile) => {
    soundEngine.current?.playChime(660);
    setChosenChampion(champion);
    // Apply starting karmic affinity bonus
    setDharma(Math.max(15, Math.min(85, 50 + champion.startingBonus.dharma)));
    setLoyalty(Math.max(15, Math.min(85, 50 + champion.startingBonus.loyalty)));
    setSurvival(Math.max(15, Math.min(85, 50 + champion.startingBonus.survival)));
    setGameStage("dilemma_engine");
  };

  const returnToTitle = () => {
    soundEngine.current?.playChime(440);
    setGameStage("opening");
  };

  const stepIndex = currentIndex;

  const currentDilemma = useMemo(() => {
    return (
      CINEMATIC_ENGINE_CAMPAIGN[Math.min(currentIndex, CINEMATIC_ENGINE_CAMPAIGN.length - 1)] ||
      CINEMATIC_ENGINE_CAMPAIGN[0]
    );
  }, [currentIndex]);

  const toggleSound = () => {
    toggleMusic();
  };

  // Reset Playthrough
  const resetGame = () => {
    soundEngine.current?.playChime(660);
    setIsTransitioning(true);
    setTimeout(() => {
      setDharma(chosenChampion ? Math.max(15, Math.min(85, 50 + chosenChampion.startingBonus.dharma)) : 50);
      setLoyalty(chosenChampion ? Math.max(15, Math.min(85, 50 + chosenChampion.startingBonus.loyalty)) : 50);
      setSurvival(chosenChampion ? Math.max(15, Math.min(85, 50 + chosenChampion.startingBonus.survival)) : 50);
      setCurrentIndex(0);
      setHistory([]);
      setActiveEnding(null);
      setLastChoiceQuote(null);
      setHoveredChoice(null);
      setCombatTags([]);
      setIsTransitioning(false);
    }, 280);
  };

  // Handle Cinematic Dilemma Choice Confirmation
  const handleChoiceConfirmed = (
    impact: { dharma: number; loyalty: number; survival: number },
    choice?: ChoiceOption,
    choiceIndex?: number
  ) => {
    soundEngine.current?.playChime(impact.dharma >= 0 ? 587 : 440);

    // Trigger MMORPG Floating Combat-Text Tags
    const newTags: CombatTag[] = [
      {
        id: `${Date.now()}-dharma`,
        label: "Dharma",
        delta: impact.dharma,
        type: "dharma",
        xOffset: -120,
      },
      {
        id: `${Date.now()}-loyalty`,
        label: "Loyalty",
        delta: impact.loyalty,
        type: "loyalty",
        xOffset: 0,
      },
      {
        id: `${Date.now()}-survival`,
        label: "Survival",
        delta: impact.survival,
        type: "survival",
        xOffset: 120,
      },
    ];
    setCombatTags(newTags);
    setTimeout(() => setCombatTags([]), 1800);

    const prevStats = { dharma, loyalty, survival };
    const nextDharma = Math.max(0, Math.min(100, dharma + impact.dharma));
    const nextLoyalty = Math.max(0, Math.min(100, loyalty + impact.loyalty));
    const nextSurvival = Math.max(0, Math.min(100, survival + impact.survival));

    if (choice) {
      const newRecord: DecisionRecord = {
        scenarioIndex: currentDilemma.phaseNumber,
        scenarioTitle: currentDilemma.stageTitle,
        character: choice.reactionBeat?.speaker || currentDilemma.cutsceneBeats[0]?.speaker || "Arjuna",
        choiceId: choiceIndex === 1 ? "B" : "A",
        choiceTitle: choice.label,
        flavor: choice.description,
        dharmaDelta: impact.dharma,
        loyaltyDelta: impact.loyalty,
        survivalDelta: impact.survival,
        prevStats,
        newStats: { dharma: nextDharma, loyalty: nextLoyalty, survival: nextSurvival },
      };
      setHistory((prev) => [...prev, newRecord]);
    }

    setDharma(nextDharma);
    setLoyalty(nextLoyalty);
    setSurvival(nextSurvival);

    // Premature failure if any stat hits 0
    if (nextDharma <= 0 || nextLoyalty <= 0 || nextSurvival <= 0) {
      soundEngine.current?.playWarGong();
      setActiveEnding("verdict");
      return;
    }

    // Progression to next node or Final Verdict (10 Steps)
    if (currentIndex + 1 >= CINEMATIC_ENGINE_CAMPAIGN.length) {
      soundEngine.current?.playWarGong();
      setCurrentIndex(CINEMATIC_ENGINE_CAMPAIGN.length);
      setActiveEnding("verdict");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Keyboard Shortcuts (H for History, D for Dossier, M for Audio, R for Restart)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (gameStage !== "dilemma_engine") {
        if (e.key.toLowerCase() === "m") toggleSound();
        if (e.key === "Enter" && gameStage === "opening") handleStartGame();
        return;
      }
      if (activeEnding) {
        if (e.key.toLowerCase() === "r") resetGame();
        return;
      }
      if (e.key.toLowerCase() === "h") {
        setIsHistoryOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === "d") {
        setIsLoreOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === "m") {
        toggleSound();
      } else if (e.key.toLowerCase() === "r") {
        resetGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStage, activeEnding]);

  // Dynamic Mahabharata Title & Archetype Generator
  const verdictArchetype = useMemo(() => {
    if (dharma >= 65 && survival <= 40) {
      return {
        title: "The Righteous Martyr (Dharmatma)",
        sanskrit: "धर्मात्मा सत्यसंधः",
        quote:
          "“Like Karna standing at dusk, your glory transcends mortal breath. You sacrificed physical realm and breath to safeguard cosmic righteousness.”",
        summary:
          "You refused every compromise with adharma. Though the earthly throne slipped from your mortal hands, your unbending sacrifice echoes across the celestial spheres as an immortal beacon.",
        icon: Sun,
        color: "text-amber-400 border-amber-500/50 bg-amber-500/10",
      };
    }
    if (survival >= 65 && dharma <= 40) {
      return {
        title: "The Pragmatic Conqueror (Chanakyan Sovereign)",
        sanskrit: "नीतिनिपुणः विजेता",
        quote:
          "“A dead monarch protects no principles. In the ruthless furnace of Kurukshetra, you recognized that survival is the prerequisite of all future law.”",
        summary:
          "You made the harrowing calculations that soft-hearted kings dread. Your kingdom stands victorious and unyielding, though temple sages will question your methods in whispered debates for centuries.",
        icon: Crown,
        color: "text-emerald-400 border-emerald-500/50 bg-emerald-500/10",
      };
    }
    if (loyalty >= 65) {
      return {
        title: "The Tragic Sworn Soul (Mitra-Bhakta)",
        sanskrit: "मित्रधर्मपरायणः",
        quote:
          "“Kinship and sworn comrades were your only religion. The universe urged you to defect, yet you stood shoulder-to-shoulder with your friend until the pyre.”",
        summary:
          "You proved that the bond of trust between warriors is sacred beyond crowns and thrones. Even your bitterest enemies weep at the immaculate steadfastness of your covenant.",
        icon: Heart,
        color: "text-rose-400 border-rose-500/50 bg-rose-500/10",
      };
    }
    if (dharma >= 45 && loyalty >= 45 && survival >= 45) {
      return {
        title: "The Universal Sovereign (Chakravartin)",
        sanskrit: "सर्वधर्मसमन्वितः चक्रवर्ती",
        quote:
          "“The rarest of rulers. You steered the chariot of statecraft between cosmic righteousness, devotion to kin, and realpolitik without succumbing to ruin.”",
        summary:
          "You navigated the moral labyrinth of Kurukshetra with profound maturity. Neither blinded by naive dogma nor corrupted by cynical cruelty, you have renewed the world's moral order.",
        icon: Award,
        color: "text-amber-300 border-amber-400/60 bg-amber-400/15",
      };
    }
    return {
      title: "The Fallen Renegade (The Battle-Scarred)",
      sanskrit: "कर्मपाशबद्धः एकाकी",
      quote:
        "“Battered by impossible choices, Kurukshetra shaved away your ideals piece by piece until only the cold breath of survival remained.”",
      summary:
        "You lived through the apocalypse of Kurukshetra, but the cost was carved into your soul. You walk away with your breath, bearing witness to the ash of the greatest era.",
      icon: Swords,
      color: "text-neutral-300 border-neutral-600 bg-neutral-900/50",
    };
  }, [dharma, loyalty, survival]);

  // Share Results
  const handleShare = () => {
    const text = `I completed 'Dharma: The Kurukshetra Dilemmas' with the title: "${verdictArchetype.title}"! (Dharma: ${dharma}%, Loyalty: ${loyalty}%, Survival: ${survival}%). Can you balance the scales of Kurukshetra?`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Check consequence ripples from earlier decisions
  const consequenceRipple = useMemo(() => {
    if (currentIndex === 6) {
      // Phase 7: The Human Shield (Shikhandi)
      const elderRecord = history.find((h) => h.scenarioIndex === 2);
      if (elderRecord && elderRecord.choiceId === "A") {
        return "✦ Karmic Ripple: Because you sent blessing-seeking arrows to Bhishma's feet in Juncture 2, his eyes moisten with serene acceptance as you raise the Gandiva behind Shikhandi.";
      }
    }
    if (currentIndex === 8) {
      // Phase 9: The Solar Deception
      const vowRecord = history.find((h) => h.scenarioIndex === 8);
      if (vowRecord && vowRecord.choiceId === "A") {
        return "✦ Karmic Ripple: Your suicidal sunset vow dictates the battlefield; Krishna's Sudarshana Chakra blots out the dying sun.";
      }
    }
    if (currentIndex === 10) {
      // Phase 11: The Stuck Chariot Wheel (Karna)
      const fratricideRecord = history.find((h) => h.scenarioIndex === 10);
      if (fratricideRecord) {
        return "✦ Karmic Ripple: The bitter trauma of your fratricidal vow against Yudhishthira echoes as Karna's hands claw helplessly at the mud.";
      }
    }
    return null;
  }, [currentIndex, history]);

  return (
    <>
      {/* 1. Persistent Audio Element for Mahabharata Instrumental Theme */}
      <audio
        ref={audioRef}
        src="/audio/mahabharata_theme.mp3"
        loop
        preload="auto"
      />

      {/* 2. Global Persistent Top-Right Music Controller Widget (Volume, Play/Pause, Mute) */}
      <MusicController
        isPlaying={isMusicPlaying}
        onTogglePlay={toggleMusic}
        volume={musicVolume}
        onVolumeChange={handleMusicVolumeChange}
        isMuted={isMusicMuted}
        onToggleMute={toggleMusicMute}
      />

      {/* 3. Opening Key Art Landing Screen */}
      {gameStage === "opening" && (
        <>
          <OpeningHero
            onStart={handleStartGame}
            onSelectChampion={() => setGameStage("character_select")}
            isAudioPlaying={isMusicPlaying && !isMusicMuted}
            onToggleAudio={toggleMusic}
          />
          {/* Lore Dossier Modal if opened from Title screen */}
          {isLoreOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-md animate-fade-in">
              <div className="relative w-full max-w-3xl max-h-[88vh] bg-neutral-900 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col overflow-hidden bezel-gold-inner">
                <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                  <div className="flex items-center space-x-2.5">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base sm:text-lg font-serif font-bold text-amber-300">
                      The Epic Lore & Philosophical Dossier
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsLoreOpen(false)}
                    className="p-1.5 rounded-lg border border-neutral-700 hover:border-amber-400 text-neutral-400 hover:text-amber-300 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {LORE_ENTRIES.map((entry, idx) => {
                      const Icon = entry.icon;
                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 hover:border-amber-500/40 transition-all space-y-1.5"
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className={`p-2 rounded-lg border ${entry.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-serif font-bold text-amber-200">
                                {entry.title}
                              </h4>
                              <p className="text-[10px] text-neutral-400">
                                {entry.subtitle}
                              </p>
                            </div>
                          </div>
                          <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                            {entry.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-500/20 flex justify-end">
                  <button
                    onClick={() => setIsLoreOpen(false)}
                    className="px-5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold font-serif transition-all cursor-pointer"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* 4. Character / Champion Select Screen */}
      {gameStage === "character_select" && (
        <CharacterSelect
          onSelect={handleSelectChampion}
          onBack={() => setGameStage("opening")}
        />
      )}

      {/* 5. Core Dilemma Engine HUD */}
      {gameStage === "dilemma_engine" && (
        <GameHudFrame>
      {/* Floating Combat Text Tags (drifting upward) */}
      <FloatingCombatText tags={combatTags} />

      {/* Top App Header & Controls HUD */}
      <header className="relative z-10 w-full flex items-center justify-between py-2 px-3 sm:px-5 pr-24 sm:pr-32 lg:pr-5 rounded-2xl bg-neutral-950/80 border border-amber-500/30 backdrop-blur-md shadow-xl mb-4">
        <div className="flex items-center space-x-3">
          {/* Rotating Sacred Dharma Chakra & Title Screen Return */}
          <button
            onClick={returnToTitle}
            className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-amber-400/60 bg-amber-500/10 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)] hover:border-amber-300 transition-all cursor-pointer"
            title="Return to Opening Title Screen"
          >
            <Compass className="w-5 h-5 animate-chakra" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xs sm:text-sm font-serif font-bold tracking-wider text-amber-300 uppercase drop-shadow">
                Dharma: The Kurukshetra Dilemmas
              </h1>
              {chosenChampion && (
                <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-serif text-amber-300">
                  <img
                    src={chosenChampion.portrait}
                    alt={chosenChampion.name}
                    className="w-3.5 h-3.5 rounded-full object-cover"
                  />
                  <span>Champion: {chosenChampion.name.split(" ")[0]}</span>
                </span>
              )}
            </div>
            <p className="text-[10px] text-neutral-400 hidden sm:block">
              3D RPG Moral Decision Engine • Sacred Crossroads of the Epic
            </p>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center space-x-2">
          {/* Title Screen Button */}
          <button
            onClick={returnToTitle}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border border-neutral-700 hover:border-amber-500/50 bg-neutral-900/90 hover:bg-neutral-800 text-xs font-serif text-neutral-300 hover:text-amber-300 transition-all cursor-pointer"
            title="Return to Main Key Art / Title Screen"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Title</span>
          </button>

          {/* Change Champion Button */}
          <button
            onClick={() => setGameStage("character_select")}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border border-neutral-700 hover:border-amber-500/50 bg-neutral-900/90 hover:bg-neutral-800 text-xs font-serif text-neutral-300 hover:text-amber-300 transition-all cursor-pointer"
            title="Change Champion"
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Champion</span>
          </button>

          {/* History Chronicle Button */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="relative flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-amber-500/40 bg-neutral-900/90 hover:bg-amber-500/20 text-xs font-serif text-amber-300 transition-all cursor-pointer shadow-sm hover:border-amber-400"
            title="View Decision Chronicles (Press H)"
          >
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Chronicles</span>
            {history.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-neutral-950 font-bold text-[10px] flex items-center justify-center ml-0.5">
                {history.length}
              </span>
            )}
          </button>

          {/* Lore Dossier Button */}
          <button
            onClick={() => setIsLoreOpen(true)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-neutral-700 bg-neutral-900/90 hover:bg-neutral-800 text-xs font-serif text-neutral-300 hover:text-amber-300 transition-all cursor-pointer"
            title="Read Epic Lore & Philosophy (Press D)"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400/80" />
            <span className="hidden sm:inline">Dossier</span>
          </button>

          {/* Music Atmosphere Toggle */}
          <button
            onClick={toggleMusic}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border text-xs font-serif transition-all cursor-pointer ${
              isMusicPlaying && !isMusicMuted
                ? "border-amber-400 bg-amber-500/25 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                : "border-neutral-800 bg-neutral-900/90 text-neutral-400 hover:text-neutral-200"
            }`}
            title={isMusicPlaying && !isMusicMuted ? "Pause Mahabharata Music (Press M)" : "Play Mahabharata Music (Press M)"}
          >
            {isMusicPlaying && !isMusicMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Music: ON</span>
                <span className="flex space-x-0.5 ml-1">
                  <span className="w-1 h-2.5 bg-amber-400 rounded-full animate-pulse" />
                  <span className="w-1 h-1.5 bg-amber-400/70 rounded-full animate-pulse delay-75" />
                  <span className="w-1 h-3 bg-amber-400 rounded-full animate-pulse delay-150" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Music: OFF</span>
              </>
            )}
          </button>

          {/* Restart Button */}
          <button
            onClick={resetGame}
            className="p-1.5 rounded-xl border border-neutral-800 hover:border-red-500/50 bg-neutral-900/90 hover:bg-red-500/15 text-neutral-400 hover:text-red-300 text-xs transition-all cursor-pointer"
            title="Restart Dilemmas (Press R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* MMORPG Resource Gauges Bar (Dharma, Loyalty, Survival) with .meter-fill and floating stat indicators */}
      <ResourceGauges
        dharma={dharma}
        loyalty={loyalty}
        survival={survival}
        combatTags={combatTags}
      />

      {/* HUD Progress Display: Act & Juncture (10 steps) */}
      {!(stepIndex >= CINEMATIC_ENGINE_CAMPAIGN.length || dharma <= 0 || loyalty <= 0 || survival <= 0 || activeEnding) && (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 px-5 py-3 mb-3 bg-neutral-950/80 border border-amber-500/30 rounded-2xl backdrop-blur-md shadow-lg">
          <div className="text-xs sm:text-sm font-serif text-amber-400 tracking-wider font-medium">
            {currentDilemma.act} • Juncture {currentDilemma.phaseNumber} of {CINEMATIC_ENGINE_CAMPAIGN.length}
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            {CINEMATIC_ENGINE_CAMPAIGN.map((step, idx) => (
              <div
                key={step.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-6 sm:w-8 bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                    : idx < currentIndex
                    ? "w-2.5 sm:w-3.5 bg-amber-600/70"
                    : "w-2 sm:w-2.5 bg-neutral-800"
                }`}
                title={`${step.act}: Juncture ${step.phaseNumber} - ${step.stageTitle}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Gameplay Core: Active Cinematic Dilemma or Karmic Verdict */}
      {stepIndex >= CINEMATIC_ENGINE_CAMPAIGN.length || dharma <= 0 || loyalty <= 0 || survival <= 0 || activeEnding ? (
        <KarmicVerdict
          stats={{ dharma, loyalty, survival }}
          onRestart={resetGame}
          history={history}
        />
      ) : (
        <CinematicStage
          dilemma={currentDilemma}
          key={currentDilemma.id}
          onChoiceConfirmed={handleChoiceConfirmed}
        />
      )}

      {/* History Chronicle Modal */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-neutral-900 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col overflow-hidden bezel-gold-inner">
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
              <div className="flex items-center space-x-2.5">
                <Scroll className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-serif font-bold text-amber-300">
                  The Chronicle of Past Deeds
                </h3>
              </div>
              <button
                onClick={() => setIsHistoryOpen(false)}
                className="p-1.5 rounded-lg border border-neutral-700 hover:border-amber-400 text-neutral-400 hover:text-amber-300 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
              {history.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 font-serif text-xs sm:text-sm">
                  The parchment is pristine. Make your first decree in Kurukshetra to begin your chronicle.
                </div>
              ) : (
                history.map((record, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold flex items-center justify-center font-mono">
                          {record.scenarioIndex}
                        </span>
                        <span className="text-xs font-serif font-semibold text-amber-300">
                          {record.scenarioTitle}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-serif">
                        {record.character}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-neutral-200">
                      Decree: <span className="text-amber-400 font-serif">{record.choiceTitle}</span>
                    </div>

                    <p className="text-[11px] text-neutral-400 italic">
                      &ldquo;{record.flavor}&rdquo;
                    </p>

                    <div className="flex items-center space-x-2 pt-1 text-[10px] font-mono">
                      <span className={record.dharmaDelta >= 0 ? "text-amber-400" : "text-red-400"}>
                        {record.dharmaDelta >= 0 ? "+" : ""}{record.dharmaDelta} Dharma
                      </span>
                      <span>•</span>
                      <span className={record.loyaltyDelta >= 0 ? "text-rose-400" : "text-red-400"}>
                        {record.loyaltyDelta >= 0 ? "+" : ""}{record.loyaltyDelta} Loyalty
                      </span>
                      <span>•</span>
                      <span className={record.survivalDelta >= 0 ? "text-emerald-400" : "text-red-400"}>
                        {record.survivalDelta >= 0 ? "+" : ""}{record.survivalDelta} Survival
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-amber-500/20 flex justify-end">
              <button
                onClick={() => setIsHistoryOpen(false)}
                className="px-5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold font-serif transition-all cursor-pointer"
              >
                Close Chronicle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lore Dossier Modal */}
      {isLoreOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[88vh] bg-neutral-900 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col overflow-hidden bezel-gold-inner">
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-serif font-bold text-amber-300">
                  The Epic Lore & Philosophical Dossier
                </h3>
              </div>
              <button
                onClick={() => setIsLoreOpen(false)}
                className="p-1.5 rounded-lg border border-neutral-700 hover:border-amber-400 text-neutral-400 hover:text-amber-300 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {LORE_ENTRIES.map((entry, idx) => {
                  const Icon = entry.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 hover:border-amber-500/40 transition-all space-y-1.5"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className={`p-2 rounded-lg border ${entry.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-serif font-bold text-amber-200">
                            {entry.title}
                          </h4>
                          <p className="text-[10px] text-neutral-400">
                            {entry.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                        {entry.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-amber-500/20 flex justify-end">
              <button
                onClick={() => setIsLoreOpen(false)}
                className="px-5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold font-serif transition-all cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* App Footer */}
      <footer className="relative z-10 w-full text-center py-2.5 text-[11px] text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-1 border-t border-neutral-800/80 mt-4">
        <span>
          Inspired by Indian War Epics • 3D RPG Moral Dilemma Engine
        </span>
        <span className="text-neutral-400 font-mono">
          Dharma [1] • Loyalty [2] • Survival
        </span>
      </footer>
    </GameHudFrame>
  )}
</>
  );
}
