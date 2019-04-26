<template>
    <div class="publicAllContentBg pos" id="orderContent">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="订单详情"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     fixed>
            <!--<van-icon name="arrow-left" slot="left" style="color: #fafafa" @click="backLastPage"></van-icon>-->
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===false"
                     class="globalLoadingAnmClass"></van-loading>
        <!--订单状态背景-->
        <div class="orderContentStatusBg" v-if="firstDataStatusAnm===true">
            <div class="body"
                 style="background-image: url('../../assets/images/shoppingMall/order/orderStatusImgShiped.png')">
                <div class="info">
                    <p class="title" v-text="orderStatusText(orderContentData)"></p>
                    <!--<p class="text">还剩4天5小时自动收货</p>-->
                </div>
            </div>
            <!--<div class="right">-->
            <!--<div class="img">-->
            <!--<img src="../../../images/shoppingMall/order/orderStatusImgShiped.png" alt="">-->
            <!--</div>-->
            <!--</div>-->
        </div>
        <!--订单其他信息-->
        <div class="orderContentBg" v-if="firstDataStatusAnm===true">
            <!--物流（按订单状态显示）和收货地址-->
            <div class="publicOrderBg logistics">
                <!--物流部分-->
                <!--<div class="logisticsBox" @click="goToLogPage(orderContentData.orderId)">-->
                <!--&lt;!&ndash;左侧图标&ndash;&gt;-->
                <!--<div class="icon">-->
                <!--<van-icon name="logistics"></van-icon>-->
                <!--</div>-->
                <!--&lt;!&ndash;物流信息部分&ndash;&gt;-->
                <!--<div class="info">-->
                <!--<p class="top">已签收，感谢使用顺丰，期待再次为您服务</p>-->
                <!--<p class="bottom">2018-3-20 17:50:00</p>-->
                <!--</div>-->
                <!--</div>-->
                <!--收货地址部分-->
                <div class="addressBox">
                    <!--图标-->
                    <div class="icon">
                        <van-icon name="location"></van-icon>
                    </div>
                    <!--信息-->
                    <div class="info">
                        <!--电话和联系人-->
                        <div class="contact">
                            <p class="user">联系人:{{orderContentData.customer_firstname}}</p>
                            <p class="phone">{{orderContentData.customer_telephone}}</p>
                        </div>
                        <p class="address">
                            收货地址:{{orderContentData.customer_address_state+orderContentData.customer_address_city+orderContentData.customer_address_district+orderContentData.customer_address_street1}}</p>
                    </div>
                </div>
            </div>
            <!--购买的商品详情-->
            <div class="orderListBox" v-if="firstDataStatusAnm===true">
                <div class="orderListStyle">
                    <!--订单头部信息-->
                    <div class="header">
                        <div class="left">
                            <van-icon name="shop" style="margin-right: 4px"></van-icon>
                            {{orderContentData.shop_name}}
                            <!--<van-icon name="arrow" style="margin-left: 4px"></van-icon>-->
                        </div>
                        <div class="right" v-text="orderStatusText(orderContentData.order_status)"></div>
                    </div>
                    <!--订单商品列表-->
                    <ul class="list">
                        <li v-for="item in orderContentData.products">
                            <div class="orderListGoodsStyle">
                                <!--左侧图片部分-->
                                <div class="img">
                                    <img :src="item.imgUrl" alt="">
                                </div>
                                <!--右侧商品信息部分-->
                                <div class="info">
                                    <div class="top">
                                        <p class="title">{{item.name}}</p>
                                        <p class="realPrice">￥{{item.price}}
                                            <!--<br v-if="item.zkInfo.zk===true"/>-->
                                            <!--<span v-if="item.zkInfo.zk===true" v-text="getOldPriceFn(item)"></span>-->
                                        </p>
                                    </div>
                                    <div class="bottom">
                                        <!--<p class="gg">{{item.ggName}}</p>-->
                                        <p class="num">x{{item.qty}}</p>
                                    </div>
                                </div>
                                <!--退款按钮-->
                                <!--<div class="refundButtonLine">-->
                                <!--<p class="refund" v-if="orderContentData.status!=='collected'"-->
                                <!--@click="goToRefundApplyFn(orderContentData)">退款</p>-->
                                <!--<p class="afterSale" v-if="orderContentData.status=='collected'">申请售后</p>-->
                                <!--</div>-->
                            </div>
                        </li>
                    </ul>
                    <!--总计部分-->
                    <div class="orderTotalBox">
                        <div class="body">
                            <!--<span>共<b>{{orderContentData.products.length}}</b>件商品</span>-->
                            <p>
                                <span>运费</span><span class="price">￥{{orderContentData.shipping_total}}</span></p>
                            <p>
                                <span>合计</span><span class="price">￥{{orderContentData.grand_total}}</span>
                            </p>
                        </div>
                    </div>
                    <!--根据不同订单显示不同按钮部分-->
                    <!--<div class="orderButtonBox">-->
                    <!--<span class="del" v-if="orderContentData.status==='collected'">删除订单</span>-->
                    <!--<span class="cancel" v-if="orderContentData.status==='ordered'">取消订单</span>-->
                    <!--<span class="pay" v-if="orderContentData.status==='ordered'">去付款</span>-->
                    <!--<span class="confirmGet" v-if="orderContentData.status==='shiped'">确认收货</span>-->
                    <!--<span class="checkShip" v-if="orderContentData.status==='paid'||orderContentData.status==='shiped'">查看物流</span>-->
                    <!--<span class="evaluate" v-if="orderContentData.status==='collected'">去评价</span>-->
                    <!--</div>-->
                </div>
            </div>
            <!--订单编号支付编号等信息-->
            <div class="publicOrderBg numInfo" v-if="firstDataStatusAnm===true">
                <ul class="orderNumInfo">
                    <li>订单编号：{{orderContentData.pack_sn}}</li>
                    <!--<li>交易号:2018071921001001480537196714</li>-->
                    <li>创建时间：{{orderContentData.created_at}}</li>
                    <!--<li>付款时间:2018-07-19 22:06:59</li>-->
                    <!--<li>发货时间:2018-07-20 11:50:05</li>-->
                    <!--<li>成交时间:2018-07-23 19:31:33</li>-->
                    <li>支付方式：{{returnPaymentMethod(orderContentData.payment_method)}}</li>
                </ul>
            </div>
        </div>
        <!--底部固定的按钮-->
        <div class="fixedBottomLine"
             v-if="firstDataStatusAnm===true&&orderContentData.order_status!='canceled'&&orderContentData.order_status!='payment_canceled'&&orderContentData.order_status!='completed'">
        <!--<div class="fixedBottomLine">-->
            <!--<span class="del" v-if="orderContentData.order_status==='completed'">删除订单</span>-->
            <span class="cancel" v-if="orderContentData.order_status==='payment_pending'"
                  @click="cancelOrderFn(orderContentData)">取消订单</span>
            <span class="pay" v-if="orderContentData.order_status==='payment_pending'"
                  @click="goPayFn(orderContentData)">去付款</span>
            <span class="confirmGet" v-if="orderContentData.order_status==='dispatched'" @click="getConfirm(orderContentData)">确认收货</span>
            <!--<span class="checkShip" v-if="orderContentData.order_status==='dispatched'">查看物流</span>-->
            <!--<span class="evaluate" @click="goToEva(orderContentData)">去评价</span>-->
            <span class="evaluate" v-if="orderContentData.order_status==='review_pending'" @click="goToEva(orderContentData)">去评价</span>
        </div>
    </div>
</template>

<script>
    //引入公共方法和变量
    // import tabbarStatus from "../assets/js/toClientFn/tabbarStatus"
    export default {
        name: 'orderList',
        data() {
            return {
                //本地的商品列表下拉加载数据
                //本地的商品列表下拉加载数据
                orderContentData: "",
                //     {
                //     orderId:"2451554712454",
                //     shopInfo:{
                //         id:1,
                //         name:"哦牛批店铺"
                //     },
                //     total:1202355,
                //     yf:105,
                //     goodsList:[
                //         {
                //             id: 1,
                //             title: "哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品",
                //             price: 10520,
                //             imgUrl: require("../../assets/images/shoppingMall/cart/goodImg.png"),
                //             ggName:"规格:哦牛批规格",
                //             zkInfo:{
                //                 zk:false,
                //                 zkPro:0.2
                //             },
                //             num:2
                //         }
                //     ],
                //     status:"ordered"
                // },
                //     {
                //         //创建时间
                //         "created_at": "2018-09-14 13:51:18",
                //         //更新时间
                //         "updated_at": "2018-09-14 13:51:18",
                //         //订单编号
                //         "increment_id": "1100000040",
                //         //订单id
                //         "order_id": 40,
                //         //订单状态
                //         "order_status": "payment_confirmed",
                //         //订单商品总计(包括同商品数量)
                //         "items_count": 1,
                //         //商品重量总计
                //         "total_weight": "0.20",
                //         //订单总价（包含邮费）
                //         "subtotal": "128.40",
                //         "checkout_method": "standard",
                //         //userId
                //         "customer_id": 1,
                //         "customer_group": null,
                //         //userName
                //         "customer_firstname": "222",
                //         "customer_lastname": "张",
                //         //支付方式
                //         "payment_method": "check_money",
                //         //配送方式
                //         "shipping_method": "middle_shipping",
                //         "tracking_number": null,
                //         //邮费总计
                //         "shipping_total": "0.10",
                //         "base_shipping_total": null,
                //         //联系人电话
                //         "customer_telephone": "1",
                //         "customer_address_country": "0",
                //         "customer_address_state": "山东省",
                //         "customer_address_city": "济南市",
                //         "customer_address_district": "",
                //         "customer_address_street1": "三元桥ssss",
                //         "customer_address_street2": "",
                //         "products": [
                //             {
                //                 "imgUrl": "//img.tobebetterman.com/media/catalog/20161024170457_10036.jpg",
                //                 "name": "Ñ±Â¹ÑùÊ½ÉÁË¸Ê¥µ®½ÚÀñ·þ",
                //                 "sku": "22221",
                //                 "qty": "1",
                //                 "row_total": null,
                //                 "product_id": "581ae91ff656f20f052f0b77",
                //                 "custom_option_info": {
                //                     "My color": "red",
                //                     "My size": "S"
                //                 }
                //             }
                //         ]
                //     },
                //第一次数据请求是否完成
                firstDataStatusAnm: false
            }
        },
        methods: {
            //确认收货的方法
            getConfirm(order){
                this.$dialog.confirm({
                    title:"收货确认",
                    message:"是否要确认收货?"
                })
                    .then(()=>{
                        //确认，走接口
                        this.tools.globalFn.publicAxiosFn(this,{
                            needLogin:true,
                            url:"/customer/order/confirm",
                            data:{
                                order_sn:order.pack_sn,
                                module_type:1
                            },
                            success:(res)=>{
                                if(res.data.code===200){
                                    this.tools.globalFn.publicToastFn(this,"确认成功");
                                    this.firstDataStatusAnm=false;
                                    //直接初始化data
                                    this.getFirstData();
                                }
                            }
                        })
                    });
            },
            //去评价的方法
            goToEva(orderContentData){
                console.log(orderContentData);
                this.$router.push({name:"publishRating",params:{id:orderContentData.pack_id}});
            },
            //返回支付方式的方法
            returnPaymentMethod(val) {
                switch (val) {
                    case "alipay_standard":
                        return "支付宝";
                }
            },
            //支付订单的方法
            goPayFn(order) {
                // order.increment_id
                //跳转支付
                this.$bridge.callHandler("confirmOrderFn", order.increment_id, (res) => {
                    //存储接下来要跳的订单type
                    // localStorage.orderListType="0";
                    if (res === "true") {
                        //跳转订单页面
                        // alert("结算成功，跳转订单页面");
                        this.$router.replace({name: "orderList"});
                    } else if (res === "false") {
                        // alert("结算失败，跳转订单页面");
                        // this.$router.replace({name:"orderList"});
                    }
                });
            },
            //取消订单的方法
            cancelOrderFn(order) {
                console.log(order);
                //弹窗是否确认
                this.$dialog.confirm({
                    title: '取消确认',
                    message: '是否要取消订单?'
                }).then(() => {
                    //请求删除
                    console.log("请求取消订单");
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin: true,
                        url: "/customer/order/cancel",
                        method: "POST",
                        data: {
                            order_sn: order.pack_sn,
                            module_type: 1,
                            is_pack: 1
                        },
                        success: (res) => {
                            if (res.data.code === 200) {
                                this.tools.globalFn.publicToastFn(this, "取消成功");
                                //直接返回上一页
                                this.$router.go(-1);
                            }
                        },
                        fail: (err) => {
                            console.log(err);
                        }
                    })
                }).catch(() => {
                    // on cancel
                    console.log("关闭");
                });
            },
            //进入退款申请
            goToRefundApplyFn(orderData) {
                //
                this.$router.push({name: "refundType"});
            },
            //查看物流的方法
            goToLogPage(id) {
                this.$router.push("/checkLog/" + id);
            },
            //拿原价的方法
            getOldPriceFn: function (item) {
                console.log("打印原价");
                console.log(item);
                return "￥" + (item.price * item.zkInfo.zkPro / 100).toFixed(2);
            },
            //返回改订单文字状态的方法
            orderStatusText(order) {
                console.log(order);
                switch (order.order_status) {
                    case "payment_pending":
                        return "等待付款";
                    case "payment_processing":
                        return "付款处理中";
                    case "payment_confirmed":
                        return "收款成功";
                    case "payment_canceled":
                        return "订单支付已取消";
                    case "holded":
                        return "订单审核中";
                    case "processing":
                        return "等待卖家发货";
                    case "dispatched":
                        return "等待收货";
                    case "review_pending":
                        return "待评价";
                    case "completed":
                        return "已完成";
                    case "canceled":
                        return "已取消";
                    case "refunded":
                        return "已退款";
                }
            },
            //返回上一页的方法
            backLastPage() {
                this.$router.go(-1);
            },
            //拿到订单号查询的方法
            getFirstData() {
                console.log(this.$route.params.id);
                //查询订单
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin: true,
                        url: "/customer/order/view",
                        method: "GET",
                        params: {
                            order_id: this.$route.params.id,
                            module_type: 1,
                            is_pack: 1
                        },
                        success: (res) => {
                            console.log(res);
                            if (res.data.code === 200) {
                                this.orderContentData = res.data.data.order;
                                this.firstDataStatusAnm = true;
                                // console.log(this.firstDataStatusAnm);
                            }
                        },
                        fail: (err) => {
                            console.log(err)
                        }
                    }
                );

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

    /*商品合计部分*/
    .orderTotalBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #f3f3f3;
    }

    .orderTotalBox > div.body {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: right;
        padding: 10px 10px;

    }

    .orderTotalBox > div.body > p {
        color: #051b28;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        margin-top: 4px;
    }

    .orderTotalBox > div.body > p:first-child {
        margin-top: 0;
    }

    .orderTotalBox > div.body > p > span.price {
        color: #ff7b11;
    }

    .orderTotalBox > div.body > p > span:first-child {
        color: #999;
    }

    /*按钮部分*/
    .orderButtonBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 6px 10px;
    }

    .orderButtonBox > span {
        display: inline-block;
        color: #9b9b9b;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid #9b9b9b;
        padding: 2px 4px;
        float: right;
        margin-left: 4px;
    }

    .orderButtonBox > span.del {
        float: left !important;
    }

    .orderButtonBox > span.confirmGet {
        border-color: #30aaff;
        color: #30aaff;
    }

    /*.orderButtonBox>span.evaluate{*/
    /*border-color: #30aaff;*/
    /*color: #30aaff;*/
    /*}*/
    /*订单状态背景*/
    .orderContentStatusBg {
        width: 100%;
        height: auto;
        padding: 10px 0;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: linear-gradient(to right, #30aaff, #2BD0FE);
        margin-bottom: 10px;
        position: relative;
        min-height: 50px;
    }

    .orderContentStatusBg > div.body {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 96% center;
        background-size: auto 90%;

    }

    .orderContentStatusBg > div.body > div.info {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        /*align-items:center;*/
        flex-direction: column;
        margin-left: 20px;
    }

    .orderContentStatusBg > div.body p.title {
        color: #fff;
        font-size: 14px;
    }

    .orderContentStatusBg > div.body p.text {
        color: #fff;
        font-size: 12px;
    }

    /*公共的版块盒子*/
    .publicOrderBg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
    }

    .publicOrderBg.logistics {
        margin-bottom: 10px;
    }

    .logisticsBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
    }

    .logisticsBox > div.icon {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 6%;
    }

    .logisticsBox > div.icon .van-icon {
        color: #ff7b11;
    }

    .logisticsBox > div.info {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-left: 6px;
        width: 94%;
    }

    .logisticsBox > div.info > p.top {
        font-size: 14px;
        color: #ff7b11;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 4px;
    }

    .logisticsBox > div.info > p.bottom {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #a6a5a5;
        font-size: 14px;
    }

    /*收货地址*/
    .addressBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
    }

    .addressBox > div.icon {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 6%;
    }

    .addressBox > div.icon .van-icon {
        color: #666666;
    }

    .addressBox > div.info {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-left: 6px;
        width: 94%;
    }

    .addressBox > div.info > div.contact {
        display: flex;
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .addressBox > div.info > div.contact p.user {
        color: #666;
        font-size: 14px;

    }

    .addressBox > div.info > div.contact p.phone {
        color: #666;
        font-size: 14px;
    }

    .addressBox > div.info > p.address {
        color: #666;
        font-size: 14px;
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .orderNumInfo {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
    }

    .orderNumInfo > li {
        color: #999;
        font-size: 12px;
        margin-top: 4px;
    }

    .orderNumInfo > li:first-child {
        margin-top: 0;
    }

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

    /*退款按钮*/
    .refundButtonLine {
        clear: both;
        padding: 10px 0;
        width: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
    }

    .refundButtonLine > p {
        border-radius: 2px;
    }

    .refundButtonLine > p.refund {
        padding: 4px 14px;
        border: 1px solid #888;
        font-size: 12px;
        color: #888;
    }

    .refundButtonLine > p.afterSale {
        padding: 4px 6px;
        border: 1px solid #ff7b11;
        font-size: 12px;
        color: #ff7b11;
        margin-left: 10px;
    }

    .orderContentBg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 59px;
    }
</style>
