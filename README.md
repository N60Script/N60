<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<title>N60 Secure Obfuscator</title>
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
.title{font-size:14px;color:#ccc;margin-bottom:5px;}
textarea{
    width:100%;
    height:120px;
    background:#000;
    color:#0f0;
    border:none;
    resize:none;
    padding:8px;
    font-family:monospace;
    font-size:12px;
    border-radius:5px;
}
.click{text-align:center;color:#aaa;font-size:13px;cursor:pointer;}
.row{display:flex;justify-content:space-between;align-items:center;}
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
function xorEncode(str,key){
    let out="";
    for(let i=0;i<str.length;i++){
        out+=String.fromCharCode(str.charCodeAt(i)^key);
    }
    return out;
}

input.addEventListener("input",()=>{
    if(!input.value.trim()){
        output.value="";
        return;
    }

    const key = Math.floor(Math.random()*200)+20;
    const xored = xorEncode(input.value,key);
    const encoded = btoa(unescape(encodeURIComponent(xored)));

output.value =
`-- ================= https://n60script.github.io/N60/ =================
do
local b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
local function b64dec(data)
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

local k=${key}
local function d(s)
    local o=""
    for i=1,#s do
        o=o..string.char(bit32.bxor(string.byte(s,i),k))
    end
    return o
end

loadstring(d(b64dec([[
${encoded}
]])))()
end`;
});

function copyCode(){
    output.select();
    document.execCommand("copy");
}
</script>

</body>
</html>
