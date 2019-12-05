// ==UserScript==
// @name     The Order logtime counter
// @version  1.0.2
// @include  https://profile.intra.42.fr/
// @run-at   document-idle
// @license  GPL-3.0-or-later
// @author   aseo
// @updateURL https://openuserjs.org/meta/DontBreakAlex/The_Order_logtime_counter.meta.js
// @downloadURL https://openuserjs.org/install/DontBreakAlex/The_Order_logtime_counter.user.js
// ==/UserScript==

updateLogtime();
setInterval(updateLogtime, 60000);

function updateLogtime() {
	let logs = document.getElementById("user-locations");
	let index = logs.children.length, counter = 0, elem;
	if (index == 0) {
		setTimeout(updateLogtime, 500);
		return ;
	}
	if (updateLogtime.logtime === undefined) {
		updateLogtime.logtime = [0, 0];
		index--;
		while (counter != 7 && index > 0) {
			elem = logs.children[index];
			if (elem.tagName == 'g') {
				counter++;
				elem.dataset.originalTitle.split('h').forEach((elm, i) => {updateLogtime.logtime[i] += Number(elm)});
			}
			index--;
		}
	}
	else updateLogtime.logtime[1]++;
	while (updateLogtime.logtime[1] >= 60) {
		updateLogtime.logtime[1] -= 60;
		updateLogtime.logtime[0]++;
	}
	logs.parentElement.children[0].innerHTML = "LOGTIME: " + updateLogtime.logtime[0] + "h" + ("0" + updateLogtime.logtime[1]).slice(-2);
}
