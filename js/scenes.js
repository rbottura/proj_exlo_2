//const { Forwarder } = require("webmidi");

// EACH ONE OF THIS FUNCTION IS CALLED IN DRAW()
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
    if (e < 5) {
        sendMidi1();
    }
    for (let i = 0; i < SCENES.length; i++) {
        if (i != e) {
            SCENES[i] = false;
        } else {
            SCENES[i] = true;
        }
    }
    if (e == 3) {
        cutAndPush3();
        setTimeout(() => {
            rotate_x = 0;
            rotate_y = 0;
        }, 1000);
    }
    if (e == 5) {
        setTimeout(() => {
            startS5 = true;
        }, 2000);
        for (let i = 0; i < pencilRow3.length; i++) {
            pencilRow3[i].regroup();
        };
    }
}


// Listes des mouvements utilisés, exemple avec la scene 0 nommé : s0(); 
// rotation [SCENE] X, Y; & translation [SCENE] X, Z; translate [PARTS] X, Y, Z; idem w/ != easeSpeed;

function sceneMovementSpeed(rotateSpeed, translateSpeed) {
    rotate_x_target = easeIn(rotate_x_target, rotate_x, rotateSpeed);
    rotate_y_target = easeIn(rotate_y_target, rotate_y, rotateSpeed);
    rotate_z_target = easeIn(rotate_z_target, rotate_z, rotateSpeed);

    translate_x_target = easeIn(translate_x_target, translate_x, translateSpeed);
    translate_y_target = easeIn(translate_y_target, translate_y, translateSpeed);
    translate_z_target = easeIn(translate_z_target, translate_z, translateSpeed);
}

// TEMPLATE D'UNE GRAMMAIRE POUR FONCTION DE SCENE

function scene_type(){
    // LIGTHS

    // SCENE MOVEMENT SPEED

}

function input_scene() {
    moove_gate_in_val = moove_gate_in.value;
    moove_gate_out_val = moove_gate_out.value;

    gate_in = moove_gate_in_val;
    gate_out = moove_gate_out_val;

    rotate_y = elem_rotate_y.value;
    rotate_x = elem_rotate_x.value;

    //zoom_param = elem_zoom_param.value;
    strokeWeight_all_val = strokeWeight_all.value;

    trZ = elem_trZ.value;

    spawn_rythme = spawn_speed_input.value;
}

let strokeEaseS3 = 0;

function setup_scene1() {
    directionalLight(255, 255, 255, 0, 0, -1);
    strokeEaseS3 = easeIn(strokeEaseS3, 2, speed2);

    sceneMovementSpeed(0.04, 0.1);

    //zoom_param = 0.80;

    noStroke();
    pencil_row[0].show();
}

function setup_scene2() {
    directionalLight(255, 255, 255, 0, 0, -1);
    strokeEaseS3 = easeIn(strokeEaseS3, 2, speed2);

    push();
    noFill();
    stroke(255);
    strokeWeight(strokeEaseS3);
    box(500)
    pop();

    //zoom_param = 0.85;
    noStroke();
    pencil_row[0].show();
}

let pencilRow3 = [];

setTimeout(fillScene3, 5000);
setTimeout(cutAndPush3, 6000);

function fillScene3() {
    for (let i = 0; i < 6; i++) {
        let randomPencilObj = Math.floor(random(pencil_parts.length));
        let newPencilItem = new Parts(pencil_parts[randomPencilObj].obj, randomPencilObj, 0, 0, 0, 1, zMaxSpeed);
        pencilRow3.push(newPencilItem);
    }
    cutAndPush3();
}

let cutAndPush3_speed = 300;

function cutAndPush3() {
    if (SCENES[3]) {
        //console.log("djdjjdjd");
        pencilRow3.splice(0, 1);
        let randomPencilObj = Math.floor(random(pencil_parts.length));
        let newPencilItem = new Parts(pencil_parts[randomPencilObj].obj, randomPencilObj, 0, 0, 0, 1, zMaxSpeed);
        pencilRow3.push(newPencilItem);
        setTimeout(() => {
            cutAndPush3();
        }, cutAndPush3_speed);
    }
}

function setup_scene3() {
    cutAndPush3_speed = 300;
    directionalLight(255, 255, 255, 0, 0, -1);
    strokeEaseS3 = easeIn(strokeEaseS3, 0, speed2);

    push();
    noFill();
    stroke(255);
    strokeWeight(strokeEaseS3);
    box(500)
    pop();

    noStroke();
    //stroke(255, 124, 26);
    //strokeWeight(1);
    for (let i = 0; i < pencilRow3.length; i++) {
        pencilRow3[i].show();
        pencilRow3[i].slideZ();
    }
}

function setup_scene4() {
    //strokeEaseS3 = easeIn(strokeEaseS3, 0, speed2);
    directionalLight(255, 255, 255, 0, 0, -1);
    rotate_z = 0;
    noStroke();

    //strokeWeight(strokeEaseS3);
    push();
    translate(0, 0, -200);
    for (let i = 0; i < pencil_row.length; i++) {
        pencil_row[i].show();
    }
    pop();

    for (let i = 0; i < pencilRow3.length; i++) {
        pencilRow3[i].show();
    }
}


let startS5 = false;
function sendShipMidi() {
    //let output = WebMidi.outputs[0];
    //let channel = output.channels[2];
    //channel.playNote("C8");
    //startS5 = true;
}


function setup_scene5() {
    strokeEaseS3 = easeIn(strokeEaseS3, 0, speed2);
    //let mapC5 = map(note_c5,60,127,0,255);
    directionalLight(255, 255, 255, 0, 0, -1);

    //let s3_ship = new Ship(0, 0, 0, 0.5, 15, false);
    //for (let i = 0; i < s3_ship.deck.length; i++) {
    //    s3_ship.deck[i].obj = pencilRow3[i].obj;
    //    s3_ship.deck[i].sX = pencilRow3[i].sX;
    //    s3_ship.deck[i].sY = pencilRow3[i].sY;
    //    s3_ship.deck[i].sZ = pencilRow3[i].sZ;
    //}

    noStroke();

    if (startS5) {
        for (let i = 0; i < Ships.length; i++) {
            Ships[i].show();
        }
        for (let i = 0; i < Ships2.length; i++) {
            Ships2[i].show();
        }
    } else {
        zoom_param = 0.1;
        for (let i = 0; i < pencilRow3.length; i++) {
            pencilRow3[i].show();
        }
    }
}


function setup_scene6() {
    cruiserSpawning = true;
    explosion = false;
    if (showGates) {
        //directionalLight(255, 255, 255, 0, 0, -1);
        if (openGate) {
            directionalLight(0, 220, 0, -1, 0, 0);
            directionalLight(0, 220, 0, 1, 0, 0);
        } else {
            directionalLight(220, 0, 0, -1, 0, 0);
            directionalLight(220, 0, 0, 1, 0, 0);
        }

        push();
        translate(0, 0, 0);

        noStroke();
        //PUSH SHIPS 1
        push()
        rotateY(PI / 2);
        translate(1000, 0, -1800);
        if (openGate) {
            Walls[0].openGate();
        } else {
            Walls[0].closeGate();
        }
        for (let i = 0; i < Ships.length; i++) {
            Ships[i].show();
        }
        pop();

        //PUSH SHIPS 2
        push()
        rotateY(-PI / 2);
        translate(1000, 0, -1800);
        if (openGate) {
            Walls[1].openGate();
        } else {
            Walls[1].closeGate();
        }
        for (let i = 0; i < Ships2.length; i++) {
            Ships2[i].show();
        }
        pop();

        if (cruiserSpawning) {
            for (let i = 0; i < Cruisers.length; i++) {
                Cruisers[i].show();
            }
        }

        pop();
        //if (showBuidlingMesh_active) {
        //  for (let i = 0; i < Skycrappers.length; i++) {
        //    Skycrappers[i].show();
        //  }
        //  loopBuildingMesh();
        //}
    }
}


let fullPencil = [], show_pencil = false;
setTimeout(() => {
    show_pencil = true;
}, 5000);

function build_full_pencil() {
    let tip = [];
    let end = [];
    let tube = [];
    let top = [];
    let rode = [];
    for (let i = 0; i < pencil_parts.length; i++) {
        let index = pencil_parts[i].index;
        //console.log(index);
        if (index == 1 || index == 14 || index == 15) {
            console.log(index);
            tube.push(pencil_parts[i]);
        } else if (index == 2 || index == 3 || index == 6 || index == 11 || index == 12 || index == 16) {
            tip.push(pencil_parts[i]);
        } else if (index == 5 || index == 9 || index == 17) {

            end.push(pencil_parts[i]);
        } else if (index == 4 || index == 7 || index == 8 || index == 13) {
            top.push(pencil_parts[i]);
        } else if (index == 10) {
            rode.push(pencil_parts[i]);
        }

    }
    fullPencil.push(top);
    fullPencil.push(tube);
    fullPencil.push(tip);
    fullPencil.push(end);
    fullPencil.push(rode);
}

let burner1 = [1];

let explosion = false;
function shakePencilParts() {
    //console.log("shake");
    if (explosion) {
        for (let i = 0; i < pencil_parts_2.length; i++) {
            pencil_parts_2[i].shake();
        }
    }
}

function s0() {
    if (SCENES[0]) {
        lights();
    }

    sceneMovementSpeed(speed3, speed3)

    push();
    noFill();
    stroke(255);
    strokeWeight(2);
    box(500)
    pop();

    push()
    rotateX(-PI / 2);
    noStroke();
    scale(2);
    for (let i = 0; i < pencil_parts_2.length; i++) {
        pencil_parts_2[i].show();
    }

    pop()
}

function show_full_pencil() {
    if (SCENES[1]) {
        zoom_param = 0.95;
        if (burner1.length == 0) {
            translate_x = 0;
            translate_y = 0;
            translate_z = 0;
            for (let i = 0; i < pencil_parts_2.length; i++) {
                pencil_parts_2[i].regroup();
            }
            burner1.push(1);
        }
        lights();
    }
    
    sceneMovementSpeed(speed3, speed3)

    push();
    noFill();
    stroke(255);
    if (explosion) {
        strokeWeight(random(2));
    } else {
        strokeWeight(2);
    }
    box(500)
    pop();

    push()
    rotateX(-PI / 2);
    noStroke();
    scale(2);
    if (SCENES[2]) {
        if (burner1.length > 0) {
            for (let i = 0; i < pencil_parts_2.length; i++) {
                pencil_parts_2[i].newPosExplo(10, 10, 10);
            }
            zoom_param = 0.36;
            burner1.splice(0, 1);
        }
    }
    shakePencilParts();
    for (let i = 0; i < pencil_parts_2.length; i++) {
        pencil_parts_2[i].show();
    }

    pop()
}

let strokeEaseS4 = 2;
function setup_scene2_1() {
    if (SCENES[2]) {

        zoom_param = 0.35;
        //directionalLight(255, 255, 255, 0, 0, -1);
        directionalLight(255, 255, 255, 0, 0, -1);
    }

    sceneMovementSpeed(speed3, speed3)

    for (let i = 0; i < copyFullPencil.length; i++) {
        push();
        if (SCENES[3]) {
            translate(-5400, 0, 0);
        }

        translate((i + 1) * 600, 0, 0);
        if (SCENES[2]) {
            rotateX(-PI / 2);
        }

        push();
        noFill();
        stroke(255);
        if (SCENES[4]) {
            strokeEaseS4 = easeIn(strokeEaseS4, 0, speed2);
            strokeWeight(strokeEaseS3);
            for (let i = 0; i < copyFullPencil.length; i++) {
                copyFullPencil[i].hideScale();
            }
        } else {
            strokeWeight(2);
        }
        box(500)
        pop();

        noStroke();
        //stroke(255, 0, 0)
        //strokeWeight(1)
        scale(2)
        copyFullPencil[i].show();

        pop();
    }
}


let planeParts = [];

function translatePlanParts() {
    push();
    setTimeout(() => {
        for (let i = 0; i < planeParts.length; i++) {
            translate(0, 600 + i * 600, 0);
            planeParts[i].show();
            //planeParts[i].y = (600 + i * 600);
            console.log(" go to 600 y")
        } setTimeout(() => {
            for (let i = 0; i < planeParts.length; i++) {
                //translate()
                //planeParts[i].x = -600 * planeParts[i].index;
                console.log(" go to 0 x")
            } setTimeout(() => {
                for (let i = 0; i < planeParts.length; i++) {
                    //translate()
                    //planeParts[i].z = 5000;
                    console.log(" go to 5000 z")
                } setTimeout(() => {
                    for (let i = 0; i < planeParts.length; i++) {
                        //translate()
                        //planeParts[i].x = 4800;
                        console.log(" go to 0 x")
                    } setTimeout(() => {
                        for (let i = 0; i < planeParts.length; i++) {
                            //translate()
                            //planeParts[i].y = -600;
                        }
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

document.addEventListener("click", function () {
    for (let i = 0; i < planeParts.length; i++) {
        push();
        translate(0, 600, 0);
        planeParts[i].show();
        pop();
    }
})

function s3_makeShip() {
    explosion = false;
    if (SCENES[3]) {
        //console.log("tatattataa");
        directionalLight(255, 255, 255, 0, 0, -1);
        translate_x = -0;
        translate_z = -6000;
        //lights();
    } else if (SCENES[4]) {
        directionalLight(255, 255, 255, 0, 0, -1);
        if (burner1.length == 0) {
            translate_x = 0;
            translate_z = -2000;
            burner1.push(1);
        }
    }

    sceneMovementSpeed(speed3, speed3)
    //move scene to -7200 : z & x : -4800

    //translate(-4800, 600, -7200);

    //then launch obj one by one on Y + 1 axis


}