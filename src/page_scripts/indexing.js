(function() {
	"use strict";

	var viewer,
		viewport,
		lastSelectedFieldKey = null,
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

		var handleViewportChangeDebounced = debounce(handleViewportChange, 200);
		viewer.addHandler('zoom', handleViewportChangeDebounced);
		viewer.addHandler('pan', handleViewportChangeDebounced);

		var handleFocusChangeDebounced = debounce(handleFocusChange, 200)
		document.body.addEventListener('focusin', handleFocusChangeDebounced);
	}

	function handleViewportChange() {
		var key = getCurrentFieldKey();
		if (!key) return;
		saveViewportSettings(key);
	}

	function handleFocusChange(ev) {
		if (angular.element(ev.target).closest('.entry-field').length === 0) return;
		var key = getCurrentFieldKey();
		if (!key) return;
		handleFieldFocused(key);
	}

	function handleFieldFocused(key) {
		var settings = fieldSettings[key];
		if (settings) {
			loadViewportSettings(settings);
		} else {
			saveViewportSettings(key);
		}
	}

	function getCurrentFieldKey() {
		var field = document.querySelector('.entry-field.focus');
		if (!field) return lastSelectedFieldKey;
		var idEl = field.querySelector('*[id^="entryFieldformEntry"]');
		if (!idEl) return lastSelectedFieldKey;
		lastSelectedFieldKey = idEl.id || lastSelectedFieldKey;
		return lastSelectedFieldKey;
	}

	function saveViewportSettings(key) {
		var pos = viewport.getCenter();
		var zoom = viewport.getZoom();

		fieldSettings[key] = {
			pos: pos,
			zoom: zoom,
		};
	}

	function loadViewportSettings(settings) {
		if (typeof settings.pos.x !== 'number'
				|| typeof settings.pos.y !== 'number'
				|| typeof settings.zoom !== 'number') {
			return console.error("invalid settings");
		}

		viewport.panTo(settings.pos);
		var currentZoom = viewport.getZoom();
		var factor = settings.zoom / currentZoom;
		viewport.zoomBy(factor);
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

	function debounce(fn, delay) {
		var timeout = -1;
		return function() {
			var nonce = Math.round(Math.random()*100000).toString(16);
			var context = this;
			var args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				fn.apply(context, args);
			}, delay);
		}
	}

}())
