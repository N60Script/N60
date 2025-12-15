<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Halloween Jump Scare</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: black;
        color: white;
        text-align: center;
        margin: 0;
        overflow: hidden;
    }
    #container {
        position: relative;
        width: 100%;
        height: 100vh;
    }
    #yesBtn, #noBtn {
        font-size: 24px;
        padding: 15px 30px;
        margin: 20px;
        cursor: pointer;
        border: none;
        border-radius: 10px;
        background-color: orange;
        color: black;
        position: relative;
        z-index: 2;
    }
    #scaryImage {
        display: none;
        width: 100%;
        height: 100vh;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
    }
    #message {
        position: relative;
        z-index: 2;
        margin-top: 100px;
        font-size: 32px;
    }
</style>
</head>
<body>

<div id="container">
    <div id="message">¿Quieres celebrar Halloween conmigo?</div>
    <button id="yesBtn">Sí</button>
    <button id="noBtn">No</button>

    <img id="scaryImage" src="https://i.postimg.cc/4n6S62SR/halloween-scary.jpg" alt="Scary">
    <audio id="screamAudio" src="Record (online-voice-recorder.com).mp3"></audio>
</div>

<script>
    const scream = document.getElementById("screamAudio");
    const image = document.getElementById("scaryImage");
    const container = document.getElementById("container");

    function triggerScare() {
        // إزالة كل عناصر الصفحة داخل container
        container.innerHTML = "";
        // إضافة الصورة بملء الشاشة
        container.appendChild(image);
        image.style.display = "block";
        scream.play();
    }

    // زر Sí
    document.getElementById("yesBtn").addEventListener("click", triggerScare);

    // زر No يتحرك بعيدًا عن المؤشر
    const noBtn = document.getElementById("noBtn");
    noBtn.addEventListener("mouseenter", () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.position = "absolute";
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
    });
    noBtn.addEventListener("click", triggerScare);
</script>

</body>
</html>
