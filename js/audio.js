// File to load and read the mp3 in synch with the midi inputs

arrayBuffers = [];
arraySources = [];

var myHeader = new Headers({
    'accept': 'audio/mpeg',
    'cache-controle': 'private',
});

var myInit = {
    method: 'GET',
    headers: myHeader,
    mode: 'cors',
    cache: 'default'
};

var AudCtx = new AudioContext();
const analyser = AudCtx.createAnalyser();

fetchAudio();
function fetchAudio() {
    fetch('./assets/moon_crystals.mp3', myInit).then(function (response) {
        //arrayRes.push(response);
        console.log(response);
        return response.arrayBuffer();
    })
        .then(function (buffer) {
            console.log(buffer);
            return AudCtx.decodeAudioData(buffer);
        })
        .then(function (decodedData) {
            arrayBuffers.push(decodedData);
            console.log(decodedData);
        })
}

let btn_play = document.getElementById("play_music");
let btn_stop = document.getElementById("stop_music");

btn_play.addEventListener("click", function () {
    arraySources.push(AudCtx.createBufferSource());
    arraySources[arraySources.length - 1].connect(AudCtx.destination);
    arraySources[arraySources.length - 1].buffer = arrayBuffers[0];
    arraySources[arraySources.length - 1].start(0);
})

btn_stop.addEventListener("click",function(){
    AudCtx.suspend();
})