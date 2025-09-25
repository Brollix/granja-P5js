let plants = [];
let hoseWater = [];
let isHoseActive = false;
let plantPreview = null;
let score = 0;
let dt;
let waterGain = 10;
let waterStored = 0;
let platform;
let hud;

// Game states - Compatible with menu system
const MENU = 'menu';
const PLAYING = 'playing';
let gameState = PLAYING; // Start directly in playing mode for now
let menu = null; // Will be initialized if Menu class exists

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
const GAME_HEIGHT = 720;

const PLANT_POSITIONS = [
	{ x: GAME_WIDTH / 3, y: GAME_HEIGHT - 150 },
	{ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 150 },
	{ x: (GAME_WIDTH * 2) / 3, y: GAME_HEIGHT - 150 }
];
const PLANT_SIZE = 30;
const POINTS_PER_PLANT = 25;
const WATER_PER_PARTICLE = 1;

function setup() {
	pump = createVector(50, startY);
	let canvas = createCanvas(GAME_WIDTH, GAME_HEIGHT);
	canvas.parent('gameContainer');

	// Initialize platform
	platform = new Platform(GAME_WIDTH / 2 - 100, GAME_HEIGHT / 1.35, 250, 20, 3);

	// Initialize HUD
	hud = new HUD();

	// Initialize menu if Menu class exists
	if (typeof Menu !== 'undefined') {
		menu = new Menu();
		gameState = MENU;
	}
}

function draw() {
	dt = deltaTime / 1000;

	if (gameState === MENU && menu) {
		menu.draw();
	} else {
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

	// Actualizar y dibujar plataforma
	platform.update(dt);
	platform.draw();

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
			// Verificar colisión con plataforma
			if (platform.blocksWater(water)) {
				hoseWater.splice(i, 1);
			} else if (water.checkCollisionWithPlants()) {
				hoseWater.splice(i, 1);
			} else {
				water.draw();
			}
		}
	}
	hud.draw();
	hud.drawWaterInfo();
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

		// Atajos de teclado para los botones
		if (key === 'm' || key === 'M') {
			// Volver al menú
			if (menu) {
				gameState = MENU;
			}
		}

		if (key === 't' || key === 'T') {
			// Resetear el juego
			resetGame();
		}
	}
}

function mousePressed() {
	if (gameState === MENU && menu) {
		menu.handleClick();
	} else if (gameState === PLAYING) {
		// Verificar clics en botones de control
		if (mouseButton === LEFT) {
			if (hud.isMenuButtonClicked()) {
				// Volver al menú
				if (menu) {
					gameState = MENU;
				}
				return;
			} else if (hud.isResetButtonClicked()) {
				// Resetear el juego
				resetGame();
				return;
			}
		}

		// Lógica normal del juego
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

	// Reiniciar plataforma
	platform = new Platform(GAME_WIDTH / 2 - 100, GAME_HEIGHT / 1.35, 250, 20, 3);

	// Reiniciar HUD
	hud = new HUD();
}