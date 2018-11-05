/*
var http = require('http')
var fs = require('fs')
var argv = require('optimist').argv

var rxVideoID = /v=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/
var link = argv._.toString()
var videoID = link.match(rxVideoID)[1]
*/
var ffmpeg = require('fluent-ffmpeg');
var http = require('http')
var fs = require('fs')

var AudioContext = require('web-audio-api').AudioContext;
var context = new AudioContext();
var pcmdata = [];

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);
var videoURL = 'http://www.youtube.com/watch?v=9Cvw6iRQ95o';
var youtubedl = require('youtube-dl');
/*
fs.readFile('test.bin', function(err, buf) {
    for(var j = 0; j < 200; j++)
    {
        var i = j*4;
        console.log(buf.readFloatBE(j));
    }
});
//*/
decodeSoundFile("output.mp3");
/*
var video = youtubedl(videoURL,
  ['--format=18'],
  { cwd: __dirname }
);
 
var _info;
video.on('info', function(info) {
        console.log('Download started');
        console.log('filename: ' + info.filename);
        console.log('size: ' + info.size);
        _info = info;
        video.pipe(fs.createWriteStream(info.filename));
    }).on('data', function(chunk) {
        'use strict';
        //size += chunk.length;
        //console.log('data : ' + size);
    })
    .on('complete', function complete(info) {
        'use strict';
        console.log('filename: ' + info._filename + ' already downloaded.');
    })
    .on('end', function() {
        'use strict';
        console.log('finished downloading!' + _info.filename);
        convert(_info.filename, 'output.mp3', function(err){
            if(err) {
                console.log(err);
            } else {
                console.log('conversion complete');
                decodeSoundFile('output.mp3');
            }
         });
    });
//*/
function decodeSoundFile(soundfile){
    console.log("decoding mp3 file ", soundfile, " ..... ")
    fs.readFile(soundfile, function(err, buf) {
    if (err) throw err
    context.decodeAudioData(buf, function(audioBuffer) {
            console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
            pcmdata = (audioBuffer.getChannelData(0)) ;
            samplerate = audioBuffer.sampleRate; // store sample rate
            maxvals = [] ; max = 0 ;
            var buf = new Buffer(audioBuffer.length*8);
            var i = 0;
            //buf.fill(0);
            pcmdata.forEach(element => {
                buf.writeFloatBE(element, i++);
            });
            fs.writeFile("test.bin", buf, function(err) {
                console.log("The file was saved!");
            }); 
        }, function(err) { throw err })
    })
}
        
function convert(input, output, callback) {
    ffmpeg(input)
        .output(output)
        .on('end', function() {                    
            console.log('conversion ended');
            callback(null);
        }).on('error', function(err){
            //console.log('error: ', err);
            callback(err);
        }).run();
}

