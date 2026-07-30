/*****************************************************************
 * ===============================================================
 * ABSENSI SISWA v3.0
 * SMP Negeri 2 Kawali
 * dashboard.js
 * ===============================================================
 * DASHBOARD
 *****************************************************************/


/*===============================================================
=            LOAD DASHBOARD
===============================================================*/

window.addEventListener(

    "load",

    initDashboard

);


/*===============================================================
=            INIT DASHBOARD
===============================================================*/

async function initDashboard(){

    const session=getSession();

    if(!session){

        location.href="../index.html";

        return;

    }

    loadProfile(session);

    await loadStatistic();

}


/*===============================================================
=            PROFILE
===============================================================*/

function loadProfile(session){

    const nama=document.getElementById("namaUser");

    const role=document.getElementById("roleUser");

    if(nama){

        nama.innerHTML=session.nama;

    }

    if(role){

        role.innerHTML=session.role;

    }

}


/*===============================================================
=            LOAD STATISTIK
===============================================================*/

async function loadStatistic(){

    try{

        const siswa=await callAPI(

            "countSiswa"

        );

        if(

            siswa.success &&

            document.getElementById("totalSiswa")

        ){

            document.getElementById(

                "totalSiswa"

            ).innerHTML=siswa.data.total;

        }

        const hadir=await callAPI(

            "countHadirHariIni"

        );

        if(

            hadir.success &&

            document.getElementById("hadirHariIni")

        ){

            document.getElementById(

                "hadirHariIni"

            ).innerHTML=hadir.data.total;

        }

    }

    catch(err){

        console.error(err);

    }

}


/*===============================================================
=            REFRESH
===============================================================*/

async function refreshDashboard(){

    await loadStatistic();

}


/*===============================================================
=            AUTO REFRESH
===============================================================*/

setInterval(

    refreshDashboard,

    60000

);


/*===============================================================
=            MENU
===============================================================*/

function openMenu(menu){

    alert(

        "Menu : "+menu+

        "\nSedang dalam pengembangan."

    );

}


/*===============================================================
=            LOGOUT
===============================================================*/

function doLogout(){

    if(

        !confirm(

            "Yakin akan logout?"

        )

    ){

        return;

    }

    clearSession();

    location.href="../index.html";

}


/*===============================================================
=            INFO
===============================================================*/

function showAppInfo(){

    alert(

        CONFIG.APP_NAME+

        "\nVersi : "+

        CONFIG.VERSION+

        "\n"+

        CONFIG.SEKOLAH

    );

}
