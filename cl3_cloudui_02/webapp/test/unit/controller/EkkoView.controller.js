/*global QUnit*/

sap.ui.define([
	"code/cl3/cl3cloudui02/controller/EkkoView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("EkkoView Controller");

	QUnit.test("I should test the EkkoView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
