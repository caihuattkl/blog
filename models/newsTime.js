/*
 获取新闻时间的方法,思路,限定时间不能相隔太近
 * */
//module.exports
module.exports=function(){
	this.currentTime=new Date();
	return currentTime.getFullYear()+"-"+(currentTime.getMonth()+1)+"-"+currentTime.getDate()+" "+currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds()
}
