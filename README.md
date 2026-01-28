# 🎵 90s Retro Music Player

Nostaljik 90'lar temalı, modern web teknolojileri ile geliştirilmiş bir müzik oynatıcı. Winamp, Sony Walkman, Boombox ve daha fazla retro cihaz temasıyla müzik dinleme deneyimi sunar.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?style=flat-square&logo=css3)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Özellikler

- 🎨 **7 Farklı Retro Tema**
  - Winamp - Klasik MP3 oynatıcı
  - BMW E38 - Araba stereo sistemi
  - Pioneer CDJ-2000 - DJ kontrol ünitesi
  - Sony Walkman - Taşınabilir CD çalar
  - Boombox - 80'ler kasetçalar
  - Technics SL-1200 - Pikap
  - Atari 2600 - Oyun konsolu

- 🎵 **Müzik Oynatıcı Özellikleri**
  - Oynat / Duraklat / Durdur
  - Önceki / Sonraki parça geçişi
  - Ses seviyesi kontrolü
  - İlerleme çubuğu
  - Playlist desteği

- 📱 **Tam Responsive Tasarım**
  - Mobil uyumlu (iOS/Android)
  - Tablet desteği
  - Masaüstü optimizasyonu

- 🌟 **Görsel Efektler**
  - CRT scanlines efekti
  - Neon glow animasyonları
  - Retro grid arka plan
  - Tema bazlı animasyonlar

## 🛠️ Teknolojiler

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| [Next.js](https://nextjs.org/) | 16.1.4 | React tabanlı full-stack framework |
| [React](https://react.dev/) | 19.2.3 | UI component library |
| [CSS Modules](https://github.com/css-modules/css-modules) | - | Scoped CSS styling |
| [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | - | Tarayıcı ses kontrolü |
| [Google Fonts](https://fonts.google.com/) | - | Press Start 2P, VT323 fontları |

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

1. **Repoyu klonlayın**
```bash
git clone https://github.com/kullaniciadi/90s-retro-music-player.git
cd 90s-retro-music-player
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
# veya
yarn install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
# veya
yarn dev
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

## 🎶 Müzik Ekleme

1. MP3 dosyalarınızı `public/music/` klasörüne kopyalayın

2. `app/page.js` dosyasındaki `songs` dizisini güncelleyin:

```javascript
const songs = [
  { name: "Şarkı Adı 1", file: "/music/sarki1.mp3" },
  { name: "Şarkı Adı 2", file: "/music/sarki2.mp3" },
];
```

### Desteklenen Formatlar
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)

## 📁 Proje Yapısı

```
90s-retro-music-player/
├── app/
│   ├── components/
│   │   ├── Player/
│   │   │   ├── Player.js          # Ana oynatıcı bileşeni
│   │   │   ├── Player.module.css  # Oynatıcı stilleri
│   │   │   └── themes/            # Tema CSS dosyaları
│   │   │       ├── WinampTheme.module.css
│   │   │       ├── WalkmanTheme.module.css
│   │   │       ├── BoomboxTheme.module.css
│   │   │       ├── TechnicsTheme.module.css
│   │   │       ├── CDJTheme.module.css
│   │   │       ├── AtariTheme.module.css
│   │   │       └── BMWTheme.module.css
│   │   └── ThemeSelector/
│   │       ├── ThemeSelector.js
│   │       └── ThemeSelector.module.css
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── page.module.css
├── public/
│   ├── music/                     # Müzik dosyaları
│   └── favicon.png
├── package.json
└── README.md
```

## 🎨 Tema Önizlemeleri

Her tema, orijinal cihazın görünümünü ve hissini yansıtacak şekilde tasarlanmıştır:

| Tema | Açıklama |
|------|----------|
| 🟢 **Winamp** | Klasik yeşil LCD ekranlı Winamp 2.x görünümü |
| 🚗 **BMW E38** | Turuncu LCD ekranlı araba stereo sistemi |
| 🎧 **CDJ-2000** | Profesyonel DJ ekipmanı arayüzü |
| 📀 **Walkman** | Sony taşınabilir CD çalar tasarımı |
| 📻 **Boombox** | VU metreli 80'ler kasetçalar |
| 🎚️ **Technics** | Dönen plaklı pikap tasarımı |
| 🕹️ **Atari** | Retro oyun konsolu görünümü |

## 📜 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

## 📞 İletişim

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

<p align="center">
  Made with ❤️ and 90s nostalgia
</p>
