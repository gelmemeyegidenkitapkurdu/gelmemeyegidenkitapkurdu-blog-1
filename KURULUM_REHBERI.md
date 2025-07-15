# 🚀 www.gelmemeyegidenkitapkurdu.com - Adım Adım Kurulum Rehberi

## 📋 GENEL BAKIŞ
**Hedef Domain:** www.gelmemeyegidenkitapkurdu.com  
**Tahmini Süre:** 2-3 saat  
**Maliyet:** $12-15/yıl (sadece domain)  
**Hosting:** Ücretsiz (Netlify)

---

## 🎯 ADIM 1: DOMAIN SATIN ALMA (15 dakika)

### 1.1 Namecheap'e Git
- 🌐 **Adres:** https://www.namecheap.com
- 📝 **İşlem:** "Kayıt Ol" butonuna tıkla

### 1.2 Domain Ara
```
Arama kutusuna yaz: gelmemeyegidenkitapkurdu.com
```
- ✅ **Müsaitse:** "Add to Cart" tıkla
- ❌ **Değilse:** `.net` veya `.blog` dene

### 1.3 Satın Alma
- 🛒 **Sepet:** Domain'i sepete ekle
- 💳 **Ödeme:** Kredi kartı ile öde
- 📧 **Email:** Doğrulama emailini kontrol et

**✅ Kontrol:** Domain paneline erişebildin mi?

---

## 🎯 ADIM 2: GITHUB HESABI OLUŞTUR (10 dakika)

### 2.1 GitHub'a Kayıt Ol
- 🌐 **Adres:** https://github.com
- 📝 **İşlem:** "Sign up" tıkla
- 📧 **Email:** Kullandığın email adresini gir

### 2.2 Repository Oluştur
- ➕ **New Repository** tıkla
- 📛 **İsim:** `kitap-kurdu-blog`
- 🔓 **Public** seç
- ✅ **Create repository** tıkla

**✅ Kontrol:** Repository oluşturuldu mu?

---

## 🎯 ADIM 3: YOUWARE'DEN DOSYALARI İNDİR (5 dakika)

### 3.1 Proje Kodlarını İndir
- 🏠 YouWare proje sayfasına git
- ⬇️ "Download" butonuna tıkla
- 📁 ZIP dosyasını bilgisayarına kaydet
- 📂 ZIP'i aç ve klasörü kontrol et

### 3.2 Dosya Kontrolü
Şu dosyalar olmalı:
```
✅ index.html
✅ yazilar.html  
✅ hakkimda.html
✅ roportaj.html
✅ anketler.html
✅ kitaplar.html
✅ supabase-client.js
✅ Resim dosyaları (.jpg)
```

**✅ Kontrol:** Tüm dosyalar mevcut mu?

---

## 🎯 ADIM 4: GITHUB'A DOSYALARI YÜKLE (10 dakika)

### 4.1 GitHub Repository'ye Git
- 🌐 GitHub'daki repository'ni aç
- 📤 "Upload files" tıkla

### 4.2 Dosyaları Sürükle-Bırak
- 📁 Tüm dosyaları seç
- 🖱️ GitHub sayfasına sürükle
- ⏳ Yükleme bitene kadar bekle

### 4.3 Commit Yap
- 💬 **Commit mesajı:** "İlk blog dosyaları eklendi"
- ✅ **Commit changes** tıkla

**✅ Kontrol:** Dosyalar GitHub'da görünüyor mu?

---

## 🎯 ADIM 5: NETLİFY'A KAYIT OL (5 dakika)

### 5.1 Netlify'a Git
- 🌐 **Adres:** https://netlify.com
- 🔗 **GitHub ile giriş:** "Sign up with GitHub" tıkla
- ✅ **İzin ver:** GitHub erişimini onay

### 5.2 Site Oluştur
- ➕ **"New site from Git"** tıkla  
- 🔗 **GitHub** seçeneğini seç
- 📂 **Repository seç:** `kitap-kurdu-blog`
- 🚀 **Deploy** tıkla

**✅ Kontrol:** Site yayınlandı mı? (xxx.netlify.app adresi verildi mi?)

---

## 🎯 ADIM 6: DOMAIN BAĞLAMA (15 dakika)

### 6.1 Netlify'da Domain Ayarları
- ⚙️ **Site settings** git
- 🌐 **Domain management** seç
- ➕ **"Add custom domain"** tıkla
- 📝 **Domain gir:** `gelmemeyegidenkitapkurdu.com`

### 6.2 DNS Kayıtlarını Al
Netlify şu bilgileri verecek:
```
A Record: @ → 75.2.60.5
CNAME: www → your-site-name.netlify.app
```

### 6.3 Namecheap'te DNS Ayarları
- 🌐 **Namecheap paneline** git
- ⚙️ **"Manage"** tıkla (domain yanında)
- 🔧 **"Advanced DNS"** sekmesi
- ➕ **"Add new record"** tıkla

**A Record ekle:**
```
Type: A Record
Host: @
Value: 75.2.60.5
TTL: Automatic
```

**CNAME Record ekle:**
```
Type: CNAME
Host: www
Value: your-site-name.netlify.app
TTL: Automatic
```

**✅ Kontrol:** DNS kayıtları eklendi mi?

---

## 🎯 ADIM 7: SSL SERTİFİKASI (Otomatik - 30 dakika)

### 7.1 Bekleme Süreci
- ⏳ **24 saat:** Domain propagasyonu
- 🔒 **SSL:** Netlify otomatik kuracak
- ✅ **Kontrol:** https://gelmemeyegidenkitapkurdu.com

### 7.2 Test Et
```
http://gelmemeyegidenkitapkurdu.com  ← Çalışmalı
https://gelmemeyegidenkitapkurdu.com ← Çalışmalı  
www.gelmemeyegidenkitapkurdu.com    ← Çalışmalı
```

**✅ Kontrol:** Tüm adresler çalışıyor mu?

---

## 🎯 ADIM 8: GOOGLE ANALYTİCS KURULUMU (10 dakika)

### 8.1 Google Analytics Hesabı
- 🌐 **Adres:** https://analytics.google.com
- ➕ **"Create Account"** tıkla
- 📝 **Account name:** "Kitap Kurdu Blog"
- 🌐 **Website:** `gelmemeyegidenkitapkurdu.com`

### 8.2 Tracking Code Al
Google sana şöyle bir kod verecek:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 8.3 Kodu Siteye Ekle
- 📝 **index.html** dosyasını aç
- 🔍 **`</head>` tagını** bul
- 📋 **Analytics kodunu** yapıştır (</head> tagından önce)
- 💾 **Dosyayı kaydet**
- 📤 **GitHub'a yükle**

**✅ Kontrol:** Analytics çalışıyor mu?

---

## 🎯 ADIM 9: SON KONTROLLER (10 dakika)

### 9.1 Fonksiyon Testleri
- ✅ **Ana sayfa** açılıyor mu?
- ✅ **Menü bağlantıları** çalışıyor mu?
- ✅ **Admin girişi** yapabiliyor musun?
- ✅ **Yazı ekleme** çalışıyor mu?
- ✅ **Resimler** görünüyor mu?

### 9.2 Mobil Test
- 📱 **Telefonda aç:** gelmemeyegidenkitapkurdu.com
- ✅ **Responsive** çalışıyor mu?
- ✅ **Menü** mobilde açılıyor mu?

### 9.3 SEO Kontrolleri
- 🔍 **Google'da ara:** site:gelmemeyegidenkitapkurdu.com
- ✅ **Sayfa başlıkları** doğru mu?
- ✅ **Meta açıklamalar** var mı?

---

## 🎉 TEBRİKLER! SİTENİZ HAZIR!

### 📊 Özet:
- ✅ **Domain:** gelmemeyegidenkitapkurdu.com aktif
- ✅ **Hosting:** Netlify üzerinde ücretsiz
- ✅ **SSL:** Güvenli bağlantı aktif
- ✅ **Analytics:** Google Analytics kurulu
- ✅ **Mobil:** Responsive tasarım çalışıyor

### 🔄 Güncellemeler İçin:
1. Dosyaları düzenle
2. GitHub'a yükle  
3. Netlify otomatik deploy eder
4. 2-3 dakika sonra güncellemeler yayınlanır

### 📞 Sorun Yaşarsan:
- 🆘 **Netlify Destek:** netlify.com/support
- 🆘 **Namecheap Destek:** support.namecheap.com
- 🆘 **GitHub Docs:** docs.github.com

---

## 🚨 SORUN GİDERME

### Domain Açılmıyor:
1. **DNS kontrolü:** 24-48 saat bekle
2. **Cache temizle:** Ctrl+F5 tuşlarına bas
3. **Farklı cihaz dene:** Telefondan kontrol et

### SSL Hatası:
1. **24 saat bekle:** Sertifika otomatik kurulur
2. **Netlify kontrol:** "Domain settings" bak
3. **HTTPS zorla:** Netlify ayarlarından

### Analytics Çalışmıyor:
1. **Kod kontrolü:** Analytics kodu doğru yerleşti mi?
2. **24 saat bekle:** Veriler görünmeye başlayacak  
3. **Real-time kontrol:** Analytics > Real-time

### Admin Girişi Sorunu:
1. **Supabase bağlantısı:** Çalışıyor mu?
2. **Email/şifre:** Doğru bilgileri girdin mi?
3. **Browser cache:** Temizle ve tekrar dene

---

**🎯 SON HEDEF:** www.gelmemeyegidenkitapkurdu.com tamamen hazır ve YouWare'den bağımsız!