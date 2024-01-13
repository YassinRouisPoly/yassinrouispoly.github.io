let ignoreEmptySubject = false;

$(document).ready(function () {
	$("form button.send").click(function (e) {
		e.preventDefault();
		if (document.getElementById("contact_subject").value.length == 0 && !ignoreEmptySubject) {
			ignoreEmptySubject = true;
			alert("Aucun objet n'a été saisi ! Un message sans objet risque d'être ignoré et donc, non pris en considération. Voulez-vous continuer ?");
			return
		}
		if (confirm("Aucun système de messagerie n'a encore été configuré, souhaitez-vous ouvrir votre boite mail par défaut ?")) {
			let mail = {}

			switch (document.getElementById("contact_dest").value) {
				case "projet": {
					mail.dest = "compagnie.hassan@gmail.com";
					break;
				}
				case "demande_service": {
					mail.dest = "compagnie.hassan+demande_service@gmail.com";
					break;
				}
				case "fondateur": {
					mail.dest = "compagnie.hassan+fondation@gmail.com";
					break;
				}
			}

			if (document.getElementById("contact_name").value) {
				mail.name = document.getElementById("contact_name").value;
			}

			if (document.getElementById("contact_subject").value) {
				mail.subject = document.getElementById("contact_subject").value;
			}

			mail.body = document.getElementById("contact_body").value;
			window.open(`mailto:${mail.dest}?body=${encodeURIComponent(`De : ${mail.name || "Inconnu"}\nÀ  : ${mail.dest}\nOb : ${mail.subject}\n\n--- Début de la demande ---\n\n${mail.body}\n\n--- Fin de la demande ---`)}&subject=${encodeURIComponent(mail.subject || "<Sans objet>")}%20-%20${encodeURIComponent(mail.name || "<Sans nom>")}`)
		}
	})
})