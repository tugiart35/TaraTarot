-- Migration: Insert Sample Tarot Cards
-- Date: 2025-01-27
-- Description: Insert sample data for 2 cards (The Fool and The High Priestess) in all 3 languages

-- Insert The Fool card
INSERT INTO tarot_cards (
  english_name, turkish_name, serbian_name, arcana_type, image_url,
  slug_tr, slug_en, slug_sr
) VALUES (
  'The Fool', 'Joker', 'Joker', 'major',
  '/images/tarot-cards/the-fool.jpg',
  'joker', 'the-fool', 'joker'
);

-- Insert The High Priestess card
INSERT INTO tarot_cards (
  english_name, turkish_name, serbian_name, arcana_type, image_url,
  slug_tr, slug_en, slug_sr
) VALUES (
  'The High Priestess', 'Yüksek Rahibe', 'Visoka Svestenica', 'major',
  '/images/tarot-cards/the-high-priestess.jpg',
  'yuksek-rahibe', 'the-high-priestess', 'visoka-svestenica'
);

-- Insert Turkish content for The Fool
INSERT INTO card_content (
  card_id, locale, upright_meaning, reversed_meaning,
  love_interpretation, career_interpretation, money_interpretation,
  spiritual_interpretation, story, keywords, reading_time
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The Fool'),
  'tr',
  'Joker kartı yeni başlangıçları, masumiyeti ve potansiyeli temsil eder. Bu kart, hayatta yeni bir yolculuğa çıkmaya hazır olduğunuzu gösterir. Geçmişin yüklerinden kurtulup, geleceğe umutla bakmanın zamanı gelmiştir.',
  'Ters Joker kartı dikkatsizlik, risk alma ve sorumsuzluk anlamına gelir. Aceleci kararlar vermekten kaçınmalı, daha dikkatli olmalısınız. Yeni başlangıçlar için henüz hazır olmayabilirsiniz.',
  'Aşk hayatınızda yeni bir sayfa açılabilir. Bekar iseniz, yeni bir ilişki başlayabilir. Mevcut ilişkinizde taze bir başlangıç yapabilirsiniz.',
  'Kariyerinizde yeni fırsatlar çıkabilir. Yeni bir iş, proje veya kariyer değişikliği söz konusu olabilir. Cesur adımlar atmanın zamanı gelmiştir.',
  'Para konusunda yeni yatırımlar yapabilirsiniz. Ancak dikkatli olmalı, riskleri hesaplamalısınız. Yeni gelir kaynakları açılabilir.',
  'Ruhsal yolculuğunuzda yeni bir aşamaya geçiyorsunuz. İç sesinizi dinlemek ve sezgilerinize güvenmek önemlidir.',
  'Joker, tarot destesindeki en özel kartlardan biridir. Sıfır numaralı bu kart, hem başlangıcı hem de sonu temsil eder. Mitolojide, Joker genellikle masum bir gezgin olarak tasvir edilir.',
  ARRAY['yeni başlangıç', 'masumiyet', 'potansiyel', 'cesaret', 'umut', 'özgürlük', 'macera', 'keşif'],
  5
);

-- Insert English content for The Fool
INSERT INTO card_content (
  card_id, locale, upright_meaning, reversed_meaning,
  love_interpretation, career_interpretation, money_interpretation,
  spiritual_interpretation, story, keywords, reading_time
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The Fool'),
  'en',
  'The Fool card represents new beginnings, innocence, and potential. This card shows that you are ready to embark on a new journey in life. It is time to let go of the burdens of the past and look to the future with hope.',
  'The reversed Fool card means carelessness, risk-taking, and irresponsibility. You should avoid making hasty decisions and be more careful. You may not be ready for new beginnings yet.',
  'A new chapter may open in your love life. If you are single, a new relationship may begin. You can make a fresh start in your current relationship.',
  'New opportunities may arise in your career. A new job, project, or career change may be in question. It is time to take bold steps.',
  'You can make new investments in money matters. However, you should be careful and calculate the risks. New sources of income may open up.',
  'You are moving to a new stage in your spiritual journey. It is important to listen to your inner voice and trust your intuition.',
  'The Fool is one of the most special cards in the tarot deck. This zero-numbered card represents both the beginning and the end. In mythology, the Fool is often depicted as an innocent traveler.',
  ARRAY['new beginning', 'innocence', 'potential', 'courage', 'hope', 'freedom', 'adventure', 'discovery'],
  5
);

-- Insert Serbian content for The Fool
INSERT INTO card_content (
  card_id, locale, upright_meaning, reversed_meaning,
  love_interpretation, career_interpretation, money_interpretation,
  spiritual_interpretation, story, keywords, reading_time
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The Fool'),
  'sr',
  'Joker karta predstavlja nove početke, nevinost i potencijal. Ova karta pokazuje da ste spremni da krenete na novo putovanje u životu. Vreme je da se oslobodite tereta prošlosti i pogledate u budućnost sa nadom.',
  'Obrnuta Joker karta znači nepažnju, preuzimanje rizika i neodgovornost. Trebalo bi da izbegavate donošenje ishitrenih odluka i budete oprezniji. Možda niste spremni za nove početke.',
  'Može se otvoriti novo poglavlje u vašem ljubavnom životu. Ako ste sami, može početi nova veza. Možete napraviti svež početak u vašoj trenutnoj vezi.',
  'Mogu se pojaviti nove prilike u vašoj karijeri. Može biti u pitanju novi posao, projekat ili promena karijere. Vreme je da napravite hrabre korake.',
  'Možete napraviti nove investicije u novčanim pitanjima. Međutim, trebalo bi da budete oprezni i izračunate rizike. Mogu se otvoriti novi izvori prihoda.',
  'Prelazite u novu fazu u vašem duhovnom putovanju. Važno je da slušate svoj unutrašnji glas i verujete svojoj intuiciji.',
  'Joker je jedna od najposebnijih karata u tarot špilu. Ova karta sa brojem nula predstavlja i početak i kraj. U mitologiji, Joker se često prikazuje kao nevin putnik.',
  ARRAY['novi početak', 'nevinost', 'potencijal', 'hrabrost', 'nada', 'sloboda', 'avantura', 'otkriće'],
  5
);

-- Insert Turkish content for The High Priestess
INSERT INTO card_content (
  card_id, locale, upright_meaning, reversed_meaning,
  love_interpretation, career_interpretation, money_interpretation,
  spiritual_interpretation, story, keywords, reading_time
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The High Priestess'),
  'tr',
  'Yüksek Rahibe kartı sezgileri, gizli bilgiyi ve ruhsal rehberliği temsil eder. Bu kart, iç sesinizi dinlemeniz ve sezgilerinize güvenmeniz gerektiğini gösterir. Bilinçaltınızda saklı olan cevapları bulmanın zamanı gelmiştir.',
  'Ters Yüksek Rahibe kartı sezgilerinizi görmezden gelmek, iç sesinizi susturmak anlamına gelir. Daha fazla düşünmeli ve analiz etmelisiniz. Aceleci kararlar vermekten kaçınmalısınız.',
  'Aşk hayatınızda sezgilerinize güvenin. İç sesiniz size doğru yolu gösterecektir. Mevcut ilişkinizde derinlemesine düşünmeniz gerekebilir.',
  'Kariyerinizde gizli fırsatlar olabilir. Araştırma yapmalı ve bilgi toplamalısınız. Sezgileriniz size rehberlik edecektir.',
  'Para konusunda dikkatli olmalısınız. Gizli mali durumlar olabilir. Araştırma yapmadan yatırım yapmamalısınız.',
  'Ruhsal yolculuğunuzda derinlemesine düşünmeniz gerekiyor. Meditasyon ve iç gözlem yapmalısınız.',
  'Yüksek Rahibe, tarot destesindeki en gizemli kartlardan biridir. Bu kart, bilinçaltı ve sezgileri temsil eder. Mitolojide, Yüksek Rahibe genellikle bilgelik ve gizli bilgi ile ilişkilendirilir.',
  ARRAY['sezgi', 'gizli bilgi', 'ruhsal rehberlik', 'iç ses', 'bilinçaltı', 'meditasyon', 'bilgelik', 'gizem'],
  6
);

-- Insert English content for The High Priestess
INSERT INTO card_content (
  card_id, locale, upright_meaning, reversed_meaning,
  love_interpretation, career_interpretation, money_interpretation,
  spiritual_interpretation, story, keywords, reading_time
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The High Priestess'),
  'en',
  'The High Priestess card represents intuition, hidden knowledge, and spiritual guidance. This card shows that you need to listen to your inner voice and trust your intuition. It is time to find the answers hidden in your subconscious.',
  'The reversed High Priestess card means ignoring your intuition and silencing your inner voice. You need to think more and analyze. You should avoid making hasty decisions.',
  'Trust your intuition in your love life. Your inner voice will show you the right path. You may need to think deeply about your current relationship.',
  'There may be hidden opportunities in your career. You should research and gather information. Your intuition will guide you.',
  'You should be careful about money matters. There may be hidden financial situations. You should not invest without research.',
  'You need to think deeply in your spiritual journey. You should meditate and do inner observation.',
  'The High Priestess is one of the most mysterious cards in the tarot deck. This card represents the subconscious and intuition. In mythology, the High Priestess is often associated with wisdom and hidden knowledge.',
  ARRAY['intuition', 'hidden knowledge', 'spiritual guidance', 'inner voice', 'subconscious', 'meditation', 'wisdom', 'mystery'],
  6
);

-- Insert Serbian content for The High Priestess
INSERT INTO card_content (
  card_id, locale, upright_meaning, reversed_meaning,
  love_interpretation, career_interpretation, money_interpretation,
  spiritual_interpretation, story, keywords, reading_time
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The High Priestess'),
  'sr',
  'Visoka Svestenica karta predstavlja intuiciju, skriveno znanje i duhovno vođstvo. Ova karta pokazuje da treba da slušate svoj unutrašnji glas i verujete svojoj intuiciji. Vreme je da pronađete odgovore skrivene u vašoj podsvesti.',
  'Obrnuta Visoka Svestenica karta znači ignorisanje vaše intuicije i ućutkavanje vašeg unutrašnjeg glasa. Treba da razmišljate više i analizirate. Trebalo bi da izbegavate donošenje ishitrenih odluka.',
  'Verujte svojoj intuiciji u vašem ljubavnom životu. Vaš unutrašnji glas će vam pokazati pravi put. Možda treba da duboko razmišljate o vašoj trenutnoj vezi.',
  'Mogu postojati skrivene prilike u vašoj karijeri. Trebalo bi da istražujete i prikupljate informacije. Vaša intuicija će vas voditi.',
  'Trebalo bi da budete oprezni u novčanim pitanjima. Mogu postojati skrivene finansijske situacije. Ne treba da investirate bez istraživanja.',
  'Treba da duboko razmišljate u vašem duhovnom putovanju. Trebalo bi da meditirate i radite unutrašnje posmatranje.',
  'Visoka Svestenica je jedna od najmisterioznijih karata u tarot špilu. Ova karta predstavlja podsvest i intuiciju. U mitologiji, Visoka Svestenica se često povezuje sa mudrošću i skrivenim znanjem.',
  ARRAY['intuicija', 'skriveno znanje', 'duhovno vođstvo', 'unutrašnji glas', 'podsvest', 'meditacija', 'mudrost', 'misterija'],
  6
);
