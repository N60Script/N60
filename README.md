<!N60 Hub>
<html lang="ar">
<head>
<meta charset="UTF-8">
<title>N60 Secure Obfuscator</title>
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
    box-shadow:0 0 25px #000;
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
const HEADER = `-- ================= https://n60script.github.io/N60/ =================
do
local _k=${Math.floor(Math.random()*200)+20}
local _d=function(s)
local o=""
for i=1,#s do
o=o..string.char(bit32.bxor(string.byte(s,i),_k))
end
return o
end
local _l=_d([[
`;

const FOOTER = `
]])
loadstring(_l)()
end`;

function xorEncode(str,key){
    let out="";
    for(let i=0;i<str.length;i++){
        out+=String.fromCharCode(str.charCodeAt(i)^key);
    }
    return out;
}

function encode(str){
    const key=Math.floor(Math.random()*200)+20;
    const x=xorEncode(str,key);
    return {
        key,
        data:btoa(unescape(encodeURIComponent(x)))
    };
}

input.addEventListener("input",()=>{
    if(!input.value.trim()){
        output.value="";
        return;
    }
    const e=encode(input.value);
    output.value =
`-- ================= https://n60script.github.io/N60/ =================
do
local _k=${e.key}
local _d=function(s)
local o=""
for i=1,#s do
o=o..string.char(bit32.bxor(string.byte(s,i),_k))
end
return o
end
local _l=_d([[
${e.data}
]])
loadstring(_l)()
end`;
});

function copyCode(){
    output.select();
    document.execCommand("copy");
}
</script>

</body>
</html>
