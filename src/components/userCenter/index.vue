<template>
    <div class="publicAllContentBg" id="userCenterIndex">
        <!--头部导航-->
        <van-nav-bar title="我的" class="globalNavBarHeaderClass"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     @click-right="goToShopMalloptions"
                     fixed
        >

            <!--<van-icon name="setting" slot="right" style="color: #fafafa" @click="goToShopMalloptions"></van-icon>-->
            <van-icon name="setting" slot="right" class="globalNavBarIconClass"></van-icon>
        </van-nav-bar>
        <!--我的部分(背景色，头像，昵称等)-->
        <div class="userCenterBg">
            <div class="img">
                <img :src="userInfo.icon" alt="">
            </div>
            <div class="info">
                <p class="userName">{{userInfo.userName}}</p>
                <!--<p class="val"><van-icon name="money" style="color: #fafafa"></van-icon>财富值:{{userInfo.val}}</p>-->
                <p class="val">{{userInfo.phone}}</p>
            </div>
        </div>
        <!--所有剩下的部分-->
        <div class="userCenterBigBg">
            <!--五大导航-->
            <ul class="topNavPartBox">
                <!--<li @click="topLinkFn(0)">-->
                    <!--<div class="nav">-->
                        <!--<div class="icon">-->
                            <!--<van-icon name="reward"></van-icon>-->
                        <!--</div>-->
                        <!--<p>我的悬赏</p>-->
                    <!--</div>-->
                <!--</li>-->
                <li @click="topLinkFn(1)">
                    <div class="nav">
                        <div class="icon">
                            <van-icon name="collection"></van-icon>
                        </div>
                        <p>商品收藏</p>
                    </div>
                </li>
                <li @click="topLinkFn(2)">
                    <div class="nav">
                        <div class="icon">
                            <van-icon name="follow"></van-icon>
                        </div>
                        <p>店铺关注</p>
                    </div>
                </li>
                <li @click="topLinkFn(3)">
                    <div class="nav">
                        <div class="icon">
                            <van-icon name="footPointer"></van-icon>
                        </div>
                        <p>我的足迹</p>
                    </div>
                </li>
                <li @click="topLinkFn(4)">
                    <div class="nav">
                        <div class="icon">
                            <van-icon name="coupon"></van-icon>
                        </div>
                        <p>我的卡券</p>
                    </div>
                </li>
                <li @click="topLinkFn(5)">
                    <div class="nav">
                        <div class="icon">
                            <van-icon name="shop"></van-icon>
                        </div>
                        <p>我的店铺</p>
                    </div>
                </li>
            </ul>
            <!--我的订单-->
            <div class="myOrderBg">
                <!--header-->
                <div class="header">
                    <div class="left">我的订单</div>
                    <div class="right" @click="goToOrderListFn('0')">查看更多<van-icon name="arrow"></van-icon></div>
                </div>
                <!--五个订单状态-->
                <ul class="list">
                    <li @click="goToOrderListFn('1')">
                        <div class="icon">
                            <van-icon name="needPay" :info="orderListData.needPay" v-if="orderListData.needPay>0"></van-icon>
                            <van-icon name="needPay" v-if="orderListData.needPay===0"></van-icon>
                        </div>
                        <p>待付款</p>
                    </li>
                    <li @click="goToOrderListFn('2')">
                        <div class="icon">
                            <van-icon name="waitShip" :info="orderListData.waitShip" v-if="orderListData.waitShip>0"></van-icon>
                            <van-icon name="waitShip" v-if="orderListData.waitShip===0"></van-icon>
                        </div>
                        <p>待发货</p>
                    </li>
                    <li @click="goToOrderListFn('3')">
                        <div class="icon">
                            <van-icon name="waitGet" :info="orderListData.waitGet" v-if="orderListData.waitGet>0"></van-icon>
                            <van-icon name="waitGet" v-if="orderListData.waitGet===0"></van-icon>
                        </div>
                        <p>待收货</p>
                    </li>
                    <li @click="goToOrderListFn('5')">
                        <div class="icon">
                            <van-icon name="waitJudge" :info="orderListData.waitJudge" v-if="orderListData.waitJudge>0"></van-icon>
                            <van-icon name="waitJudge" v-if="orderListData.waitJudge===0"></van-icon>
                        </div>
                        <p>已取消</p>
                    </li>
                    <li @click="goToOrderListFn('10')">
                        <div class="icon">
                            <van-icon name="afterSale" :info="orderListData.afterSale" v-if="orderListData.afterSale>0"></van-icon>
                            <van-icon name="afterSale" v-if="orderListData.afterSale===0"></van-icon>
                        </div>
                        <p>退款/售后</p>
                    </li>
                </ul>
                <!--最新物流-->
                <!--<div class="newLogisticsBg">-->
                    <!--<div class="newLogisticsBox">-->
                        <!--&lt;!&ndash;header&ndash;&gt;-->
                        <!--<div class="header">-->
                            <!--<div class="left">最新物流</div>-->
                            <!--<div class="right">07-27</div>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;物流&ndash;&gt;-->
                        <!--<div class="newLogisticsStyle">-->
                            <!--<div class="img">-->
                                <!--<img src="../../assets/images/shoppingMall/userCenter/wuliuImg.png" alt="">-->
                            <!--</div>-->
                            <!--<div class="info">-->
                                <!--<p class="status">已签收</p>-->
                                <!--<p class="text">感谢使用顺飞快递,下次再来</p>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
            <!--我的悬赏-->
            <div class="myOrderBg change">
                <!--header-->
                <div class="header">
                    <div class="left">我的悬赏</div>
                    <!--<div class="right">查看更多<van-icon name="arrow"></van-icon></div>-->
                </div>
                <!--我的服务的两个模块-->
                <div class="myServiceMoudleBox reword">
                    <div class="left rightBorder" @click="goToMyRewardFn('1')">
                        <div class="img">
                            <img src="../../assets/images/shoppingMall/userCenter/myServiceImg1.png" alt="">
                        </div>
                        <p>我的发布</p>
                    </div>
                    <div class="right" @click="goToMyRewardFn('2')">
                        <div class="img">
                            <img src="../../assets/images/shoppingMall/userCenter/myServiceImg2.png" alt="">
                        </div>
                        <p>我的接单</p>
                    </div>
                </div>
            </div>
            <!--<div class="myOrderBg">-->
                <!--&lt;!&ndash;header&ndash;&gt;-->
                <!--<div class="header">-->
                    <!--<div class="left">我的悬赏</div>-->
                    <!--&lt;!&ndash;<div class="right" @click="myXsCheckMore">查看更多<van-icon name="arrow"></van-icon></div>&ndash;&gt;-->
                <!--</div>-->
                <!--&lt;!&ndash;悬赏模块&ndash;&gt;-->
                <!--<ul class="myOfferMoudleList">-->
                    <!--<li>-->
                        <!--<div class="myOfferMoudleStyle" @click="myXsCheckMore">-->
                            <!--<van-icon name="afterSale" :info="OfferListData.needPay" v-if="OfferListData.needPay>0"></van-icon>-->
                            <!--<van-icon name="afterSale" v-if="OfferListData.needPay===0"></van-icon>-->
                        <!--</div>-->
                        <!--<p>待支付</p>-->
                    <!--</li>-->
                    <!--<li>-->
                        <!--<div class="myOfferMoudleStyle" @click="myXsCheckMore">-->
                            <!--<van-icon name="afterSale" :info="OfferListData.waitReceipt" v-if="OfferListData.waitReceipt>0"></van-icon>-->
                            <!--<van-icon name="afterSale" v-if="OfferListData.waitReceipt===0"></van-icon>-->
                        <!--</div>-->
                        <!--<p>未接单</p>-->
                    <!--</li>-->
                    <!--<li>-->
                        <!--<div class="myOfferMoudleStyle" @click="myXsCheckMore">-->
                            <!--<van-icon name="afterSale" :info="OfferListData.receipted" v-if="OfferListData.receipted>0"></van-icon>-->
                            <!--<van-icon name="afterSale" v-if="OfferListData.receipted===0"></van-icon>-->
                        <!--</div>-->
                        <!--<p>已接单</p>-->
                    <!--</li>-->
                <!--</ul>-->
                <!--&lt;!&ndash;最新任务状态&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="newLogisticsBg">&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="newLogisticsBox">&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;header&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="header">&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="left">最新进程</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="right">07-27</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;单一任务状态&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="myOfferMoudleSingelContent">&ndash;&gt;-->
                            <!--&lt;!&ndash;&lt;!&ndash;左侧圈&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;<van-circle&ndash;&gt;-->
                                    <!--&lt;!&ndash;v-model="offerContent.progress"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:rate="offerContent.progress"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:text="returnCircleTextFn()"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:size="offerContentCircleOption.size"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:stroke-width="offerContentCircleOption.strokeWidth"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:fill="offerContentCircleOption.fill"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:layer-color="offerContentCircleOption.layerColor"&ndash;&gt;-->
                            <!--&lt;!&ndash;&gt;</van-circle>&ndash;&gt;-->
                            <!--&lt;!&ndash;&lt;!&ndash;右侧任务状态&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;&lt;!&ndash;物流&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="newLogisticsStyle">&ndash;&gt;-->
                                <!--&lt;!&ndash;<div class="info">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<p class="status">已签收</p>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<p class="text">感谢使用顺飞快递,下次再来</p>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <!--我的服务-->
            <div class="myOrderBg change">
                <!--header-->
                <div class="header">
                    <div class="left">我的服务</div>
                    <!--<div class="right">查看更多<van-icon name="arrow"></van-icon></div>-->
                </div>
                <!--我的服务的两个模块-->
                <div class="myServiceMoudleBox">
                    <div class="left" @click="goToServiceFn('1')">
                        <div class="img one">
                            <div class="box"></div>
                            <!--<img src="../../assets/images/shoppingMall/userCenter/userCenterServiceIcon1.png" alt="">-->
                        </div>
                        <p>我发布的</p>
                    </div>
                    <div class="middle" @click="goToServiceFn('2')">
                        <div class="img two">
                            <div class="box"></div>
                            <!--<img src="../../assets/images/shoppingMall/userCenter/userCenterServiceIcon2.png" alt="">-->
                        </div>
                        <p>我购买的</p>
                    </div>
                    <div class="right" @click="goToServiceFn('3')">
                        <div class="img three">
                            <div class="box"></div>
                            <!--<img src="../../assets/images/shoppingMall/userCenter/userCenterServiceIcon3.png" alt="">-->
                        </div>
                        <p>雇佣我的</p>
                    </div>
                </div>
            </div>
        </div>
        <!--猜你喜欢-->
        <div class="guessYouLikeGoodHeader">猜你喜欢</div>
        <div class="guessYouLikeGoodContent">
            <guessYouLikeGood v-bind:guessLikeData="toGuessLikeData"></guessYouLikeGood>
        </div>
    </div>
</template>

<script>
    import guessYouLikeGood from "../../components/global/guessYouLikeGood"
    export default {
        name: 'index',
        components:{
            guessYouLikeGood
        },
        computed:{
            // returnUserIcon(){
            //     // alert(JSON.parse(localStorage.shopSaveObject).userIcon);
            //     if(JSON.parse(localStorage.shopSaveObject).userIcon===""||JSON.parse(localStorage.shopSaveObject).userIcon===undefined||JSON.parse(localStorage.shopSaveObject).userIcon===null){
            //         return this.tools.publicDataSave.defaultUserIcon;
            //     }
            //     else{
            //         return JSON.parse(localStorage.shopSaveObject).userIcon;
            //     }
            // }
        },
        data() {
            return {
                //data值
                dateVal:"",
                //传递给猜你喜欢组件的数据
                toGuessLikeData:{
                    id:1,
                    title:"用户中心"
                },
                //用户信息
                userInfo:{
                    id:1,
                    userName:"读取中",
                    // iconUrl:JSON.parse(localStorage.shopSaveObject).userIcon===""?JSON.parse(localStorage.shopSaveObject).userIcon:"http://beta.tobebetterman.com/uploads/15229490522/cover/1546482962316445.png",
                    val:"1000",
                    //用户手机号
                    phone:"读取中",
                    //用户头像
                    icon:""
                },
                //订单数据
                orderListData:{
                    needPay:0,
                    waitShip:0,
                    waitGet:0,
                    waitJudge:0,
                    afterSale:0
                },
                //悬赏数据
                OfferListData:{
                    //待支付
                    needPay:0,
                    //待接单
                    waitReceipt:0,
                    //已接单
                    receipted:0
                },
                //悬赏的单一任务数据
                offerContent:{
                    id:10,
                    time:"2018-5-20",
                    progress:50,
                    progressText:"正在进行最终的修改和确认"
                },
                //悬赏单一任务的环形图配置
                offerContentCircleOption:{
                    //目标进度
                    rate:100,
                    //圆环文字
                    text:"哦牛批",
                    //轨道颜色
                    layerColor:"#eee",
                    //填充颜色
                    fill:"#fff",
                    //圆环直径
                    size:"40px",
                    //进度条宽度
                    strokeWidth:60
                }
            }
        },
        methods:{
            //返回头像的方法
            returnUserIcon(){
                // alert(JSON.parse(localStorage.shopSaveObject).userIcon);
                if(JSON.parse(localStorage.shopSaveObject).userIcon===""||JSON.parse(localStorage.shopSaveObject).userIcon===undefined||JSON.parse(localStorage.shopSaveObject).userIcon===null){
                    return this.tools.publicDataSave.defaultUserIcon;
                }
                else{
                    return JSON.parse(localStorage.shopSaveObject).userIcon;
                }
            },
            //进入我的服务的方法
            goToServiceFn(type){
                switch (type) {
                    case "1":
                        //进入我的服务-我发布的
                        this.$router.push({name:"myReleaseServiceList"});
                        break;
                    case "2":
                        //进入我的服务-我购买的
                        this.$router.push({name:"myPurchasedServiceList"});
                        break;
                    case "3":
                        //进入我的悬赏-我接单的
                        this.$router.push({name:"myHireMeServicesList"});
                        break;
                }
            },
            //进入我的悬赏列表页的方法
            goToMyRewardFn(type){
                switch (type) {
                    case "1":
                        //进入我的悬赏-我发布的
                        this.$router.push({name:"myRewardList"});
                        break;
                    case "2":
                        //进入我的悬赏-我接单的
                        this.$router.push({name:"myReceiptList"});
                        break;
                }
            },
            //我的悬赏，查看更多
            myXsCheckMore(){
                this.tools.globalFn.publicToastFn(this,"敬请期待");
            },
            //跳转商城设置的方法
            goToShopMalloptions(){
                // console.log(this.dateVal);
                this.$router.push({name:"chooseAddress"});
            },
            //返回圆环文字的方法
            returnCircleTextFn(){
                console.log("返回圆环的进度");
                console.log(this.offerContent.progress);
                return this.offerContent.progress+"%";
            },
            //跳转五大nav的方法
            topLinkFn(val){
                console.log(val);
                switch (val) {
                    case 0:
                        // alert(JSON.parse(localStorage.shopSaveObject).uuid);
                        this.tools.globalFn.publicToastFn(this,"敬请期待");
                        // this.$router.push("/userCenter");
                        break;
                    case 1:
                        this.$router.push("/userCenter/myCollection");
                        // this.tools.globalFn.publicToastFn(this,"敬请期待");
                        break;
                    case 2:
                        this.$router.push("/userCenter/myFollow");
                        // this.tools.globalFn.publicToastFn(this,"敬请期待");
                        break;
                    case 3:
                        this.$router.push("/userCenter/myFooter");
                        // this.tools.globalFn.publicToastFn(this,"敬请期待");
                        break;
                    case 4:
                        this.$router.push("/userCenter/myCoupon");
                        // this.tools.globalFn.publicToastFn(this,"敬请期待");
                        break;
                    case 5:
                        // this.$router.push("/userCenter/myCoupon");
                        // this.tools.globalFn.publicToastFn(this,"敬请期待");
                        // alert(JSON.parse(localStorage.shopSaveObject).userIcon);
                        this.$dialog.alert({
                            title: '开店相关',
                            message: '请用电脑浏览器登录http://www.tobebtterman.com进行相关操作'
                        }).then(() => {
                            // on close
                        });
                        break;
                }
            },
            //跳转订单列表的统一方法
            goToOrderListFn(type){
                switch (type) {
                    //查看全部
                    case '0':
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","0","add");
                        // localStorage.setItem("orderListType","0");
                        this.$router.push({name:"orderList"});
                        break;
                    //查看待付款
                    case '1':
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","1","add");
                        // localStorage.setItem("orderListType","1");
                        this.$router.push({name:"orderList"});
                        break;
                    //查看待发货
                    case '2':
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","2","add");
                        // localStorage.setItem("orderListType","2");
                        this.$router.push({name:"orderList"});
                        break;
                    //查看待收货
                    case '3':
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","3","add");
                        // localStorage.setItem("orderListType","3");
                        this.$router.push({name:"orderList"});
                        break;
                    //查看已取消
                    case '5':
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","5","add");
                        // localStorage.setItem("orderListType","4");
                        this.$router.push({name:"orderList"});
                        break;
                    case '10':
                        this.$router.push({name:"refundList"});
                        // this.tools.globalFn.publicToastFn(this,"敬请期待");
                        break;
                }
            },
            //返回上一页的方法
            backLastPage() {
                // this.$bridge.callHandler("tabBarStatus","true", (res)=> {
                //     if(res==="true"){
                //         // alert("应该返回到首页");
                //         this.$router.go(-1);
                //         // Vue.prototype.$router.go(-1);
                //     }
                // });
                // this.$router.go(-1);
                this.$router.go(-1);

            },
            //获取栏目数据的方法
            getFirstData() {
                // this.tools.globalFn.publicToastFn(this,"重新渲染");
                //放置userName
                this.userInfo.userName=JSON.parse(localStorage.shopSaveObject).nickName;
                //放置电话
                this.userInfo.phone=JSON.parse(localStorage.shopSaveObject).userTel;
                //放置icon
                this.userInfo.icon=this.returnUserIcon();
            }
        },
        created(){
            this.getFirstData();
        },
        mounted(){

        },
        watch:{

        },
        activated(){
            if(this.$route.meta.useOldData===false){
                this.getFirstData();
            }
            this.$route.meta.useOldData=false;
        },
        deactivated(){

        },
        beforeRouteEnter(to,from,next){
            //如果来自首页，需要刷新
            if(from.name==="index"){
                to.meta.useOldData=false;
                window.scroll(0,0);
            }
            else{
                to.meta.useOldData=true;
            }
            next();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .guessYouLikeGoodContent{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*padding: 0 5px;*/
    }
    .guessYouLikeGoodHeader{
        color: #333;
        font-size: 14px;
        padding: 0 10px;
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    /*我的服务*/
    .myServiceMoudleBox>div.middle{
        border-right: 1px solid #f3f3f3;
        border-left: 1px solid #f3f3f3;
    }
    .myServiceMoudleBox>div.leftBorder{
        border-left: 1px solid #f3f3f3;
    }
    .myServiceMoudleBox>div.rightBorder{
        border-right: 1px solid #f3f3f3;
    }
    .myServiceMoudleBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .myServiceMoudleBox>div{
        width: 50%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    .myServiceMoudleBox div.img{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .myServiceMoudleBox.reword div.img{
        margin-bottom: 6px;
    }
    .myServiceMoudleBox div.img div.box{
        width: 20%;
        padding-top: 20%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        height: auto;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        -webkit-background-size: cover;
        background-size: cover;
        margin-bottom: 6px;
    }
    .myServiceMoudleBox div.img.one div.box{
        background-image: url("../../assets/images/shoppingMall/userCenter/userCenterServiceIcon1.png");
    }
    .myServiceMoudleBox div.img.two div.box{
        background-image: url("../../assets/images/shoppingMall/userCenter/userCenterServiceIcon2.png");
    }
    .myServiceMoudleBox div.img.three div.box{
        background-image: url("../../assets/images/shoppingMall/userCenter/userCenterServiceIcon3.png");
    }
    .myServiceMoudleBox.reword div.img img{
        width: 30%;
    }
    .myServiceMoudleBox p{
        text-align: center;
        color: #676767;
        font-size: 14px;
    }
    /*我的悬赏*/
    .myOfferMoudleSingelContent{
        width: 100%;
        height: auto;
         overflow: hidden;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
    }
    .myOfferMoudleSingelContent .newLogisticsStyle{
        width: 80%;
    }
    /*我的悬赏样式*/
    .myOfferMoudleList{
        width: 100%;
        height: auto;
        /* overflow: hidden; */
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 10px 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .myOfferMoudleList>li{
        width: 33.3%;
        height: auto;
        /* overflow: hidden; */
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .myOfferMoudleStyle{
        width: 100%;
        height: auto;
        /* overflow: hidden; */
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
    }
    .myOfferMoudleStyle .van-icon{
        color: #30aaff;
        font-size: 24px;
    }
    .myOfferMoudleList>li p{
        color: #333;
        font-size: 12px;
        text-align: center;
    }
    /*用户中心样式*/
    .userCenterBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 20px 20px 40px 20px;
        background:linear-gradient(to right,#30aaff,#2BD0FE);
        display: flex;
    }
    .userCenterBg>div.img{
        width: 14%;
        border-radius:50%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }
    .userCenterBg>div.img::before{
        padding-top: 100%;
        content: '\20';
        display: block;
    }
    .userCenterBg>div.img img{
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .userCenterBg>div.info{
        width: 74%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .userCenterBg>div.info>p.userName{
        color: #fafafa;
        font-size: 16px;
    }
    .userCenterBg>div.info>p.val{
        color: #fafafa;
        font-size: 14px;
    }
    /*剩余所有部分*/
    .userCenterBigBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: -20px;
        padding: 0 10px;
    }
    /*五大导航*/
    .topNavPartBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
    }
    .topNavPartBox>li{
        float: left;
        width: 20%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .topNavPartBox>li div.nav{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .topNavPartBox>li div.nav>div.icon{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
    }
    .topNavPartBox>li div.nav>div.icon>{
        font-size: 14px;
    }
    .topNavPartBox>li div.nav>p{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        color: #676767;
        font-size: 12px;
    }
    .topNavPartBox>li div.nav>div.icon .van-icon{
        color: #48c0ff;
    }
    /*我的订单*/
    .myOrderBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 10px;
    }
    .myOrderBg>div.header{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        border-bottom: 1px solid #f3f3f3;
    }
    .myOrderBg>div.header>div.left{
        float: left;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        font-size: 14px;
        /*width: 100%;*/
        /*text-align: center;*/
    }
    .myOrderBg.change>div.header>div.left{
        /*float: left;*/
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        font-size: 14px;
        width: 100%;
        text-align: center;
    }
    .myOrderBg>div.header>div.right{
        float: right;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #999;
        font-size: 14px;
    }
    .myOrderBg>div.header>div.right>.van-icon{
        font-size: 12px;
        position: relative;
        top: 1px;
    }
    .myOrderBg>ul.list{
        width: 100%;
        height: auto;
        /*overflow: hidden;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 10px 0;
        display: flex;
    }
    .myOrderBg>ul.list>li{
        width: 20%;
        height: auto;
        /*overflow: hidden;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*float: left;*/
    }
    .myOrderBg>ul.list>li>div.icon{
        width: 100%;
        height: auto;
        /*overflow: hidden;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
    }
    .myOrderBg>ul.list>li>div.icon .van-icon{
        color: #30aaff;
        font-size: 24px;
    }
    .myOrderBg>ul.list>li>p{
        color: #333;
        font-size: 12px;
        text-align: center;
    }
    /*最新物流*/
    .newLogisticsBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px;
        margin-bottom: 10px;
    }
    .newLogisticsBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 10px;
        background-color: #eee;
        border-radius: 4px;
        border: 1px solid #e5e5e5;
    }
    .newLogisticsBox>div.header{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
    .newLogisticsBox>div.header>div.left{
        float: left;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #727272;
        font-size: 14px;
    }
    .newLogisticsBox>div.header>div.right{
        float: right;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #727272;
        font-size: 14px;
    }
    .newLogisticsStyle{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #727272;
        font-size: 14px;
        display: flex;
    }
    .newLogisticsStyle>div.img{
        width: 14%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }
    .newLogisticsStyle>div.img::before{
        padding-top: 100%;
        content: '\20';
        display: block;
    }
    .newLogisticsStyle>div.img>img{
        display: block;
        width: 100%;
        left: 0;
        top: 0;
        height: 100%;
        position: absolute;
    }
    .newLogisticsStyle>div.info{
        width: 84%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        flex: 1;
        margin-left: 10px;
    }
    .newLogisticsStyle>div.info>p.status{
        color: #30aaff;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
    .newLogisticsStyle>div.info>p.text{
        color: #717171;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
    /*猜你喜欢*/
    .guessYouLikeBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*padding: 0 10px;*/
    }
    .guessYouLikeBg>div.header{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        font-size: 16px;
    }
    .guessYouLikeBg>ul.list{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .guessYouLikeBg>ul.list>li{
        width: 50%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 5px 5px;
        float: left;
    }
    .guessYouLikeStyle{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 4px;
    }
    .guessYouLikeStyle>div.img{
        width: 100%;
        padding-top: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 6px;
    }
    .guessYouLikeStyle>div.img img{
        width: 100%;
        display: block;
        position: absolute;
        left:0;
        top: 0;
        height: 100%;
    }
    .guessYouLikeStyle>p.name{
        color: #666;
        font-size: 14px;
        display: -webkit-box;
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        white-space: normal;
        -webkit-box-orient: vertical;
        word-break: break-all;
        margin-bottom: 4px;
        padding:0 10px;
    }
    .guessYouLikeStyle>div.goodInfo{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px;
        margin-bottom: 10px;
    }
    .guessYouLikeStyle>div.goodInfo>p.left{
        float: left;
        color: #ff9921;
        font-size: 14px;
    }
    .guessYouLikeStyle>div.goodInfo>p.right{
        float: right;
        color: #999;
        font-size: 12px;
    }
</style>
