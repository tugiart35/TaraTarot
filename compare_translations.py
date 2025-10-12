import json
import os

def find_key_differences(tr_data, en_data, path=""):
    missing_keys = []
    extra_keys = []

    if isinstance(tr_data, dict) and isinstance(en_data, dict):
        tr_keys = set(tr_data.keys())
        en_keys = set(en_data.keys())

        # Find missing keys in en.json
        for key in tr_keys - en_keys:
            missing_keys.append(f"{path}.{key}" if path else key)

        # Find extra keys in en.json
        for key in en_keys - tr_keys:
            extra_keys.append(f"{path}.{key}" if path else key)

        # Recurse into common keys
        for key in tr_keys.intersection(en_keys):
            new_path = f"{path}.{key}" if path else key
            missing, extra = find_key_differences(tr_data[key], en_data[key], new_path)
            missing_keys.extend(missing)
            extra_keys.extend(extra)

    # This part handles cases where one is a dict and the other is not, under the same key.
    elif isinstance(tr_data, dict) and not isinstance(en_data, dict):
        missing_keys.append(f"{path} (yapı uyuşmazlığı: tr'de obje, en'de değil)")
    elif not isinstance(tr_data, dict) and isinstance(en_data, dict):
        extra_keys.append(f"{path} (yapı uyuşmazlığı: en'de obje, tr'de değil)")


    return missing_keys, extra_keys

def main():
    try:
        tr_path = os.path.join(os.getcwd(), 'messages', 'tr.json')
        en_path = os.path.join(os.getcwd(), 'messages', 'en.json')

        with open(tr_path, 'r', encoding='utf-8') as f:
            tr_json = json.load(f)
        with open(en_path, 'r', encoding='utf-8') as f:
            en_json = json.load(f)

        missing, extra = find_key_differences(tr_json, en_json)

        if missing:
            print("`en.json` dosyasında eksik olan anahtarlar:")
            for key in sorted(missing):
                print(f"- {key}")
        else:
            print("`en.json` dosyasında `tr.json`a göre eksik anahtar bulunamadı.")

        print("\n" + "="*30 + "\n") # Ayırıcı

        if extra:
            print("`en.json` dosyasında bulunan (`tr.json`da olmayan) fazla anahtarlar:")
            for key in sorted(extra):
                print(f"- {key}")
        else:
            print("`en.json` dosyasında `tr.json`a göre fazla anahtar bulunamadı.")

    except FileNotFoundError as e:
        print(f"Hata: Dosya bulunamadı -> {e}")
    except json.JSONDecodeError as e:
        print(f"Hata: JSON dosyası okunurken bir sorun oluştu -> {e}")
    except Exception as e:
        print(f"Beklenmedik bir hata oluştu: {e}")

if __name__ == "__main__":
    main()
