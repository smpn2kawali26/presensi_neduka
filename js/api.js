/*****************************************************************
 * API HELPER - CONNECTOR TO GOOGLE APPS SCRIPT
 *****************************************************************/

async function callAPI(action, payloadData = {}) {
    // Ambil URL dari config (Mendukung WEB_APP_URL maupun CONFIG.API_URL)
    const url = typeof WEB_APP_URL !== "undefined" ? WEB_APP_URL : (typeof CONFIG !== "undefined" ? CONFIG.API_URL : "");

    if (!url) {
        alert("URL Apps Script belum diatur di config.js!");
        return { success: false, message: "URL Apps Script belum diisi." };
    }

    // Susun payload agar dikenali backend
    const bodyData = {
        action: action,
        data: payloadData,
        ...payloadData // fallback untuk compatibility
    };

    try {
        // Penting: Menggunakan text/plain agar tidak memicu isu CORS Preflight di Apps Script
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            redirect: "follow",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) {
            throw new Error("HTTP Status: " + response.status);
        }

        const jsonResult = await response.json();
        return jsonResult;

    } catch (error) {
        console.error("API Error (" + action + "):", error);
        return {
            success: false,
            message: "Tidak dapat terhubung ke server. " + error.message
        };
    }
}

// Fungsi Khusus Login
async function apiLogin(username, password, role) {
    return await callAPI("login", {
        username: username,
        password: password,
        role: role
    });
}

// Fungsi Khusus Cari Siswa
async function apiSearchSiswa(keyword) {
    return await callAPI("searchSiswa", {
        keyword: keyword
    });
}

// Fungsi Khusus Absen
async function apiAbsen(dataAbsen) {
    return await callAPI("absen", dataAbsen);
}
