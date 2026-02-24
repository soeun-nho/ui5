/*global QUnit*/

sap.ui.define([
	"code/cl3/n11/cl3cloudui08/controller/StudentView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("StudentView Controller");

	QUnit.test("I should test the StudentView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
