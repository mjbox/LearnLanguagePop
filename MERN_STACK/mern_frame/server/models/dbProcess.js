var dbLauncher = require('../models/dbLauncher');

function syncCall() { 
    return new Promise(function (resolve, reject) {
        var data = 100;
        resolve(data);
      });
}
class dbProcess {
    constructor() {
    }
    cb(res, result) {

    }
    get(req, res) {
        console.log("dbProcess : get [" + req.body.cmd + "]");
        switch(req.body.cmd) {
            case "getContentsHeader":
                this.getContentsHeader(res);
                break;
            case "getScript":
                this.getScript(req.body.param, res);
                break;
        }
    }
    getContentsHeader(res) {
        var result = [];
        dbLauncher.collection('videos').find().stream()
            .on('data', function(doc){
                result.push({"id":doc.id, "name":doc.name, "type":doc.type});
                console.log(doc.name);
            })
            .on('error', function(err){
                // handle error
            })
            .on('end', function(){
                // final callback
                console.log("async end");
                res.send(result);
            });
        console.log("sync end");
    }
    getScript(id, res) {
        var result;
        console.log(id);
        dbLauncher.collection('scripts').find({'videoid':id}).stream()
            .on('data', function(doc){
                result = {"script":doc.script, "script_kor":doc.script_kor};
                console.log("data");
            })
            .on('error', function(err){
                // handle error
                console.log(err);
            })
            .on('end', function(){
                // final callback
                console.log("async end");
                res.send(result);
            });
    }
}
module.exports = new dbProcess();
