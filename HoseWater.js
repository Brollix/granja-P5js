class HoseWater {
    constructor(x, y, baseAngle, power, spreadAngle = 0) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.color = color(0, 191, 255, 220);
        this.vx = 0;
        this.vy = 0;
        this.ay = 0.5;

        let finalAngle = baseAngle + spreadAngle;
        let angleRad = finalAngle * PI / 180;
        let finalPower = power + random(-0.5, 0.5);

        this.vx = cos(angleRad) * finalPower;
        this.vy = sin(angleRad) * finalPower;

        this.lifeTime = 0;
        this.maxLifeTime = 100;
    }

    update(dt) {
        this.vy += this.ay * dt * 60;
        this.x += this.vx * dt * 60;
        this.y += this.vy * dt * 60;
        this.lifeTime += dt * 60;

        if (this.x <= this.size / 2 || this.x >= GAME_WIDTH - this.size / 2) {
            this.vx *= -0.3;
            this.x = constrain(this.x, this.size / 2, GAME_WIDTH - this.size / 2);
        }

        if (this.y >= GAME_HEIGHT - this.size / 2) {
            this.y = GAME_HEIGHT - this.size / 2;
            this.vx *= Math.pow(0.1, dt);
            this.vy = 0;
        }

        return !(this.y > GAME_HEIGHT + 50 || this.lifeTime > this.maxLifeTime);
    }

    draw() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }

    checkCollisionWithPlants() {
        for (let plant of plants) {
            let distance = dist(this.x, this.y, plant.x, plant.y);
            if (distance < (this.size / 2 + plant.size / 2 + 10)) {
                if (plant.growthStage === 0) {
                    plant.addWater(WATER_PER_PARTICLE);
                }
                return true;
            }
        }
        return false;
    }

    waterPour() {
        waterStored -= 1 * dt;
    }

}
