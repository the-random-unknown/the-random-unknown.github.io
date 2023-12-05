// Definice funkce používanou pro timing
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getRadnomCode() {
	return (Math.floor(Math.random() * 100) + "-" +
	characters[(Math.floor(Math.random() * characters.length))] + "-" +
	Math.floor(Math.random() * 10) + "-" +
	characters[(Math.floor(Math.random() * characters.length))]);
}

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

function checkTime(param) {
	if (param < 10) {param = "0" + param};
	return param;
}

function gameOver(score) {
	sessionStorage.setItem("score", score);
	window.location.href= "./game_over.html";
}

function goToMenu() {
	window.location.href= "./index.html";
}
