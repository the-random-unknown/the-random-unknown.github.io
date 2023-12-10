class inventoryPanel {
	inventory;
	image_path;
	
	health = 100;
	fuel = 10;
	credits = 20;
	scrap = 10;
	items = [];

	constructor() {
		const container = document.getElementById("leftContainer");
		this.image_path = ships[(Math.floor(Math.random() * ships.length))];
		
		// pro tyhle funkce jsem asi mel udelat samostatny "namespace" aby byli universalni
		const tagImg = document.createElement("img");
		tagImg.className = "panel statusContainer";
		tagImg.src = this.image_path;
		container.appendChild(tagImg);

		this.inventory = document.createElement("div");
		this.inventory.className = "panel statusContainer";
		container.appendChild(this.inventory);
	}

	setHealth(number) {
		this.health = number;
		this.update();
	}

	setFuel(number) {
		this.fuel = number;
		this.update();
	}

	setCredits(number) {
		this.credits = number;
		this.update();
	}

	setScrap(number) {
		this.scrap = number;
		this.update();
	}

	addHealth(number) {
		this.health += number;
		if (this.getHealth() < 0) this.setHealth(0);
		else if (this.getHealth() > 100) this.setHealth(100);
		this.update();
	}

	addFuel(number) {
		this.fuel += number;
		if (this.getFuel() < 0) this.setFuel(0);
		else if (this.getFuel() > 100) this.setFuel(100);
		this.update();
	}

	addCredits(number) {
		this.credits += number;
		if (this.getCredits() < 0) this.setCredits(0);
		else if (this.getCredits() > 100) this.setCredits(100);
		this.update();
	}

	addScrap(number) {
		this.scrap += number;
		if (this.getScrap() < 0) this.setScrap(0);
		else if (this.getScrap() > 100) this.setScrap(100);
		this.update();
	}

	addItem(item) {
		this.items.push(String(item));
	}

	getHealth() {
		return this.health;
	}

	getShip() {
		return this.image_path;
	}

	getFuel() {
		return this.fuel;
	}

	getCredits() {
		return this.credits;
	}

	getScrap() {
		return this.scrap;
	}

	getItem(string) {
		this.items.includes(String(string));
	}


	// vim ze tyhle uipdate funkce by se daly dat do jedne univerzalni, ale zas jako nekde se ty radky vzit musi
	update() {
		this.inventory.innerHTML = "";
		this.inventory.appendChild(document.createElement("div")).innerHTML = "<b>Inventář</b>";
		this.inventory.innerHTML += (
			"Zdraví:" + this.health + "%<br>" +
			"Palivo:" + this.fuel + "<br>" +
			"Kredity:" + this.credits + "<br>" +
			"Materiály:" + this.scrap + "<br>"
		);
	}
}
