import axios from 'axios';
var querystring = require('querystring');


class dbManager {
    static getdb(cmd, param, cb) {
        dbManager.get('/getdb', cmd, param, cb);
    }
    static get(route, cmd, param, cb) {
        axios.post(route,
        querystring.stringify({
            cmd: cmd,
            param: param
        }), {
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(res) {
            cb(true, res.data);
        });
    }
}

export default dbManager;