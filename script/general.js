//gamestate形式："visited","cluezhi","cluechu","cluelv","position","title","time"；
function saveback()
{
    var position=(sessionStorage.getItem("locked_bird_gamestate").split(","))[4];
    sessionStorage.removeItem("locked_bird_showsave");
    window.location.replace(position);
}//savepage页面返回上一页面

function backindex(){window.location.replace('../../index.html');}
//返回首页

function checklogin()
{
    if(sessionStorage.getItem("locked_bird_loginstate")==null)
    {
        alert("您还没登录！(即将回到首页)");
        setTimeout("backindex()",1000);
        return 0;
    }
    else if(sessionStorage.locked_bird_loginstate==0)
    {
        alert("您还没登录！(即将回到首页)");
        setTimeout("backindex()",1000);
        return 0;
    }
    return 1;
}//检查游戏登录状态

function autosave()
{
    var account=sessionStorage.getItem("locked_bird_account");
    var gamestate=sessionStorage.getItem("locked_bird_gamestate");
    var arr=gamestate.split(",");
    gamestate="";
    for(var i=0;i<=3;i++)gamestate+=arr[i]+",";
    gamestate+=(location.href)+","+document.title+",";
    var d=new Date();
    gamestate+=d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    sessionStorage.removeItem("locked_bird_gamestate");
    sessionStorage.setItem("locked_bird_gamestate",gamestate);
    var autosavename="locked_bird_"+account+"autosave";
    if(localStorage.getItem(autosavename)==null)
    localStorage.setItem(autosavename,gamestate);
    else
    {
        localStorage.removeItem(autosavename);
        localStorage.setItem(autosavename,gamestate);
    }
}//自动存档功能

function showsavedata()
{
    var account=sessionStorage.getItem("locked_bird_account"); 
    for(var i=1;i<=4;i++)
    {
        var savename="locked_bird_"+account+"save"+i;
        var text="存档"+i+" ";
        if(localStorage.getItem(savename)==null)
        text+="此处无存档";
        else
        {
            var savedata=localStorage.getItem(savename);
            var data=savedata.split(',');
            var place=data[5],time=data[6];//title和time
            text+=place+" "+time;
        }
        var saveid="save"+i;
        document.getElementById(saveid).innerHTML=text;//设置9个存档按钮，每个按钮显示该存档点信息
    }
}//savepage页面显示每个存档信息

function showsave(operation)//表示操作类型
{
    sessionStorage.setItem("locked_bird_showsave",operation);
    //离开savepage页面时再清空这个值
    if(document.title=="《Locked Bird》")
    window.location.replace("html/index_menu/savepage.html");
    else window.location.replace("../index_menu/savepage.html");
}//进入savepage页面时进行load或save操作
//showsave时存下了operation，在savepage页面根据operation进行save或load操作

function save(saveid)
{
    var gamestate=sessionStorage.getItem("locked_bird_gamestate");
    var account=sessionStorage.getItem("locked_bird_account");
    var savename="locked_bird_"+account+"save"+saveid;
    if(localStorage.getItem(savename)==null)
    localStorage.setItem(savename,gamestate);
    else
    {
        if(confirm("您确定要覆盖存档吗？")==false)return;
        localStorage.removeItem(savename);
        localStorage.setItem(savename,gamestate);
    }
    alert("存档成功！");
    var data=gamestate.split(",");
    var title=data[5],time=data[6];
    var text="存档"+saveid+" "+title+" "+time;
    var saveid="save"+saveid;
    document.getElementById(saveid).innerHTML=text;
    showsavedata();
}//在某个存档位置存档

function load(saveid)
{
    var account=sessionStorage.getItem("locked_bird_account");
    var savename="locked_bird_"+account+"save"+saveid; 
    if(localStorage.getItem(savename)==null)
    {
        alert("此处没有存档！");
        return;
    }
    if(confirm("您确定要读取存档吗？")==false)return;
    var gamestate=localStorage.getItem(savename);
    var arr=gamestate.split(",");
    var position=arr[4];
    sessionStorage.removeItem("locked_bird_gamestate");
    sessionStorage.setItem("locked_bird_gamestate",gamestate);
    sessionStorage.removeItem("locked_bird_showsave");
    window.location.replace(position);
}//读取某个位置的存档

function sl(saveid)
{
    var operation=sessionStorage.getItem("locked_bird_showsave");
    if(operation=="save")save(saveid);
    if(operation=="load")load(saveid);
}//在某个位置的存档进行存档或读档

function addclue(cluetype,weight)
{
    if(weight==undefined)weight=1;
    var gamestate=sessionStorage.getItem("locked_bird_gamestate");
    var arr=gamestate.split(",");
    if(cluetype=="A")arr[1]=Number(arr[1])+weight;
    if(cluetype=="B")arr[2]=Number(arr[2])+weight;
    if(cluetype=="C")arr[3]=Number(arr[3])+weight;
    gamestate="";
    for(var i=0;i<6;i++)gamestate+=arr[i]+",";gamestate+=arr[6];
    sessionStorage.removeItem("locked_bird_gamestate");
    sessionStorage.setItem("locked_bird_gamestate",gamestate);
}

function getclue(cluetype)
{
    var gamestate=sessionStorage.getItem("locked_bird_gamestate");
    var arr=gamestate.split(",");
    if(cluetype=="A")return Number(arr[1]);
    else if(cluetype=="B")return Number(arr[2]);
    else if(cluetype=="C")return Number(arr[3]);
    else {alert("线索类型错啦！");return 0;}
}

function setvisited(x)
{
    if(x==null)x=1;
    var positionid=sessionStorage.getItem("locked_bird_nowposition");
    if(positionid==-1)return;
    var gamestate=sessionStorage.getItem("locked_bird_gamestate");//当前游戏状态
    var arr=gamestate.split(",");
    gamestate="";
    
    var pos=arr[0].split("");
    if (positionid==15){
        pos[positionid]=1;
    }else{
         if(x==1)
        {
            if(pos[positionid]<x)
            pos[positionid]=x;
        }
        else 
        {
            if(pos[positionid]==1||pos[positionid]==5)
            pos[positionid]=Number(pos[positionid])+1;
        }
    }
    arr[0]=pos.join("");
    for(var i=0;i<6;i++)gamestate+=arr[i]+",";
    gamestate+=arr[6];
    
    sessionStorage.removeItem("locked_bird_gamestate");
    sessionStorage.setItem("locked_bird_gamestate",gamestate);
}//更新visited

function hideoption(optionid,needclueA,needclueB,needclueC,otherid1,otherid2)
{
    var gamestate=sessionStorage.getItem("locked_bird_gamestate");//当前游戏状态
    var arr=gamestate.split(",");
    if(arr[1]<needclueA||arr[2]<needclueB||arr[3]<needclueC) $("#option"+optionid).remove();
    else
    {
        var poi=arr[0].split("");
        if(otherid1!=undefined)
        {
            if(poi[otherid1]>0)$("#option"+optionid).remove();
            else if(otherid2!=undefined)
            if(poi[otherid2]>0)$("#option"+optionid).remove();
        }
    }
}//隐藏选项

function Initial(positionid)
{
    history.back();
    if(checklogin()==0)return;
    if(sessionStorage.getItem("locked_bird_nowposition")!=null)
    sessionStorage.removeItem("locked_bird_nowposition");
    sessionStorage.setItem("locked_bird_nowposition",positionid);
    if(positionid!=-1)
    {
        var gamestate=sessionStorage.getItem("locked_bird_gamestate");
        var arr=gamestate.split(",");
        var poi=arr[0].split("");
        if(poi[positionid]==0)
        setvisited(1);
        else if(poi[positionid]==2||poi[positionid]==6)
        {
            $("#selection-set").fadeIn(1500);
            click=999;
            document.getElementById("text1").innerHTML="你回到了"+document.title;
        }
    }
    autosave();
}//所有游戏内页面初始化

function mapback()
{
    var position=(sessionStorage.getItem("locked_bird_gamestate").split(","))[4];
    window.location.replace(position);
}

function showmapdata()
{  
    var positionid=sessionStorage.getItem("locked_bird_nowposition");
    var text="";
    if(positionid<=12)
    {
        document.getElementById("title").innerHTML="第一天地图";
        if(positionid<=2)
        text+='<img src="../../image/map/question-mark.png" height="200px" width="200px">';
        else if(positionid<=5)
        text+='<img src="../../image/map/DAY1/business-area_located.PNG" height="200px" width="200px">';
        else text+='<img src="../../image/map/DAY1/business-area.PNG" height="200px" width="200px">';
        text+='<img src="../../image/map/arrow.PNG" height="200px" width="200px">';
        
        if(positionid<=5)
        text+='<img src="../../image/map/question-mark.png" height="200px" width="200px">';
        else if(positionid<=9)
        text+='<img src="../../image/map/DAY1/industrial-area_located.PNG" height="200px" width="200px">';
        else text+='<img src="../../image/map/DAY1/industrial-area.PNG" height="200px" width="200px">';
    }
    else if(positionid<=22)
    {
        document.getElementById("title").innerHTML="第二天地图";
        if(positionid<=15)
        text+='<img src="../../image/map/DAY2/residence-community1_located.PNG" height="200px" width="200px">';
        else text+='<img src="../../image/map/DAY2/residence-community1.PNG" height="200px" width="200px">';
        text+='<img src="../../image/map/arrow.PNG" height="200px" width="200px">';
        
        if(positionid<=15)
        text+='<img src="../../image/map/question-mark.png" height="200px" width="200px">';
        else if(positionid<=16)
        text+='<img src="../../image/map/DAY2/connection-area_located.PNG" height="200px" width="200px">';
        else text+='<img src="../../image/map/DAY2/connection-area.PNG" height="200px" width="200px">';
        text+='<img src="../../image/map/arrow.PNG" height="200px" width="200px">';
        
        if(positionid==17||positionid==19)
        text+='<img src="../../image/map/DAY2/residence-community2_located.PNG" height="200px" width="200px">';
        else
        {
            var nowvisited=(sessionStorage.getItem("locked_bird_gamestate").split(","))[0].split("");
            if(nowvisited[17]!=0)
            text+='<img src="../../image/map/DAY2/residence-community2.PNG" height="200px" width="200px">';
            else text+='<img src="../../image/map/question-mark.png" height="200px" width="200px">'; 
        }

        if(positionid==18||(positionid>=20&&positionid<=22))
        text+='<img src="../../image/map/DAY2/living-area_located.PNG" height="200px" width="200px">';
        else
        {
            var nowvisited=(sessionStorage.getItem("locked_bird_gamestate").split(","))[0].split("");
            if(nowvisited[18]!=0)
            text+='<img src="../../image/map/DAY2/living-area.PNG" height="200px" width="200px">';
            else text+='<img src="../../image/map/question-mark.png" height="200px" width="200px">'; 
        }
    }
    else
    {
        document.getElementById("title").innerHTML="第三天地图";
        if(positionid<27)
        text+='<img src="../../image/map/DAY3/business-area_located.PNG" height="200px" width="200px">';
        else text+='<img src="../../image/map/DAY3/business-area.PNG" height="200px" width="200px">';
        text+='<img src="../../image/map/arrow.PNG" height="200px" width="200px">';
        
        if(positionid<27)
        text+='<img src="../../image/map/question-mark.png" height="200px" width="200px">';
        else if(positionid<32)
        text+='<img src="../../image/map/DAY3/education-area_located.PNG" height="200px" width="200px">';
        else text+='<img src="../../image/map/DAY3/education-area.PNG" height="200px" width="200px">';
        text+='<img src="../../image/map/arrow.PNG" height="200px" width="200px">';

        if(positionid<32)
        text+='<img src="../../image/map/question-mark.png" height="200px" width="200px">';
        else
        text+='<img src="../../image/map/DAY3/administrative-area_located.PNG" height="200px" width="200px">';
    }
    document.getElementById("map").innerHTML=text;
};//加载地图

function showmap()
{
    window.location.replace("../map/map.html");
}//显示地图页面

function jigsawgame()
{
    if(sessionStorage.getItem("locked_bird_jigsaw-result")==null)
    {
        sessionStorage.setItem("locked_bird_jigsaw-result",false);
        window.location.replace("../mini-game/jigsaw/jigsaw.html");
    }
    else if(sessionStorage.getItem("locked_bird_jigsaw-result")=="false")
    {
        window.location.replace("../mini-game/jigsaw/jigsaw.html");
    }
    else 
    {   
        window.location.replace("D2_laboratory.html");
    }
    //该游戏通过后再次点击则进入"实验室"
}//进行jigsaw游戏

function break_bricksgame()
{
    if(sessionStorage.getItem("locked_bird_break_bricks-gametime")==null)
    sessionStorage.setItem("locked_bird_break_bricks-gametime",0);
    if(sessionStorage.getItem("locked_bird_break_bricks-result")==null)
    sessionStorage.setItem("locked_bird_break_bricks-result",0);
    autosave();
    if(sessionStorage.getItem("locked_bird_break_bricks-gametime")<=900)
    window.location.replace("../mini-game/break_bricks/break_bricks.html");
    else alert("您已经玩了很久游戏啦！请专注于案件的调查!");
    //该游戏通过后能再进入，每次胜利一次小球速度变快且关卡变化
}//进行break_bricks游戏

window.addEventListener('storage',(e)=>{sessionStorage.setItem(e.key,e.oldValue)})
window.addEventListener('storage',(e)=>{localStorage.setItem(e.key,e.oldValue)})
//防止用户私自更改信息

/*alert框格式*/
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
            //btn.setAttribute("id","alert_btn");
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
            // 确定绑定点击事件删除标签
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