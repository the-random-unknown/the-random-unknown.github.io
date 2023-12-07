class outputPanel {
	// načítaní elementů ze základniho HTML
	output = document.getElementById("output");
	buttons = document.getElementById("buttons");
	battle = document.getElementById("battle");
	speed = 35;

	constructor() {
		this.battle.style.display = "none";
	}

	// tohle je ta funkce co jsem mel jako prvni, tady to vsechno zacalo
	// ... kolik bolest jsem si mohl usetrit kdybych to nedal do classky
	async write(string) {
		this.clearButtons();
		this.speed = 35;

		for (let i = 0; i < string.length; i++) {
			await sleep(this.speed);

			if (string[i] == "<") {
				let tag = "";

				while (string[i] != ">" || i > string.length) {
					tag += string[i];
					i++;
				}

				this.output.innerHTML += (tag + ">");
			}

			else {
				this.output.innerHTML += string[i];
			}

			this.output.scrollIntoView({
				behavior: "instant",
				block: "end",
				inline: "end"
			});
		}

		this.output.innerHTML += "<br><br>";
		this.speed = 35;
	}

	skipWrite() {
		this.speed = 1;
	}

	createButton(string, callback) {
		// tohle by se theoreticky dalo optimalizovat zjednodusit pomoci to "namespacu" 
		const tag = document.createElement("div");
		this.buttons.appendChild(tag);
		tag.className = "button panel";
		tag.innerHTML = string;
		tag.onclick = async function () { callback() };
		return tag;
	}

	clearOutput() {
		this.output.innerHTML = "";
	}

	clearButtons() {
		this.buttons.innerHTML = "";
	}

	setBattleVisible() {
		this.output.style.display = "none";
		this.battle.style.display = "flex"; // flex / grid / block
	}
	
	setOutputVisible() {
		this.battle.style.display = "none";
		this.output.style.display = "block";
	}
}
