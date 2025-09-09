/*
info:
Bağlantılı dosyalar:
- '@/components/common/BaseCardRenderer': Ortak kart render bileşeni, tema ile özelleştiriliyor (gerekli)

Dosyanın amacı:
- Aşk tarot açılımı için, BaseCardRenderer bileşenini pink tema ile özelleştirerek kart renderı sağlar.
- Kod tekrarını önler, bakım kolaylığı ve tema bütünlüğü sunar.

Backend bağlantısı:
- Bu dosyada doğrudan backend ile ilgili bir değişken veya tablo kullanılmamaktadır.

Geliştirme ve öneriler:
- Linter/Prettier hataları (özellikle import sıralaması, stringlerde tek tırnak) düzeltilmeli.
- theme prop'unda tek tırnak kullanılmalı.
- BaseCardRendererProps importunda satır sonu virgül eklenmeli.
- Bileşen açıklamaları ve prop tipleri yeterli.

Hatalar:
- Linter/Prettier hataları mevcut (import sıralaması, stringlerde tek tırnak).

Okunabilirlik/Optimizasyon/Yeniden Kullanılabilirlik/Güvenlik:
- Kod okunabilir, sade ve modüler.
- BaseCardRenderer ile kod tekrarının önüne geçilmiş.
- Güvenlik açısından risk yok, sadece frontend state yönetimi.
- Yeniden kullanılabilirlik yüksek, farklı açılımlar için kolayca uyarlanabilir.

Kodda tekrar/gereksiz/eksik/kötü pratikler:
- theme prop'unda tek tırnak kullanılmalı.
- BaseCardRendererProps importunda satır sonu virgül eklenmeli.

Gereklilik ve Kullanım Durumu:
- BaseCardRenderer: Gerekli, kod tekrarını önler
- LoveCardRenderer: Gerekli, aşk açılımına özel tema sağlar
*/

'use client';

import { BaseCardRenderer, BaseCardRendererProps } from '@/features/shared/ui';

export interface LoveCardRendererProps
  extends Omit<BaseCardRendererProps, 'theme'> {
  // Aşk açılımına özel özellikler buraya eklenebilir
}

export default function LoveCardRenderer(props: LoveCardRendererProps) {
  return <BaseCardRenderer {...props} theme='pink' />;
}
