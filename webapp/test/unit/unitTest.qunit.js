/* global QUnit */

QUnit.config.autostart = false; // no empiece la prueba de manera automatica

sap.ui.getCore().attachInit(function () {

	sap.ui.require([
		"indra/SAPUI5/test/unit/model/formatter"
	], function () {
		QUnit.start();
	});
});