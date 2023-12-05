// tehlensto je na nahodne eventy co vas muzou potkat
// neni nustno to procititat
// je to +- porad to stejne jenom s jinymi parametry a jinou stromovou strukturou nebo nejakou semi-rng podminkou
// ale nejsou stejny, kazdy z nich ma jinou strukturu

let events = [];
const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// &#10140;
// &#9876;

// Special event
events[0] = async function () {
	destination.setName("Planeta " + getRadnomCode());
	destination.setFaction(1);
	destination.setStatus(0);

	await output.write("Vypadá to že tenhle planeta je nobidlená a nic se neděje.");

	button_next = output.createButton("Skočit dál &#10140;");
	button_next.onclick = async function () { generateRandomEvent(); };
}

// 1. Space Anomaly
events[1] = async function () {
	destination.setName("Sektor " + getRadnomCode());
	destination.setFaction(0);
	destination.setStatus(0);

	await output.write("Loď narazila na zvláštní anomálii. Můžeš se rozhodnout ji prozkoumat, což může být velmy riskantní, ale vede k potenciálním odměnám.");
	button_continue = output.createButton("Ignorovat &#10140;");
	button_continue.onclick = async function () { generateRandomEvent(); }

	button_investigate = output.createButton("Vyslat sondy");
	button_investigate.onclick = async function () {
		await output.write("Posádka spustila sondy, aby shromáždila další data z bezpečné vzdálenosti. To snižuje riziko přímého vystavení anomálii, ale poskytuje omezené množství informací.<br><br>Po pár hodinách průzkumu sondy objevily důležite zdroje v podobě paliva do fůzního reaktoru naší lodi.");

		button_next = output.createButton("Ukončit průzkum (+2 paliva) &#10140;");
		button_next.onclick = async function () {
			idventory.addFuel(2);
			generateRandomEvent();
		}

		button_team = output.createButton("Vyslat tým");
		button_team.onclick = async function () {
			await output.write("Posádka poslala malý tým v raketoplánu, aby fyzicky prozkoumal anomálii. Tato možnost s sebou nese riziko, že bude raketoplán postižen anomálií, ale může také vést k objevení unikátních artefaktů nebo pokročilé mimozemské technologie.");

			if (Math.random() < (factions.getRelation(0) / 100)) {
				await output.write("Naštěstí se týmu podařilo bezpečně vratit a dovézt s sebou další palivo do reaktoru. Risk se protentokrát vyplatil.");

				button_next = output.createButton("Ukončit průzkum (+7 paliva) &#10140;");
				button_next.onclick = async function () {
					idventory.addFuel(7);
					generateRandomEvent();
				}
			} else {
				await output.write("Bohužel během průzkumu se vyskitly komplikace které měli za následek extrémní nárust radiace v oblasti kolem anomálie. Průzkumný tým se naštěstí stačil vratit včas, ale raketoplán s lodí utrpěly značné poškození. Vypadá to že anomálie není tak neškodná jak se na první pohled zdálo.");
				idventory.addHealth(-20);

				button_next = output.createButton("Ukončit průzkum (+2 paliva) &#10140;");
				button_next.onclick = async function () {
					idventory.addFuel(2);
					generateRandomEvent();
				}
			}
		}
	}

	button_sent = output.createButton("Vyslat tým");
	button_sent.onclick = async function () {
		await output.write("Posádka poslala malý tým v raketoplánu, aby fyzicky prozkoumal anomálii. Tato možnost s sebou nese riziko, že bude raketoplán postižen anomálií, ale může také vést k objevení unikátních artefaktů nebo pokročilé mimozemské technologie.");

		if (Math.random() > (factions.getRelation(0) / 100)) {
			await output.write("Naštěstí se týmu podařilo bezpečně vratit a dovézt s sebou důležite zdroje které našly během průzkumu v podobě paliva do fůzního reaktoru naší lodi.");

			button_next = output.createButton("Ukončit průzkum (+5 paliva) &#10140;");
			button_next.onclick = async function () {
				idventory.addFuel(5);
				generateRandomEvent();
			}
		}
		
		else {
			await output.write("Bohužel během průzkumu se vyskitly komplikace které měli za následek extrémní nárust radiace v oblasti kolem anomálie. Průzkumný tým se naštěstí stačil vratit včas, ale raketoplán s lodí utrpěly menší poškození. Vypadá to že anomálie není tak neškodná jak se na první pohled zdálo.");
			idventory.addHealth(-10);

			button_next = output.createButton("Ukončit průzkum &#10140;");
			button_next.onclick = async function () {
				generateRandomEvent();
			}
		}
	}
}

// Distress Signal
events[2] = async function () {
	destination.setName("Sektor " + getRadnomCode());
	destination.setFaction(0);
	destination.setStatus(0);

	await output.write("Naše loď zachytila nouzový signál jiného plavidla. Můžeš se rozhodnout prozkoumat tento tísňový signál a buď zachránit přeživší, nebo odhalit past nastraženou piráty.");

	button_continue = output.createButton("Ignorovat &#10140;");
	button_continue.onclick = async function () { factions.addRelation(0, -5); generateRandomEvent(); }

	button_investigate = output.createButton("Pokusit se o záchranu");
	button_investigate.onclick = async function () {
		factions.addRelation(0, 5);

		if (Math.random() < (factions.getRelation(2) / 100)) {
			await output.write("Naštěstí se jednalo o opravdový nouzový signál. Loď patřící Nomádům přišla o všechno palivo atk vás šáda o pomoc.");

			if (idventory.getFuel() > 3) {
				button_give = output.createButton("Poskitnou palivo (-2 palivo) &#10140");
				button_give.onclick = async function () {
					idventory.addFuel(-2);
					factions.addRelation(2, 5);
					generateRandomEvent();
				}
			}

			button_reject = output.createButton("Odmítnou pomoc &#10140");
			button_reject.onclick = async function () {
				factions.addRelation(2, -5);
				generateRandomEvent();
			}
		}
		
		else {
			await output.write("Bohužel se jednalo o falešný nouzový signál. Loď patřící Nomádům se vynořila zpoza trosek lodi Galaktické Federace.");
			
			button_attack = output.createButton("Zaútočit &#9876;");
			button_attack.onclick = async function () {
				const battle = new Battle(4, 2, callback_001)
			}

			async function callback_001() {
				await output.write("Super");
			}

			button_escape = output.createButton("Pokusit se útéct");
			button_escape.onclick = async function () {
				
			}
		}
	}
}

async function nevim() {
	await output.write("kamo prosim at to funguje");
}
