class Vector {
    constructor(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ ? pZ : 1);
    }

    getX() {
        return this.mX;
    }

    setX(pX) {
        this.mX = pX;
    }

    getY() {
        return this.mY;
    }

    setY(pY) {
        this.mY = pY;
    }

    getZ() {
        return this.mZ;
    }

    setZ(pZ) {
        this.mZ = pZ;
    }

	copy() {
		return new Vector(
			this.getX(),
			this.getY(),
			this.getZ());
	}

	add(vector) {
		return new Vector(
			this.getX() + vector.getX(),
			this.getY() + vector.getY());
	}

	subtract(vector) {
		return new Vector(
			this.getX() - vector.getX(),
			this.getY() - vector.getY());
	}

	multiply(scalar) {
		return new Vector(
			this.getX() * scalar,
			this.getY() * scalar);
	}

	divide(scalar) {
		return new Vector(
			this.getX() / scalar,
			this.getY() / scalar);
	}

	magnitude() {
		return Math.sqrt( this.getX() ** 2
						+ this.getY() ** 2);
	}

	normalise() {
		return this.divide(this.magnitude());
	}

	limitTo(scalar) {
		var m = this.magnitude();
		if(m > scalar) {
			return this.divide(m).multiply(scalar);
		} else {
			return this.copy();
		}
	}

	dotProduct(vector) {
		return this.getX() * vector.getX()
			 + this.getY() * vector.getY();
	}

	interpolate(vector, scalar) {
		return this.multiply(1 - scalar).add(vector.multiply(scalar));
	}

	rotate(radians) {
		return new Vector(
			this.getX() * Math.cos(radians) - this.getY() * Math.sin(radians),
			this.getX() * Math.sin(radians) + this.getY() * Math.cos(radians));
	}

	angleBetween(vector) {
		return Math.acos(this.dotProduct(vector) / (this.magnitude() * vector.magnitude()));
	}
}