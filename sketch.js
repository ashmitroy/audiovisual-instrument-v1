let osc; // the sound generator
let playing = false;

// visual properties
let shapeSize = 50;
let shapeColor;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(15);
  textAlign(CENTER, CENTER);
  textSize(24);
  shapeColor = color(255, 100, 200); // pinkish starting color

  osc = new p5.Oscillator('triangle'); // sine wave sound
}

function draw(){
  background(15);

  fill(255);
  text("Click to start sound • Move mouse to change pitch/volume", width/2, height/2);
  
  if (playing){
    // map mouseX to frequency (100–1000 Hz)
    let freq = map(mouseX, 0, width, 100, 1000);
    // map mouseY to volume (0–0.5)
    let vol = map(mouseY, height, 0, 0, 0.5);
    osc.freq(freq);
    osc.amp(vol);
    
    // map pitch to shape size (100–1000 Hz → 30–120 pixels)
    shapeSize = map(freq, 100, 1000, 30, 120);
    // map volume to color brightness
    let brightness = map(vol, 0, 0.5, 50, 255);
    shapeColor = color(brightness, 100, 200);
  }
  noStroke();
fill(shapeColor);
ellipse(width / 2, height / 2, shapeSize, shapeSize);
if (playing && vol > 0.4) {
  for (let i = 0; i < 12; i++) {
    let angle = TWO_PI * i / 12;
    let x = width / 2 + cos(angle) * (shapeSize + 20);
    let y = height / 2 + sin(angle) * (shapeSize + 20);
    ellipse(x, y, 8, 8);
  }
}

}

function mousePressed(){
  if (!playing){
    userStartAudio(); // required by browsers
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
