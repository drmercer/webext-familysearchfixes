(function() {
	'use strict';
	var script = document.createElement("SCRIPT");
	script.src = browser.runtime.getURL("page_scripts/indexing.js");
	document.body.appendChild(script);
	console.log("Content script run");
}());
