sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel"
], (Controller, ODataModel) => {
    "use strict";

    return Controller.extend("code.cl3.cl3cloudui01.controller.MatView", {
        onInit() {
             //var oModel = new ODataModel("/sap/opu/odata/sap/ZCL3_13_13_DDL_CDS");
             //this.getView().setModel(oModel, "mat");

            var oModel = new ODataModel("/sap/opu/odata/sap/ZCL3_27_18_DDL_CDS");
            this.getView().setModel(oModel, "mat");
        }
        
    });
});