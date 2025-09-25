let plants = [];
let hoseWater = [];
let isHoseActive = false;
let plantPreview = null;
let score = 0;
let dt;
let waterGain = 10;
let waterStored = 0;
let platform;

// Seccion bomba 
let startY = 550;
let endY = 600;
let mouseDragPump = false;
let pumpWater = false;
let pumpVel = 200;
let pump;
let pumpWidth = 150;
let pumpHeight = 40;
// Seccion bomba

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

//Plataforma
function setup() {
	let canvas = createCanvas(GAME_WIDTH, GAME_HEIGHT);
	canvas.parent('gameContainer');
	platform = new Platform(GAME_WIDTH / 2 - 100, GAME_HEIGHT / 1.35, 250, 20, 3);

}

//Bomba
function setup() {
	pump = createVector(50, startY);
	let canvas = createCanvas(GAME_WIDTH, GAME_HEIGHT);
	canvas.parent('gameContainer');
}



function draw() {
	console.log("Water", pumpWater)
	dt = deltaTime / 1000;
	// Fondo
	for (let i = 0; i <= GAME_HEIGHT; i++) {
		let inter = map(i, 0, GAME_HEIGHT, 0, 1);
		let c1 = color(135, 206, 235);
		let c2 = color(173, 216, 230);
		let c = lerpColor(c1, c2, inter);
		stroke(c);
		line(0, i, GAME_WIDTH, i);
	}
	pump = createVector(50, startY);
	let canvas = createCanvas(GAME_WIDTH, GAME_HEIGHT);
	canvas.parent('gameContainer');
	menu = new Menu();
}

function draw() {
	dt = deltaTime / 1000;

	if (gameState === MENU) {
		menu.draw();
	} else if (gameState === PLAYING) {
		drawGame();
	}
}


function drawGame() {
	console.log("Water", pumpWater)

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
	drawUI();
	updatePlantPreview();

	// Generar agua
	if (waterStored >= 0 && isHoseActive && frameCount % 4 === 0) {
		let numStreams = 10;
		let spreadRange = 30;
		let baseAngle = 45;

		for (let i = 0; i < numStreams; i++) {
			let spreadAngle = map(i, 0, numStreams - 1, -spreadRange, spreadRange);
			hoseWater.push(new HoseWater(mouseX, mouseY, baseAngle, 10, spreadAngle));
			hoseWater[i].waterPour();
		}
	}
	pumpUpdate();
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
<<<<<<< Updated upstream
	fill(0, 0, 0, 200);
	textSize(18);
	text("Click: Plantar | R: Regar | C: Cosechar", 30, 30);
	text("Puntaje: " + score, 30, 90);

	textStyle(BOLD);
	text("Agua Restante", 30, 60);
	text(abs(waterStored.toFixed(0)), 175, 60);
	textStyle(NORMAL);

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

	// Chequeamos colision en Pump
	if (mouseX >= pump.x &&
		mouseX <= pump.x + pumpWidth &&
		mouseY >= pump.y &&
		mouseY <= pump.y + pumpHeight) {
		mouseDragPump = true;
		console.log("agarrado")
	}

=======
	// Restaurar configuración de texto para el HUD
	textAlign(LEFT);
	textStyle(NORMAL);

	fill(0, 0, 0, 200);
	textSize(18);
	text("Click: Plantar | R: Regar | C: Cosechar", 30, 30);
	text("Puntaje: " + score, 30, 90);

	textStyle(BOLD);
	text("Agua Restante", 30, 60);
	text(abs(waterStored.toFixed(0)), 175, 60);
	textStyle(NORMAL);
}

function keyPressed() {
	if (gameState === PLAYING) {
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
}

function mousePressed() {
	if (gameState === MENU) {
		menu.handleClick();
	} else if (gameState === PLAYING) {
		if (mouseButton === LEFT && plantPreview) {
			plants.push(new Plant(plantPreview.x, plantPreview.y));
			plantPreview = null;
		}

		// Chequeamos colision en Pump
		if (mouseX >= pump.x &&
			mouseX <= pump.x + pumpWidth &&
			mouseY >= pump.y &&
			mouseY <= pump.y + pumpHeight) {
			mouseDragPump = true;
			console.log("agarrado")
		}
	}
}

function resetGame() {
	// Reiniciar variables del juego
	plants = [];
	hoseWater = [];
	isHoseActive = false;
	plantPreview = null;
	score = 0;
	waterStored = 0;
	mouseDragPump = false;
	pumpWater = false;
	pump.y = startY;
>>>>>>> Stashed changes
}