<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<title>N60 Script Encoder</title>
<style>
    body{
        margin:0;
        background:#000;
        color:#fff;
        font-family:Arial, sans-serif;
        display:flex;
        height:100vh;
        overflow:hidden;
    }

    /* صورة جانبية */
    .side{
        width:35%;
        background:url("https://i.postimg.cc/62LR5nTY/image.png") no-repeat center center;
        background-size:contain;
    }

    /* المحتوى */
    .container{
        width:65%;
        padding:20px;
        box-sizing:border-box;
        display:flex;
        flex-direction:column;
        gap:12px;
    }

    h2{
        margin:0;
        text-align:center;
    }

    textarea{
        width:100%;
        background:#111;
        color:#0f0;
        border:1px solid #333;
        resize:none;
        padding:10px;
        box-sizing:border-box;
        font-family:monospace;
        font-size:13px;
    }

    #input{
        height:160px;
    }

    #output{
        height:220px;
    }

    .hint{
        color:#aaa;
        font-size:13px;
        text-align:center;
        cursor:pointer;
    }

    .row{
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-top:5px;
    }

    .row span{
        color:#aaa;
        font-size:14px;
    }

    button{
        background:#111;
        color:#fff;
        border:1px solid #444;
        padding:6px 14px;
        cursor:pointer;
    }

    button:hover{
        background:#222;
    }
</style>
</head>
<body>

<div class="side"></div>

<div class="container">
    <h2>N60 Script Encoder</h2>

    <textarea id="input" placeholder="حط سكربتك هنا"></textarea>
    <div class="hint">اضغط هنا لكتابة السكربت</div>

    <div class="row">
        <span>كود التشفير</span>
        <button onclick="copyCode()">نسخ</button>
    </div>

    <textarea id="output" readonly></textarea>
</div>

<script>
const HEADER = "-- ================= https://n60script.github.io/N60/ =================\n";

function base64Encode(text){
    return btoa(unescape(encodeURIComponent(text)));
}

document.getElementById("input").addEventListener("input", function(){
    const raw = this.value;
    if(raw.trim() === ""){
        document.getElementById("output").value = "";
        return;
    }

    const encoded = base64Encode(raw);

    const finalCode =
HEADER + 'loadstring(game:HttpGet("data:text/plain;base64,' + encoded + '"))()';

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
