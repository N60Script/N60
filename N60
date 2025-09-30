<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <title>N60Hub</title>
  <style>
    body {
      background-color: black;
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 0;
      padding: 0;
    }
    .hidden { display: none; }
    .fade {
      animation: fadeIn 1s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .btn {
      background: green;
      color: white;
      padding: 10px 20px;
      margin-top: 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 18px;
    }
    .btn:hover { opacity: 0.8; }
    .code-box {
      background: #111;
      border: 1px solid #444;
      padding: 15px;
      margin: 20px auto;
      width: 80%;
      border-radius: 8px;
      word-wrap: break-word;
    }
    .progress-bar {
      width: 80%;
      height: 20px;
      background: #333;
      margin: 10px auto;
      border-radius: 10px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      width: 0%;
      background: limegreen;
      transition: width 0.5s ease;
    }
  </style>
</head>
<body>

  <!-- المرحلة الأولى -->
  <div id="screen1" class="fade">
    <h2>اضغط على Start</h2>
    <button class="btn" onclick="startLoading()">Start</button>
  </div>

  <!-- التحميل الأول -->
  <div id="loading1" class="hidden fade">
    <h2>N60 Hub<span id="dots1">.</span></h2>
    <div class="progress-bar"><div id="bar1" class="progress-fill"></div></div>
    <p id="progress1">0%</p>
  </div>

  <!-- الشوط الثاني -->
  <div id="secondRound" class="hidden fade">
    <h2>الشوط الثاني</h2>
    <button class="btn" onclick="startSecondLoading()">Start</button>
  </div>

  <!-- التحميل الثاني -->
  <div id="loading2" class="hidden fade">
    <h2>تحميل<span id="dots2">.</span></h2>
    <div class="progress-bar"><div id="bar2" class="progress-fill"></div></div>
    <p id="progress2">0%</p>
  </div>

  <!-- النتيجة النهائية -->
  <div id="finalScreen" class="hidden fade">
    <h2>المفتاح 👇</h2>
    <div class="code-box" id="scriptCode">
      Jandel3MkAlblwi818
    </div>
    <button class="btn" onclick="copyCode()">نسخ</button>
  </div>

  <!-- صوت -->
  <audio id="doneSound" src="https://www.soundjay.com/buttons/beep-07.wav" preload="auto"></audio>

  <script>
    function animateDots(elementId) {
      let dots = document.getElementById(elementId);
      let count = 1;
      return setInterval(() => {
        dots.innerText = ".".repeat(count);
        count = (count % 3) + 1;
      }, 500);
    }

    function startLoading() {
      document.getElementById("screen1").classList.add("hidden");
      document.getElementById("loading1").classList.remove("hidden");

      let progress = 0;
      let bar = document.getElementById("bar1");
      let dotsInterval = animateDots("dots1");

      let interval = setInterval(() => {
        progress += 5;
        document.getElementById("progress1").innerText = progress + "%";
        bar.style.width = progress + "%";

        if (progress >= 100) {
          clearInterval(interval);
          clearInterval(dotsInterval);
          document.getElementById("doneSound").play();
          setTimeout(() => {
            document.getElementById("loading1").classList.add("hidden");
            document.getElementById("secondRound").classList.remove("hidden");
          }, 1000);
        }
      }, 1000);
    }

    function startSecondLoading() {
      document.getElementById("secondRound").classList.add("hidden");
      document.getElementById("loading2").classList.remove("hidden");

      let progress = 0;
      let bar = document.getElementById("bar2");
      let dotsInterval = animateDots("dots2");

      let interval = setInterval(() => {
        progress += 5;
        document.getElementById("progress2").innerText = progress + "%";
        bar.style.width = progress + "%";

        if (progress >= 100) {
          clearInterval(interval);
          clearInterval(dotsInterval);
          document.getElementById("doneSound").play();
          document.getElementById("loading2").innerHTML =
            '<h2>اكتمل التحميل ✅</h2><button class="btn" onclick="showFinal()">Enter</button>';
        }
      }, 1000);
    }

    function showFinal() {
      document.getElementById("loading2").classList.add("hidden");
      document.getElementById("finalScreen").classList.remove("hidden");
    }

    function copyCode() {
      let code = document.getElementById("scriptCode").innerText;
      navigator.clipboard.writeText(code).then(() => {
        alert("تم نسخ المفتاح ✅");
      });
    }
  </script>

</body>
</html>
