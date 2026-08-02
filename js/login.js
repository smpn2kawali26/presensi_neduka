function prosesLogin(usernameInput, passwordInput) {
    if (!usernameInput || !passwordInput) {
        alert("⚠️ Username dan Password wajib diisi!");
        return;
    }

    const cleanUser = encodeURIComponent(usernameInput.trim());
    const cleanPass = encodeURIComponent(passwordInput.trim());
    const scriptUrl = API_URL + `?action=login&username=${cleanUser}&password=${cleanPass}&callback=handleLoginResponse`;

    // Buat Tag Script JSONP
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
}

// Callback Respon Login
function handleLoginResponse(result) {
    if (result.success) {
        localStorage.setItem("userLoggedIn", JSON.stringify(result.user));
        alert("✅ Login Berhasil! Selamat datang, " + result.user.NAMA);
        
        const role = String(result.user.ROLE || "").toUpperCase();
        if (role === "ADMIN" || role === "ADMINISTRATOR") {
            window.location.href = "pages/admin.html";
        } else {
            window.location.href = "pages/petugas.html";
        }
    } else {
        alert("❌ " + (result.message || "Username atau Password Salah!"));
    }
}
