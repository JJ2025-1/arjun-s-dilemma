export interface StoryBeat {
  speaker: string;
  avatarKey: "arjuna" | "krishna" | "karna" | "drona" | "draupadi" | "yudhishthira" | "kunti" | "shikhandi";
  text: string;
  actionCue?: "shake" | "flash" | "sink" | "blood" | "none";
}

export interface ChoiceOption {
  label: string;
  description: string;
  impact: { dharma: number; loyalty: number; survival: number };
  reactionBeat: StoryBeat;
}

export interface CinematicDilemma {
  id: string;
  act: "Act I: The Standstill" | "Act II: The Fight" | "Act III: The Walk";
  phaseNumber: number;
  stageTitle: string;
  location: string;
  sceneBackground: string;
  cutsceneBeats: StoryBeat[];
  dilemmaPrompt: string;
  choices: [ChoiceOption, ChoiceOption];
}

export const CINEMATIC_ENGINE_CAMPAIGN: CinematicDilemma[] = [
  // =========================================================================
  // ACT I: THE STANDSTILL (अवस्था - सम्मोहः)
  // =========================================================================
  {
    id: "juncture_1_first_conch",
    act: "Act I: The Standstill",
    phaseNumber: 1,
    stageTitle: "The First Conch",
    location: "Kurukshetra • The Opening Dawn",
    sceneBackground: "/scenes/chariot_front.jpg",
    cutsceneBeats: [
      {
        speaker: "Krishna",
        avatarKey: "krishna",
        text: "The armies stand poised, Dhananjaya. The white steeds paw the sands of Kurukshetra. Raise your divine conch Devadatta and signal the onset of cosmic war!",
        actionCue: "flash",
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "My limbs quiver, Madhava. In front of me stand fathers, grandfathers, teachers, maternal uncles, and brothers. How can auspiciousness come from slaying one's own kin?",
        actionCue: "shake",
      },
    ],
    dilemmaPrompt: "Do you sound Devadatta to signal total war, or hold the reins and halt the chariot in no-man's land?",
    choices: [
      {
        label: "Sound the Devadatta Conch",
        description: "Signal total war with Devadatta. Uphold your Kshatriya vow to eradicate adharma despite personal agony.",
        impact: { dharma: 15, loyalty: -10, survival: 10 },
        reactionBeat: {
          speaker: "Krishna",
          avatarKey: "krishna",
          text: "Devadatta roars across Kurukshetra, rattling the ranks of the Kauravas and shaking the heavens. The die is cast.",
          actionCue: "flash",
        },
      },
      {
        label: "Halt the Chariot in No-Man's Land",
        description: "Lay the conch aside. Refuse to sound the charge, holding the chariot stationary between the two colossal hosts.",
        impact: { dharma: -10, loyalty: 20, survival: -15 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "I lower the conch. A heavy, suffocating silence descends across the field as millions watch our chariot idle.",
          actionCue: "sink",
        },
      },
    ],
  },
  {
    id: "juncture_2_saluting_preceptors",
    act: "Act I: The Standstill",
    phaseNumber: 2,
    stageTitle: "Saluting the Preceptors",
    location: "Between the Armies • Facing Drona & Bhishma",
    sceneBackground: "/scenes/chariot_pointing.png",
    cutsceneBeats: [
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "How can I strike Bhishma and Drona with arrows in battle, Krishna? They are worthy of my deepest worship. Better to live on alms than slay high-souled gurus.",
        actionCue: "sink",
      },
      {
        speaker: "Drona",
        avatarKey: "drona",
        text: "You were my foremost pupil, Savyasachin. But today I command the imperial vanguard of Hastinapur. Let your bow speak for your lineage!",
        actionCue: "none",
      },
      {
        speaker: "Krishna",
        avatarKey: "krishna",
        text: "A warrior salutes his master with arrows that kiss the dust before their chariot wheels. True reverence on the battlefield is to offer worthy opposition, not sentimental withdrawal.",
        actionCue: "none",
      },
    ],
    dilemmaPrompt: "Do you loose the customary warrior salutation arrows at Drona and Bhishma, or declare a complete moral boycott?",
    choices: [
      {
        label: "Release the Saluting Arrows",
        description: "Draw the Gandiva gently, dropping two arrows at Drona's chariot wheels and one beside his crown in formal salute.",
        impact: { dharma: 10, loyalty: 15, survival: 5 },
        reactionBeat: {
          speaker: "Drona",
          avatarKey: "drona",
          text: "Dronacharya raises his weathered hand in solemn acknowledgment: 'May your arrows fly true, Partha. You do honor to our school.'",
          actionCue: "none",
        },
      },
      {
        label: "Maintain Complete Moral Boycott",
        description: "Refuse even ceremonial fire. Declare that you will not sanctify this fratricide with ritual warrior etiquette.",
        impact: { dharma: -15, loyalty: -10, survival: -20 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "I unstring my bow. The Kaurava commanders jeer at my paralysis, while Drona looks down in profound sorrow.",
          actionCue: "sink",
        },
      },
    ],
  },
  {
    id: "juncture_3_kula_kshaya",
    act: "Act I: The Standstill",
    phaseNumber: 3,
    stageTitle: "Kula-Kshaya (Destruction of the Clan)",
    location: "The Chariot • Heart of the Standstill",
    sceneBackground: "/scenes/chariot_pointing.png",
    cutsceneBeats: [
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "With the destruction of the clan, ancient family traditions perish. When tradition is destroyed, vice overtakes the entire family and social order collapses into chaos!",
        actionCue: "shake",
      },
      {
        speaker: "Draupadi",
        avatarKey: "draupadi",
        text: "Where was this family sanctity when I was dragged disrobed in the assembly of Hastinapur while your elders sat silent? Unchecked adharma rots society far faster than holy war!",
        actionCue: "flash",
      },
      {
        speaker: "Krishna",
        avatarKey: "krishna",
        text: "You speak words of apparent wisdom, Arjuna, yet you mourn for that which is unworthy of grief. Neither the living nor the dead are lamented by the truly wise.",
        actionCue: "none",
      },
    ],
    dilemmaPrompt: "Do you accept the grim necessity of an apocalyptic purge to end tyranny, or advocate ascetic forest renunciation?",
    choices: [
      {
        label: "Accept Necessary Societal Purge",
        description: "Acknowledge that systemic rot must be excised with the blade of war, whatever the civil collateral.",
        impact: { dharma: 20, loyalty: -15, survival: 15 },
        reactionBeat: {
          speaker: "Krishna",
          avatarKey: "krishna",
          text: "Krishna nods firmly: 'He who sees action in inaction, and inaction in action, is enlightened among men.'",
          actionCue: "flash",
        },
      },
      {
        label: "Plead for Ascetic Renunciation",
        description: "Offer to surrender royal claims and retreat into the Himalayas as mendicants, leaving Hastinapur intact.",
        impact: { dharma: -20, loyalty: 25, survival: -25 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "My voice falters as Krishna frowns: 'Whence has this unmanly weakness overcome you at the hour of supreme reckoning?'",
          actionCue: "shake",
        },
      },
    ],
  },
  {
    id: "juncture_4_gita_counsel",
    act: "Act I: The Standstill",
    phaseNumber: 4,
    stageTitle: "The Dropping of Gandiva & Gita Counsel",
    location: "Sacred Chariot • The Divine Discourse",
    sceneBackground: "/scenes/arjuna_blessing.jpg",
    cutsceneBeats: [
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "My skin burns, my mouth is parched, and the Gandiva slips from my trembling fingers! I cannot stand firm, Govinda!",
        actionCue: "sink",
      },
      {
        speaker: "Krishna",
        avatarKey: "krishna",
        text: "You have a right to action alone, never to its fruits! Surrender the illusion of doership. Be mere an instrument—Nimitta-Matra—of cosmic destiny!",
        actionCue: "flash",
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "Teach me, Madhava. I place my hands in reverence. Dispel the darkness blinding my mortal eyes.",
        actionCue: "none",
      },
    ],
    dilemmaPrompt: "Do you surrender your ego as an instrument of cosmic law (Nimitta-Matra), or hold fast to personal empathy?",
    choices: [
      {
        label: "Surrender Ego as an Instrument (Nimitta-Matra)",
        description: "Bow before the radiating Lord and dedicate every deed to cosmic truth without craving fruit or glory.",
        impact: { dharma: 25, loyalty: 10, survival: 10 },
        reactionBeat: {
          speaker: "Krishna",
          avatarKey: "krishna",
          text: "Golden radiance washes away the cold terror from your limbs. You rise with restored clarity, taking up the Gandiva.",
          actionCue: "flash",
        },
      },
      {
        label: "Hold Fast to Mortal Empathy",
        description: "Cling to your human revulsion for bloodshed, prioritizing individual mercy over cosmic mechanics.",
        impact: { dharma: -15, loyalty: 20, survival: -20 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "Tears stream down my cheeks onto the chariot floor. Krishna gazes upon me with deep, infinite sorrow.",
          actionCue: "sink",
        },
      },
    ],
  },
  {
    id: "juncture_5_kala_rupa",
    act: "Act I: The Standstill",
    phaseNumber: 5,
    stageTitle: "The Vision of Time (Kala-Rupa)",
    location: "Cosmic Realm • Vishwaroopa Unveiled",
    sceneBackground: "/scenes/krishna_cosmic.jpg",
    cutsceneBeats: [
      {
        speaker: "Krishna",
        avatarKey: "krishna",
        text: "I am Time, the cosmic destroyer of worlds, arisen to consume these mortals! Even without you, all these warriors shall perish!",
        actionCue: "flash",
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "I behold thousands of blazing faces, suns, and devouring jaws! Bhishma, Drona, and Karna rush helplessly into Your fiery teeth! My soul reels with dread!",
        actionCue: "shake",
      },
    ],
    dilemmaPrompt: "Do you accept cosmic inevitability and wield Gandiva, or resist the horror of universal slaughter?",
    choices: [
      {
        label: "Accept Cosmic Inevitability",
        description: "Prostrate before the devouring Kala-Rupa, accepting that these souls are already slain in the loom of destiny.",
        impact: { dharma: 30, loyalty: -5, survival: 20 },
        reactionBeat: {
          speaker: "Krishna",
          avatarKey: "krishna",
          text: "The terrifying cosmic expanse gently condenses back into the smiling companion at your chariot reins.",
          actionCue: "flash",
        },
      },
      {
        label: "Beg for the Gentle Human Form",
        description: "Avert your eyes and plead with trembling hands for Krishna to withdraw His devouring infinite visage.",
        impact: { dharma: -10, loyalty: 15, survival: -10 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "I fall to my knees. The cosmic majesty recedes, leaving me shaken to the marrow of my mortal bones.",
          actionCue: "sink",
        },
      },
    ],
  },

  // =========================================================================
  // ACT II: THE FIGHT (रणभूमिः - धर्मसंकटम्)
  // =========================================================================
  {
    id: "juncture_6_shikhandi_shield",
    act: "Act II: The Fight",
    phaseNumber: 6,
    stageTitle: "The Human Shield (Shikhandi)",
    location: "Tenth Day of Battle • Bhishma's Vanguard",
    sceneBackground: "/scenes/shikhandi_bow.jpg",
    cutsceneBeats: [
      {
        speaker: "Shikhandi",
        avatarKey: "shikhandi",
        text: "Nine days Bhishma has slaughtered our legions unchecked! Step behind me, Partha! The Grandsire will never loose an arrow against a born woman!",
        actionCue: "none",
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "To hide behind Shikhandi's shoulders and shoot down the pillar of the Kuru dynasty... is this the chivalric Dharmayuddha we swore to uphold?",
        actionCue: "sink",
      },
    ],
    dilemmaPrompt: "Do you loose arrows from behind Shikhandi to break the invincible stalemate, or challenge Bhishma in an open, direct duel?",
    choices: [
      {
        label: "Fire Behind Shikhandi's Back",
        description: "Shelter behind Shikhandi's drawn bow and loose relentless volleys into Bhishma's unresisting chest.",
        impact: { dharma: -10, loyalty: 25, survival: 25 },
        reactionBeat: {
          speaker: "Bhishma",
          avatarKey: "drona",
          text: "Bhishma lowers his bow with calm majesty: 'These arrows piercing my heart belong not to Shikhandi, but to Arjuna alone.'",
          actionCue: "blood",
        },
      },
      {
        label: "Duel Bhishma Directly with Honor",
        description: "Step around Shikhandi into Bhishma's direct line of fire, insisting on an unhindered peer-to-peer duel.",
        impact: { dharma: 25, loyalty: -15, survival: -30 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "Bhishma's celestial volleys shatter my armor. Pandava blood floods the tenth afternoon in agonizing torrents.",
          actionCue: "shake",
        },
      },
    ],
  },
  {
    id: "juncture_7_bed_of_arrows",
    act: "Act II: The Fight",
    phaseNumber: 7,
    stageTitle: "The Bed of Arrows",
    location: "Twilight • The Fall of the Patriarch",
    sceneBackground: "/scenes/bhishma_arrows.avif",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "krishna",
        text: "The Grand Patriarch falls at sunset, suspended above the earth on a bed of countless shafts. Not an inch of his flesh touches the soil.",
        actionCue: "sink",
      },
      {
        speaker: "Bhishma",
        avatarKey: "drona",
        text: "My head hangs unsupported in terrible agony, Dhananjaya. Give your Grandsire a headrest worthy of a Kshatriya king!",
        actionCue: "none",
      },
    ],
    dilemmaPrompt: "Do you shoot three arrows into the earth to support his drooping head, or break composure in public weeping?",
    choices: [
      {
        label: "Shoot Three Arrows as a Warrior Headrest",
        description: "Draw Gandiva and drive three steel shafts into the soil beneath his neck, crafting a heroic headrest.",
        impact: { dharma: 20, loyalty: 20, survival: -5 },
        reactionBeat: {
          speaker: "Bhishma",
          avatarKey: "drona",
          text: "Tears of pride glisten in Bhishma's fading eyes: 'You understand the warrior's soul, child. May victory follow righteousness.'",
          actionCue: "none",
        },
      },
      {
        label: "Break Composure in Public Mourning",
        description: "Drop your weapons before both armies and fall weeping upon his wounded chest.",
        impact: { dharma: -15, loyalty: 10, survival: -20 },
        reactionBeat: {
          speaker: "Bhishma",
          avatarKey: "drona",
          text: "Bhishma whispers sternly: 'A king cannot weep upon the field of duty. Stand tall, Arjuna.'",
          actionCue: "sink",
        },
      },
    ],
  },
  {
    id: "juncture_8_jayadratha_sunset",
    act: "Act II: The Fight",
    phaseNumber: 8,
    stageTitle: "The Sunset Eclipse & Jayadratha",
    location: "Fourteenth Day • The Blood Vow",
    sceneBackground: "/scenes/krishna_chakra.avif",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "krishna",
        text: "Arjuna swore to slay Jayadratha before sunset in retribution for Abhimanyu, or immolate himself on the pyre. The sun sinks behind the western hills.",
        actionCue: "sink",
      },
      {
        speaker: "Krishna",
        avatarKey: "krishna",
        text: "Behold, Partha! I have cast My Sudarshana Chakra across the solar disk! Jayadratha raises his head laughing in relief. Loose your shaft now before the illusion breaks!",
        actionCue: "flash",
      },
    ],
    dilemmaPrompt: "Do you execute Jayadratha under Krishna's simulated twilight, or refuse deceit and step toward the funeral pyre?",
    choices: [
      {
        label: "Slay Jayadratha Under False Twilight",
        description: "Loose the Pasupata shaft while Jayadratha gloats upward, severing his neck before the true sun reappears.",
        impact: { dharma: -10, loyalty: 30, survival: 30 },
        reactionBeat: {
          speaker: "Krishna",
          avatarKey: "krishna",
          text: "The Chakra withdraws. The sun shines once more upon Jayadratha's fallen head. The vow is fulfilled and your life preserved.",
          actionCue: "flash",
        },
      },
      {
        label: "Refuse Deceit & Prepare the Pyre",
        description: "Lower the bow. Refuse an optical illusion, preparing to honor your vow of self-immolation in absolute truth.",
        impact: { dharma: 25, loyalty: -20, survival: -50 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "I unbuckle my quiver. The Pandava ranks collapse into despair as the funeral flames are stoked.",
          actionCue: "shake",
        },
      },
    ],
  },
  {
    id: "juncture_9_yudhishthira_insult",
    act: "Act II: The Fight",
    phaseNumber: 9,
    stageTitle: "The Fratricidal Paradox (Yudhishthira's Insult)",
    location: "Royal Pavilions • Midnight Council",
    sceneBackground: "/scenes/yudhishthira_hall.jpg",
    cutsceneBeats: [
      {
        speaker: "Yudhishthira",
        avatarKey: "yudhishthira",
        text: "You returned without Karna's head! Hand your bow Gandiva to a better warrior, Arjuna, or burn it like firewood!",
        actionCue: "shake",
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "I swore a sacred Kshatriya oath: whoever commands me to surrender Gandiva must die by my sword! Draw your steel, elder brother!",
        actionCue: "blood",
      },
      {
        speaker: "Krishna",
        avatarKey: "krishna",
        text: "Madman! Slaying your dharmic king brings eternal hell! Address him disrespectfully as 'Thou' with searing words—for an elder, loss of honor is equivalent to death!",
        actionCue: "flash",
      },
    ],
    dilemmaPrompt: "Do you execute semantic murder via verbal humiliation to preserve your vow, or turn the blade upon yourself?",
    choices: [
      {
        label: "Semantic Humiliation of the King",
        description: "Sheathe the steel and denounce Yudhishthira with harsh, disrespectful epithets, fulfilling the technical vow.",
        impact: { dharma: 15, loyalty: -25, survival: 20 },
        reactionBeat: {
          speaker: "Yudhishthira",
          avatarKey: "yudhishthira",
          text: "Yudhishthira hangs his crowned head in bitter humiliation. The letter of your oath is kept; both brothers live.",
          actionCue: "none",
        },
      },
      {
        label: "Turn the Blade Upon Yourself",
        description: "Refuse both fratricide and verbal abuse of your king. Prepare to take your own life to expiate the conflict.",
        impact: { dharma: -10, loyalty: 20, survival: -30 },
        reactionBeat: {
          speaker: "Krishna",
          avatarKey: "krishna",
          text: "Krishna knocks the dagger from your grip, berating the foolish ego that values rigid vows over living brotherhood.",
          actionCue: "shake",
        },
      },
    ],
  },

  // =========================================================================
  // ACT III: THE WALK (अन्त्ययात्रा - कर्मफलम्)
  // =========================================================================
  {
    id: "juncture_10_mud_stuck_wheel",
    act: "Act III: The Walk",
    phaseNumber: 10,
    stageTitle: "The Mud-Stuck Wheel (Karna)",
    location: "Seventeenth Day • Churned Mud of Kurukshetra",
    sceneBackground: "/scenes/krishna_turn.webp",
    cutsceneBeats: [
      {
        speaker: "Karna",
        avatarKey: "karna",
        text: "Halt, Arjuna! My chariot wheel is swallowed by the mud under Parashurama's ancient curse! Warrior chivalry forbids striking an opponent dismounted with hands upon the wheel!",
        actionCue: "sink",
      },
      {
        speaker: "Krishna",
        avatarKey: "krishna",
        text: "Shoot him now, Partha! When Draupadi wept disrobed and Abhimanyu was butchered unarmed by seven men, where was his warrior chivalry? Slay adharma before it mounts again!",
        actionCue: "blood",
      },
    ],
    dilemmaPrompt: "Do you release the fatal Anjalika Astra while Karna labors in the mire, or lower your bow and grant him a fair duel?",
    choices: [
      {
        label: "Release the Fatal Anjalika Astra",
        description: "Invoke the incandescent celestial Anjalika arrow. Slay Karna while he is unarmed in the mire.",
        impact: { dharma: -15, loyalty: 25, survival: 35 },
        reactionBeat: {
          speaker: "Karna",
          avatarKey: "karna",
          text: "The celestial arrow strikes true. A brilliant solar light escapes Karna's mortal chest and merges with the setting sun.",
          actionCue: "flash",
        },
      },
      {
        label: "Lower Bow & Grant Fair Duel",
        description: "Lower the Gandiva. Insist that the son of Pandu will defeat Karna standing armed upon his chariot.",
        impact: { dharma: 25, loyalty: -25, survival: -35 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "Karna wrenches his wheel free and invokes the Brahmashira Astra. The battlefield turns into a blazing inferno.",
          actionCue: "shake",
        },
      },
    ],
  },
];
