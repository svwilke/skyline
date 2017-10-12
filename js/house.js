class House {
    constructor(pPosition, pWidth, pHeight, pRoofType, pLightColor) {
        this.mWidth = pWidth;
        this.mHeight = pHeight;
		this.mRoofType = pRoofType; // 0 = empty, 1 = dome, 2 = pillar (single), 3 = sign, 4 = pillar (multiple)
		this.mLights = [];
		this.mLightColor = pLightColor;
		this.setPosition(pPosition);
		this.initializeWindows(pPosition.getX(), pPosition.getY() - pHeight, pWidth, pHeight, 2);
	}

	initializeWindows(x, y, w, h, depth) {
		if (depth <= 0 || w < 30) {
			if (w < 5 || h < 5) {
				return;
			}
			var aspect = w / h;
			if (aspect > .8 && aspect < 1.2) {
				this.createWindows(x, y, w, h);
			} else {
				if (aspect > 1) {
					this.createWindows(x, y, w, h);
				} else {
					this.createWindows(x, y, w, h);
				}
			}
		} else {
			if (Math.random() < .5) {
				// Divide horizontally
				this.initializeWindows(x, y, w * .5, h, depth - (Math.random() < .3 ? 2 : 1));
				this.initializeWindows(x + w * .5, y, w * .5, h, depth - (Math.random() < .3 ? 2 : 1));
			} else {
				// Divide vertically
				if (Math.random() < .5) {
					this.initializeWindows(x, y, w, h * .5, depth - (Math.random() < .3 ? 2 : 1));
					this.initializeWindows(x, y + h * .5, w, h * .5, depth - (Math.random() < .3 ? 2 : 1));
				} else {
					// Divide a third
					if (Math.random() < .5) {
						// Take upper third
						this.initializeWindows(x, y, w, h * .3, depth - (Math.random() < .3 ? 2 : 1))
						this.initializeWindows(x, y + h * .3, w, h * .7, depth - (Math.random() < .3 ? 2 : 1))
					} else {
						// Take lower third
						this.initializeWindows(x, y, w, h * .7, depth - (Math.random() < .3 ? 2 : 1))
						this.initializeWindows(x, y + h * .7, w, h * .3, depth - (Math.random() < .3 ? 2 : 1))
					}
				}
			}
		}
	}

	createWindows(x, y, w, h) {
		var i, j, c;
		var countX = Math.floor(w / getRandom(8, 17));
		var countY = Math.floor(h / getRandom(8, 17));
		var spacingX = w / (countX + 1);
		var spacingY = h / (countY + 1);
		var width = spacingX * .8;
		var height = spacingY * .8;

		for (i = 1; i <= countX; i += 1) {
			for (j = 1; j <= countY; j += 1) {
				var wx = x + spacingX * i - width / 2;
				var wy = y + spacingY * j - height / 2;
				this.addLight(new Light(vectorRect(wx, wy, width, height), this.mLightColor, 1));
			}
		}
	}

    getPosition() {
        return this.mPosition;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    setRoofVariant() {
        this.mRoofVariant = true;
	}

	addLight(pLight) {
		this.mLights.push(pLight);
	}

    drawBuilding(pCanvasContext) {
        pCanvasContext.beginPath();
        pCanvasContext.rect(this.getPosition().getX(), this.getPosition().getY() - this.mHeight, this.mWidth, this.mHeight);
        pCanvasContext.fill();
        pCanvasContext.stroke();
    }

	drawRoof(pCanvasContext) {
		var i;
        var y = this.getPosition().getY() - this.mHeight;
        var x = this.getPosition().getX() + this.mWidth / 2;
        switch (this.mRoofType) {
			case 0:
                break;
            case 1:
				pCanvasContext.beginPath();
				pCanvasContext.arc(x, this.mRoofVariant ? y + this.mWidth * .2 : y, this.mWidth * 0.4, 0, Math.PI * 2);
                pCanvasContext.fill();
                pCanvasContext.stroke();
                break;
			case 2:
				var pillarHeight = this.mHeight * 0.2;
				pCanvasContext.beginPath();
				pCanvasContext.moveTo(x, y);
				pCanvasContext.lineTo(x, y - pillarHeight);
				pCanvasContext.stroke();
				if (this.mRoofVariant) {
					pCanvasContext.beginPath();
					pCanvasContext.rect(x - pillarHeight * .1, y - pillarHeight * .3, pillarHeight * .2, pillarHeight * .3);
					pCanvasContext.fill();
					pCanvasContext.stroke();
				}
				this.addLight(new Light(vectorCircle(x, y - pillarHeight, 4, 12), '#f8ff3a', 2));
				break;
			case 3:
				var x1 = x - this.mWidth * .4;
				var x2 = x + this.mWidth * .4;
				var signStandHeight = 8;
				pCanvasContext.beginPath();
				pCanvasContext.moveTo(x1, y);
				pCanvasContext.lineTo(x1, y - signStandHeight);
				pCanvasContext.moveTo(x2, y);
				pCanvasContext.lineTo(x2, y - signStandHeight);
				pCanvasContext.stroke();
				this.addLight(new Light(vectorRect(x1 - this.mWidth * .05, y - signStandHeight * 2.5, this.mWidth * .9, signStandHeight * 1.5),
					this.mRoofVariant ? '#2a0aff' : '#ff1e05', 2));
				break;
			case 4:
				var pillarCount = getRandom(3, 6);
				var xSpacing = this.mWidth / (pillarCount + 1);
				var xStart = x - this.mWidth / 2;
				for (i = 1; i <= pillarCount; i++) {
					var currentX = xStart + xSpacing * i;
					pCanvasContext.beginPath();
					pCanvasContext.moveTo(currentX, y);
					pCanvasContext.lineTo(currentX, y - (this.mWidth * .4 - Math.abs(x - currentX)));
					pCanvasContext.stroke();
					this.addLight(new Light(vectorCircle(currentX, y - (this.mWidth * .4 - Math.abs(x - currentX)), 3, 12), this.mLightColor, 2));
				}
				break;
			default:
                break;
        }
	}

	drawLights(pCanvasContext) {
		var i;
		for (i = 0; i < this.mLights.length; i += 1) {
			this.mLights[i].draw(pCanvasContext);
		}
	}

    draw(pCanvasContext) {
        var posX = this.getPosition().getX();
        var posY = this.getPosition().getY();

        pCanvasContext.lineWidth = 2;
        pCanvasContext.fillStyle = '#1f1f1f';

        this.drawRoof(pCanvasContext);
		this.drawBuilding(pCanvasContext);
		this.drawLights(pCanvasContext);
    }
}