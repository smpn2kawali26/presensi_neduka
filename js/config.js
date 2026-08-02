/*****************************************************************
 * ABSENSI SMP NEGERI 2 KAWALI - CONFIGURATION
 * File: js/config.js
 *****************************************************************/

const CONFIG = {
    // 1. NAMA APLIKASI & SEKOLAH
    APP_NAME: "Portal Absensi Digital",
    SCHOOL_NAME: "SMP Negeri 2 Kawali",
    
    // 2. URL GOOGLE APPS SCRIPT (BACKEND REAL BARU)
    BASE_URL: "https://script.google.com/macros/s/AKfycbyR5J64U2HYHtUDaVuCAUH73KMcKrnVhavhgIrJbTViflsql7pcqNf2gD6DHxOAdNn-/exec",
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyR5J64U2HYHtUDaVuCAUH73KMcKrnVhavhgIrJbTViflsql7pcqNf2gD6DHxOAdNn-/exec",
    API_URL: "https://script.google.com/macros/s/AKfycbyR5J64U2HYHtUDaVuCAUH73KMcKrnVhavhgIrJbTViflsql7pcqNf2gD6DHxOAdNn-/exec",

    // 3. LOGO
    LOGO_URL: "logo.png",

    // 4. TIMEOUT
    TIMEOUT_MS: 15000,

    // 5. HELPER API URL
    getApiUrl: function (action = "") {
        return action ? `${this.BASE_URL}?action=${action}` : this.BASE_URL;
    }
};

// Mencegah error jika file lain mencari variabel window.CONFIG atau CONFIG_URL
window.CONFIG = CONFIG;
window.CONFIG_URL = CONFIG.BASE_URL;
window.SCRIPT_URL = CONFIG.BASE_URL;

Object.freeze(CONFIG);
