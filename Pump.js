function mouseDragged() {
  if(mouseDragPump){
    console.log("arrastrando");
    if(pump.y <= mouseY && !(pump.y >= endY)){
        pump.y += pumpVel * dt;
        console.log("dragRect");
    } else if (pump.y >= mouseY && !(pump.y <= startY)) {
        pump.y -= pumpVel * dt;
    }
    if(!pumpWater && pump.y >= endY) {
        pumpWater = true;
        waterStored += waterGain;
    }
    
  }  
}
 
function mouseReleased() {
  mouseDragPump = false;
  console.log("soltado");
  

}

function pumpUpdate() {
    // Mover la bomba arriba si no esta en su posisicon orignal
    if(!mouseDragPump && pump.y >= startY){
      pump.y -= pumpVel * dt;
    }
    
    // Dibujar bomba
    fill(255, 30 , 30);
    rect(pump.x, pump.y, pumpWidth, pumpHeight);
    console.log(pump.y);
    drawUI();

    if(pumpWater && pump.y <= startY){
    pumpWater = false;
}
}

