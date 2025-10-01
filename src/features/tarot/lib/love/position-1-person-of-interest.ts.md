// This file contains the specific card meanings for Position 1 (The Person You Are Interested In) in the Love Spread.
// The meaning of each card in this position is defined.
// Updated for i18n support.

import { useLoveTranslations } from './i18n-helper';

export interface LovePosition1Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: 'Major Arcana' | 'Cups' | 'Swords' | 'Wands' | 'Pentacles';
}

// i18n supported LovePosition1Meaning interface
export interface I18nLovePosition1Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position1Meanings: LovePosition1Meaning[] = [
  // --- Major Arcana Cards ---
  {
    id: 'the_fool_pos1',
    card: 'The Fool',
    position: 1,
    upright:
      'The person you are interested in is full of childlike curiosity and excitement for life. They have an adventurous spirit open to new beginnings, but this can sometimes make them unplanned and disorganized. They approach relationships with this same free spirit.',
    reversed:
      'The reversed Fool indicates that this person may be reckless, irresponsible, or afraid of starting a relationship. They might be ignoring potential dangers and avoiding commitment.',
    keywords: [
      'new beginnings',
      'innocence',
      'spontaneity',
      'taking risks',
      'free spirit',
    ],
    context:
      'This person is an adventurer who is either ready to open a new page in their love life or is afraid of doing so.',
    group: 'Major Arcana',
  },
  {
    id: 'the_magician_pos1',
    card: 'The Magician',
    position: 1,
    upright:
      'The person you are interested in is charming, talented, and has the power to get what they want. They have strong communication skills and know how to turn events in their favor. They may be consciously creating an attraction towards you.',
    reversed:
      'The reversed Magician suggests this person might be manipulative, deceptive, or not using their potential. Their words and actions may not be consistent, or they might suffer from a lack of self-confidence.',
    keywords: ['willpower', 'creativity', 'skill', 'charm', 'manifestation'],
    context:
      'This person is a creator who sits in the director\'s chair of their life and relationships.',
    group: 'Major Arcana',
  },
  {
    id: 'the_high_priestess_pos1',
    card: 'The High Priestess',
    position: 1,
    upright:
      'This person is mysterious, intuitive, and does not readily show their emotions. Their inner world is rich and may take time to understand. They might be keeping their feelings for you a secret.',
    reversed:
      'The reversed High Priestess shows that this person may be keeping secrets, disconnected from their intuition, or not being sincere with you. They may be struggling to connect with their own inner world or with you.',
    keywords: ['intuition', 'mystery', 'subconscious', 'hidden feelings', 'insight'],
    context:
      'This person is a mysterious soul who lives their emotions not on the surface, but in the depths.',
    group: 'Major Arcana',
  },
  {
    id: 'the_empress_pos1',
    card: 'The Empress',
    position: 1,
    upright:
      'The person you are interested in is nurturing, compassionate, warm, and loves the pleasures of life. They radiate beauty and abundance. They may have a nurturing, maternal, or paternal attitude in relationships.',
    reversed:
      'The reversed Empress suggests this person might be overly possessive, lazy, or neglectful of themselves. They may have blockages in expressing creativity or love.',
    keywords: ['abundance', 'motherhood', 'nature', 'compassion', 'beauty'],
    context: 'This person is a heart full of life, nurturing with love and compassion.',
    group: 'Major Arcana',
  },
  {
    id: 'the_emperor_pos1',
    card: 'The Emperor',
    position: 1,
    upright:
      'This person has a structured, disciplined, protective, and leader-like nature. They seek stability and control in their life. In relationships, they can offer a reliable shoulder and a solid foundation.',
    reversed:
      'The reversed Emperor indicates this person might be overly controlling, rigid, dominant, or have issues with authority. They may have difficulty showing their emotions.',
    keywords: ['authority', 'stability', 'leadership', 'protection', 'discipline'],
    context:
      'This person is a leader who wants to build their life and relationships on solid foundations.',
    group: 'Major Arcana',
  },
  {
    id: 'the_hierophant_pos1',
    card: 'The Hierophant',
    position: 1,
    upright:
      'The person you are interested in is bound by traditions, has high moral values, and values societal rules. They may be seeking seriousness, commitment, and a traditional path in relationships.',
    reversed:
      'The reversed Hierophant shows this person might be rebellious, dogmatic, or narrow-minded, challenging the rules. They may feel societal pressure or be rejecting traditional ways.',
    keywords: [
      'tradition',
      'belief systems',
      'rules',
      'commitment',
      'spirituality',
    ],
    context:
      'This person lives life and love through a specific belief or value system.',
    group: 'Major Arcana',
  },
  {
    id: 'the_lovers_pos1',
    card: 'The Lovers',
    position: 1,
    upright:
      'This person is at an important crossroads regarding relationships and partnerships. They are someone who acts with their heart, is full of love, and is open to forming a deep connection with a partner. They may feel a strong spiritual connection with you.',
    reversed:
      'The reversed Lovers indicates this person is experiencing indecision in relationships, making wrong choices, or is in conflict between their heart and mind. There may be disharmony and communication problems.',
    keywords: ['love', 'choice', 'harmony', 'partnership', 'spiritual connection'],
    context:
      'This person is searching for the path of their heart and is on the verge of a significant relationship decision.',
    group: 'Major Arcana',
  },
  {
    id: 'the_chariot_pos1',
    card: 'The Chariot',
    position: 1,
    upright:
      'The person you are interested in is ambitious, strong-willed, and focused on their goals. They have taken control of their life and are moving forward quickly. If they want a relationship, they will pursue that goal with determination.',
    reversed:
      'The reversed Chariot shows this person has an uncontrolled, aimless, or aggressive energy. They may have lost control of their life or given up in the face of obstacles.',
    keywords: ['willpower', 'victory', 'control', 'ambition', 'action'],
    context:
      'This person is a warrior, determinedly driving the chariot of their life towards their goals.',
    group: 'Major Arcana',
  },
  {
    id: 'strength_pos1',
    card: 'Strength',
    position: 1,
    upright:
      'This person possesses inner strength, courage, and patience. They overcome challenges with compassion and understanding rather than brute force. They are a gentle yet strong character who can control their primal urges.',
    reversed:
      'The reversed Strength indicates this person is insecure, fearful, or governed by their inner impulses. They may be misusing their power or feeling weak.',
    keywords: ['inner strength', 'courage', 'compassion', 'patience', 'control'],
    context:
      'This person is a brave heart who knows that true strength lies in kindness and patience.',
    group: 'Major Arcana',
  },
  {
    id: 'the_hermit_pos1',
    card: 'The Hermit',
    position: 1,
    upright:
      'The person you are interested in has turned inward, is on a spiritual quest, and needs solitude. They may be distant from relationships right now and seeking their own inner guidance.',
    reversed:
      'The reversed Hermit shows this person is forcibly isolating themselves from society, suffers from a fear of loneliness, or refuses to listen to others\' advice. They may be lost in isolation.',
    keywords: [
      'soul-searching',
      'solitude',
      'wisdom',
      'guidance',
      'introspection',
    ],
    context:
      'This person is a wise traveler searching for answers not outside, but within themselves.',
    group: 'Major Arcana',
  },
  {
    id: 'wheel_of_fortune_pos1',
    card: 'The Wheel of Fortune',
    position: 1,
    upright:
      'This person is in a cycle of significant turning points and change in their life. The winds of fate are blowing for them. Sudden and unexpected developments may occur in their love life as well.',
    reversed:
      'The reversed Wheel of Fortune indicates this person is going through an unlucky period, resisting change, or feels they have lost control of their life. Things may be going wrong for them.',
    keywords: ['destiny', 'cycles', 'change', 'luck', 'turning point'],
    context:
      'This person is at a point where the wheel of fate is turning, right in the middle of life\'s ups and downs.',
    group: 'Major Arcana',
  },
  {
    id: 'justice_pos1',
    card: 'Justice',
    position: 1,
    upright:
      'The person you are interested in is fair, honest, logical, and balanced. They seek truth and transparency in their life and relationships. They may be facing the consequences of their past actions.',
    reversed:
      'The reversed Justice shows this person is acting unfairly, evading responsibility, or is prejudiced. There may be an imbalance or injustice in their life.',
    keywords: ['justice', 'balance', 'truth', 'cause and effect', 'decision'],
    context:
      'This person is a soul who believes that life and love must rest on a fair balance.',
    group: 'Major Arcana',
  },
  {
    id: 'the_hanged_man_pos1',
    card: 'The Hanged Man',
    position: 1,
    upright:
      'This person is in a period of pause to gain a different perspective on things. They may be making a sacrifice or waiting on a matter. They prefer to observe rather than act right now.',
    reversed:
      'The reversed Hanged Man shows this person is making sacrifices in vain, is stuck in a situation, or is resisting change. They may be wasting their time and energy.',
    keywords: [
      'different perspective',
      'sacrifice',
      'pause',
      'surrender',
      'waiting',
    ],
    context:
      'This person needs to stop and look at the world with different eyes in order to move forward.',
    group: 'Major Arcana',
  },
  {
    id: 'death_pos1',
    card: 'Death',
    position: 1,
    upright:
      'This person is going through a major transformation and ending process in their life. They are preparing to leave the old behind and make a new beginning. This could be the end of a relationship or a personal change.',
    reversed:
      'The reversed Death indicates this person is resisting change, is stuck in the past, or is delaying a necessary ending. This situation is preventing them from moving forward.',
    keywords: [
      'transformation',
      'endings',
      'new beginnings',
      'change',
      'conclusion',
    ],
    context:
      'This person is a phoenix leaving an old self behind to be reborn from the ashes.',
    group: 'Major Arcana',
  },
  {
    id: 'temperance_pos1',
    card: 'Temperance',
    position: 1,
    upright:
      'This person has found balance, harmony, and moderation in their life. They create a peaceful synthesis by bringing different elements together. They have a patient, calm, and conciliatory attitude in relationships.',
    reversed:
      'The reversed Temperance shows this person is experiencing imbalance, excess, or conflict in their life. They may be acting impatiently and have lost their inner peace.',
    keywords: ['balance', 'harmony', 'moderation', 'patience', 'synthesis'],
    context:
      'This person is an alchemist who creates their own melody of peace by combining the different notes of life.',
    group: 'Major Arcana',
  },
  {
    id: 'the_devil_pos1',
    card: 'The Devil',
    position: 1,
    upright:
      'This person may be tightly bound to materialistic pleasures, addictions, or unhealthy relationship dynamics. Although they have intense passion, this can become restrictive or toxic.',
    reversed:
      'The reversed Devil shows this person is breaking free from an addiction, breaking their chains, or becoming aware of a trap. They are taking an important step towards liberation.',
    keywords: [
      'addiction',
      'restriction',
      'materialism',
      'passion',
      'shadow self',
    ],
    context:
      'This person is either a prisoner in a cage of their own making or trying to escape from it.',
    group: 'Major Arcana',
  },
  {
    id: 'the_tower_pos1',
    card: 'The Tower',
    position: 1,
    upright:
      'This person is experiencing a sudden, shocking, and unexpected destruction in their life. The foundations they believed in are shaking, and they are seeing the truth with a sudden enlightenment. Although this process is painful, it is also liberating.',
    reversed:
      'The reversed Tower indicates this person is avoiding a necessary destruction, trying to prevent a disaster, or the crisis is prolonged because they are resisting change. They are living in fear of destruction.',
    keywords: [
      'sudden destruction',
      'shocking change',
      'enlightenment',
      'liberation',
      'chaos',
    ],
    context:
      'This person is facing the truth as the tower of their life, which they thought was solid, collapses.',
    group: 'Major Arcana',
  },
  {
    id: 'the_star_pos1',
    card: 'The Star',
    position: 1,
    upright:
      'This person is full of hope, inspiration, and faith after a difficult period. They are looking positively to the future and are in a process of spiritual healing. Their heart is open and optimistic towards relationships.',
    reversed:
      'The reversed Star indicates this person has lost hope, is pessimistic, or is disconnected from sources of inspiration. They have lost faith in the future and feel lost.',
    keywords: ['hope', 'faith', 'inspiration', 'healing', 'peace'],
    context:
      'This person is a guiding star of hope, shining after a dark night.',
    group: 'Major Arcana',
  },
  {
    id: 'the_moon_pos1',
    card: 'The Moon',
    position: 1,
    upright:
      'This person is going through a period full of uncertainties, fears, and illusions. Although their intuition is strong, they may have difficulty distinguishing what is real from what is imaginary. They have an emotionally confusing energy.',
    reversed:
      'The reversed Moon shows this person is facing their fears, a deception is being revealed, or the confusion is ending. Secrets are coming to light and clarity is being gained.',
    keywords: [
      'fears',
      'illusions',
      'intuition',
      'uncertainty',
      'subconscious',
    ],
    context:
      'This person is an intuitive but anxious soul trying to find their way in their own inner darkness.',
    group: 'Major Arcana',
  },
  {
    id: 'the_sun_pos1',
    card: 'The Sun',
    position: 1,
    upright:
      'This person is full of joy, vitality, success, and positive energy. They enjoy life, are self-confident, and radiate light to their surroundings. They are open, honest, and warm in relationships.',
    reversed:
      'The reversed Sun indicates this person is experiencing temporary unhappiness, has low energy, or is not showing their full potential. They are having trouble seeing success and joy.',
    keywords: ['joy', 'success', 'vitality', 'optimism', 'clarity'],
    context:
      'This person is a shining sun, radiating warmth and happiness to those around them.',
    group: 'Major Arcana',
  },
  {
    id: 'judgement_pos1',
    card: 'Judgement',
    position: 1,
    upright:
      'This person is in a period of significant reckoning and rebirth in their life. They are evaluating the past, forgiving themselves, and awakening to a higher purpose. A second chance or an important decision may be at hand in relationships.',
    reversed:
      'The reversed Judgement shows this person is judging themselves or others, not learning from past mistakes, or avoiding an important decision. They may be very critical of themselves.',
    keywords: ['reckoning', 'rebirth', 'awakening', 'forgiveness', 'decision'],
    context:
      'This person is hearing a call to face their past and open a new page in their life.',
    group: 'Major Arcana',
  },
  {
    id: 'the_world_pos1',
    card: 'The World',
    position: 1,
    upright:
      'This person has successfully completed a cycle in their life and has achieved wholeness. They are at peace with themselves, fulfilled, and ready to move on to a new stage. They seek a sense of completion and satisfaction in relationships as well.',
    reversed:
      'The reversed World indicates this person has been unable to complete a project or cycle, has not reached their goals, and feels that something is missing. They may be unable to find closure.',
    keywords: ['completion', 'wholeness', 'success', 'fulfillment', 'journey'],
    context:
      'This person has successfully completed an important stage in their life journey and feels on top of the world.',
    group: 'Major Arcana',
  },

  // --- Cups Series ---
  {
    id: 'ace_of_cups_pos1',
    card: 'Ace of Cups',
    position: 1,
    upright:
      'This person is emotionally ready for a new beginning. Their heart is completely open to love, compassion, and a new relationship. They may be starting to have pure and intense feelings for you.',
    reversed:
      'The reversed Ace of Cups shows this person is suppressing their emotions, has closed themselves off to love, or has experienced emotional disappointment. Their heart may be closed for now.',
    keywords: ['new love', 'emotional beginning', 'love', 'compassion', 'intuition'],
    context:
      'This person\'s heart is ready and open for a new love to blossom.',
    group: 'Cups',
  },
  {
    id: 'two_of_cups_pos1',
    card: 'Two of Cups',
    position: 1,
    upright:
      'This person feels a strong mutual attraction and emotional bond with you. They are seeking a partnership, a soulmate connection, or a deep understanding. Equality and harmony in a relationship are very important to them.',
    reversed:
      'The reversed Two of Cups indicates that the bond between you is weak, that there is disharmony or a communication breakdown. There might be a one-sided attraction or a disagreement.',
    keywords: ['mutual attraction', 'partnership', 'love', 'harmony', 'soulmate'],
    context:
      'This person is a partner seeking a spiritual and emotional mirror image with you.',
    group: 'Cups',
  },
  {
    id: 'three_of_cups_pos1',
    card: 'Three of Cups',
    position: 1,
    upright:
      'This person is social, friendly, and loves to celebrate. They may be in an enjoyable period of their life right now. They might want to build a relationship based on friendship and fun.',
    reversed:
      'The reversed Three of Cups shows this person is having problems in their social circle, is involved in gossip, or feels excluded. There could also be a third person interfering in the relationship.',
    keywords: ['celebration', 'friendship', 'community', 'joy', 'sociability'],
    context:
      'This person is a social butterfly who loves to celebrate life and love with friends.',
    group: 'Cups',
  },
  {
    id: 'four_of_cups_pos1',
    card: 'Four of Cups',
    position: 1,
    upright:
      'This person is currently emotionally dissatisfied and withdrawn. They may not be seeing the opportunities in front of them (perhaps you). They are bored with life or relationships and are not interested in anything new.',
    reversed:
      'The reversed Four of Cups indicates this person is coming out of a period of stagnation, is opening themselves up to new opportunities, and is starting to take an interest in life again. Their withdrawal is ending.',
    keywords: [
      'dissatisfaction',
      'apathy',
      'withdrawal',
      'missed opportunities',
      'stagnation',
    ],
    context:
      'This person is someone who dislikes the cups they have and ignores the new one being offered.',
    group: 'Cups',
  },
  {
    id: 'five_of_cups_pos1',
    card: 'Five of Cups',
    position: 1,
    upright:
      'This person is focused on a past loss or disappointment. They feel regret and are having trouble seeing the positive things. They may be emotionally grieving and in a mourning process.',
    reversed:
      'The reversed Five of Cups shows this person is starting to let go of the past, is accepting their losses, and is on the path to forgiveness. There are signs of healing and hope.',
    keywords: ['loss', 'regret', 'grief', 'disappointment', 'mourning'],
    context:
      'This person is someone who cries over spilled milk, not noticing the full cups behind them.',
    group: 'Cups',
  },
  {
    id: 'six_of_cups_pos1',
    card: 'Six of Cups',
    position: 1,
    upright:
      'This person is nostalgic, has an innocent soul, and longs for the past. They could be someone from your past or have childlike, pure feelings for you. They give you a familiar and safe feeling.',
    reversed:
      'The reversed Six of Cups shows this person is stuck in the past, refuses to mature, or is carrying the burden of a past event. They are having trouble looking to the future.',
    keywords: ['nostalgia', 'past', 'innocence', 'childhood memories', 'gift'],
    context: 'This person is an innocent soul whose heart is full of sweet memories of the past.',
    group: 'Cups',
  },
  {
    id: 'seven_of_cups_pos1',
    card: 'Seven of Cups',
    position: 1,
    upright:
      'This person lives in a fantasy world, has many options but has trouble making a decision. Their expectations about love may be unrealistic. They may also have an unclear, dreamy attitude towards you.',
    reversed:
      'The reversed Seven of Cups indicates this person is coming out of their fantasy world to face reality, is narrowing down their options, and is making a clear decision. The confusion is ending.',
    keywords: [
      'dreams',
      'options',
      'confusion',
      'illusion',
      'indecision',
    ],
    context:
      'This person is lost in a cloud of options and dreams, not knowing which cup to choose.',
    group: 'Cups',
  },
  {
    id: 'eight_of_cups_pos1',
    card: 'Eight of Cups',
    position: 1,
    upright:
      'This person has decided to leave behind a situation or relationship that does not emotionally satisfy them. They are setting out on a new path in search of deeper meaning and spirituality. They are currently on a quest.',
    reversed:
      'The reversed Eight of Cups shows this person is torn between leaving a situation and staying, is afraid, or doesn\'t know where to go. They may be questioning, "Am I doing the right thing?"',
    keywords: [
      'abandonment',
      'quest',
      'emotional journey',
      'dissatisfaction',
      'new path',
    ],
    context:
      'This person is a traveler who leaves their full cups behind to set out in search of more.',
    group: 'Cups',
  },
  {
    id: 'nine_of_cups_pos1',
    card: 'Nine of Cups',
    position: 1,
    upright:
      'This person is content with their life, emotionally fulfilled, and self-sufficient. As the "wish card," this person may have many of the positive qualities you are looking for. They are a generous and enjoyable partner in a relationship.',
    reversed:
      'The reversed Nine of Cups suggests this person may be dissatisfied, materialistic, or smug. They may not be aware of the beauty in their life, or their wishes may not be coming true.',
    keywords: [
      'satisfaction',
      'wish fulfillment',
      'emotional contentment',
      'pleasure',
      'generosity',
    ],
    context:
      'This person is a self-sufficient and happy soul who enjoys the blessings life has to offer.',
    group: 'Cups',
  },
  {
    id: 'ten_of_cups_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'This person values family, home, and long-term happiness. They feel emotionally complete and may be seeking such harmony and happiness with you. They have a high potential for starting a family.',
    reversed:
      'The reversed Ten of Cups indicates this person is experiencing problems within their family, there is disharmony, or they have not achieved their dream of happiness. Something is missing in their relationships.',
    keywords: ['happiness', 'family', 'harmony', 'completion', 'emotional fulfillment'],
    context:
      'This person is someone who dreams of or lives in a happy home under the rainbow.',
    group: 'Cups',
  },
  {
    id: 'page_of_cups_pos1',
    card: 'Page of Cups',
    position: 1,
    upright:
      'This person is a dreamy, intuitive, sensitive, and emotional young soul carrying a message. They might confess their love to you or send a flirtatious message. They are not shy about expressing their feelings.',
    reversed:
      'The reversed Page of Cups suggests this person may be emotionally immature, touchy, or escaping from reality. They might experience bad news or a disappointment.',
    keywords: ['emotional message', 'intuition', 'dreamer', 'sensitivity', 'flirtation'],
    context:
      'This person is a sensitive messenger preparing to offer you a message from their heart.',
    group: 'Cups',
  },
  {
    id: 'knight_of_cups_pos1',
    card: 'Knight of Cups',
    position: 1,
    upright:
      'This person is a romantic, idealistic, charming, and artistic soul. They are moved by love and may come to you with a romantic proposal. They represent the "knight in shining armor" archetype.',
    reversed:
      'The reversed Knight of Cups suggests this person may be disappointing, deceptive, pessimistic, or have unrealistic expectations. Their romantic gestures may not be sincere.',
    keywords: ['romance', 'proposal', 'idealism', 'charm', 'artistic soul'],
    context:
      'This person is a romantic knight who offers their love like a cup and follows their heart.',
    group: 'Cups',
  },
  {
    id: 'queen_of_cups_pos1',
    card: 'Queen of Cups',
    position: 1,
    upright:
      'This person is emotionally mature, compassionate, intuitive, and empathetic. Their ability to empathize is highly developed, and they have a deep love for their loved ones. They are a trustworthy and understanding partner.',
    reversed:
      'The reversed Queen of Cups suggests this person may be emotionally unstable, overly sensitive, manipulative, or needy. They may have trouble controlling their emotions.',
    keywords: ['emotional maturity', 'intuition', 'compassion', 'empathy', 'love'],
    context: 'This person is a loving soul who acts with the wisdom of their heart.',
    group: 'Cups',
  },
  {
    id: 'king_of_cups_pos1',
    card: 'King of Cups',
    position: 1,
    upright:
      'This person is a diplomatic, compassionate, and wise leader who can control their emotions. Their emotional intelligence is high, and they can remain calm even in difficult situations. They offer a mature and balanced love.',
    reversed:
      'The reversed King of Cups suggests this person may be emotionally manipulative, cold, distant, or unstable. They may be suppressing or misusing their emotions.',
    keywords: [
      'emotional control',
      'wisdom',
      'compassion',
      'diplomacy',
      'maturity',
    ],
    context:
      'This person is the wise king of the ocean of emotions; a calm and controlled heart.',
    group: 'Cups',
  },

  // --- Swords Series ---
  {
    id: 'ace_of_swords_pos1',
    card: 'Ace of Swords',
    position: 1,
    upright:
      'This person is mentally very clear, intelligent, and realistic. They represent a new idea or truth. They value honesty and open communication in relationships. They may have made a clear decision about you.',
    reversed:
      'The reversed Ace of Swords shows this person is experiencing confusion, making wrong decisions, or is not clear in their thoughts. They may be having trouble communicating.',
    keywords: ['mental clarity', 'truth', 'new idea', 'victory', 'honesty'],
    context:
      'This person is a clear and decisive mind, holding the sharp sword of truth.',
    group: 'Swords',
  },
  {
    id: 'two_of_swords_pos1',
    card: 'Two of Swords',
    position: 1,
    upright:
      'This person is indecisive in the face of a difficult decision and has developed a defense mechanism. They may be avoiding facing the truth and blocking their emotions. They have their guard up against you as well.',
    reversed:
      'The reversed Two of Swords shows this person has overcome a period of indecision, has reached a stalemate, or is struggling because they refuse to see the truth. Confusion and uncertainty prevail.',
    keywords: [
      'indecision',
      'stalemate',
      'defense',
      'denial',
      'escaping from truth',
    ],
    context:
      'This person is blindfolded, caught between their heart and mind, not knowing which way to go.',
    group: 'Swords',
  },
  {
    id: 'three_of_swords_pos1',
    card: 'Three of Swords',
    position: 1,
    upright:
      'This person has recently experienced a heartbreak, faced a painful truth, or gone through a separation. They are currently in mental anguish and are emotionally wounded. They may not be ready for a new relationship.',
    reversed:
      'The reversed Three of Swords shows this person is suppressing their pain, refusing the healing process, or cannot get over a past disappointment. They may be unable to forgive and are prolonging the pain.',
    keywords: [
      'heartbreak',
      'pain',
      'separation',
      'facing the truth',
      'grief',
    ],
    context:
      'This person has a wounded heart, struggling with the painful truths that love can bring.',
    group: 'Swords',
  },
  {
    id: 'four_of_swords_pos1',
    card: 'Four of Swords',
    position: 1,
    upright:
      'This person is mentally exhausted and needs rest. They have taken a break after a stressful period and are trying to recover. They may not have the energy for relationships right now.',
    reversed:
      'The reversed Four of Swords shows this person is either ending their rest period and taking action, or is heading towards burnout by refusing to rest. Stress and fatigue continue.',
    keywords: ['rest', 'break', 'healing', 'meditation', 'calmness'],
    context:
      'This person is a knight who has taken a break from their battles, resting their mind and soul.',
    group: 'Swords',
  },
  {
    id: 'five_of_swords_pos1',
    card: 'Five of Swords',
    position: 1,
    upright:
      'This person is in a conflict or competition. They may try any means to win, but this victory could be a "pyrrhic victory," meaning their losses are greater than their gains. They may have a selfish and ambitious attitude.',
    reversed:
      'The reversed Five of Swords shows this person has realized the futility of a conflict, is trying to reconcile, or regrets a past fight. They may be seeking peace.',
    keywords: ['conflict', 'competition', 'defeat', 'selfishness', 'ambition'],
    context:
      'This person is a confrontational soul who would sacrifice anything to win.',
    group: 'Swords',
  },
  {
    id: 'six_of_swords_pos1',
    card: 'Six of Swords',
    position: 1,
    upright:
      'This person is leaving a difficult period behind and moving towards calmer waters. They are in a transition process and are healing mentally. They have set sail for a new beginning, leaving the past behind.',
    reversed:
      'The reversed Six of Swords shows this person is struggling in a transition, continues to carry the burden of the past, or a journey has been postponed. They are having trouble finding peace.',
    keywords: ['transition', 'journey', 'healing', 'peace', 'letting go of the past'],
    context:
      'This person is a traveler leaving stormy seas for a calm harbor.',
    group: 'Swords',
  },
  {
    id: 'seven_of_swords_pos1',
    card: 'Seven of Swords',
    position: 1,
    upright:
      'This person can be strategic, cunning, and sometimes involved in secretive dealings. They may be evading responsibility, hiding something, or not being honest. They might not be completely open with you.',
    reversed:
      'The reversed Seven of Swords shows that a lie of this person has been exposed, they feel remorse, or they no longer want to engage in secretive dealings. They may decide to be honest.',
    keywords: [
      'deceit',
      'strategy',
      'secrecy',
      'betrayal',
      'evading responsibility',
    ],
    context:
      'This person is a cunning strategist trying to implement their own plan without anyone noticing.',
    group: 'Swords',
  },
  {
    id: 'eight_of_swords_pos1',
    card: 'Eight of Swords',
    position: 1,
    upright:
      'This person feels trapped, restricted, and helpless. However, this situation is often a mental prison of their own making. They are not aware of their own power and may be playing the victim role.',
    reversed:
      'The reversed Eight of Swords shows this person has freed themselves from self-limiting beliefs, has been liberated, and has taken back their own power. They have found a way out of the mental prison.',
    keywords: [
      'restriction',
      'helplessness',
      'victim role',
      'mental prison',
      'fear',
    ],
    context:
      'This person is a prisoner of their own thoughts, not realizing the swords around them aren\'t actually touching them.',
    group: 'Swords',
  },
  {
    id: 'nine_of_swords_pos1',
    card: 'Nine of Swords',
    position: 1,
    upright:
      'This person is in deep anxiety, fear, guilt, or having nightmares. Their mind is tormenting them, and they may be having sleepless nights. They are experiencing intense stress and anxiety.',
    reversed:
      'The reversed Nine of Swords shows this person is facing their worst fears, realizing their anxieties are unfounded, or has come to the end of a crisis. Healing and relief are beginning.',
    keywords: ['anxiety', 'fear', 'nightmares', 'stress', 'guilt'],
    context:
      'This person is an anxious soul, lost in the dark corridors of their mind at night.',
    group: 'Swords',
  },
  {
    id: 'ten_of_swords_pos1',
    card: 'Ten of Swords',
    position: 1,
    upright:
      'This person has experienced a painful end, a betrayal, or a collapse. They are at rock bottom and think everything is over. However, this is also the harbinger of a new beginning, as things cannot get any worse.',
    reversed:
      'The reversed Ten of Swords shows this person has narrowly escaped a disaster, the healing process has begun, or the pains of the past still linger. A complete ending has not occurred.',
    keywords: ['painful end', 'betrayal', 'collapse', 'rock bottom', 'new beginning'],
    context:
      'This person has been stabbed in the back and has hit rock bottom, but is now ready for a rebirth.',
    group: 'Swords',
  },
  {
    id: 'page_of_swords_pos1',
    card: 'Page of Swords',
    position: 1,
    upright:
      'This person is curious, energetic, talkative, and sometimes a bit of a gossip. They are eager to learn new things but can be impatient. They may approach you with a sharp intellect and an inquisitive attitude.',
    reversed:
      'The reversed Page of Swords shows this person can be hurtful with their words, acts defensively, or speaks idly. There can be communication problems and misunderstandings.',
    keywords: ['curiosity', 'communication', 'energy', 'inquiry', 'seeking truth'],
    context:
      'This person is a young and energetic mind, eager to explore ideas and truths with the sword in their hand.',
    group: 'Swords',
  },
  {
    id: 'knight_of_swords_pos1',
    card: 'Knight of Swords',
    position: 1,
    upright:
      'This person is ambitious, focused, a quick thinker, and an even quicker actor. They are locked onto a goal and are moving swiftly to achieve it. Sometimes they can be thoughtless and hasty.',
    reversed:
      'The reversed Knight of Swords suggests this person may be aggressive, reckless, argumentative, or has strayed from their goals. They are using their energy in the wrong direction.',
    keywords: ['ambition', 'speed', 'focus', 'haste', 'determination'],
    context:
      'This person is an idea warrior, advancing towards their goal like a storm, hard to stop.',
    group: 'Swords',
  },
  {
    id: 'queen_of_swords_pos1',
    card: 'Queen of Swords',
    position: 1,
    upright:
      'This person is intelligent, independent, honest, and witty. They act with logic, not emotion. They may have learned from painful experiences. They expect clarity and honesty in relationships.',
    reversed:
      'The reversed Queen of Swords suggests this person can be overly critical, cold, vindictive, or cruel. They may use their intelligence to hurt others.',
    keywords: ['intelligence', 'independence', 'honesty', 'clarity', 'logic'],
    context:
      'This person is an independent soul with a sharp intellect that helps you see the truth.',
    group: 'Swords',
  },
  {
    id: 'king_of_swords_pos1',
    card: 'King of Swords',
    position: 1,
    upright:
      'This person is an intellectual, authoritative, fair, and analytical leader. They make decisions based on facts and logic. They may be emotionally distant but are a fair and honest partner.',
    reversed:
      'The reversed King of Swords suggests this person may be judgmental, manipulative, emotionless, or abusive of their power. They may engage in intellectual bullying.',
    keywords: [
      'intellectual authority',
      'justice',
      'logic',
      'analytical thought',
      'honesty',
    ],
    context:
      'This person is a wise and impartial mind, ruling in the kingdom of reason and justice.',
    group: 'Swords',
  },

  // --- Wands Series ---
  {
    id: 'ace_of_wands_pos1',
    card: 'Ace of Wands',
    position: 1,
    upright:
      'This person is on the verge of a new beginning full of energy, inspiration, and passion. Their creative potential is high, and they are ready to take action. They may feel an intense physical attraction and excitement towards you.',
    reversed:
      'The reversed Ace of Wands shows this person is having trouble starting something, has lost their inspiration, or has low energy. They may have encountered a delay or an obstacle.',
    keywords: ['new beginning', 'inspiration', 'passion', 'creativity', 'energy'],
    context:
      'This person carries a spark of creativity and passion within them, ready to ignite.',
    group: 'Wands',
  },
  {
    id: 'two_of_wands_pos1',
    card: 'Two of Wands',
    position: 1,
    upright:
      'This person is making plans for their future, weighing their potential, and is ready to explore the world. They want more than their current situation. They may also be planning the next step in the relationship.',
    reversed:
      'The reversed Two of Wands shows this person has a fear of the future, avoids making plans, or underestimates their potential. They may be afraid to take risks.',
    keywords: ['planning', 'future', 'potential', 'decision', 'exploration'],
    context:
      'This person is a visionary, planning their next move with the world in their hands.',
    group: 'Wands',
  },
  {
    id: 'three_of_wands_pos1',
    card: 'Three of Wands',
    position: 1,
    upright:
      'This person has started to see the first fruits of their plans and is looking to the future with hope. Their horizons are broad, and they have long-term goals. They are optimistic and expectant about the future of the relationship.',
    reversed:
      'The reversed Three of Wands shows this person is facing delays or obstacles in their plans, is unable to move forward, or is experiencing disappointment. There may be impatience and a lack of foresight.',
    keywords: ['expectation', 'progress', 'expansion', 'foresight', 'opportunity'],
    context:
      'This person is an explorer, looking hopefully to the future, waiting for their ships to return to port.',
    group: 'Wands',
  },
  {
    id: 'four_of_wands_pos1',
    card: 'Four of Wands',
    position: 1,
    upright:
      'This person is celebrating a success or an important event. There is stability, harmony, and happiness in their life. They may be seeking a celebration, engagement, marriage, or just a happy union with you.',
    reversed:
      'The reversed Four of Wands shows this person is experiencing disharmony or instability in their home or family life, or a celebration has been postponed. The foundations may not be solid.',
    keywords: ['celebration', 'stability', 'happiness', 'marriage', 'harmony'],
    context:
      'This person is a stable and joyful soul, celebrating the happy moments of life.',
    group: 'Wands',
  },
  {
    id: 'five_of_wands_pos1',
    card: 'Five of Wands',
    position: 1,
    upright:
      'This person is in a competition, conflict, or disagreement. Different ideas are clashing, and there may be an ego battle. They might reflect this competitive and chaotic energy onto the relationship.',
    reversed:
      'The reversed Five of Wands shows this person realizes the futility of a conflict, is trying to compromise, or regrets a past fight. They may be in search of peace.',
    keywords: ['competition', 'conflict', 'disagreement', 'ego', 'chaos'],
    context:
      'This person is in the middle of a battlefield where ideas and egos collide.',
    group: 'Wands',
  },
  {
    id: 'six_of_wands_pos1',
    card: 'Six of Wands',
    position: 1,
    upright:
      'This person has achieved a success, received recognition, and is enjoying their victory. Their self-confidence is high, and they are supported by those around them. They may see you as a part of their victory.',
    reversed:
      'The reversed Six of Wands shows this person has experienced a defeat, has not received recognition, or has lost their self-confidence. Their success may be temporary or false.',
    keywords: ['victory', 'success', 'recognition', 'self-confidence', 'support'],
    context:
      'This person is a hero who has won their struggle and is celebrating their victory in public.',
    group: 'Wands',
  },
  {
    id: 'seven_of_wands_pos1',
    card: 'Seven of Wands',
    position: 1,
    upright:
      'This person is bravely defending something they believe in or their position. They may be fighting against challenges and competition alone. In a relationship, they are also trying to protect their own space and boundaries.',
    reversed:
      'The reversed Seven of Wands shows this person has given up the fight, accepted defeat, or feels overwhelmed. Their defense may have been broken.',
    keywords: ['defense', 'courage', 'struggle', 'challenge', 'belief'],
    context:
      'This person is a warrior, alone on a hilltop, fighting against those below for what they believe in.',
    group: 'Wands',
  },
  {
    id: 'eight_of_wands_pos1',
    card: 'Eight of Wands',
    position: 1,
    upright:
      'This person is experiencing rapid developments, sudden news, or a journey in their life. Events are moving quickly. There might be swift communication with you or the relationship may progress rapidly.',
    reversed:
      'The reversed Eight of Wands shows there are delays, obstacles, or misunderstandings in this person\'s life. The pace has slowed, and there may be a pause.',
    keywords: [
      'rapid developments',
      'news',
      'action',
      'communication',
      'travel',
    ],
    context:
      'This person has an energy full of action and communication, like arrows flying swiftly towards their target.',
    group: 'Wands',
  },
  {
    id: 'nine_of_wands_pos1',
    card: 'Nine of Wands',
    position: 1,
    upright:
      'This person is resilient, wounded from past battles but still standing. They are ready for one last fight and are not letting their guard down. They may be cautious and defensive towards relationships.',
    reversed:
      'The reversed Nine of Wands shows this person no longer has the strength to fight, has given up, or is exhausting themselves by stubbornly staying on the defensive. They may be paranoid.',
    keywords: ['resilience', 'defense', 'fatigue', 'stubbornness', 'caution'],
    context:
      'This person is a tired warrior, wounded but not defeated, preparing for one last battle.',
    group: 'Wands',
  },
  {
    id: 'ten_of_wands_pos1',
    card: 'Ten of Wands',
    position: 1,
    upright:
      'This person is burdened by too many responsibilities and is overwhelmed. They are working very hard and may be trying to do everything on their own. They may not have the time or energy to devote to a relationship.',
    reversed:
      'The reversed Ten of Wands shows this person is letting go of their burdens, sharing responsibilities, or no longer wants to carry such a heavy load. There is a sense of relief.',
    keywords: ['burden', 'responsibility', 'pressure', 'burnout', 'hard work'],
    context:
      'This person is carrying a load too heavy to bear alone, trying to reach their destination.',
    group: 'Wands',
  },
  {
    id: 'page_of_wands_pos1',
    card: 'Page of Wands',
    position: 1,
    upright:
      'This person is an adventurous, enthusiastic, energetic young soul open to new ideas. They love to explore and try new things. They may bring you an exciting message or an adventure proposal.',
    reversed:
      'The reversed Page of Wands shows this person is aimless, indecisive, or unable to make a start. They may bring bad news or disappointment.',
    keywords: ['adventure', 'enthusiasm', 'energy', 'new ideas', 'exploration'],
    context:
      'This person is an energetic and enthusiastic messenger, ready to explore the world with the wand in their hand.',
    group: 'Wands',
  },
  {
    id: 'knight_of_wands_pos1',
    card: 'Knight of Wands',
    position: 1,
    upright:
      'This person is passionate, energetic, adventurous, and charismatic. They are not afraid to take action and risks. However, they can sometimes be hasty and impatient. They might enter and exit your life suddenly.',
    reversed:
      'The reversed Knight of Wands shows this person is reckless, rude, impatient, or unable to commit to one place. Their energy may be scattered and aimless.',
    keywords: ['passion', 'adventure', 'energy', 'haste', 'charisma'],
    context:
      'This person is a passionate and unstoppable adventurer, riding their horse at a gallop.',
    group: 'Wands',
  },
  {
    id: 'queen_of_wands_pos1',
    card: 'Queen of Wands',
    position: 1,
    upright:
      'This person is confident, popular, energetic, warm, and creative. They are social and love to be the center of attention. In a relationship, they are a passionate, fun, and inspiring partner.',
    reversed:
      'The reversed Queen of Wands suggests this person may be jealous, demanding, aggressive, or insecure. They may abuse their popularity.',
    keywords: ['self-confidence', 'creativity', 'popularity', 'passion', 'energy'],
    context:
      'This person is a queen who shines on the stage of life, radiating energy and inspiration to those around her.',
    group: 'Wands',
  },
  {
    id: 'king_of_wands_pos1',
    card: 'King of Wands',
    position: 1,
    upright:
      'This person is a natural leader, visionary, charismatic, and inspiring. They think big and attract followers. In a relationship, they are a courageous, protective, and passionate partner.',
    reversed:
      'The reversed King of Wands suggests this person may be a tyrannical, egotistical, impatient, or ruthless leader. They may go to extremes with their vision or not keep their promises.',
    keywords: ['leadership', 'vision', 'charisma', 'inspiration', 'passion'],
    context:
      'This person is a leader who has built their own kingdom and inspires people with their vision.',
    group: 'Wands',
  },

  // --- Pentacles Series ---
  {
    id: 'ace_of_pentacles_pos1',
    card: 'Ace of Pentacles',
    position: 1,
    upright:
      'This person is facing an opportunity for a new and tangible beginning in their life. This could be a new job, an investment, or a relationship with a solid foundation. They can offer you a stable and reliable start.',
    reversed:
      'The reversed Ace of Pentacles shows this person has made a bad investment, missed an opportunity, or is struggling financially. It is not a good time for beginnings.',
    keywords: ['new opportunity', 'tangible beginning', 'prosperity', 'stability', 'trust'],
    context:
      'This person is on the verge of a tangible gift or opportunity from the universe.',
    group: 'Pentacles',
  },
  {
    id: 'two_of_pentacles_pos1',
    card: 'Two of Pentacles',
    position: 1,
    upright:
      'This person is trying to balance multiple things (work, money, relationships) in their life at the same time. They are busy, flexible, and adaptable. However, this can sometimes lead to indecision.',
    reversed:
      'The reversed Two of Pentacles shows this person has lost their balance, is overwhelmed by too many responsibilities, or is struggling financially. They are having trouble setting priorities.',
    keywords: ['balance', 'multitasking', 'flexibility', 'busyness', 'adaptability'],
    context:
      'This person is a juggler in the ups and downs of life, trying to find balance.',
    group: 'Pentacles',
  },
  {
    id: 'three_of_pentacles_pos1',
    card: 'Three of Pentacles',
    position: 1,
    upright:
      'This person is a diligent individual who showcases their skills in teamwork or a project. They value quality work and learning. They may see a relationship as teamwork and want to build something together.',
    reversed:
      'The reversed Three of Pentacles shows this person is experiencing disharmony within a team, is unable to showcase their skills, or is producing low-quality work. They may be closed off to collaboration.',
    keywords: ['teamwork', 'skill', 'planning', 'quality', 'collaboration'],
    context:
      'This person is a master craftsman creating a valuable piece of work by collaborating with others.',
    group: 'Pentacles',
  },
  {
    id: 'four_of_pentacles_pos1',
    card: 'Four of Pentacles',
    position: 1,
    upright:
      'This person places excessive importance on financial security, control, and savings. They hold on tightly to what they have (money, property, even relationships). They may be closed off to change and generosity.',
    reversed:
      'The reversed Four of Pentacles shows this person is either finally starting to be generous or is becoming even more miserly out of fear of loss. They may be losing control.',
    keywords: [
      'stinginess',
      'control',
      'search for security',
      'possessiveness',
      'conservatism',
    ],
    context:
      'This person is a closed heart, clinging tightly to their possessions for fear of losing them.',
    group: 'Pentacles',
  },
  {
    id: 'five_of_pentacles_pos1',
    card: 'Five of Pentacles',
    position: 1,
    upright:
      'This person is experiencing financial hardship, exclusion, or health problems. They feel alone and in need of help. They may not be seeing the opportunity for help nearby (perhaps you).',
    reversed:
      'The reversed Five of Pentacles shows this person is coming to the end of a difficult financial period, is emerging from a crisis, or is starting to accept help. There is healing and recovery.',
    keywords: [
      'financial loss',
      'poverty',
      'exclusion',
      'health issues',
      'loneliness',
    ],
    context:
      'This person is someone in a difficult situation, left out in the cold, not seeing the warm light of the church.',
    group: 'Pentacles',
  },
  {
    id: 'six_of_pentacles_pos1',
    card: 'Six of Pentacles',
    position: 1,
    upright:
      'This person is generous, helpful, and financially balanced. They know how to both give and receive. In a relationship, they can be a giving and supportive partner, or they may be the one in need of help right now.',
    reversed:
      'The reversed Six of Pentacles shows this person is either in debt or is abusing their generosity, giving with expectations. There is a power imbalance.',
    keywords: ['generosity', 'helpfulness', 'balance', 'give and take', 'support'],
    context:
      'This person is a fair and generous soul, sharing what they have with those in need.',
    group: 'Pentacles',
  },
  {
    id: 'seven_of_pentacles_pos1',
    card: 'Seven of Pentacles',
    position: 1,
    upright:
      'This person is evaluating the results of a long-term effort. They are waiting for the rewards of their labor and are in a patient period. They are reviewing the progress of the relationship and deciding whether to invest in the future.',
    reversed:
      'The reversed Seven of Pentacles shows this person\'s efforts have been in vain, they have been impatient, or they have invested in the wrong thing. They are not getting the returns on their labor.',
    keywords: ['evaluation', 'patience', 'investment', 'labor', 'waiting'],
    context:
      'This person is a farmer, patiently waiting for the seeds they planted to grow, weighing their labor.',
    group: 'Pentacles',
  },
  {
    id: 'eight_of_pentacles_pos1',
    card: 'Eight of Pentacles',
    position: 1,
    upright:
      'This person is a diligent and detail-oriented individual, diligently working on a craft or skill. They are dedicated to self-improvement and mastery. They may show the same care and effort in a relationship.',
    reversed:
      'The reversed Eight of Pentacles shows this person has lost interest in their work, is being lazy, or cannot finish anything due to perfectionism. They are getting lost in the details.',
    keywords: [
      'mastery',
      'diligence',
      'skill development',
      'attention to detail',
      'care',
    ],
    context:
      'This person is like an artisan, diligently working to perfect their skills.',
    group: 'Pentacles',
  },
  {
    id: 'nine_of_pentacles_pos1',
    card: 'Nine of Pentacles',
    position: 1,
    upright:
      'This person is financially independent, self-sufficient, elegant, and enjoys the luxuries of life. They have achieved prosperity through their own efforts. They do not need a partner in a relationship, but they choose if they want one.',
    reversed:
      'The reversed Nine of Pentacles shows this person is financially dependent, flashy, or suffers from loneliness. They have issues with self-sufficiency.',
    keywords: ['independence', 'prosperity', 'self-sufficiency', 'elegance', 'enjoyment'],
    context:
      'This person is an independent and elegant soul, enjoying the garden they have built with their own labor.',
    group: 'Pentacles',
  },
  {
    id: 'ten_of_pentacles_pos1',
    card: 'Ten of Pentacles',
    position: 1,
    upright:
      'This person values family legacy, traditions, and long-term security. They have a rich material and spiritual background. They may want to build a lasting, stable future and family with you.',
    reversed:
      'The reversed Ten of Pentacles shows this person is experiencing financial problems within the family, has lost an inheritance, or that family ties are weak. There is no sense of lasting security.',
    keywords: ['family legacy', 'wealth', 'security', 'tradition', 'permanence'],
    context:
      'This person is a representative of a wealth and family ties that span generations.',
    group: 'Pentacles',
  },
  {
    id: 'page_of_pentacles_pos1',
    card: 'Page of Pentacles',
    position: 1,
    upright:
      'This person is a young soul, eager to learn, hardworking, reliable, and evaluates new opportunities. They are focused on a tangible goal. They may offer you a solid and realistic beginning.',
    reversed:
      'The reversed Page of Pentacles shows this person is lazy, aimless, or has missed an opportunity. They may be experiencing problems at school or work.',
    keywords: [
      'learning',
      'new opportunity',
      'diligence',
      'reliability',
      'tangible goals',
    ],
    context:
      'This person is a student, examining the pentacle in their hand, eager to learn something new and tangible.',
    group: 'Pentacles',
  },
  {
    id: 'knight_of_pentacles_pos1',
    card: 'Knight of Pentacles',
    position: 1,
    upright:
      'This person is extremely reliable, patient, hardworking, and methodical. They carry out their duties meticulously. In love, they move slowly but surely. They are a loyal and stable partner.',
    reversed:
      'The reversed Knight of Pentacles suggests this person can be extremely boring, stubborn, lazy, or closed off to change. They may be stuck in their routines.',
    keywords: ['reliability', 'patience', 'diligence', 'loyalty', 'stability'],
    context:
      'This person is a knight loyal to their duty, moving slowly but surely.',
    group: 'Pentacles',
  },
  {
    id: 'queen_of_pentacles_pos1',
    card: 'Queen of Pentacles',
    position: 1,
    upright:
      'This person is nurturing, practical, generous, and a homebody. They successfully manage both their home and their work. They create a warm and secure environment for their loved ones. They are a practical and loving partner.',
    reversed:
      'The reversed Queen of Pentacles shows this person is either unable to balance work and home life, or is overly materialistic and anxious. They may be neglecting themselves or their surroundings.',
    keywords: [
      'nurturing',
      'practicality',
      'generosity',
      'security',
      'domesticity',
    ],
    context:
      'This person is a nurturing soul with their feet on the ground, offering both material and spiritual wealth.',
    group: 'Pentacles',
  },
  {
    id: 'king_of_pentacles_pos1',
    card: 'King of Pentacles',
    position: 1,
    upright:
      'This person is a financially successful, reliable, generous, and stable leader. They have built their own empire. They are protective of their loved ones and offer a life of prosperity.',
    reversed:
      'The reversed King of Pentacles suggests this person may be overly materialistic, corrupt, stubborn, or insecure. They may abuse their success and wealth.',
    keywords: ['success', 'wealth', 'reliability', 'generosity', 'stability'],
    context:
      'This person is the king of the material world; a successful, reliable, and generous leader.',
    group: 'Pentacles',
  },
];

// i18n supported functions
export const useI18nPosition1Meanings = (): I18nLovePosition1Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position1Meanings.map(meaning => {
    // get translations from i18n
    const i18nUpright = getCardMeaning(meaning.card, 1, 'upright');
    const i18nReversed = getCardMeaning(meaning.card, 1, 'reversed');
    const i18nKeywords = getCardKeywords(meaning.card, 1);
    const i18nContext = getCardContext(meaning.card, 1);
    const i18nGroup = getCardGroup(meaning.group);

    return {
      id: meaning.id,
      card: meaning.card,
      position: meaning.position,
      upright: i18nUpright || meaning.upright, // Use original text as fallback
      reversed: i18nReversed || meaning.reversed,
      keywords: i18nKeywords.length > 0 ? i18nKeywords : meaning.keywords,
      context: i18nContext || meaning.context,
      group: i18nGroup || meaning.group,
    };
  });
};

// Get i18n supported meaning for a specific card (without using a hook)
export const getI18nPosition1Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nLovePosition1Meaning | null => {
  const originalMeaning = position1Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // get translations from i18n
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`love.meanings.${cardKey}.position1.upright`);
  const i18nReversed = t(`love.meanings.${cardKey}.position1.reversed`);
  const i18nKeywords = t(`love.meanings.${cardKey}.position1.keywords`);
  const i18nContext = t(`love.meanings.${cardKey}.position1.context`);
  const i18nGroup = t(
    `love.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
  );

  return {
    id: originalMeaning.id,
    card: originalMeaning.card,
    position: originalMeaning.position,
    upright: i18nUpright || originalMeaning.upright,
    reversed: i18nReversed || originalMeaning.reversed,
    keywords: i18nKeywords
      ? JSON.parse(i18nKeywords)
      : originalMeaning.keywords,
    context: i18nContext || originalMeaning.context,
    group: i18nGroup || originalMeaning.group,
  };
};
