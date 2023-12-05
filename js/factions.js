// tohle jsem nakonec z idventare presunul do samostatneho panelu

class factionsPanel {
	factions = document.getElementById("factions");
	factionsArray = ["Neznámá", "Galaktická Federace", "Nomádi v Exilu", "Temný Syndikát", "Aliance", "Architekti"]; 
	factionRelations = [50, 100, 50, 50, 20, 80];

	setRelation(faction, number) {
		this.factionRelations[faction] = number
		this.update();
	}

	addRelation(faction, number) {
		this.factionRelations[faction] += number;
		this.update();
	}

	getRelation(faction) {
		return this.factionRelations[faction];
	}

	getFaction(index) {
		return this.factionsArray[index];
	}

	update() {
		this.factions.innerHTML = "";
		this.factions.appendChild(document.createElement("div")).innerHTML = "<b>Frakce</b>";
		this.factions.innerHTML += (
			"Karma" + ": " + this.factionRelations[0] + "%<br>" +
			this.factionsArray[1] + ": " + this.factionRelations[1] + "%<br>" +
			this.factionsArray[2] + ": " + this.factionRelations[2] + "%<br>" +
			this.factionsArray[3] + ": " + this.factionRelations[3] + "%<br>" +
			this.factionsArray[4] + ": " + this.factionRelations[4] + "%<br>" +
			this.factionsArray[5] + ": " + this.factionRelations[5] + "%"
		);
	}
}
