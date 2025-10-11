#!/usr/bin/env python3
"""
MarianMT ile Ücretsiz Çeviri
Helsinki-NLP modellerini kullanarak tr.json -> en.json ve sr.json çevirisi yapar.
%100 ücretsiz, API key gerektirmez.
"""

import json
import os
import sys
from pathlib import Path
from typing import Dict, Any
import logging

# İlk kurulum için gerekli kütüphaneleri kontrol et
try:
    from transformers import MarianMTModel, MarianTokenizer
    import torch
except ImportError:
    print("⚠️  Gerekli kütüphaneler yüklü değil!")
    print("Lütfen şu komutu çalıştırın:")
    print("pip install transformers torch sentencepiece")
    sys.exit(1)

# Logging ayarları
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('translation-marian.log'),
        logging.StreamHandler()
    ]
)

class MarianTranslator:
    """Helsinki-NLP MarianMT modelleri ile çeviri"""
    
    def __init__(self):
        self.models = {}
        self.tokenizers = {}
        
    def load_model(self, lang_pair: str):
        """Model ve tokenizer'ı yükle"""
        if lang_pair in self.models:
            return
            
        model_name = f"Helsinki-NLP/opus-mt-{lang_pair}"
        logging.info(f"📦 Model yükleniyor: {model_name}")
        
        try:
            self.tokenizers[lang_pair] = MarianTokenizer.from_pretrained(model_name)
            self.models[lang_pair] = MarianMTModel.from_pretrained(model_name)
            logging.info(f"✅ Model yüklendi: {lang_pair}")
        except Exception as e:
            logging.error(f"❌ Model yüklenemedi {lang_pair}: {e}")
            raise
    
    def translate(self, text: str, lang_pair: str) -> str:
        """Tek bir metni çevir"""
        if not text or not text.strip():
            return text
            
        # Model yüklü değilse yükle
        if lang_pair not in self.models:
            self.load_model(lang_pair)
        
        try:
            # Tokenize et
            inputs = self.tokenizers[lang_pair](text, return_tensors="pt", padding=True)
            
            # Çevir
            with torch.no_grad():
                outputs = self.models[lang_pair].generate(**inputs)
            
            # Decode et
            translated = self.tokenizers[lang_pair].decode(outputs[0], skip_special_tokens=True)
            return translated
            
        except Exception as e:
            logging.error(f"Çeviri hatası: {text[:50]}... -> {e}")
            return text
    
    def translate_dict(self, data: Dict[str, Any], lang_pair: str, path: str = "") -> Dict[str, Any]:
        """JSON dictionary'yi recursive olarak çevir"""
        result = {}
        total = len(data)
        
        for idx, (key, value) in enumerate(data.items(), 1):
            current_path = f"{path}.{key}" if path else key
            
            if isinstance(value, dict):
                # Nested dictionary
                logging.info(f"📁 [{idx}/{total}] {current_path}")
                result[key] = self.translate_dict(value, lang_pair, current_path)
            elif isinstance(value, str):
                # String değeri çevir
                logging.info(f"📝 [{idx}/{total}] {current_path}: {value[:50]}...")
                result[key] = self.translate(value, lang_pair)
            elif isinstance(value, list):
                # Liste içindeki string'leri çevir
                logging.info(f"📋 [{idx}/{total}] {current_path} (list)")
                result[key] = [
                    self.translate(item, lang_pair) if isinstance(item, str) else item
                    for item in value
                ]
            else:
                # Diğer tipler (number, boolean, null) olduğu gibi kal
                result[key] = value
        
        return result


def translate_file(
    input_file: Path,
    output_file: Path,
    lang_pair: str,
    translator: MarianTranslator
):
    """Bir JSON dosyasını çevir"""
    
    logging.info(f"\n{'='*60}")
    logging.info(f"🌍 Çeviri başlıyor: {lang_pair}")
    logging.info(f"📂 Kaynak: {input_file}")
    logging.info(f"📂 Hedef: {output_file}")
    logging.info(f"{'='*60}\n")
    
    # JSON dosyasını yükle
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        logging.info(f"✅ JSON yüklendi: {len(data)} top-level keys")
    except Exception as e:
        logging.error(f"❌ JSON okunamadı: {e}")
        return False
    
    # Çeviriyi yap
    try:
        translated_data = translator.translate_dict(data, lang_pair)
        logging.info(f"✅ Çeviri tamamlandı")
    except Exception as e:
        logging.error(f"❌ Çeviri hatası: {e}")
        return False
    
    # Çevrilmiş JSON'u kaydet
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(translated_data, f, ensure_ascii=False, indent=2)
        logging.info(f"✅ Dosya kaydedildi: {output_file}")
        return True
    except Exception as e:
        logging.error(f"❌ Dosya kaydedilemedi: {e}")
        return False


def main():
    # Dosya yolları
    project_root = Path(__file__).parent.parent
    messages_dir = project_root / "messages"
    
    tr_file = messages_dir / "tr.json"
    en_file = messages_dir / "en.json"
    sr_file = messages_dir / "sr.json"
    
    # Dosya kontrolü
    if not tr_file.exists():
        logging.error(f"❌ Kaynak dosya bulunamadı: {tr_file}")
        sys.exit(1)
    
    # Translator'ı oluştur
    translator = MarianTranslator()
    
    # Kullanıcıya seçenek sun
    print("\n" + "="*60)
    print("🌍 MarianMT Çeviri Sistemi")
    print("="*60)
    print("\n1️⃣  Türkçe -> İngilizce (tr -> en)")
    print("2️⃣  Türkçe -> Sırpça (tr -> sr)")
    print("3️⃣  Her ikisi de (tr -> en + sr)")
    print("\nÇıkmak için 'q' tuşlayın\n")
    
    choice = input("Seçiminiz (1/2/3): ").strip()
    
    if choice == 'q':
        print("👋 Çıkılıyor...")
        sys.exit(0)
    
    success = True
    
    if choice in ['1', '3']:
        # Türkçe -> İngilizce
        if translate_file(tr_file, en_file, "tr-en", translator):
            logging.info(f"\n✅ İngilizce çeviri başarılı: {en_file}")
        else:
            success = False
    
    if choice in ['2', '3']:
        # Türkçe -> Sırpça
        # Not: tr-sr modeli yoksa alternatif yol kullanılabilir (tr->en->sr)
        try:
            if translate_file(tr_file, sr_file, "tr-sr", translator):
                logging.info(f"\n✅ Sırpça çeviri başarılı: {sr_file}")
            else:
                success = False
        except Exception as e:
            logging.warning(f"⚠️  tr-sr modeli bulunamadı, alternatif yol deneniyor...")
            # tr -> en -> sr yolu
            try:
                logging.info("📍 1. Adım: tr -> en")
                translator.load_model("tr-en")
                temp_en = translator.translate_dict(
                    json.loads(tr_file.read_text(encoding='utf-8')),
                    "tr-en"
                )
                
                logging.info("📍 2. Adım: en -> sr")
                translator.load_model("en-sh")  # Sırpça-Hırvatça modeli
                sr_data = translator.translate_dict(temp_en, "en-sh")
                
                sr_file.write_text(
                    json.dumps(sr_data, ensure_ascii=False, indent=2),
                    encoding='utf-8'
                )
                logging.info(f"✅ Sırpça çeviri başarılı (2 aşamalı): {sr_file}")
            except Exception as e2:
                logging.error(f"❌ Alternatif yol da başarısız: {e2}")
                success = False
    
    if choice not in ['1', '2', '3']:
        logging.error("❌ Geçersiz seçim!")
        success = False
    
    # Sonuç
    print("\n" + "="*60)
    if success:
        print("✅ TÜM ÇEVİRİLER BAŞARIYLA TAMAMLANDI!")
    else:
        print("⚠️  Bazı çeviriler başarısız oldu. Loglara bakın.")
    print("="*60)
    print(f"\n📄 Detaylı log: translation-marian.log\n")


if __name__ == "__main__":
    main()

