import { useState, useEffect } from 'react';

interface CountryInfo {
  country: string;
  countryCode: string;
  phoneCode: string;
}

// Ülke kodları mapping
const countryPhoneCodes: Record<string, string> = {
  'TR': '+90',
  'US': '+1',
  'GB': '+44',
  'DE': '+49',
  'FR': '+33',
  'IT': '+39',
  'ES': '+34',
  'NL': '+31',
  'BE': '+32',
  'CH': '+41',
  'AT': '+43',
  'SE': '+46',
  'NO': '+47',
  'DK': '+45',
  'FI': '+358',
  'RU': '+7',
  'CN': '+86',
  'JP': '+81',
  'KR': '+82',
  'IN': '+91',
  'BR': '+55',
  'AR': '+54',
  'MX': '+52',
  'AE': '+971',
  'SA': '+966',
  'QA': '+974',
  'KW': '+965',
  'BH': '+973',
  'OM': '+968',
  'EG': '+20',
  'MA': '+212',
  'TN': '+216',
  'DZ': '+213',
  'LY': '+218',
  'SD': '+249',
  'ZA': '+27',
  'NG': '+234',
  'KE': '+254',
  'GH': '+233',
  'GM': '+220',
  'SN': '+221',
  'ML': '+223',
  'BF': '+226',
  'NE': '+227',
  'TG': '+228',
  'BJ': '+229',
  'MU': '+230',
  'LR': '+231',
  'SL': '+232',
  'TD': '+235',
  'CF': '+236',
  'CM': '+237',
  'CV': '+238',
  'ST': '+239',
  'GQ': '+240',
  'GA': '+241',
  'CG': '+242',
  'CD': '+243',
  'AO': '+244',
  'GW': '+245',
  'IO': '+246',
  'AC': '+247',
  'SC': '+248',
  'RW': '+250',
  'ET': '+251',
  'SO': '+252',
  'DJ': '+253',
  'TZ': '+255',
  'UG': '+256',
  'BI': '+257',
  'MZ': '+258',
  'ZM': '+260',
  'MG': '+261',
  'RE': '+262',
  'ZW': '+263',
  'NA': '+264',
  'MW': '+265',
  'LS': '+266',
  'BW': '+267',
  'SZ': '+268',
  'KM': '+269',
  'SH': '+290',
  'ER': '+291',
  'AW': '+297',
  'FO': '+298',
  'GL': '+299',
};

export const useCountryDetection = () => {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // İlk olarak localStorage'dan kontrol et
        const cachedCountry = localStorage.getItem('detectedCountry');
        const cacheTime = localStorage.getItem('detectedCountryTime');
        
        if (cachedCountry && cacheTime) {
          const cacheAge = Date.now() - parseInt(cacheTime);
          // Cache 24 saat geçerli
          if (cacheAge < 24 * 60 * 60 * 1000) {
            const country = JSON.parse(cachedCountry);
            setCountryInfo(country);
            setIsLoading(false);
            return;
          }
        }

        // Birden fazla servis dene
        const services = [
          'https://ipapi.co/json/',
          'https://ipinfo.io/json',
          'https://api.country.is/',
          'https://ip-api.com/json/'
        ];

        let countryData: any = null;

        for (const service of services) {
          try {
            const response = await fetch(service, {
              timeout: 5000,
              headers: {
                'Accept': 'application/json',
              }
            } as any);

            if (response.ok) {
              countryData = await response.json();
              break;
            }
          } catch (err) {
            console.warn(`Country detection service failed: ${service}`, err);
            continue;
          }
        }

        if (countryData) {
          let countryCode = '';
          let countryName = '';

          // Farklı servislerin response formatlarını handle et
          if (countryData.country_code) {
            countryCode = countryData.country_code.toUpperCase();
            countryName = countryData.country || countryData.country_name || '';
          } else if (countryData.country) {
            countryCode = countryData.country.toUpperCase();
            countryName = countryData.country_name || '';
          }

          if (countryCode && countryPhoneCodes[countryCode]) {
            const phoneCode = countryPhoneCodes[countryCode];
            const result = {
              country: countryName,
              countryCode: countryCode,
              phoneCode: phoneCode,
            };

            setCountryInfo(result);
            
            // Cache'e kaydet
            localStorage.setItem('detectedCountry', JSON.stringify(result));
            localStorage.setItem('detectedCountryTime', Date.now().toString());
          } else {
            // Varsayılan olarak Türkiye
            const defaultResult = {
              country: 'Turkey',
              countryCode: 'TR',
              phoneCode: '+90',
            };
            setCountryInfo(defaultResult);
          }
        } else {
          // Varsayılan olarak Türkiye
          const defaultResult = {
            country: 'Turkey',
            countryCode: 'TR',
            phoneCode: '+90',
          };
          setCountryInfo(defaultResult);
        }
      } catch (err) {
        console.error('Country detection error:', err);
        setError('Ülke tespit edilemedi');
        
        // Hata durumunda varsayılan olarak Türkiye
        const defaultResult = {
          country: 'Turkey',
          countryCode: 'TR',
          phoneCode: '+90',
        };
        setCountryInfo(defaultResult);
      } finally {
        setIsLoading(false);
      }
    };

    detectCountry();
  }, []);

  return {
    countryInfo,
    isLoading,
    error,
    phoneCodes: countryPhoneCodes,
  };
};
