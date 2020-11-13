sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";

	return {

		createRecipient: function () {

			//Set Model on View
			var oData = {
				recipient: {
					name: "Wordl"
				}
			};

			//var oModel = new JSONModel(oData); 
			return new JSONModel(oData); // es igual a la sentencia linea arriba

		}
	};

});