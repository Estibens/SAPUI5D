sap.ui.define([
		"sap/ui/core/UIComponent",
		"indra/SAPUI5/model/models",
		"sap/ui/model/resource/ResourceModel",
		"./controller/HelloDialog",
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device"
	], function (UIComponent, models, ResourceModel, HelloDialog, JSONModel, Device) {

		return UIComponent.extend("indra.SAPUI5.Component", {

			// metadata describe las propiedades de la aplicación
			metadata: {
				manifest: "json"
					/*rootView: {
						"viewName" :"indra.SAPUI5.view.App", // vista principal
						"type": "XML",
						"async": true,
						"id":"app"  //app es un identificador
					}*/

			},

			// se llama a la función donde instanciamos este componente
			// se cargan los modelos
			init: function () {

				// call the init function  of the parent 
				UIComponent.prototype.init.apply(this, arguments);

				//--- Set Model on View
				this.setModel(models.createRecipient());

				//--- Set i18n model on view
				var i18nModel = new ResourceModel({
					bundleName: "indra.SAPUI5.i18n.i18n"
				});

				this.setModel(i18nModel, "i18n"); // "i18n" es un identificador

				//set device Model
				var oDeviceModel = new JSONModel(Device);
				oDeviceModel.setDefaultBindingMode("OneWay"); //disponible en un direccion
				this.setModel(oDeviceModel, "device");

				this._helloDialog = new HelloDialog(this.getRootControl()); // accedemos a la lógica de HelloDialog.js

				//Create the views based on the url/hash
				this.getRouter().initialize();

			},

			exit: function () {
				this._helloDialog.destroy();
				delete this._helloDialog;
			},

			openHelloDialog: function () {
				this._helloDialog.open(); //lamamos a la función open de HelloDialog.js
			},

			//Se asigna una clase de acuerdo al dispositivo que se conecto
			getContentDensityClass: function () {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact"; //desktop
				} else {
					this._sContentDensityClass = "sapUiSizeCozy"; //tactial
				}
				return this._sContentDensityClass;
			}

		});
	}

);