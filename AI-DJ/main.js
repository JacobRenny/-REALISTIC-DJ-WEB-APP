song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
  song = loadSound("music.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  posenet = ml5.poseNet(video, modelLoaded);
  posenet.on("pose", gotPoses);
}

function draw() {
  image(video, 0, 0, 600, 500);
  fill("red");
  stroke("red");
  if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    numberleftwristy = Number(leftWristY);
    removedecimal = floor(numberleftwristy);
    newnumberleftwristy = removedecimal / 500;
    document.getElementById("volume").innerHTML="volume="+ newnumberleftwristy;
  }
  if (scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);
    if (rightWristY > 0 && rightWristY <= 100) {
      document.getElementById("speed").innerHTML = "speed= 0.5x";
      song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY <= 200) {
      document.getElementById("speed").innerHTML = "speed= 1x";
      song.rate(1);
    } else if (rightWristY > 200 && rightWristY <= 300) {
      document.getElementById("speed").innerHTML = "speed= 1.5x";
      song.rate(1.5);
    } else if (rightWristY > 300 && rightWristY <= 400) {
      document.getElementById("speed").innerHTML = "speed= 2x";
      song.rate(2);
    } else if (rightWristY > 400 && rightWristY <= 500) {
      document.getElementById("speed").innerHTML = "speed= 2.5x";
      song.rate(2.5);
    }
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function modelLoaded() {
  console.log("Posenet is Initialized!");
}

function gotPoses(Results) {
  if (Results.length > 0) {
    console.log(Results);
    leftWristX = Results[0].pose.leftWrist.x;
    leftWristY = Results[0].pose.leftWrist.y;
    console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY);
    rightWristX = Results[0].pose.rightWrist.x;
    rightWristY = Results[0].pose.rightWrist.y;
    console.log("rightWristX=" + rightWristX + "rightWristY=" + rightWristY);
    scoreRightWrist = Results[0].pose.keypoints[10].score;
    scoreLeftWrist = Results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist=" + scoreRightWrist);
    console.log("scoreLeftWrist=" + scoreLeftWrist);
  }
}

function stop() {
  song.pause();
}