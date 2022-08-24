let WiW = window.innerWidth;
let WiH = window.innerHeight;

let wire_col, strokeWeight_all_val;

let pencil_parts = [];
let pencil_row = [];

let mouse_parts = [];
let mouse_row = [];

let gate_in, gate_out;

let speed = 0.01, speed2 = 0.02, speed3 = 0.1, speed4 = 0.5, dx, dy, dz, targetX, targetY, targetR, targetZ, dist_p = -400, tmp_dist, goAway = 1, zoomIn;
let showMouse = true, showPencil = true, tRot = false, dr2 = 0, zPosInit = -3000, zMaxSpeed = 18;

let xInit, yInit, zInit;

class Parts {
  constructor(objModel, index, x, y, z, scale, speed, easeInSpeed, fill_status) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.index = index;
    this.scale = scale;
    this.speed = speed;

    this.easeInSpeed = easeInSpeed;

    this.obj = objModel;
    this.name = "n" + index;

    this.fill_status = fill_status;

    this.xEase = this.x;
    this.yEase = this.y;
    this.zEase = this.z;

    this.sX = this.scale;
    this.sY = this.scale;
    this.sZ = this.scale;

    this.sXEase = this.sX;
    this.sYEase = this.sY;
    this.sZEase = this.sZ;

    this.r = 0;
    this.rHist = this.r;
    this.rEase = this.r;

    this.accel = 1.06;

    this.zEaseHist;

    this.strokeWeight = 0.3;

    this.opacity = 255;
    this.opaEase = this.opacity;

    this.inScene = 0;
  }

  updateScene(e) {
    this.inScene = e;
  }

  shake() {
    this.x += random(-1, 1) * 5;
    this.y += random(-1, 1) * 5;
    this.z += random(-1, 1) * 5;
  }

  strongShake() {
    this.x += random(-2, 2) * 10;
    this.y += random(-2, 2) * 10;
    this.z += random(-2, 2) * 10;
  }

  newScale() {
    this.sX = random(2) + 0.6;
    this.sY = random(2) + 0.6;
    this.sZ = random(2) + 0.6;
  }

  normalScale() {
    this.sX = 1;
    this.sY = 1;
    this.sZ = 1;
  }

  hideScale() {
    this.sX = 0;
    this.sY = 0;
    this.sZ = 0;
  }

  newScale2() {
    this.sX = random(2) + 0.3;
    this.sY = random(2) + 0.3;
    this.sZ = random(2) + 0.3;
  }

  wingShape() {
    this.sX = 2 + random() * 3;
    this.sY = 0.5 + random();
    this.sZ = random() * 0.8;
  }

  cruiserDimension() {
    this.sX = 2 + random(5) * 4;
    this.sY = 2 + random(5) * 4;
    this.sZ = 2 + random(5) * 6;
  }

  cruiserDimension2() {
    this.sX = 0.3 + random() * 0.6;
    this.sY = 0.3 + random() * 0.6;
    this.sZ = 1 + random(1);
  }

  rotatexWing() {
    rotateZ(PI / 2);
  }

  rotateOnY() {
    rotateY(PI / 2);
  }
  rotateOnX() {
    rotateX(PI / 2);
  }

  newPos() {
    if (this.x != 0) {
      this.x = -220;
    } else if (this.y != 0) {
      this.y = -220;
    } else if (this.z != 0) {
      this.z = -220;
    }
  }

  newPosExplo(x, y, z) {
    this.x = random(-10, 10) * x;
    this.y = random(-10, 10) * y;
    this.z = random(-10, 10) * z;
  }

  newPosExplo2() {
    this.x = random(-10, 10) * 20;
    this.y = random(-10, 10) * 20;
    this.z = random(-10, 1) * 20;
  }

  regroup() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  rotateEngine() {
    rotateZ(millis() / 50);
  }

  slowRegroup() {
    setTimeout(() => {
      this.x = 0;
      setTimeout(() => {
        this.y = 0;
        setTimeout(() => {
          this.z = 0;
        }, 480)
      }, 480)
    }, 480)
  }

  disperse() {
    this.x = random(-1, 1) * 5000;
    this.y = random(-1, 1) * 5000;
    this.z = random(-1, 1) * 5000;
  }

  slideZ() {
    this.z += 15;
  }

  easeScale(easeSpeed) {
    this.sXEase = easeIn(this.sXEase, this.sX, easeSpeed);
    this.sYEase = easeIn(this.sYEase, this.sY, easeSpeed);
    this.sZEase = easeIn(this.sZEase, this.sZ, easeSpeed);
  }

  easeTranslate(easeSpeed){
    this.xEase = easeIn(this.xEase, this.x, easeSpeed);
    this.yEase = easeIn(this.yEase, this.y, easeSpeed);
    this.zEase = easeIn(this.zEase, this.z, easeSpeed);
  }

  easeRotation(easeSpeed){
    this.rEase = easeIn(this.rEase, this.r, easeSpeed); 
  }

  show() {
    this.easeScale(this.easeInSpeed);
    this.easeTranslate(this.easeInSpeed);
    this.easeRotation(this.easeInSpeed);

    if (this.fill_status) {
      fill(255, this.opacity);
      noStroke();
    } else {
      noFill();
      stroke(wire_col, this.opacity)
    }

    push();
    scale(this.sXEase, this.sYEase, this.sZEase);
    translate(this.xEase, this.yEase, this.zEase);
    ambientMaterial(255);
    model(this.obj);
    pop();
  }
}

function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5 ? pow(2, 20 * x - 10) / 2
        : (2 - pow(2, -20 * x + 10)) / 2;
}

let myFont, pencil_parts_2 = [];
let reScaleObject = false;
let copyFullPencil = [];

function preload() {
  myFont = loadFont('assets/Roboto-Regular.ttf');

  //for (var i = 0; i < 13; i++) {
  //  let newObj = loadModel('./mouse/parts/mouse_(' + (i + 1) + ').obj', reScaleObject);
  //  let part = new mouseParts(newObj, i, i, 1);
  //  mouse_parts.push(part);
  //}

  for (var i = 0; i < 17; i++) {
    let newObj = loadModel('./pencil/parts/newPen_(' + (i + 1) + ').obj', !reScaleObject);
    //let newObj = loadModel('./pencil/parts/pens_(' + (i + 1) + ').obj', reScaleObject);
    let part = new Parts(newObj, i + 1, 0, 0, 0, 1, zMaxSpeed, speed3, true);
    copyFullPencil.push(part);
    pencil_parts.push(part);
  }

  planeParts = [copyFullPencil[2], copyFullPencil[4], copyFullPencil[5], copyFullPencil[6], copyFullPencil[12], copyFullPencil[16]]

  for (var i = 0; i < 17; i++) {
    let newObj = loadModel('./pencil/parts/newPen_(' + (i + 1) + ').obj', reScaleObject);
    //let newObj = loadModel('./pencil/parts/pens_(' + (i + 1) + ').obj', reScaleObject);
    let part = new Parts(newObj, i + 1, 0, 0, 0, 1, zMaxSpeed, speed3, true);
    pencil_parts_2.push(part);
  }
  fill_row();
  build_full_pencil();
}

function fill_row() {
  for (let i = 0; i < 15; i++) {
    //let newMouseItem = new mouseParts(mouse_parts[randomMouseObj].obj, randomMouseObj, xPosInit, 0, 0, 1, zMaxSpeed);
    //let randomMouseObj = Math.floor(random(mouse_parts.length));
    //mouse_row.push(newMouseItem);
    let randomPencilObj = Math.floor(random(pencil_parts.length));
    let newPencilItem = new Parts(pencil_parts[randomPencilObj].obj, randomPencilObj, 0, 0, 0, 1, zMaxSpeed, speed3, true);
    pencil_row.push(newPencilItem);
  }
  spawnPencilParts();
}


let scene2_rythme = 800;
function spawnPencilParts() {
  pencil_row.splice(0, 1);
  let randomPencilObj = Math.floor(random(pencil_parts.length));
  let newPencilItem = new Parts(pencil_parts[randomPencilObj].obj, randomPencilObj, 0, 0, 0, 1, zMaxSpeed, speed3, true);
  pencil_row.push(newPencilItem);
  //setTimeout(() => {
  //  spawnPencilParts();
  //}, scene2_rythme);
}

let cam;
function setup() {
  createCanvas(WiW, WiH, WEBGL);

  cam = camera(0, 0, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);
  perspective(PI / 2.5, width / height, 0.1, 20000);

  zoomIn = 5;
  //ortho(-WiW / zoomIn, WiW / zoomIn, -WiH / zoomIn, WiH / zoomIn, -5000, 5000);

  textFont(myFont);
  textSize(10);
}

let light_col = 255;
let rotate_x_target = 0, rotate_y_target = 0, rotate_z_target = 0, rotate_x = 0, rotate_y = 0, rotate_z = 0;

let translate_x = 0, translate_y = 0, translate_z = 0;
let translate_x_target = 0, translate_y_target = 0, translate_z_target = 0;

let newC4Ease = 0;
let zoomEase = 0;

let keyboardInput_activated = true;

function draw() {
  if (explosion) {
    if (frameCount % 6 == 0) {
      background('rgba(0,0,0,2)');
    }
  } else {
    background('rgba(0,0,0,0)');
  }

  if (keyboardInput_activated){
    sceneMovementSpeed(speed3, speed3);
  }

  zoomEase = easeIn(zoomEase, zoom_param, speed4);

  trZEase = easeIn(trZEase, trZ, speed2);

  wire_col = color(col_wire.value);
  light_col = color(col_spot.value);

  push();

  scale(zoomEase);
  rotateX(-rotate_x_target);
  rotateY(rotate_y_target);
  rotateZ(rotate_z_target);
  translate(translate_x_target, translate_y_target, translate_z_target);

  // switch (scenePlaying) {
  //   case 0:
  //     input_scene();
  //     break;
  //   case 1:
  //     setup_scene1();
  //     break;
  //   case 2:
  //     setup_scene2();
  //     break;
  //   case 3:
  //     setup_scene3();
  //     break;
  //   case 4:
  //     setup_scene4();
  //     break;
  //   case 5:
  //     setup_scene5();
  //     break;
  //   case 6:
  //     setup_scene6();
  //     break;
  // }

  switch (scenePlaying) {
    case 0:
      s0();
      break;
    case 1:
      //setup_scene1();
      if (show_pencil) {
        show_full_pencil();
      }
      break;
    case 2:
      setup_scene2_1();
      if (show_pencil) {
        show_full_pencil();
      }
      break;
    case 3:
      s3_makeShip();
      setup_scene2_1();
      //setup_scene3();
      break;
    case 4:
      s3_makeShip();
      setup_scene2_1();
      setup_scene6();
      break;
    case 5:
      setup_scene5();
      break;
    case 6:
      break;
  }
  pop();
}

function easeIn(from, to, ease) {
  return from + (to - from) * ease;
}

function chance(c) {
  return random(1) < c;
}