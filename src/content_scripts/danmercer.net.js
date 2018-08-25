window.addEventListener('load', function() {
	'use strict';
	var script = document.createElement("SCRIPT");
	script.src = browser.runtime.getURL("page_scripts/danmercer.net.js");
	document.head.appendChild(script);
});
