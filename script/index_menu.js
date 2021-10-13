function Init(){
    if(localStorage.getItem("locked_bird_usernum")==null)localStorage.setItem("locked_bird_usernum",0);
    if(sessionStorage.getItem("locked_bird_loginstate"==null))sessionStorage.setItem("locked_bird_loginstate",0);
}//进入首页时初始化状态

function backregister(){window.location.replace("register.html");}
function backlogin(){window.location.replace("login.html");}
function backindex(){window.location.replace("../../index.html");}
function backforget(){window.location.replace("forgetpassword.html");}
//去往各项功能界面

function register()
{
    var num=localStorage.getItem("locked_bird_usernum");
    var inputname=document.getElementById("name").value;
    var inputpassword=document.getElementById("password").value;
    var confirmpassword=document.getElementById("confirmpassword").value;
    var validation=document.getElementById("validation").value;
    if(inputname=="")
    {
        alert("请输入您的用户名");
        return;
    }
    if(inputname.length>12)
    {
        alert("您的名字太长啦!(请不要超过12个字符)");
        $("#name").val("");
        return;
    }
    if(validation=="")
    {
        alert("请输入您的QQ帐号");
        return;
    }
    if(inputpassword=="")
    {
        alert("请输入您的密码");
        return;
    }
    if(confirmpassword=="")
    {
        alert("请确认您的密码");
        return;
    }
    for(var i=0;i<num;i++)
    {
        var prename=localStorage.getItem("locked_bird_username"+i);
        if(inputname==prename){
            alert("此用户名已被注册，请重新输入");
            $("#name").val("");
            return;
        }
    }
    if(inputpassword.length<6)
    {
        alert("您的密码长度应至少六位，请重新输入");
        $("#password").val("");
        $("#confirmpassword").val("");
        return;
    }
    if(inputpassword!=confirmpassword)
    {
        alert("两次密码不一样！");
        $("#confirmpassword").val("");
        return;
    }
    localStorage.setItem("locked_bird_username"+localStorage.locked_bird_usernum,inputname);
    localStorage.setItem("locked_bird_userpassword"+localStorage.locked_bird_usernum,inputpassword);
    localStorage.setItem("locked_bird_uservalidation"+localStorage.locked_bird_usernum,validation);
    localStorage.locked_bird_usernum++;
    alert("注册成功，即将返回登录页面");
    setTimeout("backlogin()",1000);
}//注册功能

function login()
{
    if(sessionStorage.locked_bird_loginstate==1)
    {alert("您已经登录了，请先退出当前账号");return;}
    var inputname=document.getElementById("username").value;
    var inputpassword=document.getElementById("password").value;
    if(inputname=="")
    {
        alert("请输入您的用户名");
        return;
    }
    if(inputpassword=="")
    {
        alert("请输入您的密码");
        return;
    }
    var num=localStorage.getItem("locked_bird_usernum");
    for(var i=0;i<num;i++)
    {
        var prename=localStorage.getItem("locked_bird_username"+i);
        var prepassword=localStorage.getItem("locked_bird_userpassword"+i);
        if(inputname==prename){
            if(inputpassword==prepassword)
            {
                alert("登录成功，即将返回首页");
                sessionStorage.locked_bird_loginstate=1;
                sessionStorage.setItem("locked_bird_account",inputname);
                setTimeout("backindex()",1000);
            }
            else
            {
                alert("密码错误，请重新输入");
                $("#password").val("");
            }
            return;
        }
    }
    alert("该用户还未注册，请重新输入");
    $("#password").val("");
    $("#username").val("");
}//登录功能

function logout()
{
    if(sessionStorage.locked_bird_loginstate==0)
    {alert("请先登录账号");return;}
    if(confirm("您确定要退出账号吗?")==true)
    {
        sessionStorage.locked_bird_loginstate=0;
        sessionStorage.removeItem("locked_bird_account");
    }
}//登出功能

function findpasswordback()
{
    var inputname=document.getElementById("name").value;
    var validation=document.getElementById("validation").value;
    if(inputname=="")
    {
        alert("请输入您的用户名");
        return;
    }
    if(validation=="")
    {
        alert("请输入您的QQ帐号");
        return;
    }
    if(localStorage.getItem("locked_bird_usernum")==null)
    {
        alert("该用户还未注册！");
        return;
    }
    var num=localStorage.getItem("locked_bird_usernum");
    var f=1;
    for(var i=0;i<num;i++)
    if(inputname==localStorage.getItem("locked_bird_username"+i))
    {
        f=0;
        var prevalidation=localStorage.getItem("locked_bird_uservalidation"+i);
        if(validation!=prevalidation)
        {
            alert("验证信息错误！");
            $("#validation").val("");
        }
        else
        alert("您的密码是："+localStorage.getItem("locked_bird_userpassword"+i));
        return;
    }
    if(f)
    {
        alert("该用户还未注册！");
        return;
    }
}//找回密码

function showachievements()
{
    var account=sessionStorage.getItem("locked_bird_account");
    var achievementid="locked_bird_"+account+"achievement";
    var text="";
    for(var i=1;i<=9;i++)//有九个成就
    {
        if(i==1)text="<<拼图大师>><br>拼图20s内通过<br>未完成<br>";
        if(i==2)text="<<我是砖家>><br>打砖块通过第三关<br>未完成<br>";
        if(i==3)text="<<不务正业>><br>no game no life<br>未完成<br>";
        if(i==4)text="<<违背规则之例>><br>bad-ending-1<br>未完成<br>";
        if(i==5)text="<<实验室有鬼?>><br>bad-ending-2<br>未完成<br>";
        if(i==6)text="<<艰难的调查旅途>><br>bad-ending-3<br>未完成<br>";
        if(i==7)text="<<永眠>><br>bad-ending-4<br>未完成<br>";
        if(i==8)text="<<出色的调查员>><br>happy-ending<br>未完成<br>";
        if(i==9)text="<<群星闪耀之际>><br>true-ending<br>未完成<br>";
        if(localStorage.getItem(achievementid+i)==null)
        localStorage.setItem(achievementid+i,false);
        if(localStorage.getItem(achievementid+i)=="true")
        {
            text=text.replace('未','已');
            document.getElementById("achievement"+i).style.color="black";
            document.getElementById("achievement"+i).style.background="url(../../image/award.png) center no-repeat";
            //document.getElementById("achievement"+i).style.backgroundColor='rgba(252, 205, 0,0.7)';
            document.getElementById("achievement"+i).style.backgroundColor='rgba(241,208,146,0.7)';
            text+=localStorage.getItem(achievementid+i+"time");
        }
        else
        {
            text+="-------------";
        }
        document.getElementById("achievement"+i).innerHTML=text;
    }
}//显示成就页面信息

window.addEventListener('storage',(e)=>{sessionStorage.setItem(e.key,e.oldValue)})
window.addEventListener('storage',(e)=>{localStorage.setItem(e.key,e.oldValue)})
//防止用户私自更改信息

{
    window.alert=alert;
        function alert(data) {
            var a = document.createElement("div"),
                p = document.createElement("p"),
                btn = document.createElement("div"),
                textNode = document.createTextNode("提示:\n"+(data ? data : "")),
                btnText = document.createTextNode("确定");
            // 控制样式
            css(a, {
                "position" : "absolute",
                "left" : "0",
                "right" : "0",
                "top" : "20%",
                "width" : "300px",
                "height" : "200px",
                "margin" : "auto",
                "padding":"25px",
                "background-color" : "rgba(231, 231, 231, 0.874)",
                "border-style": "solid",
                "border-width": "5px",
                "border-color": "rgb(37, 37, 37)",
                "border-radius": "30px",
                "color":"black",
                "font" : "30px HYShangWeiShouShuW-Regular",
                "text-align" : "center",
            });
            css(btn, {
                "position":"absolute",
                "bottom":"10px",
                "width" : "100px",
                "height" : "50px",
                "left":"35%",
                "margin":"10px",
                "background" : "rgba(77, 75, 75, 0.5)",
                "border-radius": "20px",
                "color":"black",
            });
            // 内部结构套入
            p.appendChild(textNode);
            btn.appendChild(btnText);
            a.appendChild(p);
            a.appendChild(btn);
            // 整体显示到页面内
            document.getElementsByTagName("body")[0].appendChild(a);
            btn.onmouseenter=function(){
                css(btn,{
                            "background" : "rgba(231, 157, 18, 0.459)",
                            "transition-duration":"0.3s",
                            "cursor":"pointer"
                });
            }
            btn.onmouseleave=function(){
                css(btn,{"background" : "rgba(77, 75, 75, 0.5)"});
            }
            btn.onclick = function() {
                a.parentNode.removeChild(a);
            }
        }
        function css(targetObj, cssObj) {
            var str = targetObj.getAttribute("style") ? targetObj.getAttribute("style") : "";
            for(var i in cssObj) {
                str += i + ":" + cssObj[i] + ";";
            }
            targetObj.style.cssText = str;
        }
}