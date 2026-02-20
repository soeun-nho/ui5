sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code.cl3.n11.cl3cloudui05.controller.AccountView", {
        onInit() {

        },
        onSearch() {

            const aFilters = [];

            const sBukrs = this.byId("searchBukrs").getValue();
            const sBelnr = this.byId("searchBelnr").getValue();
            const sGjahr = this.byId("searchGjahr").getValue();

            if (sBukrs) {
            aFilters.push(
                new Filter("Bukrs", FilterOperator.EQ, sBukrs)
            );
            }

            if (sBelnr) {
                aFilters.push(
                new Filter("Belnr", FilterOperator.EQ, sBelnr)
            );
            }

            if (sGjahr) {
                aFilters.push(
                new Filter("Gjahr", FilterOperator.EQ, sGjahr)
            );
        }

    const oTable = this.byId("accountTable");
    const oBinding = oTable.getBinding("rows");

    oBinding.filter(aFilters);
}
    });
});