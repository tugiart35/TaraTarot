
import json
import os
import google.generativeai as genai
import time
from tqdm import tqdm

def get_api_key():
    """Reads the Gemini API key from the specified file."""
    try:
        with open('.gemini/GEMINI.md', 'r') as f:
            content = f.read()
            # Assuming the key is in the format GEMINI_API_KEY=...
            for line in content.splitlines():
                if line.startswith("GEMINI_API_KEY="):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        print("Hata: .gemini/GEMINI.md dosyası bulunamadı.")
        return None
    except Exception as e:
        print(f"API anahtarı okunurken bir hata oluştu: {e}")
        return None

def translate_text(text, model):
    """Translates a single text string using the Gemini model."""
    if not isinstance(text, str) or not text.strip():
        return text
    
    # Heuristic to check for Turkish characters, reducing unnecessary API calls
    turkish_chars = "çğıöşüÇĞİÖŞÜ"
    if not any(char in text for char in turkish_chars):
        # If no specific Turkish characters are found, assume it's likely not Turkish.
        # This is a simple optimization.
        return text

    prompt = (
        "Translate the following Turkish text to English. "
        "Return ONLY the translated English text. Do not add any extra formatting, "
        "quotes, or introductory phrases like 'Here is the translation:'. "
        "If the text is a proper noun, a placeholder like '{variable}', or already in English, "
        "return the original text unchanged.\n\n"
        f"Turkish text: \"{text}\"\n"
        "English translation:"
    )
    
    try:
        # Add a small delay to respect potential rate limits
        time.sleep(1) 
        response = model.generate_content(prompt)
        
        # Clean up the response to get only the text
        translated_text = response.text.strip()
        return translated_text

    except Exception as e:
        print(f"\n'{text}' çevrilirken hata oluştu: {e}")
        # Return original text on failure
        return text

def traverse_and_translate(data, model, pbar):
    """Recursively traverses the JSON data and translates string values."""
    if isinstance(data, dict):
        new_dict = {}
        for key, value in data.items():
            new_dict[key] = traverse_and_translate(value, model, pbar)
        return new_dict
    elif isinstance(data, list):
        new_list = []
        for item in data:
            new_list.append(traverse_and_translate(item, model, pbar))
        return new_list
    elif isinstance(data, str):
        pbar.update(1) # Update progress bar for each string found
        return translate_text(data, model)
    else:
        return data

def count_strings(data):
    """Recursively counts the number of strings in the JSON data."""
    count = 0
    if isinstance(data, dict):
        for key, value in data.items():
            count += count_strings(value)
    elif isinstance(data, list):
        for item in data:
            count += count_strings(item)
    elif isinstance(data, str):
        count += 1
    return count

def main():
    """Main function to run the translation script."""
    api_key = get_api_key()
    if not api_key:
        print("API anahtarı alınamadı. İşlem durduruldu.")
        return

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-pro')

    en_path = os.path.join(os.getcwd(), 'messages', 'en.json')

    try:
        with open(en_path, 'r', encoding='utf-8') as f:
            en_data = json.load(f)
        
        print(f"'{en_path}' dosyasındaki metinler sayılıyor...")
        total_strings = count_strings(en_data)
        print(f"Toplam {total_strings} adet metin bulundu. Çeviri işlemi başlıyor...")

        with tqdm(total=total_strings, desc="Çevriliyor", unit=" metin") as pbar:
            translated_data = traverse_and_translate(en_data, model, pbar)

        with open(en_path, 'w', encoding='utf-8') as f:
            json.dump(translated_data, f, ensure_ascii=False, indent=2)

        print(f"\nÇeviri tamamlandı ve '{en_path}' dosyası güncellendi.")

    except FileNotFoundError:
        print(f"Hata: '{en_path}' dosyası bulunamadı.")
    except json.JSONDecodeError:
        print(f"Hata: '{en_path}' dosyası geçerli bir JSON formatında değil.")
    except Exception as e:
        print(f"Beklenmedik bir hata oluştu: {e}")

if __name__ == "__main__":
    main()
