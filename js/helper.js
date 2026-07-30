/*****************************************************************
 * ===============================================================
 * ABSENSI SISWA v3.0
 * SMP Negeri 2 Kawali
 * helper.js
 * ===============================================================
 * Fungsi Umum Frontend
 *****************************************************************/


/*===============================================================
=            SELECT ELEMENT
===============================================================*/

function $(id){

    return document.getElementById(id);

}


/*===============================================================
=            SHOW MESSAGE
===============================================================*/

function showMessage(message,color="red"){

    const obj=$("loginMessage");

    if(!obj) return;

    obj.innerHTML=message;

    obj.style.color=color;

}


/*===============================================================
=            CLEAR MESSAGE
===============================================================*/

function clearMessage(){

    const obj=$("loginMessage");

    if(!obj) return;

    obj.innerHTML="";

}


/*===============================================================
=            BUTTON LOADING
===============================================================*/

function buttonLoading(button,text){

    button.dataset.text=button.innerHTML;

    button.disabled=true;

    button.innerHTML=text;

}


/*===============================================================
=            BUTTON NORMAL
===============================================================*/

function buttonNormal(button){

    button.disabled=false;

    button.innerHTML=button.dataset.text;

}


/*===============================================================
=            SAVE SESSION
===============================================================*/

function saveSession(data){

    localStorage.setItem(

        STORAGE.PROFILE,

        JSON.stringify(data)

    );

}


/*===============================================================
=            GET SESSION
===============================================================*/

function getSession(){

    const data=localStorage.getItem(

        STORAGE.PROFILE

    );

    if(!data){

        return null;

    }

    return JSON.parse(data);

}


/*===============================================================
=            CLEAR SESSION
===============================================================*/

function clearSession(){

    localStorage.removeItem(

        STORAGE.PROFILE

    );

}


/*===============================================================
=            FORMAT DATE
===============================================================*/

function formatDate(date){

    return new Date(date).toLocaleDateString(

        "id-ID"

    );

}


/*===============================================================
=            FORMAT TIME
===============================================================*/

function formatTime(date){

    return new Date(date).toLocaleTimeString(

        "id-ID"

    );

}


/*===============================================================
=            REQUEST GPS
===============================================================*/

function requestGPS(){

    return new Promise(function(resolve,reject){

        if(!navigator.geolocation){

            reject("Browser tidak mendukung GPS.");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            function(position){

                resolve({

                    latitude:position.coords.latitude,

                    longitude:position.coords.longitude,

                    accuracy:position.coords.accuracy

                });

            },

            function(error){

                reject(error.message);

            },

            {

                enableHighAccuracy:GPS.HIGH_ACCURACY,

                timeout:GPS.TIMEOUT,

                maximumAge:GPS.MAXIMUM_AGE

            }

        );

    });

}


/*===============================================================
=            CONVERT IMAGE TO BASE64
===============================================================*/

function fileToBase64(file){

    return new Promise(function(resolve,reject){

        const reader=new FileReader();

        reader.onload=function(){

            resolve(

                reader.result.split(",")[1]

            );

        };

        reader.onerror=function(){

            reject("Gagal membaca file.");

        };

        reader.readAsDataURL(file);

    });

}


/*===============================================================
=            IS EMPTY
===============================================================*/

function isEmpty(value){

    return value===undefined ||

           value===null ||

           value==="";

}


/*===============================================================
=            LOG
===============================================================*/

function log(data){

    if(DEBUG){

        console.log(data);

    }

}


/*===============================================================
=            ALERT
===============================================================*/

function info(message){

    alert(message);

}


/*===============================================================
=            REDIRECT
===============================================================*/

function go(url){

    window.location.href=url;

}


/*===============================================================
=            LOGOUT
===============================================================*/

function logout(){

    clearSession();

    location.reload();

}
