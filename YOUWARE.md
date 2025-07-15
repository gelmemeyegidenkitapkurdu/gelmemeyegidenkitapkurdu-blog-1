# Gelmemeyegiden Kitap Kurdu - Blog Projesi

## Proje Açıklaması
Bu bir kitap blogu projesidir. Pembe, beyaz ve mor renk temasında tasarlanmış, admin yönetimli bir blog sistemidir.

## Admin Bilgileri
- **Admin Email**: gelmemeyegidenkitapkurdu@gmail.com  
- **Admin Şifre**: Elif.6628.Akin
- **Önemli**: Admin bilgileri gizlidir ve demo değildir, sadece admin tarafından bilinmelidir.

## Özellikler
### Kullanıcı Yönetimi
- Üye kayıt sistemi (email + şifre)
- Kullanıcı girişi
- Admin girişi (özel yetkilerle)
- Profil resmi seçme özelliği

### İçerik Yönetimi
- **Yazılar**: Admin tarafından yayınlanır, herkes okuyabilir
- **Anketler**: Admin oluşturur, herkes katılabilir
- **Kitaplar**: Admin PDF kitap ekler, kullanıcılar okur ama indiremez
- **Röportaj Köşesi**: Yazarlarla röportajlar
- **Hakkımda**: Admin profil ve iletişim bilgileri

### Admin Yetkileri
- Tüm içerik türlerinde CRUD işlemleri
- Ana sayfa düzenleme
- Etkileşim analitikleri görme
- Medya yükleme (resim, video, PDF)

## Teknik Gereksinimler
### Backend (Supabase)
- Kullanıcı authentication
- Admin yetkilendirme
- Veritabanı yönetimi
- Dosya depolama
- Etkileşim takibi

### Frontend
- Responsive tasarım
- Animasyonlu "GELMEMEYEGİDENKİTAPKURDU" başlığı
- Modal sistemleri
- Kategori kartları
- Navigasyon menüsü

## Renk Paleti
- Ana renkler: Pembe (#ec4899), Mor (#9333ea), Beyaz (#ffffff)
- Gradient arka planlar
- Şeffaf overlay'ler

## Güvenlik
- Admin bilgileri şifrelenmiş olarak saklanmalı
- Dosya yükleme kısıtlamaları
- XSS koruması
- SQL injection koruması

## Kritik Kod Notları
- JavaScript olay işleyicilerinde (onclick) ID'leri ve indeksleri tırnak içinde aktarın (örn: `onclick="function('${id}', '${index}')"`)
- Modal içeriklerinde metin sarmalama özelliklerine dikkat edin (`white-space: pre-wrap; word-wrap: break-word;`)
- LocalStorage tabanlı veri depolama önemlidir (özellikle oy verme durumlarında)
- Admin/normal kullanıcı ayrımı `localStorage.getItem('isAdminLoggedIn')` kontrolü ile yapılmaktadır
- Anket oylamalarında onay dialog'u kullanılmaktadır
- Anket sonuçları sadece yüzdelik olarak gösterilir, oy sayıları sadece admin için görünürdür