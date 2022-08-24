var midiRecorder = [];
var container = document.getElementById('records');
var startTimer;
var fps = 30;

function setup() {
	noCanvas();
	restart();
}

function draw() {
}

function displayData() {
	//console.log(midiRecorder);
	requestAnimationFrame(displayData);
}
displayData();

function restart() {
	midiRecorder = [];
	startTimer = millis();
	records.innerHTML = '';
}

function noteOn(N, V, C, D) {
	if (C == 1 && N == 0) {
		restart();
	} else {
		let frame = Math.floor((millis() - startTimer) / (1000.0 / fps));
		if (!midiRecorder[frame]) midiRecorder[frame] = [];
		midiRecorder[frame].push([C, N]);
	}

	if (C == 1 && N == 25) printMidiRecorder();
}

function loadMidiDevices() {
	WebMidi.inputs.forEach((device) => {
		device.addListener('noteon', "all", function (e) {
			noteOn(e.note.number, e.velocity, e.channel, { name: device.name, id: device.id });
		});
	});
}

function printMidiRecorder() {
	let html = "";
	let keys = Object.keys(midiRecorder);
	for (let i = 0; i < keys.length; i++) {
		let notes = [];
		for (let j = 0; j < midiRecorder[keys[i]].length; j++) notes.push("[" + midiRecorder[keys[i]][j].toString() + "]");
		html += keys[i] + ": [ " + join(notes, ', ') + " ],<br>";
	}
	records.innerHTML = `const midiRecorder = {<br> ${html} }`;
}

window.onload = () => {
	WebMidi.enable(() => {
		loadMidiDevices();
	});
};

//wait 2 seconds
setTimeout(() => {
	//listMidi1();
	//listMidi2();
	//listMidi3();
	//listMidi4();
}, 5000);

let note_c2 = 50;
let indexMidi1 = 0, goUp = true, someLights = [];
function listMidi1() {
	WebMidi.inputs[0].addListener("noteon", e => {
		if(SCENES[4]){
			if(indexMidi1%4==0){
				spawnShips();
			}
		}
		if (SCENES[1] || SCENES[0]) {
			if (indexMidi1 % 4 == 0) {
				rotate_x += random(-0.6, 0.6);
			}
			if (indexMidi1 % 5 == 0) {
				rotate_y += random(-0.6, 0.6);
			}
		}
		if (SCENES[1]) {
			if ((indexMidi1) % 50 == 0) {
				console.log("explodo");
				for (let i = 0; i < pencil_parts_2.length; i++) {
					pencil_parts_2[i].newPosExplo(10, 10, 10);
				}
				explosion = true;
				sendMidi3();
			}

			if ((indexMidi1 + 25) % 50 == 0) {
				console.log("regroup");
				explosion = false;
				for (let i = 0; i < pencil_parts_2.length; i++) {
					pencil_parts_2[i].regroup();
				}
				sendMidi3();
			}
		}


		if (SCENES[3]) {
		}
		//console.log(` ch1  : ${e.note.number} <br>`);
		note_c2 = e.note.number;
		//spawnPencilParts();
		indexMidi1++;

	}, { channels: [1] });
}

let note_c3 = 50, indexMidi2 = 0;
function listMidi2() {
	WebMidi.inputs[0].addListener("noteon", e => {
		//console.log(`ch2 : ${e.note.number}`);
		note_c3 = e.note.number;
		if (SCENES[4]) {
			let randomNumber = Math.floor(random(2));
			if (randomNumber == 0 && indexMidi1 % 4) {
				for (let i = 0; i < pencilRow3.length; i++) {
					pencilRow3[i].regroup();
				};
			} else if (randomNumber == 1) {
				for (let i = 0; i < pencilRow3.length; i++) {
					pencilRow3[i].newPosExplo(6,6,6);
				};
				for (let i = 0; i < pencil_row.length; i++) {
					pencil_row[i].newPosExplo2();
				}
			}
		}
		if (SCENES[2]) {
			//copyFullPencil[-(translate_x / 600)].strongShake();

			if (indexMidi2 % 3 == 0) {
				someLights.splice(0, 1);
				someLights.push(1);
			} else if ((indexMidi2 + 1) % 3 == 0) {
				someLights.splice(0, 1);
				someLights.push(2);
			} else if ((indexMidi2 + 2) % 3 == 0) {
				someLights.splice(0, 1);
				someLights.push(3);
			}
		}
		for (let i = 0; i < copyFullPencil.length; i++) {
			if (i != -(translate_x / 600) - 1) {
				copyFullPencil[i].regroup()
				copyFullPencil[i].normalScale()
			} else {
				copyFullPencil[i].strongShake();
				copyFullPencil[i].newScale();
				if (i == -0) {
					console.log("disperseeeee");
					for (let j = 0; j < pencil_parts_2.length; j++) {
						pencil_parts_2[j].newPosExplo(10, 10, 10);
					}
				}
			}
		}
		indexMidi2++;
	}, { channels: [2] });
}

let note_c4 = 50, indexMidi3 = 0, indexTranslate = 0;
function listMidi3() {
	WebMidi.inputs[0].addListener("noteon", e => {
		if(SCENES[2]){
			if (indexMidi3 == 1) {
				rotate_x = 1;
				rotate_y = 1;
			}
			if(indexMidi3 % 3 == 0 ){
				rotate_x += 1;
				rotate_y += 1;
			}
		}
		console.log(`ch3 : ${e.note.number}`);
		note_c4 = e.note.number;
		if (SCENES[2]) {
			explosion = false;
			if (indexMidi3 % 1 == 0) {
				//if (goUp) {
				//	translate_x += Math.floor(random(2)) * 600;
				//	if (translate_x >= 0) {
				//		goUp = false;
				//	}
				//} else {
				//	translate_x -= Math.floor(random(2)) * 600;
				//	if (translate_x <= -(17 * 600)) {
				//		goUp = true;
				//	}
				//}
				if (translate_x < (-600 * 17) / 2) {
					translate_x += Math.floor(random(8) + 1) * 600;
					if (indexTranslate % 2 == 0) {
						explosion = true;
					} else {
						explosion = false;
					}
					indexTranslate+=0.5;
				} else if (translate_x >= (-600 * 17) / 2) {
					translate_x -= Math.floor(random(8) + 1) * 600;
					if (indexTranslate % 2 == 0) {
						explosion = true;
					} else {
						explosion = false;
					}
					indexTranslate+=0.5;
				}

			}
		}
		if (SCENES[4]) {
			for (let i = 0; i < pencilRow3.length; i++) {
				pencilRow3[i].newScale();
			};
		}
		indexMidi3++;

	}, { channels: [3] });
}


let note_c5 = 50, note_c5_hist = [0, note_c5];
let indexMidi4 = 0;
function listMidi4() {
	WebMidi.inputs[0].addListener("noteon", e => {
		//console.log(`ch4 : ${e.note.number}`);
		note_c5 = e.note.number;
		note_c5_hist.splice(0, 1);
		note_c5_hist.push(note_c5);
		if (SCENES[5] && note_c5 == 127) {
			//startS5 = true;
			let randomNumber = Math.floor(random(3));
			if (randomNumber == 0 && indexMidi4 % 4 == 0) {
				rotate_x = 1;
				zoom_param = 0.1;
				xShip = 100;
			} else if (randomNumber == 1 && indexMidi4 % 24 == 0) {
				rotate_x = -1;
				rotate_y = -0.5;
				zoom_param = 0.1;
				xShip = 100;
			} else if (randomNumber == 2 && indexMidi4 % 24 == 0) {
				rotate_x = 0.1;
				rotate_y = 0;
				zoom_param = 0.10;
				xShip = 50;
			}
			spawnShips();
			for (let i = 0; i < pencilRow3.length; i++) {
				if (i == 3) {
					pencilRow3[i].wingShape();
				} else {
					pencilRow3[i].newScale2();
				}
			}
			indexMidi4++;
		}

	}, { channels: [4] });
}

//let note_c6 = 50;
//function listMidi3() {
//	WebMidi.inputs[0].addListener("noteon", e => {
//		//console.log(`c5 : ${e.note.number}`);
//		note_c6 = e.note.number;
//
//	}, { channels: [5] });
//}


function sendMidi1() {
	//let output = WebMidi.outputs[0];
	//let channel = output.channels[1];
	//channel.playNote("C" + scenePlaying);
}


function sendMidi3() {
	//let output = WebMidi.outputs[0];
	//let channel = output.channels[3];
	//channel.playNote("F4");
}

function sendCruiserSignal(){
	//let output = WebMidi.outputs[0];
	//let channel = output.channels[4];
	//channel.playNote("F4");
}

function cruiserSound(){
	//let output = WebMidi.outputs[0];
	//let channel = output.channels[5];
	//channel.playNote("F4");
}