class Engine {
    constructor(x, y, z, scale) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.scale = scale;

        this.engineParts = [];

        for (let i = 0; i < 3; i++) {
            let newEnginePart = new Parts(pencil_parts[5].obj, 5, 0, 0, 0, 1, 1, speed3, true);
            this.engineParts.push(newEnginePart);
        }
        this.engineParts[0].sX = 1.5;
        this.engineParts[0].sY = 1.5;
        this.engineParts[0].sZ = 0.6;

        this.engineParts[1].sX = 0.05;
        this.engineParts[1].sZ = 0.6;

        this.engineParts[2].sY = 0.05;
        this.engineParts[2].sZ = 0.6;
    }

    show() {

        push();
        translate(this.x, 0, 0);
        scale(this.scale);
        for (let i = 0; i < this.engineParts.length; i++) {
            if (i >= 1) {
                this.engineParts[i].rotateEngine();
            }
            this.engineParts[i].show();
        }
        pop();
    }
}

class Ship {
    constructor(x, y, z, scale, speed, isCruiser) {
        this.deck = [];
        this.x = x;
        this.y = y;
        this.z = z;

        this.gate1 = -100;
        this.gate2 = 500;

        this.xEase = x;
        this.yEase = y;
        this.zEase = z;

        this.scale = scale;
        this.speed = speed;
        this.speedEase = this.speed;

        this.partCruiser = isCruiser;

        let newDeckPart1 = new Parts(pencil_parts[3 - 1].obj, 1, 0, 0, 0, 1, 1, speed3, true);
        let newDeckPart2 = new Parts(pencil_parts[5 - 1].obj, 1, 0, 0, 0, 1, 1, speed3, true);
        let newDeckPart3 = new Parts(pencil_parts[6 - 1].obj, 1, 0, 0, 0, 1, 1, speed3, true);
        let newDeckPart4 = new Parts(pencil_parts[7 - 1].obj, 1, 0, 0, 0, 1, 1, speed3, true);
        let newDeckPart5 = new Parts(pencil_parts[13 - 1].obj, 1, 0, 0, 0, 1, 1, speed3, true);
        let newDeckPart6 = new Parts(pencil_parts[17 - 1].obj, 1, 0, 0, 0, 1, 1, speed3, true);
        this.deck.push(newDeckPart1);
        this.deck.push(newDeckPart2);
        this.deck.push(newDeckPart3);
        this.deck.push(newDeckPart4);
        this.deck.push(newDeckPart5);
        this.deck.push(newDeckPart6);

        for (let i = 0; i < this.deck.length; i++) {
            if (i == 3) {
                this.deck[i].wingShape();
            } else {
                this.deck[i].newScale();
            }
        }
    }
    wait() {
        this.speed = 0;
    }
    go() {
        this.speed = 15;
    }
    show() {
        this.speedEase = easeIn(this.speedEase, this.speed, speed3);

        if (!this.partCruiser) {
            if ((this.zEase > this.gate1 - this.speedEase * 10) && (this.zEase < this.gate2)) {
                this.zEase += this.speedEase;
            } else if (this.zEase >= this.gate2) {
                this.zEase = this.zEase * 1.08;
            } else if (this.zEase < this.gate1) {
                this.zEase = easeIn(this.zEase, this.gate1, this.speedEase / 200);
            }
        }

        push();
        noStroke();
        scale(0.2 + this.scale);
        translate(this.xEase, this.yEase, this.zEase);
        for (let i = 0; i < this.deck.length; i++) {
            this.deck[i].show();
        }
        pop();
    }
}

class Cruiser {
    constructor(x, y, z, scale, speed, xWing, nmbrEngines) {

        this.x = x;
        this.y = y;
        this.z = z;

        this.gate1 = -250;
        this.gate2 = 250;

        this.xEase = x;
        this.yEase = y;
        this.zEase = z;

        this.scale = scale;
        this.speed = speed;

        this.ship = new Ship(0, 0, 0, this.scale, 0, true);

        if (xWing) {
            let xWingPart = new Parts(pencil_parts[7 - 1].obj, 1, 0, 0, 0, 1, 1, speed3, true);
            this.ship.deck.push(xWingPart);
        }

        this.megaWingScaleX = 5 + random() * 3;
        this.megaWingScaleY = 0.5 + random();
        this.megaWingScaleZ = 1 + random() * 1.5;

        for (let i = 0; i < this.ship.deck.length; i++) {
            if (i == 3) {
                this.ship.deck[i].sX = this.megaWingScaleX;
                this.ship.deck[i].sY = this.megaWingScaleY;
                this.ship.deck[i].sZ = this.megaWingScaleZ;

                this.ship.deck[6].sX = this.megaWingScaleX - this.megaWingScaleX / 1.5;
                this.ship.deck[6].sY = this.megaWingScaleY;
                this.ship.deck[6].sZ = this.megaWingScaleZ;

            } else if (i < 6) {
                this.ship.deck[i].cruiserDimension();
            }
        }

        let engine1 = new Engine(-this.megaWingScaleX * 80, 0, 0, 6);
        let engine2 = new Engine(this.megaWingScaleX * 80, 0, 0, 6);

        this.engines = [engine1, engine2];
    }
    stop() {
        this.zEase = 50000;
        this.speed = 0;
    }
    show() {

        if ((this.zEase > this.gate1 - 320) && (this.zEase < this.gate2)) {
            this.zEase += this.speed;
        } else if (this.zEase >= this.gate2) {
            this.zEase = this.zEase * 1.06;
        } else if (this.zEase < this.gate1) {
            this.zEase = easeIn(this.zEase, this.gate1, this.speed / 200);
        }

        push();
        scale(this.scale);
        translate(this.x, this.y, this.zEase);

        for (let i = 0; i < this.engines.length; i++) {
            this.engines[i].show();
        }
        this.ship.show();
        pop();
    }
}

let Cruisers = [], nmbrCruiser = 1;
function loadCruiser() {
    for (let i = 0; i < nmbrCruiser; i++) {
        let newCruiser = new Cruiser(0, 0, -25000, 1, 15, true);
        Cruisers.push(newCruiser);
    }
}

let Ships = [], nmbrShips = 6;
function loadShips() {
    for (let i = 0; i < nmbrShips; i++) {
        let newShip = new Ship(Math.floor(random(-10, 10)) * 200, Math.floor(random(-10, 10)) * 200, -5000, 0.5, 25, false);
        Ships.push(newShip);
    }
}

let Ships2 = [], nmbrShips2 = 6;
function loadShips2() {
    for (let i = 0; i < nmbrShips2; i++) {
        let newShip = new Ship(Math.floor(random(-10, 10)) * 100, Math.floor(random(-10, 10)) * 50, -5000, 0.5, 15, false);
        Ships2.push(newShip);
    }
}

let Skycrappers = [], nmbrSkycrappers = 1;
function loadSkycrapper() {
    for (let i = 0; i < nmbrSkycrappers; i++) {
        let newSkycrapper = new Skycrapper(60, 60, 2);
        Skycrappers.push(newSkycrapper);
    }
}

let xShip = 20;
let shipsRythme = 2600; 
function spawnShips() {
    //console.log("spawnShips " + Ships.length);
    Ships.splice(0, 1);
    Ships2.splice(0, 1);
    let newShip = new Ship(Math.floor(random(-10, 10)) * xShip, Math.floor(random(-10, 10)) * xShip, -5000, 0.5, 35, false);
    let newShip2 = new Ship(Math.floor(random(-10, 10)) * xShip, Math.floor(random(-10, 10)) * xShip, -5000, 0.5, 35, false);
    Ships.push(newShip);
    Ships2.push(newShip2);
    setTimeout(spawnShips, shipsRythme);
}

let cruiserSpawning = false;
function spawnCruiser() {
    if(cruiserSpawning){
        console.log("cruiser spawning");
        cruiserSound();
        Cruisers.splice(0, 1);
        let newCruiser = new Cruiser(0, 0, -25000, 1, 15, true);
        Cruisers.push(newCruiser);
        setTimeout(() => {
            //console.log("sjsjsjsj");
            Approache = true;
        }, 11000);
    }
    setTimeout(spawnCruiser, 12000);
}

let Approache = true;
function checkGate() {
    if (!Approache) {
        openGate = true;
    } else if (Approache) {
        //console.log("clooooose " + Cruisers[0].zEase);
        openGate = false;
        setTimeout(() => {
            if (Cruisers[0].zEase > Cruisers[0].gate2 + 1000) {
                Approache = false;
            }
        }, 1000);
    }
    setTimeout(() => {
        checkGate();
    }, 1);
}

setTimeout(() => {
    showGates = true;
    loadCruiser();
    loadShips();
    loadShips2();
    laodWalls();
    loadSkycrapper();
    showBuidlingMesh();
    checkGate();
}, 5000);

setTimeout(() => {
    spawnCruiser();
    spawnShips();
}, 10000)

setTimeout(() => {
    showBuidlingMesh_active = true;
}, 12000);

class Skycrapper {
    constructor(scaleX, scaleY, scaleZ, filling) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.scaleZ = scaleZ;
        this.filling = filling;

        let buildingStage1 = new Parts(pencil_parts[16].obj, 10, 0, 0, 0, 1, 0);
        //let buildingStage2 = new Parts(pencil_parts[16].obj, 10, 0, 0, 150, 1, 0);
        //let buildingStage3 = new Parts(pencil_parts[16].obj, 10, 0, 0, 300, 1, 0);

        //this.body = [buildingStage1, buildingStage2, buildingStage3];
        this.body = [buildingStage1];

    }
    show() {
        push()
        for (let i = 0; i < this.body.length; i++) {
            this.body[i].rotateOnX();
        }
        translate(0, -1500, -1000);
        scale(this.scaleX, this.scaleY, this.scaleZ);
        for (let i = 0; i < this.body.length; i++) {
            this.body[i].show();
        }
        pop();
    }
}

let showBuidlingMesh_active = false;
let buildingMesh = [];

function showBuidlingMesh() {
    for (let i = 0; i < Skycrappers.length; i++) {
        for (let j = 0; j < Skycrappers[i].body.length; j++) {
            for (k = 0; k < Skycrappers[i].body[j].obj.vertices.length - 1; k++) {
                let newVecor = createVector(Skycrappers[i].body[j].obj.vertices[k].x, Skycrappers[i].body[j].obj.vertices[k].y, Skycrappers[i].body[j].obj.vertices[k].z);
                buildingMesh.push(newVecor);
                //line(Skycrappers[i].body[j].obj.vertices[k].x, Skycrappers[i].body[j].obj.vertices[k].y, Skycrappers[i].body[j].obj.vertices[k].z, Skycrappers[i].body[j].obj.vertices[k + 1].x, Skycrappers[i].body[j].obj.vertices[k + 1].y, Skycrappers[i].body[j].obj.vertices[k + 1].z)
            }
        }
    }
}

function showRandomLine() {
    let randomArray = [];
    for (let i = 0; i < 30; i++) {
        let randomNumber = Math.floor(random(buildingMesh.length - 2));
        randomArray.push(randomNumber);
    }
    for (let i = 0; i < randomArray.length; i++) {
        stroke(255, 255, 255)
        strokeWeight(3);
        push();
        rotateX(-PI / 2.0);
        translate(0, -1500, -1000);
        scale(65, 65, 3);
        line(buildingMesh[randomArray[i]].x, buildingMesh[randomArray[i]].y, buildingMesh[randomArray[i]].z, buildingMesh[randomArray[i] + 1].x, buildingMesh[randomArray[i] + 1].y, buildingMesh[randomArray[i] + 1].z)
        pop();
    }
}

let loopOne = true;
let randomArray = [];
function loopBuildingMesh() {
    console.log(randomArray[0]);
    if (loopOne) {
        for (let i = 22000; i < 22040; i++) {
            let randomNumber = i;
            randomArray.push(randomNumber);
        }
        loopOne = false;
    }
    for (let i = 0; i < randomArray.length; i++) {
        if (randomArray[i] >= 25000) {
            randomArray[i] = 22000;
        } else {
            for (let j = 0; j < randomArray.length; j++) {
                randomArray[j] += 1;
            }
        }
        stroke(255, 255, 255)
        strokeWeight(3);
        push();
        rotateX(PI / 2.0);
        translate(0, -1500, -1000);
        scale(64, 65, 3);
        line(buildingMesh[randomArray[i]].x, buildingMesh[randomArray[i]].y, buildingMesh[randomArray[i]].z, buildingMesh[randomArray[i] + 1].x, buildingMesh[randomArray[i] + 1].y, buildingMesh[randomArray[i] + 1].z)
        pop();
    }
}

let Walls = [], nmbrWalls = 2;
class Wall {
    constructor(x, y, z, scale) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.scale = scale;
        this.sEase = this.scale;
    }
    closeGate() {
        this.scale = 1.6;
        this.sEase = easeIn(this.sEase, this.scale, speed4);
        for (let i = 0; i < Ships.length; i++) {
            Ships[i].wait();
            Ships2[i].wait();
        }
        push()
        translate(0, 0, 500);
        strokeWeight(2);
        stroke(255, 0, 0);
        line(-1500, -500, 0, 500, -500, 0);
        noFill();
        scale(this.sEase);
        for (let i = 0; i < 5; i++) {
            line(i * 100 - 250, -250, 0, i * 100 - 250, 250, 0);
        }
        plane(500, 500);
        pop();
    }
    openGate() {
        this.scale = 2;
        this.sEase = easeIn(this.sEase, this.scale, speed4);
        for (let i = 0; i < Ships.length; i++) {
            Ships[i].go();
            Ships2[i].go();
        }
        push()
        translate(0, 0, 500);
        strokeWeight(2);
        stroke(0, 255, 0);
        line(-1500, -500, 0, 500, -500, 0);
        noFill();
        scale(this.sEase);
        plane(500, 500, 1, 1);
        pop();
    }
}

function laodWalls() {
    for (let i = 0; i < nmbrWalls; i++) {
        let newWall = new Wall(0, 0, 0, 1);
        Walls.push(newWall);
    }
}