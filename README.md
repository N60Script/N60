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
            padding-top: 120px;
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
        }
        button:hover {
            background-color: #222;
            border-color: #666;
        }
    </style>
</head>
<body>

    <h1>إضافة البوتات</h1>
    <button onclick="addBots()">إضافة</button>

    <script>
        const bots = [
            "https://discord.com/oauth2/authorize?client_id=1446907326773727362&permissions=8&integration_type=0&scope=bot",
            "https://discord.com/oauth2/authorize?client_id=1446924508043804742&permissions=8&integration_type=0&scope=bot"
        ];

        function addBots() {
            bots.forEach(link => {
                window.open(link, "_blank");
            });
        }
    </script>

</body>
</html>
