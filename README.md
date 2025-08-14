# audiovisual-instrument-v1
       (mouse)                           (sound)                     (visuals)
 mouseX -----→ map → freq ------------→ osc.freq() ----------------→ shapeSize (via map)
 mouseY -----→ map → vol -------------→ osc.amp() -----------------→ shapeColor (via map)
                                   \
                                    \-- if (vol > threshold) → burst dots

 events:
   click → mousePressed() → userStartAudio() + osc.start()/stop() → playing true/false
   frame loop → draw() runs → recompute sound+visuals → redraw canvas
