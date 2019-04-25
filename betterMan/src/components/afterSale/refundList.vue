<template>
    <div class="publicAllContentBg" id="refundList">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="退款/售后"
                     left-arrow
                     left-text="返回"
                     @click-left="backLastPage"
                     fixed
        >
<!--            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>-->
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
        </van-nav-bar>
        <!--列表-->
        <div class="orderListBox">
            <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===true"
                         class="globalLoadingAnmClass"></van-loading>
            <van-list :offset="stuffListData.offset" v-model="stuffListData.loading" :finished="stuffListData.finished"
                      @load="orderListOnload"
                      :immediate-check="stuffListData.immediateCheck"
                      v-if="firstDataStatusAnm===false"
            >
                <ul class="list">
                    <li v-for="order in stuffListData.list">
                        <div class="orderListStyle">
                            <!--订单头部信息-->
                            <div class="header">
                                <div class="left"><van-icon name="shop" style="margin-right: 4px"></van-icon>{{order.shopInfo.name}}<van-icon name="arrow" style="margin-left: 4px"></van-icon></div>
                            </div>
                            <!--订单商品列表-->
                            <ul class="list">
                                <li v-for="item in order.goodsList">
                                    <div class="orderListGoodsStyle" @click="goToRefundContent(item.id)">
                                        <!--左侧图片部分-->
                                        <div class="img">
                                            <img :src="item.imgUrl" alt="">
                                        </div>
                                        <!--右侧商品信息部分-->
                                        <div class="info">
                                            <div class="top">
                                                <p class="title">{{item.title}}</p>
                                            </div>
                                            <div class="bottom">
                                                <p class="gg">{{item.ggName}}</p>
                                                <p class="num">x{{item.num}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <!--退款状态-->
                            <div class="refundStatusBox">
                                <!--仅退款-->
                                <p class="onlyMoney" v-if="order.refundType===1">
                                    <van-icon name="afterSale" style="color: #38adff;margin-right: 4px"></van-icon>仅退款
                                </p>
                                <!--退货退款-->
                                <p class="moneyAndGood" v-if="order.refundType===2">
                                    <van-icon name="refundAndGoods" style="color: #38adff;margin-right: 4px"></van-icon>退货退款
                                </p>
                                <!--处理状态-->
                                <p class="status" v-text="orderStatusReturnFn(order.refundStatus)">处理成功</p>
                            </div>
                            <!--按钮行-->
                            <div class="buttonLine">
                                <p class="button">查看详情</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'refundList',
        data() {
            return {
                //本地的商品列表下拉加载数据
                stuffListData: {
                    //存储列表数据
                    list: [
                        {
                            orderId:"2451554712454",
                            shopInfo:{
                                id:1,
                                name:"哦牛批店铺"
                            },
                            total:1202355,
                            yf:105,
                            //当前订单是仅退款还是
                            refundType:1,
                            //当前处理状态
                            refundStatus:1,
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
                        {
                            orderId:"2451554712454",
                            shopInfo:{
                                id:1,
                                name:"哦牛批店铺"
                            },
                            total:1202355,
                            yf:105,
                            //当前订单是仅退款还是
                            refundType:2,
                            //当前处理状态
                            refundStatus:1,
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
                        }
                    ],
                    //是否显示加载中
                    loading: false,
                    //是否已经全部加载完成
                    finished: false,
                    //第一次进入是否加载一次
                    immediateCheck: false,
                    //多少是offset
                    offset: 300,
                    //总页数
                    totalPage:0,
                    //当前页数
                    current:1,
                    //总条数
                    totalCount:0,
                    //每页条数
                    pageSize:5,
                },
                //第一次数据请求是否完成
                firstDataStatusAnm: false
            }
        },
        methods: {
            //跳转退款详情
            goToRefundContent(id){
                this.$router.push({name:"refundListContent",params:{id:id}});
            },

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
            orderListOnload () {
                console.log("加载更多");
            },
            //切换顶部tab的方法
            changeTopTab(index, title) {
                console.log(index);
                console.log(title);
            },
            //返回上一页的方法
            backLastPage() {
                this.$router.go(-1);
            },
            //到底部加载新数据的方法
            goodsListOnload () {
                console.log("加载更多");
            },
            //初始化数据
            getFirstData(){
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/paymutual/refund/refund-list",
                    method:"GET",
                    needLogin:true,
                    params:{
                        module_type:1,
                        p:this.stuffListData.current,
                        numPerPage:this.stuffListData.pageSize
                    },
                    success:(res)=>{
                        console.log(res);
                    }
                });
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
    }
    .orderListBox>.van-list>ul.list{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .orderListBox>.van-list>ul.list>li{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
        /*border-top: 1px solid #e3e3e3;*/
    }
    .orderListBox>ul.list>li:first-child{
        margin-top: 0;
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
    /*退款状态*/
    .refundStatusBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding:10px;
        border-bottom: 1px solid #f3f3f3;
    }
    .refundStatusBox>p.status{
        color: #666;
        font-size: 14px;
        margin-left: 6px;
    }
    .refundStatusBox>p.onlyMoney{
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #666;
        font-size: 14px;
    }
    .refundStatusBox>p.moneyAndGood{
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #666;
        font-size: 14px;
    }
    .buttonLine{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
    }
    .buttonLine>p.button{
        color: #30aaff;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid #30aaff;
        padding: 4px 6px;
        float: right;
    }
</style>
