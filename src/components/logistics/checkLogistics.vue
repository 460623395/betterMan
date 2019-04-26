<template>
    <div class="publicAllContentBg" id="checkLogistics">
        <van-nav-bar class="globalNavBarHeaderClass" title="查看物流" @click-left="backLastPage" fixed>
            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass" ></van-icon>
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--商品列表-->
        <div class="orderListBox">
            <ul class="list">
                <li>
                    <div class="orderListStyle">
                        <!--订单商品列表-->
                        <ul class="list">
                            <li v-for="item in orderListData.goodsList" :key="item.id">
                                <div class="orderListGoodsStyle">
                                    <!--左侧图片部分-->
                                    <div class="img">
                                        <img :src="item.imgUrl" alt="">
                                    </div>
                                    <!--右侧商品信息部分-->
                                    <div class="info">
                                        <div class="top">
                                            <p class="title">{{item.title}}</p>
                                            <!--<p class="realPrice">￥{{(item.price/100).toFixed(2)}}<br v-if="item.zkInfo.zk===true"><span v-if="item.zkInfo.zk===true" v-text="getOldPriceFn(item)"></span></p>-->
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
                </li>
            </ul>
        </div>
        <!--快递信息-->
        <div class="shipCompanyBox">
            <!--快递公司图片-->
            <div class="img">
                <img :src="orderListData.shipInfo.img" alt="">
            </div>
            <!--快递公司信息-->
            <div class="info">
                <h3>{{orderListData.shipInfo.companyName}}</h3>
                <h4>快递单号:{{orderListData.shipInfo.orderId}}</h4>
                <h5>快递公司电话:{{orderListData.shipInfo.companyPhone}}</h5>
            </div>
        </div>
        <!--物流信息-->
        <van-steps direction="vertical" :active="shipInfo.step" active-color="#30aaff" class="shipInfoCom">
            <van-step v-for="item in shipInfo.stepInfo" :key="item.id">
                <h3>{{item.info}}</h3>
                <p>{{item.time}}</p>
            </van-step>
        </van-steps>
    </div>
</template>

<script>
    export default {
        name: 'checkLog',
        data() {
            return {
                //目前物流选中步骤
                shipInfo:{
                    step:0,
                    stepInfo:[
                        {
                            id:1,
                            info:"【城市】物流状态2",
                            time:"2016-07-10 09:30"
                        },
                        {
                            id:1,
                            info:"【城市】物流状态1",
                            time:"2016-07-10 09:30"
                        },
                        {
                            id:1,
                            info:"快件已发货",
                            time:"2016-07-10 09:30"
                        },
                    ]
                },
                //本地的商品列表下拉加载数据
                orderListData:
                    {
                        orderId: "2451554712454",
                        shopInfo: {
                            id: 1,
                            name: "哦牛批店铺"
                        },
                        total: 1202355,
                        yf: 105,
                        goodsList: [
                            {
                                id: 1,
                                title: "哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品",
                                price: 10520,
                                imgUrl:"" ,
                                ggName: "规格:哦牛批规格",
                                zkInfo: {
                                    zk: false,
                                    zkPro: 0.2
                                },
                                num: 2
                            },
                            {
                                id: 1,
                                title: "哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品",
                                price: 10520,
                                imgUrl: "",
                                ggName: "规格:哦牛批规格",
                                zkInfo: {
                                    zk: false,
                                    zkPro: 0.2
                                },
                                num: 2
                            }
                        ],
                        status: "ordered",
                        //快递信息
                        shipInfo:{
                            img:require("../../assets/images/shoppingMall/order/shipComIcon.png"),
                            orderId:"2454154122544412",
                            companyName:"韵达快递",
                            companyPhone:"12445541"
                        }
                    }
                ,
                //第一次数据请求是否完成
                firstDataStatusAnm: false,
            }
        },
        methods: {
            //返回上一页的方法
            backLastPage: function () {
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

    .orderListBox > .van-list > ul.list {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .orderListBox > .van-list > ul.list > li {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
        /*border-top: 1px solid #e3e3e3;*/
    }

    .orderListBox > ul.list > li:first-child {
        margin-top: 0;
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

    .orderListStyle > div.header > div.right {
        float: right;
        color: #30aaff;
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
        background-color: #fff;
        padding: 10px;
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

    .orderListGoodsStyle div.info > div.top > p.realPrice {
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
    }

    .orderListGoodsStyle div.info > div.bottom > p.gg {
        float: left;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 14px;
        color: #999;
    }

    .orderListGoodsStyle div.info > div.bottom > p.num {
        float: right;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 14px;
        color: #999;
    }
    /*快递公司信息栏*/
    .shipCompanyBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        align-items:center;
        background-color: #fff;
        padding: 10px;
        margin-bottom: 10px;
    }
    .shipCompanyBox>div.img{
        width: 12%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 50%;
        position: relative;
    }
    .shipCompanyBox>div.img::before{
        padding-top: 100%;
        content: '\20';
        display: block;
    }
    .shipCompanyBox>div.img img{
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .shipCompanyBox>div.info{
        flex: 1;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-left: 10px;
    }
    .shipCompanyBox>div.info>h3{
        color: #282828;
        font-size: 14px;
        font-weight: normal;

    }
    .shipCompanyBox>div.info>h4{
        color: #282828;
        font-size: 14px;
        font-weight: normal;
    }
    .shipCompanyBox>div.info>h5{
        color: #282828;
        font-size: 14px;
        font-weight: normal;
    }
    /*物流步骤组件*/
    .shipInfoCom h3{
        font-size: 14px;
        font-weight: normal;
    }
    .shipInfoCom p{
        font-size: 14px;
        font-weight: normal;
    }
</style>
