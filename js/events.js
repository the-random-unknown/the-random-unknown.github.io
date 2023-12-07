// tehlensto je na nahodne eventy co vas muzou potkat
// nakonej jsem to jeste predelal takze nejsou porad to stejny
// vzhledem k tomu ze nektere eventy mohou byt pristupne az po jinych
// struktura je celkove o dost slozitejsi a je postupne zabudovana a arrayich
// taky jsem se to pokusil rozdelit pomoci komentatu aby se v tom dalo lepe orientovat

let events = [];
let jump = " &#10140";
let battle = " &#9760";

//============================ Specialni eventy ============================
let special_events = [];
events.push(special_events)

special_events[0] = async function () {
	destination.setName("Planeta " + getRadnomCode());
	destination.setFaction(1);
	destination.setStatus(0);

	await output.write("Vypadá to že tenhle planeta je nobydlená a nic se neděje.");

	output.createButton("Skočit dál &#10140;", generateRandomEvent);
}

//============================ Kazoni – 01 - voda ============================
let kazoni_voda = [];
events.push(kazoni_voda);

kazoni_voda[0] = async function () {
	destination.setName("Planeta " + getRadnomCode());
	destination.setFaction(1);
	destination.setStatus(0);

	await output.write("Při cestě galaxií jsi potkal zastaralou nákladní loď, která tě žádá o pomoc.");

	output.createButton("Rozhodneš se pomoci", kazoni_voda[2]);
	output.createButton("Využiješ své převahy a rozhodneš se loď zničit" + battle, kazoni_voda[3]);
	output.createButton("Na prosbu nereaguješ a letíš jinam" + jump, generateRandomEvent);
};

kazoni_voda[2] = async function () {
	await output.write("Loď patří Ocampům, kteří žijí na své planetě Ocampa pod nadvládou Kazonů, v otroctví. Na planetě je kritický nedostatek vody, proto má nákladní loď za úkol najít asteroid se zásobou ledu, která po vytěžení přiveze na Ocampu. Kapitán a zároveň jediný člen posádky lodi ti přislíbí velkou odměnu v podobě paliva a surovin, kterých mají na planetě přebytek, pokud jim pomůžeš nalézt a dovézt na planetu vodu.");

	output.createButton("Použiješ své dálkové senzory k nalezení vhodného asteroidu s vodou", kazoni_voda[4]);
	output.createButton("Nezajímá tě to, rozloučíš se a odlétáš" + jump, generateRandomEvent);
	output.createButton("Rozhodneš se nákladní loď obsadit a vyrabovat" + battle, kazoni_voda[5]);
};

kazoni_voda[3] = async function () {
	new Battle(6, 5, async function () {
		await output.write("V troskách lodi se žádný materiál nenachází.")

		output.createButton("Skočit dál (-1 k palivu za bojové manévry, -30% karma pro Ocamp)" + jump, function () {
			inventory.addFuel(-2);
			factions.addRelation(2, -30);
			generateRandomEvent();
		})
	});
}

kazoni_voda[4] = async function () {
	await output.write("Podařilo se ti najít vhodný asteroid, vytěžíte led a vracíte se na Ocamp. Na oběžné dráze hlídkuje loď Kazonů, vypadá trochu slabší, než ty.");

	output.createButton("Zaútočíš na Kazony" + battle, kazoni_voda[6]);
	output.createButton("Za boj ti zisk nestojí. (-2 k palivu, -10 karma pro Ocamp, +10% karma pro Kazony)", function () {
		inventory.addFuel(-2);
		factions.addRelation(3, -10);
		factions.addRelation(2, 10);
		generateRandomEvent();
	})

	output.createButton("Spojíš se s Kazony a loď Ocampů jim předáš (-1 k palivu, +30% karma pro Kazony)", function () {	
		inventory.addFuel(-1);
		factions.addRelation(2, 30);
		generateRandomEvent();
	})
}

kazoni_voda[5] = async function () {
	new Battle(2, 2, async function () {
		await output.write("Kapitán napadení nečekal, podařilo se ti ho přemoci. Bohužel na lodi není nic, co bys mohl použít.");
		output.createButton("Pokračovat (Karma pro Ocamp -30%)", function () {
			factions.addRelation(3, -30);
			generateRandomEvent();
		});
	});
}

kazoni_voda[6] = async function () {
	new Battle(10, 5, async function () {
		await output.write("Máš volnou cestu na planetu.");
		if (inventory.getScrap() > 2) output.createButton("-2 palivo za bojové manévry, -2 materiál na opravy", kazoni_voda[7]);
		else output.createButton("-2 palivo za bojové manévry, -5 zdravý z nedostatku materiálu na opravy", kazoni_voda[7]);
	});
}