

class Platform {
    constructor(x, y, w, h, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.direction = 1; // 1 derecha, -1 izquierda
    }

update(dt) {
    this.x += this.speed * this.direction * dt * 60;

    // Rebote en los bordes
    if (this.x <= 0) {
        this.x = 0; // corrige la posición
        this.direction = 1; // hacia la derecha
    }

    if (this.x + this.w >= GAME_WIDTH) {
        this.x = GAME_WIDTH - this.w; // corrige la posición
        this.direction = -1; // hacia la izquierda
    }
}


    draw() {
        fill(100, 100, 100, 200);
        rect(this.x, this.y, this.w, this.h);
    }

    // chequea colisión con una partícula de agua
    blocksWater(water) {
        return (
            water.x > this.x &&
            water.x < this.x + this.w &&
            water.y + water.size / 2 > this.y &&
            water.y - water.size / 2 < this.y + this.h
        );
    }
}
