class destinationPanel {
	destination = document.getElementById("destination");
	statuses = ["Neznámý", "Obydlená", "Neobidlená", "Industrializovaná"];

	name = "4546B";
	status = 0;
	faction = 0;

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
