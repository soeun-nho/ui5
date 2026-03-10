sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter", //검색
    "sap/ui/model/FilterOperator" ,//검색연산자관련
    "sap/m/MessageToast"
], (Controller, Filter, FilterOperator, MessageToast) => {
    "use strict";

    return Controller.extend("code.cl3.n11.cl3cloudui10.controller.ShopView", {
        onInit() {
        },

        onCustomSearch(){
            var vRemark = this.getView().byId("remarkinput").getValue();
            var vBelnr = this.getView().byId("belnrinput").getValue();

            const userFilter = []; 
            
            if(vRemark){
                userFilter.push(new Filter("Remark", FilterOperator.EQ, vRemark));
            }
            if(vBelnr){
                userFilter.push(new Filter("Belnr", FilterOperator.EQ, vBelnr));
            }

            if(userFilter.length>=1){
                const oTable = this.byId("shopTable");
                const oBinding = oTable.getBinding("rows");
                oBinding.filter(userFilter);
            }
        },
        
        onDisplay: function () {

        var oTable = this.getView().byId("shopTable");
        var aIndex = oTable.getSelectedIndices();

        if (aIndex.length === 0) {
            MessageToast.show("행을 선택하세요.");
            return;
        }

        var oContext = oTable.getContextByIndex(aIndex[0]);
        var oData = oContext.getObject();
        var oModel = this.getView().getModel();

        console.log("Selected Index:", aIndex[0]);
        console.log("Selected Data:", oData);
        console.log("Selected Model:", oModel);

        //첫번째 인자 : url 두번쨰 인자 : 성공실패 처리
        oModel.read("/ShopSet(Ryear='" + oData.Ryear + "',Rbukrs='" + oData.Rbukrs + "',Belnr='" + oData.Belnr + "')", {

        success: function (oReturn) { //oReturn을 통해 값을 받아와서, input 창에 setValue해준다.
                    this.getView().byId("ryear").setValue(oReturn.Ryear);
                    this.getView().byId("rbukrs").setValue(oReturn.Rbukrs);
                    this.getView().byId("belnr").setValue(oReturn.Belnr);
                    this.getView().byId("racct").setValue(oReturn.Racct);
                    this.getView().byId("remark").setValue(oReturn.Remark);
                    this.getView().byId("hsl").setValue(oReturn.Hsl);
                    this.getView().byId("rtcur").setValue(oReturn.Rtcur);
                    this.getView().byId("postYn").setValue(oReturn.PostYn);
            console.log("Response Body:", oReturn);

        }.bind(this), //bind로 this 제대로 인식하게 해줌

        error: function () {
            MessageToast.show("Read Error");
        }

        });

        },

        onClear(){
                //setValue를 통해 input 창의 값을 전부 clear해준다.            
                this.getView().byId("ryear").setValue();
                this.getView().byId("rbukrs").setValue();
                this.getView().byId("belnr").setValue();
                this.getView().byId("racct").setValue();
                this.getView().byId("remark").setValue();
                this.getView().byId("hsl").setValue();
                this.getView().byId("rtcur").setValue();
                this.getView().byId("postYn").setValue();
            
        },

        onCreate: function(){

            //해당 모델을 통해 create() 실행
            var oModel = this.getView().getModel();

            //두번째 인자 oData(request Body에 들어갈 값)설정
            var oData = {
                Ryear : this.getView().byId("ryear").getValue(),
                Rbukrs : this.getView().byId("rbukrs").getValue(),
                Belnr : this.getView().byId("belnr").getValue(),
                Racct : this.getView().byId("racct").getValue(),
                Remark : this.getView().byId("remark").getValue(), 
                Hsl : this.getView().byId("hsl").getValue(),
                Rtcur : this.getView().byId("rtcur").getValue(),
                PostYn : this.getView().byId("postYn").getValue()
            };

        oModel.create("/ShopSet", oData, { //첫 번째 인자 url, 두 번쨰 인자 oData, 세번째 인자 성공실패처리

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

            //해당 모델을 통한 update 메소드 실행
            var oModel = this.getView().getModel();

            //url에 입력할 pk를 위한 정보들
            var pkBukrs = this.getView().byId("rbukrs").getValue();
            var pkBelnr = this.getView().byId("belnr").getValue();
            var pkRyear = this.getView().byId("ryear").getValue();

            //수정된 oData 값 설정해주기
            var oData = {
                Ryear : this.getView().byId("ryear").getValue(),
                Rbukrs : this.getView().byId("rbukrs").getValue(),
                Belnr : this.getView().byId("belnr").getValue(),
                Racct : this.getView().byId("racct").getValue(),
                Remark : this.getView().byId("remark").getValue(), 
                Hsl : this.getView().byId("hsl").getValue(),
                Rtcur : this.getView().byId("rtcur").getValue(),
                PostYn : this.getView().byId("postYn").getValue()
            };


            //첫 번째 인자 url, 두 번쨰 인자 oData, 세번째 인자 성공실패처리
            oModel.update("/ShopSet(Ryear='" + pkRyear + "',Rbukrs='" + pkBukrs + "',Belnr='" + pkBelnr + "')",  oData, {
                success:function(){
                    MessageToast.show("Update 성공");
                    oModel.refresh();
                },
                error:function(){
                    MessageToast.show("Update Error"); 
                }
            })
            
        },

        onDelete() {

            //해당 model 통한 메소드 실행(delete)
           var oModel = this.getView().getModel();

            //테이블로부터 정보 받기
            var aIndex = this.getView().byId("shopTable").getSelectedIndices(); //인덱스 정보
            var oContext = this.getView().byId("shopTable").getContextByIndex(aIndex[0]); //테이블의 그 인덱스의 context
            var oData = oContext.getObject(); // getObject 통해서 꺼내줌

            console.log("Selected Model:", oModel); //확인용

            if(aIndex.length < 1){ //삭제할 행을 선택했을 경우에만 이후 로직 수행하기 위해 검증 로직 
                MessageToast.show("행을 선택하세요");
                return;//return으로 돌려보낸다.
            }

            //첫 번째 인자: url, 두 번쨰 인자: 성공실패 처리
            oModel.remove("/ShopSet(Ryear='" + oData.Ryear + "',Rbukrs='" + oData.Rbukrs + "',Belnr='" + oData.Belnr + "')" , {
                success(){
                    oModel.refresh();
                    MessageToast.show("Delete Success");
                },
                error(){
                    MessageToast.show("Delete Error");
                }
            })


	    },
	      

    });
});