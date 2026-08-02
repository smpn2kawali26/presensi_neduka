/*****************************************************************
 * PORTAL ABSENSI - SMP NEGERI 2 KAWALI
 * File: js/absensi.js (Kamera, GPS, Dropdown, Masuk/Pulang, Logout)
 *****************************************************************/

document.addEventListener("DOMContentLoaded", function () {
    // Variable Elements
    const searchInput = document.getElementById("searchInput");
    const dropdownList = document.getElementById("dropdownList");
    const btnLogout = document.getElementById("btnLogout");
    const gpsStatus = document.getElementById("gpsStatus");
    const video = document.getElementById("webcam");
    const btnSwitchCam = document.getElementById("btnSwitchCam");
    const btnAbsenMasuk = document.getElementById("btnAbsenMasuk");
    const btnAbsenPulang = document.getElementById("btnAbsenPulang");

    let currentStream = null;
    let facingMode = "environment"; // Default kamera belakang
    let userLocation = { lat: null, lng: null };
    let selectedSiswa = null;

    // 1. LOGOUT
    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            if (confirm("Apakah Anda yakin ingin keluar?")) {
                localStorage.clear();
                window.location.href = "../index.html";
            }
        });
    }

    // 2. DETEKSI LOKASI (GPS)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                userLocation.lat = pos.coords.latitude;
                userLocation.lng = pos.coords.longitude;
                if (gpsStatus) {
                    gpsStatus.innerHTML = `<i class="fa-solid fa-circle-check gps-active"></i> GPS Aktif (${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})`;
                }
            },
            (err) => {
                if (gpsStatus) gpsStatus.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:red;"></i> GPS Mati/Diizinkan`;
            },
            { enableHighAccuracy: true }
        );
    }

    // 3. KAMERA (FRONT / BACK SWITCH)
    async function startCamera() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
        try {
            const constraints = { video: { facingMode: facingMode } };
            currentStream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = currentStream;
        } catch (err) {
            console.error("Kamera gagal dibuka:", err);
        }
    }

    if (btnSwitchCam) {
        btnSwitchCam.addEventListener("click", function () {
            facingMode = (facingMode === "user") ? "environment" : "user";
            startCamera();
        });
    }

    startCamera(); // Jalankan Kamera Otomatis

    // 4. AUTO DROPDOWN SISWA
    let timer;
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            clearTimeout(timer);
            const keyword = this.value.trim();

            if (keyword.length < 2) {
                if (dropdownList) dropdownList.style.display = "none";
                return;
            }

            timer = setTimeout(() => {
                cariSiswaAPI(keyword);
            }, 300);
        });
    }

    async function cariSiswaAPI(keyword) {
        try {
            const res = await fetch(CONFIG.BASE_URL, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({ action: "searchSiswa", keyword: keyword })
            });
            const data = await res.json();

            if (data.success && data.data && data.data.length > 0) {
                renderDropdown(data.data);
            } else {
                if (dropdownList) dropdownList.style.display = "none";
            }
        } catch (e) {
            console.error(e);
        }
    }

    function renderDropdown(list) {
        if (!dropdownList) return;
        dropdownList.innerHTML = "";
        list.forEach(siswa => {
            const item = document.createElement("div");
            item.className = "dropdown-item";
            item.innerHTML = `<strong>${siswa.nama}</strong> (${siswa.kelas}) - NISN: ${siswa.nisn}`;
            item.addEventListener("click", () => {
                pilihSiswa(siswa);
                dropdownList.style.display = "none";
            });
            dropdownList.appendChild(item);
        });
        dropdownList.style.display = "block";
    }

    function pilihSiswa(siswa) {
        selectedSiswa = siswa;
        if (searchInput) searchInput.value = siswa.nama;
        document.getElementById("dispNisn").innerText = siswa.nisn || siswa.id || "-";
        document.getElementById("dispNama").innerText = siswa.nama || "-";
        document.getElementById("dispKelas").innerText = siswa.kelas || "-";
        document.getElementById("dispStatus").innerText = siswa.status || "AKTIF";
    }

    // 5. TOMBOL ABSEN MASUK & PULANG
    if (btnAbsenMasuk) {
        btnAbsenMasuk.addEventListener("click", () => prosesAbsensi("MASUK"));
    }
    if (btnAbsenPulang) {
        btnAbsenPulang.addEventListener("click", () => prosesAbsensi("PULANG"));
    }

    async function prosesAbsensi(tipe) {
        if (!selectedSiswa) {
            alert("Pilih data siswa terlebih dahulu melalui pencarian nama!");
            return;
        }

        const payload = {
            action: "saveAbsensi",
            nisn: selectedSiswa.nisn || selectedSiswa.id,
            nama: selectedSiswa.nama,
            kelas: selectedSiswa.kelas,
            status: tipe, // MASUK / PULANG
            lat: userLocation.lat,
            lng: userLocation.lng,
            petugas: "PETUGAS OSIS"
        };

        try {
            const response = await fetch(CONFIG.BASE_URL, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (result.success) {
                alert(`BERHASIL! Absensi ${tipe} atas nama ${selectedSiswa.nama} telah dicatat.`);
                // Reset Form
                selectedSiswa = null;
                if (searchInput) searchInput.value = "";
                document.getElementById("dispNisn").innerText = "-";
                document.getElementById("dispNama").innerText = "-";
                document.getElementById("dispKelas").innerText = "-";
                document.getElementById("dispStatus").innerText = "-";
            } else {
                alert("Gagal mencatat absensi: " + result.message);
            }
        } catch (e) {
            alert("Terjadi kesalahan koneksi ke server.");
        }
    }
});
