<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Gaming HUD</title>
  <style>
    body {
      margin:0;
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#000 url('https://i.ibb.co/t3z2Wrx/hud-bg.jpg') no-repeat center/cover;
      font-family:"Tajawal",Arial,sans-serif;
      color:#0f0;
    }
    .hud {
      width:380px;
      background:rgba(0,0,0,0.8);
      border:2px solid #0f0;
      border-radius:12px;
      padding:20px;
      box-shadow:0 0 25px #0f0;
      text-align:center;
    }
    .title {
      font-size:22px;
      font-weight:bold;
      color:#0f0;
      text-shadow:0 0 10px #0f0;
      margin-bottom:20px;
    }
    .row {
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin:20px 0;
    }
    .btn {
      width:42px;
      height:42px;
      border:none;
      border-radius:8px;
      font-size:22px;
      font-weight:bold;
      color:#fff;
      background:#111;
      cursor:pointer;
      box-shadow:0 0 10px #0f0 inset;
    }
    .btn:active {
      background:#0f0;
      color:#000;
    }
    .numbox {
      min-width:80px;
      text-align:center;
      font-size:20px;
      font-weight:bold;
      padding:10px;
      background:#111;
      color:#0f0;
      border:2px solid #0f0;
      border-radius:8px;
      box-shadow:0 0 15px #0f0 inset;
    }
    .switch {
      width:80px;
      height:36px;
      border-radius:20px;
      cursor:pointer;
      display:flex;
      align-items:center;
      padding:4px;
      transition:.3s;
      box-shadow:0 0 12px #f00 inset;
    }
    .dot {
      width:28px;
      height:28px;
      border-radius:50%;
      background:#fff;
      transition:.3s;
    }
    .switch.off {
      background:#300;
      justify-content:flex-start;
      box-shadow:0 0 15px #f00 inset;
    }
    .switch.on {
      background:#030;
      justify-content:flex-end;
      box-shadow:0 0 15px #0f0 inset;
    }
    .switch.on .dot { background:#0f0; box-shadow:0 0 10px #0f0; }
    .switch.off .dot { background:#f00; box-shadow:0 0 10px #f00; }
    .actions {
      margin-top:25px;
      display:flex;
      gap:12px;
      justify-content:center;
    }
    .actions button {
      padding:10px 16px;
      border:none;
      border-radius:6px;
      font-weight:bold;
      cursor:pointer;
      background:#111;
      color:#0f0;
      border:2px solid #0f0;
      box-shadow:0 0 10px #0f0 inset;
      transition:.2s;
    }
    .actions button:active {
      background:#0f0;
      color:#000;
    }
  </style>
</head>
<body>
  <div class="hud">
    <div class="title">🎮 اختار الايم</div>

    <div class="row">
      <span>Aim assist</span>
      <div>
        <button class="btn" id="dec">−</button>
        <span class="numbox" id="aimValue">50</span>
        <button class="btn" id="inc">+</button>
      </div>
    </div>

    <div class="row">
      <span>⭕️ كشف لاعبين</span>
      <div class="switch off" id="toggle"><div class="dot"></div></div>
    </div>

    <div class="actions">
      <button id="reset">إعادة </button>
      <button id="save">حفظ</button>
      <button id="load">تحميل</button>
    </div>
  </div>

  <script>
    const aimEl = document.getElementById('aimValue');
    const incBtn = document.getElementById('inc');
    const decBtn = document.getElementById('dec');
    const toggle = document.getElementById('toggle');
    const resetBtn = document.getElementById('reset');
    const saveBtn = document.getElementById('save');
    const loadBtn = document.getElementById('load');

    const MIN_AIM = 10, MAX_AIM = 200;
    let aim = Number(localStorage.getItem('aim_value') ?? 50);
    let playersDetect = (localStorage.getItem('players_detect') === '1');

    function renderAim(){
      aim = Math.min(MAX_AIM, Math.max(MIN_AIM, Math.round(aim)));
      aimEl.textContent = aim;
      localStorage.setItem('aim_value', aim);
    }
    function renderToggle(){
      if(playersDetect){
        toggle.classList.add('on');
        toggle.classList.remove('off');
        localStorage.setItem('players_detect','1');
      } else {
        toggle.classList.add('off');
        toggle.classList.remove('on');
        localStorage.setItem('players_detect','0');
      }
    }

    incBtn.onclick = ()=>{ aim++; renderAim(); }
    decBtn.onclick = ()=>{ aim--; renderAim(); }
    toggle.onclick = ()=>{ playersDetect=!playersDetect; renderToggle(); }
    resetBtn.onclick = ()=>{ aim=50; playersDetect=false; renderAim(); renderToggle(); }

    saveBtn.onclick = ()=>{
      const data = {aim, playersDetect};
      const blob = new Blob([JSON.stringify(data)], {type:"application/json"});
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "settings.json";
      link.click();
    }
    loadBtn.onclick = ()=>{
      const input = document.createElement("input");
      input.type = "file"; input.accept=".json";
      input.onchange = e=>{
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = ev=>{
          const data = JSON.parse(ev.target.result);
          aim = data.aim ?? aim;
          playersDetect = data.playersDetect ?? playersDetect;
          renderAim(); renderToggle();
        }
        reader.readAsText(file);
      }
      input.click();
    }

    renderAim(); renderToggle();
  </script>
</body>
</html>
