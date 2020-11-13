sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/RatingIndicator",
	"sap/m/Label",
	"sap/m/Button"
], function (Control, RatingIndicator, Label, Button) { // c metadata, init , renderer

	return Control.extend("indra.SAPUI5.control.ProductRating", {

		metadata: { //propiedades, agregaciones y eventos

			properties: {
				value: { 	type: "float", 	defaultValue: 0 }// data value type float- almacena la cantidad de estrellas seleccionada
			},

			aggregations: { 
				_rating: { type: "sap.m.RatingIndicator", multiple: false, visibility: "hidden" },//estrellas
				_label:  { type: "sap.m.Label", multiple: false, visibility: "hidden" },          //etiqueta : texto
				_button: { type: "sap.m.Button", multiple: false, visibility: "hidden" }          //boton
			},

			events: {
				change: { // evento Change: modifica la propiedad value
					parameters: {
						value: { type: "int" }
					}
				}
			}
		},

		init: function () { // isntancia el controller

			this.setAggregation("_rating", new RatingIndicator({
				value: this.getValue(), // se pasa la propiedad value inicial, en este caso es 0 (cero)
				iconSize: "2rem",
				visualMode: "Half",
				liveChange: this._onRate.bind(this) //evento para que se visualicen los cambios al presionar cualquier estrella
			}));

			this.setAggregation("_label", new Label({   // establecemos la etiqueta con su texto
				text: "{i18n>productRatingLabelInitial}" // se envia a la etiqueta el texto inicial
			}).addStyleClass("sapUiSmallMargin"));

			this.setAggregation("_button", new Button({
				text: "{i18n>productRatingButton}", // texto inicial
				press: this._onSubmit.bind(this)    // al pulsar llama al siguiente evento
			}).addStyleClass("sapUiTinyMarginTopBottom"));

		},

		reset: function () { //reinicia los valores 
			var oResourceBundle = this.getModel("i18n").getResourceBundle();

			this.setValue(0);
			this.getAggregation("_rating").setEnabled(true); //habilitamos las estrellas
			this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial"));
			this.getAggregation("_label").setDesign("Standard");
			this.getAggregation("_button").setEnabled(true); //habilitamos el boton
		},

		setValue: function (fValue) {
			this.setProperty("value", fValue, true);
			this.getAggregation("_rating").setValue(fValue);
		},

		_onRate: function (oEvent) {
			var oRessourceBundle = this.getModel("i18n").getResourceBundle();//obtenemos los recursos de i18n
			var fValue = oEvent.getParameter("value"); //obtenemos el valor de la propiedad value

			this.setProperty("value", fValue, true);//pasar el valor obtenido
			//se agrega en la etiqueta el valor(numero) de las estrellas a los textos de la i18n, de acuerdo a lo escogido
			this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
			this.getAggregation("_label").setDesign("Bold");//etiqueta en negrita

		},

		_onSubmit: function (oEvent) {
			var oRessourceBundle = this.getModel("i18n").getResourceBundle();

			this.getAggregation("_rating").setEnabled(false); // obtenemos la valoracion y lo bloqueamos para que ya no pueda realizar una nueva valoracion
			this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelFinal"));//obtenemos el label y le definimos un texto final
			this.getAggregation("_button").setEnabled(false); // obtenemos la agregacion del boton con la finalidad de desabilitarlo
			this.fireEvent("change", {  //lanzamos al evento Change definido en el metadato
				value: this.getValue()  // enviamos el valor de la propiedad value, capturado con getValue
			});
		},

		renderer: function (oRm, oControl) { //dibuja dentro de la vista
			//RENDERIZADOR: logica para modificar el 
			oRm.openStart("div", oControl); //abre <
			oRm.class("productRatin"); // clase css con estilos personalizado
			oRm.openEnd();
			oRm.renderControl(oControl.getAggregation("_rating")); //añadimos las estrellas
			oRm.renderControl(oControl.getAggregation("_label"));  // " etiqueta
			oRm.renderControl(oControl.getAggregation("_button")); // " boton

			oRm.close("div"); // cieraa />

		}

	});

});