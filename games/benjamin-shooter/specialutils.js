

function Deodorant() {

	let x = width * 1 / 12;
	let y = height + unit * 7;
	let vy = -100*unit / frameRate;
	let vx = -4*unit / frameRate;
	
	let actDur = frameRate * 15;
	let blinkDur = frameRate * 0;
	let blinkSpan = frameRate * 3 / 4;

	let deoImg = {
		img: imgs.deodorant,
		relX: 0.6,
		relY: 0.1,
		size: unit * 30
	}
	let fogImg = {
		img: imgs.fog,
		//relX: 0.18,
		relX: 0.28,
		relY: 0.75,
		size: 0,
		startTime: undefined,
		scaling: 200*unit / frameRate,
		show: false
	}

	let states = {
		rising: 0,
		fogging: 1,
		blinking: 2,
		disappearing: 3
	}
	let state = states.rising;

	this.update = function () {
		if (state == states.rising) {
			y += vy;
			if (y <= height / 2) {
				fogImg.show = true;
				fogImg.startTime = frameCount;
				enemies.updateDisabled = true;
				state = states.fogging;
			}
		} else if (state == states.fogging) {
			fogImg.size += fogImg.scaling;
			x += vx;
			if (frameCount - fogImg.startTime >= actDur - blinkDur) {
				fogImg.startTime = frameCount;
				state = states.blinking;
			}
		} else if (state == states.blinking) {
			fogImg.size += fogImg.scaling;
			x += vx;
			if ((frameCount - fogImg.startTime) % blinkSpan < blinkSpan / 2) {
				fogImg.show = false;
			} else {
				fogImg.show = true;
			}
			if (frameCount - fogImg.startTime >= blinkDur && !fogImg.show) {
				state = states.disappearing;
				enemies.updateDisabled = false;
			}
		}
	}

	this.show = function () {

		image(deoImg.img, x - deoImg.relX * deoImg.size,
			y - deoImg.relY * deoImg.size,
			deoImg.size, deoImg.size);

		if (fogImg.show) {
			image(fogImg.img, x - fogImg.relX * fogImg.size,
				y - fogImg.relY * fogImg.size,
				fogImg.size, fogImg.size);
		}

		if (state == states.disappearing) {
			deodorant = null;
			prevDeodorant = frameCount;
		}

	};

}

function SchoolbagElias() {
	let states = {
		falling: 0,
		dropping: 1,
		rising: 2,
		disappearing: 3,
	}
	let state = states.falling;

	let bagImg = {
		img: imgs.satchSchultasche,
		x: undefined,
		y: undefined,
		vy: 120*unit / frameRate,
		relX: 0.5,
		relY: 0.02,
		size: unit * 30,
	}

	let eliasImg = {
		img: imgs.elias,
		x: width * 2 / 3,
		y: -unit * 50,
		vy: 60*unit / frameRate,
		relX: 0.34,
		relY: 0.97,
		size: unit * 100,
	}

	this.update = function () {
		if (state == states.falling) {
			eliasImg.y += eliasImg.vy;
			bagImg.x = eliasImg.x;
			bagImg.y = eliasImg.y;
			if (eliasImg.y >= height * 1 / 4) {
				state = states.dropping;
			}
		} else if (state == states.dropping) {
			bagImg.y += bagImg.vy;
			if (bagImg.y > height + unit * 10) {
				state = states.rising;
			}
		} else if (state == states.rising) {
			eliasImg.y -= eliasImg.vy;
			if (eliasImg.y < -unit * 10) {
				state = states.disappearing;
			}
		}
		if (state == states.falling || state == states.dropping) {
			for (let i = enemies.length - 1; i >= 0; i--) {
				if (enemies[i].x >= width / 2 &&
					enemies[i].y - enemies[i].size / 2 <= bagImg.y + bagImg.size &&
					enemies[i].y >= bagImg.y
				) {
					enemies.splice(i, 1);
				}
			}
		}
	}

	this.show = function () {
		image(bagImg.img,
			bagImg.x - bagImg.relX * bagImg.size,
			bagImg.y - bagImg.relY * bagImg.size,
			bagImg.size, bagImg.size);

		image(eliasImg.img,
			eliasImg.x - eliasImg.relX * eliasImg.size,
			eliasImg.y - eliasImg.relY * eliasImg.size,
			eliasImg.size, eliasImg.size);

		if (state == states.disappearing) {
			schoolbagElias = null;
			prevSchoolbagElias = frameCount;
		}


	}
}

function MegaphoneMatisse() {
	
}

