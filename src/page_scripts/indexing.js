(function() {
	"use strict";

	var viewer, viewport;

	waitForEl("idx-ribbon-viewer")
		.then(start);

	function start(ribbonViewerEl) {
		console.log("Start");
		// Getting viewer and viewport
		viewer = angular
			.element(ribbonViewerEl)
			.scope()
			.ribbonCtrl
			.ribbon
			.getOpenSDMain()
			.getViewer();
		viewport = viewer.viewport;

		setTimeout(doDemoStuff, 3000);

		console.log("End");
	}

	function doDemoStuff() {
		// Zoom
		viewport.getZoom();
		viewport.zoomBy(3.0);

		// Pan
		var ctr = viewport.getCenter();
		ctr.x += 100
		viewport.panTo(ctr);
	}

	//======================================================================
	//			Utilities

	function waitForEl(selector, interval) {
		interval = interval || 1000;
		var resolve;
		var prom = new Promise(res => resolve = res);

		checkForEl();

		return prom;

		function checkForEl() {
			var el = document.querySelector(selector);
			if (el) {
				resolve(el);
			} else {
				setTimeout(checkForEl, interval);
			}
		}
	}

}())
