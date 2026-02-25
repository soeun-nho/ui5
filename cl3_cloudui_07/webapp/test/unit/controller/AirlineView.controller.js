/*global QUnit*/

sap.ui.define([
	"code/cl3/n11/cl3cloudui07/controller/AirlineView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("AirlineView Controller");

	QUnit.test("I should test the AirlineView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
