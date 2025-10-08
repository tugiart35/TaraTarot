# ProfileModal - TR Dili i18n Eklemeleri

## messages/tr.json Dosyasına Eklenecekler

Aşağıdaki anahtarları `messages/tr.json` dosyasının ilgili bölümlerine ekleyin:

### 1. profile Bölümüne Eklemeler

`messages/tr.json` içinde `"profile"` objesini bulun ve şu anahtarları ekleyin:

```json
{
  "profile": {
    "title": "Profil Bilgileri",
    "firstName": "Ad",
    "firstNamePlaceholder": "Adınızı girin",
    "lastName": "Soyad",
    "lastNamePlaceholder": "Soyadınızı girin",
    "fullName": "Tam Ad",
    "fullNamePlaceholder": "Tam adınızı girin",
    "birthDate": "Doğum Tarihi",
    "personalInfo": "Kişisel Bilgiler"
  }
}
```

### 2. common Bölümüne Eklemeler

`messages/tr.json` içinde `"common"` objesini bulun ve şu anahtarları ekleyin/kontrol edin:

```json
{
  "common": {
    "close": "Kapat",
    "edit": "Düzenle",
    "cancel": "İptal",
    "save": "Kaydet",
    "saving": "Kaydediliyor..."
  }
}
```

### 3. dashboard Bölümüne Eklemeler

`messages/tr.json` içinde `"dashboard"` objesini bulun ve şu anahtarları ekleyin/kontrol edin:

```json
{
  "dashboard": {
    "memberSince": "Üye olma",
    "readings": "Okumalar",
    "level": "Seviye",
    "expert": "Uzman",
    "intermediate": "Orta",
    "beginner": "Başlangıç",
    "signOut": "Çıkış Yap"
  }
}
```

### 4. messages.profile Bölümüne Eklemeler

Eğer yoksa, `messages/tr.json` içinde şu yapıyı oluşturun:

```json
{
  "messages": {
    "profile": {
      "updateError": "Profil güncelleme hatası"
    },
    "dashboard": {
      "creditHistory": {
        "credits": "Kredi"
      }
    }
  }
}
```

### 5. profile2 Bölümüne Eklemeler

```json
{
  "profile2": {
    "noName": "İsim Belirtilmemiş"
  }
}
```

---

## Manuel Uygulama Adımları

1. `messages/tr.json` dosyasını açın
2. Her bölüm için yukarıdaki JSON parçalarını bulun
3. Eksik anahtarları ekleyin (mevcut olanları değiştirmeyin)
4. JSON syntax'ının doğru olduğundan emin olun (virgüller, parantezler)
5. Dosyayı kaydedin
6. `npm run check:i18n` ile kontrol edin (varsa)

---

## Otomatik Uygulama (jq kullanarak)

```bash
cd /Users/tugi/Desktop/TaraTarot

# Backup oluştur
cp messages/tr.json messages/tr.json.backup-$(date +%s)

# jq ile ekle (dikkat: mevcut değerlerin üzerine yazmaz)
jq '.profile += {
  "title": "Profil Bilgileri",
  "lastName": "Soyad",
  "lastNamePlaceholder": "Soyadınızı girin",
  "fullName": "Tam Ad",
  "fullNamePlaceholder": "Tam adınızı girin",
  "birthDate": "Doğum Tarihi"
}' messages/tr.json > messages/tr.json.tmp && mv messages/tr.json.tmp messages/tr.json

jq '.common += {
  "close": "Kapat",
  "edit": "Düzenle",
  "cancel": "İptal",
  "save": "Kaydet",
  "saving": "Kaydediliyor..."
}' messages/tr.json > messages/tr.json.tmp && mv messages/tr.json.tmp messages/tr.json

jq '.dashboard += {
  "memberSince": "Üye olma",
  "readings": "Okumalar",
  "expert": "Uzman",
  "intermediate": "Orta",
  "beginner": "Başlangıç",
  "signOut": "Çıkış Yap"
}' messages/tr.json > messages/tr.json.tmp && mv messages/tr.json.tmp messages/tr.json
```

---

## Doğrulama

Eklemeleri yaptıktan sonra:

```bash
# Syntax kontrolü
cat messages/tr.json | jq . > /dev/null && echo "✓ JSON valid" || echo "✗ JSON invalid"

# Anahtar kontrolü
grep -q '"title":' messages/tr.json && echo "✓ profile.title eklenmiş"
grep -q '"saving":' messages/tr.json && echo "✓ common.saving eklenmiş"
grep -q '"signOut":' messages/tr.json && echo "✓ dashboard.signOut eklenmiş"
```

