<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>موقع المتابعين l</title>
<style>
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background: black;
  color: white;
  margin: 0;
  padding: 0;
}
.hidden { display: none; }
.screen {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.progress-bar {
  width: 300px;
  height: 20px;
  background: #ddd;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  width: 0%;
  background: #4caf50;
  transition: width 0.2s;
}
.option-btn {
  margin: 5px;
  padding: 10px 20px;
  border: 2px solid white;
  background: white;
  color: black;
  cursor: pointer;
  border-radius: 10px;
  font-size: 16px;
}
</style>
</head>
<body>

<!-- شاشة التحميل -->
<div id="loaderScreen" class="screen">
  <h1>منور الموقع</h1>
  <p>تحميل من 1-100</p>
  <div class="progress-bar"><div class="progress-fill" id="loaderProgress"></div></div>
</div>

<!-- شاشة اختيار المنصة -->
<div id="platformScreen" class="screen hidden">
  <h2>اختار النوع</h2>
  <div>
    <button class="option-btn" id="tiktokBtn">تيك توك</button>
    <button class="option-btn" id="instaBtn">إنستا</button>
    <button class="option-btn" id="robloxBtn">روبلكس</button>
  </div>
</div>

<!-- شاشة اختيار العدد -->
<div id="followScreen" class="screen hidden">
  <h2>كم تبي عدد المتابعين؟</h2>
  <div>
    <button class="option-btn followBtn">1000</button>
    <button class="option-btn followBtn">2000</button>
    <button class="option-btn followBtn">3000</button>
  </div>
</div>

<!-- شاشة الإضافة -->
<div id="addingScreen" class="screen hidden">
  <h2>جار الإضافة...</h2>
  <p>تحميل من 1-100</p>
  <div class="progress-bar"><div class="progress-fill" id="addingProgress"></div></div>
</div>

<!-- شاشة النهاية -->
<div id="doneScreen" class="screen hidden">
  <h1>ههههههه 🤣🤣</h1>
  <p>صدق الهطف تقولي تبي متابعين؟؟</p>
  <p>ضيفوني تيك 818bw</p>
</div>

<script>
// شاشات
const loaderScreen = document.getElementById('loaderScreen');
const platformScreen = document.getElementById('platformScreen');
const followScreen = document.getElementById('followScreen');
const addingScreen = document.getElementById('addingScreen');
const doneScreen = document.getElementById('doneScreen');

// التحميل الأولي
let loadValue = 0;
let loaderFill = document.getElementById('loaderProgress');
let loadInterval = setInterval(() => {
  loadValue++;
  loaderFill.style.width = loadValue + '%';
  if (loadValue >= 100) {
    clearInterval(loadInterval);
    loaderScreen.classList.add('hidden');
    platformScreen.classList.remove('hidden');
  }
}, 20);

// اختيار المنصة
document.querySelectorAll('#tiktokBtn,#instaBtn,#robloxBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    platformScreen.classList.add('hidden');
    followScreen.classList.remove('hidden');
  });
});

// اختيار العدد
document.querySelectorAll('.followBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    followScreen.classList.add('hidden');
    addingScreen.classList.remove('hidden');

    let addValue = 0;
    let addingFill = document.getElementById('addingProgress');
    let addInterval = setInterval(() => {
      addValue++;
      addingFill.style.width = addValue + '%';
      if (addValue >= 100) {
        clearInterval(addInterval);
        addingScreen.classList.add('hidden');
        doneScreen.classList.remove('hidden');
      }
    }, 100); // كل نصف ثانية يزود واحد
  });
});
</script>

</body>
</html>
