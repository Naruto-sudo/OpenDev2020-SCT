//debug - get elements
var disp = document.getElementById("emotion");
var mood = document.getElementById("slider");

//Tone.js - music player
const vol1 = new Tone.Volume().toDestination();
const channel1 = new Tone.Channel().connect(vol1);
const vol2 = new Tone.Volume().toDestination();
const channel2 = new Tone.Channel().connect(vol2);
const vol3 = new Tone.Volume().toDestination();
const channel3 = new Tone.Channel().connect(vol3);
const vol4 = new Tone.Volume().toDestination();
const channel4 = new Tone.Channel().connect(vol4);
//ambient
const vol5 = new Tone.Volume().toDestination();
const channel5 = new Tone.Channel().connect(vol5);
const vol6 = new Tone.Volume().toDestination();
const channel6 = new Tone.Channel().connect(vol6);

//Tone.js - creating channels
function makeChannel(url, channel){
  const player = new Tone.Player({
    url: `http://127.0.0.1:8887/media/${url}.mp3`,
    loop: true,
    fadein: 5,
    fadeout: 5
  }).sync().start(0);
  player.connect(channel);
}

makeChannel("hp_piano", channel1);
makeChannel("sd_piano", channel2);
makeChannel("hp_strings", channel3);
makeChannel("sd_strings", channel4);
makeChannel("hp_forest", channel5);
makeChannel("sd_rain", channel6);

//volume reset
vol1.mute = true;
vol2.mute = true;
vol3.mute = true;
vol4.mute = true;
vol5.mute = true;
vol5.volume = 0;
vol6.mute = true;
vol6.volume = 0;

//

//button - play or stop
var on = false;
function playorstop(){
  if (on == false) {
    Tone.Transport.start();
    on = true;
  } else {
    Tone.Transport.stop();
    on = false;
  }
}

//button - apply mood
function applychange(){
  //debug - display values
  if (mood.value < 0){
    disp.innerHTML = "Current Emotion : " + mood.value + " (Negative)";
  }else if (mood.value > 0){
    disp.innerHTML = "Current Emotion : " + mood.value + " (Positive)";
  }else{
    disp.innerHTML = "Current Emotion : " + mood.value + " (Neutral)";
  }

  //volume controll
  if (mood.value >= 0){
    vol2.mute = true;
    vol1.mute = false;
  }else if (mood.value < 0){
    vol1.mute = true;
    vol2.mute = false;
  }
  if (mood.value > 2){
    vol3.mute = false;
    vol4.mute = true;
  }else if (mood.value < -2){
    vol3.mute = true;
    vol4.mute = false;
  }else{
    vol3.mute = true;
    vol4.mute = true;
  }
  //ambient
  if (mood.value > 3.5){
    vol5.mute = false;
    vol5.volume = (mood.value)
    vol6.mute = true;
  }else if (mood.value < -3.5){
    vol5.mute = true;
    vol6.volume = (mood.value)
    vol6.mute = false;
  }else{
    vol5.mute = true;
    vol6.mute = true;
  }

}
