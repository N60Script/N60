<script>
  const openApply = document.getElementById("openApply");
  const applyForm = document.getElementById("applyForm");
  const pledgeBtn = document.getElementById("pledgeBtn");
  const pledgeInput = document.getElementById("pledge");
  const successMsg = document.getElementById("successMsg");

  const WEBHOOK = "https://discord.com/api/webhooks/1446852544679772160/YPNrwHSW9Zb3RUEPk1atTNGJqUMY8_qcyw4CS1vrfxTnK3WGi2LAyN1LjZ_7cwePxUlo";

  openApply.onclick = () => {
    openApply.style.display = "none";
    applyForm.style.display = "block";
  };

  pledgeBtn.onclick = () => {
    pledgeInput.value = pledgeInput.value ? pledgeInput.value + " والله" : "والله";
  };

  // مدة الكولداون بالميلي ثانية (24 ساعة)
  const COOLDOWN = 24 * 60 * 60 * 1000;

  // التشييك قبل الإرسال
  applyForm.onsubmit = async (e) => {
    e.preventDefault();

    // نجيب وقت آخر إرسال من LocalStorage
    const lastSent = localStorage.getItem("lastSubmitTime");
    const now = Date.now();

    if (lastSent && now - lastSent < COOLDOWN) {
      const remaining = Math.ceil((COOLDOWN - (now - lastSent)) / (60*60*1000));
      alert(`لقد أرسلت التقديم مسبقاً! حاول مرة أخرى بعد ${remaining} ساعة.`);
      return;
    }

    // حفظ الوقت الحالي
    localStorage.setItem("lastSubmitTime", now);

    const data = {
      content:
        `📝 **تقديم إداري جديد:**\n` +
        `**الاسم:** ${name.value}\n` +
        `**يوزر الديسكورد:** ${discordUser.value}\n` +
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
