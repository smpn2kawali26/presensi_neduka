/*****************************************************************
 * LOGIKA LOGIN & OTENTIKASI
 * ABSENSI MPLS - SMP Negeri 2 Kawali
 * js/login.js
 *****************************************************************/

document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil Elemen Form & Input
    const loginForm = document.getElementById("loginForm") || document.querySelector("form");
    const usernameInput = document.getElementById("username") || document.getElementById("nisn") || document.querySelector("input[type='text']");
    const passwordInput = document.getElementById("password") || document.querySelector("input[type='password']");
    const roleSelect = document.getElementById("role") || document.querySelector("select");
    
    // Cari elemen untuk menampilkan pesan error/status
    let errorMessage = document.getElementById("errorMessage") || document.querySelector(".error-message");
    
    // Jika elemen error belum ada di HTML, buat otomatis di bawah tombol
    if (!errorMessage && loginForm) {
        errorMessage = document.createElement("div");
        errorMessage.id = "errorMessage";
        errorMessage.style.color = "#dc3545";
        errorMessage.style.marginTop = "12px";
        errorMessage.style.fontSize = "14px";
        errorMessage.style.textAlign = "center";
        errorMessage.style.fontWeight = "bold";
        loginForm.appendChild(errorMessage);
    }

    // 2. Tangan Event Submit Login
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault(); // Mencegah reload halaman

            const username = usernameInput ? usernameInput.value.trim() : "";
            const password = passwordInput ? passwordInput.value.trim() : "";
            const role = roleSelect ? roleSelect.value : "Petugas";

            // Validasi Input Kosong
            if (!username || !password) {
                tampilkanPesan(errorMessage, "Username dan Password wajib diisi!", "red");
                return;
            }

            // Tampilkan Status Loading
            tampilkanPesan(errorMessage, "Sedang menghubungkan ke server...", "#0056b3");

            try {
                // Panggil fungsi API Login (Menggunakan callAPI dari api.js)
                let response;
                if (typeof apiLogin === "function") {
                    response = await apiLogin(username, password, role);
                } else if (typeof callAPI === "function") {
                    response = await callAPI("login", {
                        username: username,
                        password: password,
                        role: role
                    });
                } else {
                    tampilkanPesan(errorMessage, "Gagal: File js/api.js tidak terdeteksi!", "red");
                    return;
                }

                // Respon Berhasil
                if (response && (response.success || response.status === "success")) {
                    tampilkanPesan(errorMessage, "Login Berhasil! Mengalihkan...", "green");

                    // Simpan data user ke LocalStorage
                    const userData = response.user || {
                        username: username,
                        nama: username.toUpperCase(),
                        role: role
                    };
                    
                    if (typeof STORAGE !== "undefined" && STORAGE.USER) {
                        localStorage.setItem(STORAGE.USER, JSON.stringify(userData));
                    } else {
                        localStorage.setItem("ABSENSI_USER", JSON.stringify(userData));
                    }

                    // Arahkan ke Halaman Dashboard Petugas
                    setTimeout(() => {
                        // Cek apakah lokasi saat ini ada di dalam folder pages/ atau di root
                        if (window.location.pathname.includes("/pages/")) {
                            window.location.href = "petugas.html";
                        } else {
                            window.location.href = "pages/petugas.html";
                        }
                    }, 800);

                } else {
                    // Respon Gagal dari Backend Google Sheets
                    const pesanError = (response && response.message) ? response.message : "Username atau Password salah!";
                    tampilkanPesan(errorMessage, pesanError, "red");
                }

            } catch (err) {
                console.error("Error Login:", err);
                tampilkanPesan(errorMessage, "Tidak dapat terhubung ke server.", "red");
            }
        });
    }
});

// Fungsi Pembantu Tampilan Pesan
function tampilkanPesan(element, text, warna) {
    if (element) {
        element.innerText = text;
        element.style.color = warna;
    }
}
