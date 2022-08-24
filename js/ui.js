let col_wire = document.getElementById("colorWireframe");
let col_spot = document.getElementById("colorSpot");

let elem_rotate_y = document.getElementById("rotateY");
let elem_rotate_x = document.getElementById("rotateX");
let elem_trZ = document.getElementById("trZ");
let elem_zoom_param = document.getElementById("zoom_param");

let fill_box = document.getElementById("fill_box");


let nav_bar = document.getElementById("nav");
let strokeWeight_all = document.getElementById("strokeWeight_all");

let moove_gate_in = document.getElementById("moove_gate_in");
let moove_gate_in_val = moove_gate_in.value;

let moove_gate_out = document.getElementById("moove_gate_out");
let moove_gate_out_val = moove_gate_out.value;

let spawn_speed_input = document.getElementById("spawn_speed_input");
let spawn_rythme = 250;

let population_param = document.getElementById("population_param");
let population = population_param.value;

population_param.addEventListener("change",function (e){
    updatePopulation(e.target.value);
    console.log("pencil_raw length : "+pencil_row.length+"  & "+e.target.value);
});

spawn_speed_input.addEventListener("change", function (e) {
    spawn_rythme = this.value;
    console.log(this.value);
    update_cutInterval();
})

//let zoom_param = elem_zoom_param.value;
let zoom_param = 1;

let trZ=0;
let trZEase = trZ;

//function updateRythme() {
//    if (midiRecorder.length > 0) {
//        spawn_rythme = midiRecorder[midiRecorder.length - 1] + 1;
//    } else {
//        spawn_rythme = 250;
//    }
//    //console.log(spawn_rythme);
//    requestAnimationFrame(updateRythme);
//}
//updateRythme();

col_spot.addEventListener("change", function (e) {
    console.log(e.target.value);
    return e.target.value;
})

col_wire.addEventListener("change", function (e) {
    console.log(e.target.value);
    return e.target.value;
})

fill_box.addEventListener("change", function (e) {
    console.log("fill_box = "+e.target.checked);
    //return e.target.value;
    for (let i = 0; i < cruiser.length; i++) {
        cruiser[i].fill_status = e.target.checked;
    }
})

elem_rotate_x.addEventListener("change", function(e){
    console.log("elem_rotate_x = "+e.target.value);
    return e.target.value;
}) 

elem_rotate_y.addEventListener("change", function(e){
    console.log("elem_rotate_y = "+e.target.value);
    return e.target.value;
}) 

elem_zoom_param .addEventListener("change", function(e){
    console.log("zoom = " + e.target.value);
    return e.target.value;
}) 


let noteContainer = document.getElementById("noteContainer");
let noteContainerShow=true;

for (let i = 1; i < 128; i++) {
    let newNote = document.createElement("div");
    newNote.classList.add("note_box");
    newNote.innerHTML = i;
    noteContainer.appendChild(newNote);
}

//function lightNote(e) {
//}

window.addEventListener("load", fonctionLancement);
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
            if (i % 26 === 0 && i != 0 ) {
                y2 += 25;
                x = 0;
            }
            if(i==note_c2){
                //console.log("x : "+x+" & y : "+y2);
                ctx.fillStyle = "rgb(0,255,255)";
                ctx.fillRect(x, y2, 32, 25);
            }
            x = (i % 26) * 32;
            //ctx.fillStyle="red";
            //ctx.fillRect(i*32,y,25,25);

            ctx.strokeStyle = "yellow";
            ctx.strokeRect(x, y2 , 32, 25);
        }
        y2=0;
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