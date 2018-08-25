(function() {
	"use strict";

	const INTERVAL = 1000;
	var viewer, viewport;

	tryStart();

	function tryStart() {
		console.log("Try start");
		var ribbonViewerEl = document.querySelector("idx-ribbon-viewer");
		if (ribbonViewerEl) {
			start(ribbonViewerEl);
		} else {
			setTimeout(tryStart, 1000);
		}
	}

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
}())
