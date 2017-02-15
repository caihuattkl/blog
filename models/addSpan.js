module.exports = function(arrSpan) {
	var tmp=[];
	arrSpan.forEach(function(v){
		tmp[tmp.length]='<p>'+v+'</p>'
	})
	return tmp.join('');
}
