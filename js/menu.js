const output = new outputPanel;

async function main() {
	updateClock();
	await output.write("Vítejte ve Stellar Odyssey. Zde se vydáte na nebezpečnou cestu vesmírem jako kapitán malého vesmírného plavidla. Toto dobrodružství, inspirované hrou Faster Than Light (FTL), kombinuje strategické rozhodování, intenzivní bitvy a to vše v náhodně generovaném vesmíru.");
	await output.write("* This project serves only as a final project for the first year of study at my school. Please do not redistribute any parts of the project.")
	const hrat = output.createButton("Hrát");
	hrat.onclick = async function () { window.location.href= "./game.html"; };
}
