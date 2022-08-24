let nav_show = true, openGate = true, showGates = false;

document.addEventListener("keydown", function (e) {
  if (e.key == "w") {
    rotate_x -= 1;
  } else if (e.key == "x") {
    rotate_x += 1;
  } else if (e.key == "c") {
    rotate_y += 1;
  } else if (e.key == "v") {
    rotate_y -= 1;
  } else if (e.key == "b") {
    zoom_param += 0.01;
  } else if (e.key == "n") {
    zoom_param -= 0.01;
  } else if (e.key == "q") {
    rotate_x = 0;
  } else if (e.key == "s") {
    rotate_y = 0;
  } else if (e.key == ",") {
    translate_x += 600;
  } else if (e.key == ";") {
    translate_x -= 600;
  } else if (e.key == ":") {
    translate_z += 600;
  } else if (e.key == "!") {
    translate_z -= 600;
  }
  console.log(e.key);
})

document.addEventListener("keydown", activateMod)
function activateMod(e) {
  switch (e.key) {
    case '&':
      scenePlaying = 1;
      checkScene(scenePlaying);
    case 'é':
      scenePlaying = 2;
      checkScene(scenePlaying);
      break;
    case 'e':
      scenePlaying = 3;
      checkScene(scenePlaying);
      break;
    case 'r':
      scenePlaying = 4;
      checkScene(scenePlaying);
      break;
    case '(':
      scenePlaying = 5;
      checkScene(scenePlaying);
      break;
    case 'm':
      for (let i = 0; i < pencilRow3.length; i++) {
        pencilRow3[i].regroup();
      };
      break;
    case 'p':
      for (let i = 0; i < pencilRow3.length; i++) {
        pencilRow3[i].newPosExplo(6, 6, 6);
      };
      break;
    case 'o':
      for (let i = 0; i < pencilRow3.length; i++) {
        pencilRow3[i].newScale();
      };
      break;
    case 'z':
      break;
    case 't':
      nav_show = !nav_show ? true : false;
      if (nav_show) {
        nav_bar.style.display = "none";
        noteContainer.style.display = "none";
      } else {
        nav_bar.style.display = "block";
        noteContainer.style.display = "block";
      }
      break;
    case 'i':
      scenePlaying = 0;
      checkScene(scenePlaying);
      break;
    case 'ArrowUp':
      if (SCENES[2]) {
        sendCruiserSignal();
        setTimeout(() => {
          scenePlaying++;
          checkScene(scenePlaying);
        }, 200);
      } else {

        scenePlaying++;
        checkScene(scenePlaying);
      }
      break;
    case 'ArrowDown':
      scenePlaying--;
      checkScene(scenePlaying);
      break;
  }
}