(function() {
	'use strict';
	var ext = (typeof browser === "undefined") ? chrome : browser;
	var script = document.createElement("SCRIPT");
	script.src = ext.runtime.getURL("page_scripts/indexing.js");
	document.body.appendChild(script);
}());
