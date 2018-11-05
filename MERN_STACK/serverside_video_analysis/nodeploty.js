var fs = require('fs')
var plotly = require('plotly')("mjbox", "8vSrAjYZ1NuJcw4oPgFG");
var AudioContext = require('web-audio-api').AudioContext;
var context = new AudioContext();
var pcmdata = [];

var trace1 = {
    x: [],
    y: [],
    type: "scatter"
  };
  var data = [trace1];
  var layout = {
    yaxis2: {
      domain: [0.6, 0.95],
      anchor: "x2"
    },
    xaxis2: {
      domain: [0.6, 0.95],
      anchor: "y2"
    }
  };

  decodeSoundFile("output.mp3");

function decodeSoundFile(soundfile){
    console.log("decoding mp3 file ", soundfile, " ..... ")
    fs.readFile(soundfile, function(err, buf) {
    if (err) throw err
    context.decodeAudioData(buf, function(audioBuffer) {
            console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
            pcmdata = (audioBuffer.getChannelData(0)) ;
            samplerate = audioBuffer.sampleRate; // store sample rate
            var p = 0;
            for(var j = 0; j < 44100; j++)
            {
                trace1.x[j] = j;
                trace1.y[j] = pcmdata[j+p];
            }
            var graphOptions = {layout: layout, filename: "simple-inset", fileopt: "overwrite"};
            plotly.plot(data, graphOptions, function (err, msg) {
            console.log(msg);
            });
        }, function(err) { throw err })
    })
}
  