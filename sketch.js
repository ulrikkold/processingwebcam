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

var capture;

function setup() {
  createCanvas(320, 240);
  capture = createCapture(VIDEO);
  capture.size(320,240);
  capture.hide();
}

function draw() {
  background(127);
  image(capture, 0, 0, 320,240);
  //~ filter('BLUR',2.0);
  filter('POSTERIZE',randNum(2,127));
}

function randNum(min,max) {
    return Math.floor(Math.random() * max) + min;
}
