export interface Choice {
  label: string;
  description: string;
  impact: { dharma: number; loyalty: number; survival: number };
  reflection: string;
}

export interface DilemmaStep {
  id: string;
  act: "Act I: The Standstill" | "Act II: The Fight" | "Act III: The Walk";
  phaseNumber: number;
  stageTitle: string;
  speaker: string;
  avatarKey: "arjuna" | "krishna" | "karna" | "draupadi";
  quote: string;
  context: string;
  prompt: string;
  choices: Choice[];
}

export const ARJUNA_CAMPAIGN: DilemmaStep[] = [
  // ==========================================
  // ACT I: THE STANDSTILL (अवस्था - सम्मोहः)
  // ==========================================
  {
    id: "act1_step1_conch",
    act: "Act I: The Standstill",
    phaseNumber: 1,
    stageTitle: "The Sounding of Devadatta",
    speaker: "Arjuna (Confronting the Vanguard)",
    avatarKey: "arjuna",
    quote: "My limbs quail, my mouth goes dry, my body quivers, and my hair stands on end.",
    context: "Both armies assemble in array. Bhishma sounds his conch like a lion’s roar.",
    prompt: "Krishna urges you to blow your conch, Devadatta, signalling the commencement of war. Once blown, blood must flow.",
    choices: [
      {
        label: "Sound Devadatta with full martial fury",
        description: "Commit entirely to the battle lines; ignite the blood-lust of your soldiers.",
        impact: { dharma: -5, loyalty: +10, survival: +10 },
        reflection: "The roar of your conch rends the skies, yet your stomach curdles at the echoes."
      },
      {
        label: "Hesitate and keep the conch lowered",
        description: "Demand Krishna halt the chariot directly in the middle between both armies (Senayor Ubhayor Madhye).",
        impact: { dharma: +10, loyalty: -5, survival: -10 },
        reflection: "Your troops exchange puzzled glances as their greatest champion stands motionless."
      }
    ]
  },
  {
    id: "act1_step2_elders",
    act: "Act I: The Standstill",
    phaseNumber: 2,
    stageTitle: "Gazing Upon the Gurus",
    speaker: "Arjuna (Before Drona & Bhishma)",
    avatarKey: "arjuna",
    quote: "How can I counter-attack with arrows in battle against Bhishma and Drona, who are worthy of worship?",
    context: "Stationed between armies, you distinctly recognize the white canopy of Bhishma and master Drona.",
    prompt: "Custom demands that before a pupil fights his preceptor, he must shoot a greeting arrow to touch their feet. How do you address your gurus?",
    choices: [
      {
        label: "Send blessing-seeking arrows to their feet",
        description: "Maintain traditional sacred decorum, acknowledging your debt before turning to war.",
        impact: { dharma: +10, loyalty: +10, survival: -5 },
        reflection: "Drona’s eyes moisten with grief across the lines; he silently nods his blessings for your victory."
      },
      {
        label: "Refuse even ritual engagement",
        description: "Declare that weapons cannot convey reverence to those who raised you.",
        impact: { dharma: +10, loyalty: -15, survival: -10 },
        reflection: "You strip away chivalric ceremony, revealing the raw horror of what is to come."
      }
    ]
  },
  {
    id: "act1_step3_kula_kshaya",
    act: "Act I: The Standstill",
    phaseNumber: 3,
    stageTitle: "The Spectre of Kula-Kshaya",
    speaker: "Arjuna (Existential Argument)",
    avatarKey: "arjuna",
    quote: "With the destruction of the dynasty, the eternal family traditions perish.",
    context: "Arjuna details the sociological catastrophe: the death of young men leaves houses devoid of guardians, leading to lawlessness.",
    prompt: "Do you challenge Krishna’s geopolitical objective of establishing an imperial throne on the ashes of an entire generation?",
    choices: [
      {
        label: "Plead for ascetic renunciation (Sannyasa)",
        description: "Argue that wandering the forest begging for crusts is morally superior to ruling stained stones.",
        impact: { dharma: +15, loyalty: -10, survival: -20 },
        reflection: "You choose personal moral purity over political sovereignty."
      },
      {
        label: "Acknowledge the rot must be cauterized",
        description: "Accept that corrupt kings have made societal renewal through peace impossible.",
        impact: { dharma: -10, loyalty: +15, survival: +15 },
        reflection: "You accept that systemic rebirth requires the fiery purge of Kurukshetra."
      }
    ]
  },
  {
    id: "act1_step4_gandiva_drop",
    act: "Act I: The Standstill",
    phaseNumber: 4,
    stageTitle: "The Dropping of the Gandiva",
    speaker: "Arjuna (The Physical Collapse)",
    avatarKey: "arjuna",
    quote: "My bow Gandiva slips from my hand, and my skin burns all over.",
    context: "Overcome by sorrow and bodily paralysis, Arjuna sits down on the bench of the chariot.",
    prompt: "Your weapon rests on the floorboards. The Pandava army watches their chief protector crumple into tears. What do you say to Krishna?",
    choices: [
      {
        label: "Utter 'Na Yotsye' (I will not fight) and surrender",
        description: "Relinquish command to Bheema and let destiny unfold without your active sin.",
        impact: { dharma: +10, loyalty: -20, survival: -20 },
        reflection: "You cast off the identity of the unbeatable archer, exposing yourself as purely human."
      },
      {
        label: "Demand philosophical justification",
        description: "Challenge Krishna to explain why an omnipotent deity permits such blood sacrifice.",
        impact: { dharma: +10, loyalty: +5, survival: 0 },
        reflection: "Krishna smiles faintly, preparing to unveil the cosmic machinery of the Gita."
      }
    ]
  },
  {
    id: "act1_step5_vishwaroopa",
    act: "Act I: The Standstill",
    phaseNumber: 5,
    stageTitle: "The Vision of Time (Kala-Rupa)",
    speaker: "Lord Krishna (The Supreme Form)",
    avatarKey: "krishna",
    quote: "I am Time, the destroyer of all worlds. Even without you, all these warriors shall cease to be.",
    context: "Krishna unveils his all-consuming cosmic form, swallowing warriors and crowns into fiery teeth.",
    prompt: "Krishna reveals that Bhishma, Drona, and Karna are already slain by Time. You are merely called to be an instrument (Nimitta-Matra). Will you lift the bow?",
    choices: [
      {
        label: "Surrender ego: Lift the Gandiva",
        description: "Assume the mantle of the cosmic executioner, relinquishing personal moral pride.",
        impact: { dharma: +10, loyalty: +15, survival: +20 },
        reflection: "You stand up, hands steady, accepting your role in Time's unfolding."
      },
      {
        label: "Resist divine instrumentality",
        description: "Hold onto your individual conscience, refusing to be an unthinking instrument of universal slaughter.",
        impact: { dharma: -15, loyalty: -15, survival: -25 },
        reflection: "You defiantly cling to your mortal empathy, resisting even the cosmic decree."
      }
    ]
  },

  // ==========================================
  // ACT II: THE TACTICAL DEFILEMENT (रणकर्म - पातकम्)
  // ==========================================
  {
    id: "act2_step1_bhishma_stall",
    act: "Act II: The Fight",
    phaseNumber: 6,
    stageTitle: "The Stalemate with Bhishma",
    speaker: "Arjuna (Day 9 of War)",
    avatarKey: "arjuna",
    quote: "Grandfather is destroying ten thousand men an hour. Our brothers will not survive another dusk.",
    context: "Bhishma's arrows darken the sky. Bheema is bleeding, and Yudhishthira contemplates suicide.",
    prompt: "Yudhishthira orders you to unleash divine area-of-effect astras directly into Kaurava ranks, causing catastrophic collateral death.",
    choices: [
      {
        label: "Deploy celestial area-of-effect astras",
        description: "Incinerate enemy ranks to relieve your brother's pressure, ignoring collateral horrors.",
        impact: { dharma: -15, loyalty: +15, survival: +20 },
        reflection: "Screams echo across Kurukshetra as celestial fire scorches horses, soldiers, and grass."
      },
      {
        label: "Refuse indiscriminate devastation",
        description: "Confine your arrows to single targets, sustaining heavy Pandava casualties to preserve chivalric honor.",
        impact: { dharma: +15, loyalty: -15, survival: -20 },
        reflection: "Your chivalry spares innocent levies, but the wounded Pandava ranks bleed profusely."
      }
    ]
  },
  {
    id: "act2_step2_shikhandi",
    act: "Act II: The Fight",
    phaseNumber: 7,
    stageTitle: "The Human Shield (Shikhandi)",
    speaker: "Lord Krishna (Day 10 Morning)",
    avatarKey: "krishna",
    quote: "Place Shikhandi before your chariot. Bhishma will lower his bow; strike him then.",
    context: "The 10th day: Bhishma cannot be slain unless he voluntarily puts down his arms before Shikhandi.",
    prompt: "Shikhandi stands on your chariot. Bhishma lowers his bow with a serene smile. Do you fire your armor-piercing shafts from behind Shikhandi's shoulders?",
    choices: [
      {
        label: "Shoot countless arrows from behind the shield",
        description: "Pierce Bhishma's aged frame until no finger’s width remains unpierced, pinning him to his bed of arrows.",
        impact: { dharma: -20, loyalty: +10, survival: +25 },
        reflection: "Bhishma falls like an ancient tree. The Kauravas scream 'Murderer!', and your heart turns to ice."
      },
      {
        label: "Step out into the open to face him alone",
        description: "Cast aside the shield and risk certain death trying to duel the Patriarch honourably.",
        impact: { dharma: +25, loyalty: -15, survival: -35 },
        reflection: "Bhishma's arrows dismantle your chariot wheel in seconds; your idealism costs dearly."
      }
    ]
  },
  {
    id: "act2_step3_abhimanyu_grief",
    act: "Act II: The Fight",
    phaseNumber: 8,
    stageTitle: "The Reckless Sunset Vow",
    speaker: "Arjuna (Grief of a Father)",
    avatarKey: "arjuna",
    quote: "If Jayadratha does not fall before sunset tomorrow, I shall cast myself into a pyre of fire!",
    context: "Six Maharathis trapped and murdered your 16-year-old son Abhimanyu in the Chakravyuha.",
    prompt: "Blinded by wrath, you pledge suicide by sunset. Drona arrays three defensive rings to hide Jayadratha. Krishna warns you that your rash vow jeopardizes the entire war.",
    choices: [
      {
        label: "Double down on the suicide vow",
        description: "Announce that Pandava victory is meaningless without immediate paternal vengeance.",
        impact: { dharma: -10, loyalty: +20, survival: -25 },
        reflection: "Your grief dictates the grand strategy of the kingdom, driving the army into a frenzy."
      },
      {
        label: "Humbly ask Krishna for strategic guidance",
        description: "Acknowledge that personal grief must not imperil the freedom of your surviving brothers.",
        impact: { dharma: +10, loyalty: +10, survival: +15 },
        reflection: "Krishna smiles knowingly, formulating the solar eclipse deception."
      }
    ]
  },
  {
    id: "act2_step4_solar_eclipse",
    act: "Act II: The Fight",
    phaseNumber: 9,
    stageTitle: "The Solar Deception",
    speaker: "Lord Krishna (Day 14 Dusk)",
    avatarKey: "krishna",
    quote: "The sun has set behind my Sudarshana disc. Jayadratha looks out, laughing. Cut his head now!",
    context: "Twilight descends artificially. Jayadratha steps from hiding to watch Arjuna mount the suicide pyre.",
    prompt: "Krishna commands you: 'The sunset is my illusion! Pick up the Gandiva and shoot his head into his father's lap before the illusion lifts!'",
    choices: [
      {
        label: "Execute Jayadratha under false twilight",
        description: "Capitalize on divine trickery to slaughter an unarmed, celebrating foe.",
        impact: { dharma: -15, loyalty: +15, survival: +25 },
        reflection: "Your arrow carries Jayadratha's head away. You live, but the code of fair twilight warfare is ruined."
      },
      {
        label: "Wait for legitimate twilight and burn",
        description: "Honor the sacred Kshatriya code: never strike a warrior who believes the duel has ended.",
        impact: { dharma: +30, loyalty: -20, survival: -40 },
        reflection: "You lower the bow. A legend dies by his own word, but your brothers are left orphaned."
      }
    ]
  },
  {
    id: "act2_step5_gandiva_fratricide",
    act: "Act II: The Fight",
    phaseNumber: 10,
    stageTitle: "The Fratricidal Paradox",
    speaker: "Yudhishthira (In Agony) & Arjuna",
    avatarKey: "arjuna",
    quote: "Give your Gandiva to someone braver! You are useless!",
    context: "Karna has routed Yudhishthira. In delirious pain, the king insults Arjuna's bow. Arjuna’s secret vow mandates beheading anyone who insults Gandiva.",
    prompt: "You have drawn your sword to sever your elder brother's neck. Break your vow and risk spiritual damnation, or commit fratricide and destroy your cause?",
    choices: [
      {
        label: "Execute Krishna’s semantic loophole",
        description: "Verbally humiliate Yudhishthira using disrespectful singular pronouns ('Tvam'), metaphorically killing him.",
        impact: { dharma: +10, loyalty: -10, survival: +15 },
        reflection: "Yudhishthira weeps at your cruel insults, but his blood remains in his veins. A pragmatic compromise saves the day."
      },
      {
        label: "Attempt to take your own life instead",
        description: "Turn the sword upon yourself to atone for drawing steel against your king and elder brother.",
        impact: { dharma: +15, loyalty: +10, survival: -25 },
        reflection: "Krishna wrenches the blade from your throat, reprimanding your selfish fixation on personal honor."
      }
    ]
  },

  // ==========================================
  // ACT III: THE ASH & LOSS OF SELF (अवसानम् - कालाय तस्मै नमः)
  // ==========================================
  {
    id: "act3_step1_karna_wheel",
    act: "Act III: The Walk",
    phaseNumber: 11,
    stageTitle: "The Stuck Chariot Wheel",
    speaker: "Karna (Desperate in the Mud)",
    avatarKey: "karna",
    quote: "Wait, Arjuna! The earth has swallowed my wheel. Chivalry dictates you do not shoot an unarmed man!",
    context: "Day 17: Karna is on foot trying to lift his chariot wheel. The solar radiance in him flickers.",
    prompt: "Krishna commands you: 'Remember Draupadi's disrobing! Remember Abhimanyu's murder! Where was his chivalry then? Cut down the Radheya now!'",
    choices: [
      {
        label: "Release the Anjalika Astra into his neck",
        description: "Strike down your greatest rival while his hands are covered in grease and mud.",
        impact: { dharma: -25, loyalty: +20, survival: +30 },
        reflection: "The solar warrior falls. The war is won, but your victory will forever carry an asterisk of deceit."
      },
      {
        label: "Lower your bow and wait for him to mount",
        description: "Demand a duel of equals, risking that Karna remembers his celestial mantras and vaporizes you.",
        impact: { dharma: +30, loyalty: -15, survival: -30 },
        reflection: "Karna stares at you with sudden awe; Krishna shakes his head at your fatal nobility."
      }
    ]
  },
  {
    id: "act3_step2_kunti_revelation",
    act: "Act III: The Walk",
    phaseNumber: 12,
    stageTitle: "The Mother's Confession on the Ganga",
    speaker: "Queen Kunti (Weeping at Water's Edge)",
    avatarKey: "draupadi",
    quote: "Offer water for him, Arjuna... Karna was your eldest brother. Born of Surya before my wedding.",
    context: "The war is over. During the funeral tarpana for the millions dead, Kunti reveals the truth of Karna's birth.",
    prompt: "Your entire life's enmity was directed at your own brother. You struck down your mother’s firstborn while his wheel was stuck. How do you respond to Kunti?",
    choices: [
      {
        label: "Curse the silence of mothers",
        description: "Join Yudhishthira in cursing all womankind never to keep a secret, raging at the pointless fratricide.",
        impact: { dharma: +10, loyalty: -25, survival: -10 },
        reflection: "You collapse into the river mud, the ashes of Karna slipping through your trembling fingers."
      },
      {
        label: "Swallow the agony and perform royal rites",
        description: "Accord Karna the highest rites of an imperial crown prince, internalizing your lifelong sin.",
        impact: { dharma: +15, loyalty: +15, survival: +5 },
        reflection: "You offer the sacred water with steady hands, though your inner world has collapsed into ruins."
      }
    ]
  },
  {
    id: "act3_step3_dwarka_sinking",
    act: "Act III: The Walk",
    phaseNumber: 13,
    stageTitle: "The Sinking of Dwarka",
    speaker: "Arjuna (Witnessing the Deluge)",
    avatarKey: "arjuna",
    quote: "The sea swept over the ramparts. The gardens, the golden towers—everything swallowed by the waves.",
    context: "36 years later: The Yadavas have destroyed each other in drunken madness. Krishna has departed the earth. Dwarka sinks.",
    prompt: "You are tasked with guiding sixteen thousand grieving widows and children through barbarian-infested deserts to Indraprastha.",
    choices: [
      {
        label: "Push the caravan through day and night",
        description: "Enforce a brutal march through the sands, leaving old and weak behind to ensure collective survival.",
        impact: { dharma: -15, loyalty: -15, survival: +20 },
        reflection: "You act like an indifferent general, focused only on mission completion."
      },
      {
        label: "Maintain gentle, compassionate pace",
        description: "Risk prolonged vulnerability in the hostile scrublands to accommodate crying children and the elderly.",
        impact: { dharma: +15, loyalty: +15, survival: -20 },
        reflection: "The caravan moves with dignity, but predatory bandits shadow your dust trail from the ridges."
      }
    ]
  },
  {
    id: "act3_step4_impotence_of_gandiva",
    act: "Act III: The Walk",
    phaseNumber: 14,
    stageTitle: "The Attack of the Dasyus (Bandits)",
    speaker: "Arjuna (Before Common Thieves)",
    avatarKey: "arjuna",
    quote: "The string of the Gandiva feels like lead. The mantras... they are gone. I remember nothing.",
    context: "Crude forest robbers armed with clubs attack the convoy. Arjuna stands to defend them.",
    prompt: "You notch an arrow, but the celestial Astra invocations vanish from your mind. Your quivers run out of arrows for the first time in history. How do you fight?",
    choices: [
      {
        label: "Use the Gandiva as an ordinary club",
        description: "Swing the celestial bow like an ordinary wooden stick, wrestling in the dirt with common bandits.",
        impact: { dharma: +10, loyalty: +10, survival: -25 },
        reflection: "The hero of Kurukshetra is bruised, beaten, and mocked by illiterate thieves. Your pride is broken."
      },
      {
        label: "Drop the bow and accept the verdict of Time",
        description: "Realize that the strength was never yours, but a loan from Krishna that has now been called back.",
        impact: { dharma: +25, loyalty: -10, survival: -10 },
        reflection: "You watch the thieves carry away treasures and women you cannot protect. The veil of illusion falls."
      }
    ]
  },
  {
    id: "act3_step5_himalayan_walk",
    act: "Act III: The Walk",
    phaseNumber: 15,
    stageTitle: "The Mahaprasthana (The Great Ascent)",
    speaker: "Arjuna (On the Himalayan Slopes)",
    avatarKey: "arjuna",
    quote: "He who claimed he could burn the world in a single day... fell because of his pride.",
    context: "The Pandavas cast off crowns and robes, walking toward Mount Meru with a lone dog. One by one, they fall.",
    prompt: "Your legs turn numb. You fall into the snow. Yudhishthira does not turn back, stating: 'His fault was pride—he boasted he could destroy the Kauravas in a day, yet relied on deceit.' What is your final thought?",
    choices: [
      {
        label: "Accept the critique and dissolve your ego",
        description: "Acknowledge your human fallibility and yield yourself to the freezing Himalayan winds.",
        impact: { dharma: +20, loyalty: +10, survival: -50 },
        reflection: "The name Arjuna dissolves into the white snow. The warrior is gone; only consciousness remains."
      },
      {
        label: "Cry out that you carried the world's sins",
        description: "Declare to the empty mountains that you stained your soul so that others might have a righteous kingdom.",
        impact: { dharma: +10, loyalty: +20, survival: -50 },
        reflection: "A bitter, tragic defiance warms your chest as the cold claims your final breath."
      }
    ]
  }
];
