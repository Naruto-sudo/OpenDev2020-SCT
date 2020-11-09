var musicnum = 6; //音楽ファイルの総数
var player = [];
var count = 0;

//メトロノーム
var countup = function(){
    console.log(count++);
}
setInterval(countup, 1000);

//音楽リスト
var music = [
  [0, 'url', 'emotion', 0], //ここは参照しない
  [1, 'hp_piano', 'happy', 0],
  [2, 'hp_strings', 'happy', 0.3],
  [3, 'hp_forest', 'happy', 0.8],
  [4, 'sd_piano', 'sad', 0],
  [5, 'sd_strings', 'sad', 0.3],
  [6, 'sd_rain', 'sad', 0.8]
];

//プレーヤーの作成
function makeplayer(number, url){
    player.push('');
    player[number] = new Tone.Player({
        url: `http://127.0.0.1:8888/music/media/${url}.mp3`,
        autoplay: false,
        loop: true
    }).toDestination();
    
}

for ( var n = 1 ; n < musicnum + 1 ; n++ ){
    makeplayer(music[n][0], music[n][1]);
    player[n].mute = true;
    player[n].stop();
}

//ここで音楽を再生開始
var on = false;
function startmusic(){
    if (on == false) {
        for ( var n = 1 ; n < musicnum + 1; n++ ){
            player[n].start();
        }
        on = true;
    } else {
        for ( var n = 1 ; n < musicnum + 1; n++ ){
            player[n].stop();
        }
        on = false;
    }
}

//メインここから
function soundloop(sad, happy) {
    if ((count % 4000) == 0 ){
        if (sad > happy){
            player[1].mute = true;
            player[2].mute = true;
            player[3].mute = true;
            player[4].mute = false;
            player[5].mute = false;
            player[6].mute = false;

            //piano
            if (0.2 >= sad){
                player[4].volume.value = sad * -100;
            } else if (0.5 >= sad > 0.2){
                player[4].volume.value = sad * -20;
            } else if (sad > 0.5){
                player[4].volume.value = sad * 1;
            }
            //strings
            if (0.2 >= sad){
                player[5].volume.value = sad * -100;
            } else if (0.5 >= sad > 0.2){
                player[5].volume.value = sad * -20;
            } else if (sad > 0.5){
                player[5].volume.value = sad * 1;
            }
            //ambient
            if (0.2 >= sad){
                player[6].volume.value = sad * -100;
            } else if (0.5 >= sad > 0.2){
                player[6].volume.value = sad * -10;
            } else if (sad > 0.5){
                player[6].volume.value = sad * 1;
            }

        }else if (happy > sad){
            player[1].mute = false;
            player[2].mute = false;
            player[3].mute = false;
            player[4].mute = true;
            player[5].mute = true;
            player[6].mute = true;

            //piano
            if (0.2 >= happy){
                player[1].volume.value = happy * -100;
            } else if (0.5 >= happy > 0.2){
                player[1].volume.value = happy * -20;
            } else if (happy > 0.5){
                player[1].volume.value = happy * 1;
            }
            //strings
            if (0.2 >= happy){
                player[2].volume.value = happy * -100;
            } else if (0.5 >= happy > 0.2){
                player[2].volume.value = happy * -10;
            } else if (happy > 0.5){
                player[2].volume.value = happy * 1;
            }
            //ambient
            if (0.2 >= happy){
                player[3].volume.value = happy * -100;
            } else if (0.5 >= happy > 0.2){
                player[3].volume.value = happy * -10;
            } else if (happy > 0.5){
                player[3].volume.value = happy * 1;
            }
        }
    }
}    
