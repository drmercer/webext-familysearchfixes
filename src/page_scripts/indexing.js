(function() {
	"use strict";

	var viewer,
		viewport,
		fieldSettings = {};

	waitForEl("idx-ribbon-viewer")
		.then(start);

	function start(ribbonViewerEl) {
		console.log("ribbon viewer found");
		// Getting viewer and viewport
		viewer = angular
			.element(ribbonViewerEl)
			.scope()
			.ribbonCtrl
			.ribbon
			.getOpenSDMain()
			.getViewer();
		viewport = viewer.viewport;

		handleViewportChange();

		viewer.addHandler('zoom', handleViewportChange);
		viewer.addHandler('pan', handleViewportChange);
	}

	function handleViewportChange() {
		var key = getCurrentFieldKey();
		if (!key) return;
		var pos = viewport.getCenter();
		var zoom = viewport.getZoom();

		fieldSettings[key] = {
			pos: pos,
			zoom: zoom,
		};

		console.log(fieldSettings);
	}

	function getCurrentFieldKey() {
		var field = document.querySelector('.entry-field.focus');
		if (!field) return null;
		var idEl = field.querySelector('*[id^="entryFieldformEntry"]');
		if (!idEl) return null;
		var id = idEl.id;
		return id;
	}

	//======================================================================
	//			Utilities

	function waitForEl(selector, interval) {
		console.log("Waiting for " + selector);
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
