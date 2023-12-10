// tohle je na nahodne eventy co vas muzou potkat
// nakonec jsem to jeste predelal, takze nejsou porad to stejny
// vzhledem k tomu ze nektere eventy mohou byt pristupne az po jinych
// struktura je celkove o dost slozitejsi a je postupne zabudovana a arrayich
// taky jsem se to pokusil rozdelit pomoci komentatu aby se v tom dalo lepe orientovat

let events = [];
let completed = [];
let jump = " &#10140";
let battle = " &#9760";

//============================ Specialni eventy ============================
let special_events = [];
events.push(special_events)

special_events[0] = async function () {
	destination.setName("Planeta " + getRadnomCode());
	destination.setFaction(1);
	destination.setStatus(0);

	await output.write("Vypadá to že tenhle planeta je neobydlená a nic se neděje.");

	output.createButton("Skočit dál &#10140;", generateRandomEvent);
}

//============================ Kazoni - 01 - voda ============================
/*
Kazoni - 01 - voda
1)	Při cestě galaxií jsi potkal zastaralou nákladní loď, která tě žádá o pomoc.
a.	Rozhodneš se pomoci => 2
b.	Využiješ své převahy a rozhodneš se loď zničit => 3
c.	Na prosbu nereaguješ a letíš jinam => 99
2)	Loď patří Ocampům, kteří žijí na své planetě Ocampa pod nadvládou Kazonů, v otroctví. Na planetě je kritický nedostatek vody, proto má nákladní loď za úkol najít asteroid se zásobou ledu, která po vytěžení přiveze na Ocampu. Kapitán a zároveň jediný člen posádky lodi ti přislíbí velkou odměnu v podobě paliva a surovin, kterých mají na planetě přebytek, pokud jim pomůžeš nalézt a dovézt na planetu vodu.
a.	Použiješ své dálkové senzory k nalezení vhodného asteroidu s vodou => 4
b.	Nezajímá tě to, rozloučíš se a odlétáš => 99
c.	Rozhodneš se nákladní loď obsadit a vyrabovat => 5
3)	Souboj: Životy - 1, síla - 1
a.	Výhra - žádný materiál, -1 k palivu za bojové manévry, -30% karma pro Ocamp
b.	Prohra - žádný materiál, -3 k palivu za únikové manévry, -30% karma pro Ocamp
4)	Podařilo se ti najít vhodný asteroid, vytěžíte led a vracíte se na Ocamp. Na oběžné dráze hlídkuje loď Kazonů, vypadá trochu slabší, než ty
a.	Zaútočíš na Kazony => 5
b.	Za boj ti zisk nestojí, odlétáš: -2 k palivu, -10 karma pro Ocamp, +10% karma  pro Kazony => 99
c.	Spojíš se s Kazony a loď Ocampů jim předáš: -1 k palivu, +30% karma pro Kazony => 99
5)	Kapitán napadení nečekal, podařilo se ti ho přemoci. Bohužel na lodi není nic, co bys mohl použít. Karma na Ocamp -30%
a.	Pokračovat => 99
6)	Souboj s Kazony: Kazoni síla o 20% menší, než ty, životy o 20% menší, než ty 
a.	Výhra: -1 palivo za bojové manévry, -2 za materiál na opravy;  máte volnou cestu na planetu => 7
b.	Prohra : -3 za palivo na únikové manévry, -4 materiál na opravy
7)	Podařilo se ti na planetu dopravit velké množství vody, můžeš si vybrat odměnu. Karma +30% pro Ocamp
a.	+2 palivo, +2 materiál
b.	+5 palivo
c.	+5 materiál
99) návrat do hlavního výběru.
*/

let kazoni_voda = [];
events.push(kazoni_voda);

kazoni_voda[0] = async function () {
	destination.setName("Planeta " + getRadnomCode());
	destination.setFaction(1);
	destination.setStatus(0);

	await output.write("Při cestě galaxií jsi potkal zastaralou nákladní loď, která tě žádá o pomoc. Poznáváš výsostné znaky Ocampů");

	output.createButton("Rozhodneš se pomoci", kazoni_voda[2]);
	output.createButton("Využiješ své převahy a rozhodneš se loď zničit" + battle, kazoni_voda[3]);
	output.createButton("Na prosbu nereaguješ a letíš jinam" + jump, generateRandomEvent);
};

kazoni_voda[2] = async function () {
	await output.write("Loď skutečně patří Ocampům, kteří žijí na své planetě Ocampa pod nadvládou Kazonů, v otroctví. Na planetě je kritický nedostatek vody, proto má nákladní loď za úkol najít asteroid se zásobou ledu, která po vytěžení přiveze na Ocampu. Kapitán a zároveň jediný člen posádky lodi ti přislíbí velkou odměnu v podobě paliva a surovin, kterých mají na planetě přebytek, pokud jim pomůžeš nalézt a dovézt na planetu vodu.");

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

kazoni_voda[7] = async function () {
	await output.write("Podařilo se ti na planetu dopravit velké množství vody, můžeš si vybrat odměnu. Karma +30% pro Ocamp");
	factions.addRelation(2, 30);

	output.createButton("+2 palivo, +2 materiál", function () {
		inventory.addFuel(2);
		inventory.addScrap(2);
		generateRandomEvent();
	})
	output.createButton("+5 palivo", function () {
		inventory.addFuel(5);
		generateRandomEvent();
	})
	output.createButton("+5 materiál", function () {
		inventory.addScrap(5);
		generateRandomEvent();
	})
}

//============================ Kazoni - 02 - Odplata ============================
/*
Kazoni - 02 - Odplata - přístupná po Kazon 01
1)	Kazoni ti nezapomněli pomoc, kterou jsi poskytl Ocampům. Poslali proti tobě 2 válečné lodi stejného typu, jako ta, kterou jsi u Ocamp již potkal.
a.	Pokusíš se uniknout do blízkého oblaku ionizovaného plynu => 2
b.	Přijmeš výzvu a budeš bojovat => 3
c.	Zkusíš se domluvit => použije se karma pro Kazony
i.	Vetší než 60% - můžeš se vykoupit: 2x palivo, 2x materiál => 99
ii.	Menší než 60% - boj => 3
2)	Skrýváš se v oblaku ionizovaného plynu. Oblak ti poskytuje ochranu, ale zjišťuješ, že poškozuje plášť lodi => -1 na materiál
a.	Počkáš, až se Kazoni přiblíží, a ze zálohy je napadneš => souboj 4)
b.	Počkáš, až se Kazoni přiblíží, a vypálíš raketu do oblaku plynu => 5)
c.	Počkáš a uvidíš, co Kazoni udělají => 2)
3)	Souboj 2 lodi Kazonů, každá o 30% menší sílu i životy, než ty
a.	Vítězství: -1 palivo, -3 materiál, -30% karma pro Kazony => 99
b.	Prohra: -3 palivo, -3 materiál, -20% karma pro Kazony => 99
4)	Souboj 2 lodi Kazonů, máš výhodu překvapení: každá o 50% menší sílu i životy, než ty
a.	Vítězství: -1 palivo, -3 materiál, -30% karma pro Kazony => 99
b.	Prohra: -3 palivo, -3 materiál, -20% karma pro Kazony => 99
5)	Vypálil jsi raketu do oblaku plynu. Prudká exotermická reakce těžce poškodila lodi Kazonů takže již nejsou schopné tě pronásledovat. Bohužel také Tvoje loď utrpěla značné škody (-3 materiál). -20% karma pro Kazony => 99
*/

let kazoni_odplata = [];
events.push(kazoni_odplata);

kazoni_odplata[0] = async function () {
	if(!isCompleted(kazoni_voda)) generateRandomEvent();
	destination.setName("Planeta " + getRadnomCode());
	destination.setFaction(1);
	destination.setStatus(0);

	await output.write("Kazoni ti nezapomněli pomoc, kterou jsi poskytl Ocampům. Poslali proti tobě 2 válečné lodi stejného typu, jako ta, kterou jsi u Ocamp již potkal");

	output.createButton("Pokusíš se uniknout do blízkého oblaku ionizovaného plynu", function () {
			inventory.addScrap(-1);
			kazoni_odplata[2]();
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
/*
Temný Syndikát 01 - artefakt Zrcadlo z Erisetu - přistupný po Kazon 01
1)	 Potkal jsi loď Temného Syndikátu. Žádají tě o schůzku kvůli obchodnímu jednáni
a.	Přijmeš schůzku na palubě své lodi => 2
b.	Rozhodneš se se Syndikátem nejednat a odlétáš => 3
2)	Zástupce Syndikátu ti připomene setkání s Ocampy - na jejich planetě se nachází vzácný artefakt Zrcadlo z Erisetu, které prý má schopnost nahlédnout do budoucnosti (kromě odpovědi na obligátní otázku „Zrcadlo, zrcadlo, kdo je na světě nejkrásnější?“). Protože jsi se s Ocampy již potkal, Syndikát se rozhodl tě pro tuto misi využít. Odměna za úspěch bude +5 materiál, +3 palivo, +20% karma se Syndikátem
a.	Přijmeš úkol a letíš na Ocamp => 4
b.	Nechceš letět na Ocamp, protože Kazoni tě zrovna nemilují; požaduješ ochranu => 11
c.	Rovnou odmítneš úkol => 3
3)	Rozloučíte se a odlétáš. Než ztratíš loď Syndikátu z dohledu, všimneš si dvou kazonských lodí, které ti přehrazují cestu.
a.	Pustíš se do boje s Kazony: souboj => 5
b.	Otáčíš loď a vracíš se k lodi Temného syndikátu => 6
c.	Zkusíš uniknout Kazonům => 7
4)	Na orbitě Ocampu hlídkuje loď Kazonů. Dojde ti, že se asi jen tak na povrch nedostaneš a rozhodně bude problém artefakt odvézt. 
a.	Zavoláš Kazony a zkusíš je přesvědčit, aby tě na planetu pustili
i.	Karma pro Kazony větší než 60% => můžeš na planetu => 8
ii.	Karma pro Kazony menší než 60% => nesmíš přistát na planetě => 12
b.	Zaútočíš na Kazony a spolehneš se na moment překvapení => 9
c.	Rovnou půjdeš na přistání na planetě => 10
5)	Souboj: 2 lodi Kazonů, každá o 40% menší síla a životy, než ty
a.	Vítězství: -20% karma pro Kazony
b.	Prohra: -20% karma pro Kazony, -2 palivo, -3 materiál
6)	Rozhodl jsi se ještě jednou jednat se Syndikátem. Tentokrát již odměna bude nižší - +1 palivo a +1 materiál
a.	Přijmeš úkol a letíš na Ocamp => 4
b.	Nechceš letět na Ocamp, protože Kazoni tě zrovna nemilují; požaduješ ochranu => 11
7)	Únik se ti podařil, bohužel nemáš žádný zisk: -1 palivo, -1 materiál
8)	Přistál jsi na planetě a díky dobrým vztahům s Ocampy jsi našel Zrcadlo z Erisetu. Ocampové požadují polovinu tvých zásob vody.
a.	Přijmeš nabídku a odvážíš Zrcadlo s Erisetu Temnému Syndikátu: zisk podle dohody	 karma +10% Temný Syndikát, +10% Ocampové => 99
b.	Přijmeš nabídku, ale Zrcadlo nepředáš Temnému syndikátu, necháš si ho: karma Temný syndikát -20%, karma Ocampove +10%, žádný zisk, -1 palivo => 99
9)	Souboj s Kazony: loď o 30% menší síla a životy, než ty
a.	Vítězství: -20% karma s Kazony, můžeš na planetu => 8
b.	Prohra: -20% karma s Kazony, -2 palivo, -3 materiál => 99
10)	 Zvolil jsi velmi riskantní manévr. Kazoni tě pronásledují do atmosféry, je ti jasné, že po přistání tě zničí. Volíš ústup a mizíš ze sektoru: -20% karma pro Kazony, -10% karma pro Syndikát, -1 palivo, -1 materiál 
a.	Pokračovat => 99
11)	 Dohaduješ se Syndikátem ochranu pře Kazony. Syndikát ti vyhovuje, zaručuje ti volný přístup na planetu
a.	Pokračovat => 8
12)	Vyjednávání nepomohlo
a.	Zaútočíš na Kazony a spolehneš se na moment překvapení => 9
b.	Rovnou půjdeš na přistání na planetě => 10
99) návrat na hlavní obrazovku
*/

let dark_syndicate_esriset = [];
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
	await output.write("Zástupce Syndikátu ti připomene setkání s Ocampy - na jejich planetě se nachází vzácný artefakt Zrcadlo z Erisetu, které prý má schopnost nahlédnout do budoucnosti (kromě odpovědi na obligátní otázku „Zrcadlo, zrcadlo, kdo je na světě nejkrásnější?“). Protože jsi se s Ocampy již potkal, Syndikát se rozhodl tě pro tuto misi využít. Odměna za úspěch bude +5 materiál, +3 palivo, +20% karma se Syndikátem");

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
			dark_syndicate_esriset[8]();
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
			inventory.addFuel(-1);
			inventory.addScrap(-1);
			generateRandomEvent();
		});
}

dark_syndicate_esriset[8] = async function () {
	await output.write("Přistál jsi na planetě a díky dobrým vztahům s Ocampy jsi našel Zrcadlo z Erisetu. Ocampové požadují polovinu tvých zásob vody.");

	output.createButton("Přijmeš nabídku a odvážíš Zrcadlo s Erisetu Temnému Syndikátu: zisk podle dohody. Karma +10% Temný Syndikát, +10% Ocampové" + jump, function () {
			inventory.addFuel(3);
			inventory.addScrap(5);
			factions.addRelation(1, 10);
			factions.addRelation(3, 10);
			generateRandomEvent();
		});
	output.createButton("Přijmeš nabídku, ale Zrcadlo nepředáš Temnému syndikátu, necháš si ho: karma Temný syndikát -20%, karma Ocampove +10%, žádný zisk, -1 palivo" + jump, function () {
			inventory.addFuel(-1);
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
			dark_syndicate_esriset[8]();
		});
	});
}

dark_syndicate_esriset[10] = async function () {
	await output.write("Zvolil jsi velmi riskantní manévr. Kazoni tě pronásledují do atmosféry, je ti jasné, že po přistání tě zničí. Volíš ústup a mizíš ze sektoru: -20% karma pro Kazony, -10% karma pro Syndikát, -1 palivo, -1 materiál.");

	output.createButton("Pokračovat" + jump, function () {
			inventory.addFuel(-1);
			inventory.addScrap(-1);
			factions.addRelation(1, -20);
			factions.addRelation(3, -10);
			generateRandomEvent();
		});
}

dark_syndicate_esriset[11] = async function () {
	await output.write("Dohaduješ se Syndikátem ochranu pře Kazony. Syndikát ti vyhovuje, zaručuje ti volný přístup na planetu.");

	output.createButton("Pokračovat", dark_syndicate_esriset[8]);
}

dark_syndicate_esriset[12] = async function () {
	await output.write("Vyjednávání nepomohlo.");

	output.createButton("Zaútočíš na Kazony a spolehneš se na moment překvapení" + battle, dark_syndicate_esriset[9]);
	output.createButton("Rovnou půjdeš na přistání na planetě", dark_syndicate_esriset[10]);
}

//============================ Temný syndikát - odplata ============================
/*
Temný Syndikát 02 - odplata
1)	Zastavila tě loď Temného syndikátu. 
a.	Máš na palubě ukradené Zrcadlo z Erisetu => 2
b.	Nemáš na palubě Zrcadlo z Erisetu => 4
2)	Syndikát požaduje vydání Zrcadla, zaplatí za něj 3 paliva a 3 materiály
a.	Vydáš zrcadlo, +10% karma pro Temný syndikát, +3 paliva, +3 materiál => 99
b.	Rozhodneš se pro boj, loď Syndikáti je skoro stejně silná, jako tu (90% síla, 50% životy) => 3
3)	Souboj s lodí Syndikátu
a.	Vítězství, -20% karma pro Temný Syndikát => 99
b.	Porážka: -20% karma pro Temný Syndikát, -1 palivo, -1 materiál => 99
4)	Startuje se scénář Temný Syndikát 01 - Zrcadlo z Erisetu
*/

let temny_syndikat_odplata = [];
events.push(temny_syndikat_odplata);

temny_syndikat_odplata[0] = async function () {
	await output.write("Zastavila tě loď Temného syndikátu.");

	output.createButton("Máš na palubě ukradené Zrcadlo z Erisetu", temny_syndikat_odplata[2]);
	output.createButton("Nemáš na palubě Zrcadlo z Erisetu", dark_syndicate_esriset[0]);
}

temny_syndikat_odplata[2] = async function () {
	await output.write("Syndikát požaduje vydání Zrcadla, zaplatí za něj 3 paliva a 3 materiály");

	output.createButton("Vydáš zrcadlo, +10% karma pro Temný syndikát, +3 paliva, +3 materiál" + jump, function () {
			inventory.addFuel(3);
			inventory.addScrap(3);
			factions.addRelation(1, 10);
			generateRandomEvent();
		});
	output.createButton("Rozhodneš se pro boj, loď Syndikáti je skoro stejně silná, jako tvoje" + battle, temny_syndikat_odplata[3]);
	output.createButton("" + jump, generateRandomEvent);
}

temny_syndikat_odplata[3] = async function () {
	new Battle(9, 4, async function () {
		await output.write("");
		factions.addRelation(1, -20);
		output.createButton("", generateRandomEvent);
	});
}

//============================ Nomádi v exilu - duranium ============================
/*
Nomádi v exilu 01 - duranium
1)	Před sebou vidíte vesmírnou loď s charakteristickými hrby, je ti jasné, že to je loď Nomádů v Exilu. Co chceš udělat?
a.	Navázat spojení => 2
b.	Ignorovat => 99
2)	Nomádi pro Tebe mají návrh - na povrchu planety, která patří Temnému Syndikátu, se nachází důl na velmi vzácné duranium. Bohužel nemají technologii na těžbu, proto nabízejí spolupráci tobě. Odměnou budou 3 jednotky paliva a 2 jednotky materiálu.
a.	Spustíš se na planetu => 3
b.	Odmítneš spolupráci: -10% pro karmu Nomádů => 99
3)	Těžba se vydařila, bohužel při odletu tě Temný Syndikát identifikoval => -20% karma pro Temný Syndikát. +10% karma pro Namády, +3 palivo, +2 materiál.
a.	Pokračovat => 99
*/

let nomadi_duranium = [];
events.push(nomadi_duranium);

nomadi_duranium[0] = async function () {
	await output.write("Před sebou vidíte vesmírnou loď s charakteristickými hrby, je ti jasné, že to je loď Nomádů v Exilu. Co chceš udělat?");

	output.createButton("Navázat spojení", nomadi_duranium[2]);
	output.createButton("Ignorovat" + jump, generateRandomEvent);
}

nomadi_duranium[2] = async function () {
	await output.write("Nomádi pro Tebe mají návrh - na povrchu planety, která patří Temnému Syndikátu, se nachází důl na velmi vzácné duranium. Bohužel nemají technologii na těžbu, proto nabízejí spolupráci tobě. Odměnou budou 3 jednotky paliva a 2 jednotky materiálu.");

	output.createButton("Spustíš se na planetu", nomadi_duranium[3]);
	output.createButton("Odmítneš spolupráci:" + jump, function () {
			factions.addRelation(1, -10);
			generateRandomEvent();
		});
}

nomadi_duranium[3] = async function () {
	await output.write("Těžba se vydařila, bohužel při odletu tě Temný Syndikát identifikoval");

	output.createButton("Pokračovat" + jump, function () {
			inventory.addFuel(3);
			inventory.addScrap(2);	
			factions.addRelation(1, -20); // Syndikát
			factions.addRelation(3, 10); // Nomádi
			generateRandomEvent();
		});
}

//============================ Nomádi v exilu - lov ============================
/*
Nomádi v Exilu 02 - Lov
1)	Dálkové senzory ti ukázaly válečný křižník Temného Syndikátu, jak pronásleduje nákladní loď Nomádů z Exilu. Přidáš se k pronásledování, abys vylepšil karmu a trochu se napakoval, nebo pomůžeš ochránit nákladní loď?
a.	Zahájíš palbu na nákladní loď Nomádů => 2
b.	Zahájíš palbu na křižník Temného Syndikátu => 3
c.	Nebudeš se do toho míchat => 99
2)	Přesným zásahem jsi vyřadil motory nákladní lodi. Chceš přirazit, ale do cesty se ti postavila loď Temného Syndikátu. Nabíjejí zbraně a vůbec se nechtějí dělit o kořist.
a.	Bude boj => 4
b.	Ustupuješ => 99
3)	Zvolil jsi boj s lodí Temného Syndikátu, abys ochránil nákladní loď. Má o 20% méně síly, než ty, ale o 20% více životů
a.	Vítězství => 5
b.	Prohra -2 materiál na oprav, -1 zdraví => 99
4)	 Zvolil jsi boj s lodí Temného Syndikátu, abys měl loď Nomádů jen pro sebe. Má o 20% méně síly, než ty, ale o 20% více životů
a.	Vítězství => 6
b.	Prohra -2 materiál na oprav, -1 zdraví, -10% karma Temný Syndikát => 99
5)	Nomádi ti jako projev vděčnosti věnovali 3 paliva a 2 materiály, +10% karma Nomádi
a.	Pokračovat => 99 
6)	Máš pro sebe celou loď Nomádů. Posádka se vzdala, ale poškodil sis karmu pro Nomády o -20%. Získal jsi 1 palivo a 1 materiál.
a.	Pokračovat => 99
*/

let nomadi_hunt = [];
events.push(nomadi_hunt);

nomadi_hunt[0] = async function () {
	await output.write("Dálkové senzory ti ukázaly válečný křižník Temného Syndikátu, jak pronásleduje nákladní loď Nomádů z Exilu. Přidáš se k pronásledování, abys vylepšil karmu a trochu se napakoval, nebo pomůžeš ochránit nákladní loď?");

	output.createButton("Zahájíš palbu na nákladní loď Nomádů" + battle, nomadi_hunt[2]);
	output.createButton("Zahájíš palbu na křižník Temného Syndikátu" + battle, nomadi_hunt[3]);
	output.createButton("Nebudeš se do toho míchat" + jump, generateRandomEvent);
}

nomadi_hunt[2] = async function () {
	await output.write("Přesným zásahem jsi vyřadil motory nákladní lodi. Chceš přirazit, ale do cesty se ti postavila loď Temného Syndikátu. Nabíjejí zbraně a vůbec se nechtějí dělit o kořist.");

	output.createButton("Bude boj" + battle, nomadi_hunt[4]);
	output.createButton("Ustupuješ" + jump, generateRandomEvent);
}

nomadi_hunt[3] = async function () {
	new Battle(8, 6, async function () {
		await output.write("Zvolil jsi boj s lodí Temného Syndikátu, abys ochránil nákladní loď. Má o 20% méně síly, než ty, ale o 20% více životů.");
		output.createButton("Nomádi ti jako projev vděčnosti věnovali 3 paliva a 2 materiály, +10% karma Nomádi" + jump, function () {
			inventory.addFuel(3);
			inventory.addScrap(2);
			factions.addRelation(1, 10); // Nomádi
			generateRandomEvent();
		});
	});
}

nomadi_hunt[4] = async function () {
	new Battle(8, 6, async function () {
		await output.write("Zvolil jsi boj s lodí Temného Syndikátu, abys měl loď Nomádů jen pro sebe. Má o 20% méně síly, než ty, ale o 20% více životů");
		output.createButton("Máš pro sebe celou loď Nomádů. Posádka se vzdala, ale poškodil sis karmu pro Nomády o -20%. Získal jsi 1 palivo a 1 materiál" + jump, function () {
			inventory.addFuel(1);
			inventory.addScrap(1);
			factions.addRelation(1, -20); // Nomádi
			generateRandomEvent();
		});
	});
}

//============================ Architekti - Nesmírná síla hvězdy ============================
/*
Architekti 01 - Nesmírná síla hvězdy
1)	Na senzorech před sebou vidíš obrovský umělý objekt, který svými rozměry překonává vše, co jsi zatím ve vesmíru viděl - průměr koule je takový, že by se dovnitř vešla celá oběžná dráha Země. Objekt vyzařuje pouze infračervené záření. Zdá se, že jsi narazil na Dysonovu sféru. Chceš ji prozkoumat?
a.	Průzkum => 2
b.	Ignorovat => 99
2)	Při přiblížení ke kouli tvou oď zachytil nějaký paprsek energie, který vás přitahuje ke kouli. Vidíš, že se před vámi otevírá brána do nitra sféry.
a.	Zkusíš odletět => 3
b.	Necháš se vtáhnout do sféry => 4
3)	Všechny pokusy o uvolnění z tažného paprsku selhaly, jsi vtažen do sféry.
a.	Pokračovat => 4
4)	Je to skutečně Dysonova sféra - obyvatelná dutá koule, která obklopuje hvězdu v centru sféry. Na vnitřním povrchy sféry vidíš mnoho obřích staveb. Zároveň přijímáš rádiovou zprávu: „Tuto sféru vybudovali Architekti. Opuštěna byla před 211 lety, protože hvězda v centru je nestabilní a brzy se změní v supernovu“. Bližší průzkum hvězdy Architektům dává za pravdu - vnitřní tlak narůstá a hvězda se postupně rozpíná na rudého obra. 
a.	Ještě se zdržíš a zkusíš najít něco užitečného na povrchu => 5
b.	Okamžitě sféru opustíš  => 6
5)	Malý risk se vyplatil, získal jsi malé množství paliva (2 jednotky) a 4 jednotky materiálu. Také nějaký zdravotnický materiál (+1 ke zdraví)
a.	Pokračovat => 99
6)	Zajímavá zkušenost bez zisku
a.	Pokračovat => 99
*/

let architects_star_power = [];
events.push(architects_star_power);

architects_star_power[0] = async function () {
	await output.write("Na senzorech před sebou vidíš obrovský umělý objekt, který svými rozměry překonává vše, co jsi zatím ve vesmíru viděl - průměr koule je takový, že by se dovnitř vešla celá oběžná dráha Země. Objekt vyzařuje pouze infračervené záření. Zdá se, že jsi narazil na Dysonovu sféru. Chceš ji prozkoumat?");

	output.createButton("Průzkum", architects_star_power[2]);
	output.createButton("Ignorovat" + jump, generateRandomEvent);
}

architects_star_power[2] = async function () {
	await output.write("Při přiblížení ke kouli tvou loď zachytil nějaký paprsek energie, který vás přitahuje ještě blíž. Vidíš, že se před vámi otevírá brána do nitra sféry.");

	output.createButton("Zkusíš odletět", architects_star_power[3]);
	output.createButton("Necháš se vtáhnout do sféry", architects_star_power[4]);
}

architects_star_power[3] = async function () {
	await output.write("Všechny pokusy o uvolnění z tažného paprsku selhaly, jsi vtažen do sféry.");

	output.createButton("Pokračovat", architects_star_power[4]);
}

architects_star_power[4] = async function () {
	await output.write("Je to skutečně Dysonova sféra - obyvatelná dutá koule, která obklopuje hvězdu v centru sféry. Na vnitřním povrchy sféry vidíš mnoho obřích staveb. Zároveň přijímáš rádiovou zprávu: „Tuto sféru vybudovali Architekti. Opuštěna byla před 211 lety, protože hvězda v centru je nestabilní a brzy se změní v supernovu“. Bližší průzkum hvězdy Architektům dává za pravdu - vnitřní tlak narůstá a hvězda se postupně rozpíná na rudého obra.");

	output.createButton("Ještě se zdržíš a zkusíš najít něco užitečného na povrchu", architects_star_power[5]);
	output.createButton("Okamžitě sféru opustíš", architects_star_power[6]);
}

architects_star_power[5] = async function () {
	await output.write("Malý risk se vyplatil, získal jsi malé množství paliva (2 jednotky) a 4 jednotky materiálu. Také nějaký zdravotnický materiál (+20% ke zdraví)");

	output.createButton("Pokračovat" + jump, function () {
			inventory.addFuel(2);
			inventory.addScrap(4);
			inventory.addHealth(20);
			generateRandomEvent();
		});
}

architects_star_power[6] = async function () {
	await output.write("Zajímavá zkušenost, bohužel bez zisku.");
	
	output.createButton("Pokračovat" + jump, generateRandomEvent);
}

//============================ Architekti - Pyramida smutku ============================
/*
Architekti 02 - Pyramida smutku
1)	Tísňový signál z povrchu planety je poněkud zvláštní: „Prosíme o pomoc - Pyramida smutku operuje v nestandardním módu a pokud se nepodaří oprava, celá planeta bude neobyvatelná“. Chceš to prozkoumat, nebo se vydáš dál?
a.	V raketoplánu se vydáš na povrch => 2
b.	Letíš jinam => 99
2)	V raketoplánu sedáš vedle zdroje signálu. Už při přiblížení si všímáš charakteristické siluety, kterou znáš z Egypta - velké pyramidy, vysoké bezmála 200m. Cítíš nekonečný smutek, že taková krásná stavba je umístěna na tak nehostinné planetě.
a.	Radši to vzdáváš a letíš jinam => 99
b.	Vydáš se na průzkum pyramidy => 3
3)	V patě pyramidy vidíš vstupní bránu. Jak se blížíš k pyramidě, tvůj smutek narůstá. S ním cítíš i strach - možná bys měl co nejrychleji zmizet. Necháš se vést smutkem a budeš pokračovat v průzkumu, nebo odletíš?
a.	Pokračovat v průzkumu => 4
b.	Letíš jinam => 99
4)	Rozhodl ses pokračovat, vstupuješ do pyramidy. Strach ustoupil, ale smutek narůstá - jak se noříš do nitra pyramidy je stále větší. Po chvíli si všimneš, že intenzita smutku není stále stejná - na každém rozcestí cítíš v určitém směru větší smutek, zatímco v opačném směru cítíš úlevu. Necháš se vést smutkem, nebo úlevou?
a.	Následuješ smutek => 5
b.	Následuješ úlevu => 6
5)	Zesilující pocit smutku tě přivedl bludištěm až do středu pyramidy. Zde vidíš podivný artefakt - obří zářící modré vejce s karmínovým žilkováním. Smutek z vejce se na tebe přímo valí v téměř nesnesitelných vlnách. Prohlédneš si artefakt, nebo už chceš mít všechno za sebou, tak vejce zničíš laserem?
a.	Prohlédnout artefakt => 7
b.	Vystřelíš na vejce laserpalem => 8
6)	Pocit úlevy tě vyvedl z pyramidy ven. Stojíš před vchodem a zvažuješ, že by ses přeci jen mohl vrátit do nitra pyramidy, nebo odletíš.
a.	Odletíš => 99
b.	Zkusíš to ještě jednou v pyramidě => 5
7)	Artefakt vykazuje silnou energetickou nestabilitu, ale zdá se, že se ti povedlo najít ovládací panel s vypínačem. 
a.	Vypínáš artefakt => 9
b.	Přeci jen použiješ laserpal => 8
8)	Po zásahu laserpalem vejce explodovalo, odmrštěné zbytky artefaktu tě mírně zranily (-1 ke zdraví). Pocit smutku se vytratil, ale přihlásil se strach, jak teď najdeš cestu bludištěm ven z pyramidy. Ještě štěstí, že sis dělal záznam. Přesto ti cesta ven trvá mnohem déle, než bys čekal. U vchodu na tebe čekají podivné postavy v hábitech okrové barvy. Jsou to Architekti a děkují ti za záchranu - jejich citlivá nervová soustava jim nedovolila se k vejci přiblížit. Litují, že je vejce zničené, tak tvá odměna je jen symbolická - 2x palivo a 1x materiál.
a.	Pokračovat => 99
9)	Vypínač zafungoval, všechen smutek je pryč. Navíc se na podlaze objevily fosforeskující šipky, ukazující cestu k východu. Opatrně bereš vejce, ukládáš je do kontejneru a po šipkách opouštíš pyramidu. Cesta ti trvá dlouho, takže u východu z pyramidy už na tebe čekají podivné postavy v okrových hábitech. Jsou to Architekti a děkují ti za záchranu vejce - jejich citlivá nervová soustava jim nedovolila se k vejci přiblížit a chyba ve zpětné vazbě vedla k neustálému zesilování smutečního signálu. Dostáváš zaslouženou odměnu - 5x palivo a 3x materiál, +30% ke karmě pro Architekty, loučíš se a odlétáš 
a.	Pokračovat => 99
*/

let architects_pyramid_of_sadness = [];
events.push(architects_pyramid_of_sadness);

architects_pyramid_of_sadness[0] = async function () {
	await output.write("Tísňový signál z povrchu planety je poněkud zvláštní: „Prosíme o pomoc - Pyramida smutku operuje v nestandardním módu a pokud se nepodaří oprava, celá planeta bude neobyvatelná“. Chceš to prozkoumat, nebo se vydáš dál?");

	output.createButton("V raketoplánu se vydáš na povrch", architects_pyramid_of_sadness[2]);
	output.createButton("Letíš jinam" + jump, generateRandomEvent);
}

architects_pyramid_of_sadness[2] = async function () {
	await output.write("V raketoplánu sedáš vedle zdroje signálu. Už při přiblížení si všímáš charakteristické siluety, kterou znáš z Egypta - velké pyramidy, vysoké bezmála 200m. Cítíš nekonečný smutek, že taková krásná stavba je umístěna na tak nehostinné planetě.");

	output.createButton("Radši to vzdáváš a letíš jinam" + jump, generateRandomEvent);
	output.createButton("Vydáš se na průzkum pyramidy", architects_pyramid_of_sadness[3]);
}

architects_pyramid_of_sadness[3] = async function () {
	await output.write("V patě pyramidy vidíš vstupní bránu. Jak se blížíš k pyramidě, tvůj smutek narůstá. S ním cítíš i strach - možná bys měl co nejrychleji zmizet. Necháš se vést smutkem a budeš pokračovat v průzkumu, nebo odletíš?");

	output.createButton("Pokračovat v průzkumu", architects_pyramid_of_sadness[4]);
	output.createButton("Letíš jinam" + jump, generateRandomEvent);
}

architects_pyramid_of_sadness[4] = async function () {
	await output.write("Rozhodl ses pokračovat, vstupuješ do pyramidy. Strach ustoupil, ale smutek narůstá - jak se noříš do nitra pyramidy je stále větší. Po chvíli si všimneš, že intenzita smutku není stále stejná - na každém rozcestí cítíš v určitém směru větší smutek, zatímco v opačném směru cítíš úlevu. Necháš se vést smutkem, nebo úlevou?");

	output.createButton("Následuješ smutek", architects_pyramid_of_sadness[5]);
	output.createButton("Následuješ úlevu", architects_pyramid_of_sadness[6]);
}

architects_pyramid_of_sadness[5] = async function () {
	await output.write("Zesilující pocit smutku tě přivedl bludištěm až do středu pyramidy. Zde vidíš podivný artefakt - obří zářící modré vejce s karmínovým žilkováním. Smutek z vejce se na tebe přímo valí v téměř nesnesitelných vlnách. Prohlédneš si artefakt, nebo už chceš mít všechno za sebou, tak vejce zničíš laserem?");

	output.createButton("Prohlédnout artefakt", architects_pyramid_of_sadness[7]);
	output.createButton("Vystřelíš na vejce laserpalem", architects_pyramid_of_sadness[8]);
}

architects_pyramid_of_sadness[6] = async function () {
	await output.write("Pocit úlevy tě vyvedl z pyramidy ven. Stojíš před vchodem a zvažuješ, že by ses přeci jen mohl vrátit do nitra pyramidy, nebo odletíš.");

	output.createButton("Odlétáš" + jump, generateRandomEvent);
	output.createButton("Zkusíš to ještě jednou v pyramidě", architects_pyramid_of_sadness[6]);
}

architects_pyramid_of_sadness[7] = async function () {
	await output.write("Artefakt vykazuje silnou energetickou nestabilitu, ale zdá se, že se ti povedlo najít ovládací panel s vypínačem.");

	output.createButton("Vypínáš artefakt", architects_pyramid_of_sadness[9]);
	output.createButton("Přeci jen použiješ laserpal", architects_pyramid_of_sadness[8]);
}

architects_pyramid_of_sadness[8] = async function () {
	await output.write("Po zásahu laserpalem vejce explodovalo, odmrštěné zbytky artefaktu tě mírně zranily (-1 ke zdraví). Pocit smutku se vytratil, ale přihlásil se strach, jak teď najdeš cestu bludištěm ven z pyramidy. Ještě štěstí, že sis dělal záznam. Přesto ti cesta ven trvá mnohem déle, než bys čekal. U vchodu na tebe čekají podivné postavy v hábitech okrové barvy. Jsou to Architekti a děkují ti za záchranu - jejich citlivá nervová soustava jim nedovolila se k vejci přiblížit. Litují, že je vejce zničené, tak tvá odměna je jen symbolická - 2x palivo a 1x materiál.");

	output.createButton("Odlétáš" + jump, generateRandomEvent);
}

architects_pyramid_of_sadness[9] = async function () {
	await output.write("Vypínač zafungoval, všechen smutek je pryč. Navíc se na podlaze objevily fosforeskující šipky, ukazující cestu k východu. Opatrně bereš vejce, ukládáš je do kontejneru a po šipkách opouštíš pyramidu. Cesta ti trvá dlouho, takže u východu z pyramidy už na tebe čekají podivné postavy v okrových hábitech. Jsou to Architekti a děkují ti za záchranu vejce - jejich citlivá nervová soustava jim nedovolila se k vejci přiblížit a chyba ve zpětné vazbě vedla k neustálému zesilování smutečního signálu. Dostáváš zaslouženou odměnu - 5x palivo a 3x materiál, +30% ke karmě pro Architekty, loučíš se a odlétáš ");

	output.createButton("Odlétáš" + jump, generateRandomEvent);
}

//============================ Šablona ============================
// let sablona = [];
// events.push(sablona);

// sablona[0] = async function () {
// 	await output.write("");

// 	output.createButton("" + battle, sablona[1]);
// 	output.createButton("" + jump, sablona[1]);
// 	output.createButton("" + jump, generateRandomEvent);
// 	output.createButton("Pokračovat" + jump, function () {
// 			inventory.addFuel(-1);
// 			inventory.addScrap(-1);
// 			factions.addRelation(1, -20);
// 			generateRandomEvent();
// 		});
	
// }
// sablona[1] = async function () {
// 	new Battle(10, 5, async function () {
// 		await output.write("");
// 		if (inventory.getScrap() > 2) output.createButton("", sablona[0]);
// 		else output.createButton("", sablona[0]);
// 	});
// }
