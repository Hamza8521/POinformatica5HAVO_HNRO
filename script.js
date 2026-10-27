var raster = {
		aantalRijen: 12,

var raster = {
	aantalRijen: 12,
	aantalKolommen: 18,
	celGrootte: null,
  
	berekenCelGrootte() {
		this.celGrootte = canvas.width/this.aantalKolommen;
	},
	teken() {
		background('violet')
		push();
		noFill();
		stroke('grey');
		for (rij=0;rij<this.aantalRijen;rij++) {
			for (kolom=0;kolom<this.aantalKolommen;kolom++) {
				rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
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

		this.x = constrain(this.x,0,canvas.width);
		this.y = constrain(this.y,0,canvas.height - raster.celGrootte);

		if (this.x == canvas.width) {
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
		image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
	}
}


var alice = {
	x: 700,
	y: 200,
	sprite: null,
	stapGrootte: null,

	beweeg() {
		this.x += floor(random(-1,2))*this.stapGrootte;
		this.y += floor(random(-1,2))*this.stapGrootte;

		this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
		this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
	},

	toon() {
		image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
	}
}


var bob = {
	x: 600,
	y: 300,
	sprite: null,
	stapGrootte: null,

	beweeg() {
		this.x += floor(random(-1,2))*this.stapGrootte;
		this.y += floor(random(-1,2))*this.stapGrootte;

		this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
		this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
	},

	toon() {
		push();
		fill('blue');
		ellipse(this.x, this.y, raster.celGrootte);
		pop();
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

function preload() {
	brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
	alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");
	bob.sprite = alice.sprite;
	
	for (var b = 0;b < jos.aantalFrames;b++) {
		frameJos = loadImage("images/sprites/Jos100px/Jos_" + b + ".png");
		jos.animatie.push(frameJos);
	}
}

function setup() {
	canvas = createCanvas(900,600);
	canvas.parent('processing');
	frameRate(10);
	textFont("Verdana");
	textSize(90);
	raster.berekenCelGrootte();
	bom1.x = floor(random(5, 9)) * raster.celGrootte;
	bom2.x = floor(random(5, 9)) * raster.celGrootte;
	jos.stapGrootte = 1*raster.celGrootte;
	alice.stapGrootte = 1*raster.celGrootte;
	bob.stapGrootte = 1*raster.celGrootte;
	bom1.stapGrootte = 0.5*raster.celGrootte;
	bom2.stapGrootte = 1*raster.celGrootte;
}

function draw() {
	background(brug);
	raster.teken();
	
	jos.beweeg();
	alice.beweeg();
	bob.beweeg();
	bom1.beweeg();
	bom2.beweeg();
	
	jos.toon();
	alice.toon();
	bob.toon();
	bom1.toon();
	bom2.toon();
	
	if (jos.wordtGeraakt(alice)) {
		noLoop();
	}
	if (jos.wordtGeraakt(bob)) {
		noLoop();
	}
	if (jos.wordtGeraakt(bom1)) {
		noLoop();
	}
	if (jos.wordtGeraakt(bom2)) {
			noLoop();
	}	
	if (jos.gehaald) {
		background('green');
		fill('white');
		text("Je hebt gewonnen!",30,300);
		noLoop();
	}
	if (jos.wordtGeraakt(alice)) {
		background('red');
		fill('black');
		text("Je hebt verloren!",30,300);
		noLoop();
	}
	if (jos.wordtGeraakt(bob)) {
		background('red');
		fill('black');
		text("Je hebt verloren!",30,300);
		noLoop();
	}
	if (jos.wordtGeraakt(bom1)) {
		background('red');
		fill('black');
		text("Je hebt verloren!",30,300);
		noLoop();
	}
	if (jos.wordtGeraakt(bom2)) {
		background('red');
		fill('black');
		text("Je hebt verloren!",30,300);
		noLoop();
	}
	
}