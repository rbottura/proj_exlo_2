let col_wire = document.getElementById("colorWireframe");
let col_spot = document.getElementById("colorSpot");

let nav_bar = document.getElementById("nav");
let build_msg_prompt = document.getElementById("build_msg_prompt");
let build_msg_prompt_span = document.getElementById("build_msg_prompt_span");

// let shipItems_ui = document.getElementsByClassName("ships_items");
let shipItems_original_ui = document.getElementById("ships_items_original");
let current_ship_item = 1;

let activeItemWrapper = 0;
let ships_items_wrappers = document.getElementsByClassName("ships_items_wrapper");

let xwingButton = document.getElementById("xwing_status");

let partsLoaded = false;

function customizeShip(elem) {
    if (partsLoaded) {
        if (activeItemWrapper == 0) {
            checkActiveItemWrapper(activeItemWrapper);
            //console.log(current_ship_item);
            for (let i = 0; i < shipItems_original_ui.childElementCount; i++) {
                let childBox = shipItems_original_ui.children[i];
                let boxLock = shipItems_original_ui.children[6];
                if (elem == i && i < 6) {
                    childBox.style.backgroundColor = "rgba(220, 30, 30, 0.5)";
                    childBox.style.color = "white";
                    ship_0.deck[i].colorR = 255;
                    ship_0.deck[i].colorG = 0;
                    ship_0.deck[i].colorB = 0;
                    ship_0.deck[i].opacity = 255;
                } else if (elem != i && i < 6) {
                    childBox.style.backgroundColor = "rgba(255, 255, 255, 0)";
                    childBox.style.color = "black";
                    boxLock.style.backgroundColor = "rgba(255, 255, 255, 0)";
                    boxLock.style.color = "black";
                    ship_0.deck[i].colorR = 255;
                    ship_0.deck[i].colorG = 255;
                    ship_0.deck[i].colorB = 255;
                    ship_0.deck[i].opacity = 80;
                } else if (elem == i && i == 6) {
                    childBox.style.backgroundColor = "rgba(0, 0, 0, 1)";
                    childBox.style.color = "white";
                    for (let j = 0; j < 6; j++) {
                        ship_0.deck[j].opacity = 255;
                    }
                }
            }
        } 
    }
}

function checkActiveItemWrapper(nxt) {
    let newWrapper = activeItemWrapper + nxt;
    if (newWrapper == ships_items_wrappers.length) {
        activeItemWrapper = 0;
    } else if (newWrapper == -1) {
        activeItemWrapper = ships_items_wrappers.length - 1;
    } else {
        activeItemWrapper = newWrapper;
    }
    for (let i = 0; i < ships_items_wrappers.length; i++) {
        if (activeItemWrapper == i) {
            ships_items_wrappers[i].style.border = "solid 2px rgba(0,0,0,1)";
        } else {
            ships_items_wrappers[i].style.border = "1px solid rgb(216, 216, 216)";
        }
    }
}

function checkCurrentShipItem(nxtElem) {
    let newElem = current_ship_item + nxtElem;
    if (newElem == 6) {
        build_msg_prompt_span.innerHTML = "! Part 7 doesnt exist !";
    } else if (newElem == -1) {
        build_msg_prompt_span.innerHTML = "! Part 0 doesnt exist !";
    } else {
        current_ship_item += nxtElem;
        customizeShip(current_ship_item);
    }
}

function toggleED(category) {
    if (category == 1) {
        let xwingStat = document.getElementById("xwing_status");
        let xwingBtn = document.getElementById("xwing_btn");
        if (xwingStat.innerHTML == "Disabled") {
            xwingStat.innerHTML = "Enabled";
            xwingBtn.style.backgroundColor = "rgb(0,0,0)";
            xwingBtn.style.color = "white";
            ship_0.xwingStatus = true;
        } else {
            xwingStat.innerHTML = "Disabled";
            xwingBtn.style.backgroundColor = "rgba(0,0,0,0)";
            xwingBtn.style.color = "black";
            ship_0.xwingStatus = false;
        }
    } else if (category == 2) {
        for (let i = 0; i < ship_0.deck.length; i++) {
            if (i == 4) {
                ship_0.deck[i].wingShape();
            } else if(i!=6) {
                ship_0.deck[i].newScale();
            }
        }
        let refreshBtn = document.getElementById("refresh_btn");
        refreshBtn.style.backgroundColor = "black";
        refreshBtn.style.color = "white";
        setTimeout(() => {
            refreshBtn.style.backgroundColor = "rgba(0,0,0,0)";
            refreshBtn.style.color = "black";
        }, 200);
    }
}

document.addEventListener("click", customizeShip(current_ship_item));
