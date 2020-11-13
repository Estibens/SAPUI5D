sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, UIComponent, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("indra.SAPUI5.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf indra.SAPUI5.view.Detail
		 */
		onInit: function () {

			var oRouter = UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			
			
			var oViewModel = new JSONModel({ // instanciamos el modelo
				currency: "EUR" 
			});
			this.getView().setModel(oViewModel, "view");

		},

		_onObjectMatched: function (oEvent) {
			this.byId("rating").reset(); // resetea el custom controls
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "invoiceWz"
			});
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf indra.SAPUI5.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf indra.SAPUI5.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf indra.SAPUI5.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

		onNavBack: function () {
			var oHistory = History.getInstance(); //instancia de navegacion
			var sPreviousHash = oHistory.getPreviousHash(); // instancia de la historia

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("overview", {}, true);
			}
		},
		
		onRatingChange: function (oEvent) {
			
			var fValue = oEvent.getParameter("value"); // obtener el valor de las estrellas
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			
			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
			
		}

	});

});