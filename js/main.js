const idventory = new idventoryPanel;
const factions = new factionsPanel;
const destination = new destinationPanel;
const output = new outputPanel;
let score = 0;

async function generateRandomEvent() {
	console.log("generateRandomEvent() started");

	output.clearButtons();
	output.clearOutput();
	idventory.addFuel(-1);
	
	if (idventory.getFuel() < 1) gameOver(score);
	
	events[(Math.floor(Math.random() * events.length))]();
	score++;

	console.log("exiting generateRandomEvent()");
}

// trochu si zacinam rikat jestly jsem se na to nemel vykaslat a proste to okopirovat z chat-gpt jako vsichni ostatni
// bych se mel aspon dost radku protoze bych to nepsal tak kratce a "efektivne"
// i kdyz vim ze vetsina tech veci co tu delam neni moc efektivni, musite uznat ze to zabira celkem malo prostoru

async function main() {
	updateClock();
	idventory.update();
	destination.update();
	factions.update();
	generateRandomEvent();
}
