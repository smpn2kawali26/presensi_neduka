/*****************************************************************
 * LOGIK ABSENSI FRONTEND (DROPDOWN + GPS RADIUS + PORTRAIT CAM)
 *****************************************************************/

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const btnLogout = document.getElementById("btnLogout");
    const gpsStatus = document.getElementById("gpsStatus");
    const video = document.getElementById("webcam");
    const btnSwitchCam = document.getElementById("btnSwitchCam");
    const btnMasuk = document.getElementById("btnMasuk");
    const btnPulang = document.getElementById("btnPulang");

    let currentStream = null;
    let facingMode = "environment"; 
    let userLocation = { lat: null, lng: null };
    let selectedSiswa = null;

    // 1. LOGOUT
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            if (confirm("Yakin ingin keluar?")) {
                localStorage.clear();
                window.location.href = "../index.html";
            }
        });
    }

    // 2. DETEKSI GPS LOKASI SPREADSHEET
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                userLocation.lat = pos.coords.latitude;
                userLocation.lng = pos.coords.longitude;
                if (gpsStatus) {
                    gpsStatus.className = "gps-badge gps-ok";
                    gpsStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> GPS Terkunci`;
                }
            },
            (err) => {
                if (gpsStatus) {
                    gpsStatus.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> GPS Mati`;
                }
            },
            { enableHighAccuracy: true }
        );
    }

    // 3. KAMERA PORTRAIT
    async function startCamera() {
        if (currentStream) currentStream.getTracks().forEach(t => t.stop());
        try {
            currentStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode, width: { ideal: 480 }, height: { ideal: 640 } } });
            video.srcObject = currentStream;
        } catch (e) { console.error("Kamera Error:", e); }
    }

    if (btnSwitchCam) {
        btnSwitchCam.addEventListener("click", () => {
            facingMode = (facingMode === "user") ? "environment" : "user";
            startCamera();
        });
    }
    startCamera();

    // 4. AUTOMATIC DROPDOWN SEARCH
    let searchTimer;
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            clearTimeout(searchTimer);
            const val = this.value.trim();

            if (val.length < 2) {
                if (dropdownMenu) dropdownMenu.style.display = "none";
                return;
            }

            searchTimer = setTimeout(() => {
                fetchSiswa(val);
            }, 250);
        });
    }

    async function fetchSiswa(kw) {
        try {
            const res = await fetch(CONFIG.BASE_URL, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({ action: "searchSiswa", keyword: kw })
            });
            const result = await res.json();

            if (result.success && result.data && result.data.length > 0) {
                renderDropdown(result.data);
            } else {
                if (dropdownMenu) dropdownMenu.style.display = "none";
            }
        } catch (e) { console.error(e); }
    }

    function renderDropdown(list) {
        if (!dropdownMenu) return;
        dropdownMenu.innerHTML = "";
        list.forEach(item => {
            const div = document.createElement("div");
            div.className = "dropdown-item";
            div.innerHTML = `<strong>${item.nama}</strong> (${item.kelas}) - NISN: ${item.nisn}`;
            div.addEventListener("click", () => {
                selectedSiswa = item;
                searchInput.value = item.nama;
                document.getElementById("dispNisn").innerText = item.nisn || item.id;
                document.getElementById("dispNama").innerText = item.nama;
                document.getElementById("dispKelas").innerText = item.kelas;
                dropdownMenu.style.display = "none";
            });
            dropdownMenu.appendChild(div);
        });
        dropdownMenu.style.display = "block";
    }

    document.addEventListener("click", (e) => {
        if (e.target !== searchInput && dropdownMenu) dropdownMenu.style.display = "none";
    });

    // 5. SIMPAN ABSENSI DENGAN VALIDASI RADIUS
    if (btnMasuk) btnMasuk.addEventListener("click", () => sendAbsensi("MASUK"));
    if (btnPulang) btnPulang.addEventListener("click", () => sendAbsensi("PULANG"));

    async function sendAbsensi(status) {
        if (!selectedSiswa) {
            alert("Pilih siswa terlebih dahulu dari dropdown pencarian!");
            return;
        }

        const payload = {
            action: "saveAbsensi",
            nisn: selectedSiswa.nisn || selectedSiswa.id,
            nama: selectedSiswa.nama,
            kelas: selectedSiswa.kelas,
            status: status,
            lat: userLocation.lat,
            lng: userLocation.lng,
            petugas: "PETUGAS OSIS"
        };

        try {
            const res = await fetch(CONFIG.BASE_URL, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(payload)
            });
            const result = await res.json();

            if (result.success) {
                alert(result.message);
                selectedSiswa = null;
                searchInput.value = "";
                document.getElementById("dispNisn").innerText = "-";
                document.getElementById("dispNama").innerText = "-";
                document.getElementById("dispKelas").innerText = "-";
            } else {
                alert("DITOLAK: " + result.message);
            }
        } catch (e) {
            alert("Koneksi gagal.");
        }
    }
});
