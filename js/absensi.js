/*****************************************************************
 * PORTAL ABSENSI - SMP NEGERI 2 KAWALI
 * File: js/absensi.js (Dropdown Auto-Suggest + Logout Fix)
 *****************************************************************/

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const btnSearch = document.getElementById("btnSearch");
    const dropdownList = document.getElementById("dropdownList");
    const btnLogout = document.getElementById("btnLogout");
    const searchStatus = document.getElementById("searchStatus");

    // 1. FITUR LOGOUT (PASTI BISA LOGOUT)
    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            if (confirm("Apakah Anda yakin ingin keluar?")) {
                localStorage.clear();
                sessionStorage.clear();
                // Redirect balik ke halaman utama login
                window.location.href = "../index.html";
            }
        });
    }

    // 2. AUTO-SUGGEST DROPDOWN SAAT KETIK (MINIMAL 2 HURUF)
    let typingTimer;
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            clearTimeout(typingTimer);
            const val = this.value.trim();

            if (val.length < 2) {
                if (dropdownList) dropdownList.style.display = "none";
                return;
            }

            typingTimer = setTimeout(() => {
                fetchSuggestions(val);
            }, 300); // Tunda 300ms agar tidak spam server
        });
    }

    // Klik tombol Cari Manual
    if (btnSearch) {
        btnSearch.addEventListener("click", function () {
            if (dropdownList) dropdownList.style.display = "none";
            const val = searchInput.value.trim();
            if (val) fetchSuggestions(val, true);
        });
    }

    // Tutup dropdown jika klik di luar area input
    document.addEventListener("click", function (e) {
        if (e.target !== searchInput && dropdownList) {
            dropdownList.style.display = "none";
        }
    });

    // Fungsi Fetch ke Backend
    async function fetchSuggestions(keyword, selectFirst = false) {
        if (searchStatus) searchStatus.innerText = "Mencari...";
        
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

            const res = await response.json();

            if (res.success && res.data && res.data.length > 0) {
                if (searchStatus) searchStatus.innerText = `Ditemukan ${res.data.length} data.`;
                
                if (selectFirst) {
                    pilihSiswa(res.data[0]);
                } else {
                    renderDropdown(res.data);
                }
            } else {
                if (dropdownList) dropdownList.style.display = "none";
                if (searchStatus) searchStatus.innerText = "Siswa tidak ditemukan.";
                resetDataDisplay();
            }
        } catch (err) {
            console.error(err);
            if (searchStatus) searchStatus.innerText = "Gagal terhubung ke server.";
        }
    }

    // Render Pilihan di Dropdown
    function renderDropdown(list) {
        if (!dropdownList) return;
        dropdownList.innerHTML = "";

        list.forEach(item => {
            const div = document.createElement("div");
            div.className = "dropdown-item";
            div.innerHTML = `<strong>${item.nama}</strong> (${item.kelas}) - NISN: ${item.nisn}`;
            div.addEventListener("click", function () {
                pilihSiswa(item);
                dropdownList.style.display = "none";
            });
            dropdownList.appendChild(div);
        });

        dropdownList.style.display = "block";
    }

    // Menampilkan Data Siswa yang Dipilih
    function pilihSiswa(siswa) {
        if (searchInput) searchInput.value = siswa.nama;
        document.getElementById("dispNisn").innerText = siswa.nisn || siswa.id || "-";
        document.getElementById("dispNama").innerText = siswa.nama || "-";
        document.getElementById("dispKelas").innerText = siswa.kelas || "-";
        document.getElementById("dispStatus").innerText = siswa.status || "AKTIF";
        if (searchStatus) searchStatus.innerText = "Data siswa berhasil dimuat.";
    }

    function resetDataDisplay() {
        document.getElementById("dispNisn").innerText = "-";
        document.getElementById("dispNama").innerText = "-";
        document.getElementById("dispKelas").innerText = "-";
        document.getElementById("dispStatus").innerText = "-";
    }
});
