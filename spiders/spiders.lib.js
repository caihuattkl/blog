var http = require("http");
var urls = require('url');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

function spider(url, code) {
	return new Promise((resolve, reject) => {
		http.get(urls.parse(url), function(response) {
			var bufferHelper = new BufferHelper();
			response.on('data', function(chunk) {
				bufferHelper.concat(chunk);
			})
			response.on('end', function() {
				var data=iconv.decode(bufferHelper.toBuffer(), code);
				resolve(data)
			})
		}).on('error', function(err) {
			reject(err)
		})
	})

}

module.exports= spider;