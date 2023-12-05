const idventory = new idventoryPanel;
const factions = new factionsPanel;
const destination = new destinationPanel;
const output = new outputPanel;

function crafting() {

}

function combat(lives, damage) {
	
}

async function generateRandomEvent() {
	// console.log("generateRandomEvent() started");// just for debugging
	output.clearButtons();
	output.clearOutput();
	idventory.addFuel(-1);

	if (idventory.getFuel() < 1) console.log("you're dead");

	events[(Math.floor(Math.random() * events.length))]();
	// console.log("exiting generateRandomEvent()"); // also just for debugging
}

// trochu si zacinam rikat jestly jsem se na to nemel vykaslat a proste to okopirovat z chat-gpt jako vsichni ostatni
// bych se mel aspon dost radku protoze bych to nepsal tak kratce a "efektivne"
// i kdyz vim ze vetsina tech veci co tu delam neni moc efektivni, musite uznat ze to zabira celkem malo prostoru

function main() {
	updateClock();
	idventory.update();
	destination.update();
	factions.update()
}
