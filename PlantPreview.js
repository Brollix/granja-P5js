class PlantPreview {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = PLANT_SIZE / 2;
        this.color = color(139, 69, 19, 150);
    }

    draw() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }
}
//ranita cambio //ranaa