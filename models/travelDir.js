var fs = require("fs"),
path = require('path');
//递归遍历目录
module.exports = function(dir, callback) {
	fs.readdirSync(dir).forEach(function(file) {
		var pathname = path.join(dir, file);

		if(fs.statSync(pathname).isDirectory()) {
			travel(pathname, callback);
		} else {
			callback(pathname);
		}
	});
}