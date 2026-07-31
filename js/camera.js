/*****************************************************************
 * camera.js - AKSES KAMERA WEB & HP
 *****************************************************************/

let currentStream = null;
let facingMode = "user"; // "user" (kamera depan) atau "environment" (kamera belakang)

// Inisialisasi kamera saat window dimuat
window.addEventListener("DOMContentLoaded", function () {
    startCamera();

    const btnSwitch = document.getElementById("btnSwitchCamera");
    if (btnSwitch) {
        btnSwitch.addEventListener("click", switchCamera);
    }
});

async function startCamera() {
    stopCamera(); // Hentikan stream sebelumnya jika ada

    const video = document.getElementById("camera");
    if (!video) return;

    // Cek ketersediaan API MediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Browser kamu tidak mendukung akses kamera atau koneksi belum HTTPS!");
        return;
    }

    const constraints = {
        video: {
            facingMode: facingMode,
            width: { ideal: 640 },
            height: { ideal: 480 }
        },
        audio: false
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        currentStream = stream;
        video.srcObject = stream;
        video.play();
    } catch (err) {
        console.error("Gagal membuka kamera:", err);
        alert("Tidak dapat mengakses kamera. Pastikan izin kamera sudah diizinkan di browser!");
    }
}

function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
}

function switchCamera() {
    // Flip antara kamera depan dan belakang (khusus HP)
    facingMode = (facingMode === "user") ? "environment" : "user";
    startCamera();
}
