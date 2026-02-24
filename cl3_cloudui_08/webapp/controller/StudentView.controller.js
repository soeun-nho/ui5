sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("code.cl3.n11.cl3cloudui08.controller.StudentView", {
        onInit() {
        },
        
        onDisplay: function () {

        // MessageToast.show("Click");

        var oTable = this.getView().byId("student"); // 테이블 객체
        var aIndex = oTable.getSelectedIndices(); // 선택한 행의 index 정보

        if (aIndex.length === 0) {
            MessageToast.show("행을 선택하세요.");
            return;
        }

        var oContext = oTable.getContextByIndex(aIndex[0]); // 선택한 행의 oData
        var oObject = oContext.getObject(); // object 출력하기
        var oModel = this.getView().getModel();

        // OData Read
            oModel.read("/StudentSet('" + oObject.StdtNo + "')", {

                success: function (oReturn) {

                    this.getView().byId("StdtNo").setValue(oReturn.StdtNo);
                    this.getView().byId("Major").setValue(oReturn.Major);
                    this.getView().byId("StdtName").setValue(oReturn.StdtName);
                    this.getView().byId("Addr").setValue(oReturn.Addr);

                }.bind(this),

                error: function () {
                    MessageToast.show("Read Error");
                }

            });


        console.log("Selected Index:", aIndex[0]);
        console.log("Selected Data:", oObject);
        console.log("Selected Model:", oModel);
        },

        onCreate: function(){
            // MessageToast.show("Create");
            var oModel = this.getView().getModel();

            var oData = {
                StdtNo : this.getView().byId("StdtNo").getValue(),
                Major : this.getView().byId("Major").getValue(),
                StdtName : this.getView().byId("StdtName").getValue(),
                Addr : this.getView().byId("Addr").getValue()
            };

            oModel.create("/StudentSet", oData, {
                success : function(){
                    MessageToast.show("생성 성공");
                    oModel.refresh();
                },
                error : function(){
                    MessageToast.show("생성 실패"); 
                }
                });

        },
        onUpdate : function(){
            // MessageToast.show("Update");
            var oModel = this.getView().getModel();

            var pkCarrid = this.getView().byId("StdtNo").getValue();

            var oData = {
                Major : this.getView().byId("Major").getValue(),
                StdtName : this.getView().byId("StdtName").getValue(),
                Addr : this.getView().byId("Addr").getValue()
            };

            oModel.update("/StudentSet('" + pkCarrid + "')", oData, {
                success : function(){
                    MessageToast.show("Update Success");
                    oModel.refresh();
                },
                error : function(){
                    MessageToast.show("Update Error");
                }
                });
            
        },
        onDelete() {
        let oModel = this.getView().getModel();
        let vStdtNo = this.getView().byId("StdtNo").getValue();

        let aIndex = this.getView().byId("student").getSelectedIndices();

        if (aIndex.length < 1) {
          MessageToast.show("학번 입력 필수");
        } else {
          oModel.remove(`/StudentSet('${vStdtNo}')`, {
            success: function () {
              oModel.refresh();
              MessageToast.show("Delete Success");
            },
            error: function () {
              MessageToast.show("Delete Error");
            },
          });
        }
      },

    });
});