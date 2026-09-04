# Dharma: The Kurukshetra Dilemmas (कुरुक्षेत्रस्य धर्मसंकटाः)
> A cinematic 3D RPG Moral Decision Engine built with Next.js, Tailwind CSS, and Web Audio API, inspired by the high-stakes ethical crucibles of the Mahabharata.

---

## 📌 Project Overview
**Dharma: The Kurukshetra Dilemmas** is an interactive mythological RPG experience where players navigate the profound philosophical and martial dilemmas of Kurukshetra. Players balance three core karmic meters:
- **Dharma (धर्मः)**: Cosmic righteousness, truth, and universal order.
- **Loyalty (मित्र-धर्मः)**: Sacred fealty to comrades, kin, and sworn oaths.
- **Survival (राज्यम्)**: Martial endurance, statecraft, and temporal sovereignty.

Falling to 0% in any meter triggers an immediate premature failure ending, while surviving all five dilemmas unlocks one of five dynamic karmic titles and archetypes (e.g., *Chakravartin*, *Dharmatma*, *Chanakyan Sovereign*).

---

## 🚀 Current Project Stage & What Was Done

### 1. Visual Assets & AI Generation
- **Main Key Art (`/public/epic_key_art.png`)**: High-resolution 3D digital illustration key art featuring Lord Krishna at the apex, Pandava warriors, Queen Draupadi, ancient battlefield silhouettes with war elephants, ornate gold arch framing, and a radiant bronze Dharma Wheel (Chakra).
- **Stylized Coin Medallion Portraits (`/public/portraits/`)**:
  - `karna.png`: Golden Kavach chestplate, radiant Kundal earrings, sunburst aura.
  - `arjuna.png`: Focused gaze, silver-gold armor, celestial Gandiva bow, electric aura.
  - `krishna.png`: Lapis-blue skin, peacock feather crown (Mor Mukut), cosmic chakra halo.
  - `draupadi.png`: Fire-born empress, amber royal silks, regal temple jewelry, flame aura.

### 2. Multi-Stage Game Flow Architecture
The application is organized into three distinct stages in `app/page.tsx`:
```
┌─────────────────────────────────────────────────────────────┐
│ 1. <OpeningHero /> (Landing Page & Main Key Art)             │
│    - Fullscreen key art backdrop with dark vignette         │
│    - Centered monumental title logo & rotating Dharma Wheel  │
│    - "START DILEMMAS" & "CHOOSE CHAMPION" buttons            │
│    - 4-Champion Coin preview strip with portrait-bob HUD    │
│    - Global Vedic ambient sound toggle & Lore Dossier       │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌───────────────────────────────┐   ┌─────────────────────────────┐
│ 2. <CharacterSelect />        │   │ 3. Dilemma Engine (HUD)     │
│    - 4 playable champions     │──▶│    - Header HUD with return │
│    - Starting karmic bonuses  │   │    - Dynamic ResourceGauges │
│    - Lore bios & moral vows   │   │    - 5 Ethical Dilemmas     │
└───────────────────────────────┘   │    - Floating Combat Text   │
                                    │    - Premature/Final Endings│
                                    └─────────────────────────────┘
```

### 3. Integrated RPG Animations
- **Page Entrance Animation**: `.animate-page-entrance` triggered via `useEffect` on mount for a smooth slide-up and fade-in of the key art card.
- **Character Portrait Bob**: `.portrait-bob` with `@keyframes bob` (4s smooth vertical float) simulating an alive RPG HUD.
- **Meter Fill Dynamic Animation**: `.meter-fill` with `transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1)` for fluid, weighted resource bar reactions.
- **Floating RPG Combat / Stat Text**: `.animate-combat-text` tags (`+10 Dharma`, `-20 Survival`, etc.) floating upward directly over the affected meters.
- **Dilemma Card Transitions**: `.animate-dilemma-exit` and `.animate-dilemma-enter` to prevent abrupt cuts between decisions.
- **Rotating Dharma Chakra**: `.animate-chakra` (40s continuous rotation) anchored at the center.

### 4. Audio Engine (`AmbientSoundEngine`)
- Synthesized in real-time via the browser's native **Web Audio API** (zero external sound file dependencies).
- Continuous sacred Tanpura drone (*Sa* at 108Hz, *Pa* at 162Hz) with low-pass filtering and slow LFO breathing modulation.
- Dynamic sine/triangle bell chimes on decision clicks and resonant war gongs on dilemma conclusions.

### 5. Dilemma Scenarios Implemented
1. **Karna & Indra**: The Brahmin's Celestial Request (Sacrifice golden armor vs. Preserve military invincibility).
2. **Yudhishthira & Shakuni**: The Gambler's Poisoned Oath (Honor the royal challenge vs. Shatter the rigged dice table).
3. **Karna & Kunti**: Kunti's Sunset Plea on the Ganga (Stand with benefactor Duryodhana vs. Embrace Pandava birthright).
4. **Arjuna & Krishna**: The Sovereign Choice at Dwarka (Choose unarmed Krishna vs. Claim the millions-strong Narayani army).
5. **Arjuna & Karna**: The Unarmed Chariot Wheel (Lower the bow out of warrior chivalry vs. Release the fatal Anjalika arrow).
- **Karmic Ripples**: Past decisions carry consequences into future scenarios (e.g. Karna's armor sacrifice alters his defense in the final battle).

---

## 📁 Project File Structure
```
epicstory/
├── app/
│   ├── components/
│   │   ├── CharacterSelect.tsx      # Champion choice screen with 4 coin heroes
│   │   ├── FloatingCombatText.tsx   # Floating combat/karmic delta tags (+Dharma, -Survival)
│   │   ├── GameAvatars.tsx          # Character busts with coin portraits & SVG fallbacks
│   │   ├── GameHudFrame.tsx         # Ornate HUD framing, backdrop & floating embers
│   │   ├── OpeningHero.tsx          # Cinematic opening page with generated key art
│   │   ├── ResourceGauges.tsx       # Dynamic animated liquid meters (Dharma, Loyalty, Survival)
│   │   └── RpgDialogBox.tsx         # Main dialogue card with choices, avatars, and hotkeys
│   ├── globals.css                  # Custom keyframes (.portrait-bob, .meter-fill, entrance)
│   ├── layout.tsx                   # Next.js root layout
│   └── page.tsx                     # Main game controller & state machine
├── public/
│   ├── epic_key_art.png             # Generated high-resolution key art poster (16:9)
│   └── portraits/
│       ├── arjuna.png               # Arjuna coin medallion portrait
│       ├── draupadi.png             # Draupadi coin medallion portrait
│       ├── karna.png                # Karna coin medallion portrait
│       └── krishna.png              # Krishna coin medallion portrait
├── package.json
└── README.md
```

---

## 🛠 Tech Stack
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, custom CSS keyframe animations
- **Icons**: Lucide React
- **Audio**: Custom Web Audio API Synthesizer (Vedic Tanpura & Chimes)
- **AI Art**: High-end 3D digital illustration generation for key art & medallions

---

## 💡 Ideas / Next Steps to Ask Gemini About
When asking Gemini for future enhancements, consider these prompts:
1. **Save / Progression System**: "How can I persist the player's unlocked endings and chronicles in `localStorage` with an achievement trophy cabinet?"
2. **Expanded Scenarios**: "Help me design 3 additional dilemmas: Bheeshma on the bed of arrows, Ashwatthama's nocturnal raid, and Drona's weapon drop upon hearing of Ashwatthama."
3. **Soundtrack & Voiceovers**: "How can we integrate Web Speech API or custom sound clips for character quotes on choice pick?"
4. **Inventory & Astras System**: "How can we add a divine weapons inventory (Brahmashira, Pashupatastra, Vaishnavastra) that unlocks based on Dharma level?"
5. **Interactive Battlefield Map**: "How to build an interactive canvas or SVG map of the 18 days of Kurukshetra showing troop vyoohas (Chakravyuha, Krauncha Vyuha)?"
