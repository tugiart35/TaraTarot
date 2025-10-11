# 🚀 TaraTarot - React Native/Expo Geçiş Yol Haritası

## 📊 MEVCUT PROJE ANALİZİ

### ✅ Taşınabilir Yapılar (Değişiklik Gerektirmeyen)

- ✅ **TypeScript Tipleri** → Direkt kullanılabilir
- ✅ **Supabase Entegrasyonu** → %90 aynı kalacak
- ✅ **Business Logic** → Tamamı taşınabilir
- ✅ **i18n Metinleri** → Direkt kullanılabilir (21,361 satır TR)
- ✅ **Tarot Card Data** → 78 kart tamamen kullanılabilir
- ✅ **8 Farklı Spread Logic** → Tüm pozisyon anlamları kopyalanabilir

### ❌ Yeniden Yazılacak Yapılar

- ❌ **Next.js Routing** → React Navigation / Expo Router
- ❌ **Tailwind CSS** → React Native StyleSheet / NativeWind
- ❌ **HTML/DOM** → React Native Components
- ❌ **Server Components** → Client Components
- ❌ **API Routes** → Supabase Edge Functions

---

## 📋 AŞAMALI GEÇİŞ PLANI (8-12 Hafta)

---

## 🏗️ PHASE 1: ALTYAPI KURULUMU (1 Hafta)

### Adım 1.1: Expo Projesi Oluşturma (1 Gün)

```bash
# Yeni Expo projesi oluştur
npx create-expo-app@latest TaraTarotMobile --template tabs

cd TaraTarotMobile

# Gerekli paketleri kur
npx expo install expo-router
npm install @supabase/supabase-js
npm install react-native-url-polyfill
npm install @react-native-async-storage/async-storage
npm install nativewind
npm install tailwindcss
npm install i18next react-i18next
npm install react-hook-form
npm install @hookform/resolvers
npm install zod
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install react-native-reanimated
npm install react-native-gesture-handler
npm install expo-notifications
npm install expo-image
npm install expo-blur
```

### Adım 1.2: Proje Yapısını Oluşturma (1 Gün)

```
TaraTarotMobile/
├── app/                           # Expo Router (Next.js benzeri)
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx             # Ana sayfa
│   │   ├── tarot.tsx             # Tarot okuma
│   │   ├── dashboard.tsx         # Kullanıcı paneli
│   │   └── profile.tsx           # Profil
│   ├── auth/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── spreads/                  # Her spread için route
│   │   ├── love.tsx
│   │   ├── career.tsx
│   │   ├── marriage.tsx
│   │   ├── money.tsx
│   │   ├── new-lover.tsx
│   │   ├── problem-solving.tsx
│   │   ├── relationship-analysis.tsx
│   │   ├── relationship-problems.tsx
│   │   └── situation-analysis.tsx
│   └── _layout.tsx               # Root layout
├── src/
│   ├── components/               # UI Components
│   ├── features/                 # Feature modules
│   ├── lib/                      # Business logic & utilities
│   ├── hooks/                    # Custom hooks
│   ├── types/                    # TypeScript types
│   └── utils/                    # Helper functions
├── assets/
│   ├── cards/                    # 78 Tarot kartı görseli
│   │   ├── major/
│   │   └── minor/
│   └── images/                   # Diğer görseller
└── i18n/                         # Çok dilli destek
    ├── tr.json                   # 21,361 satır
    ├── en.json                   # 6,164 satır
    └── sr.json                   # 6,148 satır
```

### Adım 1.3: Supabase Kurulumu (2 Saat)

**Dosya:** `src/lib/supabase/client.ts`

```typescript
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,  // localStorage yerine AsyncStorage
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
```

**Kullanılacak Mevcut Dosyalar:**
- ✅ `/src/lib/supabase/client.ts` → Database types kopyala (satır 137-532)
- ✅ `/src/types/` → Tüm tipler direkt kopyalanacak

### Adım 1.4: i18n Konfigürasyonu (2 Saat)

**Dosya:** `src/lib/i18n/config.ts`

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'

import tr from '../../../i18n/tr.json'
import en from '../../../i18n/en.json'
import sr from '../../../i18n/sr.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      sr: { translation: sr },
    },
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
```

**Kopyalanacak Dosyalar:**
- ✅ `/messages/tr.json` → `/i18n/tr.json` (21,361 satır)
- ✅ `/messages/en.json` → `/i18n/en.json` (6,164 satır)
- ✅ `/messages/sr.json` → `/i18n/sr.json` (6,148 satır)

---

## 🔐 PHASE 2: AUTHENTICATION (3 Gün)

### Adım 2.1: Auth Hook'larını Taşıma (1 Gün)

**Direkt Kopyalanacak Dosyalar:**
```
MEVCUT → YENİ (Değişiklik Yok)
/src/lib/auth/auth-service.ts → src/lib/auth/auth-service.ts
/src/lib/auth/validation.ts → src/lib/auth/validation.ts
/src/hooks/auth/useAuth.ts → src/hooks/auth/useAuth.ts
/src/hooks/auth/useRememberMe.ts → src/hooks/auth/useRememberMe.ts
/src/types/auth.types.ts → src/types/auth.types.ts
```

### Adım 2.2: Auth UI Components (React Native) (2 Gün)

**Dosya:** `src/components/auth/AuthForm.tsx`

```typescript
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchema } from '@/lib/auth/validation' // MEVCUT DOSYA
import { useAuth } from '@/hooks/auth/useAuth' // MEVCUT HOOK

export function AuthForm() {
  const { signIn, signUp, loading } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(authSchema)
  })
  
  return (
    <View className="p-4 bg-white rounded-lg">
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <View className="mb-4">
            <Text className="text-sm font-medium mb-2">E-posta</Text>
            <TextInput
              {...field}
              placeholder="ornek@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-300 p-3 rounded-lg"
            />
            {errors.email && (
              <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>
            )}
          </View>
        )}
      />
      
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <View className="mb-4">
            <Text className="text-sm font-medium mb-2">Şifre</Text>
            <TextInput
              {...field}
              placeholder="••••••••"
              secureTextEntry
              className="border border-gray-300 p-3 rounded-lg"
            />
            {errors.password && (
              <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>
            )}
          </View>
        )}
      />
      
      <TouchableOpacity
        onPress={handleSubmit(signIn)}
        disabled={loading}
        className="bg-indigo-600 p-4 rounded-lg items-center"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold">Giriş Yap</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}
```

**Mevcut Dosyadan Dönüştürülecek:**
- 🔄 `/src/components/auth/AuthForm.tsx` → HTML componentlerini RN'e çevir

---

## 🎴 PHASE 3: TAROT CARD SYSTEM (1 Hafta)

### Adım 3.1: Tarot Deck Data (1 Gün)

**Direkt Kopyalanacak Dosyalar:**
```
MEVCUT → YENİ (Değişiklik Yok)
/src/features/tarot/lib/full-tarot-deck.ts → src/features/tarot/lib/full-tarot-deck.ts
/src/types/tarot.ts → src/types/tarot.ts
```

78 tarot kartı verisi tamamen kullanılabilir.

### Adım 3.2: Kart Gösterimi UI (2 Gün)

**Dosya:** `src/components/tarot/TarotCard.tsx`

```typescript
import React from 'react'
import { View, Image, Text, Pressable } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated'
import type { TarotCard } from '@/types/tarot'

interface Props {
  card: TarotCard
  isFlipped: boolean
  onPress?: () => void
}

export function TarotCardComponent({ card, isFlipped, onPress }: Props) {
  const rotation = useSharedValue(0)
  
  React.useEffect(() => {
    rotation.value = isFlipped ? withSpring(180) : withSpring(0)
  }, [isFlipped])
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
  }))
  
  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={animatedStyle}
        className="w-32 h-48 rounded-lg overflow-hidden shadow-lg"
      >
        <Image
          source={{ uri: card.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 w-full bg-black/50 p-2">
          <Text className="text-white font-bold text-center">
            {card.nameTr}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  )
}
```

### Adım 3.3: Kart Seçim Sistemi (2 Gün)

**Dosya:** `src/components/tarot/CardSelector.tsx`

```typescript
import React, { useState } from 'react'
import { View, FlatList, Dimensions } from 'react-native'
import { TarotCardComponent } from './TarotCard'
import { fullTarotDeck } from '@/features/tarot/lib/full-tarot-deck' // MEVCUT
import type { TarotCard } from '@/types/tarot' // MEVCUT TİP

interface Props {
  count: number
  onComplete: (cards: TarotCard[]) => void
}

export function CardSelector({ count, onComplete }: Props) {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [availableCards, setAvailableCards] = useState(fullTarotDeck)
  
  const handleCardSelect = (card: TarotCard) => {
    if (selectedCards.length < count) {
      setSelectedCards([...selectedCards, card])
      setAvailableCards(availableCards.filter(c => c.id !== card.id))
      
      if (selectedCards.length + 1 === count) {
        onComplete([...selectedCards, card])
      }
    }
  }
  
  return (
    <FlatList
      data={availableCards}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TarotCardComponent
          card={item}
          isFlipped={false}
          onPress={() => handleCardSelect(item)}
        />
      )}
    />
  )
}
```

---

## 🌸 PHASE 4: SPREAD SISTEMLERI (3 Hafta)

### 8 Farklı Spread İçin Business Logic

**Direkt Kopyalanacak Dosyalar (Değişiklik Yok):**

#### 1. Love Spread (Aşk Açılımı)
```
/src/features/tarot/lib/love/position-meanings-index.ts → Aynı
/src/features/tarot/lib/love/position-1-ilgi-duydugun-kisi.ts → Aynı
/src/features/tarot/lib/love/position-2-fiziksel.ts → Aynı
/src/features/tarot/lib/love/position-3-baglanti.ts → Aynı
/src/features/tarot/lib/love/position-4-uzun-vadeli-surec.ts → Aynı
```

#### 2. Career Spread (Kariyer Açılımı)
```
/src/features/tarot/lib/career/position-meanings-index.ts → Aynı
/src/features/tarot/lib/career/position-1-gercekten-istedigim-kariyer-bumu.ts → Aynı
/src/features/tarot/lib/career/position-2-kariyer-gelistirmek-icin-hangi-adımlar-atabilirim.ts → Aynı
/src/features/tarot/lib/career/position-3-kariyerimde-degisteremedigigim-taraflar.ts → Aynı
/src/features/tarot/lib/career/position-4-kariyerimde-elimden-gelenin-en-iyisi-yapıyormuyum.ts → Aynı
/src/features/tarot/lib/career/position-5-kariyerimde-yardimci-olacak-ne-gibi-degisikler.ts → Aynı
/src/features/tarot/lib/career/position-6-gecmisimdeki-hangi-engeller.ts → Aynı
/src/features/tarot/lib/career/position-7-sonuc-ne-olacak.ts → Aynı
```

#### 3. Marriage Spread (Evlilik Açılımı)
```
/src/features/tarot/lib/marriage/ → Tüm dosyalar direkt kopyalanır
```

#### 4. Money Spread (Para Açılımı)
```
/src/features/tarot/lib/money/ → Tüm dosyalar direkt kopyalanır
```

#### 5. New Lover Spread (Yeni Aşk Açılımı)
```
/src/features/tarot/lib/new-lover/position-meanings-index.ts → Aynı (397 satır)
/src/features/tarot/lib/new-lover/ → Tüm dosyalar direkt kopyalanır
```

#### 6. Problem Solving Spread (Problem Çözme Açılımı)
```
/src/features/tarot/lib/problem-solving/ → Tüm dosyalar direkt kopyalanır
```

#### 7. Relationship Analysis Spread (İlişki Analizi)
```
/src/features/tarot/lib/relationship-analysis/ → Tüm dosyalar direkt kopyalanır
```

#### 8. Situation Analysis Spread (Durum Analizi)
```
/src/features/tarot/lib/situation-analysis/ → Tüm dosyalar direkt kopyalanır
```

### Spread UI Component Örneği

**Dosya:** `src/features/tarot/love/LoveTarot.tsx`

```typescript
import React, { useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { CardSelector } from '@/components/tarot/CardSelector'
import { lovePositionMeanings } from '@/features/tarot/lib/love/position-meanings-index' // MEVCUT
import type { TarotCard } from '@/types/tarot'

export function LoveTarot() {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [step, setStep] = useState<'select' | 'interpret'>('select')
  
  const handleCardsSelected = (cards: TarotCard[]) => {
    setSelectedCards(cards)
    setStep('interpret')
  }
  
  if (step === 'select') {
    return (
      <View className="flex-1">
        <Text className="text-2xl font-bold text-center p-4">
          Aşk Açılımı
        </Text>
        <CardSelector count={4} onComplete={handleCardsSelected} />
      </View>
    )
  }
  
  return (
    <ScrollView className="flex-1 p-4">
      {selectedCards.map((card, index) => {
        const position = lovePositionMeanings.positions[index + 1] // MEVCUT DATA
        const meaning = position.find(m => m.card === card.name)
        
        return (
          <View key={index} className="mb-6 bg-white rounded-lg p-4 shadow">
            <Text className="text-lg font-bold mb-2">
              Pozisyon {index + 1}: {/* position title */}
            </Text>
            <Text className="text-gray-700">
              {meaning?.upright || card.meaningTr.upright}
            </Text>
          </View>
        )
      })}
    </ScrollView>
  )
}
```

**Her Spread İçin Aynı Pattern:**
- ✅ Business logic (position-meanings) → Direkt kopyala
- 🔄 UI Component → React Native'e çevir

---

## 🤖 PHASE 5: AI INTEGRATION (3 Gün)

### Adım 5.1: Supabase Edge Function Oluşturma (1 Gün)

**Dosya:** `supabase/functions/ai-interpret/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY')!

serve(async (req) => {
  try {
    const { cards, spreadType, userId } = await req.json()
    
    // MEVCUT AI PROMPT LOGIC'İ BURAYA TAŞI
    const prompt = generatePrompt(cards, spreadType) // Mevcut fonksiyon
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 3000
      })
    })
    
    const data = await response.json()
    const interpretation = data.choices[0].message.content
    
    return new Response(JSON.stringify({ 
      success: true, 
      interpretation 
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
```

**Mevcut Dosyadan Taşınacak:**
- ✅ `/src/lib/api/ai-service.ts` → AI prompt generation logic

### Adım 5.2: Mobile Client Integration (1 Gün)

**Dosya:** `src/hooks/useAIInterpretation.ts`

```typescript
import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { TarotCard } from '@/types/tarot'

export function useAIInterpretation() {
  const [loading, setLoading] = useState(false)
  const [interpretation, setInterpretation] = useState<string | null>(null)
  
  const getInterpretation = async (cards: TarotCard[], spreadType: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('ai-interpret', {
        body: { cards, spreadType }
      })
      
      if (error) throw error
      setInterpretation(data.interpretation)
    } catch (error) {
      console.error('AI interpretation error:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return { getInterpretation, interpretation, loading }
}
```

---

## 📊 PHASE 6: DASHBOARD & PROFILE (1.5 Hafta)

### Adım 6.1: Dashboard Hooks (1 Gün)

**Direkt Kopyalanacak Dosyalar:**
```
MEVCUT → YENİ (Değişiklik Yok)
/src/hooks/useDashboardData.ts → src/hooks/useDashboardData.ts
/src/hooks/useDashboardActions.ts → src/hooks/useDashboardActions.ts
/src/types/dashboard.types.ts → src/types/dashboard.types.ts
```

### Adım 6.2: Dashboard UI (3 Gün)

**Dosya:** `src/screens/DashboardScreen.tsx`

```typescript
import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDashboardData } from '@/hooks/useDashboardData' // MEVCUT HOOK

export function DashboardScreen() {
  const { stats, readings, loading } = useDashboardData()
  
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    )
  }
  
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Stats Cards */}
      <View className="p-4 flex-row justify-between">
        <View className="flex-1 bg-white rounded-lg p-4 mr-2 shadow">
          <Text className="text-gray-600">Kredi Bakiyesi</Text>
          <Text className="text-2xl font-bold text-indigo-600">
            {stats?.creditBalance || 0}
          </Text>
        </View>
        
        <View className="flex-1 bg-white rounded-lg p-4 ml-2 shadow">
          <Text className="text-gray-600">Toplam Okuma</Text>
          <Text className="text-2xl font-bold text-indigo-600">
            {readings?.length || 0}
          </Text>
        </View>
      </View>
      
      {/* Recent Readings */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-4">Son Okumalar</Text>
        {readings?.map((reading) => (
          <TouchableOpacity
            key={reading.id}
            className="bg-white rounded-lg p-4 mb-3 shadow"
          >
            <Text className="font-bold">{reading.title}</Text>
            <Text className="text-gray-600 text-sm">
              {new Date(reading.created_at).toLocaleDateString('tr-TR')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}
```

### Adım 6.3: Profile Management (2 Gün)

**Dosya:** `src/screens/ProfileScreen.tsx`

```typescript
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '@/hooks/auth/useAuth' // MEVCUT

export function ProfileScreen() {
  const { user, updateProfile, loading } = useAuth()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      display_name: user?.display_name || '',
      email: user?.email || '',
    }
  })
  
  return (
    <View className="flex-1 bg-white p-4">
      <View className="items-center mb-6">
        <Image
          source={{ uri: user?.avatar_url || 'https://via.placeholder.com/150' }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-bold mt-2">{user?.display_name}</Text>
      </View>
      
      <Controller
        control={control}
        name="display_name"
        render={({ field }) => (
          <View className="mb-4">
            <Text className="text-sm font-medium mb-2">Ad Soyad</Text>
            <TextInput
              {...field}
              className="border border-gray-300 p-3 rounded-lg"
            />
          </View>
        )}
      />
      
      <TouchableOpacity
        onPress={handleSubmit(updateProfile)}
        disabled={loading}
        className="bg-indigo-600 p-4 rounded-lg items-center"
      >
        <Text className="text-white font-bold">Profili Güncelle</Text>
      </TouchableOpacity>
    </View>
  )
}
```

---

## 💳 PHASE 7: PAYMENT & CREDITS (1 Hafta)

### Adım 7.1: Payment Hooks (1 Gün)

**Direkt Kopyalanacak Dosyalar:**
```
MEVCUT → YENİ (Değişiklik Yok)
/src/lib/payment/ → src/lib/payment/ (Tüm dosyalar)
/src/hooks/usePayment.ts → src/hooks/usePayment.ts
```

### Adım 7.2: In-App Purchases (3 Gün)

```bash
npx expo install expo-in-app-purchases
```

**Dosya:** `src/hooks/useInAppPurchase.ts`

```typescript
import { useState, useEffect } from 'react'
import * as InAppPurchases from 'expo-in-app-purchases'

export function useInAppPurchase() {
  const [products, setProducts] = useState<any[]>([])
  
  useEffect(() => {
    InAppPurchases.connectAsync()
    
    return () => {
      InAppPurchases.disconnectAsync()
    }
  }, [])
  
  const buyProduct = async (productId: string) => {
    await InAppPurchases.purchaseItemAsync(productId)
  }
  
  return { products, buyProduct }
}
```

### Adım 7.3: Shopier Integration (Mevcut Webhook Kullan) (2 Gün)

**Mevcut Edge Function Kullan:**
- ✅ `/functions/payment-webhook/index.ts` → Zaten hazır
- Sadece mobil için WebView ekle

---

## ✨ PHASE 8: ANIMATIONS & POLISH (1.5 Hafta)

### Adım 8.1: Kart Animasyonları (3 Gün)

```typescript
// src/animations/cardFlip.ts
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

export function useCardFlip() {
  const rotation = useSharedValue(0)
  
  const flip = () => {
    rotation.value = withSpring(rotation.value === 0 ? 180 : 0)
  }
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }]
  }))
  
  return { flip, animatedStyle }
}
```

### Adım 8.2: Push Notifications (2 Gün)

```bash
npx expo install expo-notifications
```

**Dosya:** `src/lib/notifications/config.ts`

```typescript
import * as Notifications from 'expo-notifications'

export async function registerForPushNotifications() {
  const { status } = await Notifications.requestPermissionsAsync()
  
  if (status !== 'granted') {
    alert('Bildirimler için izin gerekli!')
    return
  }
  
  const token = await Notifications.getExpoPushTokenAsync()
  
  // Token'ı Supabase'e kaydet
  // ...
  
  return token.data
}
```

### Adım 8.3: Performance Optimizations (2 Gün)

```typescript
// src/hooks/useImagePreload.ts
import { Image } from 'react-native'

export function useImagePreload(images: string[]) {
  useEffect(() => {
    images.forEach(uri => {
      Image.prefetch(uri)
    })
  }, [images])
}
```

---

## 🧪 PHASE 9: TESTING & QA (1 Hafta)

### Adım 9.1: Unit Tests (2 Gün)

```bash
npm install --save-dev jest @testing-library/react-native
```

### Adım 9.2: E2E Tests (2 Gün)

```bash
npm install --save-dev detox
```

### Adım 9.3: Beta Testing (3 Gün)

```bash
# iOS TestFlight
eas build --platform ios

# Android Internal Testing
eas build --platform android
```

---

## 🚀 PHASE 10: DEPLOYMENT (1 Hafta)

### Adım 10.1: App Store Setup (2 Gün)

1. Apple Developer Account
2. App Store Connect
3. Screenshots & Metadata
4. Submit for Review

### Adım 10.2: Play Store Setup (2 Gün)

1. Google Play Console
2. App Details & Screenshots
3. Submit for Review

### Adım 10.3: Production Monitoring (1 Gün)

```bash
npx expo install expo-application expo-device
npm install @sentry/react-native
```

---

## 📂 DOSYA MAPPING TABLOSU

### ✅ Direkt Kopyalanacak Dosyalar (%100 Aynı Kalacak)

| Mevcut Dosya | Yeni Konum | Satır | Not |
|--------------|------------|-------|-----|
| `src/types/tarot.ts` | `src/types/tarot.ts` | 168 | TarotCard interface |
| `src/types/auth.types.ts` | `src/types/auth.types.ts` | - | Auth types |
| `src/types/dashboard.types.ts` | `src/types/dashboard.types.ts` | - | Dashboard types |
| `src/features/tarot/lib/full-tarot-deck.ts` | Aynı | - | 78 kart data |
| `src/features/tarot/lib/love/position-meanings-index.ts` | Aynı | - | Love spread logic |
| `src/features/tarot/lib/career/position-meanings-index.ts` | Aynı | - | Career spread logic |
| `src/features/tarot/lib/marriage/position-meanings-index.ts` | Aynı | - | Marriage spread logic |
| `src/features/tarot/lib/money/position-meanings-index.ts` | Aynı | - | Money spread logic |
| `src/features/tarot/lib/new-lover/position-meanings-index.ts` | Aynı | 397 | New lover spread logic |
| `src/features/tarot/lib/problem-solving/position-meanings-index.ts` | Aynı | - | Problem solving logic |
| `src/features/tarot/lib/relationship-analysis/position-meanings-index.ts` | Aynı | - | Relationship analysis logic |
| `src/features/tarot/lib/relationship-problems/position-meanings-index.ts` | Aynı | - | Relationship problems logic |
| `src/features/tarot/lib/situation-analysis/position-meanings-index.ts` | Aynı | - | Situation analysis logic |
| `src/lib/auth/auth-service.ts` | Aynı | - | Auth business logic |
| `src/lib/auth/validation.ts` | Aynı | - | Zod schemas |
| `src/hooks/useDashboardData.ts` | Aynı | - | Dashboard data hook |
| `src/hooks/useDashboardActions.ts` | Aynı | - | Dashboard actions hook |
| `src/hooks/usePayment.ts` | Aynı | - | Payment hook |
| `src/lib/payment/` | Aynı | - | Tüm payment logic |
| `messages/tr.json` | `i18n/tr.json` | 21,361 | Türkçe çeviriler |
| `messages/en.json` | `i18n/en.json` | 6,164 | İngilizce çeviriler |
| `messages/sr.json` | `i18n/sr.json` | 6,148 | Sırpça çeviriler |

### 🔄 UI Çevrilecek Dosyalar (HTML → React Native)

| Mevcut Dosya | Yeni Dosya | Değişiklik |
|--------------|------------|------------|
| `src/components/auth/AuthForm.tsx` | `src/components/auth/AuthForm.tsx` | div → View, input → TextInput |
| `src/features/tarot/components/Love-Spread/LoveTarot.tsx` | `src/features/tarot/love/LoveTarot.tsx` | ScrollView, Image |
| `src/features/tarot/components/Career-Spread/CareerTarot.tsx` | `src/features/tarot/career/CareerTarot.tsx` | FlatList, Pressable |
| `src/features/tarot/components/Marriage/MarriageTarot.tsx` | `src/features/tarot/marriage/MarriageTarot.tsx` | Animated.View |
| `src/components/dashboard/DashboardContainer.tsx` | `src/screens/DashboardScreen.tsx` | SafeAreaView |
| `src/features/shared/ui/LoadingSpinner.tsx` | `src/components/ui/LoadingSpinner.tsx` | ActivityIndicator |
| `src/features/shared/ui/Toast.tsx` | `src/components/ui/Toast.tsx` | Modal, Animated |

### ❌ Kullanılmayacak Dosyalar

| Dosya | Sebep |
|-------|-------|
| `src/app/**` | Next.js routing → Expo Router |
| `src/middleware.ts` | Server-side → Edge Functions |
| `src/app/api/**` | API Routes → Supabase Edge Functions |
| `next.config.js` | Next.js config → app.json |
| `tailwind.config.ts` | Tailwind → NativeWind |

---

## 🗓️ HAFTALIK İŞ PLANI

### **Hafta 1: Altyapı + Auth**
- ✅ Expo projesi kur
- ✅ Supabase entegre et
- ✅ i18n konfigüre et
- ✅ Auth sistemi çalıştır

### **Hafta 2-3: Tarot Kartları**
- ✅ 78 kart data kopyala
- ✅ Kart gösterimi UI
- ✅ Flip animasyonları
- ✅ Kart seçim sistemi

### **Hafta 4-6: 8 Spread Sistemi**
- ✅ Love Spread (Hafta 4)
- ✅ Career Spread (Hafta 4)
- ✅ Marriage Spread (Hafta 5)
- ✅ Money Spread (Hafta 5)
- ✅ New Lover Spread (Hafta 5)
- ✅ Problem Solving Spread (Hafta 6)
- ✅ Relationship Analysis Spread (Hafta 6)
- ✅ Situation Analysis Spread (Hafta 6)

### **Hafta 7: Dashboard & Profile**
- ✅ Dashboard hooks kopyala
- ✅ Dashboard UI
- ✅ Profile management
- ✅ Reading history

### **Hafta 8: Payment & Credits**
- ✅ Payment hooks kopyala
- ✅ In-app purchases
- ✅ Shopier integration
- ✅ Credit management

### **Hafta 9-10: Polish**
- ✅ Animasyonlar
- ✅ Push notifications
- ✅ Performance optimizations
- ✅ Error handling

### **Hafta 11-12: Test & Deploy**
- ✅ Unit & E2E tests
- ✅ Beta testing
- ✅ App Store submission
- ✅ Play Store submission

---

## 🎯 BAŞARILI GEÇİŞ İÇİN İPUÇLARI

### 1. **Modüler Geçiş Yapın**
- Her spread'i ayrı ayrı taşıyın
- Test edin, sonra bir sonrakine geçin

### 2. **Business Logic Dokunmayın**
- Position meanings dosyaları %100 aynı
- Sadece UI katmanını değiştirin

### 3. **i18n Verilerini Koruyun**
- 21,361 satır Türkçe çeviri hazır
- Direkt kopyalayın

### 4. **Supabase Yapısı Aynı**
- Database schema değişmeyecek
- RLS policies aynı kalacak
- Edge Functions ekleyin

### 5. **TypeScript Tiplerini Kullanın**
- Mevcut tipler %100 geçerli
- Tip güvenliği kaybolmayacak

---

## ⚠️ DİKKAT EDİLECEKLER

### 1. **AsyncStorage vs localStorage**
```typescript
// YANLIŞ (Web)
localStorage.setItem('key', 'value')

// DOĞRU (React Native)
import AsyncStorage from '@react-native-async-storage/async-storage'
await AsyncStorage.setItem('key', 'value')
```

### 2. **Navigation**
```typescript
// YANLIŞ (Next.js)
import { useRouter } from 'next/navigation'
router.push('/path')

// DOĞRU (Expo Router)
import { router } from 'expo-router'
router.push('/path')
```

### 3. **Environment Variables**
```typescript
// YANLIŞ (Next.js)
process.env.NEXT_PUBLIC_SUPABASE_URL

// DOĞRU (Expo)
process.env.EXPO_PUBLIC_SUPABASE_URL
```

### 4. **Image Components**
```typescript
// YANLIŞ (Next.js)
import Image from 'next/image'
<Image src="/path" alt="..." />

// DOĞRU (React Native)
import { Image } from 'react-native'
<Image source={{ uri: 'https://...' }} />
```

---

## 📊 BEKLENEN SONUÇLAR

### ✅ Kazanımlar
- 📱 iOS ve Android native app
- 🚀 App Store ve Play Store'da yayın
- ⚡ Daha hızlı performans
- 📲 Push notifications
- 💾 Offline çalışma (cache)
- 🎨 Native UI/UX

### 📈 İş Yükü
- **Kod Taşıma:** %60 (Business logic direkt kopyalanır)
- **UI Dönüşüm:** %35 (HTML → React Native)
- **Yeni Özellikler:** %5 (Push notifications, In-app purchases)

### 💰 Maliyet
- **Geliştirme:** 8-12 hafta
- **Apple Developer:** $99/yıl
- **Google Play:** $25 (tek seferlik)
- **Hosting:** Mevcut (Supabase)

---

## 🚀 BAŞLARKEN

1. **Agent Mode'a geçin** (Zaten geçtiniz ✅)
2. Expo projesi oluşturalım
3. Adım adım her dosyayı taşıyalım
4. 12 hafta sonra App Store'da olun! 🎉

---

## 📞 DESTEK

Bu yol haritasını takip ederken herhangi bir aşamada takılırsanız:
- Her adım için detaylı kod örnekleri var
- Business logic'iniz hazır (%60 iş bitti!)
- Sadece UI dönüşümü yapmanız gerekiyor

**Başlamaya hazır mısınız?** 🚀

