//~ var fingers;

//~ function setup() {
  //~ createCanvas(560,320);
  //~ // specify multiple formats for different browsers
  //~ fingers = createVideo(['assets/small.mov',
                         //~ 'assets/small.webm']);
  //~ fingers.loop();
  //~ fingers.hide();
  //~ noStroke();
  //~ fill(0);
//~ }

//~ function draw() {
  //~ background(255);
  //~ fingers.loadPixels();
  //~ var stepSize = round(constrain(mouseX / 8, 6, 32));
  //~ for (var y=0; y<height; y+=stepSize) {
    //~ for (var x=0; x<width; x+=stepSize) {
      //~ var i = y * width + x;
      //~ var darkness = (255 - fingers.pixels[i*4]) / 255;
      //~ var radius = stepSize * darkness;
      //~ ellipse(x, y, radius, radius);
    //~ }
  //~ }
//~ }

var
capture
, sound
, amplitude
, cnv
;

function preload () {
    
     // we have included both an .ogg file and an .mp3 file
  soundFormats('ogg', 'mp3');

  // if mp3 is not supported by this browser,
  // loadSound will load the ogg file
  // we have included with our sketch
  //~ sound = loadSound('assets/ylvis-both-choruses.mp3');
}

function setup() {
  cnv = createCanvas(320, 240);
  //~ createCanvas(320, 240);

  sound = loadSound('assets/ylvis-both-choruses.mp3');

  amplitude = new p5.Amplitude();
  amplitude.setInput(sound);
  
// start / stop the sound when canvas is clicked
  cnv.mouseClicked(function() {
    if (sound.isPlaying() ){
      sound.stop();
    } else {
      sound.play();
    }
  });
    
  capture = createCapture(VIDEO);
  capture.size(320,240);
  capture.hide();
  //~ noStroke();
  //~ fill(0);
  
  
  //~ audio.loop();
  //~ audio.hide();
}

function draw() {
  background(255);
  
  //~ if (sound.isPlaying()) {
      
  image(capture, 0, 0, 320,240);
  filter('BLUR',2.0);
  filter('POSTERIZE',randNum(2,127));
  //~ filter('POSTERIZE',getAmplitudeModifier(2,18));
  
  //~ capture.loadPixels();
  //~ var stepSize = round(constrain(mouseX / 8, 6, 32));
  //~ for (var y=0; y<height; y+=stepSize) {
    //~ for (var x=0; x<width; x+=stepSize) {
      //~ var i = y * width + x;
      //~ var darkness = (255 - capture.pixels[i*4]) / 255;
      //~ var radius = stepSize * darkness;
      //~ ellipse(x, y, radius, radius);
    //~ }
  //~ }
//~ }
}

function randNum(min,max) {
    return Math.floor(Math.random() * max) + min;
}

function getAmplitudeModifier(min,max) {
    return Math.floor(amplitude.getLevel() * max) + min;
}
