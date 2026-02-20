/*global QUnit*/

sap.ui.define([
	"code/cl3/n11/cl3cloudui04/controller/AccountView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("AccountView Controller");

	QUnit.test("I should test the AccountView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
