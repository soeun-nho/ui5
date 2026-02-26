sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast"
], (Controller, ODataModel, MessageToast) => {
    "use strict";

    return Controller.extend("code.cl3.n11.cl3cloudui04.controller.AccountView", {
        onInit() {

            var oModel = new ODataModel("/sap/opu/odata/sap/ZCL3_11_15_DDL_CDS");
            this.getView().setModel(oModel, "cds");

            console.log(oModel);
        },
        onDisplay(){
            // MessageToast.show("display");
            var oTable = this.getView().byId("accountTable");
            var aIndex = oTable.getSelectedIndices();

            if(aIndex.length == 0){
                MessageToast.show("행을 선택하세요");
                return; // 그 이후의 로직 실행 하지 않도록 호출한 곳으로 return
            }

            //테이블로부터 한 행의 Object 가져오기 -> oData
            var oContext = oTable.getContextByIndex(aIndex[0]);
            console.log("oContext: ", oContext);
            var oData = oContext.getObject();
            console.log("oData:", oData);
            

            //뷰(oModel)객체 가져오기
            var oModel = this.getView().getModel();
            console.log("oModel:", oModel);

            //read 메소드 실행 ( oModel이라는 객체를 이용하여 crud 구현한다고 했었다.)
            oModel.read("/AccountSet(Bukrs='" + oData.Bukrs + "',Belnr='" + oData.Belnr + "',Gjahr='" + oData.Gjahr + "')"
                
                , {
                success: function (oReturn){
                    this.getView().byId("bukrs").setValue(oReturn.Bukrs);
                    this.getView().byId("belnr").setValue(oReturn.Belnr);
                    this.getView().byId("gjahr").setValue(oReturn.Gjahr);
                    this.getView().byId("blart").setValue(oReturn.Blart);
                    this.getView().byId("waers").setValue(oReturn.Waers);
                    console.log(oReturn);
                }.bind(this),
                error(){
                    MessageToast.show("Read Error");
                }
            } )

        }, 
        onCreate(){
            // MessageToast.show("create");
            var oModel = this.getView().getModel();

            var oData = {
                Bukrs : this.getView().byId("bukrs").getValue(),
                Belnr : this.getView().byId("belnr").getValue(),
                Gjahr : this.getView().byId("gjahr").getValue(),
                Blart : this.getView().byId("blart").getValue(),
                Bldat : this.getView().byId("bldat").getValue(), 
                Waers : this.getView().byId("waers").getValue()
            };

            oModel.create("/AccountSet", oData, {
                success:function(){
                    MessageToast.show("생성 성공");
                    oModel.refresh();
                },
                error : function(){
                    MessageToast.show("생성 실패"); 
                }
            })
        }, 
        onUpdate(){
            // MessageToast.show("update");

            var oModel = this.getView().getModel();

            //url에 입력할 pk를 위한 정보들
            var pkBukrs = this.getView().byId("bukrs").getValue();
            var pkBelnr = this.getView().byId("belnr").getValue();
            var pkGjahr = this.getView().byId("gjahr").getValue();

            var oData = {
                Bukrs : this.getView().byId("bukrs").getValue(),
                Belnr : this.getView().byId("belnr").getValue(),
                Gjahr : this.getView().byId("gjahr").getValue(),
                Blart : this.getView().byId("blart").getValue(),
                Bldat : this.getView().byId("bldat").getValue(),
                Waers : this.getView().byId("waers").getValue()
            };

            oModel.update("/AccountSet(Bukrs='" + oData.Bukrs + "',Belnr='" + oData.Belnr + "',Gjahr='" + oData.Gjahr + "')", oData, {
                success:function(){
                    MessageToast.show("Update 성공");
                    oModel.refresh();
                },
                error:function(){
                    MessageToast.show("Update Error"); 
                }
            })
        },
        onDelete(){
            // MessageToast.show("delete");
            
            var oModel = this.getView().getModel();

            //테이블로부터 정보 받기
            var aIndex = this.getView().byId("accountTable").getSelectedIndices();
            var oContext = this.getView().byId("accountTable").getContextByIndex(aIndex[0]);
            var oData = oContext.getObject();


            if(aIndex.length < 1){
                MessageToast.show("행을 선택하세요");
                return;
            }

            oModel.remove("/AccountSet(Bukrs='" + oData.Bukrs + "',Belnr='" + oData.Belnr + "',Gjahr='" + oData.Gjahr + "')", {
                success(){
                    oModel.refresh();
                    MessageToast.show("Delete Success");
                },
                error(){
                    MessageToast.show("Delete Error");
                }
            })

        }
    });
});
