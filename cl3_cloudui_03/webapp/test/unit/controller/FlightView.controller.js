/*global QUnit*/

sap.ui.define([
	"code/cl3/cl3cloudui03/controller/FlightView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FlightView Controller");

	QUnit.test("I should test the FlightView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
