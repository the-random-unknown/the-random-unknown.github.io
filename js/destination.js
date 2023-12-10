class destinationPanel {
	destination;
	image;
	statuses = ["Neznámý", "Obydlená", "Neobidlená", "Industrializovaná"];

	name = "4546B";
	status = 0;
	faction = 0;

	constructor() {
		const container = document.getElementById("rightContainer");

		this.image = document.createElement("img");
		this.image.className = "panel statusContainer";
		this.image.src = "./src/planet.png";
		container.appendChild(this.image);

		this.destination = document.createElement("div");
		this.destination.className = "panel statusContainer";
		container.appendChild(this.destination);
	}

	setName(string) {
		this.name = string;
		this.update();
	}

	setStatus(index) {
		this.status = index;
		this.update();
	}

	setFaction(index) {
		this.faction = index;
		this.update();
	}

	generateRandomPlanet() {
		this.image.style = (
			"filter: hue-rotate(" + (Math.random() * 360)  + "deg" + ");"
		);
	}

	update() {
		this.destination.innerHTML = "";
		this.destination.appendChild(document.createElement("div")).innerHTML = "<b>Destinace</b>";
		this.destination.innerHTML += (
			"Název: " + this.name + "<br>" +
			"Status: " + this.statuses[this.status] + "<br>" +
			"Frakce: " + factions.getFaction(this.faction)
		);
	}
}
