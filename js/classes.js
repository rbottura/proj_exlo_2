let xPosInit = -3000;

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
