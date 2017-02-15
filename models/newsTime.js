/*
 获取新闻时间的方法,思路,限定时间不能相隔太近
 * */
//module.exports
module.exports=function(){
	this.currentTime=new Date();
	//月
	MM=(currentTime.getMonth()+1)<10?'0'+(currentTime.getMonth()+1):(currentTime.getMonth()+1);
	dd=currentTime.getDate()<10?'0'+currentTime.getDate():currentTime.getDate();
	hh=currentTime.getHours()<10?'0'+currentTime.getHours():currentTime.getHours();
	mm=currentTime.getMinutes()<10?'0'+currentTime.getMinutes():currentTime.getMinutes();
	ss=currentTime.getSeconds();
	_mm=Math.floor(Math.random()*(mm+3)+mm);
	tmm=_mm<10?'0'+_mm:_mm;//补位0
	return currentTime.getFullYear()+"-"+MM+"-"+dd+" "+hh+":"+tmm
	
}
