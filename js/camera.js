/*****************************************************************
 * ===============================================================
 * ABSENSI SISWA v3.0
 * SMP Negeri 2 Kawali
 * camera.js
 * ===============================================================
 * LIVE CAMERA
 *****************************************************************/


/*===============================================================
=            VARIABLE
===============================================================*/

let cameraStream = null;

let currentFacing = "environment";


/*===============================================================
=            LOAD
===============================================================*/

window.addEventListener(

    "load",

    function(){

        startCamera();

    }

);


/*===============================================================
=            START CAMERA
===============================================================*/

async function startCamera(){

    try{

        stopCamera();

        cameraStream = await navigator.mediaDevices.getUserMedia({

            video:{

                width:CAMERA.WIDTH,

                height:CAMERA.HEIGHT,

                facingMode:currentFacing

            },

            audio:false

        });

        const video=document.getElementById("camera");

        if(video){

            video.srcObject=cameraStream;

            await video.play();

        }

    }

    catch(err){

        console.error(err);

        alert("Kamera tidak dapat diakses.");

    }

}


/*===============================================================
=            STOP CAMERA
===============================================================*/

function stopCamera(){

    if(cameraStream){

        cameraStream.getTracks().forEach(function(track){

            track.stop();

        });

        cameraStream=null;

    }

}


/*===============================================================
=            SWITCH CAMERA
===============================================================*/

async function switchCamera(){

    if(currentFacing==="environment"){

        currentFacing="user";

    }else{

        currentFacing="environment";

    }

    await startCamera();

}


/*===============================================================
=            BUTTON SWITCH
===============================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        const btn=document.getElementById(

            "btnSwitchCamera"

        );

        if(btn){

            btn.onclick=switchCamera;

        }

    }

);


/*===============================================================
=            CAPTURE
===============================================================*/

function captureImage(){

    const video=document.getElementById("camera");

    const canvas=document.getElementById("canvas");

    if(!video||!canvas){

        return null;

    }

    canvas.width=video.videoWidth;

    canvas.height=video.videoHeight;

    const ctx=canvas.getContext("2d");

    ctx.drawImage(

        video,

        0,

        0,

        canvas.width,

        canvas.height

    );

    return canvas.toDataURL(

        CAMERA.IMAGE_TYPE,

        CAMERA.QUALITY

    );

}


/*===============================================================
=            BASE64
===============================================================*/

function captureBase64(){

    const img=captureImage();

    if(!img){

        return null;

    }

    return img.replace(

        /^data:image\/(png|jpeg|jpg);base64,/,

        ""

    );

}


/*===============================================================
=            SNAPSHOT
===============================================================*/

function saveSnapshot(){

    return captureBase64();

}


/*===============================================================
=            RESTART CAMERA
===============================================================*/

async function restartCamera(){

    await startCamera();

}


/*===============================================================
=            PAGE HIDDEN
===============================================================*/

document.addEventListener(

    "visibilitychange",

    function(){

        if(document.hidden){

            stopCamera();

        }else{

            startCamera();

        }

    }

);


/*===============================================================
=            BEFORE UNLOAD
===============================================================*/

window.addEventListener(

    "beforeunload",

    function(){

        stopCamera();

    }

);
