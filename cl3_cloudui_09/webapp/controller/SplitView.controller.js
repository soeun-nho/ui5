sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code.cl3.n11.cl3cloudui09.controller.SplitView", {
        onInit() {
        },

        onSpfli(oEvent){
            let oData = oEvent.getSource().getBindingContext().getObject();

            let oBinding = this.getView().byId("spfli").getBinding("rows");

            let aFilter = [];

            aFilter.push(new Filter("Carrid",FilterOperator.EQ, oData.Carrid));

            oBinding.filter(aFilter);

        }, 
        onSflight(oEvent){
            var oData = oEvent.getParameter("rowBindingContext").getObject();

            let oBinding = this.getView().byId("sflight").getBinding("rows");

            let aFilter = [];

            aFilter.push(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));
            aFilter.push(new Filter("Connid", FilterOperator.EQ, oData.Connid)); 

            oBinding.filter(aFilter);
        },
        // get onsflight(){
        //     return this._onsflight;
        // }, 
        // set onsflight(value){
        //     this._onslight = value;
        // }
    });
});