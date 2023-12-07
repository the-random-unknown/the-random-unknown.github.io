// ja fakt na to nemam, tohle uz je moc
// doslova kdyz jsem to udelal poprve tak to nufungovalo protoze to podelane "this." to nebralo jako object
// tak jsem to prepsal z classky do js obektu aby to bylo neco jako namespace
// nacez prisel dominik a zkusil pritat "let battle = this;" ... a ono to najednou funguje
// pomoc

class Battle {
	enemy_health_now;
	enemy_health_original;
	enemy_damage;
	enemy_mag = 0;
	player_mag = 0;
	callback_function;
	turn = 0;
	player = document.getElementById("battle_player");
	enemy = document.getElementById("battle_enemy");
	player_ship = document.getElementById("battle_image");
	enemy_ship = document.getElementById("enemy_ship");

	constructor(health, damage, callback) {
		output.clearButtons();
		this.enemy_ship.src = ships[(Math.floor(Math.random() * ships.length))];
		this.player_ship.src = inventory.getShip();
		output.setBattleVisible();
		this.enemy_health_now = health;
		this.enemy_health_original = health;
		this.enemy_damage = damage;
		this.callback_function = callback;
		this.playerTurn();
	}

	playerTurn() {
		const battle = this; // za tohle bych nekoho zavrazdil
		output.clearButtons();

		if (this.player_mag > 0) {
			const action_fire = output.createButton("Útok");
			action_fire.onclick = async function () { battle.enemyTurn(0); }
		}

		const action_reload = output.createButton("Nabýt");
		action_reload.onclick = async function () { battle.enemyTurn(1); }

		const action_shield = output.createButton("Obrana");
		action_shield.onclick = async function () { battle.enemyTurn(2); }
	}

	enemyTurn(p_action) {
		// logika pro souboj s neprately
		if (this.turn < 1) this.resolve(p_action, 1);
		else {
			if (this.enemy_mag < 1) this.resolve(p_action, Math.round(Math.random()) ? 1 : 2); // myslim ze tenhle zapis vynahradi za ty radky na zacatku
			else if (this.enemy_health_now < 2) this.resolve(p_action, Math.round(Math.random()) ? (Math.round(Math.random()) ? 0 : 1) : 2);
			else this.resolve(p_action, Math.round(Math.random()) ? (Math.round(Math.random()) ? 1 : 2) : 0);
		}
		this.turn++;
	}

	printPlayer(string) {
		this.player.innerHTML = string + "<br>Nabyto: " + this.player_mag;
	}

	printEnemy(string) {
		this.enemy.innerHTML = string + "<br>Nabyto: " + this.enemy_mag;
	}

	resolve(p_action, e_action) {
		// 0 = firebattle
		// 1 = reload
		// 2 = shield
		
		if (e_action == 0) {
			if (p_action != 2) {
				inventory.addHealth(-this.enemy_damage);
			}

			this.enemy_mag--;
		}
		
		if (e_action == 1) {
			this.enemy_mag++;
		}
		
		if (p_action == 0) {
			if (e_action != 2) {
				this.enemy_health_now--;
			}
			
			this.player_mag--;
		}
		
		if (p_action == 1) {
			this.player_mag++;
		}
		
		if (this.enemy_health_now < 1) {
			this.endBattle();
			return;
		}
		
		if (inventory.getHealth() < 1) {
			gameOver(score);
			return;
		}

		switch (p_action) {
			case 0:
				this.printPlayer("Vystřelil");
				break;
			case 1:
				this.printPlayer("Nabýjel");
				break;
			case 2:
				this.printPlayer("Bránil se");
				break;
		}

		switch (e_action) {
			case 0:
				this.printEnemy("Vystřelil");
				break;
			case 1:
				this.printEnemy("Nabýjel");
				break;
			case 2:
				this.printEnemy("Bránil se");
				break;
		}

		console.log("enemy health: " + this.enemy_health_now);
		this.playerTurn();
	}

	async endBattle() {
		const battle = this; // a uz zase
		output.setOutputVisible();
		await output.write("Vítezství!");
		output.createButton("Pokrčovat", battle.callback_function);
	}
}


