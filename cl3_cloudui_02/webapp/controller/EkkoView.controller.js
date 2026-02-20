sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter", //검색
    "sap/ui/model/FilterOperator" ,//검색연산자관련
     "sap/ui/model/odata/v2/ODataModel"
], (Controller, Filter, FilterOperator,  ODataModel ) => {
    "use strict";

    return Controller.extend("code.cl3.cl3cloudui02.controller.EkkoView", {
        onInit() {
            var oModel = new ODataModel("/sap/opu/odata/sap/ZCL3_11_19_DDL_CDS/");
	        this.getView().setModel(oModel, "fli");
        
        },

        onSearch(oEvent){ //이벤트발생
	        const userFilter = []; //내가 만든 검색조건 (배열)
	 
	        const sQuery = oEvent.getParameter("query"); //검색어받아옴
	        if(sQuery){
		        userFilter.push(new Filter("bsart", FilterOperator.Contains, sQuery)); //검색조건1
		    }
		
		   const oTable = this.byId("prodTable"); //테이블 정보
		   const oBinding = oTable.getBinding("rows"); //테이블의 dataSet연결(rows)
		   oBinding.filter(userFilter); //그 바인딩에 내가 검색조건 정리해둔 aFilter와 비교해서 필터링
} 
    });
});