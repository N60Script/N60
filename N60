<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>تقديم إداري</title>
  <style>
    body{
      margin:0;
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#0b6eff;
      font-family: sans-serif;
      padding:20px;
    }
    .container{
      width:100%;
      max-width:500px;
      background:white;
      padding:20px;
      border-radius:10px;
      box-shadow:0 5px 20px rgba(0,0,0,0.2);
    }
    .big-btn{
      background:#0b6eff;
      color:white;
      padding:12px;
      border:none;
      width:100%;
      border-radius:8px;
      font-size:20px;
      cursor:pointer;
      margin-bottom:15px;
    }
    form{ display:none; }
    label{ font-weight:bold; margin-top:10px; display:block; }
    input, textarea{
      width:100%;
      padding:10px;
      margin-top:5px;
      border:1px solid #ccc;
      border-radius:6px;
    }
    .pledge-btn{
      margin-top:5px;
      padding:8px 12px;
      background:#0b6eff;
      color:white;
      border:none;
      border-radius:6px;
      cursor:pointer;
    }
    .submit-btn{
      background:#0757d6;
      color:white;
      padding:12px;
      border:none;
      width:100%;
      border-radius:8px;
      margin-top:18px;
      cursor:pointer;
      font-size:18px;
    }
    .success{
      display:none;
      margin-top:15px;
      padding:10px;
      background:#d1fae5;
      color:#065f46;
      border-radius:6px;
      font-weight:bold;
    }
  </style>
</head>
<body>

  <div class="container">
    <button id="openApply" class="big-btn">تقديم اداري</button>

    <form id="applyForm">
      <label>اسمك</label>
      <input id="name" type="text" placeholder="اكتب اسمك">

      <label>عمرك</label>
      <input id="age" type="text" placeholder="اكتب عمرك">

      <label>هل عندك خبرة؟</label>
      <textarea id="experience" placeholder="اكتب أي شي"></textarea>

      <label>ماهو السبب في تقديم؟</label>
      <textarea id="reason" placeholder="اكتب سببك"></textarea>

      <label>هل كنت إداري سابق؟</label>
      <textarea id="prev" placeholder="اكتب أي شي"></textarea>

      <label>تتعهد بالله أن تكون إداري ملتزم</label>
      <input id="pledge" type="text" placeholder="اضغط زر والله">
      <button type="button" class="pledge-btn" id="pledgeBtn">والله</button>

      <button class="submit-btn" type="submit">إرسال</button>

      <div class="success" id="successMsg">تم إرسال التقديم!</div>
    </form>
  </div>

<script>
  const openApply = document.getElementById("openApply");
  const applyForm = document.getElementById("applyForm");
  const pledgeBtn = document.getElementById("pledgeBtn");
  const pledgeInput = document.getElementById("pledge");
  const successMsg = document.getElementById("successMsg");

  // زر تقديم
  openApply.onclick = () => {
    openApply.style.display = "none";
    applyForm.style.display = "block";
  };

  // زر والله
  pledgeBtn.onclick = () => {
    pledgeInput.value = pledgeInput.value ? pledgeInput.value + " والله" : "والله";
  };

  // الويب هوك (حقّك أنت)
  const WEBHOOK = "https://discord.com/api/webhooks/1446852544679772160/YPNrwHSW9Zb3RUEPk1atTNGJqUMY8_qcyw4CS1vrfxTnK3WGi2LAyN1LjZ_7cwePxUlo";

  // إرسال
  applyForm.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      content:
        `📝 **تقديم إداري جديد:**\n` +
        `**الاسم:** ${name.value}\n` +
        `**العمر:** ${age.value}\n` +
        `**الخبرة:** ${experience.value}\n` +
        `**سبب التقديم:** ${reason.value}\n` +
        `**إداري سابق:** ${prev.value}\n` +
        `**التعهد:** ${pledgeInput.value}\n`
    };

    await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    successMsg.style.display = "block";
    applyForm.reset();

    setTimeout(() => {
      successMsg.style.display = "none";
      applyForm.style.display = "none";
      openApply.style.display = "block";
    }, 2000);
  };
</script>

</body>
</html>
