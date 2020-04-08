// affichage de la barre de navigation sur téléphone ou sur PC
function navPhone() {
	var x = document.getElementById("navPhone");

	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}
}

// texte sous les vidéos
function setAnimation(id) {
	document.getElementById(id).style = 'animation: 1s ease 0s 1 normal none running fadedown;';
}

function undisplayText(id) {
	document.getElementById(id).style = 'display: none;';
}

function getStartButtonText() {
	return "<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Appuyez sur le bouton <i class='material-icons' style='cursor: pointer;'>play_arrow</i> ci-dessus pour commencer la vidéo, le bouton <i class='material-icons' style='cursor: pointer;'>pause</i> pour mettre la vidéo sur pause et le bouton <i class='material-icons' style='cursor: pointer;'>replay</i> pour recommencer la vidéo depuis le début.<br />"
}

function getContinueButtonText() {
	return "<br /><br />Appuyez sur le bouton <i class='material-icons' style='cursor: pointer;'>play_arrow</i> ci-dessus pour continuer la vidéo.<br />"
}