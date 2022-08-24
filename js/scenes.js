let scenePlaying = 0;

let SCENE0 = true;
let SCENE1 = false;
let SCENE2 = false;
let SCENE3 = false;
let SCENE4 = false;
let SCENE5 = false;
let SCENE6 = false;

let SCENES = [SCENE0, SCENE1, SCENE2, SCENE3, SCENE4, SCENE5, SCENE6];

function checkScene(e) {
    for (let i = 0; i < pencil_parts_2.length; i++) {
        pencil_parts_2[i].updateScene(e);
    }
}

// Listes des mouvements utilisés, exemple avec la scene 0 nommé : s0(); 
// rotation [SCENE] X, Y; & translation [SCENE] X, Z; translate [PARTS] X, Y, Z; idem w/ != easeSpeed;

let translate_x = 0, translate_y = 0, translate_z = 0;
let translate_x_target = 0, translate_y_target = 0, translate_z_target = 0;
let rotate_x_target = 0, rotate_y_target = 0, rotate_z_target = 0, rotate_x = 0, rotate_y = 0, rotate_z = 0;

function sceneMovementSpeed(rotateSpeed, translateSpeed) {
    rotate_x_target = easeIn(rotate_x_target, rotate_x, rotateSpeed);
    rotate_y_target = easeIn(rotate_y_target, rotate_y, rotateSpeed);
    rotate_z_target = easeIn(rotate_z_target, rotate_z, rotateSpeed);

    translate_x_target = easeIn(translate_x_target, translate_x, translateSpeed);
    translate_y_target = easeIn(translate_y_target, translate_y, translateSpeed);
    translate_z_target = easeIn(translate_z_target, translate_z, translateSpeed);
}

// TEMPLATE D'UNE GRAMMAIRE POUR FONCTION DE SCENE

function scene_type() {
    // LIGTHS

    // SCENE MOVEMENT SPEED

}

let ship_0;
function loadShip0() {
    ship_0 = new Ship(0, 0, 0, 1, 0, false);
}

function Scene_0(loaded) {
    if (loaded) {
        directionalLight(255, 255, 255, 0, 0, -1);
        //lights(155);
        sceneMovementSpeed(speed4, speed4);

        push()
        //rotateZ(PI/2);
        //fill(255,255,255);
        noFill();
        stroke(0, 0, 0);
        strokeWeight(0.5);
        //sphere(350,20,20);
        box(650, 350, 750, 2, 2);
        pop();

        ship_0.show();

        if (meshBuildingLoaded) {
            //loadMidMeshBuilding();
        }
    } else {
        //console.log("not loaded")
    }
}

function easeIn(from, to, ease) {
    return from + (to - from) * ease;
}

function chance(c) {
    return random(1) < c;
}

function easeInOutExpo(x) {
    return x === 0
        ? 0
        : x === 1
            ? 1
            : x < 0.5 ? pow(2, 20 * x - 10) / 2
                : (2 - pow(2, -20 * x + 10)) / 2;
}