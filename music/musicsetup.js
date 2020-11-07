//Tone.js
var track = []; //各音楽ファイルに割り振られるトラック番号
var volume = []; //各音楽ファイルに割り振られるボリューム
var musicnum = 7; //音楽ファイルの総数

//ここで音楽を取得
for(var i = 1 ; i < musicnum ; i++ ){
  volume[i] = new Tone.Volume().toDestination();
  track[i] = new Tone.Channel().connect(volume[i]);
  volume.push('');
  track.push('');
}

// ファイル名, track名, 感情, 度合
var music = [
  ['filename', 'track', 'emotion', 0], //ここは参照しない (musicを取得するときは1からしてね！！！)
  ['hp_piano', track[1], 'happy', 0],
  ['hp_strings', track[2], 'happy', 0.3],
  ['hp_forest', track[3], 'happy', 0.8],
  ['sd_piano', track[4], 'sad', 0],
  ['sd_strings', track[5], 'sad', 0.3],
  ['sd_rain', track[6], 'sad', 0.8]
];

function makeChannel(url, channel){
  const player = new Tone.Player({
    url: `http://127.0.0.1:8887/music/media/${url}.mp3`,
    loop: true
  }).sync().start(0);
  player.connect(channel);
}

for(var n = 1 ; n < musicnum ; n++ ){
    makeChannel(music[n][0], music[n][1]);
}

//ここで音楽を再生開始
var on = false;
function startmusic(){
    if (on == false) {
        Tone.Transport.start();
        on = true;
    } else {
        Tone.Transport.stop();
        on = false;
    }
}

//ここで音楽の更新（毎フレーム）
function soundloop(emotype1, emovalue1, emotype2, emovalue2) {
    //console.log(emotype1 + " : " + emovalue1);
    //console.log(emotype2 + " : " + emovalue2);

    if (emovalue1 < emovalue2) {
        if (emovalue1 >= music[1][3]){
            volume[1].mute = false;
        }else{
            volume[1].mute = true;
        }
        if (emovalue1 >= music[2][3]){
            volume[2].mute = false;
        }else{
            volume[2].mute = true;
        }
        if (emovalue1 >= music[3][3]){
            volume[3].mute = false;
        }else{
            volume[3].mute = true;
        }
        volume[4].mute = true;
        volume[5].mute = true;
        volume[6].mute = true;
    }
    if (emovalue1 > emovalue2) {
        volume[1].mute = true;
        volume[2].mute = true;
        volume[3].mute = true;
        if (emovalue2 >= music[4][3]){
            volume[4].mute = false;
        }else{
            volume[4].mute = true;
        }
        if (emovalue2 >= music[5][3]){
            volume[5].mute = false;
        }else{
            volume[5].mute = true;
        }
        if (emovalue2 >= music[6][3]){
            volume[6].mute = false;
        }else{
            volume[6].mute = true;
        }
    }
}
