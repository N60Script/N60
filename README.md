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
        margin-top: 100px;
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
    }
    #scaryImage {
        display: none;
        width: 80%;
        max-width: 600px;
        margin-top: 50px;
    }
</style>
</head>
<body>

<h1>¿Quieres celebrar Halloween conmigo?</h1>
<button id="yesBtn">Sí</button>
<button id="noBtn">No</button>

<img id="scaryImage" src="https://i.postimg.cc/4n6S62SR/halloween-scary.jpg" alt="Scary">

<audio id="screamAudio" src="https://jonathanbassedas.github.io/halloween/scream.mp3"></audio>

<script>
    const scream = document.getElementById("screamAudio");
    const image = document.getElementById("scaryImage");

    // زر Sí
    document.getElementById("yesBtn").addEventListener("click", () => {
        image.style.display = "block"; // إظهار الصورة
        scream.play(); // تشغيل الصوت
    });

    // زر No يتحرك بعيدًا عند محاولة الضغط
    const noBtn = document.getElementById("noBtn");
    noBtn.addEventListener("mouseenter", () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.position = "absolute";
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
    });
    noBtn.addEventListener("click", () => {
        image.style.display = "block"; // يظهر الصورة إذا ضغطت
        scream.play(); // تشغيل الصوت
    });
</script>

</body>
</html>
