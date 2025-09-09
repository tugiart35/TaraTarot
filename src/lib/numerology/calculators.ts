/**
 * Numeroloji hesaplama fonksiyonları
 * Pythagorean numeroloji sistemi ile hesaplamalar
 */

import { NumerologyType, NumerologyResult, MASTER_NUMBERS } from './types';
import { getBirthdayNumberMeaning, getLifePathNumberMeaning, getExpressionNumberMeaning, getPersonalityNumberMeaning, getMaturityNumberMeaning, getPinnacleNumberMeaning, getChallengeNumberMeaning, getPersonalYearNumberMeaning, getCompatibilityNumberMeaning } from './meanings';
import { 
  sumNameValues, 
  sumVowelValues, 
  sumConsonantValues,
  sumDateDigits, 
  reduceToSingleDigit,
  normalizeName,
  normalizeDate,
  extractDateParts,
  getBirthdayNumber,
  getAbsoluteDifference,
  getLetterValue
} from './normalize';

/**
 * Yaşam Yolu sayısını hesaplar
 * Doğum tarihinin rakamlarını toplar ve tek haneye indirger
 */
export function calculateLifePath(birthDate: string, locale: string = 'tr'): NumerologyResult {
  const sum = sumDateDigits(birthDate);
  const number = reduceToSingleDigit(sum);
  const isMasterNumber = MASTER_NUMBERS.includes(number as any);
  
  const lifePathMeaning = getLifePathNumberMeaning(number);
  
  // Fallback açıklama
  const fallbackDescription = locale === 'en' 
    ? 'Shows the main lesson and journey theme in your life.'
    : locale === 'sr'
    ? 'Pokazuje glavnu lekciju i temu putovanja u vašem životu.'
    : 'Yaşam amacınızı ve öğrenmeniz gereken dersleri gösterir.';

  return {
    number,
    isMasterNumber,
    description: lifePathMeaning || fallbackDescription,
    type: 'life-path'
  };
}

/**
 * İfade/Kader sayısını hesaplar
 * İsmin tüm harflerinin değerlerini toplar
 */
export function calculateExpressionDestiny(fullName: string, locale: string = 'tr'): NumerologyResult {
  const sum = sumNameValues(fullName);
  const number = reduceToSingleDigit(sum);
  const isMasterNumber = MASTER_NUMBERS.includes(number as any);
  
  const expressionMeaning = getExpressionNumberMeaning(number);
  
  const normalizedName = normalizeName(fullName);

  // Fallback açıklama
  const fallbackDescription = locale === 'en' 
    ? 'Shows your natural talents and direction in life.'
    : locale === 'sr'
    ? 'Pokazuje vaše prirodne talente i smer u životu.'
    : 'Doğal yeteneklerinizi ve hayattaki yönünüzü gösterir.';

  return {
    number,
    isMasterNumber,
    description: expressionMeaning || fallbackDescription,
    type: 'expression-destiny'
  };
}

/**
 * Ruh Arzusu sayısını hesaplar
 * İsmin sesli harflerinin değerlerini toplar
 */
export function calculateSoulUrge(fullName: string): NumerologyResult {
  const sum = sumVowelValues(fullName);
  const number = reduceToSingleDigit(sum);
  const isMasterNumber = MASTER_NUMBERS.includes(number as any);
  
  const normalizedName = normalizeName(fullName);
  const vowels = normalizedName.split('').filter(letter => ['A', 'E', 'I', 'O', 'U', 'Y'].includes(letter));
  
  return {
    number,
    isMasterNumber,
    description: 'İç dünyanızı ve gerçek arzularınızı gösterir.',
    type: 'soul-urge'
  };
}

/**
 * Kişilik sayısını hesaplar
 * İsmin ünsüz harflerinin değerlerini toplar
 */
export function calculatePersonality(fullName: string, locale: string = 'tr'): NumerologyResult {
  const sum = sumConsonantValues(fullName);
  const number = reduceToSingleDigit(sum);
  const isMasterNumber = MASTER_NUMBERS.includes(number as any);
  
  const normalizedName = normalizeName(fullName);
  const consonants = normalizedName.split('').filter(letter => !['A', 'E', 'I', 'O', 'U'].includes(letter));
  
  // Kişilik sayısı anlamını al
  const personalityMeaning = getPersonalityNumberMeaning(number);
  let description = 'Dışarıdan nasıl algılandığınızı ve ilk izlenim kimyanızı gösterir.';
  
  if (personalityMeaning) {
    description = personalityMeaning;
  } else {
    // Fallback açıklamalar
    const fallbackDescriptions: Record<string, string> = {
      'en': 'Shows how you are perceived from the outside and your first impression chemistry.',
      'sr': 'Pokazuje kako ste percipirani spolja i vašu hemiju prvog utiska.'
    };
    description = fallbackDescriptions[locale] || description;
  }

  return {
    number,
    isMasterNumber,
    description,
    type: 'personality'
  };
}

/**
 * Doğum günü sayısını hesaplar
 * Ayın kaçında doğduğunuzu gösterir
 */
export function calculateBirthdayNumber(birthDate: string, locale: string = 'tr'): NumerologyResult {
  const { day } = extractDateParts(birthDate);
  const number = getBirthdayNumber(day);
  const isMasterNumber = MASTER_NUMBERS.includes(number as any);
  
  // Lokalizasyon için doğum günü anlamını al
  const birthdayMeaning = getBirthdayNumberMeaning(number);
  
  // Fallback açıklama
  const fallbackDescription = locale === 'en' 
    ? 'Shows your natural gifts and talents from birth.'
    : locale === 'sr'
    ? 'Pokazuje vaše prirodne darove i talente od rođenja.'
    : 'Doğuştan gelen doğal hediyelerinizi ve yeteneklerinizi gösterir.';

  return {
    number,
    isMasterNumber,
    description: birthdayMeaning || fallbackDescription,
    type: 'birthday-number'
  };
}

/**
 * Olgunluk sayısını hesaplar
 * İfade + Yaşam Yolu toplamı
 */
export function calculateMaturity(lifePathNumber: number, expressionNumber: number, locale: string = 'tr'): NumerologyResult {
  const sum = lifePathNumber + expressionNumber;
  const number = reduceToSingleDigit(sum);
  const isMasterNumber = MASTER_NUMBERS.includes(number as any);
  
  // Olgunluk sayısı anlamını al
  const maturityMeaning = getMaturityNumberMeaning(number);
  let description = '35+ yaş sonrası ana temanızı ve olgunluk döneminizdeki odaklanma alanınızı gösterir.';
  
  if (maturityMeaning) {
    description = maturityMeaning;
  } else {
    // Fallback açıklamalar
    const fallbackDescriptions: Record<string, string> = {
      'en': 'Shows your main theme after age 35+ and your focus area in your maturity period.',
      'sr': 'Pokazuje vašu glavnu temu nakon 35+ godina i vašu oblast fokusa u periodu zrelosti.'
    };
    description = fallbackDescriptions[locale] || description;
  }

  return {
    number,
    isMasterNumber,
    description,
    type: 'maturity'
  };
}

/**
 * Zirveler ve Zorluklar hesaplar
 * Hayatı dönemlere böler
 */
export function calculatePinnaclesChallenges(birthDate: string, locale: string = 'tr'): NumerologyResult {
  const { month, day, year } = extractDateParts(birthDate);
  
  // Zirveler
  const pinnacle1 = reduceToSingleDigit(month + day);
  const pinnacle2 = reduceToSingleDigit(day + year);
  const pinnacle3 = reduceToSingleDigit(pinnacle1 + pinnacle2);
  const pinnacle4 = reduceToSingleDigit(month + year);
  
  // Zorluklar
  const challenge1 = reduceToSingleDigit(getAbsoluteDifference(month, day));
  const challenge2 = reduceToSingleDigit(getAbsoluteDifference(day, year));
  const challenge3 = reduceToSingleDigit(getAbsoluteDifference(challenge1, challenge2));
  const challenge4 = reduceToSingleDigit(getAbsoluteDifference(month, year));
  
  // Zirve açıklamalarını al
  const pinnacle1Meaning = getPinnacleNumberMeaning(pinnacle1);
  const pinnacle2Meaning = getPinnacleNumberMeaning(pinnacle2);
  const pinnacle3Meaning = getPinnacleNumberMeaning(pinnacle3);
  const pinnacle4Meaning = getPinnacleNumberMeaning(pinnacle4);
  
  // Zorluk açıklamalarını al
  const challenge1Meaning = getChallengeNumberMeaning(challenge1);
  const challenge2Meaning = getChallengeNumberMeaning(challenge2);
  const challenge3Meaning = getChallengeNumberMeaning(challenge3);
  const challenge4Meaning = getChallengeNumberMeaning(challenge4);
  
  const pinnacles = [
    { 
      period: '0-27 yaş', 
      number: pinnacle1, 
      description: pinnacle1Meaning || 'İlk dönem teması'
    },
    { 
      period: '28-36 yaş', 
      number: pinnacle2, 
      description: pinnacle2Meaning || 'İkinci dönem teması'
    },
    { 
      period: '37-45 yaş', 
      number: pinnacle3, 
      description: pinnacle3Meaning || 'Üçüncü dönem teması'
    },
    { 
      period: '46+ yaş', 
      number: pinnacle4, 
      description: pinnacle4Meaning || 'Son dönem teması'
    }
  ];
  
  const challenges = [
    { 
      period: '0-27 yaş', 
      number: challenge1, 
      description: challenge1Meaning || 'İlk dönem sınavı'
    },
    { 
      period: '28-36 yaş', 
      number: challenge2, 
      description: challenge2Meaning || 'İkinci dönem sınavı'
    },
    { 
      period: '37-45 yaş', 
      number: challenge3, 
      description: challenge3Meaning || 'Üçüncü dönem sınavı'
    },
    { 
      period: '46+ yaş', 
      number: challenge4, 
      description: challenge4Meaning || 'Son dönem sınavı'
    }
  ];
  

  // Ana açıklama
  let description = 'Hayatınızı dönemlere böler ve her dönemin teması ile sınavını gösterir.';
  const fallbackDescriptions: Record<string, string> = {
    'en': 'Divides your life into periods and shows the theme and challenge of each period.',
    'sr': 'Deli vaš život na periode i pokazuje temu i izazov svakog perioda.'
  };
  description = fallbackDescriptions[locale] || description;

  return {
    number: 0, // Bu analiz için ana sayı yok
    isMasterNumber: false,
    description,
    type: 'pinnacles-challenges',
    pinnacles,
    challenges
  };
}

/**
 * Kişisel döngüler hesaplar
 * Yıllık, aylık, günlük enerji takvimi
 */
export function calculatePersonalCycles(birthDate: string, targetDate: string, locale: string = 'tr'): NumerologyResult {
  const { month: birthMonth, day: birthDay } = extractDateParts(birthDate);
  const { month: targetMonth, day: targetDay, year: targetYear } = extractDateParts(targetDate);
  
  // Kişisel yıl
  const personalYear = reduceToSingleDigit(birthMonth + birthDay + sumDateDigits(targetDate));
  
  // Kişisel ay
  const personalMonth = reduceToSingleDigit(personalYear + targetMonth);
  
  // Kişisel gün
  const personalDay = reduceToSingleDigit(personalMonth + targetDay);
  
  // Kişisel yıl açıklamasını al
  const personalYearMeaning = getPersonalYearNumberMeaning(personalYear);
  

  // Ana açıklama
  let description = 'Yıllık, aylık ve günlük enerji takviminizi gösterir.';
  const fallbackDescriptions: Record<string, string> = {
    'en': 'Shows your annual, monthly, and daily energy calendar.',
    'sr': 'Pokazuje vaš godišnji, mesečni i dnevni energetski kalendar.'
  };
  description = fallbackDescriptions[locale] || description;

  // Kişisel yıl açıklaması varsa ekle
  if (personalYearMeaning) {
    description += `\n\n**Kişisel Yıl ${personalYear}:**\n${personalYearMeaning}`;
  }

  return {
    number: personalYear,
    isMasterNumber: MASTER_NUMBERS.includes(personalYear as any),
    description,
    type: 'personal-cycles',
    personalYear,
    personalMonth,
    personalDay
  };
}

/**
 * Uyum analizi hesaplar
 * İki kişinin uyumunu değerlendirir
 */
export function calculateCompatibility(
  personA: { birthDate: string; fullName: string },
  personB: { birthDate: string; fullName: string },
  locale: string = 'tr'
): NumerologyResult {
  // Her kişi için ana sayıları hesapla
  const lifePathA = calculateLifePath(personA.birthDate);
  const expressionA = calculateExpressionDestiny(personA.fullName);
  const soulUrgeA = calculateSoulUrge(personA.fullName);
  const personalityA = calculatePersonality(personA.fullName);
  
  const lifePathB = calculateLifePath(personB.birthDate);
  const expressionB = calculateExpressionDestiny(personB.fullName);
  const soulUrgeB = calculateSoulUrge(personB.fullName);
  const personalityB = calculatePersonality(personB.fullName);
  
  // Uyum skorunu hesapla
  let score = 0;
  const notes: string[] = [];
  
  // Yaşam yolu uyumu
  if (lifePathA.number === lifePathB.number) {
    score += 25;
    notes.push('Aynı yaşam yolu sayısı - güçlü anlayış');
  } else if (Math.abs(lifePathA.number - lifePathB.number) <= 1) {
    score += 20;
    notes.push('Uyumlu yaşam yolu sayıları');
  } else {
    score += 10;
    notes.push('Farklı yaşam yolu sayıları - çeşitlilik');
  }
  
  // İfade uyumu
  if (expressionA.number === expressionB.number) {
    score += 25;
    notes.push('Aynı ifade sayısı - benzer yetenekler');
  } else if (Math.abs(expressionA.number - expressionB.number) <= 1) {
    score += 20;
    notes.push('Uyumlu ifade sayıları');
  } else {
    score += 10;
    notes.push('Farklı ifade sayıları - tamamlayıcılık');
  }
  
  // Ruh arzusu uyumu
  if (soulUrgeA.number === soulUrgeB.number) {
    score += 25;
    notes.push('Aynı ruh arzusu - derin bağlantı');
  } else if (Math.abs(soulUrgeA.number - soulUrgeB.number) <= 1) {
    score += 20;
    notes.push('Uyumlu ruh arzuları');
  } else {
    score += 10;
    notes.push('Farklı ruh arzuları - denge');
  }
  
  // Kişilik uyumu
  if (personalityA.number === personalityB.number) {
    score += 25;
    notes.push('Aynı kişilik sayısı - benzer dış görünüm');
  } else if (Math.abs(personalityA.number - personalityB.number) <= 1) {
    score += 20;
    notes.push('Uyumlu kişilik sayıları');
  } else {
    score += 10;
    notes.push('Farklı kişilik sayıları - çekicilik');
  }
  
  // Genel uyum sayısı
  const compatibilityNumber = reduceToSingleDigit(score);
  
  // Uyum sayısı açıklamasını al
  const compatibilityMeaning = getCompatibilityNumberMeaning(compatibilityNumber);
  

  // Ana açıklama
  let description = 'İki kişi arasındaki numerolojik uyumu analiz eder.';
  const fallbackDescriptions: Record<string, string> = {
    'en': 'Analyzes the numerological compatibility between two people.',
    'sr': 'Analizira numerološku kompatibilnost između dve osobe.'
  };
  description = fallbackDescriptions[locale] || description;

  // Uyum sayısı açıklaması varsa ekle
  if (compatibilityMeaning) {
    description += `\n\n**Uyum Sayısı ${compatibilityNumber}:**\n${compatibilityMeaning}`;
  }

  return {
    number: compatibilityNumber,
    isMasterNumber: MASTER_NUMBERS.includes(compatibilityNumber as any),
    description,
    type: 'compatibility',
    compatibilityScore: score,
    compatibilityNotes: notes
  };
}

/**
 * Numeroloji tipine göre hesaplama yapar
 */
export function calculateNumerology(
  type: NumerologyType, 
  input: { 
    fullName?: string; 
    birthDate?: string; 
    date?: string;
    targetDate?: string;
    personA?: { birthDate: string; fullName: string };
    personB?: { birthDate: string; fullName: string };
  },
  locale: string = 'tr'
): NumerologyResult {
  switch (type) {
    case 'life-path':
      if (!input.birthDate) throw new Error('Doğum tarihi gerekli');
      return calculateLifePath(input.birthDate, locale);
    
    case 'expression-destiny':
      if (!input.fullName) throw new Error('İsim gerekli');
      return calculateExpressionDestiny(input.fullName, locale);
    
    case 'soul-urge':
      if (!input.fullName) throw new Error('İsim gerekli');
      return calculateSoulUrge(input.fullName);
    
    case 'personality':
      if (!input.fullName) throw new Error('İsim gerekli');
      return calculatePersonality(input.fullName, locale);
    
    case 'birthday-number':
      if (!input.birthDate) throw new Error('Doğum tarihi gerekli');
      return calculateBirthdayNumber(input.birthDate, locale);
    
    case 'maturity':
      if (!input.birthDate || !input.fullName) throw new Error('Doğum tarihi ve isim gerekli');
      const lifePath = calculateLifePath(input.birthDate);
      const expression = calculateExpressionDestiny(input.fullName);
      return calculateMaturity(lifePath.number, expression.number, locale);
    
    case 'pinnacles-challenges':
      if (!input.birthDate) throw new Error('Doğum tarihi gerekli');
      return calculatePinnaclesChallenges(input.birthDate, locale);
    
    case 'personal-cycles':
      if (!input.birthDate || !input.targetDate) throw new Error('Doğum tarihi ve hedef tarih gerekli');
      return calculatePersonalCycles(input.birthDate, input.targetDate, locale);
    
    case 'compatibility':
      if (!input.personA || !input.personB) throw new Error('İki kişinin bilgileri gerekli');
      return calculateCompatibility(input.personA, input.personB, locale);
    
    default:
      throw new Error('Geçersiz numeroloji tipi');
  }
}
