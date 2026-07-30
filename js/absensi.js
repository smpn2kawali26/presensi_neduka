/*****************************************************************
 * ===============================================================
 * ABSENSI SISWA v3.0
 * SMP Negeri 2 Kawali
 * absensi.js
 * ===============================================================
 * BAGIAN 1
 *****************************************************************/


/*===============================================================
=            VARIABLE
===============================================================*/

let siswaAktif = null;

let lokasiGPS = null;


/*===============================================================
=            LOAD
===============================================================*/

window.addEventListener(

    "load",

    function(){

        initAbsensi();

    }

);


/*===============================================================
=            INIT
===============================================================*/

function initAbsensi(){

    const btnCari=document.getElementById(

        "btnCari"

    );

    if(btnCari){

        btnCari.onclick=cariSiswa;

    }

    const keyword=document.getElementById(

        "keyword"

    );

    if(keyword){

        keyword.addEventListener(

            "keypress",

            function(e){

                if(e.key==="Enter"){

                    cariSiswa();

                }

            }

        );

    }

    ambilGPS();

}


/*===============================================================
=            CARI SISWA
===============================================================*/

async function cariSiswa(){

    const keyword=document.getElementById(

        "keyword"

    ).value.trim();

    if(keyword===""){

        alert(

            "Masukkan Nama / NIS / NISN."

        );

        return;

    }

    const btn=document.getElementById(

        "btnCari"

    );

    buttonLoading(

        btn,

        "MENCARI..."

    );

    const result=await apiSearchSiswa(

        keyword

    );

    buttonNormal(btn);

    if(!result.success){

        resetSiswa();

        alert(result.message);

        return;

    }

    siswaAktif=result.data;

    tampilkanSiswa();

}


/*===============================================================
=            TAMPILKAN SISWA
===============================================================*/

function tampilkanSiswa(){

    if(!siswaAktif){

        return;

    }

    document.getElementById(

        "idSiswa"

    ).innerHTML=siswaAktif.idSiswa;

    document.getElementById(

        "namaSiswa"

    ).innerHTML=siswaAktif.nama;

    document.getElementById(

        "kelasSiswa"

    ).innerHTML=siswaAktif.kelas;

    document.getElementById(

        "statusSiswa"

    ).innerHTML=siswaAktif.status;

}


/*===============================================================
=            RESET SISWA
===============================================================*/

function resetSiswa(){

    siswaAktif=null;

    document.getElementById(

        "idSiswa"

    ).innerHTML="-";

    document.getElementById(

        "namaSiswa"

    ).innerHTML="-";

    document.getElementById(

        "kelasSiswa"

    ).innerHTML="-";

    document.getElementById(

        "statusSiswa"

    ).innerHTML="-";

}/*****************************************************************
 * ===============================================================
 * ABSENSI SISWA v3.0
 * SMP Negeri 2 Kawali
 * BAGIAN 2
 * GPS
 *****************************************************************/


/*===============================================================
=            AMBIL GPS
===============================================================*/

async function ambilGPS(){

    try{

        lokasiGPS = await requestGPS();

        updateGPS();

    }

    catch(err){

        console.error(err);

        alert("GPS tidak dapat diperoleh.");

    }

}


/*===============================================================
=            UPDATE GPS
===============================================================*/

function updateGPS(){

    if(!lokasiGPS){

        return;

    }

    document.getElementById(

        "latitude"

    ).innerHTML=lokasiGPS.latitude.toFixed(6);

    document.getElementById(

        "longitude"

    ).innerHTML=lokasiGPS.longitude.toFixed(6);

    document.getElementById(

        "accuracy"

    ).innerHTML=Math.round(

        lokasiGPS.accuracy

    )+" meter";

}


/*===============================================================
=            VALIDASI GPS
===============================================================*/

function validasiGPS(){

    if(!lokasiGPS){

        alert("GPS belum tersedia.");

        return false;

    }

    if(lokasiGPS.accuracy>100){

        alert(

            "Akurasi GPS masih rendah ("+

            Math.round(lokasiGPS.accuracy)+

            " meter)."

        );

        return false;

    }

    return true;

}


/*===============================================================
=            REFRESH GPS
===============================================================*/

async function refreshGPS(){

    await ambilGPS();

}


/*===============================================================
=            AUTO REFRESH GPS
===============================================================*/

setInterval(

    function(){

        ambilGPS();

    },

    30000

);


/*===============================================================
=            GET GPS
===============================================================*/

function getGPSData(){

    if(!lokasiGPS){

        return null;

    }

    return{

        latitude:lokasiGPS.latitude,

        longitude:lokasiGPS.longitude,

        accuracy:lokasiGPS.accuracy

    };

}/*****************************************************************
 * ===============================================================
 * ABSENSI SISWA v3.0
 * SMP Negeri 2 Kawali
 * BAGIAN 3
 * PROSES ABSENSI
 *****************************************************************/


/*===============================================================
=            EVENT BUTTON
===============================================================*/

window.addEventListener(

    "load",

    function(){

        const btnMasuk=document.getElementById("btnMasuk");

        if(btnMasuk){

            btnMasuk.onclick=prosesMasuk;

        }

        const btnPulang=document.getElementById("btnPulang");

        if(btnPulang){

            btnPulang.onclick=prosesPulang;

        }

    }

);


/*===============================================================
=            ABSEN MASUK
===============================================================*/

async function prosesMasuk(){

    if(!siswaAktif){

        alert("Silakan cari siswa terlebih dahulu.");

        return;

    }

    if(!validasiGPS()){

        return;

    }

    const foto=captureBase64();

    if(!foto){

        alert("Kamera belum siap.");

        return;

    }

    const btn=document.getElementById("btnMasuk");

    buttonLoading(btn,"MENYIMPAN...");

    const result=await apiSaveMasuk({

        idSiswa:siswaAktif.idSiswa,

        foto:foto,

        latitude:lokasiGPS.latitude,

        longitude:lokasiGPS.longitude,

        petugas:getSession().username

    });

    buttonNormal(btn);

    if(result.success){

        alert(

            "Absensi Masuk berhasil.\n\nStatus : "+

            result.data.status

        );

        resetSiswa();

        document.getElementById("keyword").value="";

    }else{

        alert(result.message);

    }

}


/*===============================================================
=            ABSEN PULANG
===============================================================*/

async function prosesPulang(){

    if(!siswaAktif){

        alert("Silakan cari siswa terlebih dahulu.");

        return;

    }

    if(!validasiGPS()){

        return;

    }

    const foto=captureBase64();

    if(!foto){

        alert("Kamera belum siap.");

        return;

    }

    const btn=document.getElementById("btnPulang");

    buttonLoading(btn,"MENYIMPAN...");

    const result=await apiSavePulang({

        idSiswa:siswaAktif.idSiswa,

        foto:foto,

        latitude:lokasiGPS.latitude,

        longitude:lokasiGPS.longitude,

        petugas:getSession().username

    });

    buttonNormal(btn);

    if(result.success){

        alert(

            "Absensi Pulang berhasil.\n\nStatus : "+

            result.data.status

        );

        resetSiswa();

        document.getElementById("keyword").value="";

    }else{

        alert(result.message);

    }

}/*****************************************************************
 * ===============================================================
 * ABSENSI SISWA v3.0
 * SMP Negeri 2 Kawali
 * BAGIAN 4 (FINAL)
 *****************************************************************/


/*===============================================================
=            RESET FORM
===============================================================*/

function resetFormAbsensi(){

    resetSiswa();

    const keyword=document.getElementById("keyword");

    if(keyword){

        keyword.value="";

        keyword.focus();

    }

}


/*===============================================================
=            SELESAI ABSENSI
===============================================================*/

function selesaiAbsensi(){

    resetFormAbsensi();

    refreshGPS();

}


/*===============================================================
=            FOKUS OTOMATIS
===============================================================*/

window.addEventListener(

    "load",

    function(){

        const keyword=document.getElementById("keyword");

        if(keyword){

            keyword.focus();

        }

    }

);


/*===============================================================
=            REFRESH HALAMAN
===============================================================*/

function refreshHalaman(){

    location.reload();

}


/*===============================================================
=            CEK KAMERA
===============================================================*/

function kameraAktif(){

    const video=document.getElementById("camera");

    if(!video){

        return false;

    }

    return (

        video.readyState>=2 &&

        video.videoWidth>0

    );

}


/*===============================================================
=            VALIDASI ABSENSI
===============================================================*/

function validasiAbsensi(){

    if(!siswaAktif){

        alert("Silakan pilih siswa terlebih dahulu.");

        return false;

    }

    if(!kameraAktif()){

        alert("Kamera belum siap.");

        return false;

    }

    if(!validasiGPS()){

        return false;

    }

    return true;

}


/*===============================================================
=            INFO SISWA
===============================================================*/

function getSiswaAktif(){

    return siswaAktif;

}


/*===============================================================
=            CLEAR DATA
===============================================================*/

function clearData(){

    siswaAktif=null;

    lokasiGPS=null;

    resetSiswa();

}


/*===============================================================
=            TEST
===============================================================*/

function testAbsensi(){

    console.log(

        getSiswaAktif()

    );

    console.log(

        getGPSData()

    );

}
