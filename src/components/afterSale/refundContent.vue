<template>
    <div class="publicAllContentBg" id="refundContent">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="退款详情"
                     @click-left="backLastPage"
                     fixed>
            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--订单状态背景-->
        <div class="orderContentStatusBg">
            <div class="body">
                <div class="info">
                    <p class="title">退款成功</p>
                    <p class="text">2018-05-12  12:50</p>
                </div>
            </div>
        </div>
        <!--订单其他信息-->
        <div class="orderContentBg">
            <!--如果卖家尚未同意退款-->
            <div class="textInfoBox" v-if="orderContentData.refundStatus===1">
                <div class="header">您已成功发起退款申请，请耐心等待商家处理。</div>
                <ul>
                    <li>1.商家同意后，请按照给出的退货地址退货，并请记录退货运单号。</li>
                    <li>2.如商家拒绝，您可以修改申请后再次发起，商家会重新处理。</li>
                    <li>3.如商家超时未处理，退货申请将达成，请按系统给出的退货。</li>
                </ul>
            </div>
            <!--如果卖家已经同意退款，渲染下面的-->
            <div class="agreeRefundInfoBox" v-if="orderContentData.refundStatus===2">
                <!--header-->
                <div class="header">
                    <p class="left">退款总金额</p>
                    <p class="right">￥11.22</p>
                </div>
                <!--退款进度-->
                <div class="stepProgressBox">
                    <van-steps :active="orderContentData.refundProgress" active-color="#30aaff" direction="vertical">
                        <van-step>
                            <p class="title">卖家退款</p>
                            <p class="info">2018-2-12  18:50</p>
                        </van-step>
                        <van-step>
                            <p class="title">银行受理</p>
                            <p class="info">2018-2-12  18:50</p>
                        </van-step>
                        <van-step>
                            <p class="title">退款成功</p>
                            <p class="info">2018-2-12  18:50</p>
                        </van-step>
                    </van-steps>
                </div>
            </div>
            <!--购买的商品详情-->
            <div class="orderListBox">
                <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===true"
                             class="globalLoadingAnmClass"></van-loading>
                <div class="orderListStyle">
                    <!--订单头部信息-->
                    <div class="header">
                        <div class="left"><van-icon name="shop" style="margin-right: 4px"></van-icon>{{orderContentData.shopInfo.name}}<van-icon name="arrow" style="margin-left: 4px"></van-icon></div>
                        <!--<div class="right" v-text="orderStatusText(orderContentData)"></div>-->
                    </div>
                    <!--订单商品列表-->
                    <ul class="list">
                        <li v-for="item in orderContentData.goodsList">
                            <div class="orderListGoodsStyle">
                                <!--左侧图片部分-->
                                <div class="img">
                                    <img :src="item.imgUrl" alt="">
                                </div>
                                <!--右侧商品信息部分-->
                                <div class="info">
                                    <div class="top">
                                        <p class="title">{{item.title}}</p>
                                        <p class="realPrice">￥{{(item.price/100).toFixed(2)}}<br v-if="item.zkInfo.zk===true"><span v-if="item.zkInfo.zk===true" v-text="getOldPriceFn(item)"></span></p>
                                    </div>
                                    <div class="bottom">
                                        <p class="gg">{{item.ggName}}</p>
                                        <p class="num">x{{item.num}}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!--订单编号支付编号等信息-->
            <div class="publicOrderBg numInfo">
                <ul class="orderNumInfo">
                    <li>退款编号:192380324225800922</li>
                    <li>退款金额:￥12.26</li>
                    <li>创建时间:2018-07-19 22:06:24</li>
                </ul>
            </div>
        </div>

        <!--底部固定的按钮-->
        <div class="fixedBottomLine" v-if="orderContentData.refundStatus===1">
            <span class="cancel">撤销申请</span>
            <span class="pay">修改申请</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'refundContent',
        data() {
            return {
                //本地的商品列表下拉加载数据
                orderContentData: {
                    orderId:"2451554712454",
                    shopInfo:{
                        id:1,
                        name:"哦牛批店铺"
                    },
                    total:1202355,
                    yf:105,
                    //当前订单是仅退款还是
                    refundType:1,
                    //当前处理状态()
                    refundStatus:2,
                    //当前退款进度
                    refundProgress:1,
                    goodsList:[
                        {
                            id: 1,
                            title: "哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品",
                            price: 10520,
                            imgUrl: "../../../images/shoppingMall/cart/goodImg.png",
                            ggName:"规格:哦牛批规格",
                            zkInfo:{
                                zk:false,
                                zkPro:0.2
                            },
                            num:2
                        }
                    ],
                },
                //第一次数据请求是否完成
                firstDataStatusAnm: false,
            }
        },
        methods: {
            //返回退款状态的方法
            orderStatusReturnFn:function(val){
                if(val===1){
                    return "退款成功";
                }
                else if(val===2){
                    return "退款中";
                }
                else if(val===3){
                    return "退款失败";
                }
            },
            //拿原价的方法
            getOldPriceFn:function(item){
                console.log("打印原价");
                console.log(item);
                return "￥"+(item.price*item.zkInfo.zkPro/100).toFixed(2);
            },
            //返回改订单文字状态的方法
            orderStatusText:function(order){
                console.log(order);
                if(order.status==="ordered"){
                    return "买家已下单";
                }
                else if(order.status==="paid"){
                    return "买家已付款";
                }
                else if(order.status==="shiped"){
                    return "卖家已发货";
                }
                else if(order.status==="collected"){
                    return "交易成功";
                }
            },
            //到底部加载新数据的方法
            orderListOnload: function () {
                console.log("加载更多");
            },
            //切换顶部tab的方法
            changeTopTab: function (index, title) {
                console.log(index);
                console.log(title);
            },
            //返回上一页的方法
            backLastPage () {
                this.$router.go(-1);
            },
            //到底部加载新数据的方法
            goodsListOnload: function () {
                console.log("加载更多");
            }
        },
        created() {
        },
        mounted() {

        },
        watch: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .orderListBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
    /*订单样式*/
    .orderListStyle{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
    }
    .orderListStyle>div.header{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 8px 10px;
    }
    .orderListStyle>div.header>div.left{
        float: left;
        color: #333;
        font-size: 14px;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .orderListStyle>div.header>div.left .van-icon{
        font-size: 12px;
    }
    .orderListStyle>div.header>div.right{
        float: right;
        color: #30aaff;
        font-size: 14px;
    }
    .orderListStyle>ul.list{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .orderListStyle>ul.list>li{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-top: 1px solid #f3f3f3;
    }
    .orderListStyle>ul.list>li:first-child{
        border-top: none;
    }
    /*商品样式*/
    .orderListGoodsStyle{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fafafa;
        padding: 10px;
    }
    .orderListGoodsStyle div.img{
        width: 20%;
        padding-top: 20%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        float: left;
    }
    .orderListGoodsStyle div.img img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .orderListGoodsStyle div.info{
        width: 78%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        float: right;
    }
    .orderListGoodsStyle div.info>div.top{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }
    .orderListGoodsStyle div.info>div.top>p.title{
        width: 70%;
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
    .orderListGoodsStyle div.info>div.top>p.realPrice{
        width: 28%;
        color: #333;
        float: left;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        font-size: 14px;
        text-align: right;
        font-weight: bold;
    }
    .orderListGoodsStyle div.info>div.top>p.realPrice span{
        color: #999;
        text-decoration: line-through;
        font-size: 12px;
    }
    .orderListGoodsStyle div.info>div.bottom{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }
    .orderListGoodsStyle div.info>div.bottom>p.gg{
        float: left;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 14px;
        color: #999;
    }
    .orderListGoodsStyle div.info>div.bottom>p.num{
        float: right;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 14px;
        color: #999;
    }
    /*商品合计部分*/
    .orderTotalBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #f3f3f3;
    }
    .orderTotalBox>div.body{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: right;
        padding: 10px 10px;

    }
    .orderTotalBox>div.body>p{
        color: #051b28;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
    }
    .orderTotalBox>div.body>p>span.price{
        color: #ff7b11;
    }
    .orderTotalBox>div.body>p>span:first-child{
        color: #999;
    }
    /*按钮部分*/
    .orderButtonBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 6px 10px;
    }
    .orderButtonBox>span{
        display: inline-block;
        color: #9b9b9b;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid #9b9b9b;
        padding: 2px 4px;
        float: right;
        margin-left: 4px;
    }
    .orderButtonBox>span.del{
        float: left!important;
    }
    .orderButtonBox>span.confirmGet{
        border-color: #30aaff;
        color: #30aaff;
    }
    /*.orderButtonBox>span.evaluate{*/
    /*border-color: #30aaff;*/
    /*color: #30aaff;*/
    /*}*/
    /*订单状态背景*/
    .orderContentStatusBg{
        width: 100%;
        height:auto;
        padding:10px 0;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: linear-gradient(to right,#30aaff,#2BD0FE);
        margin-bottom: 10px;
    }
    .orderContentStatusBg>div.body{
        width: 100%;
        height: 100%;
        background-repeat:no-repeat ;
        background-position:96% center;
        background-size: auto 90%;

    }
    .orderContentStatusBg>div.body>div.info{
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        /*align-items:center;*/
        flex-direction: column;
        margin-left: 20px;
    }
    .orderContentStatusBg>div.body p.title{
        color: #fff;
        font-size: 14px;
    }
    .orderContentStatusBg>div.body p.text{
        color: #fff;
        font-size: 12px;
    }
    /*公共的版块盒子*/
    .publicOrderBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
    }
    .orderNumInfo{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
    }
    .orderNumInfo>li{
        color: #999;
        font-size: 12px;
        margin-top: 5px;
    }
    .orderNumInfo>li:first-child{
        margin-top: 0;
    }
    /*底部固定按钮部分*/
    .fixedBottomLine{
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
    .fixedBottomLine>span{
        display: inline-block;
        color: #9b9b9b;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid #9b9b9b;
        padding: 4px 6px;
        float: right;
        margin-left: 4px;
    }
    .fixedBottomLine>span.pay{
        border-color: #30aaff;
        color: #30aaff;
    }
    .fixedBottomLine>span.del{
        float: left!important;
    }
    .fixedBottomLine>span.confirmGet{
        border-color: #30aaff;
        color: #30aaff;
    }
    .fixedBottomLine>span.evaluate{
        border-color: #30aaff;
        color: #30aaff;
    }
    .orderContentBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 59px;
    }
    .textInfoBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px;
        margin-bottom: 10px;
    }
    .textInfoBox>div.header{
        color: #666;
        font-size: 14px;
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid #f3f3f3;
    }
    .textInfoBox>ul{
    }
    .textInfoBox>ul>li{
        list-style-type: circle;
        color: #999;
        font-size: 14px;
        margin-top: 4px;
    }
    .textInfoBox>ul>li:first-child{
        margin-top: 0;
    }
    /*退款进度条*/
    .agreeRefundInfoBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        padding:10px;
        margin-bottom: 10px;
    }
    .agreeRefundInfoBox>div.header{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 1px solid #f3f3f3;
    }
    .agreeRefundInfoBox>div.header>p.left{
        color: #333;
        font-size: 14px;
    }
    .agreeRefundInfoBox>div.header>p.right{
        color: #ff8b02;
        font-size: 14px;
    }
    /*步骤条*/
    .stepProgressBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>
