<template>
    <div class="publicAllContentBg" id="myPurchasedServiceContent">
        <!--头部导航-->
        <van-nav-bar title="雇佣我的服务详情" class="globalNavBarHeaderClass"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     fixed
        >
        </van-nav-bar>
        <!--订单状态背景-->
        <div class="contentColorBg">
            <p class="status" v-text="orderStatusText(orderContentData)">读取中</p>
        </div>
        <van-loading type="spinner" color="black" v-if="orderLoadingDone===false"
                     class="globalLoadingAnmClass"></van-loading>
        <!--订单-->
        <div class="orderListStyle" v-if="orderLoadingDone">
            <!--订单头部信息-->
            <div class="header">
                <div class="left">
                    <span class="company" v-if="orderContentData.taskType==1">个人服务</span>
                    <span class="person" v-if="orderContentData.taskType==2">企业服务</span>
                </div>
                <!--<div class="right" v-text="orderStatusText(orderContentData)"></div>-->
            </div>
            <!--订单商品列表-->
            <ul class="list">
                <li>
                    <div class="orderListGoodsStyle">
                        <!--左侧图片部分-->
                        <div class="img">
                            <img :src="orderContentData.img" alt="">
                        </div>
                        <!--右侧商品信息部分-->
                        <div class="info">
                            <div class="top">
                                <p class="title">{{orderContentData.title}}</p>
                                <!--<p class="realPrice">￥{{(orderContentData.price/100).toFixed(2)}}-->
                                <!--&lt;!&ndash;折扣&ndash;&gt;-->
                                <!--&lt;!&ndash;<br v-if="orderContentData.zkInfo.zk===true"/><span v-if="orderContentData.zkInfo.zk===true" v-text="getOldPriceFn(orderContentData)"></span>&ndash;&gt;-->
                                <!--</p>-->
                            </div>
                            <div class="bottom">
                                <p class="gg">价格:￥{{(orderContentData.price/100).toFixed(2)}}</p>
                                <!--<p class="num">￥{{(orderContentData.price/100).toFixed(2)}}</p>-->
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--步骤-->
        <!--<van-steps :active="taskStepData.nowStep" active-color="#30aaff" direction="vertical" v-if="orderLoadingDone" style="margin-bottom: 10px">-->
            <!--<van-step v-for="item in taskStepData.list" :key="item.id">{{item.title}}</van-step>-->
        <!--</van-steps>-->
        <!--其余剩下的信息-->
        <van-cell-group v-if="orderLoadingDone">
            <!--<van-cell title="接单者" :value="orderContentData.orderTakeMan" />-->
            <van-cell title="订单号" :value="orderContentData.orderNum" />
            <van-cell title="接单时间" :value="orderContentData.cTime"/>
            <van-cell title="购买服务者" :value="orderContentData.buyServiceUserName"/>
            <van-cell title="购买服务者联系电话" :value="orderContentData.buyServiceUserPhone"/>
            <van-cell title="购买服务者地址" :value="orderContentData.buyServiceUserAddress"/>
        </van-cell-group>
        <!--底部固定的按钮-->
        <div class="fixedBottomLine" v-if="(orderLoadingDone===true&&orderContentData.taskStatus==0)||(orderLoadingDone===true&&orderContentData.taskStatus==1)">
        <!--<div class="fixedBottomLine">-->
            <span class="del" @click="cancelOrderFn(orderContentData)" v-if="orderContentData.taskStatus==0">取消订单</span>
            <span class="pay" @click="startSeviceConfirm(orderContentData)" v-if="orderContentData.taskStatus==1">开始服务</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'myRewardContent',
        data() {
            return {
                //所有是否已经加载完成
                orderLoadingDone:false,
                //展示步骤
                // taskStepData: {
                //     //目前步骤
                //     nowStep: 0,
                //     //步骤列表
                //     list: [
                //         {
                //             id: 1,
                //             title: "乙方已接单，等待甲方确认"
                //         },
                //         {
                //             id: 2,
                //             title: "甲方已确认，乙方施工中"
                //         },
                //         {
                //             id: 3,
                //             title: "乙方施工已完成，等待甲方审核"
                //         },
                //         {
                //             id: 4,
                //             title: "甲方审核通过，订单已完成"
                //         }
                //     ]
                // },
                //是否已经全部加载完成
                // firstLoadingStatus:false,
                //    当前悬赏信息
                orderContentData:{
                    // id: 4,
                    // //悬赏名称
                    // title: "哦牛批服务哦牛批服务哦牛批服务哦牛批服务哦牛批服务",
                    // //总价
                    // price: 0,
                    // //定金
                    // deposit: 0,
                    // //类型(企业还是个人悬赏)1企业，0个人
                    // taskType: 0,
                    // //是否开启悬赏
                    // // isOpen:true,
                    // //当前状态
                    // taskStatus: "1",
                    // //图片
                    // img: "",
                }
            }
        },
        methods: {
            //取消接单的方法
            cancelOrderFn(item){
                console.log(item);
                //弹出提示框，是否确认
                this.$dialog.confirm({
                    title: '取消确认',
                    message: '确认取消该订单？'
                }).then(() => {
                    // 确认
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/serviceorder/changestatus",
                        baseUrl:this.tools.ajaxAddress.other,
                        needLogin:false,
                        data:{
                            token:this.publicGetUserNormalTokenFn(this),
                            order_id:item.id,
                            status:"5"
                        },
                        success:(res)=>{
                            if(res.data.code===200){
                                this.tools.globalFn.publicToastFn(this,"取消成功！");
                                //改变该item的值,变为已发布待接单的状态
                                item.order_status="5";
                            }
                            else{
                                // alert(JSON.stringify(res.data));
                            }
                        }
                    })
                }).catch(() => {
                    // 取消
                });
            },
            //确认开始服务
            startSeviceConfirm(item){
                this.$dialog.confirm({
                    title: '服务确认',
                    message: '确认开始服务？'
                }).then(() => {
                    // 确认开始服务
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/serviceorder/changestatus",
                        baseUrl:this.tools.ajaxAddress.other,
                        data:{
                            // token:JSON.parse(localStorage.shopSaveObject).token,
                            token:this.publicGetUserNormalTokenFn(this),
                            order_id:item.id,
                            status:"2"
                        },
                        success:(res)=>{
                            if(res.data.code===200){
                                this.tools.globalFn.publicToastFn(this,"确认成功！");
                                //改变该item的值,改为通过状态(已完成)
                                item.order_status="2";
                            }
                            else{
                                // alert(JSON.stringify(res.data));
                                // alert(res.config.data);
                            }
                        }
                    });

                }).catch(() => {
                    // 取消
                });
            },
            //返回改订单文字状态的方法
            orderStatusText(orderContentData) {
                // if(orderContentData.isOpen===false){
                //     return "尚未开启";
                // }
                switch (orderContentData.taskStatus) {
                    case "0":
                        return "待支付";
                    case "1":
                        return "已支付，待服务";
                    case "2":
                        return "待收货";
                    case "3":
                        return "待评价";
                    case "4":
                        return "已完成";
                    case "9":
                        return "已取消";
                }
            },
            //返回上一页的方法
            backLastPage() {
                this.$router.go(-1);
            },
            //初始化数据的方法
            getFirstData(){
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/serviceorder/orderdetails",
                    baseUrl:this.tools.ajaxAddress.other,
                    data:{
                        token:this.publicGetUserNormalTokenFn(this),
                        order_id:this.$route.params.id
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.orderContentData={
                                id: res.data.result.id,
                                //悬赏名称
                                title: res.data.result.title,
                                //总价
                                price: res.data.result.money,
                                //定金
                                // deposit: res.data.result.earnest_money,
                                //类型(企业还是个人悬赏)1企业，0个人
                                taskType: res.data.result.type,
                                //是否开启悬赏
                                // isOpen:true,
                                //当前状态
                                taskStatus: res.data.result.order_status,
                                //
                                //图片
                                img:res.data.result.imgs.split("|")[0],
                                //购买服务人的名称
                                buyServiceUserName:res.data.result.user_name,
                                //购买服务人的联系电话
                                buyServiceUserPhone:res.data.result.user_phone,
                                //购买者地址
                                buyServiceUserAddress:res.data.result.user_address_state+res.data.result.user_address_city+res.data.result.user_address_district+res.data.result.user_address_area,
                                //订单号
                                orderNum:res.data.result.order_id,
                                //接单时间
                                cTime:res.data.result.ctime
                            };
                            //显示的步骤状态
                            // this.taskStepData.nowStep=parseInt(res.data.result.status)-1;
                            //渲染页面
                            this.orderLoadingDone=true;
                        }


                    },
                    fail:(err)=>{
                        console.log(err);
                    }
                });
                // setTimeout(()=>{
                //     this.orderContentData={
                //         id: 4,
                //         //悬赏名称
                //         title: "哦牛批服务哦牛批服务哦牛批服务哦牛批服务哦牛批服务",
                //         //总价
                //         price: 203254,
                //         //定金
                //         deposit: 10000,
                //         //类型(企业还是个人悬赏)1企业，0个人
                //         taskType: 0,
                //         //是否开启悬赏
                //         isOpen:true,
                //         //当前状态
                //         taskStatus: "published",
                //         //图片
                //         img: "//img-beta.tobebetterman.com/media/catalog/product/cache/bd935443df1c50537d4edaab4af5d446/296/0/k/jt/kjtc3knwprncdgb1538290486.jpg",
                //     };
                //     this.firstLoadingStatus=true;
                // },500);

            }
        },
        created() {
            this.getFirstData();
        },
        mounted() {

        },
        watch: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*底部固定按钮部分*/
    .fixedBottomLine {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #fff;
    }

    .fixedBottomLine > span {
        display: inline-block;
        color: #9b9b9b;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid #9b9b9b;
        padding: 4px 6px;
        float: right;
        margin-left: 4px;
    }

    .fixedBottomLine > span.pay {
        border-color: #30aaff;
        color: #30aaff;
    }

    .fixedBottomLine > span.del {
        float: left !important;
    }

    .fixedBottomLine > span.confirmGet {
        border-color: #30aaff;
        color: #30aaff;
    }

    .fixedBottomLine > span.evaluate {
        border-color: #30aaff;
        color: #30aaff;
    }
    /*订单样式*/
    .orderListStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        margin-bottom: 10px;
    }

    .orderListStyle > div.header {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 8px 10px;
    }

    .orderListStyle > div.header > div.left {
        float: left;
        color: #333;
        font-size: 14px;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .orderListStyle > div.header > div.left .van-icon {
        font-size: 12px;
    }
    .orderListStyle > div.header > div.left span.company {
        font-size: 12px;
        color: #fafafa;
        padding: 4px 6px;
        background-color: #47b3ff;
        border-radius: 2px;
        display: inline-block;
    }
    .orderListStyle > div.header > div.left span.person {
        font-size: 12px;
        color: #fafafa;
        padding: 4px 6px;
        background-color: #f44;
        border-radius: 2px;
        display: inline-block;
    }
    .orderListStyle > div.header > div.right {
        float: right;
        color: #333;
        font-size: 14px;
    }

    .orderListStyle > ul.list {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .orderListStyle > ul.list > li {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-top: 1px solid #f3f3f3;
    }

    .orderListStyle > ul.list > li:first-child {
        border-top: none;
    }

    /*商品样式*/
    .orderListGoodsStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fafafa;
        padding: 10px;
        margin-bottom: 10px;
    }

    .orderListGoodsStyle div.img {
        width: 20%;
        padding-top: 20%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        float: left;
        background-color: #fafafa;
    }

    .orderListGoodsStyle div.img img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .orderListGoodsStyle div.info {
        width: 78%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        float: right;
    }

    .orderListGoodsStyle div.info > div.top {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }

    .orderListGoodsStyle div.info > div.top > p.title {
        width: 100%;
        float: left;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        white-space: normal;
        -webkit-box-orient: vertical;
        word-break: break-all;
        display: -webkit-box;
        font-size: 14px;
        color: #333;
    }

    .orderListGoodsStyle div.info > div.top > p.realPrice {
        width: 30%;
        color: #333;
        float: right;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        font-size: 14px;
        text-align: right;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .orderListGoodsStyle div.info > div.top > p.realPrice span {
        color: #999;
        text-decoration: line-through;
        font-size: 12px;
    }

    .orderListGoodsStyle div.info > div.bottom {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-orderContentDatas: center;
        justify-content: space-between;
    }

    .orderListGoodsStyle div.info > div.bottom > p.gg {
        /*float: left;*/
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 12px;
        color: #999;
    }

    .orderListGoodsStyle div.info > div.bottom > p.num {
        /*float: right;*/
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 14px;
        color: #333;
        font-weight: 400;
    }
    .contentBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px;
    }
    .contentColorBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: linear-gradient(to right,#30aaff,#2BD0FE);
        padding: 10px;
        margin-bottom: 10px;
    }
    .contentColorBg>p.status{
        color: #fafafa;
        font-size: 14px;
        padding-left: 10px;
    }
</style>
