class Light {
	constructor(pShape, pColor, pBorder) {
		this.mShape = pShape;
		this.mColor = pColor;
		this.mBorder = pBorder;
	}

	draw(pCanvasContext) {
		var i;
		pCanvasContext.fillStyle = this.mColor;
		pCanvasContext.beginPath();
		
		pCanvasContext.moveTo(this.mShape[0].getX(), this.mShape[0].getY());
		for (i = 1; i < this.mShape.length; i += 1) {
			pCanvasContext.lineTo(this.mShape[i].getX(), this.mShape[i].getY());
		}
		pCanvasContext.closePath();
		pCanvasContext.fill();
		if (this.mBorder > 0) {
			var l = pCanvasContext.lineWidth;
			pCanvasContext.lineWidth = this.mBorder;
			pCanvasContext.stroke();
			pCanvasContext.lineWidth = l;
		}
	}

	drawReflection(pCanvasContext, pMirrorY, pVarianceX, pSamples) {
		var i, j, varianceY;
		varianceY = (pMirrorY - this.mShape[0].getY()) * .1;
		pCanvasContext.fillStyle = this.mColor;
		for (i = 0; i < pSamples; i += 1) {
			var offset = new Vector(getRandom(-pVarianceX, +pVarianceX), getRandom(-varianceY, +varianceY));
			pCanvasContext.beginPath();
			pCanvasContext.moveTo(this.mShape[0].getX() + offset.getX(), pMirrorY + (pMirrorY - this.mShape[0].getY()) + offset.getY());
			for (j = 1; j < this.mShape.length; j += 1) {
				pCanvasContext.lineTo(this.mShape[j].getX() + offset.getX(), pMirrorY + (pMirrorY - this.mShape[j].getY()) + offset.getY());
			}
			pCanvasContext.fill();
		}
		
	}
}