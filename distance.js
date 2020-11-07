main();
async function main() {
    var dist = document.getElementById("dist");
    var i2cAccess = await navigator.requestI2CAccess();//ポートにリクエストする
    var port = i2cAccess.ports.get(1);//情報受け取る
    var vl = new VL53L0X(port, 0x29);//初期化する

    await vl.init(); // for Long Range Mode (<2m)await vl.init(true);//センサーが読み取った値を後々受け取る

    var distance = vl.getRange();//センサーの値をdistanceに代入
    dist.innerHTML = distance;//距離表示
    await sleep(1000);//１秒開ける。

    if (await vl.getRange < 200) {//もし、距離が20cm未満だったら
        location.href = "./index.html"; //indexページにジャンプ
    }

}
