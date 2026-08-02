/*****************************************************************
 * ABSENSI SMP NEGERI 2 KAWALI - CONFIGURATION
 * File: js/config.js
 *****************************************************************/

const SCRIPT_URL_REAL = "https://script.google.com/macros/s/AKfycbyR5J64U2HYHtUDaVuCAUH73KMcKrnVhavhgIrJbTViflsql7pcqNf2gD6DHxOAdNn-/exec";

const CONFIG = {
    APP_NAME: "Portal Absensi Digital",
    SCHOOL_NAME: "SMP Negeri 2 Kawali",
    BASE_URL: SCRIPT_URL_REAL,
    SCRIPT_URL: SCRIPT_URL_REAL,
    API_URL: SCRIPT_URL_REAL,
    LOGO_URL: "logo.png",
    TIMEOUT_MS: 15000,
    getApiUrl: function (action = "") {
        return action ? `${SCRIPT_URL_REAL}?action=${action}` : SCRIPT_URL_REAL;
    }
};

// Global Variable Fallbacks
window.CONFIG = CONFIG;
window.CONFIG_URL = SCRIPT_URL_REAL;
window.SCRIPT_URL = SCRIPT_URL_REAL;
window.BASE_URL = SCRIPT_URL_REAL;
window.API_URL = SCRIPT_URL_REAL;
