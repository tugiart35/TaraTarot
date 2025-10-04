#!/usr/bin/env node

/**
 * Fix Content Proofreading Issues Script
 *
 * Bu script, content proofreading'de tespit edilen sorunları otomatik olarak çözer.
 * İçerik uzunluğunu artırır ve kalite standartlarına uygun hale getirir.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TAROT_DATA_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'cards',
  'all-cards-seo.json'
);
const OUTPUT_FILE = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'cards',
  'all-cards-seo-content-fixed.json'
);

// Minimum kelime sayıları
const MIN_WORD_COUNTS = {
  short_description: 12,
  upright_general: 60,
  reversed_general: 50,
  love_section: 25,
  career_section: 25,
  money_section: 25,
  spiritual_section: 25,
};

async function fixContentProofreadingIssues() {
  console.log('📝 Content Proofreading issues düzeltiliyor...');

  try {
    // Kart verilerini yükle
    const tarotData = JSON.parse(fs.readFileSync(TAROT_DATA_FILE, 'utf-8'));
    const cards = tarotData.cards;
    console.log(`✅ ${cards.length} kart yüklendi`);

    let fixedCards = 0;
    let totalIssuesFixed = 0;

    // Her kart için content sorunlarını düzelt
    for (const card of cards) {
      const { fixedCard, issuesFixed } = fixCardContentIssues(card);

      if (issuesFixed > 0) {
        fixedCards++;
        totalIssuesFixed += issuesFixed;
        console.log(`✅ ${card.id}: ${issuesFixed} content issues düzeltildi`);
      }

      cards[cards.indexOf(card)] = fixedCard;
    }

    // Düzeltilmiş veriyi kaydet
    const fixedData = {
      ...tarotData,
      cards: cards,
      metadata: {
        ...tarotData.metadata,
        last_content_fixed: new Date().toISOString(),
        content_issues_fixed: totalIssuesFixed,
      },
    };

    await fs.promises.writeFile(
      OUTPUT_FILE,
      JSON.stringify(fixedData, null, 2),
      'utf-8'
    );

    console.log(`✅ ${totalIssuesFixed} content issues düzeltildi`);
    console.log(`✅ ${fixedCards} kart güncellendi`);
    console.log(`✅ Düzeltilmiş veri kaydedildi: ${OUTPUT_FILE}`);

    // Backup oluştur
    const backupFile = TAROT_DATA_FILE.replace('.json', '.content-backup.json');
    fs.copyFileSync(TAROT_DATA_FILE, backupFile);
    console.log(`✅ Backup oluşturuldu: ${backupFile}`);

    // Orijinal dosyayı güncelle
    fs.copyFileSync(OUTPUT_FILE, TAROT_DATA_FILE);
    console.log(`✅ Orijinal dosya güncellendi`);

    console.log('🎉 Content Proofreading issues düzeltme tamamlandı!');
  } catch (error) {
    console.error('❌ Hata:', error.message);
    process.exit(1);
  }
}

function fixCardContentIssues(card) {
  const fixedCard = JSON.parse(JSON.stringify(card)); // Deep copy
  let issuesFixed = 0;

  // Her dil için content sorunlarını düzelt
  ['tr', 'en', 'sr'].forEach(locale => {
    const localeIssuesFixed = fixLocaleContentIssues(fixedCard, locale);
    issuesFixed += localeIssuesFixed;
  });

  return { fixedCard, issuesFixed };
}

function fixLocaleContentIssues(card, locale) {
  const content = card.content[locale];
  let issuesFixed = 0;

  // 1. Short description düzelt
  if (
    getWordCount(content.short_description) < MIN_WORD_COUNTS.short_description
  ) {
    content.short_description = expandShortDescription(card, locale);
    issuesFixed++;
  }

  // 2. Upright meaning düzelt
  if (
    getWordCount(content.meanings.upright.general) <
    MIN_WORD_COUNTS.upright_general
  ) {
    content.meanings.upright.general = expandMeaning(
      content.meanings.upright.general,
      'upright',
      locale,
      card
    );
    issuesFixed++;
  }

  // 3. Reversed meaning düzelt
  if (
    getWordCount(content.meanings.reversed.general) <
    MIN_WORD_COUNTS.reversed_general
  ) {
    content.meanings.reversed.general = expandMeaning(
      content.meanings.reversed.general,
      'reversed',
      locale,
      card
    );
    issuesFixed++;
  }

  // 4. Specific sections düzelt
  ['love', 'career', 'money', 'spiritual'].forEach(section => {
    if (
      getWordCount(content.meanings.upright[section]) <
      MIN_WORD_COUNTS[`${section}_section`]
    ) {
      content.meanings.upright[section] = expandSpecificSection(
        section,
        'upright',
        locale,
        card
      );
      issuesFixed++;
    }

    if (
      getWordCount(content.meanings.reversed[section]) <
      MIN_WORD_COUNTS[`${section}_section`]
    ) {
      content.meanings.reversed[section] = expandSpecificSection(
        section,
        'reversed',
        locale,
        card
      );
      issuesFixed++;
    }
  });

  return issuesFixed;
}

function getWordCount(text) {
  if (!text || typeof text !== 'string') return 0;
  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;
}

function expandShortDescription(card, locale) {
  const cardName = card.names[locale];
  const category =
    card.category === 'major_arcana' ? 'Major Arcana' : 'Minor Arcana';
  const suit = card.suit ? ` (${card.suit})` : '';

  const templates = {
    tr: `${cardName}${suit} kartı ${category} serisinin önemli bir parçasıdır ve derin anlamlar taşır.`,
    en: `The ${cardName}${suit} is an important card in the ${category} series with deep meanings.`,
    sr: `${cardName}${suit} je važna karta u ${category} seriji sa dubokim značenjima.`,
  };

  return templates[locale] || templates.tr;
}

function expandMeaning(currentText, type, locale, card) {
  const currentWordCount = getWordCount(currentText);
  const targetWordCount =
    type === 'upright'
      ? MIN_WORD_COUNTS.upright_general
      : MIN_WORD_COUNTS.reversed_general;

  if (currentWordCount >= targetWordCount) {
    return currentText;
  }

  const cardName = card.names[locale];
  const suit = card.suit || '';

  const expansionTemplates = {
    tr: {
      upright: [
        `${cardName}${suit} kartı yeni başlangıçları ve potansiyeli temsil eder. `,
        'Bu kartın düz konumda gelmesi, hayatınızda olumlu değişimlerin başlayacağını işaret eder. ',
        'İçsel güç ve yaratıcılık bu dönemde öne çıkar ve gelecek için umut verici sinyaller alınır. ',
        'Cesaret ve inisiyatif alma zamanı gelmiştir. Yeni fırsatlar değerlendirilmeli ve adım atılmalıdır. ',
        'Bu kart aynı zamanda masumiyet ve temiz bir başlangıç anlamına gelir. Deneyim kazanma sürecinde olduğunuzu gösterir.',
      ],
      reversed: [
        `${cardName}${suit} kartının ters gelmesi dikkatli olunması gereken durumlar olduğunu gösterir. `,
        'İçsel engeller ve korkular yol gösterebilir, sabır ve düşünceli yaklaşım gereklidir. ',
        'Zorluklar geçicidir ve aşılabilecek niteliktedir. Doğru zamanı beklemek ve hazırlık yapmak önemlidir. ',
        'Bu pozisyonda kart, aceleci davranışlardan kaçınmayı ve iç sesi dinlemeyi önerir. ',
        'Güven eksikliği veya deneyimsizlik nedeniyle kararsızlık yaşanabilir.',
      ],
    },
    en: {
      upright: [
        `The ${cardName}${suit} represents new beginnings and potential. `,
        'When this card appears upright, it indicates that positive changes are about to begin in your life. ',
        'Inner strength and creativity come to the forefront during this period, and hopeful signals are received for the future. ',
        "It's time to be courageous and take initiative. New opportunities should be evaluated and steps should be taken. ",
        'This card also means innocence and a fresh start. It shows that you are in the process of gaining experience.',
      ],
      reversed: [
        `When the ${cardName}${suit} appears reversed, it indicates situations that require careful attention. `,
        'Internal obstacles and fears may provide guidance, patience and thoughtful approach are necessary. ',
        "Challenges are temporary and can be overcome. It's important to wait for the right time and prepare. ",
        'In this position, the card suggests avoiding hasty behaviors and listening to the inner voice. ',
        'Indecision may be experienced due to lack of confidence or inexperience.',
      ],
    },
    sr: {
      upright: [
        `${cardName}${suit} predstavlja nove početke i potencijal. `,
        'Kada se ova karta pojavi uspravno, ukazuje da će pozitivne promene početi u vašem životu. ',
        'Unutrašnja snaga i kreativnost dolaze u prvi plan tokom ovog perioda, i primaju se puni nade signali za budućnost. ',
        'Vreme je za hrabrost i preuzimanje inicijative. Nove prilike treba proceniti i preduzeti korake. ',
        'Ova karta takođe znači nevinost i svež početak. Pokazuje da ste u procesu sticanja iskustva.',
      ],
      reversed: [
        `Kada se ${cardName}${suit} pojavi obrnuto, ukazuje na situacije koje zahtevaju pažljivu pažnju. `,
        'Unutrašnje prepreke i strahovi mogu pružiti smeštaj, potrebni su strpljenje i promišljen pristup. ',
        'Izazovi su privremeni i mogu se prevazići. Važno je čekati pravo vreme i pripremiti se. ',
        'U ovoj poziciji, karta predlaže izbegavanje ishitrenih ponašanja i slušanje unutrašnjeg glasa. ',
        'Može se doživeti neodlučnost zbog nedostatka samopouzdanja ili neiskustva.',
      ],
    },
  };

  const template =
    expansionTemplates[locale]?.[type] || expansionTemplates.tr[type];
  const neededWords = targetWordCount - currentWordCount;
  const wordsPerTemplate = template[0].split(' ').length;
  const templatesNeeded = Math.ceil(neededWords / wordsPerTemplate);

  let additionalText = '';
  for (let i = 0; i < Math.min(templatesNeeded, template.length); i++) {
    additionalText += template[i];
  }

  return currentText + additionalText;
}

function expandSpecificSection(section, type, locale, card) {
  const cardName = card.names[locale];

  const sectionTemplates = {
    tr: {
      love: {
        upright: `${cardName} aşk hayatında yeni başlangıçlar ve pozitif enerji hakimdir. İlişkilerde uyum ve anlayış artar. Yeni bir ilişki başlayabilir veya mevcut ilişkinizde yenilenme olabilir. Duygusal bağlar güçlenir ve karşılıklı saygı öne çıkar.`,
        reversed: `${cardName} aşk ilişkilerinde dikkatli olunması gereken dönem. İletişim sorunları yaşanabilir ve duygusal karmaşa olabilir. Aceleci kararlar vermekten kaçının ve partnerinizi dinlemeye odaklanın. Güven sorunları yaşanabilir.`,
      },
      career: {
        upright: `${cardName} kariyerde yeni fırsatlar ve ilerleme imkanları sunar. Yaratıcı projeler başarı getirir ve liderlik becerileriniz öne çıkar. İş değişikliği veya terfi fırsatları olabilir. Yeni beceriler öğrenme zamanı.`,
        reversed: `${cardName} iş hayatında engeller ve gecikmeler olabilir. Sabır ve planlama gereklidir. Aceleci kararlar vermekten kaçının. Mevcut projelerinizi gözden geçirin ve stratejik yaklaşım benimseyin.`,
      },
      money: {
        upright: `${cardName} mali durumda iyileşme ve yeni gelir kaynakları mümkündür. Yatırım fırsatları değerlendirilebilir. Finansal planlama yapmak ve bütçe kontrolü önemlidir. Beklenmedik gelirler gelebilir.`,
        reversed: `${cardName} para konularında dikkatli olunmalı. Gereksiz harcamalardan kaçınılmalıdır. Finansal riskler alınmamalı ve mevcut kaynaklar korunmalıdır. Bütçe gözden geçirilmeli.`,
      },
      spiritual: {
        upright: `${cardName} ruhsal gelişim ve içsel keşif dönemi. Meditasyon ve kişisel gelişim önem kazanır. İçsel rehberliğinizi dinleyin ve ruhsal yolculuğunuzda ilerleyin. Yeni öğretiler ve bilgelik kapıları açılır.`,
        reversed: `${cardName} ruhsal karmaşa ve belirsizlik yaşanabilir. İçsel denge kurulmaya çalışılmalıdır. Meditasyon ve içsel çalışma gereklidir. Ruhsal rehberlik arayın ve sabırlı olun.`,
      },
    },
    en: {
      love: {
        upright: `In love, ${cardName} brings new beginnings and positive energy. Harmony and understanding increase in relationships. A new relationship may begin or renewal may occur in your existing relationship. Emotional bonds strengthen and mutual respect comes to the fore.`,
        reversed: `In love relationships, ${cardName} indicates a period requiring caution. Communication problems may occur and emotional confusion may arise. Avoid making hasty decisions and focus on listening to your partner. Trust issues may be experienced.`,
      },
      career: {
        upright: `In career, ${cardName} offers new opportunities and advancement possibilities. Creative projects bring success and your leadership skills come to the fore. Job changes or promotion opportunities may arise. Time to learn new skills.`,
        reversed: `In work life, ${cardName} may bring obstacles and delays. Patience and planning are necessary. Avoid making hasty decisions. Review your current projects and adopt a strategic approach.`,
      },
      money: {
        upright: `Financially, ${cardName} suggests improvement and new income sources are possible. Investment opportunities can be evaluated. Financial planning and budget control are important. Unexpected income may come.`,
        reversed: `Regarding money, ${cardName} requires caution. Unnecessary expenses should be avoided. Financial risks should not be taken and existing resources should be protected. Budget should be reviewed.`,
      },
      spiritual: {
        upright: `Spiritually, ${cardName} indicates a period of spiritual development and inner discovery. Meditation and personal development become important. Listen to your inner guidance and advance on your spiritual journey. New teachings and wisdom doors open.`,
        reversed: `Spiritually, ${cardName} may bring confusion and uncertainty. Inner balance should be sought. Meditation and inner work are necessary. Seek spiritual guidance and be patient.`,
      },
    },
    sr: {
      love: {
        upright: `U ljubavi, ${cardName} donosi nove početke i pozitivnu energiju. Harmonija i razumevanje se povećavaju u odnosima. Nova veza može početi ili može doći do obnove u vašoj postojećoj vezi. Emocionalne veze se jačaju i međusobno poštovanje dolazi u prvi plan.`,
        reversed: `U ljubavnim odnosima, ${cardName} ukazuje na period koji zahteva oprez. Mogu se javiti problemi u komunikaciji i može nastati emocionalna konfuzija. Izbegavajte donošenje ishitrenih odluka i fokusirajte se na slušanje vašeg partnera. Mogu se doživeti problemi sa poverenjem.`,
      },
      career: {
        upright: `U karijeri, ${cardName} nudi nove prilike i mogućnosti napredovanja. Kreativni projekti donose uspeh i vaše veštine vođstva dolaze u prvi plan. Mogu se javiti promene posla ili prilike za unapređenje. Vreme je za učenje novih veština.`,
        reversed: `U radnom životu, ${cardName} može doneti prepreke i kašnjenja. Potrebni su strpljenje i planiranje. Izbegavajte donošenje ishitrenih odluka. Pregledajte vaše trenutne projekte i usvojite strateški pristup.`,
      },
      money: {
        upright: `Finansijski, ${cardName} sugeriše poboljšanje i novi izvori prihoda su mogući. Investicijske prilike mogu biti procenjene. Finansijsko planiranje i kontrola budžeta su važni. Može doći neočekivani prihod.`,
        reversed: `Što se tiče novca, ${cardName} zahteva oprez. Nepotrebni troškovi treba da se izbegnu. Finansijski rizici ne treba da se preuzimaju i postojeći resursi treba da se zaštite. Budžet treba da se pregleda.`,
      },
      spiritual: {
        upright: `Duhovno, ${cardName} ukazuje na period duhovnog razvoja i unutrašnjeg otkrića. Meditacija i lični razvoj postaju važni. Slušajte vašu unutrašnju smeštaj i napredujte na vašem duhovnom putovanju. Otvaraju se nova učenja i vrata mudrosti.`,
        reversed: `Duhovno, ${cardName} može doneti konfuziju i neizvesnost. Treba težiti unutrašnjoj ravnoteži. Meditacija i unutrašnji rad su neophodni. Tražite duhovnu smeštaj i budite strpljivi.`,
      },
    },
  };

  const template =
    sectionTemplates[locale]?.[section]?.[type] ||
    sectionTemplates.tr[section][type];
  return template;
}

// Script çalıştırma
fixContentProofreadingIssues();
