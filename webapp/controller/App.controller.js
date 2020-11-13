sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("indra.SAPUI5.controller.App", {

		onInit: function () {

            //Añadimos los estilos agregado en component.js y que sera utilizado en la vista App.view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass()); 

		},

		onOpenHeader: function () {
			//accedemos al componente desde el controlador
			this.getOwnerComponent().openHelloDialog();
		}

	});
});