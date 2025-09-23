<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>موقعي</title>
<style>
body {
    background-color: black;
    color: white;
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 0;
    padding: 0;
}
button {
    background-color: black;
    color: white;
    border: 2px solid white;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    font-size: 16px;
}
button:hover {
    background-color: white;
    color: black;
}
.hidden {
    display: none;
}
.container {
    margin-top: 50px;
}
</style>
</head>
<body>

<div class="container" id="welcomeScreen">
    <h1>منور الموقع</h1>
    <p>تحميل من 1-100</p>
    <button onclick="showOptions()">ابدأ</button>
</div>

<div class="container hidden" id="optionsScreen">
    <h2>اختر الخدمة</h2>
    <button onclick="selectService('TikTok')">تيك توك</button>
    <button onclick="selectService('Instagram')">إنستا</button>
    <button onclick="selectService('Roblox')">روبلوكس</button>
</div>

<div class="container hidden" id="followScreen">
    <h2 id="serviceTitle"></h2>
    <p>كم تبي عدد ال Follow؟</p>
    <button onclick="startAdding(1000)">1000</button>
    <button onclick="startAdding(2000)">2000</button>
    <button onclick="startAdding(3000)">3000</button>
</div>

<div class="container hidden" id="loadingScreen">
    <h2>جار الإضافة...</h2>
    <p>تحميل من 1-100</p>
</div>

<div class="container hidden" id="doneScreen">
    <h1>واهاهاها 🤣🤣</h1>
    <p>صدق الهطف تقولي تبي متابعين؟؟</p>
    <p>ضيفني تيك 818bw</p>
</div>

<script>
function showOptions() {
    document.getElementById('welcomeScreen').classList.add('hidden');
    document.getElementById('optionsScreen').classList.remove('hidden');
}

function selectService(service) {
    document.getElementById('optionsScreen').classList.add('hidden');
    document.getElementById('followScreen').classList.remove('hidden');
    document.getElementById('serviceTitle').innerText = service;
}

function startAdding(number) {
    document.getElementById('followScreen').classList.add('hidden');
    document.getElementById('loadingScreen').classList.remove('hidden');
    
    let progress = 0;
    let interval = setInterval(() => {
        progress++;
        if(progress >= 100) {
            clearInterval(interval);
            document.getElementById('loadingScreen').classList.add('hidden');
            document.getElementById('doneScreen').classList.remove('hidden');
        }
    }, 50); // كل 50ms يزداد رقم التحميل
}
</script>

</body>
</html>
