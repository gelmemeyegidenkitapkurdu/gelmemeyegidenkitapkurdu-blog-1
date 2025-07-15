/**
 * Veri Kalıcılığı ve Yedekleme Sistemi
 * Gelmemeyegiden Kitap Kurdu Blog Projesi
 */

class DataPersistenceManager {
    constructor() {
        this.dataKeys = [
            'blogPosts',
            'blogPolls', 
            'blogBooks',
            'blogInterviews',
            'aboutProfile',
            'pollVotes',
            'blogPostViews',
            'blogInterviewViews',
            'isAdminLoggedIn',
            'adminEmail'
        ];
        
        this.backupKey = 'blogDataBackup';
        this.lastBackupKey = 'lastBackupTime';
        this.backupInterval = 30 * 60 * 1000; // 30 dakika
        
        this.init();
    }
    
    init() {
        // Sayfa yüklendiğinde veri bütünlüğünü kontrol et
        this.checkDataIntegrity();
        
        // Otomatik yedekleme başlat
        this.startAutoBackup();
        
        // Sayfa kapatılmadan önce yedekle
        window.addEventListener('beforeunload', () => {
            this.createBackup();
        });
        
        // Visibility change olaylarında yedekle
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.createBackup();
            }
        });
    }
    
    // Veri bütünlüğünü kontrol et
    checkDataIntegrity() {
        const missingData = [];
        
        this.dataKeys.forEach(key => {
            const data = localStorage.getItem(key);
            if (!data && this.isImportantData(key)) {
                missingData.push(key);
            }
        });
        
        if (missingData.length > 0) {
            console.warn('Eksik veriler tespit edildi:', missingData);
            this.attemptDataRecovery();
        }
    }
    
    // Önemli veri anahtarlarını belirle
    isImportantData(key) {
        const importantKeys = ['blogPosts', 'blogPolls', 'blogBooks', 'blogInterviews', 'aboutProfile'];
        return importantKeys.includes(key);
    }
    
    // Veri kurtarma denemesi
    attemptDataRecovery() {
        const backup = this.getLatestBackup();
        if (backup) {
            const recovered = this.restoreFromBackup(backup);
            if (recovered > 0) {
                console.log(`${recovered} veri başarıyla kurtarıldı!`);
                
                // Admin ise bildirim göster
                if (localStorage.getItem('isAdminLoggedIn') === 'true') {
                    setTimeout(() => {
                        alert(`Sistem ${recovered} eksik veriyi otomatik olarak kurtardı.`);
                    }, 1000);
                }
            }
        }
    }
    
    // Yedek oluştur
    createBackup() {
        try {
            const backupData = {};
            const timestamp = new Date().toISOString();
            
            this.dataKeys.forEach(key => {
                const data = localStorage.getItem(key);
                if (data) {
                    backupData[key] = data;
                }
            });
            
            const backup = {
                timestamp,
                data: backupData,
                version: '1.0'
            };
            
            // Ana yedek
            localStorage.setItem(this.backupKey, JSON.stringify(backup));
            localStorage.setItem(this.lastBackupKey, timestamp);
            
            // Ek güvenlik için birden fazla yedek
            localStorage.setItem(`${this.backupKey}_secondary`, JSON.stringify(backup));
            
            console.log('Veri yedeği oluşturuldu:', timestamp);
            return true;
        } catch (error) {
            console.error('Yedek oluşturma hatası:', error);
            return false;
        }
    }
    
    // Son yedeği al
    getLatestBackup() {
        try {
            let backup = localStorage.getItem(this.backupKey);
            
            // Ana yedek yoksa ikincil yedeği dene
            if (!backup) {
                backup = localStorage.getItem(`${this.backupKey}_secondary`);
            }
            
            return backup ? JSON.parse(backup) : null;
        } catch (error) {
            console.error('Yedek okuma hatası:', error);
            return null;
        }
    }
    
    // Yedekten geri yükle
    restoreFromBackup(backup) {
        if (!backup || !backup.data) return 0;
        
        let restoredCount = 0;
        
        Object.keys(backup.data).forEach(key => {
            try {
                // Sadece eksik verileri geri yükle
                if (!localStorage.getItem(key)) {
                    localStorage.setItem(key, backup.data[key]);
                    restoredCount++;
                }
            } catch (error) {
                console.error(`${key} geri yükleme hatası:`, error);
            }
        });
        
        return restoredCount;
    }
    
    // Otomatik yedekleme başlat
    startAutoBackup() {
        setInterval(() => {
            this.createBackup();
        }, this.backupInterval);
    }
    
    // Güvenli veri kaydetme
    safeSetItem(key, value) {
        try {
            localStorage.setItem(key, value);
            
            // Önemli veri ise hemen yedekle
            if (this.isImportantData(key)) {
                this.createBackup();
            }
            
            return true;
        } catch (error) {
            console.error(`${key} kaydetme hatası:`, error);
            
            // Depolama alanı doluysa temizlik yap
            if (error.name === 'QuotaExceededError') {
                this.cleanupStorage();
                // Tekrar dene
                try {
                    localStorage.setItem(key, value);
                    return true;
                } catch (retryError) {
                    console.error('Yeniden kaydetme başarısız:', retryError);
                    return false;
                }
            }
            return false;
        }
    }
    
    // Depolama temizliği
    cleanupStorage() {
        console.log('Depolama alanı temizliği başlatılıyor...');
        
        // Geçici ve önemsiz verileri temizle
        const temporaryKeys = ['tempData', 'cache', 'preview'];
        
        temporaryKeys.forEach(key => {
            const keysToRemove = Object.keys(localStorage).filter(k => k.includes(key));
            keysToRemove.forEach(k => localStorage.removeItem(k));
        });
    }
    
    // Veri export (indirme için)
    exportData() {
        const exportData = {};
        
        this.dataKeys.forEach(key => {
            const data = localStorage.getItem(key);
            if (data && this.isImportantData(key)) {
                try {
                    exportData[key] = JSON.parse(data);
                } catch {
                    exportData[key] = data;
                }
            }
        });
        
        return {
            timestamp: new Date().toISOString(),
            data: exportData,
            version: '1.0'
        };
    }
    
    // Manuel yedek indirme
    downloadBackup() {
        try {
            const exportData = this.exportData();
            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `kitap-kurdu-backup-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return true;
        } catch (error) {
            console.error('Yedek indirme hatası:', error);
            return false;
        }
    }
}

// Global instance oluştur
window.dataPersistence = new DataPersistenceManager();

// localStorage.setItem'ı güvenli versiyonla değiştir
const originalSetItem = localStorage.setItem.bind(localStorage);
localStorage.safeSetItem = function(key, value) {
    return window.dataPersistence.safeSetItem(key, value);
};

// Kullanım kolaylığı için helper fonksiyonlar
window.saveData = function(key, data) {
    const value = typeof data === 'string' ? data : JSON.stringify(data);
    return localStorage.safeSetItem(key, value);
};

window.loadData = function(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        if (!data) return defaultValue;
        
        // JSON parse etmeyi dene
        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    } catch (error) {
        console.error(`${key} okuma hatası:`, error);
        return defaultValue;
    }
};

// Admin için yedek indirme fonksiyonu
window.downloadDataBackup = function() {
    if (localStorage.getItem('isAdminLoggedIn') === 'true') {
        return window.dataPersistence.downloadBackup();
    } else {
        alert('Bu özellik sadece admin kullanıcıları için geçerlidir.');
        return false;
    }
};

console.log('Veri kalıcılığı sistemi aktif edildi.');