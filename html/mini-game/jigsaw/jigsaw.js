var time=0;
var pause=false;
var set_timer;
var d=new Array(10);
var success=false;
var d_direct=new Array(
		[0],
		[2,4],
		[1,3,5],
		[2,6],
		[1,5,7],
		[2,4,6,8],
		[3,5,9],
		[4,8],
		[5,7,9],
		[6,8]
	);
var d_posXY=new Array(
		[0],
		[0,0],
		[150,0],
		[300,0],
		[0,150],
		[150,150],
		[300,150],
		[0,300],
		[150,300],
		[300,300]
	);
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;

function congratulate()
{
	var account=sessionStorage.getItem("locked_bird_account");
	var achievementid="locked_bird_"+account+"achievement1";
	if(localStorage.getItem(achievementid)==null)
	localStorage.setItem(achievementid,"false");
	if(time<=20&&localStorage.getItem(achievementid)=="false")
	{
		alert("获得成就：拼图大师！");
		localStorage.removeItem(achievementid)
		localStorage.setItem(achievementid,true);

		var d=new Date();
    	var gametime=""+d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		localStorage.setItem(achievementid+"time",gametime);
	}
	else alert("congratulation!");
	pause=false;	
	clearInterval(cset_timer);
	success=true;
	sessionStorage.removeItem("locked_bird_jigsaw-result");
	sessionStorage.setItem("locked_bird_jigsaw-result",true);
}

function move(id){
	if(pause==false)
	{
		alert("请先点击开始")
		return;
	}
	var i=1;
	for(i=1; i<10; ++i){
		if( d[i] == id )
			break;
	}
	var target_d=0;
	target_d=whereCanTo(i);
	if( target_d != 0){
		d[i]=0;
		d[target_d]=id;
		document.getElementById("d"+id).style.left=d_posXY[target_d][0]+"px";
		document.getElementById("d"+id).style.top=d_posXY[target_d][1]+"px";
	}
	var finish_flag=true;
	for(var k=1; k<9; ++k)
	{
		if(d[k]!=k)
		{
			finish_flag=false;
			break;
		}
	}
	if(finish_flag==true)
	congratulate();
}

function whereCanTo(cur_div){
	var j=0;
	var move_flag=false;
	for(j=0; j<d_direct[cur_div].length; ++j){
		if( d[ d_direct[cur_div][j] ] == 0 ){
			move_flag=true;
			break;
		}
	}
	if(move_flag == true)
	return d_direct[cur_div][j];
	else return 0;
}

function timer(){
	time+=1;
	var rtime=90-time;
	var min=parseInt(rtime/60);
	var sec=rtime%60;
	document.getElementById("timer").innerHTML=min+"分"+sec+"秒";
	if(time>90)
	{
		alert("游戏失败，请重新开始游戏！");
		pause=false;
		clearInterval(cset_timer);
		reset();
	}
}

function start(){
	if(pause==false)
	{
		pause=true;
		cset_timer=setInterval(timer,1000);
	}
}

function reset(){
	time=0;
	random_d();
	if(pause)
	{
		clearInterval(cset_timer);
		cset_timer=setInterval(timer,1000);
	}
	document.getElementById("timer").innerHTML=1+"分"+30+"秒";
}

function random_d(){
	for(var i=9; i>1; --i){
		var to=parseInt(Math.random()*(i-1)+1);
		if(d[i]!=0){
			document.getElementById("d"+d[i]).style.left=d_posXY[to][0]+"px";
			document.getElementById("d"+d[i]).style.top=d_posXY[to][1]+"px";
		}
		if(d[to]!=0){
			document.getElementById("d"+d[to]).style.left=d_posXY[i][0]+"px";
			document.getElementById("d"+d[to]).style.top=d_posXY[i][1]+"px";
		}
		var tem=d[to];
		d[to]=d[i];
		d[i]=tem;
	}
	var ni=0;
	for(var i=2;i<=9;i++)
	if(d[i]!=0)
	{
		for(var j=1;j<i;j++)
		if(d[i]<d[j])
		ni++;
	}
	if(ni%2==1)
	random_d();
}
window.onload=function(){
	reset();
}

function back()
{
	if(success)
	{
		if(sessionStorage.getItem("locked_bird_jigsaw-result")==false)
		if(confirm("该游戏胜利后退出不能再次进入，确定要退出吗？")==true)
		{
			sessionStorage.removeItem("locked_bird_jigsaw-result");
			sessionStorage.setItem("locked_bird_jigsaw-result",true);
		}
	}
	else if(sessionStorage.getItem("locked_bird_jigsaw-result")=="false")
	{
		if(confirm("您还未通过游戏，确定要退出吗？")==false)
		return;
	}
	var gamestate=sessionStorage.getItem("locked_bird_gamestate");
	var arr=gamestate.split(",");
	var position=arr[4];
	window.location.replace(position);
}//返回主游戏页面