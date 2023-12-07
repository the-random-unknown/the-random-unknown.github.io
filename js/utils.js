const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Definice funkce používanou pro timing (hlavne pro output.write() funkci)
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// geneace nahodneho eventu
async function generateRandomEvent() {
	console.log("generateRandomEvent() started");

	output.clearButtons();
	output.clearOutput();
	inventory.addFuel(-1);
	
	if (inventory.getFuel() < 1) gameOver(score);
	
	// vezmu nahodny element z arraye eventu
	let new_event = (Math.floor(Math.random() * events.length));
	
	// puzivam new_event a while loop abych zabranil opakovani se eventu hned za sebou
	while (new_event == currect_event) {
		new_event = (Math.floor(Math.random() * events.length));
	}

	events[new_event][0]();
	currect_event = new_event;
	score++;

	console.log("exiting generateRandomEvent()");
}

// puziva se pro generovani nazvu planet a sektoru
function getRadnomCode() {
	return (Math.floor(Math.random() * 100) + "-" +
	characters[(Math.floor(Math.random() * characters.length))] + "-" +
	Math.floor(Math.random() * 10) + "-" +
	characters[(Math.floor(Math.random() * characters.length))]);
}

// zarizuje updatovani hodin v top-baru (upraveny kod z w3schools)
function updateClock() {
	const today = new Date();
	let hours = today.getHours();
	let minutes = today.getMinutes();
	let seconds = today.getSeconds();
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	document.getElementById('clock').innerHTML =  hours + " : " + minutes + " : " + seconds;
	setTimeout(updateClock, 1000);
}

// pomocna funkce k updateClock()
function checkTime(param) {
	if (param < 10) {param = "0" + param};
	return param;
}

// funkce ktera ukocuje hru a preda score
function gameOver(score) {
	sessionStorage.setItem("score", score);
	window.location.href= "./game_over.html";
}

function goToMenu() {
	window.location.href= "./index.html";
}

function openFullscreen() {
	if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
	else if (document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullscreen();
	else if (document.documentElement.msRequestFullscreen) document.documentElement.msRequestFullscreen();
}
  
