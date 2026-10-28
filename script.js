var achtergrond;

var playAgainKnop;

var raster = {
	aantalRijen: 12,
	aantalKolommen: 18,
	celGrootte: null,

	berekenCelGrootte() {
		this.celGrootte = canvas.width / this.aantalKolommen;
	},
	teken() {
		push();
		noFill();
		stroke('grey');
		for (var rij = 0; rij < this.aantalRijen; rij++) {
			for (var kolom = 0; kolom < this.aantalKolommen; kolom++) {
				rect(kolom * this.celGrootte, rij * this.celGrootte, this.celGrootte, this.celGrootte);
			}
		}
		pop();
	}
}

var jos = {
	x: 400,
	y: 300,
	animatie: [],
	aantalFrames: 6,
	frameNummer: 3,
	stapGrootte: null,
	gehaald: false,

	beweeg() {
		if (keyIsDown(65)) {
			this.x -= this.stapGrootte;
			this.frameNummer = 2;
		}
		if (keyIsDown(68)) {
			this.x += this.stapGrootte;
			this.frameNummer = 1;
		}
		if (keyIsDown(87)) {
			this.y -= this.stapGrootte;
			this.frameNummer = 4;
		}
		if (keyIsDown(83)) {
			this.y += this.stapGrootte;
			this.frameNummer = 5;
		}

		this.x = constrain(this.x, 0, canvas.width);
		this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);

		if (this.x >= canvas.width - raster.celGrootte) {
			this.gehaald = true;
		}
	},

	wordtGeraakt(vijand) {
		if (this.x == vijand.x && this.y == vijand.y) {
			return true;
		}
		else {
			return false;
		}
	},

	toon() {
		if (this.animatie[this.frameNummer]) {
			image(this.animatie[this.frameNummer], this.x, this.y, raster.celGrootte, raster.celGrootte);
		}
	}
}

var alice = {
	x: 700,
	y: 200,
	sprite: null,
	stapGrootte: null,

	beweeg() {
		this.x += floor(random(-1, 2)) * this.stapGrootte;
		this.y += floor(random(-1, 2)) * this.stapGrootte;

		this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
		this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
	},

	toon() {
		if (this.sprite) {
			image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
		}
	}
}

var bob = {
	x: 600,
	y: 300,
	sprite: null,
	stapGrootte: null,

	beweeg() {
		this.x += floor(random(-1, 2)) * this.stapGrootte;
		this.y += floor(random(-1, 2)) * this.stapGrootte;

		this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
		this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
	},

	toon() {
		if (this.sprite) {
			image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
		}
	}
}

var bom1 = {
	x: 200,
	y: 0,
	stapGrootte: null,
	richting: 1,

	beweeg() {
		this.y += this.richting * this.stapGrootte;
		if (this.y >= canvas.height - raster.celGrootte) {
			this.richting = -1;
		}
		if (this.y <= 0) {
			this.richting = 1;
		}
	},

	toon() {
		push();
		fill('red');
		ellipse(this.x, this.y, raster.celGrootte);
		pop();
	}
};

var bom2 = {
	x: 500,
	y: 300,
	stapGrootte: null,
	richting: -1,

	beweeg() {
		this.y += this.richting * this.stapGrootte;
		if (this.y >= canvas.height - raster.celGrootte) {
			this.richting = -1;
		}
		if (this.y <= 0) {
			this.richting = 1;
		}
	},

	toon() {
		push();
		fill('red');
		ellipse(this.x, this.y, raster.celGrootte);
		pop();
	}
};

var pingpongbal = {
	x: 100,
	y: 100,
	speedX: 15,
	speedY: 10,
	diameter: 30,

	beweeg() {
		this.x += this.speedX;
		this.y += this.speedY;

		if (this.x <= 0 || this.x >= canvas.width - this.diameter) {
			this.speedX = -this.speedX;
		}
		if (this.y <= 0 || this.y >= canvas.height - this.diameter) {
			this.speedY = -this.speedY;
		}
	},

	raaktJos() {
		var d = dist(this.x + this.diameter / 2, this.y + this.diameter / 2, jos.x + raster.celGrootte / 2, jos.y + raster.celGrootte / 2);
		if (d < (this.diameter / 2 + raster.celGrootte / 2)) {
			return true;
		}
		return false;
	},

	toon() {
		push();
		fill('orange');
		ellipse(this.x, this.y, this.diameter);
		pop();
	}
};

function preload() {
	achtergrond = loadImage("images/gifgifgif.gif");
	alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");
	bob.sprite = alice.sprite;

	for (var b = 0; b < jos.aantalFrames; b++) {
		frameJos = loadImage("images/sprites/Jos100px/Jos_" + b + ".png");
		jos.animatie.push(frameJos);
	}
}

function setup() {
	canvas = createCanvas(900, 600);
	canvas.parent('processing');
	frameRate(10);
	ellipseMode(CORNER);
	textFont("Verdana");
	textSize(60);
	raster.berekenCelGrootte();
	bom1.x = floor(random(10, 17)) * raster.celGrootte;
	bom2.x = floor(random(10, 17)) * raster.celGrootte;
	jos.stapGrootte = 1 * raster.celGrootte;
	alice.stapGrootte = 1 * raster.celGrootte;
	bob.stapGrootte = 1 * raster.celGrootte;
	bom1.stapGrootte = 0.5 * raster.celGrootte;
	bom2.stapGrootte = 1 * raster.celGrootte;
}

function draw() {
	image(achtergrond, 0, 0, 900, 600);

	raster.teken();

	jos.beweeg();
	alice.beweeg();
	bob.beweeg();
	bom1.beweeg();
	bom2.beweeg();
	pingpongbal.beweeg();

	jos.toon();
	alice.toon();
	bob.toon();
	bom1.toon();
	bom2.toon();
	pingpongbal.toon();

	push();
	noFill();
	stroke('blue');
	strokeWeight(10);
	rect(0, 0, canvas.width, canvas.height);
	pop();

	if (jos.gehaald) {
		toonEindscherm(true);
	}
	else if (jos.wordtGeraakt(alice) || jos.wordtGeraakt(bob) || jos.wordtGeraakt(bom1) || jos.wordtGeraakt(bom2) || pingpongbal.raaktJos()) {
		toonEindscherm(false);
	}
}


function toonEindscherm(heeftGewonnen) {
		if (heeftGewonnen) {
				background('green');
				fill('white');
				text("Je hebt gewonnen!", 30, 300);
		} else {
				background('red');
				fill('black');
				text("Je hebt verloren!", 30, 300);
		}

		noLoop();

		if (!playAgainKnop) {

			playAgainKnop = createButton('▶ Play Again');
			playAgainKnop.position(350, 400);

			playAgainKnop.style('background', '#172554');
			playAgainKnop.style('color', 'white');
			playAgainKnop.style('font-size', '22px');
			playAgainKnop.style('font-weight', 'bold');
			playAgainKnop.style('padding', '14px 28px');
			playAgainKnop.style('border', '2px solid white');
			playAgainKnop.style('border-radius', '12px');
			playAgainKnop.style('cursor', 'pointer');
			playAgainKnop.style('box-shadow', '0 4px 10px rgba(0,0,0,0.3)');
			playAgainKnop.style('transition', '0.2s');

			playAgainKnop.mouseOver(function() {
					playAgainKnop.style('background', '#2563eb');
			});

			playAgainKnop.mouseOut(function() {
					playAgainKnop.style('background', '#172554');
			});

			playAgainKnop.mousePressed(opnieuwSpelen);

		}
}
function opnieuwSpelen() {
		playAgainKnop.remove();
		playAgainKnop = null;

		jos.x = 400;
		jos.y = 300;
		jos.gehaald = false;
		jos.frameNummer = 3;

		alice.x = 700;
		alice.y = 200;
		bob.x = 600;
		bob.y = 300;

		bom1.x = floor(random(10, 17)) * raster.celGrootte;
		bom1.y = 0;
		bom1.richting = 1;

		bom2.x = floor(random(10, 17)) * raster.celGrootte;
		bom2.y = 300;
		bom2.richting = -1;

		pingpongbal.x = 100;
		pingpongbal.y = 100;
		pingpongbal.speedX = 15;
		pingpongbal.speedY = 10;

		loop();
}