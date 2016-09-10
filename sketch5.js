var capture, sound, amplitude, cnv, mic, filter;

function preload () {
    
     // we have included both an .ogg file and an .mp3 file
  //~ soundFormats('ogg', 'mp3');

  // if mp3 is not supported by this browser,
  // loadSound will load the ogg file
  // we have included with our sketch
  sound = loadSound('assets/ylvis-full.ogg');
}

function setup() {
  cnv = createCanvas(320, 240);
  cnv.mouseClicked(togglePlay);

  myLowPassFilter = new p5.LowPass();

  fft = new p5.FFT();

  //~ sound = loadSound('assets/ylvis-both-choruses.mp3');
  //~ sound.setVolume(0.1);
  
  sound.disconnect();
  sound.connect(myLowPassFilter);

  amplitude = new p5.Amplitude();
  amplitude.setInput(sound);
  
  capture = createCapture(VIDEO);
  capture.size(320,240);
  capture.hide();
  
  mic = new p5.AudioIn();
  mic.start();  
}

function draw() {
  background(255);
  
  // Map mouseX to a the cutoff frequency from the lowest
  // frequency (10Hz) to the highest (22050Hz) that humans can hear
  filterFreq = map (mouseX, 0, width, 10, 22050);

  // Map mouseY to resonance (volume boost) at the cutoff frequency
  filterRes = map(mouseY, 0, height, 15, 5);

  // set filter parameters
  myLowPassFilter.set(filterFreq, filterRes);  
  
  image(capture, 0, 0, 320,240);
  //~ filter('BLUR',2);
  filter('POSTERIZE',2);
  //~ filter('POSTERIZE',randNum(2,127));
  //~ filter('POSTERIZE',getAmplitudeModifier(2,127));
  filter('BLUR',getMicrophoneModifier(1,12));


  var spectrum = fft.analyze(); 
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

  text('click to play/pause', 4, 10);
  
  
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
