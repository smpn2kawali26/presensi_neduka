/*****************************************************************
 * ===============================================================
 * ABSENSI SISWA v3.0
 * SMP Negeri 2 Kawali
 * api.js
 * ===============================================================
 * Komunikasi Frontend ↔ Google Apps Script
 *****************************************************************/

/*===============================================================
=            POST API
===============================================================*/

async function callAPI(action, data = {}) {
    try {
        // Menggunakan text/plain untuk menghindari batasan CORS Preflight Google Apps Script
        const response = await fetch(
            WEB_APP_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify({
                    action: action,
                    data: data
                })
            }
        );
        
        const result = await response.json();
        if (typeof log === 'function') log(result);
        return result;
    }
    catch (err) {
        console.error("API Error:", err);
        return {
            success: false,
            message: "Tidak dapat terhubung ke server."
        };
    }
}

/*===============================================================
=            LOGIN
===============================================================*/

async function apiLogin(username, password, role) {
    return await callAPI(
        "login",
        {
            username: username,
            password: password,
            role: role
        }
    );
}

/*===============================================================
=            SEARCH SISWA
===============================================================*/

async function apiSearchSiswa(keyword) {
    return await callAPI(
        "searchSiswa",
        {
            keyword: keyword
        }
    );
}

/*===============================================================
=            GET SISWA
===============================================================*/

async function apiGetSiswa(idSiswa) {
    return await callAPI(
        "getSiswa",
        {
            idSiswa: idSiswa
        }
    );
}

/*===============================================================
=            ABSEN MASUK
===============================================================*/

async function apiSaveMasuk(data) {
    return await callAPI(
        "saveMasuk",
        data
    );
}

/*===============================================================
=            ABSEN PULANG
===============================================================*/

async function apiSavePulang(data) {
    return await callAPI(
        "savePulang",
        data
    );
}

/*===============================================================
=            ABSENSI HARI INI
===============================================================*/

async function apiAbsensiHariIni() {
    return await callAPI(
        "getAbsensiHariIni"
    );
}

/*===============================================================
=            REKAP BULANAN
===============================================================*/

async function apiRekapBulanan(bulan, tahun) {
    return await callAPI(
        "getRekapBulanan",
        {
            bulan: bulan,
            tahun: tahun
        }
    );
}

/*===============================================================
=            PROFILE
===============================================================*/

async function apiProfile(username) {
    return await callAPI(
        "getProfile",
        {
            username: username
        }
    );
}

/*===============================================================
=            LOGOUT
===============================================================*/

async function apiLogout() {
    return await callAPI(
        "logout"
    );
}
