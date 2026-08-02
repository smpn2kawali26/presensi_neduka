/*****************************************************************
 * ABSENSI SMP NEGERI 2 KAWALI - CONFIGURATION
 * File: js/config.js
 *****************************************************************/

const CONFIG = {
    // 1. NAMA APLIKASI & SEKOLAH
    APP_NAME: "Portal Absensi Digital",
    SCHOOL_NAME: "SMP Negeri 2 Kawali",
    
    // 2. URL GOOGLE APPS SCRIPT (BACKEND REAL ANDA)
    BASE_URL: "https://script.google.com/macros/s/AKfycby7pHe8aLXClm8HewELDE4CBMlLGMJHcSnFoXZOoYAEZ1-Vw9NLsLC1rs1YZsZvJfXf/exec",

    // 3. PENGATURAN LOGO & ASSETS
    LOGO_URL: "logo.png", // Mengambil langsung dari direktori root GitHub Anda

    // 4. TIMEOUT & RETRY SETTINGS
    TIMEOUT_MS: 15000, // Timeout koneksi 15 detik

    // 5. HELPER FUNGSI MENDAPATKAN URL API
    getApiUrl: function (action = "") {
        if (!this.BASE_URL || this.BASE_URL.includes("YOUR_DEPLOYMENT_ID_HERE")) {
            console.warn("CONFIG WARNING: URL Apps Script belum dikonfigurasi dengan benar di js/config.js!");
        }
        return action ? `${this.BASE_URL}?action=${action}` : this.BASE_URL;
    }
};

// Freeze object agar konfigurasi tidak sengaja tertimpa oleh script lain
Object.freeze(CONFIG);
