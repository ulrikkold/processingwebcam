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

var capture, sound, amplitude, cnv, mic;

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
  
    cnv.mouseClicked(togglePlay);
  capture = createCapture(VIDEO);
  capture.size(320,240);
  capture.hide();
  
  mic = new p5.AudioIn();
  mic.start();  
  
  //~ noStroke();
  //~ fill(0);
  
  
  //~ audio.loop();
  //~ audio.hide();
}

function draw() {
  background(255);
  
  image(capture, 0, 0, 320,240);
  filter('POSTERIZE',2);
  //~ filter('POSTERIZE',randNum(2,127));
  //~ filter('POSTERIZE',getAmplitudeModifier(2,18));
  filter('BLUR',getMicrophoneModifier(1,12));
  
}

function randNum(min,max) {
    return Math.floor(Math.random() * max) + min;
}

function getAmplitudeModifier(min,max) {
    return Math.floor(amplitude.getLevel() * max) + min;
}

function getMicrophoneModifier(min,max) {
    var micL = mic.getLevel();
    document.querySelector('#micLevel').innerHTML = Math.floor(micL * max) + min;
    return Math.floor(micL * max) + min;
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
