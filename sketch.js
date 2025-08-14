let osc; // the sound generator
let playing = false;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(15);
  textAlign(CENTER, CENTER);
  textSize(24);

  osc = new p5.Oscillator('sine'); // sine wave sound
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
