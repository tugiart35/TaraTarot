#!/usr/bin/env python3
"""
Multi-Translator Batch System v5.0 - PLACEHOLDER PROTECTED 🛡️
═══════════════════════════════════════════════════════════════
Features:
- MarianMT (primary, free, offline)
- Google Translate API (fallback 1)
- Argos Translate (fallback 2, offline)
- 60 second timeout per translator
- Circular fallback chain
- 1000-sized batches for safety
- Checkpoint system with resume support
- Live progress tracking
- Both EN and SR(Latin) translation
- ✨ NEW: Placeholder protection ({{var}}, {0}, %s, <tag>)
═══════════════════════════════════════════════════════════════

GÜNCELLEME NOTLARI v5.0:
═══════════════════════════════
1. ✅ Placeholder koruma eklendi
   - {{variable}} gibi değişkenler çeviride korunur
   - {0}, {1} gibi format placeholders korunur
   - %s, %d gibi printf-style placeholders korunur
   - <tag> gibi HTML/XML tag'leri korunur

2. ✅ Tüm translator'lara uygulandı
   - MarianMT
   - Google Translate
   - Argos Translate

3. ✅ Tüm önceki özellikler korundu
   - Resume/checkpoint sistemi
   - Multi-tier fallback
   - Timeout handling
   - Batch processing

ÖRNEK KULLANIM:
═══════════════
Giriş : "Merhaba {{userName}}, krediniz {amount} TL"
Çıkış : "Hello {{userName}}, your credit is {amount} TL"
        ↑ Placeholder'lar korundu! ✅
═══════════════════════════════════════════════════════════════
"""

import json
import os
import sys
import re  # ✨ YENİ: Placeholder koruma için regex
from pathlib import Path
from typing import Dict, Any, Optional, Tuple, List, Set
import logging
from datetime import datetime
import time
import signal
from functools import wraps
import threading

# Gerekli kütüphaneler
try:
    from transformers import MarianMTModel, MarianTokenizer
    import torch
    from tqdm import tqdm
except ImportError:
    print("⚠️  Temel kütüphaneler eksik!")
    print("Kurulum: pip install transformers torch sentencepiece tqdm")
    sys.exit(1)

# Opsiyonel translator'lar
try:
    from googletrans import Translator as GoogleTranslator
    GOOGLE_AVAILABLE = True
except ImportError:
    GOOGLE_AVAILABLE = False

try:
    import argostranslate.package
    import argostranslate.translate
    ARGOS_AVAILABLE = True
except ImportError:
    ARGOS_AVAILABLE = False


# ═══════════════════════════════════════════════════════
# KONFİGÜRASYON
# ═══════════════════════════════════════════════════════

BATCH_SIZE = 500  # ✨ 500'lük batch'ler (daha güvenli, daha sık kayıt)
BATCH_DIR = Path("messages/batches")
STATE_FILE = Path("messages/translation-state.json")
TIMEOUT_SECONDS = 60  # Her translator için timeout

# Logging
log_file = f'translation-multi-{datetime.now().strftime("%Y%m%d-%H%M%S")}.log'
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler(sys.stdout)
    ]
)

# Global değişkenler (graceful shutdown için)
current_translator = None
current_state = None


# ═══════════════════════════════════════════════════════
# UTILITY FUNCTIONS
# ═══════════════════════════════════════════════════════

# ✨ YENİ: Placeholder koruma regex pattern'i
# Bu pattern şunları yakalar:
# - {{variable}} → i18n değişkenleri
# - {0}, {1}, {name} → Python format placeholders
# - %s, %d, %f → printf-style placeholders
# - %{variable} → Ruby-style placeholders
# - <tag>, <br/> → HTML/XML tag'leri
PLACEHOLDER_RE = re.compile(r"(\{\{.*?\}\}|%\w|%\{.*?\}|\{[0-9]+\}|\{[a-zA-Z_][a-zA-Z0-9_]*\}|<[^>]+>)")


def protect_placeholders(text: str) -> Tuple[str, Dict[str, str]]:
    """
    ✨ YENİ FONKSIYON: Metindeki placeholder'ları korur
    
    Çeviri sırasında değişken ve format string'lerinin bozulmaması için
    onları geçici placeholder'larla değiştirir.
    
    Örnek:
        Giriş : "Merhaba {{userName}}, krediniz {amount} TL"
        Çıkış : ("Merhaba __PH_0__, krediniz __PH_1__ TL", 
                 {"__PH_0__": "{{userName}}", "__PH_1__": "{amount}"})
    
    Args:
        text: Korunacak placeholder'ları içeren metin
    
    Returns:
        (protected_text, placeholder_map): Korunan metin ve placeholder haritası
    """
    tokens = {}
    
    def replace_placeholder(match):
        key = f"__PH_{len(tokens)}__"
        tokens[key] = match.group(0)
        return key
    
    protected = PLACEHOLDER_RE.sub(replace_placeholder, text)
    return protected, tokens


def restore_placeholders(text: str, tokens: Dict[str, str]) -> str:
    """
    ✨ YENİ FONKSIYON: Çevrilen metindeki placeholder'ları geri yükler
    
    protect_placeholders() ile korunan placeholder'ları orijinal
    halleriyle geri koyar.
    
    Örnek:
        Giriş : "Hello __PH_0__, your credit is __PH_1__ TL"
        Tokens: {"__PH_0__": "{{userName}}", "__PH_1__": "{amount}"}
        Çıkış : "Hello {{userName}}, your credit is {amount} TL"
    
    Args:
        text: Çevrilmiş metin (geçici placeholder'larla)
        tokens: protect_placeholders()'dan gelen placeholder haritası
    
    Returns:
        Orijinal placeholder'ları içeren final metin
    """
    for placeholder_key, original_value in tokens.items():
        text = text.replace(placeholder_key, original_value)
    return text


def timeout_handler(timeout):
    """Timeout decorator - fonksiyon çok uzun sürerse TimeoutError fırlat"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            result = [None]
            exception = [None]
            
            def target():
                try:
                    result[0] = func(*args, **kwargs)
                except Exception as e:
                    exception[0] = e
            
            thread = threading.Thread(target=target)
            thread.daemon = True
            thread.start()
            thread.join(timeout)
            
            if thread.is_alive():
                raise TimeoutError(f"Function exceeded {timeout}s timeout")
            
            if exception[0]:
                raise exception[0]
            
            return result[0]
        
        return wrapper
    return decorator


def signal_handler(signum, frame):
    """Graceful shutdown - Ctrl+C yakalandığında"""
    global current_state
    
    print("\n\n⚠️  Çeviri kesintiye uğradı (Ctrl+C)")
    
    if current_state:
        current_state.save()
        print(f"💾 İlerleme kaydedildi: {STATE_FILE}")
        print(f"✅ {len(current_state.completed_batches)} batch tamamlandı")
        print(f"🔄 Kaldığınız yer: Batch {current_state.current_batch}")
        print(f"\n💡 İpucu: Scripti tekrar çalıştırarak kaldığınız yerden devam edebilirsiniz.\n")
    
    sys.exit(0)


# Signal handler'ları kaydet
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


def collect_strings(obj, path=()):
    """
    ✨ YENİ YAKLAŞIM (Groq benzeri): Nested yapıyı koruyarak string'leri topla
    
    Eski flatten yaklaşımı: "dashboard.errors.statsLoadFailed" → YANLIŞ
    Yeni collect yaklaşımı: ('dashboard', 'errors', 'statsLoadFailed') → DOĞRU
    
    Returns: List of (path_tuple, string_value)
    """
    out = []
    
    if isinstance(obj, dict):
        for k, v in obj.items():
            out += collect_strings(v, path + (k,))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            out += collect_strings(v, path + (i,))
    elif isinstance(obj, str):
        out.append((path, obj))
    
    return out


def set_by_path(obj, path, value):
    """
    ✨ YENİ FONKSIYON: Path tuple'ına göre değer yerleştir, nested yapıyı koru
    
    Örnek:
        path = ('dashboard', 'errors', 'statsLoadFailed')
        value = "Statistics could not load"
        → obj['dashboard']['errors']['statsLoadFailed'] = value
    """
    cur = obj
    for p in path[:-1]:
        cur = cur[p]
    cur[path[-1]] = value


def create_empty_structure(obj):
    """
    ✨ YENİ FONKSIYON: Sadece yapıyı kopyala, string'leri BOŞ bırak
    
    Örnek:
        Input : {"errors": {"loadError": "Yüklenemedi"}}
        Output: {"errors": {"loadError": ""}}
    
    Bu sayede çevrilen değerler set_by_path() ile yerleştirilebilir.
    """
    if isinstance(obj, dict):
        return {k: create_empty_structure(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [create_empty_structure(item) for item in obj]
    elif isinstance(obj, str):
        return ""  # String'leri boş bırak
    else:
        return obj  # number, boolean, null aynen kal


# ═══════════════════════════════════════════════════════
# TRANSLATION STATE
# ═══════════════════════════════════════════════════════

class TranslationState:
    """Çeviri durumunu takip et ve kaydet"""
    
    def __init__(self, lang: str, source_file: str, target_file: str, lang_pair: str):
        self.lang = lang
        self.source_file = source_file
        self.target_file = target_file
        self.lang_pair = lang_pair
        self.total_batches = 0
        self.completed_batches = []
        self.failed_batches = []
        self.current_batch = None
        self.start_time = datetime.now().isoformat()
        self.last_update = None
        self.stats = {
            'total_keys': 0,
            'translated_keys': 0,
            'failed_keys': 0
        }
    
    def to_dict(self) -> Dict:
        return {
            'lang': self.lang,
            'source_file': self.source_file,
            'target_file': self.target_file,
            'lang_pair': self.lang_pair,
            'total_batches': self.total_batches,
            'completed_batches': self.completed_batches,
            'failed_batches': self.failed_batches,
            'current_batch': self.current_batch,
            'start_time': self.start_time,
            'last_update': self.last_update,
            'stats': self.stats
        }
    
    def save(self):
        self.last_update = datetime.now().isoformat()
        STATE_FILE.parent.mkdir(exist_ok=True)
        
        with open(STATE_FILE, 'w', encoding='utf-8') as f:
            json.dump(self.to_dict(), f, ensure_ascii=False, indent=2)
        
        logging.debug(f"💾 State kaydedildi: {STATE_FILE}")
    
    @classmethod
    def load(cls, lang: str) -> Optional['TranslationState']:
        if not STATE_FILE.exists():
            return None
        
        try:
            with open(STATE_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if data.get('lang') != lang:
                return None
            
            state = cls(
                lang=data['lang'],
                source_file=data['source_file'],
                target_file=data['target_file'],
                lang_pair=data['lang_pair']
            )
            
            state.total_batches = data.get('total_batches', 0)
            state.completed_batches = data.get('completed_batches', [])
            state.failed_batches = data.get('failed_batches', [])
            state.current_batch = data.get('current_batch')
            state.start_time = data.get('start_time')
            state.last_update = data.get('last_update')
            state.stats = data.get('stats', {})
            
            return state
            
        except Exception as e:
            logging.warning(f"⚠️  State yüklenemedi: {e}")
            return None
    
    @classmethod
    def clear(cls):
        if STATE_FILE.exists():
            STATE_FILE.unlink()
            logging.info(f"🗑️  State temizlendi: {STATE_FILE}")


# ═══════════════════════════════════════════════════════
# TRANSLATOR STATS
# ═══════════════════════════════════════════════════════

class TranslatorStats:
    """Her translator için istatistik tutucu"""
    
    def __init__(self, name: str):
        self.name = name
        self.success = 0
        self.failed = 0
        self.timeout = 0
        self.total_time = 0.0
    
    def log_success(self, elapsed: float):
        self.success += 1
        self.total_time += elapsed
    
    def log_failure(self):
        self.failed += 1
    
    def log_timeout(self):
        self.timeout += 1
    
    def get_avg_time(self) -> float:
        return self.total_time / self.success if self.success > 0 else 0
    
    def __str__(self):
        avg = self.get_avg_time()
        return f"{self.name:15s}: ✅{self.success:6d} ❌{self.failed:4d} ⏱️{self.timeout:4d} (avg: {avg:5.2f}s)"


# ═══════════════════════════════════════════════════════
# TRANSLATORS
# ═══════════════════════════════════════════════════════

class MarianTranslator:
    """MarianMT Translator - Primary (Offline, Free)"""
    
    def __init__(self):
        self.models = {}
        self.tokenizers = {}
        self.stats = TranslatorStats("🤖 MarianMT")
    
    def load_model(self, lang_pair: str):
        if lang_pair in self.models:
            return
        
        model_name = f"Helsinki-NLP/opus-mt-{lang_pair}"
        logging.info(f"📦 MarianMT model yükleniyor: {model_name}")
        
        try:
            self.tokenizers[lang_pair] = MarianTokenizer.from_pretrained(model_name)
            self.models[lang_pair] = MarianMTModel.from_pretrained(model_name)
            logging.info(f"✅ MarianMT model yüklendi: {lang_pair}")
        except Exception as e:
            logging.error(f"❌ MarianMT model yüklenemedi: {e}")
            raise
    
    @timeout_handler(TIMEOUT_SECONDS)
    def translate(self, text: str, lang_pair: str) -> str:
        """
        ✨ GÜNCELLEME: Placeholder korumalı çeviri + Multi-language desteği
        
        Önceki davranış: Placeholder'lar bozulabiliyordu
        Yeni davranış: Placeholder'lar korunuyor
        
        Örnek:
            Giriş : "Merhaba {{userName}}"
            Eski  : "Hello userName" ❌
            Yeni  : "Hello {{userName}}" ✅
        
        Multi-language desteği:
            en-sla → Sırpça için >>srp_Latn<< prefix eklenir
        """
        if not text or not text.strip():
            return text
        
        if lang_pair not in self.models:
            self.load_model(lang_pair)
        
        start = time.time()
        
        # ✨ ADIM 1: Placeholder'ları koru
        protected_text, placeholders = protect_placeholders(text)
        
        # ✨ ADIM 2: Multi-language modeller için dil prefix'i ekle
        if lang_pair == "en-sla":
            # Slavic languages modeli - Sırpça Latin için prefix
            protected_text = f">>srp_Latn<< {protected_text}"
        elif lang_pair.startswith("en-") and len(lang_pair) > 6:
            # Diğer multi-language modeller için genel prefix
            target_lang = lang_pair.split("-")[1]
            if "_" not in target_lang:  # Eğer zaten prefix yoksa
                protected_text = f">>{target_lang}<< {protected_text}"
        
        # ADIM 3: Korunan metni çevir
        inputs = self.tokenizers[lang_pair](
            protected_text,  # ← protected_text kullan (text yerine)
            return_tensors="pt", 
            padding=True, 
            truncation=True, 
            max_length=512
        )
        
        with torch.no_grad():
            outputs = self.models[lang_pair].generate(**inputs)
        
        translated = self.tokenizers[lang_pair].decode(outputs[0], skip_special_tokens=True)
        
        # ✨ ADIM 4: Placeholder'ları geri yükle
        final_text = restore_placeholders(translated, placeholders)
        
        elapsed = time.time() - start
        self.stats.log_success(elapsed)
        
        return final_text  # ← final_text döndür (translated yerine)


class GoogleTranslatorWrapper:
    """Google Translate API - Fallback 1"""
    
    def __init__(self):
        if not GOOGLE_AVAILABLE:
            raise ImportError("googletrans not installed")
        
        self.translator = GoogleTranslator()
        self.stats = TranslatorStats("🌐 Google")
        self.lang_map = {
            'tr-en': ('tr', 'en'),
            'tr-sr': ('tr', 'sr'),
            'tr-sh': ('tr', 'sr'),
            'en-sh': ('en', 'sr'),
            'en-sr': ('en', 'sr')
        }
    
    @timeout_handler(TIMEOUT_SECONDS)
    def translate(self, text: str, lang_pair: str) -> str:
        """
        ✨ GÜNCELLEME: Placeholder korumalı çeviri (Google Translate)
        """
        if not text or not text.strip():
            return text
        
        start = time.time()
        
        # ✨ ADIM 1: Placeholder'ları koru
        protected_text, placeholders = protect_placeholders(text)
        
        # ADIM 2: Korunan metni çevir
        src, dest = self.lang_map.get(lang_pair, ('tr', 'en'))
        result = self.translator.translate(protected_text, src=src, dest=dest)  # ← protected_text
        
        # ✨ ADIM 3: Placeholder'ları geri yükle
        final_text = restore_placeholders(result.text, placeholders)
        
        elapsed = time.time() - start
        self.stats.log_success(elapsed)
        
        return final_text  # ← final_text döndür


class ArgosTranslatorWrapper:
    """Argos Translate - Fallback 2 (Offline, Free)"""
    
    def __init__(self):
        if not ARGOS_AVAILABLE:
            raise ImportError("argostranslate not installed")
        
        self.stats = TranslatorStats("🔷 Argos")
        self.installed_languages = {}
        
        logging.info("📦 Argos Translate paketleri kontrol ediliyor...")
        argostranslate.package.update_package_index()
        available_packages = argostranslate.package.get_available_packages()
        
        # TR-EN paketini yükle
        for package in available_packages:
            if package.from_code == 'tr' and package.to_code == 'en':
                try:
                    argostranslate.package.install_from_path(package.download())
                    logging.info(f"✅ Argos paketi yüklendi: tr-en")
                except:
                    logging.warning("⚠️  Argos tr-en paketi zaten yüklü")
        
        self.installed_languages = argostranslate.translate.get_installed_languages()
    
    @timeout_handler(TIMEOUT_SECONDS)
    def translate(self, text: str, lang_pair: str) -> str:
        """
        ✨ GÜNCELLEME: Placeholder korumalı çeviri (Argos Translate)
        """
        if not text or not text.strip():
            return text
        
        start = time.time()
        
        # ✨ ADIM 1: Placeholder'ları koru
        protected_text, placeholders = protect_placeholders(text)
        
        # ADIM 2: Lang pair parse et
        parts = lang_pair.split('-')
        src = parts[0]
        dest = parts[1] if len(parts) > 1 else 'en'
        
        from_lang = next((l for l in self.installed_languages if l.code == src), None)
        to_lang = next((l for l in self.installed_languages if l.code == dest), None)
        
        if not from_lang or not to_lang:
            raise ValueError(f"Language pair {lang_pair} not installed in Argos")
        
        # ADIM 3: Korunan metni çevir
        translation = from_lang.get_translation(to_lang)
        result = translation.translate(protected_text)  # ← protected_text
        
        # ✨ ADIM 4: Placeholder'ları geri yükle
        final_text = restore_placeholders(result, placeholders)
        
        elapsed = time.time() - start
        self.stats.log_success(elapsed)
        
        return final_text  # ← final_text döndür


# ═══════════════════════════════════════════════════════
# MULTI-TRANSLATOR (MAIN LOGIC)
# ═══════════════════════════════════════════════════════

class MultiTranslator:
    """
    Multi-tier fallback translator
    Strategy: MarianMT → Google → Argos → MarianMT (retry)
    """
    
    def __init__(self):
        # Translators (lazy loading)
        self.marian = None
        self.google = None
        self.argos = None
        
        # Strategy chain
        self.strategy = ['marian', 'google', 'argos', 'marian_retry']
        
        # Global stats
        self.total_translated = 0
        self.total_failed = 0
        self.translator_usage = {}
    
    def get_translator(self, name: str):
        """Translator'ı lazy load et"""
        if name == 'marian' or name == 'marian_retry':
            if not self.marian:
                self.marian = MarianTranslator()
            return self.marian
        
        elif name == 'google':
            if not GOOGLE_AVAILABLE:
                raise ImportError("Google Translate not available")
            if not self.google:
                self.google = GoogleTranslatorWrapper()
            return self.google
        
        elif name == 'argos':
            if not ARGOS_AVAILABLE:
                raise ImportError("Argos Translate not available")
            if not self.argos:
                self.argos = ArgosTranslatorWrapper()
            return self.argos
    
    def translate(self, text: str, lang_pair: str) -> Tuple[str, str]:
        """
        Multi-tier çeviri
        Returns: (translated_text, translator_used)
        """
        if not text or not text.strip():
            return text, 'skipped'
        
        for translator_name in self.strategy:
            try:
                translator = self.get_translator(translator_name)
                result = translator.translate(text, lang_pair)
                
                # İstatistik
                self.total_translated += 1
                self.translator_usage[translator_name] = self.translator_usage.get(translator_name, 0) + 1
                
                return result, translator_name
                
            except TimeoutError:
                logging.debug(f"⏱️  {translator_name} timeout (>{TIMEOUT_SECONDS}s)")
                if translator:
                    translator.stats.log_timeout()
                continue
            
            except Exception as e:
                logging.debug(f"❌ {translator_name}: {str(e)[:80]}")
                if translator:
                    translator.stats.log_failure()
                continue
        
        # Tüm translatorlar başarısız
        self.total_failed += 1
        logging.error(f"🚫 Tüm translatorlar başarısız: {text[:50]}...")
        return text, 'failed'
    
    def get_stats_summary(self) -> str:
        """Genel istatistik özeti"""
        lines = [
            "\n" + "="*70,
            "📊 TRANSLATOR İSTATİSTİKLERİ",
            "="*70
        ]
        
        if self.marian:
            lines.append(str(self.marian.stats))
        
        if self.google:
            lines.append(str(self.google.stats))
        
        if self.argos:
            lines.append(str(self.argos.stats))
        
        lines.extend([
            "",
            "💡 KULLANIM DAĞILIMI:",
        ])
        
        for translator, count in sorted(self.translator_usage.items(), key=lambda x: x[1], reverse=True):
            percentage = (count / self.total_translated * 100) if self.total_translated > 0 else 0
            lines.append(f"  • {translator:15s}: {count:7,d} ({percentage:5.1f}%)")
        
        lines.extend([
            "",
            f"✅ Toplam başarılı: {self.total_translated:,}",
            f"❌ Toplam başarısız: {self.total_failed:,}",
            "="*70 + "\n"
        ])
        
        return "\n".join(lines)


# ═══════════════════════════════════════════════════════
# BATCH OPERATIONS
# ═══════════════════════════════════════════════════════

def get_existing_strings(target_file: Path) -> Set[Tuple]:
    """
    ✨ GÜNCELLEME: Hedef dosyadaki mevcut string path'leri al (nested yapı korunur)
    Returns: Set of path tuples
    """
    if not target_file.exists():
        return set()
    
    try:
        with open(target_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        strings = collect_strings(data)
        return set(path for path, _ in strings)
    except Exception as e:
        logging.warning(f"⚠️  Mevcut dosya okunamadı: {e}")
        return set()


def get_completed_strings_from_batches(lang: str) -> Set[Tuple]:
    """
    ✨ GÜNCELLEME: Batch dosyalarından çevrilmiş string path'leri al
    Returns: Set of path tuples
    """
    completed_paths = set()
    
    if not BATCH_DIR.exists():
        return completed_paths
    
    batch_files = sorted(BATCH_DIR.glob(f"batch_*_{lang}.json"))
    
    for batch_file in batch_files:
        try:
            with open(batch_file, 'r', encoding='utf-8') as f:
                batch_data = json.load(f)
            
            # Batch içindeki string'leri topla
            strings = collect_strings(batch_data)
            completed_paths.update(path for path, _ in strings)
        except Exception as e:
            logging.warning(f"⚠️  Batch okunamadı {batch_file}: {e}")
    
    return completed_paths


def create_batches(
    all_strings: List[Tuple[Tuple, str]],
    existing_paths: Set[Tuple],
    completed_paths: Set[Tuple],
    source_data: Dict,
    batch_size: int = BATCH_SIZE
) -> List[Tuple[int, List[Tuple[Tuple, str]], Dict]]:
    """
    ✨ GÜNCELLEME: Batch'leri nested yapıyı koruyarak oluştur
    
    Args:
        all_strings: (path_tuple, string_value) listesi
        existing_paths: Zaten çevrilmiş path'ler
        completed_paths: Batch'lerde çevrilmiş path'ler
        source_data: Kaynak JSON (yapı kopyalanacak)
        batch_size: Batch boyutu
    
    Returns: List of (batch_num, strings_to_translate, template_structure)
    """
    
    all_existing = existing_paths.union(completed_paths)
    new_strings = [(path, value) for path, value in all_strings if path not in all_existing]
    
    print(f"\n{'='*70}")
    print("📊 ÇEVİRİ PLANI")
    print(f"{'='*70}")
    print(f"📝 Toplam string sayısı    : {len(all_strings):,}")
    print(f"✅ Hedef dosyada mevcut    : {len(existing_paths):,}")
    print(f"💾 Batch'lerde tamamlanmış : {len(completed_paths):,}")
    print(f"🆕 Çevrilecek string       : {len(new_strings):,}")
    print(f"📦 Batch boyutu            : {batch_size:,}")
    print(f"{'='*70}\n")
    
    if not new_strings:
        print("✨ Tüm string'ler zaten çevrilmiş!")
        return []
    
    # Batch'lere böl
    batches = []
    
    for i in range(0, len(new_strings), batch_size):
        batch_num = (i // batch_size) + 1
        batch_strings = new_strings[i:i + batch_size]
        
        # ✨ DÜZELTME: Template gerekmiyor, boş dict başlat
        # Her batch sadece kendi çevirdiği path'leri içerir
        batches.append((batch_num, batch_strings))
    
    num_batches = len(batches)
    print(f"🎯 {num_batches} batch oluşturulacak")
    print(f"⏱️  Tahmini süre: ~{num_batches * 3}-{num_batches * 8} dakika\n")
    
    return batches


def save_batch(batch_data: Dict, lang: str, batch_num: int) -> Path:
    """
    ✨ GÜNCELLEME: Batch'i NESTED yapıda kaydet (flatten değil!)
    
    Eski: {"dashboard.errors.loadError": "..."} → YANLIŞ
    Yeni: {"dashboard": {"errors": {"loadError": "..."}}} → DOĞRU
    """
    BATCH_DIR.mkdir(parents=True, exist_ok=True)
    batch_file = BATCH_DIR / f"batch_{batch_num:04d}_{lang}.json"
    
    with open(batch_file, 'w', encoding='utf-8') as f:
        json.dump(batch_data, f, ensure_ascii=False, indent=2)
    
    file_size = batch_file.stat().st_size / 1024
    logging.info(f"💾 Batch kaydedildi: {batch_file.name} ({file_size:.1f} KB)")
    return batch_file


def translate_batch(
    batch_num: int,
    batch_strings: List[Tuple[Tuple, str]],
    lang_pair: str,
    multi_translator: MultiTranslator,
    total_batches: int,
    state: TranslationState
) -> Dict:
    """
    ✨ GÜNCELLEME v6.0: Sadece çevrilen string'leri içeren minimal nested JSON oluştur
    
    Args:
        batch_strings: (path_tuple, string_value) listesi
        
    Returns: Sadece çevrilen path'leri içeren nested JSON (boş string YOK)
    """
    
    batch_start = time.time()
    state.current_batch = batch_num
    state.save()
    
    print(f"\n{'='*70}")
    print(f"🔄 Batch {batch_num}/{total_batches}")
    print(f"📊 {len(batch_strings):,} string çevrilecek")
    print(f"{'='*70}\n")
    
    # ✨ YENİ: Minimal nested dict (sadece çevrilen path'ler)
    result = {}
    translator_counts = {}
    
    with tqdm(
        total=len(batch_strings),
        desc=f"Batch {batch_num:04d}/{total_batches:04d}",
        unit="str",
        bar_format='{l_bar}{bar}| {n_fmt}/{total_fmt} [{elapsed}<{remaining}, {rate_fmt}]',
        ncols=100,
        colour='green'
    ) as pbar:
        
        for path, original_text in batch_strings:
            # String'i çevir
            translated_text, translator_used = multi_translator.translate(original_text, lang_pair)
            
            # ✨ YENİ: Path'i oluştur ve çevrilen değeri yerleştir
            # Sadece gerekli nested yapıyı oluştur
            cur = result
            for p in path[:-1]:
                if p not in cur:
                    cur[p] = {}
                cur = cur[p]
            
            # Son key'e çevrilen değeri ata
            cur[path[-1]] = translated_text
            
            translator_counts[translator_used] = translator_counts.get(translator_used, 0) + 1
            
            pbar.update(1)
            
            if pbar.n % 200 == 0:
                dominant = max(translator_counts, key=translator_counts.get) if translator_counts else 'none'
                pbar.set_postfix({'Primary': dominant, 'Total': multi_translator.total_translated})
    
    batch_time = time.time() - batch_start
    
    print(f"\n✅ Batch {batch_num} tamamlandı!")
    print(f"⏱️  Süre: {batch_time:.1f}s ({len(batch_strings)/batch_time:.1f} str/s)")
    print(f"🎯 Kullanılan translatorlar:")
    for trans, count in sorted(translator_counts.items(), key=lambda x: x[1], reverse=True):
        percentage = (count / len(batch_strings) * 100)
        print(f"  • {trans}: {count} ({percentage:.1f}%)")
    
    # ETA
    if batch_num < total_batches:
        remaining = total_batches - batch_num
        eta_minutes = (remaining * batch_time) / 60
        print(f"\n📍 Kalan: {remaining} batch (~{eta_minutes:.1f} dakika)")
    
    return result  # Minimal nested JSON (sadece çevrilen path'ler)


def translate_with_batches(
    source_file: Path,
    target_file: Path,
    lang_pair: str,
    lang: str,
    multi_translator: MultiTranslator
) -> bool:
    """Batch çeviri ana fonksiyonu"""
    
    global current_state
    
    # State kontrol (resume)
    state = TranslationState.load(lang)
    is_resume = False
    
    if state:
        print(f"\n{'='*70}")
        print(f"🔄 KALDIĞI YERDEN DEVAM EDİLEBİLİR")
        print(f"{'='*70}")
        print(f"📅 Başlangıç     : {state.start_time}")
        print(f"📅 Son güncelleme: {state.last_update}")
        print(f"✅ Tamamlanan    : {len(state.completed_batches)} batch")
        print(f"❌ Başarısız     : {len(state.failed_batches)} batch")
        print(f"🔄 Son batch     : {state.current_batch}")
        print(f"{'='*70}\n")
        
        response = input("🤔 Kaldığınız yerden devam etmek istiyor musunuz? (E/H): ").strip().upper()
        
        if response == 'E':
            is_resume = True
            print("\n✅ Devam ediliyor...\n")
        else:
            print("\n🆕 Yeni baştan başlanıyor...\n")
            TranslationState.clear()
            state = None
    
    # Yeni state oluştur
    if not state:
        state = TranslationState(
            lang=lang,
            source_file=str(source_file),
            target_file=str(target_file),
            lang_pair=lang_pair
        )
    
    current_state = state
    
    # Kaynak dosyayı yükle
    print("📖 Kaynak dosya okunuyor...")
    with open(source_file, 'r', encoding='utf-8') as f:
        source_data = json.load(f)
    
    # ✨ YENİ YAKLAŞIM: String'leri topla (nested yapıyı koru)
    all_strings = collect_strings(source_data)
    state.stats['total_keys'] = len(all_strings)
    print(f"✅ {len(all_strings):,} string yüklendi\n")
    
    # Mevcut ve tamamlanmış path'leri al
    existing_paths = get_existing_strings(target_file)
    completed_paths = get_completed_strings_from_batches(lang)
    
    # Batch'leri oluştur
    batches = create_batches(all_strings, existing_paths, completed_paths, source_data, BATCH_SIZE)
    
    if not batches:
        TranslationState.clear()
        return True
    
    state.total_batches = len(batches)
    state.save()
    
    # Onay (resume değilse)
    if not is_resume:
        response = input("🚀 Çeviriye başlamak istiyor musunuz? (E/H): ").strip().upper()
        if response != 'E':
            print("\n⏸️  İptal edildi.\n")
            return False
    
    # Batch'leri çevir
    print(f"\n{'='*70}")
    print(f"🔄 ÇEVİRİ BAŞLADI - {lang.upper()}")
    print(f"{'='*70}\n")
    
    for batch_num, batch_strings in batches:
        # Zaten tamamlanmış batch'i atla
        if batch_num in state.completed_batches:
            print(f"⏭️  Batch {batch_num} zaten tamamlanmış, atlanıyor...")
            continue
        
        try:
            # Batch'i çevir (minimal nested yapı)
            translated_batch = translate_batch(
                batch_num,
                batch_strings,
                lang_pair,
                multi_translator,
                state.total_batches,
                state
            )
            
            # Batch'i kaydet (GÜVENLİK) - nested format
            save_batch(translated_batch, lang, batch_num)
            
            # State'i güncelle
            state.completed_batches.append(batch_num)
            state.stats['translated_keys'] += len(batch_strings)
            state.save()
            
        except KeyboardInterrupt:
            raise
        except Exception as e:
            logging.error(f"❌ Batch {batch_num} başarısız: {e}")
            state.failed_batches.append(batch_num)
            state.save()
            print(f"\n⚠️  Batch {batch_num} atlandı, devam ediliyor...\n")
            continue
    
    print(f"\n{'='*70}")
    print(f"✅ TÜM BATCH'LER TAMAMLANDI - {lang.upper()}")
    print(f"📊 Toplam: {state.stats['translated_keys']:,} key çevrildi")
    print(f"{'='*70}\n")
    
    return True


def merge_batches(lang: str, output_file: Path) -> int:
    """
    ✨ GÜNCELLEME: Batch'leri NESTED yapıda birleştir
    
    Eski: flatten → merge → unflatten → YANLIŞ
    Yeni: nested → deep merge → nested → DOĞRU
    """
    
    batch_files = sorted(BATCH_DIR.glob(f"batch_*_{lang}.json"))
    
    if not batch_files:
        print(f"⚠️  {lang.upper()} için birleştirilecek batch bulunamadı!")
        return 0
    
    print(f"\n{'='*70}")
    print(f"🔗 BATCH BİRLEŞTİRME - {lang.upper()}")
    print(f"{'='*70}")
    print(f"📦 {len(batch_files)} batch dosyası bulundu\n")
    
    # Özet göster
    total_strings = 0
    for bf in batch_files:
        with open(bf, 'r', encoding='utf-8') as f:
            data = json.load(f)
        strings = collect_strings(data)
        total_strings += len(strings)
        size_kb = bf.stat().st_size / 1024
        print(f"  ✓ {bf.name}: {len(strings):,} string ({size_kb:.1f} KB)")
    
    print(f"\n📊 TOPLAM: {total_strings:,} string")
    print(f"{'='*70}\n")
    
    # Onay
    response = input("🤔 Batch'leri birleştirip ana dosyaya yazmak istiyor musunuz? (E/H): ").strip().upper()
    if response != 'E':
        print("\n⏸️  Birleştirme iptal edildi.\n")
        return 0
    
    print("\n🔗 Birleştiriliyor...\n")
    
    # Mevcut dosyayı yükle (nested)
    merged = {}
    if output_file.exists():
        try:
            file_content = output_file.read_text(encoding='utf-8').strip()
            if file_content and file_content != '':
                merged = json.loads(file_content)
                strings = collect_strings(merged)
                print(f"📋 Mevcut dosya: {len(strings):,} string")
            else:
                print(f"📋 Mevcut dosya boş, yeni başlıyoruz")
        except Exception as e:
            print(f"⚠️  Mevcut dosya okunamadı ({e}), yeni başlıyoruz")
            merged = {}
    
    # Batch'leri deep merge et (nested yapıda)
    def deep_merge(base, update):
        """İki nested dict'i birleştir"""
        for key, value in update.items():
            if key in base:
                if isinstance(base[key], dict) and isinstance(value, dict):
                    deep_merge(base[key], value)
                else:
                    base[key] = value
            else:
                base[key] = value
        return base
    
    with tqdm(total=len(batch_files), desc="Merge", unit="batch", colour='cyan') as pbar:
        for bf in batch_files:
            with open(bf, 'r', encoding='utf-8') as f:
                batch_data = json.load(f)
            merged = deep_merge(merged, batch_data)
            pbar.update(1)
    
    # Kaydet
    print(f"\n💾 {output_file} yazılıyor...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)
    
    file_size = output_file.stat().st_size / 1024 / 1024
    final_strings = collect_strings(merged)
    
    print(f"\n✅ Birleştirme tamamlandı!")
    print(f"📄 Dosya: {output_file}")
    print(f"📊 Toplam: {len(final_strings):,} string ({file_size:.2f} MB)\n")
    
    # State'i temizle
    TranslationState.clear()
    
    return len(final_strings)


# ═══════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════

def main():
    project_root = Path(__file__).parent.parent
    messages_dir = project_root / "messages"
    
    tr_file = messages_dir / "tr.json"
    en_file = messages_dir / "en.json"
    sr_file = messages_dir / "sr.json"
    
    if not tr_file.exists():
        print(f"❌ Kaynak dosya bulunamadı: {tr_file}")
        sys.exit(1)
    
    # Multi-translator oluştur
    multi_translator = MultiTranslator()
    
    # Banner
    print("\n" + "="*70)
    print("🌍 MULTI-TRANSLATOR BATCH SYSTEM v6.0 - NESTED FIX")
    print("="*70)
    print("✨ GÜNCELLEME: Nested yapı korunarak çeviri (Groq benzeri)")
    print("="*70)
    print(f"\n📦 Batch boyutu: {BATCH_SIZE:,} key")
    print(f"⏱️  Timeout: {TIMEOUT_SECONDS}s per translator")
    print(f"📁 Batch klasörü: {BATCH_DIR}")
    print(f"📄 Log dosyası: {log_file}")
    print(f"\n🔄 Translator Durumu:")
    print(f"  🤖 MarianMT      : ✅ Primary (offline, free)")
    print(f"  🌐 Google        : {'✅ Available' if GOOGLE_AVAILABLE else '❌ Not installed'}")
    print(f"  🔷 Argos         : {'✅ Available' if ARGOS_AVAILABLE else '❌ Not installed'}")
    print(f"\n💡 Fallback Chain: MarianMT → Google → Argos → MarianMT (retry)")
    print("\n" + "="*70)
    
    # Menü
    print("\n1️⃣  tr → en (Türkçe → İngilizce)")
    print("2️⃣  tr → sr (Türkçe → Sırpça/Latin)")
    print("3️⃣  Her ikisi de (tr → en + sr)")
    print("4️⃣  Sadece batch'leri birleştir")
    print("5️⃣  State'i temizle")
    print("q: Çıkış\n")
    
    choice = input("Seçim (1/2/3/4/5/q): ").strip()
    
    if choice == 'q':
        print("\n👋 Çıkılıyor...\n")
        sys.exit(0)
    
    if choice == '5':
        TranslationState.clear()
        print("\n✅ State temizlendi!\n")
        sys.exit(0)
    
    if choice == '4':
        # Sadece birleştirme
        merge_batches('en', en_file)
        merge_batches('sr', sr_file)
        sys.exit(0)
    
    # Çeviri işlemleri
    success = True
    
    if choice in ['1', '3']:
        # İngilizce çeviri
        print("\n" + "="*70)
        print("🇬🇧 İNGİLİZCE ÇEVİRİ BAŞLIYOR")
        print("="*70)
        
        if translate_with_batches(tr_file, en_file, "tr-en", "en", multi_translator):
            merge_batches('en', en_file)
        else:
            success = False
    
    if choice in ['2', '3']:
        # Sırpça çeviri
        print("\n" + "="*70)
        print("🇷🇸 SIRPÇA (LATIN) ÇEVİRİ BAŞLIYOR")
        print("="*70)
        print("ℹ️  Strateji: tr → en → sr (İki aşamalı MarianMT)")
        print("ℹ️  Model 1: Helsinki-NLP/opus-mt-tr-en")
        print("ℹ️  Model 2: Helsinki-NLP/opus-mt-en-sla (Slavic)")
        print("="*70 + "\n")
        
        # İngilizce'ye çevir (yoksa veya seçenek 2 ise)
        if choice == '2' or not en_file.exists() or en_file.stat().st_size < 1000:
            print("📍 1. AŞAMA: Türkçe → İngilizce")
            if not translate_with_batches(tr_file, en_file, "tr-en", "en", multi_translator):
                success = False
                logging.error("❌ TR→EN çevirisi başarısız, SR çevirisi yapılamıyor")
            else:
                merge_batches('en', en_file)
        else:
            print("✅ İngilizce çeviri zaten mevcut, atlanıyor...\n")
        
        # İngilizce'den Sırpça'ya (en-sla modeli ile)
        if success:
            print("📍 2. AŞAMA: İngilizce → Sırpça")
            if translate_with_batches(en_file, sr_file, "en-sla", "sr", multi_translator):
                merge_batches('sr', sr_file)
            else:
                success = False
    
    if choice not in ['1', '2', '3', '4', '5']:
        print("\n❌ Geçersiz seçim!\n")
        success = False
    
    # Final istatistikler
    if success and choice in ['1', '2', '3']:
        print(multi_translator.get_stats_summary())
    
    print("\n" + "="*70)
    if success:
        print("✅ İŞLEM TAMAMLANDI!")
    else:
        print("⚠️  İşlem tamamlanamadı. Loglara bakın.")
    print("="*70)
    print(f"\n📄 Detaylı log: {log_file}\n")


if __name__ == "__main__":
    main()

