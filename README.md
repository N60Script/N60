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
    font-family:Arial,sans-serif;
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
}
.logo{width:100%;margin-bottom:15px;}
.box{
    background:#111;
    border:1px solid #222;
    border-radius:8px;
    padding:10px;
    margin-bottom:10px;
}
.title{color:#ccc;font-size:14px;}
textarea{
    width:100%;
    height:120px;
    background:#000;
    color:#0f0;
    border:none;
    padding:8px;
    resize:none;
    font-family:monospace;
}
.click{
    text-align:center;
    color:#aaa;
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
    cursor:pointer;
}
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
    const raw = this.value.trim();
    if(!raw){
        output.value="";
        return;
    }

    const b64 = toBase64(raw);

    const finalCode =
header +
"loadstring((syn and syn.crypt or crypt).base64.decode([[\\n" +
b64 +
"\\n]]))()";

    output.value = finalCode;
});

function copyCode(){
    output.select();
    document.execCommand("copy");
}
</script>

</body>
</html>
