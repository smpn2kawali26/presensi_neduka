/*****************************************************************
 * PORTAL ABSENSI - SMP NEGERI 2 KAWALI
 * File: js/absensi.js
 *****************************************************************/

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput") || document.getElementById("keyword") || document.querySelector("input[type='text']");
    const searchBtn = document.getElementById("searchBtn") || document.querySelector("button.btn-primary") || document.querySelector(".btn-search");

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", function (e) {
            e.preventDefault();
            prosesCariSiswa(searchInput.value);
        });

        searchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                prosesCariSiswa(searchInput.value);
            }
        });
    }
});

async function prosesCariSiswa(keyword) {
    if (!keyword.trim()) {
        alert("Silakan masukkan Nama, NISN, atau ID Siswa!");
        return;
    }

    const infoText = document.querySelector("i, small, .info-text") || document.getElementById("searchStatus");
    if (infoText) infoText.innerText = "Mencari data siswa...";

    try {
        const response = await fetch(CONFIG.BASE_URL, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: "searchSiswa",
                keyword: keyword
            })
        });

        const result = await response.json();

        if (result.success && (result.data || result.siswa)) {
            const dataSiswa = result.siswa || (result.data ? result.data[0] : null);
            
            if (dataSiswa) {
                // Tampilkan ke Elemen Halaman
                tampilkanDataSiswa(dataSiswa);
                if (infoText) infoText.innerText = "";
            } else {
                if (infoText) infoText.innerText = "Siswa tidak ditemukan.";
            }
        } else {
            if (infoText) infoText.innerText = result.message || "Siswa tidak ditemukan.";
        }
    } catch (err) {
        console.error("Error pencarian:", err);
        if (infoText) infoText.innerText = "Gagal terhubung ke server.";
    }
}

function tampilkanDataSiswa(siswa) {
    // Mencari elemen ID/NISN, Nama, Kelas di Dashboard
    const elNisn = document.getElementById("dispNisn") || document.getElementById("lblNisn") || document.querySelector(".data-nisn");
    const elNama = document.getElementById("dispNama") || document.getElementById("lblNama") || document.querySelector(".data-nama");
    const elKelas = document.getElementById("dispKelas") || document.getElementById("lblKelas") || document.querySelector(".data-kelas");
    const elStatus = document.getElementById("dispStatus") || document.getElementById("lblStatus") || document.querySelector(".data-status");

    if (elNisn) elNisn.innerText = siswa.nisn || siswa.id || "-";
    if (elNama) elNama.innerText = siswa.nama || "-";
    if (elKelas) elKelas.innerText = siswa.kelas || "-";
    if (elStatus) elStatus.innerText = siswa.status || "AKTIF";
}
