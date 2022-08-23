// Behaviors : 

// (1) Facing camera and pulse new shapes on kicks 
// (2) Basic movement pattern, moving off screen, slowing at 1/4 then moving slow, then rapidly accelerate at 4/3 
// (3) Basic appearance :  stroke(255, 200, 0) & noFill();


[2] > Comment on fait ça ? 
init un this.z très loin ainsi qu'une this.speed, pour un Z précis, on change this.speed, pareil pour le 3/4

millis()/250 = 1/4 seconde

millis()/100 = 1/10 seconde

62.5/1000 = 1/16 seconde 

let spawn_rythme = 62.5%Math.floor(millis()) 

millis()%62.5

ç____________________________________________________________

Behaviors for specifique scenes :

scene 1 >

zoom : 0.0101 (could jump cut)
rotate_x : min 2.51 & mid 3.7 (& max 6.92) 
rotate_y : fix at 2.45

translate smooth translation