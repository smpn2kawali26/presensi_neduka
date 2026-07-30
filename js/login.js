/*****************************************************************
 * ===============================================================
 * ABSENSI SISWA v3.0
 * SMP Negeri 2 Kawali
 * login.js
 * ===============================================================
 * LOGIN FRONTEND
 *****************************************************************/


/*===============================================================
=            INITIAL
===============================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        initLogin();

    }

);


/*===============================================================
=            INIT LOGIN
===============================================================*/

function initLogin(){

    const btn=$("btnLogin");

    if(!btn) return;

    btn.addEventListener(

        "click",

        doLogin

    );

}


/*===============================================================
=            LOGIN
===============================================================*/

async function doLogin(){

    clearMessage();

    const username=$("username").value.trim();

    const password=$("password").value.trim();

    const role=$("role").value;

    if(username===""){

        showMessage("Username harus diisi.");

        $("username").focus();

        return;

    }

    if(password===""){

        showMessage("Password harus diisi.");

        $("password").focus();

        return;

    }

    const btn=$("btnLogin");

    buttonLoading(

        btn,

        "LOGIN..."

    );

    const result=await apiLogin(

        username,

        password,

        role

    );

    buttonNormal(btn);

    if(!result.success){

        showMessage(

            result.message

        );

        return;

    }

    saveSession(

        result.data

    );

    showMessage(

        "Login berhasil.",

        "green"

    );

    setTimeout(

        function(){

            redirectDashboard(

                result.data.role

            );

        },

        700

    );

}


/*===============================================================
=            REDIRECT DASHBOARD
===============================================================*/

function redirectDashboard(role){

    role=String(role).toUpperCase();

    switch(role){

        case ROLE.ADMIN:

            go("pages/admin.html");

            break;

        case ROLE.PETUGAS:

            go("pages/petugas.html");

            break;

        case ROLE.GURU:

            go("pages/guru.html");

            break;

        case ROLE.KEPALA:

            go("pages/kepala.html");

            break;

        case ROLE.ORANGTUA:

            go("pages/orangtua.html");

            break;

        default:

            alert("Role tidak dikenali.");

    }

}


/*===============================================================
=            ENTER KEY
===============================================================*/

document.addEventListener(

    "keypress",

    function(e){

        if(e.key==="Enter"){

            const btn=$("btnLogin");

            if(btn){

                btn.click();

            }

        }

    }

);


/*===============================================================
=            AUTO LOGIN
===============================================================*/

window.addEventListener(

    "load",

    function(){

        const session=getSession();

        if(!session){

            return;

        }

        if(session.role){

            redirectDashboard(

                session.role

            );

        }

    }

);


/*===============================================================
=            LOGOUT
===============================================================*/

function doLogout(){

    clearSession();

    location.href="../index.html";

}
