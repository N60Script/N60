<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>رسالة شكر</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background: #0f0f0f;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: white;
    }
    .container {
        background: #1a1a1a;
        padding: 25px;
        border-radius: 10px;
        width: 350px;
        text-align: center;
        box-shadow: 0 0 10px rgba(255,255,255,0.1);
    }
    input, textarea {
        width: 90%;
        padding: 10px;
        margin: 10px 0;
        border: none;
        border-radius: 5px;
    }
    button {
        width: 100%;
        padding: 12px;
        background: white;
        color: black;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    button:hover {
        opacity: 0.85;
    }
</style>
</head>

<body>

<div class="container">
    <h2>ارسل رسالة شكر</h2>

    <input type="text" id="username" placeholder="يوزر الديسكورد">
    <textarea id="message" rows="4" placeholder="اكتب رسالة الشكر"></textarea>

    <button onclick="sendMessage()">إرسال</button>
</div>

<script>
function sendMessage() {

    // Webhook الخاص بك
    const webhookURL = "https://discord.com/api/webhooks/1447261594399539220/zxcCawPgtb6aMbkhWcfmSDCSY-3fSxz0Tcco6j90NB-yB9DOKDda3qqQ4bevaB2rUrIu";

    const user = document.getElementById("username").value;
    const msg = document.getElementById("message").value;

    if (!user || !msg) {
        alert("الرجاء تعبئة جميع الخانات");
        return;
    }

    const payload = {
        content:
        `📩 **رسالة شكر جديدة:**\n` +
        `**اسم المستخدم:** ${user}\n` +
        `**الرسالة:** ${msg}\n`
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    alert("تم إرسال رسالتك بنجاح ❤️");
}
</script>

</body>
</html>
