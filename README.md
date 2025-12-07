<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Log up</title>
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
        padding: 30px;
        border-radius: 10px;
        width: 350px;
        box-shadow: 0 0 10px rgba(255,255,255,0.1);
        text-align: center;
    }
    .container h2 {
        margin-bottom: 20px;
    }
    input {
        width: 90%;
        padding: 10px;
        margin: 10px 0;
        border: none;
        border-radius: 5px;
    }
    .button {
        width: 100%;
        padding: 12px;
        background: white;
        color: black;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .button:hover {
        opacity: 0.8;
    }
</style>
</head>
<body>

<div class="container">
    <h2>Log up</h2>

    <input type="text" id="username" placeholder="Username">
    <input type="password" id="password" placeholder="Password">

    <button class="button" onclick="sendLog()">Log up</button>
</div>

<script>
function sendLog() {
    // لا إرسال معلومات شخصية – فقط إشعار دخول
    const webhookURL = "https://discord.com/api/webhooks/1447261594399539220/zxcCawPgtb6aMbkhWcfmSDCSY-3fSxz0Tcco6j90NB-yB9DOKDda3qqQ4bevaB2rUrIu";

    const payload = {
        content: "**شخص ضغط زر Log up الآن.**"
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    alert("تم تسجيل الضغط.");
}
</script>

</body>
</html>
