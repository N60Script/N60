<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<title>N60 Script Obfuscator</title>
<style>
body{
    margin:0;
    background:#000;
    color:#fff;
    font-family:Arial, sans-serif;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
}
.container{
    width:360px;
    background:#0b0b0b;
    border-radius:10px;
    padding:15px;
    box-shadow:0 0 20px #000;
}
.logo{
    width:100%;
    display:block;
    margin-bottom:15px;
}
.box{
    background:#111;
    border:1px solid #222;
    border-radius:8px;
    padding:10px;
    margin-bottom:10px;
}
.title{
    font-size:14px;
    margin-bottom:5px;
    color:#ccc;
}
textarea{
    width:100%;
    height:120px;
    background:#000;
    color:#0f0;
    border:none;
    resize:none;
    padding:8px;
    outline:none;
    font-family:monospace;
    font-size:12px;
    border-radius:5px;
}
.click{
    text-align:center;
    color:#aaa;
    font-size:13px;
    cursor:pointer;
    margin-bottom:5px;
}
.row{
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.copy{
    background:#1a1a1a;
    color:#fff;
    border:none;
    padding:5px 12px;
    border-radius:5px;
    cursor:pointer;
}
.copy:hover{ background:#333; }
</style>
</head>

<body>
<div class="container">

<img src="https://i.postimg.cc/62LR5nTY/image.png" class="logo">

<div class="box">
    <div class="title">حط سكربتك هنا</div>
    <div class="click" onclick="input.focus()">اضغط هنا لكتابة السكربت</div>
    <textarea id="input"></textarea>
</div>

<div class="box">
    <div class="row">
        <div class="title">كود التشفير</div>
        <button class="copy" onclick="copyCode()">نسخ</button>
    </div>
    <textarea id="output" readonly></textarea>
</div>

</div>

<script>
const header =
"-- ================= https://n60script.github.io/N60/ =================\n";

function toBase64(str){
    return btoa(unescape(encodeURIComponent(str)));
}

document.getElementById("input").addEventListener("input", function(){
    const raw = this.value;
    if(!raw.trim()){
        document.getElementById("output").value = "";
        return;
    }

    const encoded = toBase64(raw);

    const finalCode =
        header +
        'loadstring(game:HttpGet("data:text/plain;base64,' +
        encoded +
        '"))()';

    document.getElementById("output").value = finalCode;
});

function copyCode(){
    const out = document.getElementById("output");
    out.select();
    document.execCommand("copy");
}
</script>

</body>
</html>
