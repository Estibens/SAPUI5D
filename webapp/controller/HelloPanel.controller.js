sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
	"use strict";

	return Controller.extend("indra.SAPUI5.controller.HelloPanel", {

		onInit: function () {
			/*	//--- Set Model on View

			// PRIMERA FORMA
			
			
			var oData = {
				recipient: {
					name: "Estib"
				}
			};

			var oModel = new JSONModel(oData); //modelo al cual le pasamos en base a la anterior variable, estructura recipient, con el valor name
			this.getView().setModel(oModel); //Pasamos el modelo a la vista
			//con this obtenemos la instancia del controlador
			//con el metodo getView obtenemos la instancia de la vista
			//con serModel queremos establecer un modelo a la vista
           

			// SEGUNDA FORMA
			this.getView().setModel(models.createRecipient()); //Pasamos el modelo a la vista

			//--- Set i18n model on view
			var i18nModel = new ResourceModel({
				bundleName: "indra.SAPUI5.i18n.i18n"
			});

			this.getView().setModel(i18nModel,"i18n"); // "i18n" es un identificador*/
		},

		onShowHello: function () {

			//Read Text  from i18n	/ model 
			var sHello = this.getView().getModel("i18n").getResourceBundle().getText("sayHello");
			// obtenemos el modelo del i18n utilizando el identificador "i18n" 
			var sName = this.getView().getModel().getProperty("/recipient/name");
			// obtenemos el modelo por su propiedad
			var sMsg = sHello.concat(" ").concat(sName);
			MessageToast.show(sMsg);

		},

		onOpenDialog: function () {
			/*var oView = this.getView(); // obtenemos la instancia de la vista
			if (!this.byId("helloDialog")) { // si no esta instanciado
				Fragment.load({ //1ero: cargamos el fragmento
					id: oView.getId(), // donde lo cargamos?, en el identificador de esta vista 
					name: "indra.SAPUI5.view.HelloDialog", // con el nombre del fragmento que se debe cargar
					controller:this // servirá  para instanciar el controlador de onCloseDialog
				}).then(function (oDialog) { //conectamos el dialogo con la vista
					oView.addDependent(oDialog); // añadimos las dependencias del dialogo, para que el dialogo tenga acceso a los modelos
					oDialog.open(); // abrimos el dialogo
				});
			} else { // ya esta instanciado
				this.byId("helloDialog").open();
			}*/
			
			
			//accedemos al componente desde el controlador
			this.getOwnerComponent().openHelloDialog();
		}
		
		/*onCloseDialog: function () {
			//para saber cual es su controlador, utilizamos la propiedad controller en onOpenDialog
			this.byId("helloDialog").close();
		}*/

	});
});