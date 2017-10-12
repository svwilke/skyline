var signColors = ['#2a0aff', '#10d31d', '#ff1e05'];

function vectorRect(x, y, width, height) {
	var ret = [];
	ret.push(new Vector(x, y));
	ret.push(new Vector(x + width, y));
	ret.push(new Vector(x + width, y + height));
	ret.push(new Vector(x, y + height));
	return ret;
}

function vectorCircle(x, y, radius, segments) {
	var ret = [];
	var i;
	var step = Math.PI * 2 / segments;
	for (i = 0; i < segments; i += 1) {
		ret.push(new Vector(x + radius * Math.cos(step * i), y + radius * Math.sin(step * i)));
	}
	return ret;
}

function getRandom(from, to) {
	var r = Math.random();
	var rand = from + r * (to - from)
	return Math.floor(rand);
}