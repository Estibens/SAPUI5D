sap.ui.define([], function () {

	return {
		statusText: function (sStatus) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			// this. getView() accedemos a la vista
			// getModel("i18n") accedemos al modelo del i18n con id "i18n"
			// getResourceBundle() obtenemos todos los textos del modelo i18n

			//DEVOLVER LOS TEXTOS DE LA I18N
			switch (sStatus) {
			case "A":
				return resourceBundle.getText("invoiceStatusA"); //getText obtiene el texto en base al identificador de la i18n
			case "B":
				return resourceBundle.getText("invoiceStatusB");
			case "C":
				return resourceBundle.getText("invoiceStatusC");
			default:
				return sStatus;
			}
		}
	};
});