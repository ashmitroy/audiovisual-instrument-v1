// ====== STATE ======
let osc;
let playing = false;

// visuals
let shapeSize = 50;
let shapeColor;

// multi-style data
let waveforms = ['sine', 'triangle', 'square'];
let palettes = [
  {r:255, g:100, b:200}, // style 0 - pink
  {r:120, g:240, b:255}, // style 1 - blue/green
  {r:255, g:180, b:90}   // style 2 - orange
];
let currentStyle = 0;

// ====== SETUP ======
function setup(){
  createCanvas(windowWidth, windowHeight);
  background(15);
  textAlign(CENTER, CENTER);
  textSize(24);

  osc = new p5.Oscillator(waveforms[currentStyle]);

  // default color from palette
  const p = palettes[currentStyle];
  shapeColor = color(p.r, p.g, p.b);
}

// ====== DRAW LOOP ======
function draw(){
  background(15);

  fill(200);
  text("Click to start/stop • Move mouse: pitch/volume • Keys 1/2/3: styles",
       width/2, 40);

  if (playing){
    // map mouse to sound
    const freq = map(mouseX, 0, width, 100, 1000, true);
    const vol  = map(mouseY, height, 0, 0, 0.5, true);

    osc.freq(freq);
    osc.amp(vol);

    // link sound→visuals
    shapeSize = map(freq, 100, 1000, 30, 120);
    const brightness = map(vol, 0, 0.5, 50, 255);

    const p = palettes[currentStyle];
    shapeColor = color(p.r, p.g, p.b, brightness);

    // burst if loud
    if (vol > 0.3) {
      for (let i = 0; i < 12; i++) {
        const a = TWO_PI * i / 12;
        const x = width/2 + cos(a) * (shapeSize + 20);
        const y = height/2 + sin(a) * (shapeSize + 20);
        noStroke();
        fill(brightness, 150, 200);
        ellipse(x, y, 8, 8);
      }
    }
  }

  // main shape
  noStroke();
  fill(shapeColor);
  if (currentStyle === 0) {
    ellipse(width/2, height/2, shapeSize, shapeSize);
  } else if (currentStyle === 1) {
    push();
    rectMode(CENTER);
    translate(width/2, height/2);
    rotate(frameCount * 0.01);
    rect(0, 0, shapeSize * 1.6, shapeSize * 0.6, 8);
    pop();
  } else {
    for (let i = 0; i < 10; i++) {
      const r = shapeSize + i * 8;
      noFill();
      stroke(red(shapeColor), green(shapeColor), blue(shapeColor), 180 - i*12);
      ellipse(width/2, height/2, r, r);
    }
    noStroke();
  }
}

// ====== EVENTS ======
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

function keyPressed(){
  if (key === '1') setStyle(0);
  if (key === '2') setStyle(1);
  if (key === '3') setStyle(2);
}

function setStyle(i){
  currentStyle = i;
  osc.setType(waveforms[currentStyle]);
  const p = palettes[currentStyle];
  shapeColor = color(p.r, p.g, p.b);
}

function windowResized(){ resizeCanvas(windowWidth, windowHeight); }
