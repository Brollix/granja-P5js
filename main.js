let plants = [];
let hoseWater = [];
let isHoseActive = false;
let plantPreview = null;
let score = 0;

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 800;

const PLANT_POSITIONS = [
    { x: GAME_WIDTH / 3, y: GAME_HEIGHT - 150 },
    { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 150 },
    { x: (GAME_WIDTH * 2) / 3, y: GAME_HEIGHT - 150 }
];
const PLANT_SIZE = 30;
const POINTS_PER_PLANT = 25;
const WATER_PER_PARTICLE = 1;

function setup() {
    let canvas = createCanvas(GAME_WIDTH, GAME_HEIGHT);
    canvas.parent('gameContainer');
}

function draw() {
    let dt = deltaTime / 1000;

    // Fondo
    for (let i = 0; i <= GAME_HEIGHT; i++) {
        let inter = map(i, 0, GAME_HEIGHT, 0, 1);
        let c1 = color(135, 206, 235);
        let c2 = color(173, 216, 230);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(0, i, GAME_WIDTH, i);
    }

    // Suelo
    let sueloHeight = GAME_HEIGHT / 3;
    for (let i = 0; i < sueloHeight; i++) {
        let alpha = map(i, 0, sueloHeight - 1, 200, 50);
        stroke(160, 82, 45, alpha);
        strokeWeight(3);
        line(0, GAME_HEIGHT - i, GAME_WIDTH, GAME_HEIGHT - i);
    }

    // Dibujar plantas
    for (let plant of plants) {
        plant.draw();
    }

    // Dibujar vista previa
    if (plantPreview) {
        plantPreview.draw();
    }

    // Actualizar agua
    for (let i = hoseWater.length - 1; i >= 0; i--) {
        let water = hoseWater[i];
        if (!water.update(dt)) {
            hoseWater.splice(i, 1);
        } else {
            if (water.checkCollisionWithPlants()) {
                hoseWater.splice(i, 1);
            } else {
                water.draw();
            }
        }
    }

    updatePlantPreview();

    // Generar agua
    if (isHoseActive && frameCount % 4 === 0) {
        let numStreams = 10;
        let spreadRange = 30;
        let baseAngle = 45;

        for (let i = 0; i < numStreams; i++) {
            let spreadAngle = map(i, 0, numStreams - 1, -spreadRange, spreadRange);
            hoseWater.push(new HoseWater(mouseX, mouseY, baseAngle, 10, spreadAngle));
        }
    }

    drawUI();
}

function updatePlantPreview() {
    let closestPos = null;
    let minDistance = Infinity;

    for (let pos of PLANT_POSITIONS) {
        let distance = abs(mouseX - pos.x);
        if (distance < minDistance) {
            minDistance = distance;
            closestPos = pos;
        }
    }

    let hasPlant = false;
    for (let plant of plants) {
        if (plant.x === closestPos.x) {
            hasPlant = true;
            break;
        }
    }

    if (!hasPlant && closestPos) {
        if (!plantPreview) {
            plantPreview = new PlantPreview(closestPos.x, closestPos.y);
        } else {
            plantPreview.x = closestPos.x;
            plantPreview.y = closestPos.y;
        }
    } else {
        plantPreview = null;
    }
}

function drawUI() {
    fill(0, 0, 0, 200);
    textSize(18);
    text("Click: Plantar | R: Regar | C: Cosechar", 30, 30);
    text("Puntaje: " + score, 30, 90);

    if (isHoseActive) {
        textStyle(BOLD);
        text("💧 MANGUERA ACTIVA 💧", 30, 60);
        textStyle(NORMAL);
    }
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
        isHoseActive = !isHoseActive;
    }

    if (key === 'c' || key === 'C') {
        for (let i = plants.length - 1; i >= 0; i--) {
            let plant = plants[i];
            if (plant.isReadyToHarvest()) {
                plants.splice(i, 1);
                score += POINTS_PER_PLANT;
            }
        }
    }
}

function mousePressed() {
    if (mouseButton === LEFT && plantPreview) {
        plants.push(new Plant(plantPreview.x, plantPreview.y));
        plantPreview = null;
    }
}