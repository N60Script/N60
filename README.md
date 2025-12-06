<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>إضافة البوتات</title>
    <style>
        body {
            background-color: #000;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            padding-top: 100px;
        }
        button {
            background-color: #111;
            color: white;
            padding: 15px 40px;
            border: 2px solid #444;
            border-radius: 8px;
            font-size: 22px;
            cursor: pointer;
            transition: 0.2s;
            margin-top: 20px;
        }
        button:hover {
            background-color: #222;
            border-color: #666;
        }
    </style>
</head>
<body>

    <h1>إضافة البوتات</h1>

    <!-- الزر الرئيسي -->
    <button onclick="addBots()">إضافة</button>

    <!-- زر إضافة بوت 2 -->
    <button onclick="addBot2()">إضافة بوت 2</button>

    <script>
        // روابط البوتات
        const bot1 = "https://discord.com/oauth2/authorize?client_id=1446907326773727362&permissions=8&integration_type=0&scope=bot";
        const bot2 = "https://discord.com/oauth2/authorize?client_id=1446924508043804742&permissions=8&integration_type=0&scope=bot";

        // يفتح البوتين معاً
        function addBots() {
            window.open(bot1, "_blank");
            window.open(bot2, "_blank");
        }

        // يفتح فقط البوت الثاني
        function addBot2() {
            window.open(bot2, "_blank");
        }
    </script>

</body>
</html>
