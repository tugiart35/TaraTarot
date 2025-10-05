// Bu dosya, Aşk açılımında Pozisyon 2 (Fiziksel/Cinsel Bağlantı) için özel kart
anlamlarını içerir. // Her kartın bu pozisyonda ne anlama geldiği
tanımlanmıştır. // i18n desteği için güncellenmiştir.

import { useLoveTranslations } from './i18n-helper';

export interface LovePositionMeaning { id: string; card: string; position:
number; upright: string; reversed: string; keywords: string[]; context: string;
group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'; }

// i18n destekli LovePositionMeaning interface'i export interface
I18nLovePositionMeaning { id: string; card: string; position: number; upright:
string; reversed: string; keywords: string[]; context: string; group: string; }

export const position2Meanings: LovePositionMeaning[] = [ // --- Major Arcana
Cards --- { id: 'the_fool_pos2', card: 'The Fool', position: 2, upright: 'There
is a childlike curiosity and a desire to experiment in your physical connection.
It holds the potential for spontaneous, fun, and unplanned sexual exploration.
An adventure free from rules and expectations.', reversed: 'The reversed Fool
indicates that there may be recklessness, thoughtlessness, or risky behavior in
sexual matters. One of the parties may be holding back due to inexperience or
fear of commitment.', keywords: ['exploration', 'spontaneity', 'inexperience',
'fun', 'freedom'], context: 'The physical attraction between you signals the
beginning of a new and exciting sexual adventure.', group: 'Major Arcana', }, {
id: 'the_magician_pos2', card: 'The Magician', position: 2, upright: 'There is a
strong and conscious sexual attraction between you. One or both partners know
what they want and are quite skilled in bed. The potential for a creative and
satisfying sex life is high.', reversed: 'The reversed Magician suggests that
sexual energy may be used for manipulation or deception. There might be
performance anxiety or an inability to use one\'s sexual potential.', keywords:
[ 'sexual skill', 'attraction', 'creativity', 'manifestation', 'strong desire',
], context: 'Your sexual connection is like a creative playground where desire
and skill meet.', group: 'Major Arcana', }, { id: 'the_high_priestess_pos2',
card: 'The High Priestess', position: 2, upright: 'Your physical connection
carries a mysterious, intuitive, and not-yet-fully-revealed potential. A
spiritual attraction and unspoken desires are more prominent than physical
union. Sexuality awaits slow and deep exploration.', reversed: 'The reversed
High Priestess points to suppressed emotions, secrets, or a coldness in sexual
matters. The partners are not sexually open with each other, and an intuitive
bond cannot be formed.', keywords: [ 'intuitive attraction', 'mystery',
'unspoken desires', 'suppressed sexuality', 'spiritual bond', ], context: 'The
sexual attraction between you is deep and mysterious, like unseen currents
beneath the water\'s surface.', group: 'Major Arcana', }, { id:
'the_empress_pos2', card: 'The Empress', position: 2, upright: 'Your physical
connection is extremely sensual, nurturing, fertile, and appeals to the senses.
Sexuality is experienced as a celebration of pleasure and abundance. Fertility
and a comfortable, natural physical harmony are present.', reversed: 'The
reversed Empress suggests there may be laziness in sexual energy, a lack of
self-care, or an inability to experience pleasure. There might be a lack of
creativity or a possessive attitude in the physical bond.', keywords:
['sensuality', 'abundance', 'sensory pleasure', 'fertility', 'pleasure'],
context: 'Your sex life is like a fertile and joyful garden where all the senses
are activated.', group: 'Major Arcana', }, { id: 'the_emperor_pos2', card: 'The
Emperor', position: 2, upright: 'There is structure, control, and passion in
your physical connection. An experienced energy that takes leadership and
control in sexuality prevails. There may be a strong and protective sexual
dynamic.', reversed: 'The reversed Emperor indicates an overly controlling,
dominant, or rigid attitude in sex life. There may be a lack of emotional
expression or sexual disinterest. A power struggle may occur.', keywords:
['passion', 'control', 'power', 'stability', 'leadership'], context: 'Your
sexual connection is a solid structure where passion and control merge.', group:
'Major Arcana', }, { id: 'the_hierophant_pos2', card: 'The Hierophant',
position: 2, upright: 'Your physical connection may be experienced within a
traditional framework and specific expectations. Sexuality might be seen as part
of a sacred bond or marriage. It carries a sense of ritual and commitment rather
than pure passion.', reversed: 'The reversed Hierophant indicates a rebellion
against sexual taboos or traditional morality. There may be a search for sexual
freedom or unconventional sexual experiences.', keywords: [ 'traditional
sexuality', 'commitment', 'ritual', 'taboos', 'sacred bond', ], context: 'Your
sex life is lived within a framework shaped by social or personal beliefs.',
group: 'Major Arcana', }, { id: 'the_lovers_pos2', card: 'The Lovers', position:
2, upright: 'There is a deep spiritual and physical harmony and perfect
chemistry between you. Sexuality is not just a physical act but a union of two
souls. An intense love and a passionate sexual connection.', reversed: 'The
reversed Lovers indicates physical and emotional incompatibility, wrong
decisions in sexual matters, or a disconnection. It may suggest that even if the
bodies match, the hearts are not on the same frequency.', keywords: ['sexual
harmony', 'soulmate', 'passion', 'chemistry', 'deep bond'], context: 'Your
physical connection represents a sacred union where two souls become one.',
group: 'Major Arcana', }, { id: 'the_chariot_pos2', card: 'The Chariot',
position: 2, upright: 'There is strong willpower, goal-orientation, and a high
libido in your sex life. A passionate and energetic sexual union. One of the
partners knows what they want sexually and takes action to get it.', reversed:
'The reversed Chariot indicates that sexual energy is being used in an
uncontrolled or aggressive way. There may be sexual incompatibility, impatience,
or a libido imbalance.', keywords: ['high libido', 'willpower', 'passion',
'control', 'energy'], context: 'Your sexual energy is a powerful and passionate
force, moving decisively towards its goal.', group: 'Major Arcana', }, { id:
'strength_pos2', card: 'Strength', position: 2, upright: 'Passion and compassion
are in perfect balance in your physical connection. Wild desires are managed
with a gentle touch and patience. A sexuality that is strong yet soft and
loving.', reversed: 'The reversed Strength indicates sexual insecurity or an
uncontrolled expression of raw desires. A balance between passion and compassion
cannot be established.', keywords: ['balanced passion', 'compassion', 'inner
strength', 'patience', 'sexual confidence'], context: 'Your sexuality is an
expression of inner strength that gently tames a wild lion.', group: 'Major
Arcana', }, { id: 'the_hermit_pos2', card: 'The Hermit', position: 2, upright:
'Physical connection and sexuality are not a priority right now. One or both
partners are in a period of sexual withdrawal, solitude, or introspection. Time
and patience are needed to form a physical bond.', reversed: 'The reversed
Hermit may indicate that a period of sexual isolation is ending or that sexual
intercourse is sought out of fear of loneliness. There is an effort to connect,
but it can be forced.', keywords: [ 'sexual withdrawal', 'low libido',
'solitude', 'introspection', 'distance', ], context: 'Physical connection is
secondary for a soul that is currently on a quest and turned inward.', group:
'Major Arcana', }, { id: 'wheel_of_fortune_pos2', card: 'The Wheel of Fortune',
position: 2, upright: 'There are unexpected developments and cyclical changes in
your sex life. Sometimes you may be very passionate, other times more distant. A
period where fate brings you together or separates you physically.', reversed:
'The reversed Wheel of Fortune indicates a stagnation, bad luck, or repeating
negative cycles in your sex life. The sexual routine may have become boring.',
keywords: [ 'fate', 'cycles', 'unexpected development', 'sexual chemistry',
'change', ], context: 'Your sex life, like the turn of the wheel of fortune, is
full of ups, downs, and surprises.', group: 'Major Arcana', }, { id:
'justice_pos2', card: 'Justice', position: 2, upright: 'Balance, fairness, and
honesty are important in your physical connection. A fair sexual relationship
where the needs and desires of both parties are met. Sexuality is based on
mutual respect.', reversed: 'The reversed Justice indicates an imbalance or
injustice in the sex life. One party\'s desires dominate the other\'s, or there
is a lack of honesty in sexual matters.', keywords: ['balance', 'fairness',
'honesty', 'reciprocity', 'respect'], context: 'Your sexuality is based on a
fair exchange where both parties are satisfied.', group: 'Major Arcana', }, {
id: 'the_hanged_man_pos2', card: 'The Hanged Man', position: 2, upright: 'A
period of pause, sacrifice, or suspension in sex life. A spiritual or platonic
bond may be more prominent than physical union. A time to look at sexuality from
a different perspective.', reversed: 'The reversed Hanged Man indicates a
blockage in sex life or a meaningless sacrifice. One of the partners is not
sexually satisfied but does nothing to change the situation.', keywords: [
'pause', 'sacrifice', 'suspension', 'platonic bond', 'perspective', ], context:
'Your physical connection is currently on hold, waiting to see things from a
different perspective.', group: 'Major Arcana', }, { id: 'death_pos2', card:
'Death', position: 2, upright: 'A major transformation is occurring in your sex
life. Your old sexual identity or dynamics are ending, and a completely new
sexual understanding is being born. This could be a sexual awakening or the end
of an era.', reversed: 'The reversed Death indicates resistance to a sexual
change or ending. Clinging to an unhealthy sexual dynamic or habit is preventing
progress.', keywords: [ 'sexual transformation', 'ending', 'rebirth',
'awakening', 'termination', ], context: 'Your sexuality is in a profound
transformation, like a snake shedding its old skin to be reborn.', group: 'Major
Arcana', }, { id: 'temperance_pos2', card: 'Temperance', position: 2, upright:
'There is a perfect balance and harmony between physical and emotional energies.
Sexuality is like an alchemy that is calm, compassionate, and unites two souls.
Passion and love are blended.', reversed: 'The reversed Temperance indicates an
imbalance, excess, or disharmony in sexual energy. Passion and love cannot come
together, which leads to dissatisfaction.', keywords: ['balance', 'harmony',
'alchemy', 'moderation', 'compassionate passion'], context: 'Your sexuality is a
healing potion where two different energies combine in perfect harmony.', group:
'Major Arcana', }, { id: 'the_devil_pos2', card: 'The Devil', position: 2,
upright: 'There is an irresistible, raw, and intense sexual attraction between
you. This card represents taboos, sexual fantasies, and an addictive passion.
Your physical connection is extremely strong and primal.', reversed: 'The
reversed Devil indicates a desire to break free from a sexual addiction or an
unhealthy dynamic. The chains of the intense but toxic attraction between you
are breaking. Sexual liberation.', keywords: [ 'intense passion', 'sexual
attraction', 'taboos', 'addiction', 'fantasy', ], context: 'The sexual energy
between you is a primal and powerful force of attraction that binds you
together.', group: 'Major Arcana', }, { id: 'the_tower_pos2', card: 'The Tower',
position: 2, upright: 'A sudden and shocking enlightenment or a shocking event
may occur in your sex life. This could be the revelation of a hidden desire or a
truth that fundamentally shakes the sexual dynamics. An unexpected orgasmic
energy.', reversed: 'The reversed Tower indicates that a sexual crisis or
confrontation is being postponed. Suppressed sexual energy carries the danger of
leading to an explosion. A tension experienced due to fear of destruction.',
keywords: [ 'sudden enlightenment', 'sexual shock', 'destruction of taboos',
'shocking truth', 'explosion', ], context: 'Your sexual energy has a shocking
potential, striking like lightning and demolishing existing structures.', group:
'Major Arcana', }, { id: 'the_star_pos2', card: 'The Star', position: 2,
upright: 'Your physical connection is hopeful, healing, and has a spiritual
quality. Sexuality is experienced with love and openness. There is a sense of
renewal and innocence after past sexual traumas.', reversed: 'The reversed Star
indicates a sense of hopelessness, reluctance, or lack of inspiration in sex
life. There may be a coldness or disappointment in the physical bond.',
keywords: [ 'healing', 'hope', 'sexual renewal', 'innocence', 'spiritual
sexuality', ], context: 'Your physical connection is like a star that shines
after a dark night, bringing healing and hope.', group: 'Major Arcana', }, { id:
'the_moon_pos2', card: 'The Moon', position: 2, upright: 'Your physical
connection is full of uncertainties, fantasies, and hidden desires. Sexuality is
experienced in a dreamlike and mysterious realm. It may be unclear what is real
and what is imagination. An intense but confusing attraction.', reversed: 'The
reversed Moon indicates that hidden sexual desires or deceptions are coming to
light. The confusion about sexual matters is ending, and more clarity is
gained.', keywords: [ 'fantasy', 'hidden desires', 'uncertainty', 'confusion',
'dreamlike sexuality', ], context: 'Your sexuality is a mysterious forest
illuminated by moonlight, full of shadows and fantasies.', group: 'Major
Arcana', }, { id: 'the_sun_pos2', card: 'The Sun', position: 2, upright: 'Your
physical connection is full of joy, vitality, and openness. Sexuality is
experienced freely and joyfully, without shame. There is a high sexual energy
and satisfaction.', reversed: 'The reversed Sun indicates a temporary decline in
sexual energy or an inability to enjoy sex life. The potential is there but
seems to be overshadowed by a cloud.', keywords: [ 'joy', 'vitality', 'sexual
freedom', 'satisfaction', 'high energy', ], context: 'Your sex life is a sun
full of joy and vitality, illuminating and warming everything.', group: 'Major
Arcana', }, { id: 'judgement_pos2', card: 'Judgement', position: 2, upright: "A
sexual awakening or rebirth is being experienced. Past sexual experiences and
judgments are left behind to reach a higher sexual awareness. This is a 'second
chance' or a sexual calling.", reversed: 'The reversed Judgement indicates
judging oneself or one\'s partner in sexual matters, getting stuck on past
mistakes. There may be feelings of sexual guilt or shame.', keywords: [ 'sexual
awakening', 'rebirth', 'calling', 'reckoning', 'forgiveness', ], context: 'Your
sexuality is like a trumpet of awakening, calling you to a deeper understanding
and acceptance.', group: 'Major Arcana', }, { id: 'the_world_pos2', card: 'The
World', position: 2, upright: 'There is a sense of wholeness, completion, and
deep satisfaction in your physical connection. Your sex life is fulfilling and
has successfully completed its cycle. A perfect sexual harmony.', reversed: 'The
reversed World indicates a feeling that something is missing in the sex life, an
incompletion, or being stuck in a routine. An inability to find closure or
sexual dissatisfaction.', keywords: ['completion', 'sexual fulfillment',
'wholeness', 'success', 'harmony'], context: 'Your physical connection is a
dance full of satisfaction and wholeness, reached at the end of a journey.',
group: 'Major Arcana', },

// --- Cups Series --- { id: 'ace_of_cups_pos2', card: 'Ace of Cups', position:
2, upright: 'Your physical connection begins with love, compassion, and a deep
emotional bond. Sexuality is an expression of emotions. A new romantic and
physical beginning. Potential for fertility.', reversed: 'The reversed Ace of
Cups shows avoidance of sexual intimacy, emotional unavailability, or sexual
disinterest. A physical connection cannot be established without an emotional
bond.', keywords: [ 'emotional sexuality', 'love', 'compassion', 'new
beginning', 'fertility', ], context: 'Your sexuality is nourished by a spring of
overflowing love and compassion.', group: 'Cups', }, { id: 'two_of_cups_pos2',
card: 'Two of Cups', position: 2, upright: 'There is incredible chemistry and
mutual attraction between you. You are in perfect harmony physically and
emotionally. Sexuality is the loving union of two souls and bodies.', reversed:
'The reversed Two of Cups indicates an emotional disconnect despite physical
attraction, or sexual incompatibility. Misunderstanding or coldness towards each
other.', keywords: [ 'perfect chemistry', 'mutual attraction', 'physical
harmony', 'romantic sexuality', 'soulmate', ], context: 'Your physical intimacy
is a magical moment where two people become a single whole.', group: 'Cups', },
{ id: 'three_of_cups_pos2', card: 'Three of Cups', position: 2, upright: "Your
physical connection is fun, social, and carefree. This could indicate a 'friends
with benefits' situation or group fantasies. Sexuality is a source of
celebration and joy.", reversed: 'The reversed Three of Cups may point to a
sexual affair, cheating, or a third person interfering in your relationship. The
fun is over, replaced by gossip and chaos.', keywords: [ 'fun sexuality',
'carefree', 'celebration', 'flirtation', 'third person', ], context: 'Your sex
life carries a social and light energy, where friendship and joy are
prominent.', group: 'Cups', }, { id: 'four_of_cups_pos2', card: 'Four of Cups',
position: 2, upright: 'There is boredom, apathy, or dissatisfaction in the sex
life. The partner\'s sexual advances may be rejected. Low libido and sexual
disinterest are present.', reversed: 'The reversed Four of Cups indicates
emerging from a period of sexual stagnation and being open to new experiences.
Sexual interest is reviving.', keywords: [ 'sexual apathy', 'dissatisfaction',
'low libido', 'boredom', 'rejection', ], context: 'Your physical connection is
in a state of apathy and withdrawal from offered sexual opportunities.', group:
'Cups', }, { id: 'five_of_cups_pos2', card: 'Five of Cups', position: 2,
upright: 'A past bad sexual experience or heartbreak is negatively affecting the
current sex life. Grief or regret may be felt during sexual intimacy. Difficulty
focusing on pleasure.', reversed: 'The reversed Five of Cups indicates
overcoming past sexual traumas and the beginning of a healing process.
Approaching sexuality with hope and openness again.', keywords: [ 'sexual
grief', 'regret', 'past trauma', 'disappointment', 'sorrow', ], context: 'Your
sex life is overshadowed by the ghosts of the past, focused on sorrow rather
than satisfaction.', group: 'Cups', }, { id: 'six_of_cups_pos2', card: 'Six of
Cups', position: 2, upright: 'Your physical connection has an innocent, sweet,
and nostalgic feel. Sexuality is experienced with a tender and almost childlike
purity. It can also indicate a rekindled passion with an old flame.', reversed:
'The reversed Six of Cups indicates being stuck in past sexual experiences or a
lack of sexual maturity. Sexuality is lived with unrealistic, backward-looking
expectations.', keywords: ['innocence', 'tenderness', 'nostalgia', 'sweetness',
'old flame'], context: 'Your physical intimacy is a safe and affectionate
harbor, reminiscent of sweet past memories.', group: 'Cups', }, { id:
'seven_of_cups_pos2', card: 'Seven of Cups', position: 2, upright: 'There are
too many fantasies, dreams, and options in your sex life. However, this can lead
to living in a fantasy world instead of a real physical connection. Sexual
confusion or deceptive situations.', reversed: 'The reversed Seven of Cups
indicates that the distinction between sexual fantasies and reality is being
made. Confusion ends, and a clear sexual desire or decision emerges.', keywords:
[ 'sexual fantasy', 'confusion', 'options', 'illusion', 'daydreaming', ],
context: 'Your sexuality is lived in a cloud of fantasy with countless options,
rather than in reality.', group: 'Cups', }, { id: 'eight_of_cups_pos2', card:
'Eight of Cups', position: 2, upright: 'Moving away from a sexually unfulfilling
relationship or situation. A search for a deeper meaning or a spiritual bond
rather than physical pleasure. Embarking on a sexual journey.', reversed: 'The
reversed Eight of Cups indicates the fear of staying in a relationship despite
sexual dissatisfaction or not knowing where to go. There is a sexual quest, but
no action is taken.', keywords: [ 'sexual dissatisfaction', 'quest', 'moving
away', 'deeper meaning', 'journey', ], context: 'The physical connection is the
beginning of a quest, left behind because it no longer nourishes the soul.',
group: 'Cups', }, { id: 'nine_of_cups_pos2', card: 'Nine of Cups', position: 2,
upright: "An extremely satisfying, pleasurable, and sensual sex life. Can be
interpreted as 'sexual wishes come true.' A generous sexuality where both
partners enjoy themselves.", reversed: 'The reversed Nine of Cups indicates
sexual dissatisfaction, selfishness, or unmet expectations. There is pleasure,
but something is missing or superficial.', keywords: ['sexual satisfaction',
'pleasure', 'sensuality', 'fulfillment', 'generosity'], context: 'Your sex life
is a feast of pleasure and satisfaction where all your desires come true.',
group: 'Cups', }, { id: 'ten_of_cups_pos2', card: 'Ten of Cups', position: 2,
upright: 'Your physical connection is built on deep love, commitment, and
emotional security. Sexuality is a natural part of a happy and harmonious
relationship. A physical harmony that reflects the desire to build a family.',
reversed: 'The reversed Ten of Cups indicates that disharmony in the sex life is
reflected in family life, or vice versa. There is a happy picture, but sexual
satisfaction is lacking.', keywords: [ 'emotional security', 'loving sexuality',
'harmony', 'lasting bond', 'family', ], context: 'Your sexual connection is
enveloped in the warmth and security of a happy home.', group: 'Cups', }, { id:
'page_of_cups_pos2', card: 'Page of Cups', position: 2, upright: 'A flirtatious,
sensitive, and romantic beginning in the physical connection. A sexual offer or
an expression of feelings in a physical language. An innocent sexual curiosity
open to exploration.', reversed: 'The reversed Page of Cups indicates sexual
immaturity, touchiness, or fear of rejection. Flirtatious approaches may be
insincere or childish.', keywords: [ 'flirtation', 'romantic beginning',
'sensitivity', 'sexual curiosity', 'offer', ], context: 'Your physical energy is
like a shy but willing lover offering you their heart and body.', group: 'Cups',
}, { id: 'knight_of_cups_pos2', card: 'Knight of Cups', position: 2, upright:
'An extremely romantic, seductive, and idealistic sexual approach. Sexuality is
experienced with finesse and sensitivity, like an art. You are being offered a
romantic and passionate experience.', reversed: 'The reversed Knight of Cups
indicates a deceptive romance, insincere sexual promises, or emotional
manipulation. The intentions beneath the surface may be different.', keywords: [
'romance', 'seduction', 'idealistic love', 'sensitivity', 'passionate offer', ],
context: 'Your physical connection is romantic and seductive, like the verses of
a poet.', group: 'Cups', }, { id: 'queen_of_cups_pos2', card: 'Queen of Cups',
position: 2, upright: 'The physical connection is based on a deep emotional and
intuitive understanding. Sexuality is compassionate, nurturing, and extremely
empathetic. A loving physical union that senses the partner\'s needs.',
reversed: 'The reversed Queen of Cups suggests that there may be excessive
emotionality, emotional manipulation, or a suffocating closeness in the sex
life. Sexual boundaries may become blurred.', keywords: [ 'empathetic
sexuality', 'compassion', 'intuitive bond', 'emotional depth', 'nurturing', ],
context: 'Your sexuality is a compassionate and intuitive dance that touches
your partner\'s soul.', group: 'Cups', }, { id: 'king_of_cups_pos2', card: 'King
of Cups', position: 2, upright: 'Emotional maturity and control dominate in
sexuality. Passion is managed with love and wisdom. Offers a compassionate,
understanding, and satisfying sexual experience to the partner. Emotionally and
physically balanced.', reversed: 'The reversed King of Cups indicates a sexually
distant, emotionally unavailable, or manipulative partner. May use their
emotions as a sexual weapon.', keywords: [ 'emotional maturity', 'balanced
passion', 'compassion', 'control', 'wisdom', ], context: 'Your sexual connection
is like a mature and compassionate king who wisely rules the ocean of
emotions.', group: 'Cups', },

// --- Swords Series --- { id: 'ace_of_swords_pos2', card: 'Ace of Swords',
position: 2, upright: "The physical connection begins with mental stimulation
and a clear desire. There is open and honest communication about sexual matters.
More of a mental 'yes' moment or a sharp desire than passion.", reversed: 'The
reversed Ace of Swords indicates a lack of communication, misunderstandings, or
sexual disinterest in sexual matters. A mental block is preventing physical
union.', keywords: [ 'mental stimulation', 'clear desire', 'honest
communication', 'sharp attraction', 'decision', ], context: 'Your physical
attraction begins with a sudden and sharp clarity, like the flash of an idea.',
group: 'Swords', }, { id: 'two_of_swords_pos2', card: 'Two of Swords', position:
2, upright: 'A state of defense or indecision towards sexual intimacy. The
parties are avoiding taking a sexual step and are building an emotional wall.
There is sexual tension but no action.', reversed: 'The reversed Two of Swords
indicates a sexual stalemate or tension created by suppressed emotions.
Indecision makes physical intimacy impossible.', keywords: [ 'sexual
indecision', 'defense', 'building walls', 'tension', 'avoidance', ], context:
'Your physical connection is like a cold peace between two closed-off minds.',
group: 'Swords', }, { id: 'three_of_swords_pos2', card: 'Three of Swords',
position: 2, upright: 'The physical connection is overshadowed by betrayal,
sexual disappointment, or a painful truth. Sexual union may carry a feeling of
grief or pain. Heartbreak affects the physical bond.', reversed: 'The reversed
Three of Swords shows an effort to overcome a sexual pain or betrayal. The
healing process may be slow and painful. Difficulty in forgiving.', keywords: [
'sexual disappointment', 'betrayal', 'pain', 'heartbreak', 'grief', ], context:
'Your physical connection is wounded by the swords of a painful truth piercing
the heart.', group: 'Swords', }, { id: 'four_of_swords_pos2', card: 'Four of
Swords', position: 2, upright: 'A period of sexual rest or break. The parties
are gathering energy by staying away from sexual activity. It can mean low
libido or sexual abstinence. A necessary process for healing.', reversed: 'The
reversed Four of Swords indicates that a sexual stagnation is being forced or a
state of burnout. It may be time to return to sexual activity, but there is a
reluctance.', keywords: [ 'sexual break', 'abstinence', 'rest', 'healing', 'low
libido', ], context: 'Your sexual energy is calm, like a knight resting to
prepare for the next battle.', group: 'Swords', }, { id: 'five_of_swords_pos2',
card: 'Five of Swords', position: 2, upright: 'There is a power struggle,
selfishness, or conflict in sexuality. One party\'s pleasure may come at the
expense of the other. Sexual union can feel like a victory or a defeat. It can
be aggressive or demeaning.', reversed: 'The reversed Five of Swords may
indicate regret after a sexual conflict or the exposure of a deception.
Potential for sexual bullying or harassment.', keywords: [ 'sexual conflict',
'selfishness', 'power struggle', 'aggression', 'defeat', ], context: 'Your
sexual space is like a battlefield rather than a loving union.', group:
'Swords', }, { id: 'six_of_swords_pos2', card: 'Six of Swords', position: 2,
upright: 'Leaving behind a difficult or painful sexual past and moving into a
more peaceful period. Healing from sexual traumas and moving towards a calmer
sex life.', reversed: 'The reversed Six of Swords indicates that even though you
are trying to escape from sexual problems, the burden of the past is still with
you. A full recovery has not been achieved.', keywords: [ 'sexual healing',
'transition', 'peace', 'letting go of the past', 'calming down', ], context:
'Your sexual energy is leaving stormy seas and heading towards a calm bay.',
group: 'Swords', }, { id: 'seven_of_swords_pos2', card: 'Seven of Swords',
position: 2, upright: 'There is secrecy, deception, or dishonest behavior in the
sex life. There may be an affair, a secret relationship, or sexual fantasies
hidden from the partner.', reversed: 'The reversed Seven of Swords indicates the
danger of a lie or deception being exposed. Remorse for keeping secrets or fear
of being caught.', keywords: [ 'deception', 'secrecy', 'affair', 'dishonest
behavior', 'secrets', ], context: 'Your physical connection resembles a covert
plan rather than an honest union.', group: 'Swords', }, { id:
'eight_of_swords_pos2', card: 'Eight of Swords', position: 2, upright: 'Your
physical connection is restricted by fears and mental blocks. One or both
parties are afraid to express themselves sexually, feeling trapped. Sexuality is
lived in a mental prison.', reversed: 'The reversed Eight of Swords indicates
that sexual taboos and fears are being overcome. Mental blocks are lifted, and
sexual liberation begins. Freedom from self-restricting thoughts.', keywords: [
'sexual inhibition', 'fear', 'mental block', 'insecurity', 'restriction', ],
context: 'The physical bond between you is struggling with the barriers created
in one\'s own mind.', group: 'Swords', }, { id: 'nine_of_swords_pos2', card:
'Nine of Swords', position: 2, upright: 'The sex life is filled with anxiety,
guilt, or fear. Sexual performance anxiety, a past trauma, or shame can turn
physical intimacy into an ordeal.', reversed: 'The reversed Nine of Swords
indicates that sexual fears are being confronted and these anxieties are
understood to be unfounded. A healing process is beginning, but there is still
vulnerability.', keywords: [ 'sexual anxiety', 'fear', 'guilt', 'shame',
'performance anxiety', ], context: 'Your sex life is like a dark night filled
with anxieties that turn into mental torture.', group: 'Swords', }, { id:
'ten_of_swords_pos2', card: 'Ten of Swords', position: 2, upright: 'A sexual
ending, the most painful point of a betrayal, or the complete exhaustion of
sexual energy. This is the end of an era, and there is no way forward but a new
beginning.', reversed: 'The reversed Ten of Swords indicates a slow recovery
after a painful sexual situation. The wounds are still fresh, but the worst may
be over. Recovery from a total collapse.', keywords: [ 'painful end',
'betrayal', 'sexual burnout', 'rock bottom', 'pain of betrayal', ], context:
'Your physical connection represents a painful end, having reached the lowest
point.', group: 'Swords', }, { id: 'page_of_swords_pos2', card: 'Page of
Swords', position: 2, upright: "A curious, inquisitive, and talkative energy in
sexual matters. Potential for 'dirty talk' or communicating openly about sexual
experiences. A bit inexperienced but enthusiastic.", reversed: 'The reversed
Page of Swords indicates that words can be hurtful in sex life or points to
lies. Communication can create distance instead of closeness. A defensive
sexuality.', keywords: [ 'sexual curiosity', 'communication', 'dirty talk',
'inquiry', 'inexperience', ], context: 'Your physical connection is a sharp and
curious game played with words and the mind.', group: 'Swords', }, { id:
'knight_of_swords_pos2', card: 'Knight of Swords', position: 2, upright: "A
fast, passionate, and perhaps a bit thoughtless sexual approach. May carry a
'one-night stand' energy. It is goal-oriented and focuses on action and conquest
rather than emotional depth.", reversed: 'The reversed Knight of Swords can
indicate an aggressive, rude, or selfish sexual partner. A hasty energy that
ignores the partner\'s needs.', keywords: [ 'fast sexuality', 'thoughtlessness',
'conquest', 'one-night stand', 'haste', ], context: 'Your sexual energy is a
goal-oriented raider, coming and going quickly like a storm.', group: 'Swords',
}, { id: 'queen_of_swords_pos2', card: 'Queen of Swords', position: 2, upright:
'Represents someone who is sexually intelligent, experienced, and knows what
they want. Values open communication and mental harmony over emotional drama.
May have a witty and sharp sexual intelligence.', reversed: 'The reversed Queen
of Swords can indicate someone who is sexually cold, distant, critical, or has
closed themselves off due to past hurts. May use sexuality as a tool for
revenge.', keywords: ['sexual intelligence', 'experience', 'clarity',
'distance', 'independence'], context: 'Your sexuality is a domain where
intelligence and experience lead, and emotional distance is maintained.', group:
'Swords', }, { id: 'king_of_swords_pos2', card: 'King of Swords', position: 2,
upright: 'Represents someone with authority, intelligence, and control in
sexuality. Sexual fantasies or conversations may be on an intellectual level. An
emotionally distant but fair and honest sexual partner.', reversed: 'The
reversed King of Swords indicates someone who is sexually manipulative,
controlling, and emotionless. May use their intelligence to control their
partner or exert sexual pressure.', keywords: [ 'intellectual sexuality',
'control', 'authority', 'honesty', 'distance', ], context: 'Your sexual
connection is a highly controlled domain where intellect and logic reign.',
group: 'Swords', },

// --- Wands Series --- { id: 'ace_of_wands_pos2', card: 'Ace of Wands',
position: 2, upright: 'There is a new and powerful sexual spark between you.
This is the beginning of a great passion, physical energy, and sexual awakening.
An irresistible desire is present.', reversed: 'The reversed Ace of Wands
indicates sexual disinterest, low energy, or the fading of the attraction
between you. The potential is there, but it just won\'t ignite. Impotence or
sexual coldness.', keywords: [ 'sexual spark', 'passion', 'desire', 'physical
energy', 'new beginning', ], context: 'Your physical connection carries the
first spark of a passion ready to explode.', group: 'Wands', }, { id:
'two_of_wands_pos2', card: 'Two of Wands', position: 2, upright: 'You desire
each other physically and are thinking about future sexual potential. A phase of
exploration and planning. There is a desire to go further sexually.', reversed:
'The reversed Two of Wands means fear of taking a sexual step, not taking risks,
or the attraction remaining one-sided. There is desire but no action.',
keywords: ['sexual desire', 'potential', 'planning', 'exploration',
'attraction'], context: 'Your physical energy is like an explorer full of
potential, contemplating the next step.', group: 'Wands', }, { id:
'three_of_wands_pos2', card: 'Three of Wands', position: 2, upright: 'Your
sexual expectations and desires are being met. A period of opening up and
exploring physically. If you are in a long-distance relationship, it may
indicate that the time of reunion is approaching.', reversed: 'The reversed
Three of Wands indicates disappointment, delays, or dissatisfaction in the sex
life. Your expectations are not being met. Impatience is hindering pleasure.',
keywords: [ 'sexual expectation', 'reciprocation', 'exploration', 'progress',
'reunion', ], context: 'Your physical connection is a wait where new and
exciting sexual adventures appear on the horizon.', group: 'Wands', }, { id:
'four_of_wands_pos2', card: 'Four of Wands', position: 2, upright: 'Your
physical connection is joyful, harmonious, and worth celebrating. Sexuality is a
celebration of a happy union between two people. Honeymoon or a passionate
getaway energy.', reversed: 'The reversed Four of Wands indicates a disharmony
or instability in the sex life. The physical bond does not provide the expected
joy and sense of celebration.', keywords: ['passionate celebration', 'sexual
harmony', 'joy', 'honeymoon', 'stability'], context: 'Your sex life is a joyful
and passionate festival celebrating the coming together of two people.', group:
'Wands', }, { id: 'five_of_wands_pos2', card: 'Five of Wands', position: 2,
upright: 'There is competition, playful friction, or a lot of raw energy in your
sex life. This can point to a passionate and energetic sexuality, but it can
also turn into a conflict. A clash of different desires.', reversed: 'The
reversed Five of Wands indicates avoidance of sexual conflict, suppressed
desire, or sexual fatigue. Competition has given way to reluctance.', keywords:
[ 'sexual competition', 'raw energy', 'passionate friction', 'conflict',
'different desires', ], context: 'Your sexuality is a playful but chaotic space
where energies and desires collide.', group: 'Wands', }, { id:
'six_of_wands_pos2', card: 'Six of Wands', position: 2, upright: 'A satisfying
and successful sex life. The partners please each other, and this boosts
self-confidence. Appreciation of sexual performance and a sense of victory.',
reversed: 'The reversed Six of Wands indicates a sense of failure in sex life,
performance anxiety, or a lack of appreciation. One party\'s ego crushes the
other.', keywords: ['sexual victory', 'self-confidence', 'appreciation',
'success', 'satisfaction'], context: 'Your physical connection is a successful
conquest where both parties feel victorious.', group: 'Wands', }, { id:
'seven_of_wands_pos2', card: 'Seven of Wands', position: 2, upright: 'A
situation of defending oneself sexually or protecting boundaries. One party
resisting the other\'s sexual advances. A passionate challenge or a sexual
struggle.', reversed: 'The reversed Seven of Wands indicates defeat in a sexual
struggle, loss of sexual self-confidence, or feeling vulnerable. The fatigue
felt when boundaries are crossed.', keywords: [ 'sexual boundaries',
'challenge', 'defense', 'resistance', 'struggle', ], context: 'Your sexual
energy is a struggle where one passionately defends their own space and
desires.', group: 'Wands', }, { id: 'eight_of_wands_pos2', card: 'Eight of
Wands', position: 2, upright: 'A fast, passionate, and exciting sexual energy.
Events can develop quickly. Passionate messaging, sudden meetups, and a high
sexual tempo.', reversed: 'The reversed Eight of Wands indicates a slowdown,
delay, or bad timing in sexual energy. Passionate messages may go unanswered, or
sexual union may be postponed. Jealousy.', keywords: [ 'fast passion',
'excitement', 'sexual communication', 'high tempo', 'desire', ], context: 'Your
physical connection is an unstoppable energy, like arrows of passion swiftly
reaching their target.', group: 'Wands', }, { id: 'nine_of_wands_pos2', card:
'Nine of Wands', position: 2, upright: 'A cautious and defensive stance due to
past sexual disappointments. A wall may have been built against sexual intimacy.
There is desire, but it is difficult to act to due to a lack of trust.',
reversed: 'The reversed Nine of Wands indicates that a sexual defense is no
longer working or has been overcome. Either complete surrender or stubbornly
continuing with distrust.', keywords: [ 'sexual insecurity', 'defense',
'caution', 'past wounds', 'building walls', ], context: 'Your physical
connection has the energy of a warrior who has been wounded in the past and
fears being hurt again.', group: 'Wands', }, { id: 'ten_of_wands_pos2', card:
'Ten of Wands', position: 2, upright: 'Sex life feels more like a duty or a
burden than a source of pleasure. Stress and fatigue have suppressed libido and
sexual desire.', reversed: 'The reversed Ten of Wands indicates that a burden or
pressure in the sex life is easing. Sexual energy may revive as responsibilities
decrease.', keywords: [ 'sexual burden', 'stress', 'burnout', 'pressure', 'sex
as a duty', ], context: 'Your sex life is an energy crushed under the other
burdens of life, having lost its pleasure.', group: 'Wands', }, { id:
'page_of_wands_pos2', card: 'Page of Wands', position: 2, upright: 'An
enthusiasm and desire for adventure for new sexual experiences. A flirtatious,
energetic, and passionate beginning. An energy that is open to sexual
exploration and fun.', reversed: 'The reversed Page of Wands shows indecision
about starting a sexual relationship or an immature sexual energy. There is
passion, but it doesn\'t know where to direct it.', keywords: ['sexual
adventure', 'enthusiasm', 'flirtation', 'exploration', 'passionate beginning'],
context: 'Your physical connection is an energetic and passionate explorer,
eager to embark on new adventures.', group: 'Wands', }, { id:
'knight_of_wands_pos2', card: 'Knight of Wands', position: 2, upright: 'An
extremely passionate, energetic, and adventurous sexual connection. A
charismatic and seductive energy. Sexually very active and bold.', reversed:
'The reversed Knight of Wands can indicate a selfish, hasty sexual partner
focused only on their own pleasure. Their passion can flare up and die down
quickly. An energy that avoids commitment.', keywords: ['intense passion',
'adventure', 'charisma', 'sexual energy', 'courage'], context: 'Your sexual
energy is an adventurer, bright, hot, and unstoppable like a flame.', group:
'Wands', }, { id: 'queen_of_wands_pos2', card: 'Queen of Wands', position: 2,
upright: 'A confident, passionate, and sexually free energy. A creative and fun
partner who knows what they want in bed. An attractive and magnetic sexual
aura.', reversed: 'The reversed Queen of Wands can indicate someone who is
sexually demanding, jealous, or dramatic. May use their sexual energy for
manipulation. Insecurity overshadows passion.', keywords: [ 'sexual confidence',
'passion', 'creativity', 'attraction', 'freedom', ], context: 'Your sexual
connection has the energy of a fiery, confident queen who radiates light.',
group: 'Wands', }, { id: 'king_of_wands_pos2', card: 'King of Wands', position:
2, upright: 'A sexually experienced, leading, and extremely passionate partner.
Likes to be in control in bed but is also generous. A charismatic and powerful
sexual energy.', reversed: 'The reversed King of Wands can indicate a sexually
oppressive, selfish, or egoistic partner. A leader who disregards their
partner\'s needs and focuses only on their own satisfaction.', keywords:
['sexual leadership', 'experience', 'intense passion', 'charisma', 'power'],
context: 'Your sex life is an experienced and charismatic leader who rules the
kingdom of passion.', group: 'Wands', },

// --- Pentacles Series --- { id: 'ace_of_pentacles_pos2', card: 'Ace of
Pentacles', position: 2, upright: 'A new, solid, and reassuring physical
beginning. This could be a first sexual experience or a new relationship where
physical harmony is discovered. Sexuality is grounded and real.', reversed: 'The
reversed Ace of Pentacles indicates a missed sexual opportunity or that it is
not the right time to form a physical bond. A lack or delay in physical
harmony.', keywords: [ 'solid beginning', 'physical harmony', 'trust',
'reality', 'opportunity', ], context: 'Your physical connection is like a new
and valuable seed sprouting on solid ground.', group: 'Pentacles', }, { id:
'two_of_pentacles_pos2', card: 'Two of Pentacles', position: 2, upright: 'Your
physical connection is fun, flexible, and rhythmic. There is a playful balance
between the partners. Sexuality can be a balancing element among other life
responsibilities.', reversed: 'The reversed Two of Pentacles indicates an
inability to find balance in the sex life. Stress or busyness is negatively
affecting physical intimacy. An incompatible rhythm.', keywords: ['balance',
'rhythm', 'flexibility', 'fun', 'playfulness'], context: 'Your sexuality is a
joyful and flexible rhythm where two bodies dance in harmony.', group:
'Pentacles', }, { id: 'three_of_pentacles_pos2', card: 'Three of Pentacles',
position: 2, upright: 'The physical connection is like teamwork. The partners
learn each other\'s bodies and build pleasure together. This card can also
indicate the possibility of a threesome.', reversed: 'The reversed Three of
Pentacles shows an inability to work as a team sexually, incompatibility, or
being closed off to learning. Sexuality has become a task rather than a sharing
of pleasure.', keywords: [ 'collaboration', 'learning', 'physical harmony',
'building', 'threesome', ], context: 'Your sex life is like a project where two
architects build pleasure and satisfaction together.', group: 'Pentacles', }, {
id: 'four_of_pentacles_pos2', card: 'Four of Pentacles', position: 2, upright:
'A conservative, controlled, and sometimes stingy energy in sex life.
Restricting oneself out of fear of losing the partner or sexual pleasure.
Sexuality is in a routine and closed to novelty.', reversed: 'The reversed Four
of Pentacles indicates a desire to get rid of sexual restrictions or a fear of
losing sexual control. A change is happening, but it can create tension.',
keywords: [ 'sexual conservatism', 'control', 'restriction', 'routine', 'fear of
loss', ], context: 'Your sexual energy is a closed treasure chest, trying to
hoard pleasure instead of living it freely.', group: 'Pentacles', }, { id:
'five_of_pentacles_pos2', card: 'Five of Pentacles', position: 2, upright:
'Feeling physically excluded, unwanted, or unloved. Lack of sexual intimacy or
coldness. Health problems or financial difficulties are negatively affecting sex
life.', reversed: 'The reversed Five of Pentacles indicates that a period of
sexual deprivation is ending. Physical and emotional warmth are being
rediscovered. Healing and acceptance.', keywords: [ 'sexual deprivation',
'coldness', 'exclusion', 'unwanted', 'lack of intimacy', ], context: 'Your
physical connection is a state of mind left out in the cold, in search of love
and warmth.', group: 'Pentacles', }, { id: 'six_of_pentacles_pos2', card: 'Six
of Pentacles', position: 2, upright: "There is a generous and balanced
give-and-take relationship in the sex life. The partners care about each other's
pleasure. This can indicate a sexual power balance or one party 'teaching' the
other sexually.", reversed: 'The reversed Six of Pentacles indicates an
imbalance in the sex life. One party is constantly giving while the other is
receiving. This can lead to a feeling of indebtedness or manipulation.',
keywords: [ 'sexual generosity', 'give-and-take balance', 'mutual pleasure',
'power balance', 'sharing', ], context: 'Your sexuality is a fair and generous
exchange of gifts where both parties both give and receive.', group:
'Pentacles', }, { id: 'seven_of_pentacles_pos2', card: 'Seven of Pentacles',
position: 2, upright: "A time to pause and evaluate the sex life. The question
'Is this relationship physically satisfying for me?' may be asked. A patient
wait or a period of sexual pause.", reversed: 'The reversed Seven of Pentacles
indicates a feeling that efforts in the sex life have been wasted or that
pleasure is missed due to impatience. The invested sexual energy is not paying
off.', keywords: [ 'evaluation', 'patience', 'sexual pause', 'dissatisfaction',
'waiting', ], context: 'Your sexual connection is a garden where you patiently
wait to see if your efforts will bear fruit.', group: 'Pentacles', }, { id:
'eight_of_pentacles_pos2', card: 'Eight of Pentacles', position: 2, upright: 'A
process of learning, practicing, and mastering in the sex life. The partners are
focused on discovering each other\'s bodies and pleasure points. A careful and
attentive sexuality.', reversed: 'The reversed Eight of Pentacles shows
laziness, carelessness, or being stuck in a routine in the sex life. Sexuality
has become mechanical and uninspired.', keywords: ['sexual learning', 'mastery',
'care', 'practice', 'discovery'], context: 'Your sexuality is a workshop where
you carefully craft each other\'s bodies like a work of art.', group:
'Pentacles', }, { id: 'nine_of_pentacles_pos2', card: 'Nine of Pentacles',
position: 2, upright: 'A self-sufficient energy at peace with one\'s own body
and sexuality. Sexuality is experienced as a pleasure and luxury rather than a
need. Finding sexual satisfaction through masturbation or without a partner.',
reversed: 'The reversed Nine of Pentacles indicates sexual insecurity, a feeling
of loneliness, or not being at peace with one\'s body. The pursuit of luxury and
pleasure may be an attempt to fill a void.', keywords: [ 'sexual independence',
'self-sufficiency', 'pleasure', 'luxury', 'body positivity', ], context: 'Your
sexual energy is an independent and sensual soul enjoying its own garden.',
group: 'Pentacles', }, { id: 'ten_of_pentacles_pos2', card: 'Ten of Pentacles',
position: 2, upright: 'Your physical connection is extremely solid, satisfying,
and reassuring. This indicates not just a temporary fling, but a deep-rooted and
potentially lasting physical harmony. Sexuality gives a sense of home and
supports fertility.', reversed: 'The reversed Ten of Pentacles indicates
physical incompatibility or instability in the sex life. The physical bond does
not provide the expected security and satisfaction, or family expectations
negatively affect the sex life.', keywords: [ 'physical harmony', 'stability',
'security', 'fertility', 'physical satisfaction', ], context: 'Your sexual
harmony forms the foundation of a long-term bond and deep-rooted satisfaction.',
group: 'Pentacles', }, { id: 'page_of_pentacles_pos2', card: 'Page of
Pentacles', position: 2, upright: 'Openness to a new physical experience or
bodily exploration. An eager, curious, and grounded energy for learning about
sexuality. A solid and slow sexual beginning.', reversed: 'The reversed Page of
Pentacles shows a missed sexual opportunity, laziness, or a lack of bodily
awareness. An impractical, dreamy approach to sexuality.', keywords: [ 'bodily
exploration', 'physical curiosity', 'learning', 'solid beginning',
'opportunity', ], context: 'Your physical connection is like an eager student
discovering their own body and pleasures.', group: 'Pentacles', }, { id:
'knight_of_pentacles_pos2', card: 'Knight of Pentacles', position: 2, upright:
'Your physical connection is slow, patient, reliable, and extremely sensual. It
is not rushed, focusing on feeling every moment of pleasure. A loyal and stable
sexual partner.', reversed: 'The reversed Knight of Pentacles shows a
stagnation, boredom, or laziness in the sex life. Sexuality has turned into a
routine rather than an adventure or pleasure.', keywords: ['sensuality',
'patience', 'reliability', 'loyalty', 'slow sex'], context: 'Your sexual energy
is a sensual and reliable knight, moving slowly but surely towards its goal.',
group: 'Pentacles', }, { id: 'queen_of_pentacles_pos2', card: 'Queen of
Pentacles', position: 2, upright: 'Sexuality is nurturing, generous, warm, and
extremely sensual. It appeals to all senses (touch, taste, smell). A sensual
energy that provides a safe and comfortable environment for the partner.',
reversed: 'The reversed Queen of Pentacles shows a lack of care for oneself or
the partner sexually, laziness, or seeing sexual energy only as a practical
task. Lack of sensuality.', keywords: [ 'sensuality', 'nurturing', 'generosity',
'security', 'warmth', ], context: 'Your sex life is like a warm and abundant
embrace that nurtures all the senses.', group: 'Pentacles', }, { id:
'king_of_pentacles_pos2', card: 'King of Pentacles', position: 2, upright: 'An
extremely sensual, generous, and masterful sexual partner. Indulges in physical
pleasures and knows well how to please their partner. Offers a rich and
satisfying sexual experience.', reversed: 'The reversed King of Pentacles can
indicate someone who is sexually selfish, lazy, or focused only on their own
pleasure. May use sexuality as a status or power symbol.', keywords: [ 'sensual
master', 'generosity', 'physical pleasure', 'success', 'satisfaction', ],
context: 'Your sexual connection is like the generous and masterful ruler of the
kingdom of physical pleasures.', group: 'Pentacles', }, ];

// i18n destekli fonksiyonlar export const useI18nPosition2Meanings = ():
I18nLovePositionMeaning[] => { const { getCardMeaning, getCardKeywords,
getCardContext, getCardGroup } = useLoveTranslations();

return position2Meanings.map(meaning => { // i18n'den çevirileri al const
i18nUpright = getCardMeaning(meaning.card, 2, 'upright'); const i18nReversed =
getCardMeaning(meaning.card, 2, 'reversed'); const i18nKeywords =
getCardKeywords(meaning.card, 2); const i18nContext =
getCardContext(meaning.card, 2); const i18nGroup = getCardGroup(meaning.group);

    return {
      id: meaning.id,
      card: meaning.card,
      position: meaning.position,
      upright: i18nUpright || meaning.upright, // Fallback olarak orijinal metni kullan
      reversed: i18nReversed || meaning.reversed,
      keywords: i18nKeywords.length > 0 ? i18nKeywords : meaning.keywords,
      context: i18nContext || meaning.context,
      group: i18nGroup || meaning.group,
    };

}); };

// Belirli bir kart için i18n destekli anlam al (hook kullanmadan) export const
getI18nPosition2Meaning = ( cardName: string, t: (\_key: string) => string ):
I18nLovePositionMeaning | null => { const originalMeaning =
position2Meanings.find(m => m.card === cardName); if (!originalMeaning) { return
null; }

// i18n'den çevirileri al const cardKey = cardName .toLowerCase()
.replace(/\s+/g, '') .replace(/[^a-z0-9]/g, ''); const i18nUpright =
t(`love.meanings.${cardKey}.position2.upright`); const i18nReversed =
t(`love.meanings.${cardKey}.position2.reversed`); const i18nKeywords =
t(`love.meanings.${cardKey}.position2.keywords`); const i18nContext =
t(`love.meanings.${cardKey}.position2.context`); const i18nGroup = t(
`love.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}` );

return { id: originalMeaning.id, card: originalMeaning.card, position:
originalMeaning.position, upright: i18nUpright || originalMeaning.upright,
reversed: i18nReversed || originalMeaning.reversed, keywords: i18nKeywords ?
JSON.parse(i18nKeywords) : originalMeaning.keywords, context: i18nContext ||
originalMeaning.context, group: i18nGroup || originalMeaning.group, }; };
