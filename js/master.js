function mobileMenuAction() {
	var action = document.getElementById("mobileMenuDiv");

	if (action.style.display == "flex") {
		action.style.display = "none";
	}
	
	else {
		action.style.display = "flex";
		// action.style.transform = "rotateY(180deg)"
	}
}
