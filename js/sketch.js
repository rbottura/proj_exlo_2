let WiW = window.innerWidth;
let WiH = window.innerHeight;

let wire_col, strokeWeight_all_val;

let pencil_parts = [], pencil_parts_2 = [];
let pencil_row = [];

//SPEED
let speed = 0.01, speed2 = 0.02, speed3 = 0.1, speed4 = 0.5, zMaxSpeed = 18;

let zoomIn;

let myFont;

let reScaleObject = false;

let copyFullPencil = [];


function preload() {
  myFont = loadFont('assets/Roboto-Regular.ttf');

  for (var i = 0; i < 17; i++) {
    let newObj = loadModel('./pencil/parts/newPen_(' + (i + 1) + ').obj', !reScaleObject);
    let part = new Parts(newObj, i + 1, 0, 0, 0, 1, zMaxSpeed, speed3, true);
    copyFullPencil.push(part);
    pencil_parts.push(part);
  }

  for (var i = 0; i < 17; i++) {
    let newObj = loadModel('./pencil/parts/newPen_(' + (i + 1) + ').obj', reScaleObject);
    let part = new Parts(newObj, i + 1, 0, 0, 0, 1, zMaxSpeed, speed3, true);
    pencil_parts_2.push(part);
  }

  if (pencil_parts.length == 17) {
    console.log("parts loaded /");
    loadSkycrapper();
    loadShip0();
    partsLoaded = true;
  }

  fill_row();
  build_full_pencil();
}

function fill_row() {
  for (let i = 0; i < 17; i++) {
    let randomPencilObj = Math.floor(random(pencil_parts.length));
    let newPencilItem = new Parts(pencil_parts[randomPencilObj].obj, randomPencilObj, 0, 0, 0, 1, zMaxSpeed, speed3, true);
    pencil_row.push(newPencilItem);
  }
}

let cam;
function setup() {
  createCanvas(WiW, WiH, WEBGL);

  cam = camera(0, 0, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);
  perspective(PI / 1.9, width / height, 0.1, 20000);

  zoomIn = 2;
  ortho(-WiW / zoomIn, WiW / zoomIn, -WiH / zoomIn, WiH / zoomIn, -5000, 5000);

  textFont(myFont);
  textSize(10); 
}

let light_col = 255;

function draw() {
  background('rgba(0,0,0)');

  if(gamepadReady){
    drawGamepad();
  }

  sceneMovementSpeed(speed4, speed4);

  push();

  rotateX(-rotate_x_target);
  rotateY(rotate_y_target);
  rotateZ(rotate_z_target);

  translate(translate_x_target, translate_y_target, translate_z_target);

  switch (scenePlaying) {
    case 0:
      Scene_0(partsLoaded);
      scene_rainingBoxes();
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
  }

  pop();
}

