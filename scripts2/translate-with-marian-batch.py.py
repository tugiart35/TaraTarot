#!/usr/bin/env python3
"""
MarianMT Batch Çeviri Sistemi v3.0 - RESUME DESTEKLİ
- Duplicate kontrolü
- 3000'lik batch'ler
- Canlı ilerleme takibi (progress bar + ETA)
- Birleştirmeden önce onay
- ✨ CHECKPOINT SISTEMI: Hata durumunda kaldığı yerden devam eder
"""

import json
import os
import sys
from pathlib import Path
from typing import Dict, Any, List, Tuple, Set, Optional
import logging
from datetime import datetime
import time
import signal

# Gerekli kütüphaneler
try:
    from transformers import MarianMTModel, MarianTokenizer
    import torch
    from tqdm import tqdm
except ImportError:
    print("⚠️  Gerekli kütüphaneler yüklü değil!")
    print("Lütfen şu komutu çalıştırın:")
    print("pip install transformers torch sentencepiece tqdm")
    sys.exit(1)

# Sabitler
BATCH_SIZE = 3000
BATCH_DIR = Path("messages/batches")
STATE_FILE = Path("messages/translation-state.json")

# Global değişkenler (graceful shutdown için)
current_translator = None
current_state = None

# Logging ayarları
log_file = f'translation-marian-{datetime.now().strftime("%Y%m%d-%H%M%S")}.log'
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler(sys.stdout)
    ]
)


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
            'failed_keys': 0,
            'skipped_keys': 0
        }
    
    def to_dict(self) -> Dict:
        """State'i dict'e çevir"""
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
        """State'i dosyaya kaydet"""
        self.last_update = datetime.now().isoformat()
        STATE_FILE.parent.mkdir(exist_ok=True)
        
        with open(STATE_FILE, 'w', encoding='utf-8') as f:
            json.dump(self.to_dict(), f, ensure_ascii=False, indent=2)
        
        logging.debug(f"💾 State kaydedildi: {STATE_FILE}")
    
    @classmethod
    def load(cls, lang: str) -> Optional['TranslationState']:
        """State'i dosyadan yükle"""
        if not STATE_FILE.exists():
            return None
        
        try:
            with open(STATE_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Dil uyumsuzsa None döndür
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
        """State dosyasını temizle"""
        if STATE_FILE.exists():
            STATE_FILE.unlink()
            logging.info(f"🗑️  State temizlendi: {STATE_FILE}")


class MarianTranslator:
    """Helsinki-NLP MarianMT modelleri ile çeviri"""
    
    def __init__(self):
        self.models = {}
        self.tokenizers = {}
        self.stats = {
            'translated': 0,
            'failed': 0,
            'skipped': 0,
            'start_time': None,
            'batch_times': []
        }
        
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
            self.stats['skipped'] += 1
            return text
            
        # Model yüklü değilse yükle
        if lang_pair not in self.models:
            self.load_model(lang_pair)
        
        try:
            # Tokenize et
            inputs = self.tokenizers[lang_pair](
                text, 
                return_tensors="pt", 
                padding=True, 
                truncation=True, 
                max_length=512
            )
            
            # Çevir
            with torch.no_grad():
                outputs = self.models[lang_pair].generate(**inputs)
            
            # Decode et
            translated = self.tokenizers[lang_pair].decode(outputs[0], skip_special_tokens=True)
            self.stats['translated'] += 1
            return translated
            
        except Exception as e:
            logging.error(f"Çeviri hatası: {text[:50]}... -> {e}")
            self.stats['failed'] += 1
            return text


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


# Signal handler'ı kaydet
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


def flatten_json(data: Dict[str, Any], parent_key: str = "", sep: str = ".") -> Dict[str, str]:
    """Nested JSON'u flat key-value pairs'e çevir"""
    items = []
    
    for key, value in data.items():
        new_key = f"{parent_key}{sep}{key}" if parent_key else key
        
        if isinstance(value, dict):
            items.extend(flatten_json(value, new_key, sep=sep).items())
        elif isinstance(value, str):
            items.append((new_key, value))
        elif isinstance(value, list):
            for idx, item in enumerate(value):
                if isinstance(item, str):
                    items.append((f"{new_key}[{idx}]", item))
                elif isinstance(item, dict):
                    items.extend(flatten_json(item, f"{new_key}[{idx}]", sep=sep).items())
    
    return dict(items)


def unflatten_json(flat_data: Dict[str, str], sep: str = ".") -> Dict[str, Any]:
    """Flat key-value pairs'i nested JSON'a çevir"""
    result = {}
    
    for flat_key, value in flat_data.items():
        parts = flat_key.split(sep)
        current = result
        
        for i, part in enumerate(parts[:-1]):
            if '[' in part and ']' in part:
                key, index = part.split('[')
                index = int(index.rstrip(']'))
                
                if key not in current:
                    current[key] = []
                
                while len(current[key]) <= index:
                    current[key].append({})
                
                current = current[key][index]
            else:
                if part not in current:
                    current[part] = {}
                current = current[part]
        
        last_part = parts[-1]
        if '[' in last_part and ']' in last_part:
            key, index = last_part.split('[')
            index = int(index.rstrip(']'))
            
            if key not in current:
                current[key] = []
            
            while len(current[key]) <= index:
                current[key].append(None)
            
            current[key][index] = value
        else:
            current[last_part] = value
    
    return result


def get_existing_keys(target_file: Path) -> Set[str]:
    """Hedef dosyadaki mevcut key'leri al"""
    if not target_file.exists():
        return set()
    
    try:
        with open(target_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        flat_data = flatten_json(data)
        return set(flat_data.keys())
    except Exception as e:
        logging.warning(f"⚠️  Mevcut dosya okunamadı: {e}")
        return set()


def get_completed_keys_from_batches(lang: str) -> Set[str]:
    """Batch dosyalarından çevrilmiş key'leri al"""
    completed_keys = set()
    
    batch_files = sorted(BATCH_DIR.glob(f"batch_*_{lang}.json"))
    
    for batch_file in batch_files:
        try:
            with open(batch_file, 'r', encoding='utf-8') as f:
                batch_data = json.load(f)
            completed_keys.update(batch_data.keys())
        except Exception as e:
            logging.warning(f"⚠️  Batch okunamadı {batch_file}: {e}")
    
    return completed_keys


def create_batches(
    flat_data: Dict[str, str], 
    existing_keys: Set[str],
    completed_keys: Set[str],
    batch_size: int = BATCH_SIZE
) -> List[Tuple[int, Dict[str, str]]]:
    """Batch'leri oluştur (duplicate ve tamamlanmış batch'leri atla)"""
    
    # Hem existing hem de completed key'leri çıkar
    all_existing = existing_keys.union(completed_keys)
    new_items = {k: v for k, v in flat_data.items() if k not in all_existing}
    
    print(f"\n{'='*60}")
    print("📊 ÇEVİRİ PLANI")
    print(f"{'='*60}")
    print(f"📝 Toplam key: {len(flat_data):,}")
    print(f"✅ Hedef dosyada: {len(existing_keys):,}")
    print(f"💾 Batch'lerde: {len(completed_keys):,}")
    print(f"🆕 Çevrilecek: {len(new_items):,}")
    print(f"📦 Batch boyutu: {batch_size:,}")
    print(f"{'='*60}\n")
    
    if not new_items:
        print("✨ Tüm key'ler zaten çevrilmiş!")
        return []
    
    # Batch'lere böl ve numaralandır
    items = list(new_items.items())
    batches = []
    
    for i in range(0, len(items), batch_size):
        batch_num = (i // batch_size) + 1
        batch = dict(items[i:i + batch_size])
        batches.append((batch_num, batch))
    
    print(f"🎯 {len(batches)} batch oluşturulacak\n")
    return batches


def save_batch(batch_data: Dict[str, str], lang: str, batch_num: int):
    """Batch'i dosyaya kaydet"""
    BATCH_DIR.mkdir(exist_ok=True)
    batch_file = BATCH_DIR / f"batch_{batch_num:03d}_{lang}.json"
    
    with open(batch_file, 'w', encoding='utf-8') as f:
        json.dump(batch_data, f, ensure_ascii=False, indent=2)
    
    file_size = batch_file.stat().st_size / 1024
    logging.info(f"💾 Batch kaydedildi: {batch_file} ({file_size:.1f} KB)")
    return batch_file


def translate_batch(
    batch_num: int,
    batch_data: Dict[str, str],
    lang_pair: str,
    translator: MarianTranslator,
    total_batches: int,
    state: TranslationState
) -> Dict[str, str]:
    """Bir batch'i çevir"""
    
    batch_start = time.time()
    state.current_batch = batch_num
    state.save()
    
    print(f"\n{'='*60}")
    print(f"🔄 Batch {batch_num}/{total_batches}")
    print(f"📊 {len(batch_data):,} key çevrilecek")
    print(f"{'='*60}\n")
    
    translated = {}
    
    try:
        with tqdm(
            total=len(batch_data),
            desc=f"Batch {batch_num}/{total_batches}",
            unit="key",
            bar_format='{l_bar}{bar}| {n_fmt}/{total_fmt} [{elapsed}<{remaining}, {rate_fmt}]',
            ncols=100,
            colour='green'
        ) as pbar:
            
            for key, value in batch_data.items():
                try:
                    translated[key] = translator.translate(value, lang_pair)
                    pbar.update(1)
                    
                    if len(translated) % 500 == 0:
                        pbar.set_postfix({
                            'Başarılı': translator.stats['translated'],
                            'Hata': translator.stats['failed']
                        })
                        
                except Exception as e:
                    logging.error(f"Key çeviri hatası: {key} -> {e}")
                    translated[key] = value  # Hata durumunda orijinali kullan
        
        batch_time = time.time() - batch_start
        translator.stats['batch_times'].append(batch_time)
        
        print(f"\n✅ Batch {batch_num} tamamlandı! ({batch_time:.1f}s, {len(batch_data)/batch_time:.1f} key/s)")
        
        # ETA hesapla
        if batch_num < total_batches:
            avg_time = sum(translator.stats['batch_times']) / len(translator.stats['batch_times'])
            remaining = total_batches - batch_num
            eta_minutes = (remaining * avg_time) / 60
            print(f"📍 Kalan: {remaining} batch (~{eta_minutes:.1f} dakika)")
        
        return translated
        
    except Exception as e:
        logging.error(f"❌ Batch {batch_num} hatası: {e}")
        state.failed_batches.append(batch_num)
        state.save()
        raise


def translate_with_batches(
    source_file: Path,
    target_file: Path,
    lang_pair: str,
    lang: str,
    translator: MarianTranslator
):
    """Batch çeviri ana fonksiyonu - RESUME DESTEKLİ"""
    
    global current_state
    
    # State'i kontrol et (resume modu)
    state = TranslationState.load(lang)
    is_resume = False
    
    if state:
        print(f"\n{'='*60}")
        print(f"🔄 KALDI

ĞI YERDEN DEVAM")
        print(f"{'='*60}")
        print(f"📅 Başlangıç: {state.start_time}")
        print(f"📅 Son güncelleme: {state.last_update}")
        print(f"✅ Tamamlanan batch: {len(state.completed_batches)}")
        print(f"❌ Başarısız batch: {len(state.failed_batches)}")
        print(f"🔄 Son batch: {state.current_batch}")
        print(f"{'='*60}\n")
        
        response = input("🤔 Kaldığınız yerden devam etmek istiyor musunuz? (E/H): ").strip().upper()
        
        if response == 'E':
            is_resume = True
            print("\n✅ Kaldığınız yerden devam ediliyor...\n")
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
    translator.stats['start_time'] = time.time()
    
    # Kaynak dosyayı yükle
    print("📖 Kaynak dosya okunuyor...")
    with open(source_file, 'r', encoding='utf-8') as f:
        source_data = json.load(f)
    
    flat_source = flatten_json(source_data)
    state.stats['total_keys'] = len(flat_source)
    print(f"✅ {len(flat_source):,} key yüklendi\n")
    
    # Existing ve completed key'leri al
    existing_keys = get_existing_keys(target_file)
    completed_keys = get_completed_keys_from_batches(lang)
    
    # Batch'leri oluştur
    batches = create_batches(flat_source, existing_keys, completed_keys, BATCH_SIZE)
    
    if not batches:
        print("✨ Tüm çeviriler zaten tamamlanmış!\n")
        TranslationState.clear()
        return True
    
    state.total_batches = len(batches)
    state.save()
    
    # Kullanıcı onayı (resume değilse)
    if not is_resume:
        response = input("🚀 Çeviriye başlamak istiyor musunuz? (E/H): ").strip().upper()
        if response != 'E':
            print("\n⏸️  İptal edildi.\n")
            return False
    
    # Batch'leri çevir
    print(f"\n{'='*60}")
    print(f"🔄 ÇEVİRİ BAŞLADI")
    print(f"{'='*60}\n")
    
    for batch_num, batch_data in batches:
        # Zaten tamamlanmış batch'i atla
        if batch_num in state.completed_batches:
            print(f"⏭️  Batch {batch_num} zaten tamamlanmış, atlanıyor...")
            continue
        
        try:
            # Batch'i çevir
            translated_batch = translate_batch(
                batch_num,
                batch_data,
                lang_pair,
                translator,
                state.total_batches,
                state
            )
            
            # Batch'i kaydet
            save_batch(translated_batch, lang, batch_num)
            
            # State'i güncelle
            state.completed_batches.append(batch_num)
            state.stats['translated_keys'] += len(translated_batch)
            state.save()
            
        except KeyboardInterrupt:
            raise  # Signal handler yakalayacak
        except Exception as e:
            logging.error(f"❌ Batch {batch_num} başarısız: {e}")
            print(f"\n⚠️  Batch {batch_num} atlandi, sonraki batch'e geçiliyor...\n")
            continue
    
    # Tamamlandı
    print(f"\n{'='*60}")
    print(f"✅ TÜM BATCH'LER TAMAMLANDI!")
    print(f"📊 Toplam: {state.stats['translated_keys']:,} key çevrildi")
    print(f"{'='*60}\n")
    
    return True


def show_merge_summary(lang: str) -> Tuple[int, List[Path]]:
    """Birleştirme özeti"""
    batch_files = sorted(BATCH_DIR.glob(f"batch_*_{lang}.json"))
    
    if not batch_files:
        return 0, []
    
    print(f"\n{'='*60}")
    print(f"🔗 BİRLEŞTİRME ÖNCESİ ÖZET - {lang.upper()}")
    print(f"{'='*60}\n")
    
    total_keys = 0
    for bf in batch_files:
        with open(bf, 'r', encoding='utf-8') as f:
            data = json.load(f)
        total_keys += len(data)
        print(f"  ✓ {bf.name}: {len(data):,} key")
    
    print(f"\n📊 TOPLAM: {total_keys:,} key")
    print(f"{'='*60}\n")
    
    return total_keys, batch_files


def confirm_merge() -> bool:
    """Birleştirme onayı"""
    while True:
        response = input("🤔 Batch'leri birleştirmek istiyor musunuz? (E/H): ").strip().upper()
        if response == 'E':
            return True
        elif response == 'H':
            print("\n⏸️  Birleştirme iptal edildi.\n")
            return False


def merge_batches(lang: str, output_file: Path, auto_confirm: bool = False):
    """Batch'leri birleştir"""
    
    total_keys, batch_files = show_merge_summary(lang)
    
    if not batch_files:
        return 0
    
    if not auto_confirm and not confirm_merge():
        return 0
    
    print("\n🔗 Birleştiriliyor...\n")
    
    merged = {}
    if output_file.exists():
        with open(output_file, 'r', encoding='utf-8') as f:
            merged = flatten_json(json.load(f))
    
    with tqdm(total=len(batch_files), desc="Merge", unit="batch", colour='cyan') as pbar:
        for bf in batch_files:
            with open(bf, 'r', encoding='utf-8') as f:
                merged.update(json.load(f))
            pbar.update(1)
    
    print("\n🔄 Nested yapı oluşturuluyor...")
    nested = unflatten_json(merged)
    
    print(f"💾 {output_file} yazılıyor...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(nested, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Birleştirme tamamlandı: {len(merged):,} key\n")
    
    # State'i temizle
    TranslationState.clear()
    
    return len(merged)


def main():
    project_root = Path(__file__).parent.parent
    messages_dir = project_root / "messages"
    
    tr_file = messages_dir / "tr.json"
    en_file = messages_dir / "en.json"
    sr_file = messages_dir / "sr.json"
    
    if not tr_file.exists():
        print(f"❌ Kaynak dosya bulunamadı: {tr_file}")
        sys.exit(1)
    
    translator = MarianTranslator()
    
    print("\n" + "="*60)
    print("🌍 MarianMT Batch Çeviri - RESUME DESTEKLİ")
    print("="*60)
    print("\n1️⃣  tr -> en")
    print("2️⃣  tr -> sr")
    print("3️⃣  Her ikisi")
    print("4️⃣  Sadece birleştir")
    print("5️⃣  State'i temizle")
    print("\nq: Çıkış\n")
    
    choice = input("Seçim (1/2/3/4/5): ").strip()
    
    if choice == 'q':
        sys.exit(0)
    
    if choice == '5':
        TranslationState.clear()
        print("\n✅ State temizlendi!\n")
        sys.exit(0)
    
    if choice == '4':
        merge_batches('en', en_file)
        merge_batches('sr', sr_file)
        sys.exit(0)
    
    if choice in ['1', '3']:
        translate_with_batches(tr_file, en_file, "tr-en", "en", translator)
        merge_batches('en', en_file)
    
    if choice in ['2', '3']:
        try:
            translate_with_batches(tr_file, sr_file, "tr-sh", "sr", translator)
        except:
            translate_with_batches(en_file, sr_file, "en-sh", "sr", translator)
        merge_batches('sr', sr_file)
    
    print("\n✅ İŞLEM TAMAMLANDI!\n")


if __name__ == "__main__":
    main()