// Supabase client dosyası - GelmemeyeGiden Kitap Kurdu Blog

// Supabase URL ve Anon Key
const SUPABASE_URL = 'https://oxqobtlcbksfdajnvnoz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cW9idGxjYmtzZmRham52bm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NTE3MzUsImV4cCI6MjA2NzUyNzczNX0.fIC24RysJVlnTS3LAxtqwe1luz3ED_SrfQeLnjmPnMk';

// Supabase istemcisini oluştur
let supabase;

// Supabase initialization
function initializeSupabase() {
    try {
        // Düzeltilen kod: Global supabase nesnesi yerine doğrudan createClient kullanımı
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase bağlantısı başarılı!');
        return true;
    } catch (error) {
        console.error('Supabase bağlantı hatası:', error);
        return false;
    }
}

// ADMIN 2FA FONKSİYONLARI //

// Admin email doğrulama kodu gönder
async function sendAdminVerificationCode(email) {
    try {
        // IP adresini al (basit bir yöntem)
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        const response = await fetch(`${SUPABASE_URL}/functions/v1/send-admin-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
                email: email,
                ip_address: ipData.ip || 'unknown'
            })
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Kod gönderilemedi');
        }

        return {
            success: true,
            message: result.message,
            test_code: result.test_code // Geçici test modu
        };
    } catch (error) {
        console.error('Email kod gönderme hatası:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Admin doğrulama kodunu kontrol et
async function verifyAdminCode(email, code) {
    try {
        // IP adresini al
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        const response = await fetch(`${SUPABASE_URL}/functions/v1/verify-admin-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
                email: email,
                code: code,
                ip_address: ipData.ip || 'unknown'
            })
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Kod doğrulanamadı');
        }

        return {
            success: true,
            message: result.message,
            verified: result.verified
        };
    } catch (error) {
        console.error('Kod doğrulama hatası:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// GENEL YARDIMCI FONKSİYONLAR //

// Loading göstergesi fonksiyonları
function showLoadingIndicator(message = 'Yükleniyor...') {
    // Mevcut loading göstergesini kaldır
    hideLoadingIndicator();
    
    // Yeni loading göstergesi oluştur
    const loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: white;
        font-family: Arial, sans-serif;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="
                border: 4px solid #f3f3f3;
                border-top: 4px solid #9333ea;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <div style="font-size: 18px; font-weight: 500;">${message}</div>
            <div style="font-size: 14px; margin-top: 10px; opacity: 0.8;">Lütfen bekleyin...</div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loader);
}

function hideLoadingIndicator() {
    const loader = document.getElementById('global-loader');
    if (loader) {
        loader.remove();
    }
}

// Başarı mesajı göster
function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #9333ea, #ec4899);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(147, 51, 234, 0.3);
        z-index: 10000;
        font-family: Arial, sans-serif;
        font-weight: 500;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">✅</span>
            <span>${message}</span>
        </div>
        <style>
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        </style>
    `;
    
    document.body.appendChild(toast);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
    
    // CSS animasyonu ekle
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Hata mesajı göster
function showErrorMessage(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #dc2626, #ef4444);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        z-index: 10000;
        font-family: Arial, sans-serif;
        font-weight: 500;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">❌</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // 5 saniye sonra kaldır
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// BLOG YAZILARI FONKSİYONLARI //

// Tüm blog yazılarını getir (sadece yayınlanmış olanlar)
async function getBlogPosts() {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Blog yazıları getirme hatası:', error);
        return [];
    }
}

// Admin için tüm blog yazılarını getir (taslak dahil)
async function getAllBlogPosts() {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Tüm blog yazıları getirme hatası:', error);
        return [];
    }
}

// Blog yazısı ekle
async function addBlogPost(post) {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .insert([post]);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Blog yazısı ekleme hatası:', error);
        return null;
    }
}

// Blog yazısı güncelle
async function updateBlogPost(id, updatedPost) {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .update(updatedPost)
            .eq('id', id);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Blog yazısı güncelleme hatası:', error);
        return null;
    }
}

// Blog yazısı sil
async function deleteBlogPost(id) {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Blog yazısı silme hatası:', error);
        return false;
    }
}

// ANKETLER FONKSİYONLARI //

// Tüm anketleri getir (sadece yayınlanmış olanlar)
async function getPolls() {
    try {
        const { data, error } = await supabase
            .from('polls')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Anketleri getirme hatası:', error);
        return [];
    }
}

// Admin için tüm anketleri getir (taslak dahil)
async function getAllPolls() {
    try {
        const { data, error } = await supabase
            .from('polls')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Tüm anketleri getirme hatası:', error);
        return [];
    }
}

// Anket ekle
async function addPoll(poll) {
    try {
        const { data, error } = await supabase
            .from('polls')
            .insert([poll]);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Anket ekleme hatası:', error);
        return null;
    }
}

// Anket güncelle
async function updatePoll(id, updatedPoll) {
    try {
        const { data, error } = await supabase
            .from('polls')
            .update(updatedPoll)
            .eq('id', id);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Anket güncelleme hatası:', error);
        return null;
    }
}

// Ankete oy ver
async function votePoll(id, optionIndex) {
    try {
        // Önce anketi getir
        const { data: poll, error: fetchError } = await supabase
            .from('polls')
            .select('*')
            .eq('id', id)
            .single();
            
        if (fetchError) throw fetchError;
        
        // Oy sayısını güncelle
        const votes = poll.votes || {};
        const optionKey = optionIndex.toString();
        votes[optionKey] = (votes[optionKey] || 0) + 1;
        
        // Anketi güncelle
        const { data, error } = await supabase
            .from('polls')
            .update({ votes })
            .eq('id', id);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Ankete oy verme hatası:', error);
        return null;
    }
}

// Anket sil
async function deletePoll(id) {
    try {
        const { data, error } = await supabase
            .from('polls')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Anket silme hatası:', error);
        return false;
    }
}

// KİTAPLAR FONKSİYONLARI //

// Tüm kitapları getir
async function getBooks() {
    try {
        const { data, error } = await supabase
            .from('books')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Kitapları getirme hatası:', error);
        return [];
    }
}

// Kitap ekle
async function addBook(book) {
    try {
        const { data, error } = await supabase
            .from('books')
            .insert([book]);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Kitap ekleme hatası:', error);
        return null;
    }
}

// Kitap güncelle
async function updateBook(id, updatedBook) {
    try {
        const { data, error } = await supabase
            .from('books')
            .update(updatedBook)
            .eq('id', id);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Kitap güncelleme hatası:', error);
        return null;
    }
}

// Kitap sil
async function deleteBook(id) {
    try {
        const { data, error } = await supabase
            .from('books')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Kitap silme hatası:', error);
        return false;
    }
}

// RÖPORTAJLAR FONKSİYONLARI //

// Tüm röportajları getir
async function getInterviews() {
    try {
        const { data, error } = await supabase
            .from('interviews')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Röportajları getirme hatası:', error);
        return [];
    }
}

// Röportaj ekle
async function addInterview(interview) {
    try {
        const { data, error } = await supabase
            .from('interviews')
            .insert([interview]);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Röportaj ekleme hatası:', error);
        return null;
    }
}

// Röportaj güncelle
async function updateInterview(id, updatedInterview) {
    try {
        const { data, error } = await supabase
            .from('interviews')
            .update(updatedInterview)
            .eq('id', id);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Röportaj güncelleme hatası:', error);
        return null;
    }
}

// Röportaj sil
async function deleteInterview(id) {
    try {
        const { data, error } = await supabase
            .from('interviews')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Röportaj silme hatası:', error);
        return false;
    }
}

// PROFİL FONKSİYONLARI //

// Profil bilgilerini getir
async function getProfile() {
    try {
        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .order('updated_at', { ascending: false })
            .limit(1);
            
        if (error) throw error;
        return data && data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('Profil bilgilerini getirme hatası:', error);
        return null;
    }
}

// Profil bilgilerini güncelle
async function updateProfile(profileData) {
    try {
        // Önce profil var mı diye kontrol et
        const currentProfile = await getProfile();
        
        if (currentProfile) {
            // Profil varsa güncelle
            console.log('Mevcut profil güncelleniyor...', currentProfile.id);
            const { data, error } = await supabase
                .from('profile')
                .update(profileData)
                .eq('id', currentProfile.id)
                .select();
                
            if (error) {
                console.error('Profil güncelleme Supabase hatası:', error);
                throw error;
            }
            
            console.log('Profil güncelleme sonucu:', data);
            return data && data.length > 0 ? data[0] : true;
        } else {
            // Profil yoksa yeni oluştur
            console.log('Yeni profil oluşturuluyor...');
            const { data, error } = await supabase
                .from('profile')
                .insert([profileData])
                .select();
                
            if (error) {
                console.error('Profil oluşturma Supabase hatası:', error);
                throw error;
            }
            
            console.log('Profil oluşturma sonucu:', data);
            return data && data.length > 0 ? data[0] : true;
        }
    } catch (error) {
        console.error('Profil güncelleme hatası:', error);
        throw error; // Hatayı yukarı fırlat ki UI'da gösterilsin
    }
}

// AUTHENTICATION FONKSİYONLARI //

// Admin olarak giriş yap
async function loginAsAdmin(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        
        // Admin yetkisini kontrol et (email = gelmemeyegidenkitapkurdu@gmail.com)
        if (data.user && data.user.email === 'gelmemeyegidenkitapkurdu@gmail.com') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            localStorage.setItem('adminEmail', data.user.email);
            return { success: true, user: data.user };
        } else {
            await supabase.auth.signOut();
            return { success: false, message: 'Admin yetkisi bulunamadı.' };
        }
    } catch (error) {
        console.error('Admin girişi hatası:', error);
        return { success: false, message: error.message };
    }
}

// Çıkış yap
async function logout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminEmail');
        return true;
    } catch (error) {
        console.error('Çıkış yapma hatası:', error);
        return false;
    }
}

// Mevcut oturum bilgisini kontrol et
async function checkSession() {
    try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data.session) {
            const user = data.session.user;
            if (user && user.email === 'gelmemeyegidenkitapkurdu@gmail.com') {
                localStorage.setItem('isAdminLoggedIn', 'true');
                localStorage.setItem('adminEmail', user.email);
                return { isLoggedIn: true, isAdmin: true, user };
            }
        }
        
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminEmail');
        return { isLoggedIn: false, isAdmin: false };
    } catch (error) {
        console.error('Oturum kontrolü hatası:', error);
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminEmail');
        return { isLoggedIn: false, isAdmin: false };
    }
}

// DOSYA YÜKLEME FONKSİYONLARI //

// Resim yükle - Tamamen yeniden yazılmış, sağlam hata yönetimi ile
async function uploadImage(file, path) {
    // Hata kayıtları için daha detaylı bilgiler
    console.log(`Resim yükleme başlatıldı - Dosya bilgileri:`, { 
        isFile: file instanceof File,
        name: file ? file.name : 'dosya yok', 
        type: file ? file.type : 'bilinmiyor',
        size: file ? `${(file.size / 1024).toFixed(2)} KB` : '0',
        path: path || 'belirtilmedi'
    });
    
    try {
        // DOĞRULAMA - Dosya kontrolü
        if (!file) {
            console.error('HATA: Dosya bulunamadı veya boş');
            showErrorMessage('Lütfen bir dosya seçin.');
            return null;
        }

        // DOĞRULAMA - Dosya türü kontrolü
        if (!file.type || !file.type.startsWith('image/')) {
            console.error(`HATA: Geçersiz dosya türü: ${file.type}`);
            showErrorMessage('Lütfen geçerli bir resim dosyası seçin (JPG, PNG, GIF, WebP).');
            return null;
        }

        // DOĞRULAMA - Dosya boyutu kontrolü (50MB)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            console.error(`HATA: Dosya boyutu çok büyük: ${(file.size / 1024 / 1024).toFixed(2)}MB > 50MB`);
            showErrorMessage(`Dosya boyutu çok büyük: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maksimum 50MB olmalıdır.`);
            return null;
        }

        // DOĞRULAMA - Çok küçük dosya kontrolü (potansiyel bozuk dosya)
        if (file.size < 100) { // 100 byte'dan küçük resimler muhtemelen bozuk
            console.error(`HATA: Dosya boyutu çok küçük (bozuk olabilir): ${file.size} bytes`);
            showErrorMessage('Dosya boyutu çok küçük veya bozuk görünüyor. Lütfen başka bir dosya seçin.');
            return null;
        }

        // DOĞRULAMA - Uzantı kontrolü
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
        let fileExtension = '';
        
        try {
            fileExtension = file.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                console.error(`HATA: Geçersiz dosya uzantısı: ${fileExtension}`);
                return null;
            }
        } catch (e) {
            console.error('HATA: Dosya uzantısı okunamadı:', e);
            // Varsayılan olarak MIME türünden uzantı belirleme
            if (file.type === 'image/jpeg') fileExtension = 'jpg';
            else if (file.type === 'image/png') fileExtension = 'png';
            else if (file.type === 'image/gif') fileExtension = 'gif';
            else if (file.type === 'image/webp') fileExtension = 'webp';
            else fileExtension = 'jpg'; // Varsayılan
        }

        // Benzersiz dosya adı oluştur - daha güvenilir yöntem
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 10);
        const fileName = `${timestamp}_${randomString}.${fileExtension}`;
        const filePath = path ? `${path}/${fileName}` : fileName;
        
        console.log(`Dosya yükleniyor: ${filePath}`);
        
        // YÜKLEME İŞLEMİ - Supabase storage'a yükle
        try {
            // Progress tracking için user feedback
            console.log('Dosya yükleniyor, lütfen bekleyin...');
            
            // Loading göstergesi (eğer varsa)
            if (typeof showLoadingIndicator === 'function') {
                showLoadingIndicator('Resim yükleniyor...');
            }
            
            const { data, error } = await supabase.storage
                .from('images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true, // Aynı isimli dosya varsa üzerine yaz
                    contentType: file.type || 'image/jpeg'
                });
                
            if (error) {
                console.error('STORAGE HATASI:', error);
                
                // Hata detaylarını yazdır
                if (error.message) console.error('Hata mesajı:', error.message);
                if (error.statusCode) console.error('HTTP kodu:', error.statusCode);
                
                // Farklı bir isimle tekrar dene
                console.log('Farklı isimle tekrar deneniyor...');
                const retryFileName = `retry_${timestamp}_${Math.random().toString(36).substring(2, 10)}.${fileExtension}`;
                const retryFilePath = path ? `${path}/${retryFileName}` : retryFileName;
                
                try {
                    const { data: retryData, error: retryError } = await supabase.storage
                        .from('images')
                        .upload(retryFilePath, file, {
                            cacheControl: '3600',
                            upsert: true
                        });
                        
                    if (retryError) {
                        console.error('TEKRAR YÜKLEME HATASI:', retryError);
                        return null;
                    }
                    
                    // Public URL oluştur
                    const { data: urlData } = supabase.storage
                        .from('images')
                        .getPublicUrl(retryFilePath);
                        
                    console.log('Dosya başarıyla yüklendi (2. deneme):', urlData.publicUrl);
                    return urlData.publicUrl;
                } catch (retryErr) {
                    console.error('TEKRAR YÜKLEME İSTİSNASI:', retryErr);
                    return null;
                }
            }
            
            // Public URL oluştur
            const { data: urlData } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);
                
            if (!urlData || !urlData.publicUrl) {
                console.error('URL OLUŞTURMA HATASI: Public URL alınamadı');
                return null;
            }
            
            console.log('Dosya başarıyla yüklendi:', urlData.publicUrl);
            
            // Loading göstergesini kapat ve başarı mesajı göster
            hideLoadingIndicator();
            showSuccessMessage('Resim başarıyla yüklendi!');
            
            return urlData.publicUrl;
        } catch (uploadError) {
            console.error('UPLOAD İSTİSNASI:', uploadError);
            return null;
        }
    } catch (error) {
        console.error('GENEL İSTİSNA:', error);
        console.error('Stack trace:', error.stack);
        return null;
    }
}

// PDF yükle
async function uploadPDF(file) {
    try {
        // Dosya kontrolü
        if (!file) {
            console.error('PDF dosyası bulunamadı');
            showErrorMessage('Lütfen bir PDF dosyası seçin.');
            return null;
        }

        // Dosya türü kontrolü
        if (file.type !== 'application/pdf') {
            console.error('Sadece PDF dosyaları yüklenebilir');
            showErrorMessage('Lütfen sadece PDF dosyası seçin.');
            return null;
        }

        // Dosya boyutu kontrolü (100MB)
        const maxSize = 100 * 1024 * 1024; // 100MB
        if (file.size > maxSize) {
            console.error(`PDF dosyası boyutu 100MB'dan büyük olamaz. Mevcut boyut: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
            showErrorMessage(`PDF dosyası boyutu çok büyük: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maksimum 100MB olmalıdır.`);
            return null;
        }

        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.pdf`;
        
        console.log('PDF yükleniyor:', fileName);
        
        // Loading göstergesi (eğer varsa)
        if (typeof showLoadingIndicator === 'function') {
            showLoadingIndicator('PDF yükleniyor...');
        }
        
        const { data, error } = await supabase.storage
            .from('books')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: true, // Aynı isimli dosya varsa üzerine yaz
                contentType: 'application/pdf'
            });
            
        if (error) {
            console.error('PDF yükleme hatası:', error);
            return null;
        }
        
        // Public URL oluştur
        const { data: urlData } = supabase.storage
            .from('books')
            .getPublicUrl(fileName);
            
        console.log('PDF başarıyla yüklendi:', urlData.publicUrl);
        
        // Loading göstergesini kapat ve başarı mesajı göster
        hideLoadingIndicator();
        showSuccessMessage('PDF kitap başarıyla yüklendi!');
        
        return urlData.publicUrl;
    } catch (error) {
        console.error('PDF yükleme hatası:', error);
        return null;
    }
}

// WHATSAPP RÖPORTAJLARI FONKSİYONLARI //

// Tüm WhatsApp röportajlarını getir (sadece yayınlanmış olanlar)
async function getWhatsAppInterviews() {
    try {
        const { data, error } = await supabase
            .from('whatsapp_interviews')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('WhatsApp röportajları getirme hatası:', error);
        return [];
    }
}

// Admin için tüm röportajları getir (taslak dahil)
async function getAllWhatsAppInterviews() {
    try {
        const { data, error } = await supabase
            .from('whatsapp_interviews')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Tüm WhatsApp röportajları getirme hatası:', error);
        return [];
    }
}

// WhatsApp röportajı ekle
async function addWhatsAppInterview(interview) {
    try {
        const { data, error } = await supabase
            .from('whatsapp_interviews')
            .insert([interview])
            .select();
            
        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('WhatsApp röportajı ekleme hatası:', error);
        return null;
    }
}

// Tek WhatsApp röportajı getir
async function getWhatsAppInterview(id) {
    try {
        const { data, error } = await supabase
            .from('whatsapp_interviews')
            .select('*')
            .eq('id', id)
            .single();
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('WhatsApp röportajı getirme hatası:', error);
        return null;
    }
}

// WhatsApp röportajı güncelle
async function updateWhatsAppInterview(id, updatedInterview) {
    try {
        const { data, error } = await supabase
            .from('whatsapp_interviews')
            .update(updatedInterview)
            .eq('id', id)
            .select();
            
        if (error) {
            console.error('Supabase güncelleme hatası:', error);
            throw error;
        }
        
        console.log('Röportaj güncelleme sonucu:', data);
        return data && data.length > 0 ? data[0] : true;
    } catch (error) {
        console.error('WhatsApp röportajı güncelleme hatası:', error);
        return null;
    }
}

// WhatsApp röportajı sil
async function deleteWhatsAppInterview(id) {
    try {
        // Önce röportaja ait tüm mesajları sil
        const { error: messagesError } = await supabase
            .from('whatsapp_messages')
            .delete()
            .eq('interview_id', id);
            
        if (messagesError) throw messagesError;
        
        // Sonra röportajı sil
        const { data, error } = await supabase
            .from('whatsapp_interviews')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('WhatsApp röportajı silme hatası:', error);
        return false;
    }
}

// Röportajın mesajlarını getir
async function getWhatsAppMessages(interviewId) {
    try {
        const { data, error } = await supabase
            .from('whatsapp_messages')
            .select('*')
            .eq('interview_id', interviewId)
            .order('message_order', { ascending: true });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('WhatsApp mesajları getirme hatası:', error);
        return [];
    }
}

// WhatsApp mesajı ekle
async function addWhatsAppMessage(message) {
    try {
        // Önce en yüksek message_order'ı bul
        const { data: lastMessage } = await supabase
            .from('whatsapp_messages')
            .select('message_order')
            .eq('interview_id', message.interview_id)
            .order('message_order', { ascending: false })
            .limit(1);
            
        const nextOrder = lastMessage && lastMessage.length > 0 ? lastMessage[0].message_order + 1 : 1;
        
        const { data, error } = await supabase
            .from('whatsapp_messages')
            .insert([{ ...message, message_order: nextOrder }])
            .select();
            
        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('WhatsApp mesajı ekleme hatası:', error);
        return null;
    }
}

// WhatsApp mesajı güncelle
async function updateWhatsAppMessage(id, updatedMessage) {
    try {
        const { data, error } = await supabase
            .from('whatsapp_messages')
            .update(updatedMessage)
            .eq('id', id)
            .select();
            
        if (error) {
            console.error('Supabase mesaj güncelleme hatası:', error);
            throw error;
        }
        
        console.log('Mesaj güncelleme sonucu:', data);
        return data && data.length > 0 ? data[0] : true;
    } catch (error) {
        console.error('WhatsApp mesajı güncelleme hatası:', error);
        return null;
    }
}

// WhatsApp mesajı sil
async function deleteWhatsAppMessage(id) {
    try {
        const { data, error } = await supabase
            .from('whatsapp_messages')
            .delete()
            .eq('id', id)
            .select();
            
        if (error) {
            console.error('Supabase mesaj silme hatası:', error);
            throw error;
        }
        
        console.log('Mesaj silme sonucu:', data);
        return true;
    } catch (error) {
        console.error('WhatsApp mesajı silme hatası:', error);
        return false;
    }
}

// LOCALSTORAGE'DAN VERİ AKTARMA FONKSİYONLARI //

// localStorage'dan blog yazılarını Supabase'e aktar
async function migrateBlogPostsFromLocalStorage() {
    try {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        
        if (blogPosts.length === 0) {
            return { success: true, message: 'Aktarılacak blog yazısı yok.' };
        }
        
        // Her yazıyı Supabase'e ekle
        const results = await Promise.all(
            blogPosts.map(post => {
                // Supabase formatına uygun dönüşüm
                const supabasePost = {
                    title: post.title,
                    content: post.content,
                    author: post.author || 'Admin',
                    image_url: post.image || null,
                    created_at: post.date ? new Date(post.date).toISOString() : new Date().toISOString()
                };
                
                return addBlogPost(supabasePost);
            })
        );
        
        return { 
            success: true, 
            message: `${results.filter(r => r !== null).length} blog yazısı başarıyla aktarıldı.` 
        };
    } catch (error) {
        console.error('Blog yazılarını aktarma hatası:', error);
        return { success: false, message: error.message };
    }
}

// localStorage'dan anketleri Supabase'e aktar
async function migratePollsFromLocalStorage() {
    try {
        const polls = JSON.parse(localStorage.getItem('blogPolls') || '[]');
        
        if (polls.length === 0) {
            return { success: true, message: 'Aktarılacak anket yok.' };
        }
        
        // Her anketi Supabase'e ekle
        const results = await Promise.all(
            polls.map(poll => {
                // Supabase formatına uygun dönüşüm
                const supabasePoll = {
                    question: poll.question,
                    options: poll.options,
                    votes: poll.votes || {},
                    created_at: poll.date ? new Date(poll.date).toISOString() : new Date().toISOString(),
                    end_date: poll.endDate ? new Date(poll.endDate).toISOString() : null
                };
                
                return addPoll(supabasePoll);
            })
        );
        
        return { 
            success: true, 
            message: `${results.filter(r => r !== null).length} anket başarıyla aktarıldı.` 
        };
    } catch (error) {
        console.error('Anketleri aktarma hatası:', error);
        return { success: false, message: error.message };
    }
}

// localStorage'dan kitapları Supabase'e aktar
async function migrateBooksFromLocalStorage() {
    try {
        const books = JSON.parse(localStorage.getItem('blogBooks') || '[]');
        
        if (books.length === 0) {
            return { success: true, message: 'Aktarılacak kitap yok.' };
        }
        
        // Her kitabı Supabase'e ekle
        const results = await Promise.all(
            books.map(book => {
                // Supabase formatına uygun dönüşüm
                const supabaseBook = {
                    title: book.title,
                    author: book.author,
                    description: book.description || '',
                    cover_image_url: book.cover || null,
                    file_url: book.file || null,
                    created_at: book.date ? new Date(book.date).toISOString() : new Date().toISOString()
                };
                
                return addBook(supabaseBook);
            })
        );
        
        return { 
            success: true, 
            message: `${results.filter(r => r !== null).length} kitap başarıyla aktarıldı.` 
        };
    } catch (error) {
        console.error('Kitapları aktarma hatası:', error);
        return { success: false, message: error.message };
    }
}

// localStorage'dan röportajları Supabase'e aktar
async function migrateInterviewsFromLocalStorage() {
    try {
        const interviews = JSON.parse(localStorage.getItem('blogInterviews') || '[]');
        
        if (interviews.length === 0) {
            return { success: true, message: 'Aktarılacak röportaj yok.' };
        }
        
        // Her röportajı Supabase'e ekle
        const results = await Promise.all(
            interviews.map(interview => {
                // Supabase formatına uygun dönüşüm
                const supabaseInterview = {
                    author_name: interview.authorName,
                    author_title: interview.authorTitle || '',
                    content: interview.content,
                    image_url: interview.image || null,
                    created_at: interview.date ? new Date(interview.date).toISOString() : new Date().toISOString()
                };
                
                return addInterview(supabaseInterview);
            })
        );
        
        return { 
            success: true, 
            message: `${results.filter(r => r !== null).length} röportaj başarıyla aktarıldı.` 
        };
    } catch (error) {
        console.error('Röportajları aktarma hatası:', error);
        return { success: false, message: error.message };
    }
}

// localStorage'dan profil bilgilerini Supabase'e aktar
async function migrateProfileFromLocalStorage() {
    try {
        const profileData = JSON.parse(localStorage.getItem('aboutProfile') || '{}');
        
        if (Object.keys(profileData).length === 0) {
            return { success: true, message: 'Aktarılacak profil bilgisi yok.' };
        }
        
        // Profil bilgilerini Supabase formatına dönüştür
        const supabaseProfile = {
            name: profileData.name || '',
            title: profileData.title || '',
            bio: profileData.bio || '',
            image: profileData.image || null,
            email: profileData.email || '',
            phone: profileData.phone || '',
            instagram: profileData.instagram || '',
            tiktok: profileData.tiktok || '',
            twitter: profileData.twitter || '',
            youtube: profileData.youtube || '',
            facebook: profileData.facebook || '',
            linkedin: profileData.linkedin || ''
        };
        
        // Profil bilgilerini güncelle
        const result = await updateProfile(supabaseProfile);
        
        return { 
            success: true, 
            message: 'Profil bilgileri başarıyla aktarıldı.' 
        };
    } catch (error) {
        console.error('Profil bilgilerini aktarma hatası:', error);
        return { success: false, message: error.message };
    }
}

// Tüm localStorage verilerini Supabase'e aktar
async function migrateAllDataFromLocalStorage() {
    const results = {
        blogPosts: await migrateBlogPostsFromLocalStorage(),
        polls: await migratePollsFromLocalStorage(),
        books: await migrateBooksFromLocalStorage(),
        interviews: await migrateInterviewsFromLocalStorage(),
        profile: await migrateProfileFromLocalStorage()
    };
    
    return {
        success: 
            results.blogPosts.success && 
            results.polls.success && 
            results.books.success && 
            results.interviews.success && 
            results.profile.success,
        message: 'Veri aktarma işlemi tamamlandı.',
        details: results
    };
}