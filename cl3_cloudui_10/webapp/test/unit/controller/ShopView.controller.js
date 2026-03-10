/*global QUnit*/

sap.ui.define([
	"code/cl3/n11/cl3cloudui10/controller/ShopView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ShopView Controller");

	QUnit.test("I should test the ShopView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
