function mouseDragged() {
  if (gameState === PLAYING && mouseDragPump) {
    console.log("arrastrando");
    if (pump.y <= mouseY && !(pump.y >= endY)) {
      pump.y += pumpVel * dt;
      console.log("dragRect");
    } else if (pump.y >= mouseY && !(pump.y <= startY)) {
      pump.y -= pumpVel * dt;
    }
    if (!pumpWater && pump.y >= endY) {
      pumpWater = true;
      waterStored += waterGain;
    }

  }
}

function mouseReleased() {
  if (gameState === PLAYING) {
    mouseDragPump = false;
    console.log("soltado");
  }
}

function pumpUpdate() {
  // Mover la bomba arriba si no esta en su posisicon orignal
  if (!mouseDragPump && pump.y >= startY) {
    pump.y -= pumpVel * dt;
  }

  // Dibujar bomba
  fill(100, 100, 100);
  rect(pump.x + pumpWidth / 2 - 20, pump.y, 40, pumpHeight * 3);

  fill(50, 50, 255);
  rect(pump.x, pump.y, pumpWidth, pumpHeight);
  console.log(pump.y);

  fill(50, 50, 190);
  rect(pump.x - 10, endY + pumpHeight, pumpWidth + 20, pumpHeight * 4);


  if (pumpWater && pump.y <= startY) {
    pumpWater = false;
  }
}

