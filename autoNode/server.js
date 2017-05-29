const execFile = require('child_process').execFile;
const exec = require('child_process').exec;
const http = require('http');

http.createServer(function(req, res) {
  res.writeHeader(200, {
    'content-Type': 'text/plain;charset=utf-8'
  });
  runCmd()
  //setInterval(autoPushGit, 1000 * 60)
  autoPushGit();

  res.end("执行脚本程序启动成功")

}).listen(88);
console.log('执行脚本程序启动成功,请使用localhost:88端口访问!')

function autoPushGit() {
  execFile('autoPushGit.bat', {
    encoding: 'utf8'
  }, function(err, stdout, stderr) {
    if(err) {
      console.log(err);
      return;
    }
    console.log('执行返回:' + stdout);

  });
}

function runCmd() {
  //需要执行的命令字符串
  var cli = 'ipconfig systeminfo';
  exec(cli, {
    encoding: 'utf8'
  }, function(err, stdout, stderr) {
    if(err) {
      console.log(err);
      return;
    }
    console.log('stdout' + stdout);
    console.log('stderr' + stderr);
  })
}