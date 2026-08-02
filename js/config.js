/*****************************************************************
 * ABSENSI SMP NEGERI 2 KAWALI - CONFIGURATION
 * File: js/config.js
 *****************************************************************/

const SCRIPT_URL_REAL = "https://docs.google.com/spreadsheets/d/1Tz3y8tOx1wNm6Cgq_J-noCBjB7TXpC2kpb6H-_RkPKo/edit?usp=drive_link";

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
