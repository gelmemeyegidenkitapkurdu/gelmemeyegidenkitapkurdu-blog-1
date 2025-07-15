# 🌐 Gelmemeyegiden Kitap Kurdu - Domain ve Hosting Rehberi

## 📋 Hedef
- YouWare'den bağımsız blog sitesi
- Özel www domain adresi
- Görüntüleme istatistiklerini gizleme
- Profesyonel blog görünümü

## 🎯 1. DOMAIN SEÇENEKLERİ

### Önerilen Domain Adları:
1. **www.gelmemeyegidenkitapkurdu.com** (En uygun)
2. **www.kitapkurdu.blog** (Kısa ve hatırlanır)
3. **www.gelmemeyen-kitap.com** (Alternatif)
4. **www.kitapblogu.net** (Genel)
5. **www.okuyankalp.com** (Yaratıcı)

### Domain Uzantı Önerileri:
- **.com** - En popüler ve güvenilir
- **.blog** - Blog siteleri için özel
- **.net** - Alternatif seçenek
- **.com.tr** - Türkiye odaklı

## 💰 2. MALİYET ANALİZİ

### Domain Maliyetleri (Yıllık):
- **.com** = $10-15/yıl
- **.blog** = $25-35/yıl  
- **.net** = $12-18/yıl
- **.com.tr** = ₺50-80/yıl

### Hosting Maliyetleri:
- **Ücretsiz**: Netlify, Vercel, GitHub Pages
- **Ücretli**: $5-20/ay (daha fazla özellik)

## 🛠️ 3. HOSTİNG SEÇENEKLERİ

### A) Ücretsiz Hosting (Önerilen):

#### **1. Netlify** ⭐ (En Çok Önerilen)
- ✅ Ücretsiz SSL sertifikası
- ✅ Özel domain bağlama
- ✅ Hızlı CDN
- ✅ Otomatik deploy
- ✅ Form işleme

#### **2. Vercel**
- ✅ Çok hızlı
- ✅ Kolay kurulum
- ✅ GitHub entegrasyonu
- ⚠️ Bant genişliği limiti

#### **3. GitHub Pages**
- ✅ Tamamen ücretsiz
- ✅ GitHub ile entegre
- ⚠️ Sadece statik siteler

### B) Ücretli Hosting:
- **Hostinger**: $2-5/ay
- **DigitalOcean**: $5-10/ay
- **AWS**: Kullanıma göre değişken

## 📝 4. ADIM ADIM KURULUM REHBERİ

### Adım 1: Domain Satın Alma
1. **Domain sağlayıcısı seçin:**
   - Namecheap (Önerilen)
   - GoDaddy
   - Domain.com

2. **Domain arayın ve satın alın:**
   - Seçtiğiniz domain adını arayın
   - Müsaitse sepete ekleyin
   - Ödeme yapın (Yıllık)

### Adım 2: Hosting Kurulumu (Netlify Örneği)

1. **Netlify'a kayıt olun:**
   - netlify.com'a gidin
   - GitHub hesabıyla giriş yapın

2. **Site yüklemesi:**
   - "New site from Git" tıklayın
   - GitHub repository'nizi bağlayın
   - Deploy ayarlarını yapın

3. **Domain bağlama:**
   - Site ayarlarına gidin
   - "Domain management" seçin
   - "Add custom domain" tıklayın
   - Domain adınızı girin

### Adım 3: DNS Ayarları

1. **Domain sağlayıcınızda:**
   - DNS yönetim paneline gidin
   - Nameserver'ları değiştirin veya
   - A/CNAME record'ları ekleyin

2. **Netlify DNS ayarları:**
   ```
   A Record: @ → 75.2.60.5
   CNAME: www → yoursitename.netlify.app
   ```

### Adım 4: SSL Sertifikası
- Netlify otomatik olarak ücretsiz SSL verir
- 24 saat içinde aktif olur
- Hiçbir ek işlem gerekmez

## 🚀 5. SİTE TRANSFER İŞLEMİ

### YouWare'den Dosya İndirme:
1. Proje ayarlarından kodları indirin
2. Tüm HTML, CSS, JS dosyalarını alın
3. Resim ve medya dosyalarını dahil edin

### GitHub Repository Oluşturma:
1. GitHub'da yeni repository oluşturun
2. Dosyaları yükleyin
3. Repository'yi public yapın

### Hosting'e Deploy:
1. Repository'yi hosting'e bağlayın
2. Build ayarlarını yapın
3. Deploy'u başlatın

## 📊 6. ANALİTİKS KURULUMU

### Kendi İstatistikleriniz İçin:
1. **Google Analytics**
   - Ücretsiz
   - Detaylı raporlar
   - Gerçek zamanlı takip

2. **Umami Analytics**
   - Gizlilik odaklı
   - Basit arayüz
   - GDPR uyumlu

### Kod Ekleme:
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

## ⚠️ 7. ÖNEMLİ NOTLAR

### Dikkat Edilecekler:
- Domain propagasyonu 24-48 saat sürebilir
- SSL sertifikası aktivasyonu biraz zaman alır
- İlk kurulumda DNS ayarları kritik
- Yedekleme sistemini kurmayı unutmayın

### SEO İçin:
- robots.txt dosyası ekleyin
- sitemap.xml oluşturun
- Meta tag'leri optimize edin
- Google Search Console'a kayıt olun

## 📞 8. DESTEK VE YARDIM

### Sorun Yaşarsanız:
1. Hosting sağlayıcı desteği
2. Domain sağlayıcı canlı destek
3. Online topluluk forumları
4. YouTube tutorial videoları

## 🎉 9. SONUÇ

Bu rehberi takip ederek:
- ✅ Özel domain'li blog siteniz olacak
- ✅ YouWare'den tamamen bağımsız olacaksınız
- ✅ Sadece siz istatistikleri göreceksiniz
- ✅ Profesyonel görünüm kazanacaksınız
- ✅ Yıllık maliyet $10-50 arası olacak

**En iyi seçenek:** `www.gelmemeyegidenkitapkurdu.com` + Netlify hosting