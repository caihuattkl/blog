var execFile = require('child_process').execFile;

execFile('autoPushGit.bat',{encoding:'utf8'},function (err,stdout,stderr){
    if (err){
        console.log(err);
        return;
    }
    console.log('stdout:'+stdout);
    console.log('stderr:'+stderr);
});