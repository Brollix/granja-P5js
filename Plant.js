class Plant {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = PLANT_SIZE / 2;
		this.growthStage = 0;
		this.color = color(139, 69, 19);
		this.waterLevel = 0;
		this.maxWater = 100;
	}

	draw() {
		noStroke();
		fill(this.color);
		ellipse(this.x, this.y, this.size, this.size);

		// Barra de agua vertical para semillas
		if (this.growthStage === 0) {
			fill(0, 0, 0, 100);
			rect(this.x + 25, this.y - 20, 6, 40);
			fill(0, 191, 255, 200);
			let barHeight = map(this.waterLevel, 0, this.maxWater, 0, 40);
			rect(this.x + 25, this.y - 20 + (40 - barHeight), 6, barHeight);
		}

		if (this.growthStage === 1) {
			fill(255, 215, 0, 200);
			textSize(16);
			textAlign(CENTER);
			text("¡LISTA!", this.x, this.y - 50);
			textAlign(LEFT);
		}
	}

	addWater(amount) {
		if (this.growthStage === 0) {
			this.waterLevel = min(this.waterLevel + amount, this.maxWater);
			if (this.waterLevel >= this.maxWater) {
				this.growFromWater();
			}
		}
	}

	growFromWater() {
		if (this.growthStage === 0) {
			this.growthStage = 1;
			this.color = color(34, 139, 34);
			this.size = PLANT_SIZE;
		}
	}

	isReadyToHarvest() {
		return this.growthStage === 1;
	}
}