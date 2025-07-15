# 📤 GitHub'a Dosya Yükleme Rehberi

## 🎯 İLK ÖNCE: GitHub Hesabı Oluştur

### 1. GitHub'a Git
- 🌐 **Adres:** https://github.com
- 🖱️ **"Sign up"** butonuna tıkla

### 2. Kayıt Formu Doldur
```
Email: (email adresin)
Password: (güçlü bir şifre)
Username: (kullanıcı adın, örn: elifkitapkurdu)
```

### 3. Email Doğrulama
- 📧 **Email kutunu kontrol et**
- ✅ **Doğrulama linkine tıkla**

---

## 📁 ADIM 1: Repository (Proje Klasörü) Oluştur

### 1.1 New Repository
- ➕ **Sağ üstte "+" işaretine** tıkla
- 📂 **"New repository"** seç

### 1.2 Repository Ayarları
```
Repository name: kitap-kurdu-blog
Description: Gelmemeyegiden Kitap Kurdu Blog Sitesi
🔓 Public (herkes görebilir)
✅ Add a README file (işaretle)
```

### 1.3 Oluştur
- 🚀 **"Create repository"** tıkla
- 🎉 **Tebrikler!** Repository oluşturuldu

---

## 📤 ADIM 2: Dosyaları Yükleme (3 Yöntem)

## 🖱️ **YÖNTEM 1: Sürükle-Bırak (En Kolay)**

### 2.1 Repository Sayfasında
- 📂 **Repository'nin ana sayfasına git**
- 📤 **"uploading an existing file"** linkine tıkla

### 2.2 Dosyaları Sürükle
- 🗂️ **Bilgisayarından tüm dosyaları seç**
- 🖱️ **GitHub sayfasına sürükle-bırak**
- ⏳ **Yükleme çubuğunu bekle**

### 2.3 Commit (Kaydet)
```
Commit message: İlk blog dosyaları eklendi
Description: (boş bırakabilirsin)
```
- ✅ **"Commit changes"** tıkla

---

## 📎 **YÖNTEM 2: Dosya Seçerek Yükleme**

### 2.1 Upload Files
- 📤 **"Upload files"** butonuna tıkla

### 2.2 Dosya Seç
- 📁 **"choose your files"** tıkla
- 🗂️ **Tüm dosyaları seç** (Ctrl+A)
- 🔄 **"Open"** tıkla

### 2.3 Commit Yap
- 💬 **Commit mesajı:** "Blog dosyaları yüklendi"
- ✅ **"Commit changes"** tıkla

---

## ⚡ **YÖNTEM 3: Tek Tek Dosya Ekleme**

### 3.1 Create New File
- ➕ **"Create new file"** tıkla

### 3.2 Dosya İçeriği
```
Dosya adı: index.html
İçerik: (dosya içeriğini kopyala-yapıştır)
```

### 3.3 Her Dosya İçin Tekrarla
- 🔄 **Her HTML/JS dosyası için aynı işlemi yap**
- 📝 **İçerikleri kopyala-yapıştır**

---

## 🖼️ RESİM DOSYALARI İÇİN ÖZEL İŞLEM

### Resim Yükleme
- 📷 **Resim dosyalarını ayrı yükle**
- 📁 **"Upload files"** kullan
- 🖼️ **JPG, PNG dosyalarını seç**

### Resim Yollarını Düzelt
```html
Eski: src="kdmx6kuvyn.jpg"
Yeni: src="./kdmx6kuvyn.jpg"
```

---

## ✅ BAŞARILI YÜKLEME KONTROLÜ

### Kontrol Listesi
```
✅ index.html - Ana sayfa
✅ yazilar.html - Yazılar sayfası
✅ hakkimda.html - Hakkımda sayfası
✅ roportaj.html - Röportaj sayfası
✅ anketler.html - Anketler sayfası
✅ kitaplar.html - Kitaplar sayfası
✅ supabase-client.js - Database bağlantısı
✅ Resim dosyaları (.jpg)
```

### Repository Görünümü
```
kitap-kurdu-blog/
├── index.html
├── yazilar.html
├── hakkimda.html
├── roportaj.html
├── anketler.html
├── kitaplar.html
├── supabase-client.js
├── kdmx6kuvyn.jpg
├── f05z3kwc03.jpg
└── diğer resimler...
```

---

## 🔧 SORUN GİDERME

### Dosya Yüklenmiyor?
1. **İnternet bağlantısını** kontrol et
2. **Dosya boyutu** 25MB'dan küçük olmalı
3. **Tarayıcıyı yenile** (F5)
4. **Farklı tarayıcı dene**

### Resimler Görünmüyor?
1. **Dosya yollarını kontrol et**
2. **Büyük/küçük harfe dikkat et**
3. **Özel karakterleri kaldır**

### Commit Hatası?
1. **Commit mesajı boş olmasın**
2. **En az 1 dosya seçili olmalı**
3. **Sayfayı yenile ve tekrar dene**

---

## 🎯 SONRAKİ ADIM: Netlify'a Bağla

### GitHub Repository Hazır!
- ✅ **Tüm dosyalar yüklendi**
- ✅ **Repository public**
- ✅ **Commit yapıldı**

### Şimdi Netlify'a Git
- 🌐 **netlify.com** adresine git
- 🔗 **"New site from Git"** seç
- 📂 **GitHub repository'ni bağla**
- 🚀 **Deploy et**

---

## 📱 GÜNCELLEMELER İÇİN

### Dosya Güncellerken
1. **Repository'ye git**
2. **Dosyaya tıkla** (örn: index.html)
3. ✏️ **Edit (kalem) butonuna tıkla**
4. **Değişiklikleri yap**
5. **Commit changes** tıkla

### Yeni Dosya Eklerken
1. **"Upload files"** tıkla
2. **Yeni dosyaları seç**
3. **Commit yap**
4. **Netlify otomatik günceller**

---

## 🎉 TEBRİKLER!

GitHub'a dosyalarını başarıyla yükledin! 🚀

**Sonraki adım:** Netlify'a bağlayıp canlı siteyi oluşturmak.

**Repository linkin:** https://github.com/[kullanıcı-adın]/kitap-kurdu-blog