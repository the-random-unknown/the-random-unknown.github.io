const output = new outputPanel;

async function main() {
	updateClock();
	const score = sessionStorage.getItem('score');
	await output.write("GAME OVER<br>Skóre: " + score);

	const retry = output.createButton("Zkusit znovu");
	retry.onclick = async function () { window.location.href= "./game.html"; };

	const menu = output.createButton("Zpět do Menu");
	menu.onclick = async function () { window.location.href= "./index.html"; };
}
