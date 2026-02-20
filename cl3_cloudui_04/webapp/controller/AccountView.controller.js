sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel"
], (Controller, ODataModel) => {
    "use strict";

    return Controller.extend("code.cl3.n11.cl3cloudui04.controller.AccountView", {
        onInit() {

            var oModel = new ODataModel("/sap/opu/odata/sap/ZCL3_11_15_DDL_CDS");
            this.getView().setModel(oModel, "cds");

            console.log(oModel);

        }
    });
});
