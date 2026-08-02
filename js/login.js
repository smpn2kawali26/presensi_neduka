async function prosesLogin(usernameInput, passwordInput) {
    if (!usernameInput || !passwordInput) {
        alert("⚠️ Username dan Password wajib diisi!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "login",
                username: usernameInput,
                password: passwordInput
            })
        });

        const result = await response.json();

        if (result.success) {
            // Simpan Sesi User
            localStorage.setItem("userLoggedIn", JSON.stringify(result.user));
            
            const role = String(result.user.ROLE || "").toUpperCase();
            
            // Redirect sesuai Role di Spreadsheet
            if (role === "PETUGAS" || role === "OSIS") {
                window.location.href = "pages/petugas.html";
            } else if (role === "ADMIN" || role === "ADMINISTRATOR") {
                window.location.href = "pages/admin.html";
            } else if (role === "GURU") {
                window.location.href = "pages/guru.html";
            } else {
                window.location.href = "pages/petugas.html";
            }
        } else {
            alert("❌ " + (result.message || "Username atau Password salah!"));
        }
    } catch (error) {
        alert("⚠️ Gagal memvalidasi login. Pastikan API_URL di js/config.js sudah terisi Web App URL yang benar.");
    }
}
