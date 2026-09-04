export interface StoryBeat {
  speaker: string;
  avatarKey: "arjuna" | "krishna" | "karna" | "draupadi";
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
  cutsceneBeats: StoryBeat[];
  dilemmaPrompt: string;
  choices: [ChoiceOption, ChoiceOption];
}

export const CINEMATIC_CAMPAIGN: CinematicDilemma[] = [
  // =========================================================================
  // ACT I: THE STANDSTILL (अवस्था - सम्मोहः)
  // =========================================================================
  {
    id: "act1_step1_conch",
    act: "Act I: The Standstill",
    phaseNumber: 1,
    stageTitle: "The Sounding of Devadatta",
    location: "Kurukshetra • The Opening Dawn",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "arjuna",
        text: "The sun breaks over millions of spears. Bhishma stands tall upon his silver car, raising the white conch of the Kurus.",
        actionCue: "flash"
      },
      {
        speaker: "Lord Krishna (At the Reins)",
        avatarKey: "krishna",
        text: "Sound your conch Devadatta, Partha. Let the earth know that justice has finally arrived with an army.",
        actionCue: "none"
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "My hands tremble around the conch shell. Once this breath leaves my lungs, the war cannot be called back.",
        actionCue: "shake"
      }
    ],
    dilemmaPrompt: "Will you blow your divine conch and ignite the bloodbath, or order the chariot into the no-man's land?",
    choices: [
      {
        label: "Sound Devadatta with martial fury",
        description: "Commit the Pandava forces to total engagement without reservation.",
        impact: { dharma: -5, loyalty: +10, survival: +10 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "The roar of your shell splits the heavens. Across the sands, conches bellow in bloodthirsty answer.",
          actionCue: "flash"
        }
      },
      {
        label: "Order Krishna into the dead center",
        description: "Halt the vanguard. Demand to gaze directly into the eyes of your kinsmen.",
        impact: { dharma: +10, loyalty: -5, survival: -10 },
        reactionBeat: {
          speaker: "Lord Krishna",
          avatarKey: "krishna",
          text: "Krishna wheels the four white horses into the open divide between the quiet hosts.",
          actionCue: "none"
        }
      }
    ]
  },
  {
    id: "act1_step2_elders",
    act: "Act I: The Standstill",
    phaseNumber: 2,
    stageTitle: "Gazing Upon the Gurus",
    location: "Kurukshetra • Senayor Ubhayor Madhye",
    cutsceneBeats: [
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "Krishna... Look. It is Grandfather Bhishma, who carried me upon his shoulders. And Acharya Drona, who placed this bow in my hands.",
        actionCue: "shake"
      },
      {
        speaker: "Lord Krishna",
        avatarKey: "krishna",
        text: "They have sold their swords to Hastinapur's court. They stand as barriers to righteousness.",
        actionCue: "none"
      }
    ],
    dilemmaPrompt: "Custom demands you shoot a greeting arrow to touch the feet of your teachers. How do you address them?",
    choices: [
      {
        label: "Shoot blessing-seeking arrows at their feet",
        description: "Uphold ancient sacred decorum and reverence before opening combat.",
        impact: { dharma: +10, loyalty: +10, survival: -5 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "Drona watches the arrow land at his feet and bows his head in silent sorrow.",
          actionCue: "none"
        }
      },
      {
        label: "Refuse the empty chivalry of the duel",
        description: "Declare to Krishna that weapons cannot convey filial reverence.",
        impact: { dharma: +10, loyalty: -15, survival: -10 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "You refuse to shoot. The ritual veil of war tears away, leaving only naked brutality.",
          actionCue: "shake"
        }
      }
    ]
  },
  {
    id: "act1_step3_kula_kshaya",
    act: "Act I: The Standstill",
    phaseNumber: 3,
    stageTitle: "The Spectre of Kula-Kshaya",
    location: "Between the Armies",
    cutsceneBeats: [
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "When a dynasty falls, its sacred laws are extinguished. Lawlessness corrupts the women; lineages mingle, and the ancestors starve.",
        actionCue: "none"
      },
      {
        speaker: "Lord Krishna",
        avatarKey: "krishna",
        text: "You speak words of wisdom, Partha, yet you grieve for what is transient. The soul neither slays nor is slain.",
        actionCue: "none"
      }
    ],
    dilemmaPrompt: "Do you maintain your objection against destroying an entire civilization's lineage for a throne?",
    choices: [
      {
        label: "Plead for ascetic renunciation",
        description: "Choose to live on beggar's crusts in the forest rather than rule stained earth.",
        impact: { dharma: +15, loyalty: -10, survival: -20 },
        reactionBeat: {
          speaker: "Lord Krishna",
          avatarKey: "krishna",
          text: "Krishna laughs softly: 'This cowardice at the eleventh hour does not befit an Aryan prince.'",
          actionCue: "none"
        }
      },
      {
        label: "Accept that corrupt rot must be pruned",
        description: "Yield to the grim reality that peace cannot exist without purging this lineage.",
        impact: { dharma: -10, loyalty: +15, survival: +15 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "You swallow your bile and stare at the royal parasols of your cousins with hardened resolve.",
          actionCue: "none"
        }
      }
    ]
  },
  {
    id: "act1_step4_gandiva_drop",
    act: "Act I: The Standstill",
    phaseNumber: 4,
    stageTitle: "The Dropping of Gandiva",
    location: "Center of the Chariot",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "arjuna",
        text: "A cold sweat breaks across Arjuna's limbs. His fingers lose sensation. The string of the divine Gandiva slips from his grasp.",
        actionCue: "sink"
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "Na Yotsye, Govinda. I will not fight.",
        actionCue: "shake"
      }
    ],
    dilemmaPrompt: "Your bow lies in the dust. The Pandava army watches their chief protector crumble into tears.",
    choices: [
      {
        label: "Surrender entirely and sit on the chariot floor",
        description: "Relinquish command to Bheema and let destiny pass without your sin.",
        impact: { dharma: +10, loyalty: -20, survival: -20 },
        reactionBeat: {
          speaker: "Lord Krishna",
          avatarKey: "krishna",
          text: "Krishna stands atop the chariot seat, casting a shadow across your hunched shoulders.",
          actionCue: "flash"
        }
      },
      {
        label: "Demand Krishna resolve the moral contradiction",
        description: "Ask why an all-knowing deity demands blood sacrifice from his beloved devotees.",
        impact: { dharma: +10, loyalty: +5, survival: 0 },
        reactionBeat: {
          speaker: "Lord Krishna",
          avatarKey: "krishna",
          text: "The charioteer turns, his cosmic smile heralding the unveiling of the eternal Gita.",
          actionCue: "flash"
        }
      }
    ]
  },
  {
    id: "act1_step5_vishwaroopa",
    act: "Act I: The Standstill",
    phaseNumber: 5,
    stageTitle: "The Vision of Time (Kala-Rupa)",
    location: "The Cosmic Chariot",
    cutsceneBeats: [
      {
        speaker: "Lord Krishna",
        avatarKey: "krishna",
        text: "Behold, Partha! Thousand heads, myriad eyes, infinite mouths chewing kings and heroes like insects entering fire!",
        actionCue: "flash"
      },
      {
        speaker: "Lord Krishna",
        avatarKey: "krishna",
        text: "I am Time, destroyer of worlds. These warriors are already dead by my decree. Be merely my instrument: Nimitta-Matra.",
        actionCue: "flash"
      }
    ],
    dilemmaPrompt: "Will you surrender your individual conscience to become an instrument of universal destruction?",
    choices: [
      {
        label: "Surrender your ego: Lift the Gandiva",
        description: "Relinquish personal guilt; become the instrument of Time.",
        impact: { dharma: +10, loyalty: +15, survival: +20 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "You take up the bow with icy calm. The illusion of personal agency has burnt away.",
          actionCue: "none"
        }
      },
      {
        label: "Resist divine instrumentality",
        description: "Refuse to be a puppet of cosmic slaughter; cling to human empathy.",
        impact: { dharma: -15, loyalty: -15, survival: -25 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "You bow before the cosmic form, weeping for the world that must be sacrificed.",
          actionCue: "shake"
        }
      }
    ]
  },

  // =========================================================================
  // ACT II: THE TACTICAL DEFILEMENT (रणकर्म - पातकम्)
  // =========================================================================
  {
    id: "act2_step1_bhishma_stall",
    act: "Act II: The Fight",
    phaseNumber: 6,
    stageTitle: "The Stalemate with Bhishma",
    location: "Kurukshetra • Day 9 Dusk",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "arjuna",
        text: "For nine straight days, Grandfather Bhishma has decimated the Pandava hosts without suffering a scratch.",
        actionCue: "shake"
      },
      {
        speaker: "Yudhishthira",
        avatarKey: "arjuna",
        text: "Arjuna, the river runs thick with our soldiers. If Bhishma fights tomorrow, we have no army left to save.",
        actionCue: "none"
      }
    ],
    dilemmaPrompt: "Yudhishthira demands you release indiscriminate area-of-effect celestial astras into the Kaurava ranks.",
    choices: [
      {
        label: "Deploy celestial astras over Kaurava lines",
        description: "Incinerate enemy ranks to relieve tactical pressure on Pandava lines.",
        impact: { dharma: -15, loyalty: +15, survival: +20 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "Celestial flame scours the earth. Thousands burn, yet Bhishma remains untouched.",
          actionCue: "flash"
        }
      },
      {
        label: "Refuse indiscriminate devastation",
        description: "Honor traditional rules of war; sustain heavy casualties rather than massacre foot levies.",
        impact: { dharma: +15, loyalty: -15, survival: -20 },
        reactionBeat: {
          speaker: "Yudhishthira",
          avatarKey: "arjuna",
          text: "The king buries his face in his palms as wounded soldiers bleed around his tent.",
          actionCue: "none"
        }
      }
    ]
  },
  {
    id: "act2_step2_shikhandi",
    act: "Act II: The Fight",
    phaseNumber: 7,
    stageTitle: "The Human Shield (Shikhandi)",
    location: "Kurukshetra • Day 10",
    cutsceneBeats: [
      {
        speaker: "Lord Krishna",
        avatarKey: "krishna",
        text: "Bhishma took a vow never to strike a warrior born of woman. Place Shikhandi ahead of your chariot.",
        actionCue: "none"
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "Hide behind another warrior to strike my grandfather? Chivalry would brand me a coward forever!",
        actionCue: "shake"
      }
    ],
    dilemmaPrompt: "Bhishma lowers his bow before Shikhandi, smiling at you. Do you fire from behind the shield?",
    choices: [
      {
        label: "Shoot countless shafts from behind Shikhandi",
        description: "Pin the Patriarch to a bed of arrows, securing the turning point of the war.",
        impact: { dharma: -20, loyalty: +10, survival: +25 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "Bhishma falls like an ancient mountain. Not an inch of his skin is unpierced by your arrows.",
          actionCue: "sink"
        }
      },
      {
        label: "Cast aside the shield and duel him openly",
        description: "Face his arrows in open combat and accept the consequences.",
        impact: { dharma: +25, loyalty: -15, survival: -35 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "Bhishma's counter-volley shatters your armor. You are dragged unconscious from the field.",
          actionCue: "blood"
        }
      }
    ]
  },
  {
    id: "act2_step3_abhimanyu_grief",
    act: "Act II: The Fight",
    phaseNumber: 8,
    stageTitle: "The Reckless Sunset Vow",
    location: "Pandava Camp • Day 13 Night",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "arjuna",
        text: "The mangled body of sixteen-year-old Abhimanyu lies in the pavilion, surrounded by weeping queens.",
        actionCue: "none"
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "Six warriors trapped my child! If Jayadratha does not die before sunset tomorrow, I step into the pyre!",
        actionCue: "shake"
      }
    ],
    dilemmaPrompt: "Your rash vow creates tactical chaos. Drona hides Jayadratha behind three defensive rings.",
    choices: [
      {
        label: "Double down on personal vengeance",
        description: "Commit the entire Pandava vanguard to breaking Jayadratha's guard at all costs.",
        impact: { dharma: -10, loyalty: +20, survival: -25 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "The Pandava army charges into a meat grinder, bleeding thousands to satisfy your vow.",
          actionCue: "blood"
        }
      },
      {
        label: "Humbly ask Krishna for strategic guidance",
        description: "Acknowledge that personal sorrow must not imperil the entire cause.",
        impact: { dharma: +10, loyalty: +10, survival: +15 },
        reactionBeat: {
          speaker: "Lord Krishna",
          avatarKey: "krishna",
          text: "Krishna grips your shoulder: 'Prepare your bow, Partha. Nature itself shall bend tomorrow.'",
          actionCue: "none"
        }
      }
    ]
  },
  {
    id: "act2_step4_solar_eclipse",
    act: "Act II: The Fight",
    phaseNumber: 9,
    stageTitle: "The Solar Deception",
    location: "Kurukshetra • Day 14 Dusk",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "arjuna",
        text: "The sun disappears behind black clouds. Jayadratha steps from the Kaurava phalanx, laughing at your impending pyre.",
        actionCue: "flash"
      },
      {
        speaker: "Lord Krishna",
        avatarKey: "krishna",
        text: "The sun has not set! It is my Sudarshana Chakra obscuring the sky! Cut his neck before the illusion clears!",
        actionCue: "flash"
      }
    ],
    dilemmaPrompt: "Will you execute Jayadratha using artificial twilight?",
    choices: [
      {
        label: "Execute Jayadratha under false twilight",
        description: "Take the shot while the enemy celebrates and looks away.",
        impact: { dharma: -15, loyalty: +15, survival: +25 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "Your arrow carries his severed head miles into his father's lap. The deception succeeded.",
          actionCue: "blood"
        }
      },
      {
        label: "Wait for legitimate twilight and burn",
        description: "Honor the ancient chivalric law: never strike a foe who believes the battle is over.",
        impact: { dharma: +30, loyalty: -20, survival: -40 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "You lower the Gandiva. A legend dies by his own word, leaving his brothers to defeat.",
          actionCue: "sink"
        }
      }
    ]
  },
  {
    id: "act2_step5_gandiva_fratricide",
    act: "Act II: The Fight",
    phaseNumber: 10,
    stageTitle: "The Fratricidal Paradox",
    location: "Yudhishthira's Pavilion • Day 17",
    cutsceneBeats: [
      {
        speaker: "Yudhishthira",
        avatarKey: "arjuna",
        text: "Karna routed our lines while you did nothing! Hand that useless Gandiva bow to someone who can wield it!",
        actionCue: "shake"
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "I swore a sacred oath to behead anyone who tells me to surrender my bow! Draw your sword, King!",
        actionCue: "blood"
      }
    ],
    dilemmaPrompt: "Slay your eldest brother and king, or break your holy warrior vow and invite damnation?",
    choices: [
      {
        label: "Execute Krishna's semantic loophole",
        description: "Verbally humiliate Yudhishthira with coarse language ('Tvam'), metaphorically killing him.",
        impact: { dharma: +10, loyalty: -10, survival: +15 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "Yudhishthira weeps at your cruel words, but his blood remains in his veins.",
          actionCue: "none"
        }
      },
      {
        label: "Turn your sword upon your own throat",
        description: "Take your own life to atone for drawing steel against your king and brother.",
        impact: { dharma: +15, loyalty: +10, survival: -25 },
        reactionBeat: {
          speaker: "Lord Krishna",
          avatarKey: "krishna",
          text: "Krishna wrenches the blade from your hand, scorning your dramatic self-righteousness.",
          actionCue: "shake"
        }
      }
    ]
  },

  // =========================================================================
  // ACT III: THE ASH & LOSS OF SELF (अवसानम् - कालाय तस्मै नमः)
  // =========================================================================
  {
    id: "act3_step1_karna_wheel",
    act: "Act III: The Walk",
    phaseNumber: 11,
    stageTitle: "The Stuck Chariot Wheel",
    location: "Kurukshetra • Day 17 Afternoon",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "arjuna",
        text: "The chariot wheel of Karna sinks deep into the blood-soaked mud. He dismounts, straining to lift it.",
        actionCue: "sink"
      },
      {
        speaker: "Karna",
        avatarKey: "karna",
        text: "Wait, Partha! The codes of war forbid striking a warrior dismounted and unarmed in the mud!",
        actionCue: "none"
      },
      {
        speaker: "Lord Krishna",
        avatarKey: "krishna",
        text: "Where was your chivalry when Draupadi was dragged by her hair? Strike him now, Arjuna!",
        actionCue: "flash"
      }
    ],
    dilemmaPrompt: "Karna's hands are slick with axle grease. The crescent-headed Anjalika arrow rests on your string.",
    choices: [
      {
        label: "Release the fatal Anjalika arrow",
        description: "Sever the neck of your greatest rival while he is pinned in the mud.",
        impact: { dharma: -25, loyalty: +20, survival: +30 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "Karna falls. The golden sun sets behind him, taking your martial purity into the shadows.",
          actionCue: "blood"
        }
      },
      {
        label: "Lower your bow and wait for him to mount",
        description: "Refuse to strike an unmounted foe; risk that Karna recalls his divine mantras.",
        impact: { dharma: +30, loyalty: -15, survival: -30 },
        reactionBeat: {
          speaker: "Karna",
          avatarKey: "karna",
          text: "Karna gazes up in disbelief. Krishna clenches the chariot reins in tight disapproval.",
          actionCue: "none"
        }
      }
    ]
  },
  {
    id: "act3_step2_kunti_revelation",
    act: "Act III: The Walk",
    phaseNumber: 12,
    stageTitle: "The Mother's Confession on the Ganga",
    location: "Banks of the Ganga • Post-War Tarpana",
    cutsceneBeats: [
      {
        speaker: "Queen Kunti",
        avatarKey: "draupadi",
        text: "Arjuna... offer the water rites for Karna as well. He was your eldest brother. My firstborn from Surya.",
        actionCue: "none"
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "Brother? The man I mocked as a charioteer's son... the rival I struck down in the mud... was my brother?",
        actionCue: "shake"
      }
    ],
    dilemmaPrompt: "The ashes of your brother slip through your fingers. How do you bear this truth?",
    choices: [
      {
        label: "Curse the silence of mothers",
        description: "Rage against the imperial secrecy that made you murder your own flesh and blood.",
        impact: { dharma: +10, loyalty: -25, survival: -10 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "Your screams join Yudhishthira's as the river washes away the empty victory of Hastinapur.",
          actionCue: "sink"
        }
      },
      {
        label: "Perform the imperial rites in silent agony",
        description: "Internalize the horror and accord your brother the highest state funeral.",
        impact: { dharma: +15, loyalty: +15, survival: +5 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "You pour the river water, your soul hollowed out by the inescapable curse of fratricide.",
          actionCue: "none"
        }
      }
    ]
  },
  {
    id: "act3_step3_dwarka_sinking",
    act: "Act III: The Walk",
    phaseNumber: 13,
    stageTitle: "The Sinking of Dwarka",
    location: "Saurashtra Coast • 36 Years Later",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "arjuna",
        text: "Krishna has departed the earth. The ocean surges inland, swallowing the golden towers of Dwarka.",
        actionCue: "sink"
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "I must lead the sixteen thousand widows and orphans across the hostile desert to safety.",
        actionCue: "none"
      }
    ],
    dilemmaPrompt: "Bandits shadow the refugee column in the scrublands. How will you marshal the retreat?",
    choices: [
      {
        label: "Force a relentless, brutal desert march",
        description: "Prioritize collective survival, abandoning the sick and elderly who slow the march.",
        impact: { dharma: -15, loyalty: -15, survival: +20 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "The convoy moves in panic through scorching sand, weeping for those left behind.",
          actionCue: "none"
        }
      },
      {
        label: "Pace the caravan with compassion",
        description: "Shield the grieving mothers and children, even if it exposes the column to flanking bandits.",
        impact: { dharma: +15, loyalty: +15, survival: -20 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "The convoy moves with dignity, but dust clouds on the horizon signal approaching raiders.",
          actionCue: "shake"
        }
      }
    ]
  },
  {
    id: "act3_step4_impotence_of_gandiva",
    act: "Act III: The Walk",
    phaseNumber: 14,
    stageTitle: "The Attack of the Dasyus",
    location: "The Thorn Forests of Rajasthan",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "arjuna",
        text: "Crude forest bandits armed with wooden clubs attack the caravan, dragging women and looting silver.",
        actionCue: "shake"
      },
      {
        speaker: "Arjuna",
        avatarKey: "arjuna",
        text: "I raise the Gandiva... but the string feels like lead! The celestial mantras... they have vanished from my mind!",
        actionCue: "sink"
      }
    ],
    dilemmaPrompt: "Your arrows fail. Your divine strength is gone. How do you confront common thieves?",
    choices: [
      {
        label: "Swing the divine bow as an ordinary club",
        description: "Brawl in the dirt with common brigands using your bare hands and the bow's wood.",
        impact: { dharma: +10, loyalty: +10, survival: -25 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "The greatest archer of an age is bruised and beaten by illiterate outlaws.",
          actionCue: "blood"
        }
      },
      {
        label: "Drop the bow and accept the verdict of Time",
        description: "Acknowledge that your strength was only a loan from Krishna, now recalled.",
        impact: { dharma: +25, loyalty: -10, survival: -10 },
        reactionBeat: {
          speaker: "Arjuna",
          avatarKey: "arjuna",
          text: "You stand empty-handed, watching the bandits depart. The warrior is dead; only the mortal remains.",
          actionCue: "none"
        }
      }
    ]
  },
  {
    id: "act3_step5_himalayan_walk",
    act: "Act III: The Walk",
    phaseNumber: 15,
    stageTitle: "The Mahaprasthana (The Great Ascent)",
    location: "The Icy Slopes of Mount Meru",
    cutsceneBeats: [
      {
        speaker: "Narrator",
        avatarKey: "arjuna",
        text: "The Pandavas renounce their empire, walking northward into the eternal snows. Your knees give way.",
        actionCue: "sink"
      },
      {
        speaker: "Yudhishthira",
        avatarKey: "arjuna",
        text: "Do not turn back. His fault was pride: he boasted he could consume the enemy in a day, yet lived by deceit.",
        actionCue: "none"
      }
    ],
    dilemmaPrompt: "You lie in the freezing snow. What is your final thought before the white wind claims you?",
    choices: [
      {
        label: "Dissolve your pride into the snow",
        description: "Accept your mortal fallibility and yield your spirit to the cosmic winds.",
        impact: { dharma: +20, loyalty: +10, survival: -50 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "The name Arjuna dissolves into the white peaks. Peace settles over what was once an unyielding storm.",
          actionCue: "flash"
        }
      },
      {
        label: "Cry out that you carried the world's sins",
        description: "Declare to the empty glaciers that you stained your conscience so others could live.",
        impact: { dharma: +10, loyalty: +20, survival: -50 },
        reactionBeat: {
          speaker: "Narrator",
          avatarKey: "arjuna",
          text: "A bitter fire burns in your chest as the cold freezes your final mortal breath.",
          actionCue: "sink"
        }
      }
    ]
  }
];
