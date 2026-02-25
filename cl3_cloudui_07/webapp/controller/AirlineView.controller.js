sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("code.cl3.n11.cl3cloudui07.controller.AirlineView", {
        onInit() {
        },

        onDisplay: function () {

        // MessageToast.show("Click");

        var oTable = this.getView().byId("airline"); // 테이블 객체
        var aIndex = oTable.getSelectedIndices(); // 선택한 행의 index 정보

        if (aIndex.length === 0) {
            MessageToast.show("행을 선택하세요.");
            return;
        }

        var oContext = oTable.getContextByIndex(aIndex[0]); // 선택한 행의 oData
        var oObject = oContext.getObject(); // object 출력하기
        var oModel = this.getView().getModel();

        // OData Read
            oModel.read("/AirlineSet('" + oObject.Carrid + "')", {

                success: function (oReturn) {

                    this.getView().byId("Carrid").setValue(oReturn.Carrid);
                    this.getView().byId("Carrname").setValue(oReturn.Carrname);
                    this.getView().byId("Currcode").setValue(oReturn.Currcode);
                    this.getView().byId("Url").setValue(oReturn.Url);

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
                Carrid : this.getView().byId("Carrid").getValue(),
                Carrname : this.getView().byId("Carrname").getValue(),
                Currcode : this.getView().byId("Currcode").getValue(),
                Url : this.getView().byId("Url").getValue()
            };

            oModel.create("/AirlineSet", oData, {
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

            var pkCarrid = this.getView().byId("Carrid").getValue();

            var oData = {
                Carrname : this.getView().byId("Carrname").getValue(),
                Currcode : this.getView().byId("Currcode").getValue(),
                Url : this.getView().byId("Url").getValue()
            };

            oModel.update("/AirlineSet('" + pkCarrid + "')", oData, {
                success : function(){
                    MessageToast.show("Update Success");
                    oModel.refresh();
                },
                error : function(){
                    MessageToast.show("Update Error");
                }
                });
            
        },

        // onDelete: function(){
        //     // MessageToast.show("Delete");
        //     var oModel = this.getView().getModel();
        //     let aIndex = this.getView().byId("airline").getSelectedIndices();
            
        //     if(aIndex.length === 0){
        //         MessageToast.show("행 선택하세요"); 
        //         return;
        //     }
        //     var oContext = oTable.getContextByIndex(aIndex[0]); // 선택한 행의 oData
        //     var oObject = oContext.getObject(); // object 출력하기
        //     var oModel = this.getView().getModel();

        //     var pkCarrid = this.getView().byId("Carrid").getValue();


        //     oModel.remove("/AirlineSet('" + pkCarrid + "')", {
        //         success : function(){
        //             MessageToast.show("삭제 성공");
        //             oModel.refresh();
        //         }, 
        //         error : function(){
        //             MessageToast.show("삭제 실패");
        //         }
        //     });
        // },

        onDelete: function () {
        var oModel = this.getView().getModel();
        let aIndex = this.getView().byId("Table").getSelectedIndices();
        if (aIndex.length < 1) {
          MessageToast.show("Please select row");
          return;

        }
        var oData = this.getView().byId("Table").getContextByIndex(aIndex[0]).getObject();
        oModel.remove("/AirlineSet('"+oData.Carrid+"')",{
            success : function(){
                oModel.refresh();
                MessageToast.show("Delete success!");
            },
            error: function(){
                MessageToast.show("Delete error!")
            }
        })

      },
    });
});