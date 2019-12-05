// ==UserScript==
// @name     The Order logtime counter
// @version  1.0.0
// @include  https://profile.intra.42.fr/
// @run-at   document-idle
// @license  GPL-3.0-or-later
// @author   aseo
// ==/UserScript==

setTimeout(firstRun, 500);

function firstRun() {
	updateLogtime();
	setInterval(updateLogtime, 60000);
}

function updateLogtime() {

	let logs = document.getElementById("user-locations");
	let index = logs.children.length, counter = 0, elem, logtime = [0, 0];
	if (index != 0) {
		index--;
		while (counter != 7 && index > 0) {
			elem = logs.children[index];
			if (elem.tagName == 'g') {
				counter++;
				elem.dataset.originalTitle.split('h').forEach((elm, i) => {logtime[i] += Number(elm)})
			}
			index--;
		}
		while (logtime[1] >= 60) {
			logtime[1]-= 60;
			logtime[0]++;
		}
		logs.parentElement.children[0].innerHTML = "LOGTIME: " + logtime[0] + "h" + ("0" + logtime[1]).slice(-2);
	}
}
