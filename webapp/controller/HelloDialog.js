sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/ui/core/syncStyleClass"
], function (ManagedObject, Fragment, syncStyleClass) {

	return ManagedObject.extend("indra.SAPUI5.controller.HelloDialog", {

		constructor: function (oView) { // la vista se va a pasar en tiempo de ejecución
			this._oView = oView; //obtenemos la instancia de la vista
		},

		exit: function () {
			delete this._oView;
		},

		open: function () {
			var oView = this._oView;
			if (!oView.byId("helloDialog")) {

				var oFragmentController = { // instancia del controlador
					onCloseDialog: function () {
						oView.byId("helloDialog").close(); // tmbien tenemos opcion de cerrarlo
					}
				};

				Fragment.load({
					id: oView.getId(),
					name: "indra.SAPUI5.view.HelloDialog",
					controller: oFragmentController // nuevo controlador que se encargara de controlar las acciones 
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					//obtenemos la clase getContentD... del componente de acuerdo al dispositivo conectado
					syncStyleClass(oView.getController().getOwnerComponent().getContentDensityClass(), oView, oDialog);
					oDialog.open();
				});
			} else { // ya esta instanciado
				oView.byId("helloDialog").open();
			}
		}
	});

});