class Menu {
    constructor() {
        this.buttonX = GAME_WIDTH / 2 - 100;
        this.buttonY = 350;
        this.buttonWidth = 200;
        this.buttonHeight = 60;
    }

    draw() {
        // Fondo del menú
        background(135, 206, 235);

        // Título del juego
        fill(255);
        textAlign(CENTER);
        textSize(48);
        textStyle(BOLD);
        fill(0, 0, 128, 255);
        text("🌱 SIMULADOR DE JARDINERÍA 🌱", GAME_WIDTH / 2, 200);

        // Subtítulo
        textSize(24);
        textStyle(NORMAL);
        fill(0, 0, 128, 255);
        text("Física de Objetos 2D", GAME_WIDTH / 2, 250);

        // Información de estudiantes
        textSize(16);
        fill(0, 0, 128, 255);
        text("Agustin Brollo • Agustin Murgia • Nazareno Scala", GAME_WIDTH / 2, 280);

        // Botón de jugar
        this.drawPlayButton();

        // Instrucciones
        textSize(18);
        textStyle(NORMAL);
        fill(0, 0, 128, 255);
        text("Arrastra la bomba para extraer agua • Planta semillas • Riega y cosecha", GAME_WIDTH / 2, 500);
    }

    drawPlayButton() {
        // Detectar hover
        let isHovered = this.isButtonHovered();

        noStroke();

        // Color del botón
        if (isHovered) {
            fill(76, 175, 80); // Verde más claro al hacer hover
        } else {
            fill(56, 142, 60); // Verde normal
        }

        // Dibujar botón
        rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight, 10);

        // Texto del botón
        fill(255);
        textSize(24);
        textStyle(BOLD);
        text("JUGAR", GAME_WIDTH / 2, this.buttonY + 40);
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
