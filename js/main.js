const ships = ["./src/ships/achilles.png", "./src/ships/aegis.png", "./src/ships/discovery.png", "./src/ships/dragonfire.png", "./src/ships/nimitz.png", "./src/ships/rambler.png", "./src/ships/responder.png", "./src/ships/shieldbreaker.png", "./src/ships/slipstream.png", "./src/ships/sparrow.png", "./src/ships/watchdog.png", "./src/ships/zumwait.png"];

const inventory = new inventoryPanel;
const factions = new factionsPanel;
const destination = new destinationPanel;
const output = new outputController;

// javascript nema neco jako main() funkci tak jsem si udelel vlastni a volam ji jako "onload" v game.html na <body>
async function main() {
	updateClock();
	inventory.update();
	destination.update();
	factions.update();
	generateRandomEvent();
}
