/*****************************************************************
 * ABSENSI SMP NEGERI 2 KAWALI - API HANDLER
 * File: js/api.js
 *****************************************************************/

const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbyR5J64U2HYHtUDaVuCAUH73KMcKrnVhavhgIrJbTViflsql7pcqNf2gD6DHxOAdNn-/exec";

// Fungsi Login ke Apps Script Backend
async function apiLogin(username, password, role) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                action: "login",
                username: username,
                password: password,
                role: role
            })
        });

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return { success: false, message: "Gagal terhubung ke server. Periksa koneksi internet." };
    }
}

// Fungsi Umum Panggilan API
async function callAPI(action, payload = {}) {
    try {
        payload.action = action;
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
        });

        return await response.json();
    } catch (error) {
        console.error("API Call Error:", error);
        return { success: false, message: "Gagal terhubung ke server." };
    }
}
