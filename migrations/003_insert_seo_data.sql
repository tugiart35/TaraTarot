-- Migration: Insert SEO Data
-- Date: 2025-01-27
-- Description: Insert SEO metadata for sample tarot cards

-- Insert Turkish SEO for The Fool
INSERT INTO card_seo (
  card_id, locale, meta_title, meta_description, canonical_url, og_image, twitter_image, keywords, faq
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The Fool'),
  'tr',
  'Joker Tarot Kartı Anlamı ve Yorumu | Ücretsiz Tarot Okuması',
  'Joker tarot kartının anlamı, yorumu ve hikayesi. Düz ve ters pozisyonlarda Joker kartının aşk, kariyer ve para yorumları. Ücretsiz tarot okuması için hemen başlayın.',
  '/tr/kartlar/joker',
  '/images/tarot-cards/the-fool-og.jpg',
  '/images/tarot-cards/the-fool-twitter.jpg',
  ARRAY['joker tarot', 'tarot kartı', 'joker anlamı', 'tarot yorumu', 'ücretsiz tarot', 'tarot okuması', 'joker hikayesi', 'tarot rehberi'],
  '[
    {
      "question": "Joker tarot kartı ne anlama gelir?",
      "answer": "Joker kartı yeni başlangıçları, masumiyeti ve potansiyeli temsil eder. Hayatta yeni bir yolculuğa çıkmaya hazır olduğunuzu gösterir."
    },
    {
      "question": "Joker kartı aşk hayatında ne anlama gelir?",
      "answer": "Aşk hayatınızda yeni bir sayfa açılabilir. Bekar iseniz, yeni bir ilişki başlayabilir. Mevcut ilişkinizde taze bir başlangıç yapabilirsiniz."
    },
    {
      "question": "Joker kartı kariyerde ne anlama gelir?",
      "answer": "Kariyerinizde yeni fırsatlar çıkabilir. Yeni bir iş, proje veya kariyer değişikliği söz konusu olabilir. Cesur adımlar atmanın zamanı gelmiştir."
    },
    {
      "question": "Joker kartı para konusunda ne anlama gelir?",
      "answer": "Para konusunda yeni yatırımlar yapabilirsiniz. Ancak dikkatli olmalı, riskleri hesaplamalısınız. Yeni gelir kaynakları açılabilir."
    },
    {
      "question": "Joker kartı ruhsal anlamda ne ifade eder?",
      "answer": "Ruhsal yolculuğunuzda yeni bir aşamaya geçiyorsunuz. İç sesinizi dinlemek ve sezgilerinize güvenmek önemlidir."
    }
  ]'::jsonb
);

-- Insert English SEO for The Fool
INSERT INTO card_seo (
  card_id, locale, meta_title, meta_description, canonical_url, og_image, twitter_image, keywords, faq
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The Fool'),
  'en',
  'The Fool Tarot Card Meaning and Interpretation | Free Tarot Reading',
  'The Fool tarot card meaning, interpretation and story. Love, career and money interpretations of The Fool card in upright and reversed positions. Start your free tarot reading now.',
  '/en/cards/the-fool',
  '/images/tarot-cards/the-fool-og.jpg',
  '/images/tarot-cards/the-fool-twitter.jpg',
  ARRAY['the fool tarot', 'tarot card', 'fool meaning', 'tarot interpretation', 'free tarot', 'tarot reading', 'fool story', 'tarot guide'],
  '[
    {
      "question": "What does The Fool tarot card mean?",
      "answer": "The Fool card represents new beginnings, innocence, and potential. It shows that you are ready to embark on a new journey in life."
    },
    {
      "question": "What does The Fool card mean in love?",
      "answer": "A new chapter may open in your love life. If you are single, a new relationship may begin. You can make a fresh start in your current relationship."
    },
    {
      "question": "What does The Fool card mean in career?",
      "answer": "New opportunities may arise in your career. A new job, project, or career change may be in question. It is time to take bold steps."
    },
    {
      "question": "What does The Fool card mean about money?",
      "answer": "You can make new investments in money matters. However, you should be careful and calculate the risks. New sources of income may open up."
    },
    {
      "question": "What does The Fool card mean spiritually?",
      "answer": "You are moving to a new stage in your spiritual journey. It is important to listen to your inner voice and trust your intuition."
    }
  ]'::jsonb
);

-- Insert Serbian SEO for The Fool
INSERT INTO card_seo (
  card_id, locale, meta_title, meta_description, canonical_url, og_image, twitter_image, keywords, faq
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The Fool'),
  'sr',
  'Joker Tarot Karta Značenje i Tumačenje | Besplatno Tarot Čitanje',
  'Joker tarot karta značenje, tumačenje i priča. Ljubav, karijera i novac tumačenja Joker karte u uspravnom i obrnutom položaju. Počnite svoje besplatno tarot čitanje sada.',
  '/sr/kartice/joker',
  '/images/tarot-cards/the-fool-og.jpg',
  '/images/tarot-cards/the-fool-twitter.jpg',
  ARRAY['joker tarot', 'tarot karta', 'joker značenje', 'tarot tumačenje', 'besplatno tarot', 'tarot čitanje', 'joker priča', 'tarot vodič'],
  '[
    {
      "question": "Šta znači Joker tarot karta?",
      "answer": "Joker karta predstavlja nove početke, nevinost i potencijal. Pokazuje da ste spremni da krenete na novo putovanje u životu."
    },
    {
      "question": "Šta znači Joker karta u ljubavi?",
      "answer": "Može se otvoriti novo poglavlje u vašem ljubavnom životu. Ako ste sami, može početi nova veza. Možete napraviti svež početak u vašoj trenutnoj vezi."
    },
    {
      "question": "Šta znači Joker karta u karijeri?",
      "answer": "Mogu se pojaviti nove prilike u vašoj karijeri. Može biti u pitanju novi posao, projekat ili promena karijere. Vreme je da napravite hrabre korake."
    },
    {
      "question": "Šta znači Joker karta o novcu?",
      "answer": "Možete napraviti nove investicije u novčanim pitanjima. Međutim, trebalo bi da budete oprezni i izračunate rizike. Mogu se otvoriti novi izvori prihoda."
    },
    {
      "question": "Šta znači Joker karta duhovno?",
      "answer": "Prelazite u novu fazu u vašem duhovnom putovanju. Važno je da slušate svoj unutrašnji glas i verujete svojoj intuiciji."
    }
  ]'::jsonb
);

-- Insert Turkish SEO for The High Priestess
INSERT INTO card_seo (
  card_id, locale, meta_title, meta_description, canonical_url, og_image, twitter_image, keywords, faq
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The High Priestess'),
  'tr',
  'Yüksek Rahibe Tarot Kartı Anlamı ve Yorumu | Ücretsiz Tarot Okuması',
  'Yüksek Rahibe tarot kartının anlamı, yorumu ve hikayesi. Düz ve ters pozisyonlarda Yüksek Rahibe kartının aşk, kariyer ve para yorumları. Ücretsiz tarot okuması için hemen başlayın.',
  '/tr/kartlar/yuksek-rahibe',
  '/images/tarot-cards/the-high-priestess-og.jpg',
  '/images/tarot-cards/the-high-priestess-twitter.jpg',
  ARRAY['yüksek rahibe tarot', 'tarot kartı', 'yüksek rahibe anlamı', 'tarot yorumu', 'ücretsiz tarot', 'tarot okuması', 'yüksek rahibe hikayesi', 'tarot rehberi'],
  '[
    {
      "question": "Yüksek Rahibe tarot kartı ne anlama gelir?",
      "answer": "Yüksek Rahibe kartı sezgileri, gizli bilgiyi ve ruhsal rehberliği temsil eder. İç sesinizi dinlemeniz ve sezgilerinize güvenmeniz gerektiğini gösterir."
    },
    {
      "question": "Yüksek Rahibe kartı aşk hayatında ne anlama gelir?",
      "answer": "Aşk hayatınızda sezgilerinize güvenin. İç sesiniz size doğru yolu gösterecektir. Mevcut ilişkinizde derinlemesine düşünmeniz gerekebilir."
    },
    {
      "question": "Yüksek Rahibe kartı kariyerde ne anlama gelir?",
      "answer": "Kariyerinizde gizli fırsatlar olabilir. Araştırma yapmalı ve bilgi toplamalısınız. Sezgileriniz size rehberlik edecektir."
    },
    {
      "question": "Yüksek Rahibe kartı para konusunda ne anlama gelir?",
      "answer": "Para konusunda dikkatli olmalısınız. Gizli mali durumlar olabilir. Araştırma yapmadan yatırım yapmamalısınız."
    },
    {
      "question": "Yüksek Rahibe kartı ruhsal anlamda ne ifade eder?",
      "answer": "Ruhsal yolculuğunuzda derinlemesine düşünmeniz gerekiyor. Meditasyon ve iç gözlem yapmalısınız."
    }
  ]'::jsonb
);

-- Insert English SEO for The High Priestess
INSERT INTO card_seo (
  card_id, locale, meta_title, meta_description, canonical_url, og_image, twitter_image, keywords, faq
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The High Priestess'),
  'en',
  'The High Priestess Tarot Card Meaning and Interpretation | Free Tarot Reading',
  'The High Priestess tarot card meaning, interpretation and story. Love, career and money interpretations of The High Priestess card in upright and reversed positions. Start your free tarot reading now.',
  '/en/cards/the-high-priestess',
  '/images/tarot-cards/the-high-priestess-og.jpg',
  '/images/tarot-cards/the-high-priestess-twitter.jpg',
  ARRAY['the high priestess tarot', 'tarot card', 'high priestess meaning', 'tarot interpretation', 'free tarot', 'tarot reading', 'high priestess story', 'tarot guide'],
  '[
    {
      "question": "What does The High Priestess tarot card mean?",
      "answer": "The High Priestess card represents intuition, hidden knowledge, and spiritual guidance. It shows that you need to listen to your inner voice and trust your intuition."
    },
    {
      "question": "What does The High Priestess card mean in love?",
      "answer": "Trust your intuition in your love life. Your inner voice will show you the right path. You may need to think deeply about your current relationship."
    },
    {
      "question": "What does The High Priestess card mean in career?",
      "answer": "There may be hidden opportunities in your career. You should research and gather information. Your intuition will guide you."
    },
    {
      "question": "What does The High Priestess card mean about money?",
      "answer": "You should be careful about money matters. There may be hidden financial situations. You should not invest without research."
    },
    {
      "question": "What does The High Priestess card mean spiritually?",
      "answer": "You need to think deeply in your spiritual journey. You should meditate and do inner observation."
    }
  ]'::jsonb
);

-- Insert Serbian SEO for The High Priestess
INSERT INTO card_seo (
  card_id, locale, meta_title, meta_description, canonical_url, og_image, twitter_image, keywords, faq
) VALUES (
  (SELECT id FROM tarot_cards WHERE english_name = 'The High Priestess'),
  'sr',
  'Visoka Svestenica Tarot Karta Značenje i Tumačenje | Besplatno Tarot Čitanje',
  'Visoka Svestenica tarot karta značenje, tumačenje i priča. Ljubav, karijera i novac tumačenja Visoka Svestenica karte u uspravnom i obrnutom položaju. Počnite svoje besplatno tarot čitanje sada.',
  '/sr/kartice/visoka-svestenica',
  '/images/tarot-cards/the-high-priestess-og.jpg',
  '/images/tarot-cards/the-high-priestess-twitter.jpg',
  ARRAY['visoka svestenica tarot', 'tarot karta', 'visoka svestenica značenje', 'tarot tumačenje', 'besplatno tarot', 'tarot čitanje', 'visoka svestenica priča', 'tarot vodič'],
  '[
    {
      "question": "Šta znači Visoka Svestenica tarot karta?",
      "answer": "Visoka Svestenica karta predstavlja intuiciju, skriveno znanje i duhovno vođstvo. Pokazuje da treba da slušate svoj unutrašnji glas i verujete svojoj intuiciji."
    },
    {
      "question": "Šta znači Visoka Svestenica karta u ljubavi?",
      "answer": "Verujte svojoj intuiciji u vašem ljubavnom životu. Vaš unutrašnji glas će vam pokazati pravi put. Možda treba da duboko razmišljate o vašoj trenutnoj vezi."
    },
    {
      "question": "Šta znači Visoka Svestenica karta u karijeri?",
      "answer": "Mogu postojati skrivene prilike u vašoj karijeri. Trebalo bi da istražujete i prikupljate informacije. Vaša intuicija će vas voditi."
    },
    {
      "question": "Šta znači Visoka Svestenica karta o novcu?",
      "answer": "Trebalo bi da budete oprezni u novčanim pitanjima. Mogu postojati skrivene finansijske situacije. Ne treba da investirate bez istraživanja."
    },
    {
      "question": "Šta znači Visoka Svestenica karta duhovno?",
      "answer": "Treba da duboko razmišljate u vašem duhovnom putovanju. Trebalo bi da meditirate i radite unutrašnje posmatranje."
    }
  ]'::jsonb
);

-- Insert card pages
INSERT INTO card_pages (card_id, locale, slug, path, is_active) VALUES
((SELECT id FROM tarot_cards WHERE english_name = 'The Fool'), 'tr', 'joker', '/tr/kartlar/joker', true),
((SELECT id FROM tarot_cards WHERE english_name = 'The Fool'), 'en', 'the-fool', '/en/cards/the-fool', true),
((SELECT id FROM tarot_cards WHERE english_name = 'The Fool'), 'sr', 'joker', '/sr/kartice/joker', true),
((SELECT id FROM tarot_cards WHERE english_name = 'The High Priestess'), 'tr', 'yuksek-rahibe', '/tr/kartlar/yuksek-rahibe', true),
((SELECT id FROM tarot_cards WHERE english_name = 'The High Priestess'), 'en', 'the-high-priestess', '/en/cards/the-high-priestess', true),
((SELECT id FROM tarot_cards WHERE english_name = 'The High Priestess'), 'sr', 'visoka-svestenica', '/sr/kartice/visoka-svestenica', true);
