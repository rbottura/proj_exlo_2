let  dr2 = 0;

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

    rotateOnZ() {
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

    easeTranslate(easeSpeed) {
        this.xEase = easeIn(this.xEase, this.x, easeSpeed);
        this.yEase = easeIn(this.yEase, this.y, easeSpeed);
        this.zEase = easeIn(this.zEase, this.z, easeSpeed);
    }

    easeRotation(easeSpeed) {
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

class mouseParts {
    constructor(objModel, index, x, y, z_pos, scale, speed) {
        this.x = x;
        this.y = y;
        this.z = z_pos;
        this.index = index;
        this.scale = scale;

        this.xEase = this.x;
        this.yEase = this.y;
        this.zEase = this.z;

        this.sX = 1;
        this.sY = 1;
        this.sZ = 1;
        this.sXEase = this.sX;
        this.sYEase = this.sY;
        this.sZEase = this.sZ;

        this.rHist;
        this.r = 0;
        this.rEase = this.r;

        this.obj = objModel;
        this.name = "n" + index;
        this.go_away = 2;

        this.speed = speed;
        this.accel = 1.06;

        this.zEaseHist;
        this.scale_trigger = true;

        this.strokeWeight = 0.3;

        this.zOffsetTarget = this.zEase;
        this.fill_status = true;

        this.opacity = 1;
        this.opaEase = this.opacity;

        this.rHist = this.r;
    }

    newScale() {
    }

    newPos() {
    }

    newSkin() {
    }

    show() {
        if (this.xEase < 3000) {

            //let newC4 = map(note_c4, 0, 127, 0, 8);
            //this.x = random(-1, 1) * Math.exp(newC4);
            //this.xEase = easeIn(this.xEase, this.x, speed2);

            let opaMap = map(this.x, 500, 0, 50, 255);
            this.opacity = opaMap;

            this.xEase += this.speed;

            this.yEase = easeIn(this.yEase, this.y, speed2);

            this.opaEase = easeIn(this.opaEase, this.opacity, speed2);

            this.rEase = easeIn(this.rEase, this.r, speed);

            this.sXEase = easeIn(this.sXEase, this.sX, speed4);
            this.sYEase = easeIn(this.sYEase, this.sY, speed4);
            this.sZEase = easeIn(this.sZEase, this.sZ, speed4);

            let dr1 = map(this.rEase, this.rHist, this.r, 0, 1);
            let expo_dr = easeInOutExpo(dr1);
            dr2 = map(expo_dr, 0, 1, this.rHist, this.r);

            push();

            if (this.fill_status) {
                strokeWeight(strokeWeight_all_val);
                stroke(wire_col);
                let fill_col = color(255, 255, 255, this.opaEase);
                fill(fill_col);
            } else {
                strokeWeight(strokeWeight_all_val);
                stroke(wire_col);
                noFill();
            }

            scale(this.sXEase, this.sYEase, this.sZEase);
            translate(this.xEase, this.y, this.zEase);

            //rotateZ(dr2);
            //fill(light_col);
            model(this.obj);
            pop();
        }
    }
}
