// Menu placeholder - This will be compatible with the main branch menu implementation
class Menu {
	constructor() {
		this.buttonX = GAME_WIDTH / 2 - 100;
		this.buttonY = 350;
		this.buttonWidth = 200;
		this.buttonHeight = 60;
	}

	draw() {
		// Simple placeholder menu - will be replaced by main branch implementation
		background(135, 206, 235);

		fill(255);
		textAlign(CENTER);
		textSize(48);
		textStyle(BOLD);
		text("🌱 SIMULADOR DE JARDINERÍA 🌱", GAME_WIDTH / 2, 200);

		textSize(24);
		textStyle(NORMAL);
		fill(0, 0, 128, 255);
		text("Física de Objetos 2D", GAME_WIDTH / 2, 250);

		textSize(16);
		fill(0, 0, 128, 255);
		text("Agustin Brollo • Agustin Murgia • Nazareno Scala", GAME_WIDTH / 2, 280);

		this.drawPlayButton();

		textSize(18);
		textStyle(NORMAL);
		fill(0, 0, 128, 255);
		text("Arrastra la bomba para extraer agua • Planta semillas • Riega y cosecha", GAME_WIDTH / 2, 500);
	}

	drawPlayButton() {
		let isHovered = this.isButtonHovered();

		if (isHovered) {
			fill(76, 175, 80);
		} else {
			fill(56, 142, 60);
		}

		noStroke();
		rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, 10);

		fill(255);
		textSize(24);
		textStyle(BOLD);
		text("🚀 JUGAR", GAME_WIDTH / 2, this.buttonY + 40);
	}

	isButtonHovered() {
		return mouseX >= this.buttonX && mouseX <= this.buttonX + this.buttonWidth &&
			mouseY >= this.buttonY && mouseY <= this.buttonY + this.buttonHeight;
	}

	isButtonClicked() {
		return this.isButtonHovered();
	}

	handleClick() {
		if (this.isButtonClicked()) {
			gameState = PLAYING;
			resetGame();
			return true;
		}
		return false;
	}
}
