/*****************************************************************
 * ABSENSI SMP NEGERI 2 KAWALI - LOGIN HANDLER
 * js/login.js
 *****************************************************************/

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const roleSelect = document.getElementById("role");
    const btnTogglePassword = document.getElementById("btnTogglePassword");
    const errorMessage = document.getElementById("errorMessage");

    // FUNGSI 1: FITUR TANDA MATA PASSWORD (POIN 2)
    if (btnTogglePassword && passwordInput) {
        btnTogglePassword.addEventListener("click", function () {
            const isPassword = passwordInput.getAttribute("type") === "password";
            passwordInput.setAttribute("type", isPassword ? "text" : "password");
            
            // Ubah Ikon Mata (Buka / Tutup)
            this.classList.toggle("fa-eye", !isPassword);
            this.classList.toggle("fa-eye-slash", isPassword);
        });
    }

    // FUNGSI 2: HANDLER SUBMIT LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            const role = roleSelect.value;

            if (!username || !password) {
                setMsg("Username dan Password wajib diisi!", "#dc3545");
                return;
            }

            setMsg("Sedang menghubungkan ke server...", "#0d6efd");

            try {
                let response;
                if (typeof apiLogin === "function") {
                    response = await apiLogin(username, password, role);
                } else if (typeof callAPI === "function") {
                    response = await callAPI("login", { username: username, password: password, role: role });
                } else {
                    setMsg("Error: js/api.js belum terhubung!", "#dc3545");
                    return;
                }

                if (response && (response.success || response.status === "success")) {
                    setMsg("Login Berhasil! Mengalihkan...", "#198754");
                    
                    const userObj = response.data || response.user || { username: username, role: role };
                    localStorage.setItem("ABSENSI_USER", JSON.stringify(userObj));

                    setTimeout(() => {
                        window.location.href = window.location.pathname.includes("/pages/") ? "petugas.html" : "pages/petugas.html";
                    }, 800);
                } else {
                    setMsg(response.message || "Username atau Password salah!", "#dc3545");
                }
            } catch (err) {
                console.error(err);
                setMsg("Tidak dapat terhubung ke server.", "#dc3545");
            }
        });
    }

    function setMsg(text, color) {
        if (errorMessage) {
            errorMessage.innerText = text;
            errorMessage.style.color = color;
        }
    }
});
