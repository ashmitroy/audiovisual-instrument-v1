let osc; // sound generator
let playing = false;

// visual properties
let shapeSize = 50;
let shapeColor;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(15);
  textAlign(CENTER, CENTER);
  textSize(24);

  osc = new p5.Oscillator('sine'); // sine wave sound

  // default color
  shapeColor = color(255, 100, 200);
}

function draw(){
  background(15);

  fill(255);
  text("Click to start sound • Move mouse to change pitch/volume",
       width/2, height/2 - 150);

  if (playing){
    // map mouseX to frequency (100–1000 Hz)
    let freq = map(mouseX, 0, width, 100, 1000);

    // map mouseY to volume (0–0.5)
    let vol = map(mouseY, 0, height, 1, 0);
    osc.freq(freq);
    osc.amp(vol);

    // link visuals to sound
    shapeSize = map(freq, 100, 1000, 30, 120); // pitch → size
    let brightness = map(vol, 0, 0.5, 50, 255); // volume → brightness
    shapeColor = color(brightness, 100, 200);

    // special burst effect if volume is high
    if (vol > 0.4) {
      for (let i = 0; i < 12; i++) {
        let angle = TWO_PI * i / 12;
        let x = width / 2 + cos(angle) * (shapeSize + 20);
        let y = height / 2 + sin(angle) * (shapeSize + 20);
        noStroke();
        fill(brightness, 150, 200);
        ellipse(x, y, 8, 8);
      }
    }
  }

  // draw main shape (always)
  noStroke();
  fill(shapeColor);
  ellipse(width / 2, height / 2, shapeSize, shapeSize);
}

function mousePressed(){
  if (!playing){
    userStartAudio();
    osc.start();
    playing = true;
  } else {
    osc.stop();
    playing = false;
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
