#!/usr/bin/env python3
"""
Argos Translate TR-SR paketlerini indir ve kur
"""

import argostranslate.package
import argostranslate.translate

print("🔄 Paket deposu güncelleniyor...")

try:
    # Paket indexini güncelle
    argostranslate.package.update_package_index()
    
    # Mevcut paketleri listele
    available_packages = argostranslate.package.get_available_packages()
    
    print(f"\n📦 Toplam {len(available_packages)} paket bulundu")
    
    # TR-SR paketini bul
    tr_sr_package = None
    
    for pkg in available_packages:
        if pkg.from_code == "tr" and pkg.to_code == "sr":
            tr_sr_package = pkg
            print(f"\n✓ TR -> SR paketi bulundu: {pkg}")
            break
    
    if tr_sr_package:
        if not tr_sr_package.is_installed():
            print(f"\n⬇️  Paket indiriliyor...")
            download_path = tr_sr_package.download()
            print(f"✓ İndirildi: {download_path}")
            
            print(f"\n📦 Paket kuruluyor...")
            argostranslate.package.install_from_path(download_path)
            print(f"✅ Kurulum tamamlandı!")
        else:
            print(f"\n✅ Paket zaten yüklü")
    else:
        print(f"\n❌ TR -> SR paketi bulunamadı")
        print(f"\nMevcut paketler:")
        for pkg in available_packages:
            if pkg.from_code == "tr":
                print(f"  - TR -> {pkg.to_code}: {pkg}")
    
    # Yüklü dilleri kontrol et
    print(f"\n📚 Yüklü diller:")
    installed_languages = argostranslate.translate.get_installed_languages()
    for lang in installed_languages:
        print(f"  - {lang.code}: {lang.name}")
    
    # Test et
    tr_lang = next((lang for lang in installed_languages if lang.code == "tr"), None)
    sr_lang = next((lang for lang in installed_languages if lang.code == "sr"), None)
    
    if tr_lang and sr_lang:
        tr_to_sr = tr_lang.get_translation(sr_lang)
        test_text = "Merhaba dünya"
        result = tr_to_sr.translate(test_text)
        print(f"\n🧪 Test çevirisi:")
        print(f"   TR: {test_text}")
        print(f"   SR: {result}")
        print(f"\n✅ Argos Translate hazır!")
    else:
        print(f"\n❌ TR veya SR dili bulunamadı")

except Exception as e:
    print(f"\n❌ Hata: {str(e)}")
    import traceback
    traceback.print_exc()

