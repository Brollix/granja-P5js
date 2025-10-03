class HUD {
    constructor() {
        this.buttonWidth = 120;
        this.buttonHeight = 35;
        this.menuButtonX = GAME_WIDTH - 140;
        this.menuButtonY = 20;
        this.resetButtonX = GAME_WIDTH - 140;
        this.resetButtonY = 65;

        // Panel de información
        this.infoPanelX = 20;
        this.infoPanelY = 20;
        this.infoPanelWidth = 350;
        this.infoPanelHeight = 120;
    }

    draw() {
        this.drawInfoPanel();
        this.drawControlButtons();
    }

    drawInfoPanel() {
        // Fondo del panel de información
        fill(0, 0, 0, 180);
        noStroke();
        rect(this.infoPanelX, this.infoPanelY, this.infoPanelWidth, this.infoPanelHeight, 10);

        // Borde del panel
        stroke(255, 255, 255, 100);
        strokeWeight(2);
        noFill();
        rect(this.infoPanelX, this.infoPanelY, this.infoPanelWidth, this.infoPanelHeight, 10);

        // Texto de información
        textAlign(LEFT);
        textStyle(NORMAL);
        fill(255, 255, 255, 220);
        textSize(14);

        // Controles principales
        text("🖱️ Click: Plantar semilla", this.infoPanelX + 15, this.infoPanelY + 25);
        text("⌨️ R: Activar/desactivar manguera", this.infoPanelX + 15, this.infoPanelY + 45);
        text("🖱️ Click: Cosechar plantas maduras", this.infoPanelX + 15, this.infoPanelY + 65);

        // Controles secundarios
        textSize(12);
        fill(255, 255, 255, 180);
        text("M: Menú | T: Reset", this.infoPanelX + 15, this.infoPanelY + 85);

        // Puntaje
        textSize(16);
        textStyle(BOLD);
        fill(255, 215, 0);
        text("🏆 Puntaje: " + score, this.infoPanelX + 15, this.infoPanelY + 105);
    }

    drawControlButtons() {
        // Botón Volver al Menú
        this.drawMenuButton();

        // Botón Resetear
        this.drawResetButton();
    }

    drawMenuButton() {
        let isHovered = this.isMenuButtonHovered();

        // Sombra del botón
        fill(0, 0, 0, 100);
        rect(this.menuButtonX + 2, this.menuButtonY + 2, this.buttonWidth, this.buttonHeight, 8);

        // Color del botón
        if (isHovered) {
            fill(255, 120, 120); // Rojo más claro al hacer hover
        } else {
            fill(220, 60, 60); // Rojo normal
        }

        noStroke();
        rect(this.menuButtonX, this.menuButtonY, this.buttonWidth, this.buttonHeight, 8);

        // Borde del botón
        stroke(255, 255, 255, 150);
        strokeWeight(1);
        noFill();
        rect(this.menuButtonX, this.menuButtonY, this.buttonWidth, this.buttonHeight, 8);

        // Texto del botón
        fill(255);
        textSize(14);
        textStyle(BOLD);
        textAlign(CENTER);
        text("MENÚ", this.menuButtonX + this.buttonWidth / 2, this.menuButtonY + 22);
    }

    drawResetButton() {
        let isHovered = this.isResetButtonHovered();

        // Sombra del botón
        fill(0, 0, 0, 100);
        rect(this.resetButtonX + 2, this.resetButtonY + 2, this.buttonWidth, this.buttonHeight, 8);

        // Color del botón
        if (isHovered) {
            fill(120, 160, 255); // Azul más claro al hacer hover
        } else {
            fill(60, 120, 220); // Azul normal
        }

        noStroke();
        rect(this.resetButtonX, this.resetButtonY, this.buttonWidth, this.buttonHeight, 8);

        // Borde del botón
        stroke(255, 255, 255, 150);
        strokeWeight(1);
        noFill();
        rect(this.resetButtonX, this.resetButtonY, this.buttonWidth, this.buttonHeight, 8);

        // Texto del botón
        fill(255);
        textSize(14);
        textStyle(BOLD);
        textAlign(CENTER);
        text("RESET", this.resetButtonX + this.buttonWidth / 2, this.resetButtonY + 22);
    }

    isMenuButtonHovered() {
        return mouseX >= this.menuButtonX && mouseX <= this.menuButtonX + this.buttonWidth &&
            mouseY >= this.menuButtonY && mouseY <= this.menuButtonY + this.buttonHeight;
    }

    isResetButtonHovered() {
        return mouseX >= this.resetButtonX && mouseX <= this.resetButtonX + this.buttonWidth &&
            mouseY >= this.resetButtonY && mouseY <= this.resetButtonY + this.buttonHeight;
    }

    isMenuButtonClicked() {
        return this.isMenuButtonHovered();
    }

    isResetButtonClicked() {
        return this.isResetButtonHovered();
    }

    drawWaterInfo() {
        // Panel de agua
        fill(0, 0, 0, 180);
        noStroke();
        rect(this.infoPanelX, this.infoPanelY + this.infoPanelHeight + 10, 200, 50, 10);

        // Borde del panel de agua
        stroke(0, 191, 255, 200);
        strokeWeight(2);
        noFill();
        rect(this.infoPanelX, this.infoPanelY + this.infoPanelHeight + 10, 200, 50, 10);

        // Texto del agua
        textAlign(LEFT);
        fill(0, 191, 255, 220);
        textSize(14);
        textStyle(NORMAL);
        text("Agua Restante", this.infoPanelX + 15, this.infoPanelY + this.infoPanelHeight + 30);

        // Cantidad de agua
        textSize(16);
        text(abs(waterStored.toFixed(0)), this.infoPanelX + 15, this.infoPanelY + this.infoPanelHeight + 50);
    }
}
