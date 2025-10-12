
import json
import os

def synchronize_keys(tr_obj, en_obj):
    if not isinstance(tr_obj, dict):
        if type(tr_obj) == type(en_obj):
            return en_obj
        return tr_obj

    if not isinstance(en_obj, dict):
        return tr_obj

    result_obj = {}
    for key, tr_value in tr_obj.items():
        if key in en_obj:
            result_obj[key] = synchronize_keys(tr_value, en_obj[key])
        else:
            result_obj[key] = tr_value
    return result_obj

def main():
    try:
        tr_path = os.path.join(os.getcwd(), 'messages', 'tr.json')
        en_path = os.path.join(os.getcwd(), 'messages', 'en.json')

        with open(tr_path, 'r', encoding='utf-8') as f:
            tr_data = json.load(f)
        with open(en_path, 'r', encoding='utf-8') as f:
            en_data = json.load(f)

        new_en_data = synchronize_keys(tr_data, en_data)

        with open(en_path, 'w', encoding='utf-8') as f:
            json.dump(new_en_data, f, ensure_ascii=False, indent=2)

        print("en.json, tr.json ile başarıyla senkronize edildi.")

    except FileNotFoundError as e:
        print(f"Hata: Dosya bulunamadı -> {e}")
    except json.JSONDecodeError as e:
        print(f"Hata: JSON dosyası okunurken bir sorun oluştu -> {e}")
    except Exception as e:
        print(f"Beklenmedik bir hata oluştu: {e}")

if __name__ == "__main__":
    main()
