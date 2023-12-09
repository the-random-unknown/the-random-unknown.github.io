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
		else output.createButton("-2 palivo za bojové manévry, -5 zdravi z nedostatku materiálu na opravy", kazoni_voda[7]);
	});
}


//============================ Kazoni – 02 - Odplata ============================
let kazoni_odplata = [];
events.push(kazoni_odplata);

kazoni_odplata[0] = async function () {
	destination.setName("Planeta " + getRadnomCode());
	destination.setFaction(1);
	destination.setStatus(0);

	await output.write("Kazoni ti nezapomněli pomoc, kterou jsi poskytl Ocampům. Poslali proti tobě 2 válečné lodi stejného typu, jako ta, kterou jsi u Ocamp již potkal");

	output.createButton("Pokusíš se uniknout do blízkého oblaku ionizovaného plynu", function () {
			inventory.addMaterial(-1);
			kazoni_odplata[2];
		});
	output.createButton("Přijmeš výzvu a budeš bojovat " + battle, kazoni_odplata[3]);
	output.createButton("Zkusíš se domluvit", kazoni_odplata[6]);
	output.createButton("Na prosbu nereaguješ a letíš jinam" + jump, generateRandomEvent);
};

kazoni_odplata[2] = async function () {
	await output.write("2)	Skrýváš se v oblaku ionizovaného plynu. Oblak ti poskytuje ochranu, ale zjišťuješ, že poškozuje plášť lodi, přišel jsi o 1 materiál.");

	output.createButton("Počkáš, až se Kazoni přiblíží, a ze zálohy je napadneš" + battle, kazoni_odplata[4]);
	output.createButton("Počkáš, až se Kazoni přiblíží, a vypálíš raketu do oblaku plynu", kazoni_odplata[5]);
	output.createButton("Počkáš a uvidíš, co Kazoni udělají", kazoni_odplata[2]);
};

kazoni_odplata[3] = async function () {
	new Battle(8, 5, async function () {
		await output.write("Podařilo se ti Kazony porazit.")

		output.createButton("Skočit dál (-1 k palivu za bojové manévry, -30% karma pro Kazony)" + jump, function () {
			inventory.addFuel(-1);
			factions.addRelation(3, -30);
			generateRandomEvent();
		})
	});
}

kazoni_odplata[4] = async function () {
	new Battle(5, 3, async function () {
		await output.write("Podařilo se ti Kazony porazit.")

		output.createButton("Skočit dál (-1 k palivu za bojové manévry, -3 materiál na opravu, -30% karma pro Kazony)" + jump, function () {
			if (inventory.getScrap() > 3) output.createButton("-1 palivo za bojové manévry, -3 materiál na opravy", kazoni_odplata[6]);
			else output.createButton("-1 palivo za bojové manévry, -5 zdravi z nedostatku materiálu na opravy", kazoni_odplata[6]);
	
			factions.addRelation(3, -30);
			generateRandomEvent();
		})
	});
}

kazoni_odplata[5] = async function () {
	await output.write("Vypálil jsi raketu do oblaku plynu. Prudká exotermická reakce těžce poškodila lodi Kazonů takže již nejsou schopné tě pronásledovat. Bohužel také Tvoje loď utrpěla značné škody (-3 materiál). -20% karma pro Kazony");

	output.createButton("Skočit dál (-3 materiál na opravu, -20% karma pro Kazony)" + jump, function () {
			if (inventory.getScrap() > 3) output.createButton("-3 materiál na opravy", kazoni_odplata[6]);
			else output.createButton("-5 zdravi z nedostatku materiálu na opravy", kazoni_odplata[6]);
	
			factions.addRelation(3, -20);
			generateRandomEvent();
		})
};

//============================ Temný Syndikát - Zrcadlo z Erisetu ============================
let dark_syndicate_eriset = [];
events.push(dark_syndicate_esriset);

dark_syndicate_esriset[0] = async function () {
	destination.setName("Planeta " + getRadnomCode());
	destination.setFaction(1);
	destination.setStatus(0);

	await output.write("Potkal jsi loď Temného Syndikátu. Žádají tě o schůzku kvůli obchodnímu jednání.");

	output.createButton("Přijmeš schůzku na palubě své lodi", dark_syndicate_esriset[2]);
	output.createButton("Rozhodneš se se Syndikátem nejednat a odlétáš" + jump, generateRandomEvent);
};

dark_syndicate_esriset[2] = async function () {
	await output.write("Zástupce Syndikátu ti připomene setkání s Ocampy – na jejich planetě se nachází vzácný artefakt Zrcadlo z Erisetu, které prý má schopnost nahlédnout do budoucnosti (kromě odpovědi na obligátní otázku „Zrcadlo, zrcadlo, kdo je na světě nejkrásnější?“). Protože jsi se s Ocampy již potkal, Syndikát se rozhodl tě pro tuto misi využít. Odměna za úspěch bude +5 materiál, +3 palivo, +20% karma se Syndikátem");

	output.createButton("Přijmeš úkol a letíš na Ocamp", dark_syndicate_esriset[4]);
	output.createButton("Nechceš letět na Ocamp, protože Kazoni tě zrovna nemilují; požaduješ ochranu", dark_syndicate_esriset[4]);
	output.createButton("Rovnou odmítneš úkol", dark_syndicate_esriset[3]);
};

dark_syndicate_esriset[3] = async function () {
	await output.write("Rozloučíte se a odlétáš. Než ztratíš loď Syndikátu z dohledu, všimneš si dvou kazonských lodí, které ti přehrazují cestu.");

	output.createButton("Pustíš se do boje s Kazony" + battle, dark_syndicate_esriset[5]);
	output.createButton("Otáčíš loď a vracíš se k lodi Temného syndikátu", dark_syndicate_esriset[6]);
	output.createButton("Zkusíš uniknout Kazonům", dark_syndicate_esriset[7]);
};

dark_syndicate_esriset[4] = async function () {
	await output.write("Na orbitě Ocampu hlídkuje loď Kazonů. Dojde ti, že se asi jen tak na povrch nedostaneš a rozhodně bude problém artefakt odvézt. ");

	output.createButton("Zavoláš Kazony a zkusíš je přesvědčit, aby tě na planetu pustili", dark_syndicate_esriset[8]);
	output.createButton("Zaútočíš na Kazony a spolehneš se na moment překvapení" + battle, dark_syndicate_esriset[9])
	output.createButton("Rovnou půjdeš na přistání na planetě", dark_syndicate_esriset[10])
}

dark_syndicate_esriset[5] = async function () {
	new Battle(10, 5, async function () {
		await output.write("Přemohl jsi Kazony, můžeš přistát na Ocampu");
		output.createButton("Pokračovat (Karma pro Kazony -20%)", function () {
			factions.addRelation(1, -20);
			dark_syndicate_esriset[8];
		});
	});
}

dark_syndicate_esriset[6] = async function () {
	await output.write("Rozhodl jsi se ještě jednou jednat se Syndikátem. Tentokrát již odměna bude nižší: +1 palivo a +1 materiál");

	output.createButton("Přijmeš úkol a letíš na Ocamp", dark_syndicate_esriset[4]);
	output.createButton("Nechceš letět na Ocamp, protože Kazoni tě zrovna nemilují; požaduješ ochranu", dark_syndicate_esriset[11])
}

dark_syndicate_esriset[7] = async function () {
	await output.write("Únik se podařil, ale nemáš žádný zisk: -1 palivo a -1 materiál");

	output.createButton("Pokračovat (Karma pro Kazony -20%)" + jump, function () {
			factions.addFuel(-1);
			factions.addScrap(-1);
			generateRandomEvent();
		});
}

dark_syndicate_esriset[8] = async function () {
	await output.write("Přistál jsi na planetě a díky dobrým vztahům s Ocampy jsi našel Zrcadlo z Erisetu. Ocampové požadují polovinu tvých zásob vody.");

	output.createButton("Přijmeš nabídku a odvážíš Zrcadlo s Erisetu Temnému Syndikátu: zisk podle dohody. Karma +10% Temný Syndikát, +10% Ocampové" + jump, function () {
			factions.addFuel(3);
			factions.addScrap(5);
			factions.addRelation(1, 10);
			factions.addRelation(3, 10);
			generateRandomEvent();
		});
	output.createButton("Přijmeš nabídku, ale Zrcadlo nepředáš Temnému syndikátu, necháš si ho: karma Temný syndikát -20%, karma Ocampove +10%, žádný zisk, -1 palivo" + jump, function () {
			factions.addFuel(-1);
			factions.addRelation(1, -20);
			factions.addRelation(3, 10);
			generateRandomEvent();
		});
}

dark_syndicate_esriset[9] = async function () {
	new Battle(7, 4, async function () {
		await output.write("Přemohl jsi Kazony, můžeš přistát na Ocampu");
		output.createButton("Pokračovat na planetu", function () {
			factions.addRelation(1, -20);
			dark_syndicate_esriset[8];
		});
	});
}

dark_syndicate_esriset[10] = async function () {
	await output.write("Zvolil jsi velmi riskantní manévr. Kazoni tě pronásledují do atmosféry, je ti jasné, že po přistání tě zničí. Volíš ústup a mizíš ze sektoru: -20% karma pro Kazony, -10% karma pro Syndikát, -1 palivo, -1 materiál.");

	output.createButton("Pokračovat" + jump, function () {
			factions.addFuel(-1);
			factions.addScrap(-1);
			factions.addRelation(1, -20);
			factions.addRelation(3, -10);
			generateRandomEvent();
		});
}

dark_syndicate_esriset[11] = async function () {
	await output.write("Dohaduješ se Syndikátem ochranu pře Kazony. Syndikát ti vyhovuje, zaručuje ti volný přístup na planetu.");

	output.createButton("Pokračovat", dark_syndicate_esriset[8]);
}

dark_syndicate_esriset[11] = async function () {
	await output.write("Vyjednávání nepomohlo.");

	output.createButton("Zaútočíš na Kazony a spolehneš se na moment překvapení" + battle, dark_syndicate_esriset[9]);
	output.createButton("Rovnou půjdeš na přistání na planetě", dark_syndicate_esriset[10]);
}
