/*****************************************************************
 * ABSENSI SMP NEGERI 2 KAWALI - SUARA & GIMIK KAMERA
 * js/absen_sound.js
 *****************************************************************/

// 1. FUNGSI EFEK SUARA (WEBAUDIO SYNTHESIZER - 100% BEBAS LOADING)
function playAbsenSound(type = 'success') {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        if (type === 'shutter') {
            // Suara Klik / Jepretan Kamera (Gimik Kamera)
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1000, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);

        } else if (type === 'success') {
            // Suara "BEEP" Nada Tinggi Berhasil Absen
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // Nada Do
            osc.frequency.setValueAtTime(659.25, now + 0.1); // Nada Mi
            osc.frequency.setValueAtTime(783.99, now + 0.2); // Nada Sol

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.4);
            
            // Pengucapan Suara Google TTS (Siswa Telah Diabsen)
            speakText("Absensi berhasil disimpan. Terima kasih.");
        }
    } catch (e) {
        console.log("Audio Error:", e);
    }
}

// 2. FUNGSI SUARA INTERACTIVE GOOGLE SPEECH
function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Hentikan antrean suara lama
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'id-ID';
        msg.rate = 1.0;
        window.speechSynthesis.speak(msg);
    }
}

// 3. FUNGSI GIMIK KILATAN KAMERA (CAMERA FLASH EFFECT)
function triggerCameraFlash() {
    // Suara Kamera Jepret
    playAbsenSound('shutter');

    // Buat Layer Flash Putih di Layar
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100vw";
    flash.style.height = "100vh";
    flash.style.backgroundColor = "#ffffff";
    flash.style.zIndex = "99999";
    flash.style.opacity = "0.8";
    flash.style.transition = "opacity 0.25s ease-out";
    document.body.appendChild(flash);

    // Hilangkan Efek Kilatan secara cepat
    setTimeout(() => {
        flash.style.opacity = "0";
        setTimeout(() => flash.remove(), 250);
    }, 100);
}

// CARA MENGGUNAKAN DARI HALAMAN ABSENSI PETUGAS:
// Cukup panggil 2 baris ini di kode tombol Simpan Absen:
// 1. triggerCameraFlash();  --> Untuk Efek Kilatan Kamera
// 2. playAbsenSound('success'); --> Untuk Suara Berhasil & Suara Bicara
