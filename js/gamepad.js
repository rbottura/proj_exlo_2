let gamepadReady = false;
let controllers = [];

window.addEventListener("gamepadconnected", function (e) {
    gamepadHandler(e, true);
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    gamepadReady = true;
});
window.addEventListener("gamepaddisconnected", function (e) {
    console.log("Gamepad disconnected from index %d: %s",
        e.gamepad.index, e.gamepad.id);
    colour = color(120, 0, 0)
    gamepadHandler(e, false);
});

function gamepadHandler(event, connecting) {
    let gamepad = event.gamepad;
    if (connecting) {
        print("Connecting to controller " + gamepad.index)
        controllers[gamepad.index] = gamepad
    } else {
        delete controllers[gamepad.index]
    }
}

function buttonPressed(b) {
    if (typeof (b) == "object") {
        return b.pressed; // binary 
    }
    return b > 0.9; // analog value
}

let arrayBtnGamepad = [];
for (let ab = 0; ab < 17; ab++) {
    arrayBtnGamepad.push(ab);
}

function resetBtnTimer(btn) {

}

function drawGamepad() {
    let gamepads = navigator.getGamepads();
    let controller = gamepads[0]//controllers[i];
    if (controller.buttons) {
        for (let btn = 0; btn < controller.buttons.length; btn++) {
            let val = controller.buttons[btn].value;
            //btn 12 is arrowUp, 13 is arrowDown
            if (btn == 12 && val == 1) {
                checkCurrentShipItem(1);
            } else if (btn == 13 && val == 1) {
                checkCurrentShipItem(-1);
            }
            if (btn == 0 && val == 1) {
                toggleED();
            }
            if (btn == 3 && val == 1) {
                customizeShip(6);
            }
            if (btn == 6 && val == 1) {
                ship_0.deck[current_ship_item].sZ += 0.06;
            }
            if (btn == 7 && val == 1) {
                ship_0.deck[current_ship_item].sZ -= 0.06;
            }
        }
    }
    if (controller.axes) {
        let axes = controller.axes
        for (let axis = 0; axis < axes.length; axis++) {
            let val = controller.axes[axis]
            if (axis == 0 && (val >= 0.2 || val <= -0.2)) {
                rotate_y += val * 0.08;
                console.log("value of axis 0 : " + val)
            } else if (axis == 1 && (val >= 0.2 || val <= -0.2)) {
                rotate_x += val * 0.08;
            } else if (axis == 2 && (val >= 0.2 || val <= -0.2)) {
                ship_0.deck[current_ship_item].sX += val * 0.2;
            } else if (axis == 3 && (val >= 0.2 || val <= -0.2)) {
                ship_0.deck[current_ship_item].sY += val * 0.2;
            }
        }
    }
}