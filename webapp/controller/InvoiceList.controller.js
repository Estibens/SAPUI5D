sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator ) {

	return Controller.extend("indra.SAPUI5.controller.InvoiceList", {

		formatter: formatter, 

		onInit: function () {

			var oViewModel = new JSONModel({ // instanciamos el modelo
				currency: "EUR" //definimos el modelo
			});
			// Establecemos este modelo en la vista
			this.getView().setModel(oViewModel, "view");
			// obtenemos la vista con getView()
			// establecemos este modelo con setModel
			// añadimos un identificador "view" que luego usaremos en la vista

		},
		
		onfilterInvoices: function(oEvent){
			
			//Build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query"); //obtenemos el valor ingresado en el filtro
			if (sQuery){
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery)); //se añade un filtro al array
				//FilterOperator.Contains BUSCA si contiene el valor en el nombre del ProductName
			}
			
			//filter binding
			var oList = this.byId("invoiceList"); //obtenemos la lista en base a su id de la lista que se encuentra en la vista
			var oBinding = oList.getBinding("items"); // de la lista obtenemos los items
			oBinding.filter(aFilter); // realizamos el filtro en base al array que contiene los parametros
		},
		
		onPress: function(oEvent){
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoiceWz").getPath().substr(1))
			});
		}
	});
});