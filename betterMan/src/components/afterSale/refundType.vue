<template>
    <div class="publicAllContentBg" id="refundType">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="选择服务类型"
                     @click-left="backLastPage"
                     fixed>
            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--商品信息-->
        <div class="orderContentBg">
            <!--购买的商品详情-->
            <div class="orderListBox">
                <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===true"
                             class="globalLoadingAnmClass"></van-loading>
                <div class="orderListStyle">
                    <!--订单头部信息-->
                    <div class="header">
                        <div class="left">
                            <van-icon name="shop" style="margin-right: 4px"></van-icon>
                            {{orderContentData.shopInfo.name}}
                            <!--<van-icon name="arrow" style="margin-left: 4px"></van-icon>-->
                        </div>
                        <!--<div class="right" v-text="orderStatusText(orderContentData)"></div>-->
                    </div>
                    <!--订单商品列表-->
                    <div class="orderListGoodsStyle">
                        <!--左侧图片部分-->
                        <div class="img">
                            <img :src="orderContentData.good.imgUrl" alt="">
                        </div>
                        <!--右侧商品信息部分-->
                        <div class="info">
                            <div class="top">
                                <p class="title">{{orderContentData.good.title}}</p>
                                <p class="realPrice">￥{{(orderContentData.good.price/100).toFixed(2)}}<br
                                        v-if="orderContentData.good.zkInfo.zk===true"><span v-if="orderContentData.good.zkInfo.zk===true"
                                                                                            v-text="getOldPriceFn(item)"></span></p>
                            </div>
                            <div class="bottom">
                                <p class="gg">{{orderContentData.good.ggName}}</p>
                                <p class="num">x{{orderContentData.good.num}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--退货退款选项-->
        <van-cell-group>
            <van-cell icon="afterSale" title="仅退款"  label="未收到货,(包含未签收)或卖家同意协商下" is-link @click="goToApplyFn()"></van-cell>
            <van-cell icon="refundAndGoods" title="退款退货"  label="已收到货,需要退换已收到的货物" is-link @click="goToApplyFn()"></van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: 'refundType',
        data() {
            return {
                //本地的商品列表下拉加载数据
                orderContentData: {
                    orderId: "2451554712454",
                    shopInfo: {
                        id: 1,
                        name: "哦牛批店铺"
                    },
                    total: 1202355,
                    yf: 105,
                    good: {
                        id: 1,
                        title: "哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品",
                        price: 10520,
                        imgUrl: "../../../images/shoppingMall/cart/goodImg.png",
                        ggName: "规格:哦牛批规格",
                        zkInfo: {
                            zk: false,
                            zkPro: 0.2
                        },
                        num: 2
                    },
                    status: "ordered"
                },
                //第一次数据请求是否完成
                firstDataStatusAnm: false
            }
        },
        methods: {

            //跳转申请的方法
            goToApplyFn(){
                this.$router.push({name:"refundApply"});
            },
            //拿原价的方法
            getOldPriceFn: function (item) {
                console.log("打印原价");
                console.log(item);
                return "￥" + (item.price * item.zkInfo.zkPro / 100).toFixed(2);
            },
            //返回改订单文字状态的方法
            orderStatusText: function (order) {
                console.log(order);
                if (order.status === "ordered") {
                    return "买家已下单";
                }
                else if (order.status === "paid") {
                    return "买家已付款";
                }
                else if (order.status === "shiped") {
                    return "卖家已发货";
                }
                else if (order.status === "collected") {
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
            },
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
    .orderListStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        padding-bottom: 10px;
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
        background-color: #fafafa;
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

    .orderContentBg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

</style>
