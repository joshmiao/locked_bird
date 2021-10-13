/*游戏页面动画控制*/
var click=0;
var len=0;
var pegion={
    1:'<p class="text" id="text0">你：那是……一种鸟？看起来与鸽子十分相似。</p>',
    2:'<p class="text" id="text0">“又是这种鸟！”你又看到了它，仿佛它就是某个引起这一切的幕后黑手的化身。</p>',
    3:'<p class="text" id="text0">你：嗯，再一次确认了，这些“鸟类”的生物特征很弱，更像是某种机器，只是空有个鸟类的外壳。</p>',
    4:'<p class="text" id="text0">你：嗯，再一次确认了，这些“鸟类”的生物特征很弱，更像是某种机器，只是空有个鸟类的外壳。</p>'
};
function pegion_discovered(){
    document.getElementsByClassName("pigeon")[0].src="../../image/pegion.png";
    document.getElementsByClassName("pigeon")[0].style.transitionDuration="1s";
    document.getElementsByClassName("pigeon")[0].style.height="150px";
    document.getElementsByClassName("pigeon")[0].style.width="150px";
    var positionid=sessionStorage.getItem("locked_bird_nowposition");
    var arr=sessionStorage.getItem("locked_bird_gamestate").split(",");
    var pos=arr[0].split("");
    if(pos[positionid]>4)
    {
        alert("呀，被你发现啦!");
        return; 
    }
    pos[positionid]=Number(pos[positionid])+4;
    arr[0]=pos.join("");
    addclue("C");
    var num=getclue("C");
    document.getElementById("text-box").innerHTML+=pegion[num];
    $(".text").hide();
    $("#text0").fadeIn(1000);
    var gamestate="";
    for(var i=0;i<3;i++)gamestate+=arr[i]+",";
    gamestate+=String(Number(arr[3])+1);
    for(var i=4;i<7;i++)gamestate+=","+arr[i];
    sessionStorage.removeItem("locked_bird_gamestate");
    sessionStorage.setItem("locked_bird_gamestate",gamestate);
    autosave();
}
function in_animation_1(){  //直接浮现文字
    $("#text"+click).fadeIn(1000); 
    if (click==len)
    {
        $("#selection-set").fadeIn(1500);
        setvisited(2);
    }
    click++;
}
function out_animation_1(place){  //所有元素浮出并进入链接
    $("body").fadeOut(1000,function(){window.location.replace(place);})
}
function in_animation(){  //主动画函数
    if (click>len) return;
    $(".text").hide();
    in_animation_1();
}
function nextlog(event)
{
    if(event.keyCode==13||event.keyCode==32)
    in_animation();
}
$(document).ready(function(){  //进入页面
    len=document.getElementsByClassName("text").length; 
    click=1;
    var pos=sessionStorage.getItem("locked_bird_nowposition");
    if(pos!=-1)
    if((sessionStorage.getItem("locked_bird_gamestate").split(","))[0].split("")[pos]>4)
    $(".pigeon").hide();
    $("#selection-set").hide();
    in_animation();
});
function travel(place){  //主退出动画函数
    out_animation_1(place);
}