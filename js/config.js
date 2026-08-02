/*****************************************************************
 * ABSENSI SMP NEGERI 2 KAWALI - CONFIGURATION
 * File: js/config.js
 *****************************************************************/

const CONFIG = {
    // 1. NAMA APLIKASI & SEKOLAH
    APP_NAME: "PORTAL ABSENSI DIGITAL",
    SCHOOL_NAME: "SMP NEGERI 2 KAWALI",
    
    // 2. URL GOOGLE APPS SCRIPT (BACKEND)
    // Pastikan mengganti URL di bawah ini dengan URL Web App (berakhiran /exec)
    // yang didapatkan dari menu: Deploy > New deployment > Web App di Google Apps Script Anda.
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
