function setup() {
  createCanvas( windowWidth, windowHeight )

  drums = EDrums('x*o*x*o-x*o*x*xx')
  follow = Follow( drums )
}

function draw() {
  background( follow.getValue() * 255 )
}
