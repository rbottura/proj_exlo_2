let col_wire = document.getElementById("colorWireframe");
let col_spot = document.getElementById("colorSpot");

let nav_bar = document.getElementById("nav");

let spawn_rythme = 250;

col_spot.addEventListener("change", function (e) {
    console.log(e.target.value);
    return e.target.value;
})

col_wire.addEventListener("change", function (e) {
    console.log(e.target.value);
    return e.target.value;
})

let shipItems_ui = document.getElementsByClassName("ships_items");
let current_ship_item = 1;

function customizeShip(elem) {
    //console.log(current_ship_item);
    for (let i = 0; i < shipItems_ui.length; i++) {
        if(elem == i){
            shipItems_ui[i].style.backgroundColor = "green";
        } else {
            shipItems_ui[i].style.backgroundColor = "rgba(255,255,255,0)";
        }
    }
}

document.addEventListener("click", customizeShip(current_ship_item));

//window.addEventListener("load", fonctionLancement);
function fonctionLancement() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 832;
    canvas.height = 125;
    let x = 0, z = 0, y2 = 0;
    let index2 = 0;
    animation();
    function animation() {
        fadingScreen();
        //ctx.clearRect(0,0,WiW,WiH);
        for (let i = 0; i < 127; i++) {
            if (i % 26 === 0 && i != 0) {
                y2 += 25;
                x = 0;
            }
            if (i == note_c2) {
                //console.log("x : "+x+" & y : "+y2);
                ctx.fillStyle = "rgb(0,255,255)";
                ctx.fillRect(x, y2, 32, 25);
            }
            x = (i % 26) * 32;
            //ctx.fillStyle="red";
            //ctx.fillRect(i*32,y,25,25);

            ctx.strokeStyle = "yellow";
            ctx.strokeRect(x, y2, 32, 25);
        }
        y2 = 0;
        //console.log("index : "+index2+" & index%26 : " +index2%26);
        //index2++;
        //console.log(note_c2);
        requestAnimationFrame(animation);
    }
    function fadingScreen() {
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, 832, 125);
    }
}