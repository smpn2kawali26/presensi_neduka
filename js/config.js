/*****************************************************************
 * ===============================================================
 * ABSENSI SISWA v3.0
 * SMP Negeri 2 Kawali
 * config.js
 * ===============================================================
 * Seluruh konfigurasi Frontend disimpan di sini.
 *****************************************************************/


/*===============================================================
=            KONFIGURASI APLIKASI
===============================================================*/

const CONFIG = {

    APP_NAME: "PORTAL ABSENSI",

    VERSION: "3.0",

    SEKOLAH: "SMP Negeri 2 Kawali"

};


/*===============================================================
=            URL WEB APP APPS SCRIPT
===============================================================*/
/*
 * Setelah Apps Script di Deploy sebagai Web App,
 * ganti URL di bawah ini.
 *
 * Contoh:
 * https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec
 */

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxakbCcJQDi5Jm1FEmWKAXPvyRJvYG5oPL-QVVix2cflebAmvI51Y4H3ub7uQqdSapKOg/exec";


/*===============================================================
=            STORAGE
===============================================================*/

const STORAGE = {

    USER: "ABSENSI_USER",

    TOKEN: "ABSENSI_TOKEN",

    PROFILE: "ABSENSI_PROFILE"

};


/*===============================================================
=            ROLE
===============================================================*/

const ROLE = {

    ADMIN: "ADMIN",

    PETUGAS: "PETUGAS",

    GURU: "GURU",

    KEPALA: "KEPALA",

    ORANGTUA: "ORANGTUA"

};


/*===============================================================
=            STATUS ABSENSI
===============================================================*/

const STATUS = {

    HADIR: "HADIR",

    TELAT: "TELAT",

    IZIN: "IZIN",

    SAKIT: "SAKIT",

    ALFA: "ALFA",

    PULANG: "PULANG",

    PULANG_TELAT: "PULANG TELAT"

};


/*===============================================================
=            GPS
===============================================================*/

const GPS = {

    ENABLE: true,

    HIGH_ACCURACY: true,

    TIMEOUT: 10000,

    MAXIMUM_AGE: 0

};


/*===============================================================
=            CAMERA
===============================================================*/

const CAMERA = {

    WIDTH: 1280,

    HEIGHT: 720,

    FACING_MODE: "environment",

    IMAGE_TYPE: "image/jpeg",

    QUALITY: 0.90

};


/*===============================================================
=            DEFAULT MESSAGE
===============================================================*/

const MESSAGE = {

    LOADING: "Memuat...",

    LOGIN: "Sedang login...",

    GPS: "Mengambil lokasi...",

    CAMERA: "Mengaktifkan kamera...",

    ABSEN: "Menyimpan absensi..."

};


/*===============================================================
=            DEBUG MODE
===============================================================*/

const DEBUG = true;
