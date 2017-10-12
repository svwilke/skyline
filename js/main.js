function onLoad() {
	
	var canvas, ctx, housePos, houses, horizon;
	var lightColors = ['#f8ff3a', '#f99509', '#fbffce', '#8ec8ff'];
	
    function initializeCanvasContext() {
		canvas = document.getElementById('mainCanvas');
		if(!canvas) {
			alert('Error on retrieving canvas object');
		}
		ctx = canvas.getContext('2d');
		if(!ctx) {
			alert('Error on retrieving context from canvas');
        }
        
    }

    function initializeScene() {
        horizon = 3 * canvas.height / 5;

        houses = [];
        housePos = new Vector(0, horizon);
        while (housePos.getX() < canvas.width) {
			var nextWidth = getRandom(Math.min(20, canvas.width - housePos.getX()), Math.min(130, canvas.width - housePos.getX()));
			if (Math.random() > .1) {
				var height = getRandom(200 - nextWidth, 270 - nextWidth);
				var roofType = 0;
				if (nextWidth < 50) {
					roofType = getRandom(0, 3);
				} else {
					roofType = Math.random() < .15 ? 0 : getRandom(3, 5);
				}
				var nextHouse = new House(housePos, nextWidth, height, roofType, lightColors[getRandom(0, lightColors.length)]);
				if (getRandom(0, 4) == 0) {
					nextHouse.setRoofVariant();
				}
				houses.push(nextHouse);
			} else {
				nextWidth = getRandom(10, 25);
			}
            housePos = new Vector(housePos.getX() + nextWidth, housePos.getY());
        }
    }
	
    function draw() {

        var i, j;

        // Background
        ctx.fillStyle = '#050819';
        ctx.fillRect(0, 0, canvas.width, horizon);
        ctx.fillStyle = '#fdffd1';
        ctx.globalAlpha = 0.006;
        var centerPos = new Vector(canvas.width / 2, canvas.height * 2);
        var startSize = centerPos.getY() - (canvas.height / 3);
        var endSize = centerPos.getY() - (20);
        var stepCount = 45;
        var step = (endSize - startSize) / stepCount;
        for (i = 0; i < stepCount; i++) {
            ctx.beginPath();
            ctx.arc(centerPos.getX(), centerPos.getY(), startSize + (i * step), 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#050819';
        ctx.fillRect(0, horizon, canvas.width, canvas.height - horizon);

		ctx.fillStyle = '#000000';
		ctx.beginPath();
		ctx.moveTo(0, horizon);
		ctx.lineTo(canvas.width, horizon);
		ctx.lineWidth = 4;
		ctx.stroke();

        for (i = 0; i < houses.length; i += 1) {
            houses[i].draw(ctx);
		}

		ctx.globalAlpha = 0.07;
		
		for (i = 0; i < houses.length; i += 1) {
			for (j = 0; j < houses[i].mLights.length; j += 1) {
				houses[i].mLights[j].drawReflection(ctx, horizon, 2, 25);
			}
		}
        /* Test of blurred lights
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = '#e5ff56';
        var x = 100;
        var y = 100;
        var v = 8;
        for (i = 0; i < 8; i += 1) {
            ctx.fillRect(x + getRandom(-v/3, v/3), y + getRandom(-v, v), 20, 40);
        }
        */
	}
	
    initializeCanvasContext();
    initializeScene();
	draw();
}

window.addEventListener('load', onLoad, false);