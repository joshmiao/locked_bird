function about(){window.location.replace("./html/index_menu/about.html");}//关于我们

function savepage(){
    if(sessionStorage.locked_bird_loginstate==0)
    alert("请先登录您的账号");
    else showsave("load");
}//读取存档

function log(){
    if(sessionStorage.locked_bird_loginstate==0)
    window.location.replace("html/index_menu/login.html");
    else {logout();Init();}
}//登录/登出

function newgame(){
    if(sessionStorage.locked_bird_loginstate==0)
    alert("请先登录再开始游戏");
    else window.location.replace("html/DAY1/D1_background.html");
}//新游戏

function continuegame()
{
    if(sessionStorage.locked_bird_loginstate==0)
    alert("请先登录再开始游戏");
    else{
        var account=sessionStorage.getItem("locked_bird_account");
        var autosavename="locked_bird_"+account+"autosave";
        if(localStorage.getItem(autosavename)==null)
        alert("还没有游戏记录！");
        else if(confirm("确定要继续上次的游戏吗？")==true)
        {
            var gamestate=localStorage.getItem(autosavename);
            if(sessionStorage.getItem("locked_bird_gamestate")==null)
            sessionStorage.setItem("locked_bird_gamestate",gamestate);
            else
            {
                sessionStorage.removeItem("locked_bird_gamestate");
                sessionStorage.setItem("locked_bird_gamestate",gamestate);
            }
            var arr=gamestate.split(",");
            var position=arr[4];
            window.location.replace(position);
        }
    }
}//继续游戏

function achievements()
{
    if(sessionStorage.locked_bird_loginstate==0)
    alert("请先登录您的账号");
    else window.location.replace("html/index_menu/achievements.html");
}//成就

function develop_pattern()
{    
    var num=localStorage.getItem("locked_bird_usernum");
    var f=1,username="locked_bird_developer";
    for(var i=0;i<num;i++)
    {
        var prename=localStorage.getItem("locked_bird_username"+i);
        if(username==prename){f=0;break;}
    }
    if(f)
    {
        localStorage.setItem("locked_bird_username"+localStorage.locked_bird_usernum,username);
        localStorage.setItem("locked_bird_userpassword"+localStorage.locked_bird_usernum,username);
        localStorage.locked_bird_usernum++;
    }
    if(sessionStorage.getItem("locked_bird_account")==null)
    sessionStorage.setItem("locked_bird_account","locked_bird_developer");
    else
    {
        sessionStorage.removeItem("locked_bird_account");
        sessionStorage.setItem("locked_bird_account","locked_bird_developer");
    }
    sessionStorage.locked_bird_loginstate=1;
}//开发者模式，强制登录账号developer

function Init(){
    if(localStorage.getItem("locked_bird_usernum")==null)localStorage.setItem("locked_bird_usernum",0);
    if(sessionStorage.getItem("locked_bird_loginstate")==null)sessionStorage.setItem("locked_bird_loginstate",0);
    //develop_pattern();//开发者模式,默认登录账号developer
    if(sessionStorage.getItem("locked_bird_loginstate")==1)
    {
        document.getElementById("log").value="登出";
        document.getElementById("account").innerHTML="您好, "+sessionStorage.getItem("locked_bird_account")+"!";
        document.body.style.backgroundImage='url(image/login_index.jpg)';
    }
    else 
    {
        document.getElementById("account").innerHTML="未登录";
        document.getElementById("log").value="登录";
        document.body.style.backgroundImage='url(image/index.png)';
    }

    if(sessionStorage.getItem("locked_bird_gamestate")==null)
    sessionStorage.setItem("locked_bird_gamestate","000000000000000000000000000000000000000000000000,0,0,0,0,0,0");
    else
    {
        sessionStorage.removeItem("locked_bird_gamestate");
        sessionStorage.setItem("locked_bird_gamestate","000000000000000000000000000000000000000000000000,0,0,0,0,0,0");
    }
    var arr=sessionStorage.getItem("locked_bird_gamestate").split(",");
    var gamestate="";
    for(var i=0;i<4;i++)gamestate+=arr[i]+",";
    gamestate+=location.href+","+document.title+","+"0";
    sessionStorage.removeItem("locked_bird_gamestate");
    sessionStorage.setItem("locked_bird_gamestate",gamestate);
}

window.addEventListener('storage',(e)=>{sessionStorage.setItem(e.key,e.oldValue)})
window.addEventListener('storage',(e)=>{localStorage.setItem(e.key,e.oldValue)})
//防止用户私自更改信息