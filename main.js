status = "";
object = [];

function preload() {
    vid1 = createVideo("video.mp4");
}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();

    vid1.hide();
}

function draw() {
    image(vid1, 0, 0, 400, 300);
    if (status = true) {
        for (i = 0; i < object.length; i++) {
            document.getElementById("No").innerHTML = "COCOSSD HAS DETECTED " + object.length + " OBJECT(S)";
            document.getElementById("status").innerHTML = "OBJECTS DETECTED!";

            fill("#808080");
            stroke("#808080");
            strokeWeight(1);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + ", " + percent + "%", object[i].x + 10, object[i].y - 10);
            noFill();
            strokeWeight(2);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function start() {
    objectDetect = ml5.objectDetector("cocossd", loaded);
    document.getElementById("status").innerHTML = "DETECTING OBJECTS...";
}

function loaded() {
    console.log("model loaded");
    status = true;
    vid1.loop();
    vid1.speed(0.7);
    vid1.volume(0);
    objectDetect.detect(vid1, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        object = results;
    }
    objectDetect.detect(vid1, gotResult);
}