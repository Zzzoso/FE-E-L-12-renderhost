let faceapi;
let detections = [];

let video;
let canvas;

function setup() {
  canvas = createCanvas(480 * 1.8, 360 * 1.8);
  canvas.id("canvas");

  video = createCapture(VIDEO); // video input
  video.id("video");
  video.size(width, height);
  video.hide();

  //impostazioni di ml5.faceapi
  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.5,
  };

  faceapi = ml5.faceApi(video, faceOptions, faceReady); //oggetto clue della libreria

  txt = createP("Ciao!");
  txt.id("text");
}

function faceReady() {
  faceapi.detect(gotFaces); // Start detecting faces
  console.log(detections);
}

function gotFaces(error, result) {
  // Got faces
  if (error) {
    console.log(error);
    return;
  }

  detections = result; //storing datas in detections[]

  clear(); //no bg

  drawBoxs(detections); //Draw detection box
  drawLandmarks(detections); //// Draw all the face points
  drawExpressions(detections, 10, 30, 14); //Draw face expression text

  faceapi.detect(gotFaces); // Calling the function again
}

function drawBoxs(detections) {
  if (detections.length > 0) {
    //If at least 1 face is detected
    for (f = 0; f < detections.length; f++) {
      let { _x, _y, _width, _height } = detections[f].alignedRect._box;
      stroke(0, 255, 0);
      strokeWeight(0.7);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

function drawLandmarks(detections) {
  if (detections.length > 0) {
    //If at least 1 face is detected
    for (f = 0; f < detections.length; f++) {
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        stroke(255, 255, 255);
        strokeWeight(2);
        point(points[i]._x, points[i]._y);
      }
    }
  }
}

function drawExpressions(detections, x, y, textYSpace) {
  if (detections.length > 0) {
    //If at least 1 face is detected
    let { neutral, happy, angry, sad, disgusted, surprised, fearful } =
      detections[0].expressions;

    textFont("Menlo, Monaco, 'Courier New', monospace");
    textSize(12);
    noStroke();
    fill(0, 255, 0);

    text("   neutral:     " + nf(neutral * 100, 2, 2) + "%", x, y + textYSpace);

    text(
      "   happiness:   " + nf(happy * 100, 2, 2) + "%",
      x,
      y + textYSpace * 2
    );

    text(
      "   anger:       " + nf(angry * 100, 2, 2) + "%",
      x,
      y + textYSpace * 3
    );
    text("   sad:         " + nf(sad * 100, 2, 2) + "%", x, y + textYSpace * 4);
    text(
      "   disgusted:   " + nf(disgusted * 100, 2, 2) + "%",
      x,
      y + textYSpace * 5
    );
    text(
      "   surprised:   " + nf(surprised * 100, 2, 2) + "%",
      x,
      y + textYSpace * 6
    );
    text(
      "   fear:        " + nf(fearful * 100, 2, 2) + "%",
      x,
      y + textYSpace * 7
    );
  } else {
    //If no faces is detected:
    text("   neutral: ", x, y + textYSpace * 1);
    text("   happiness: ", x, y + textYSpace * 2);
    text("   anger: ", x, y + textYSpace * 3);
    text("   sad: ", x, y + textYSpace * 4);
    text("   disgusted: ", x, y + textYSpace * 5);
    text("   surprise: ", x, y + textYSpace * 6);
    text("   fear: ", x, y + textYSpace * 7);
  }
}

var loader = document.getElementById("preloader");

let angle = 0;
let txt;

function draw() {
  // contatore che fa cambiare contenuto al paragrafo

  angle = angle + 0.02;
  let counter = sin(angle);

  if (counter < 0) {
    txt.html("schiaccia . Un . Tasto . Per . Salvare");
  } else if (counter > 0) {
    txt.html("cheeeeeeeeeeese");
  }

  // -------------------------------------------------

  let r = 0;
  let g = 255 * abs(sin(angle));
  let b = 0;
  let a = 100;
  let col = color(r, g, b, a);
  txt.style("color", col);

  if (angle > 4) {
    loader.style.display = "none";
  }
}

function keyPressed() {
  if (keyPressed) {
    saveCanvas("FE⋅E⋅L⋅12 - capolavoro.jpg");
  }
}
