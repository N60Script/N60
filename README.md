<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>N60 Hub - واجهة التحكم</title>
  <style>
    :root{
      --bg:#0f1724;
      --card:#0b1220;
      --accent:#38bdf8;
      --success:#16a34a;
      --danger:#ef4444;
      --muted:#94a3b8;
      font-family: "Segoe UI", Tahoma, Arial, system-ui;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      background:linear-gradient(180deg,#071022 0%,#081526 100%);
      color:#e6eef8;
      padding:20px;
    }
    .container{
      width:100%;
      max-width:420px;
      background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      border:1px solid rgba(255,255,255,0.04);
      border-radius:12px;
      padding:20px;
      box-shadow:0 8px 30px rgba(2,6,23,0.7);
    }

    h1{font-size:18px;margin:0 0 12px;text-align:center;color:var(--accent)}
    .center{display:flex;align-items:center;justify-content:center}
    .key-box{
      display:flex;
      gap:8px;
      margin:12px 0 18px;
    }
    input[type="text"]{
      flex:1;
      padding:12px 14px;
      border-radius:8px;
      border:1px solid rgba(255,255,255,0.06);
      background:rgba(255,255,255,0.02);
      color:inherit;
      outline:none;
      font-size:15px;
    }
    button.btn{
      padding:10px 12px;
      border-radius:8px;
      border:none;
      background:var(--accent);
      color:#032028;
      font-weight:600;
      cursor:pointer;
    }
    .hidden{display:none}
    .selector{
      display:flex;
      gap:12px;
      margin-top:8px;
      justify-content:center;
    }
    .card{
      background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00));
      border:1px solid rgba(255,255,255,0.03);
      padding:14px;
      border-radius:10px;
      margin-top:12px;
    }
    .option{
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:10px;
      border-radius:8px;
      margin-bottom:8px;
      border:1px solid rgba(255,255,255,0.02);
      background:rgba(255,255,255,0.01);
    }
    .toggle{
      min-width:84px;
      text-align:center;
      padding:8px 10px;
      border-radius:8px;
      cursor:pointer;
      user-select:none;
      font-weight:700;
      color:white;
    }
    .toggle.off{background:var(--danger)}
    .toggle.on{background:var(--success)}
    .num-control{
      display:inline-flex;
      align-items:center;
      gap:8px;
    }
    .num-control button{
      width:30px;height:30px;border-radius:6px;border:none;background:rgba(255,255,255,0.03);color:inherit;font-weight:700;cursor:pointer;
    }
    .num-display{
      min-width:46px;text-align:center;font-weight:700;
    }
    .activate-row{display:flex;gap:10px;align-items:center;justify-content:center;margin-top:12px}
    .small-muted{color:var(--muted);font-size:13px;text-align:center;margin-top:8px}
    .status-line{font-size:13px;margin-top:8px;text-align:center}
    footer{margin-top:12px;font-size:12px;color:var(--muted);text-align:center}
    @media (max-width:420px){.container{padding:14px}}
  </style>
</head>
<body>
  <div class="container" role="main" aria-live="polite">
    <h1>N60 Hub - واجهة الاختبار</h1>

    <!-- شاشة المفتاح -->
    <div id="key-screen" class="card">
      <div style="font-weight:700;margin-bottom:8px">Textbox key</div>
      <div class="key-box">
        <input id="key-input" type="text" placeholder="اكتب المفتاح هنا..." aria-label="مفتاح" />
        <button id="key-check" class="btn">تحقق</button>
      </div>
      <div id="key-msg" class="small-muted">اكتب المفتاح الصحيح لعرض الخيارات.</div>
    </div>

    <!-- اختيار PS4 / PS5 -->
    <div id="console-screen" class="card hidden">
      <div style="font-weight:700;margin-bottom:8px">اختر الجهاز</div>
      <div class="selector">
        <button id="ps4-btn" class="btn" style="background:#0ea5a4;color:#031619">PS4</button>
        <button id="ps5-btn" class="btn" style="background:#7c3aed;color:#fff">PS5</button>
      </div>
      <div class="status-line" id="selected-console" style="display:none;margin-top:12px"></div>
    </div>

    <!-- واجهة الخيارات -->
    <div id="options-screen" class="card hidden">
      <div style="font-weight:800;margin-bottom:10px" id="console-title">خيارات</div>

      <!-- Aim Bot -->
      <div class="option">
        <div>
          <div style="font-weight:700">Aim Bot</div>
          <div style="font-size:13px;color:var(--muted)">ضبط مستوى الـ Aim</div>
        </div>
        <div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="num-control">
              <button class="decrease" data-target="aim">-</button>
              <div class="num-display" id="aim-value">50</div>
              <button class="increase" data-target="aim">+</button>
            </div>
            <div id="aim-toggle" class="toggle off" role="button" tabindex="0" aria-pressed="false">طافي</div>
          </div>
        </div>
      </div>

      <!-- Aim Lock -->
      <div class="option">
        <div>
          <div style="font-weight:700">Aim lock</div>
          <div style="font-size:13px;color:var(--muted)">قفل الهدف</div>
        </div>
        <div>
          <div id="aimlock-toggle" class="toggle off" role="button" tabindex="0" aria-pressed="false">طافي</div>
        </div>
      </div>

      <!-- Auto Farm -->
      <div class="option">
        <div>
          <div style="font-weight:700">Auto farm</div>
          <div style="font-size:13px;color:var(--muted)">زراعة تلقائية / جمع</div>
        </div>
        <div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="num-control">
              <button class="decrease" data-target="farm">-</button>
              <div class="num-display" id="farm-value">50</div>
              <button class="increase" data-target="farm">+</button>
            </div>
            <div id="farm-toggle" class="toggle off" role="button" tabindex="0" aria-pressed="false">طافي</div>
          </div>
        </div>
      </div>

      <div class="activate-row">
        <button id="activate-btn" class="btn" style="background:var(--accent)">تفعيل</button>
        <button id="back-btn" class="btn" style="background:rgba(255,255,255,0.04);color:#cfe9f7">العودة</button>
      </div>

      <div id="action-msg" class="small-muted">اضغط تفعيل لمحاكاة تفعيل الخيارات على الجهاز المحدد.</div>
    </div>

    <div id="final-msg" class="hidden small-muted"></div>
    <footer>صفحة  — محاكاة  </footer>
  </div>

  <script>
    // ثابت المفتاح
    const CORRECT_KEY = 'Al-blwi818';

    // عناصر DOM
    const keyScreen = document.getElementById('key-screen');
    const consoleScreen = document.getElementById('console-screen');
    const optionsScreen = document.getElementById('options-screen');
    const keyInput = document.getElementById('key-input');
    const keyCheck = document.getElementById('key-check');
    const keyMsg = document.getElementById('key-msg');
    const ps4Btn = document.getElementById('ps4-btn');
    const ps5Btn = document.getElementById('ps5-btn');
    const selectedConsole = document.getElementById('selected-console');
    const consoleTitle = document.getElementById('console-title');

    // controls
    const aimValueEl = document.getElementById('aim-value');
    const farmValueEl = document.getElementById('farm-value');
    const aimToggle = document.getElementById('aim-toggle');
    const aimlockToggle = document.getElementById('aimlock-toggle');
    const farmToggle = document.getElementById('farm-toggle');
    const activateBtn = document.getElementById('activate-btn');
    const backBtn = document.getElementById('back-btn');
    const actionMsg = document.getElementById('action-msg');

    // حالة 
    let state = {
      unlocked: false,
      console: null, // 'PS4' or 'PS5'
      aim: {value:50, on:false},
      aimlock: {on:false},
      farm: {value:50, on:false},
    };

    // حفظ/استرجاع (اختياري) من localStorage
    function saveState(){ localStorage.setItem('n60_state', JSON.stringify(state)); }
    function loadState(){
      try{
        const s = JSON.parse(localStorage.getItem('n60_state') || 'null');
        if(s){ state = {...state, ...s}; }
      }catch(e){}
    }
    loadState();

    // init UI from state (if unlocked before)
    if(state.unlocked){
      keyScreen.classList.add('hidden');
      consoleScreen.classList.remove('hidden');
      selectedConsole.style.display = 'none';
    }

    // مفيد: فوكس على الحقل
    keyInput.focus();

    // التحقق من المفتاح
    function handleKeyCheck(){
      const v = keyInput.value.trim();
      if(v === CORRECT_KEY){
        keyMsg.textContent = 'المفتاح صحيح — جارِ العرض...';
        keyScreen.classList.add('hidden');
        consoleScreen.classList.remove('hidden');
        state.unlocked = true;
        saveState();
      } else {
        keyMsg.textContent = 'المفتاح خاطئ. جرّب مرة ثانية.';
        keyInput.classList.add('shake');
        setTimeout(()=> keyInput.classList.remove('shake'), 400);
      }
    }
    keyCheck.addEventListener('click', handleKeyCheck);
    keyInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') handleKeyCheck(); });

    // اختيار جهاز
    function chooseConsole(c){
      state.console = c;
      consoleTitle.textContent = `خيارات — ${c}`;
      selectedConsole.style.display = 'block';
      selectedConsole.textContent = `الجهاز المحدد: ${c}`;
      consoleScreen.classList.add('hidden');
      optionsScreen.classList.remove('hidden');
      applyAllToggles();
      saveState();
    }
    ps4Btn.addEventListener('click', ()=>chooseConsole('PS4'));
    ps5Btn.addEventListener('click', ()=>chooseConsole('PS5'));

    // تغير الأرقام
    document.querySelectorAll('.increase').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const t = btn.dataset.target;
        if(t === 'aim'){ state.aim.value = Math.min(999, state.aim.value + 1); aimValueEl.textContent = state.aim.value; }
        if(t === 'farm'){ state.farm.value = Math.min(999, state.farm.value + 1); farmValueEl.textContent = state.farm.value; }
        saveState();
      });
    });
    document.querySelectorAll('.decrease').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const t = btn.dataset.target;
        if(t === 'aim'){ state.aim.value = Math.max(0, state.aim.value - 1); aimValueEl.textContent = state.aim.value; }
        if(t === 'farm'){ state.farm.value = Math.max(0, state.farm.value - 1); farmValueEl.textContent = state.farm.value; }
        saveState();
      });
    });

    // تبديل ال toggles
    function toggleItem(key){
      if(key === 'aim'){ state.aim.on = !state.aim.on; }
      if(key === 'aimlock'){ state.aimlock.on = !state.aimlock.on; }
      if(key === 'farm'){ state.farm.on = !state.farm.on; }
      applyAllToggles();
      saveState();
    }
    function applyAllToggles(){
      aimValueEl.textContent = state.aim.value;
      farmValueEl.textContent = state.farm.value;
      setToggleUI(aimToggle, state.aim.on);
      setToggleUI(aimlockToggle, state.aimlock.on);
      setToggleUI(farmToggle, state.farm.on);
    }
    function setToggleUI(el, isOn){
      el.classList.toggle('on', isOn);
      el.classList.toggle('off', !isOn);
      el.textContent = isOn ? 'شغال' : 'طافي';
      el.setAttribute('aria-pressed', String(!!isOn));
    }

    aimToggle.addEventListener('click', ()=>toggleItem('aim'));
    aimlockToggle.addEventListener('click', ()=>toggleItem('aimlock'));
    farmToggle.addEventListener('click', ()=>toggleItem('farm'));

    // اختصارات لوحة المفاتيح لعمليات التبديل (تجربة)
    [aimToggle, aimlockToggle, farmToggle].forEach(el=>{
      el.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') el.click(); });
    });

    // زر العودة
    backBtn.addEventListener('click', ()=>{
      optionsScreen.classList.add('hidden');
      consoleScreen.classList.remove('hidden');
      selectedConsole.style.display = 'none';
      saveState();
    });

    // زر التفعيل — ملاحظة: محاكاة
    activateBtn.addEventListener('click', ()=>{
      if(!state.console){
        actionMsg.textContent = 'لم تختَر جهازًا بعد.';
        return;
      }
      // لا يمكن لنا الوصول فعليًا لأجهزة PS4/PS5 من صفحة ويب عادية.
      // سنعرض محاكاة وتلخيص الحالة.
      const summary = {
        console: state.console,
        aim: {value: state.aim.value, on: state.aim.on},
        aimlock: {on: state.aimlock.on},
        farm: {value: state.farm.value, on: state.farm.on},
        time: new Date().toLocaleString()
      };
      actionMsg.textContent = 'محاكاة: تم إرسال الإعدادات إلى الجهاز. راجع النتيجة أدناه.';
      // عرض نافذة حوار صغيرة توضح التفاصيل:
      setTimeout(()=> {
        alert('محاكاة تفعيل على ' + summary.console + '\n\n' +
              'Aim Bot: ' + (summary.aim.on ? 'شغال' : 'طافي') + ' | قيمة: ' + summary.aim.value + '\n' +
              'Aim lock: ' + (summary.aimlock.on ? 'شغال' : 'طافي') + '\n' +
              'Auto farm: ' + (summary.farm.on ? 'شغال' : 'طافي') + ' | قيمة: ' + summary.farm.value + '\n\n' +
              ': هذه محاكاة — لربط فعلي مع PS4/PS5 يلزم جهاز وسيط أو API خاصّ.');
      }, 120);
    });

    // أزرار البداية: استرجاع القيم الأولية للعرض
    applyAllToggles();

    // لمسة صغيرة: أنيميشن خطأ
    (function addShakeStyle(){
      const s = document.createElement('style');
      s.innerHTML = `
        @keyframes shakeX{0%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}100%{transform:translateX(0)}}
        .shake{animation:shakeX .35s}
      `;
      document.head.appendChild(s);
    })();
  </script>
</body>
</html>
