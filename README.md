<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>N60 Simple Loader</title>
  <style>
    :root{
      --bg:#000;
      --text:#e6e6e6;
      --muted:#9a9a9a;
      --green:#26c26b;
      --card-bg: rgba(255,255,255,0.03);
      --glass: rgba(255,255,255,0.02);
      --accent: rgba(255,255,255,0.04);
    }
    html,body{
      height:100%;
      margin:0;
      background:var(--bg);
      font-family: "Segoe UI", Tahoma, Arial, "Noto Kufi Arabic", sans-serif;
      color:var(--text);
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
    }
    .center-wrap{
      min-height:100%;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:24px;
      box-sizing:border-box;
    }

    .card{
      width:100%;
      max-width:720px;
      background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      border-radius:12px;
      padding:36px;
      box-sizing:border-box;
      box-shadow: 0 6px 30px rgba(0,0,0,0.6);
      text-align:center;
      border:1px solid rgba(255,255,255,0.03);
    }

    h1{
      margin:0 0 18px 0;
      font-size:22px;
      letter-spacing:0.2px;
    }
    p.lead{
      margin:0 0 28px 0;
      color:var(--muted);
      font-size:15px;
    }

    /* Start button */
    .btn-start{
      display:inline-block;
      background:linear-gradient(180deg, #36d978, #1aa85a);
      color:#021202;
      padding:14px 34px;
      font-weight:700;
      border-radius:10px;
      text-decoration:none;
      cursor:pointer;
      border:0;
      box-shadow: 0 6px 18px rgba(10,150,80,0.12), inset 0 -2px 0 rgba(0,0,0,0.08);
      font-size:16px;
      transition:transform .14s ease, box-shadow .14s ease;
    }
    .btn-start:active{ transform:translateY(1px) scale(.998); }

    /* Loading screen */
    .loader{
      display:none;
      flex-direction:column;
      align-items:center;
      gap:18px;
    }
    .loading-title{
      font-size:20px;
      font-weight:700;
    }
    .progress-wrap{
      width:100%;
      max-width:520px;
      background:var(--card-bg);
      border-radius:10px;
      padding:10px;
      box-sizing:border-box;
      border:1px solid rgba(255,255,255,0.03);
    }
    .progress-bar{
      height:18px;
      background:linear-gradient(90deg, rgba(38,194,107,0.9), rgba(20,120,60,0.9));
      width:0%;
      border-radius:8px;
      transition:width .6s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.6);
    }
    .progress-text{
      margin-top:10px;
      font-weight:600;
      color:var(--muted);
    }

    /* Final screen */
    .final{
      display:none;
      text-align:center;
    }
    .code-box{
      background: #0b0b0b;
      border:1px solid rgba(255,255,255,0.04);
      padding:16px;
      font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New", monospace;
      font-size:14px;
      color:#cfcfcf;
      border-radius:8px;
      margin-top:14px;
      text-align:left;
      overflow:auto;
      white-space:pre-wrap;
    }
    .copy-row{
      display:flex;
      justify-content:flex-start;
      gap:8px;
      margin-top:10px;
      align-items:center;
    }
    .btn-copy{
      background:transparent;
      color:var(--text);
      border:1px solid rgba(255,255,255,0.06);
      padding:8px 12px;
      border-radius:8px;
      cursor:pointer;
    }
    .small-muted{ color:var(--muted); font-size:13px; margin-top:6px; }

    footer{ margin-top:18px; color:var(--muted); font-size:13px; }

    /* responsive */
    @media (max-width:520px){
      .card{ padding:20px; }
      .btn-start{ padding:12px 20px; font-size:15px; }
    }
  </style>
</head>
<body>
  <div class="center-wrap">
    <div class="card" role="main" aria-live="polite">
      <!-- Start Screen -->
      <div id="startScreen" class="start-screen">
        <h1>اضغط على start</h1>
        <p class="lead">اضغط الزر الأخضر للبدء.</p>
        <button id="startBtn" class="btn-start">start</button>
      </div>

      <!-- Loader Screen -->
      <div id="loaderScreen" class="loader" aria-hidden="true">
        <div class="loading-title">شاشة تحميل</div>

        <div class="progress-wrap" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="1">
          <div id="progressBar" class="progress-bar" style="width:1%"></div>
        </div>

        <div id="progressText" class="progress-text">1 / 100</div>
        <div class="small-muted">صلي على النبي...</div>
      </div>

      <!-- Final Screen -->
      <div id="finalScreen" class="final" aria-hidden="true">
        <h1>كود السكربت 👇</h1>
        <div class="code-box" id="codeBox">
loadstring(game:HttpGet("https://raw.githubusercontent.com/N60Script/N60/refs/heads/main/BestScriptN60Hub"))()
        </div>
        <div class="copy-row">
          <button id="copyBtn" class="btn-copy">نسخ الكود</button>
          <span id="copyStatus" class="small-muted"></span>
        </div>
        <footer>تم الإنشاء بواسطة N60 Loader</footer>
      </div>
    </div>
  </div>

  <script>
    (function(){
      // عناصر DOM
      const startBtn = document.getElementById('startBtn');
      const startScreen = document.getElementById('startScreen');
      const loaderScreen = document.getElementById('loaderScreen');
      const finalScreen = document.getElementById('finalScreen');
      const progressBar = document.getElementById('progressBar');
      const progressText = document.getElementById('progressText');
      const copyBtn = document.getElementById('copyBtn');
      const codeBox = document.getElementById('codeBox');
      const copyStatus = document.getElementById('copyStatus');

      // إعداد البداية
      let value = 1;
      const step = 5; // حسب طلبك: يزيد/ينقص 5 كل ثانية. اخترت زيادة 5 كل ثانية للوصول من 1 الى 100.
      let intervalId = null;

      function show(el){
        // إظهار عنصر وإخفاء الباقي تبعًا للـ id
        startScreen.style.display = 'none';
        loaderScreen.style.display = 'none';
        finalScreen.style.display = 'none';
        el.style.display = (el === loaderScreen) ? 'flex' : 'block';
        el.setAttribute('aria-hidden','false');
      }

      startBtn.addEventListener('click', function(){
        // إخفاء الشاشة الأولى وإظهار شاشة اللود
        show(loaderScreen);

        // إعادة تهيئة القيم
        value = 1;
        progressBar.style.width = value + '%';
        progressText.textContent = value + ' / 100';
        loaderScreen.querySelector('[role="progressbar"]').setAttribute('aria-valuenow', value);

        // بدء الزيادة كل ثانية بمقدار step
        if(intervalId) clearInterval(intervalId);
        intervalId = setInterval(function(){
          value += step;
          if (value > 100) value = 100;
          progressBar.style.width = value + '%';
          progressText.textContent = value + ' / 100';
          loaderScreen.querySelector('[role="progressbar"]').setAttribute('aria-valuenow', value);

          // عندما يصل 100 أوقف المؤقت وانتقل للشاشة النهائية بعد فاصل قصير
          if(value >= 100){
            clearInterval(intervalId);
            intervalId = null;
            // تأثير صغير قبل العرض النهائي
            setTimeout(function(){
              loaderScreen.style.display = 'none';
              finalScreen.style.display = 'block';
              finalScreen.setAttribute('aria-hidden','false');
            }, 700);
          }
        }, 1000); // كل ثانية
      });

      // وظيفة النسخ للحافظة
      copyBtn.addEventListener('click', function(){
        const text = codeBox.textContent.trim();
        // استخدام API النسخ الحديثة، مع fallback
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(text).then(function(){
            copyStatus.textContent = 'تم النسخ';
            setTimeout(()=> copyStatus.textContent = '', 2000);
          }).catch(function(){
            fallbackCopy(text);
          });
        } else {
          fallbackCopy(text);
        }
      });

      function fallbackCopy(text){
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          copyStatus.textContent = 'تم النسخ';
          setTimeout(()=> copyStatus.textContent = '', 2000);
        } catch(e){
          copyStatus.textContent = 'فشل النسخ';
          setTimeout(()=> copyStatus.textContent = '', 2000);
        }
      }

      // منع تحديد النص غير الضروري على الشاشة الأولى (لمظهر أنيق)
      startBtn.onfocus = ()=> startBtn.blur();
    })();
  </script>
</body>
</html>
