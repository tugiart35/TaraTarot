/**
 * ESLint Konfigürasyonu
 * Bu dosya kod kalitesi ve stil standartlarını belirler
 * Next.js, React, TypeScript ve Tailwind CSS için optimize edilmiştir
 */

module.exports = {
  // Temel ESLint ortamı
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  // Genişletilen konfigürasyonlar - Next.js temel konfigürasyonu
  extends: [
    'next/core-web-vitals',
    'prettier', // Prettier kuralları
  ],

  // Kullanılan eklentiler
  plugins: ['prettier'],

  // Özel kurallar
  rules: {
    // Prettier hatalarını ESLint hatası olarak göster
    'prettier/prettier': 'error',

    // React kuralları (Next.js otomatik sağlar)
    'react/react-in-jsx-scope': 'off', // Next.js'te gerekli değil

    // Genel kod kalitesi kuralları
    'no-console': 'warn', // console.log uyarısı
    'no-debugger': 'error', // debugger kullanımını yasakla
    'prefer-const': 'error', // let yerine const kullanımını teşvik et
    'no-var': 'error', // var kullanımını yasakla
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Kod organizasyon kuralları
    eqeqeq: 'error', // === kullanımını zorunlu kıl
    curly: 'error', // if/for/while blokları için süslü parantez zorunlu
    'no-duplicate-imports': 'error', // Aynı modülden birden fazla import yasakla
  },

  // Belirli dosyalar için özel ayarlar
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // TypeScript dosyaları için ek kurallar
        'no-undef': 'off', // TypeScript kendi kontrolünü yapar
      },
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {
        // JavaScript dosyaları için ek kurallar
      },
    },
  ],

  // Göz ardı edilecek dosyalar
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'public/',
    '*.config.js',
    '*.config.ts',
    'tsconfig.json',
  ],
};
