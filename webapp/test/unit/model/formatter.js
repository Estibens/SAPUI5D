sap.ui.define([
	"indra/SAPUI5/model/formatter",
	"sap/ui/model/resource/ResourceModel"
], function (formatter, ResourceModel) {

	QUnit.module("formatting functions", {
		beforeEach: function () {
			this._oResourceModel = new ResourceModel({
				bundleUrl: sap.ui.require.toUrl("indra/SAPUI5") + "/i18n/i18n.properties"
			});
		},

		afterEach: function () {
			this._oResourceModel.destroy();
		}

	});

	QUnit.test("Shouuld return the translated text", function (assert) {

		var oModel = this.stub();
		oModel.withArgs("i18n").returns(this._oResourceModel);

		var oViewStub = {
			getModel: oModel
		};

		var oControllerStub = {
			getView: this.stub().returns(oViewStub)
		};

		var fnIsolatedFormatter = formatter.statusText.bind(oControllerStub);

		// AssterT
		assert.strictEqual(fnIsolatedFormatter("A"), "New", "The Long text fos status A is correct");
		assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "The Long text fos status B is correct");
		assert.strictEqual(fnIsolatedFormatter("C"), "Done", "The Long text fos status C is correct");

	});

});