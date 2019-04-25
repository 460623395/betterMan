<template>
    <div class="publicAllContentBg" id="orderList">
        <!--头部导航-->
        <van-nav-bar style="z-index: 9999;"
                     class="globalNavBarHeaderClass"
                     title="我的订单"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     fixed
        >
            <!--<van-icon name="arrow-left" slot="left" style="color: #fafafa" @click="backLastPage"></van-icon>-->
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--顶部筛选-->
        <van-tabs v-model="topTabBarData.active" @change="changeTopTab" :swipe-threshold="5">
            <van-tab v-for="item in topTabBarData.list" :title="item.title" :key="item.id">
            </van-tab>
        </van-tabs>
        <!--列表-->
        <div class="orderListBox">
            <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===false"
                         class="globalLoadingAnmClass"></van-loading>
            <!--无数据时显示的-->
            <p class="noOrderListDataTitle" v-if="firstDataStatusAnm===true&&orderListData.list.length===0">暂无数据</p>
            <van-list :offset="orderListData.offset" v-model="orderListData.loading" :finished="orderListData.finished"
                      @load="orderListOnload"
                      :immediate-check="orderListData.immediateCheck"
                      v-if="firstDataStatusAnm===true&&orderListData.list.length>0"
            >
                <ul class="list">
                    <li v-for="order in orderListData.list" :key="order.order_id">
                        <div class="orderListStyle">
                            <!--订单头部信息-->
                            <div class="header">
                                <div class="left"><van-icon name="shop" style="margin-right: 4px"></van-icon>{{order.shop_name}}<van-icon name="arrow" style="margin-left: 4px"></van-icon></div>
                                <div class="right" v-text="orderStatusText(order)"></div>
                            </div>
                            <!--订单商品列表-->
                            <ul class="list" @click="goToOrderContentFn(order)">
                                <li v-for="item in order.products" :key="item.id">
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
                                                    <!--折扣-->
                                                    <!--<br v-if="item.zkInfo.zk===true"/><span v-if="item.zkInfo.zk===true" v-text="getOldPriceFn(item)"></span>-->
                                                </p>
                                            </div>
                                            <div class="bottom">
                                                <!--<p class="gg">{{item.ggName}}</p>-->
                                                <p class="num">x{{item.qty}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <!--总计部分-->
                            <div class="orderTotalBox">
                                <div class="body">
                                    <span>共<b>{{order.products.length}}</b>件商品</span>
                                    <!--<span>合计:￥<b>{{(order.total/100).toFixed(2)}}</b></span>-->
                                    <!--<span>(含运费￥<b>{{(order.yf/100).toFixed(2)}}</b>)</span>-->
                                    <span>合计:￥<b>{{order.grand_total}}</b></span>
                                    <span>(含运费￥<b>{{order.shipping_total}}</b>)</span>
                                </div>
                            </div>
                            <!--根据不同订单显示不同按钮部分-->
                            <div class="orderButtonBox">
                                <!--<span class="del" v-if="order.order_status==='completed'">删除订单</span>-->
                                <span class="cancel" v-if="order.order_status==='payment_pending'" @click="cancelOrderFn(order)">取消订单</span>
                                <span class="pay" v-if="order.order_status==='payment_pending'" @click="goPayFn(order)">去付款</span>
                                <span class="confirmGet" v-if="order.order_status==='dispatched'" @click="getConfirm(order)">确认收货</span>
                                <span class="checkShip" v-if="order.order_status==='dispatched'">查看物流</span>
                                <span class="evaluate" v-if="order.order_status==='review_pending'" @click="goToEva(order)">去评价</span>
                                <span class="check" @click="goToOrderContentFn(order)">查看详情</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
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
                orderListData: {
                    //存储列表数据
                    list: [
                        // {
                        //     //订单创建时间
                        //     "created_at": "2018-09-14 15:08:05",
                        //     "updated_at": "2018-09-14 15:08:05",
                        //     //订单编号
                        //     "increment_id": "1100000041",
                        //     //订单id
                        //     "order_id": "41",
                        //     //订单状态
                        //     "order_status": "payment_pending",
                        //     //订单商品数量总计(包括单商品)
                        //     "items_count": "4",
                        //     //重量总计
                        //     "total_weight": "66.40",
                        //     //订单总计
                        //     "subtotal": "2023.06",
                        //     "checkout_method": "standard",
                        //     //下单用户id
                        //     "customer_id": "5",
                        //     "customer_group": null,
                        //     //下单用户名
                        //     "customer_firstname": "哦牛批",
                        //     "customer_lastname": "",
                        //     //支付方式
                        //     "payment_method": "alipay_standard",
                        //     //配送方式
                        //     "shipping_method": "free_shipping",
                        //     "tracking_number": null,
                        //     //运费总计
                        //     "shipping_total": "0.00",
                        //     "base_shipping_total": null,
                        //     //下单用户电话
                        //     "customer_telephone": "123",
                        //     "customer_address_country": "0",
                        //     "customer_address_state": "山西",
                        //     "customer_address_city": "大同",
                        //     "customer_address_district": "",
                        //     "customer_address_street1": "哈哈哈",
                        //     "customer_address_street2": null,
                        //     "products": [
                        //         {
                        //             "imgUrl": "//img.tobebetterman.com/media/catalog/product/cache/bd935443df1c50537d4edaab4af5d446/100/100/2/01/20160715121751_13739.jpg",
                        //             "name": "ÃÔÄã³¤Ðä¿ªñÃ",
                        //             "sku": "sk1000-khak",
                        //             "qty": "2",
                        //             "row_total": null,
                        //             "product_id": "57cfc212f656f28b5adf9deb",
                        //             "custom_option_info": {
                        //                 "color": "khaki"
                        //             }
                        //         },
                        //         {
                        //             "imgUrl": "//img.tobebetterman.com/media/catalog/product/cache/bd935443df1c50537d4edaab4af5d446/100/100/r/nu/rnunew1467608090223.jpg",
                        //             "name": "ÕýÊ½µÄÍíÀñ·þ»¤Ì×",
                        //             "sku": "po0001",
                        //             "qty": "2",
                        //             "row_total": null,
                        //             "product_id": "57e8d9a7f656f2e16b6234e5",
                        //             "custom_option_info": {
                        //                 "color": "white",
                        //                 "size": "M"
                        //             }
                        //         }
                        //     ]
                        // },
                        // {
                        //     orderId: "2451554712454",
                        //     shopInfo: {
                        //         id: 1,
                        //         name: "哦牛批店铺"
                        //     },
                        //     total: 1202355,
                        //     yf: 105,
                        //     goodsList: [
                        //         {
                        //             id: 1,
                        //             title: "哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品",
                        //             price: 10520,
                        //             imgUrl: require("../../assets/images/shoppingMall/cart/goodImg.png"),
                        //             ggName: "规格:哦牛批规格",
                        //             zkInfo: {
                        //                 zk: false,
                        //                 zkPro: 0.2
                        //             },
                        //             num: 2
                        //         }
                        //     ],
                        //     status: "ordered"
                        // }
                    ],
                    //当前页码
                    current:0,
                    //是否显示加载中
                    loading: false,
                    //是否已经全部加载完成
                    finished: false,
                    //第一次进入是否加载一次
                    immediateCheck: false,
                    //多少是offset
                    offset: 300,
                    //当前总页数
                    totalPage:0,
                    //每页条数
                    numPerPage:10,
                    //总个数
                    totalCount:0
                },
                //第一次数据请求是否完成
                firstDataStatusAnm: false,
                //顶部tab栏数据
                topTabBarData: {
                    active: "",
                    list: [
                        {
                            id: 0,
                            title: "全部"
                        },
                        {
                            id: 1,
                            title: "待付款"
                        },
                        {
                            id: 2,
                            title: "待发货"
                        },
                        {
                            id: 3,
                            title: "待收货"
                        },
                        {
                            id: 4,
                            title: "待评价"
                        },
                        {
                            id: 5,
                            title: "已取消"
                        }
                    ]
                }
            }
        },
        methods: {
            //去评价的方法
            goToEva(order){
                console.log(order);
                this.$router.push({name:"publishRating",params:{id:order.pack_id}});
            },
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
            //支付订单的方法
            goPayFn(order){
                console.log(order);
                // order.increment_id
                //跳转支付
                this.$bridge.callHandler("confirmOrderFn",order.pack_sn,(res)=>{
                    //存储接下来要跳的订单type
                    // localStorage.orderListType="0";
                    if(res==="true"){
                        //跳转订单页面
                        // alert("结算成功，跳转订单页面");
                        this.$router.replace({name:"orderList"});
                    }
                    else{
                        // alert("结算失败，跳转订单页面");
                        this.$router.replace({name:"orderList"});
                    }
                });
            },
            //取消订单的方法
            cancelOrderFn(order){
                console.log(order);
                //弹窗是否确认
                this.$dialog.confirm({
                    title: '取消确认',
                    message: '是否要取消订单?'
                }).then(() => {
                    //请求删除
                    console.log("请求取消订单");
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin:true,
                        url:"/customer/order/cancel",
                        method:"POST",
                        data:{
                            order_sn:order.pack_sn,
                            module_type:1,
                            is_pack:1
                        },
                        success:(res)=>{
                            if(res.data.code===200){
                                this.tools.globalFn.publicToastFn(this,"取消成功");
                                this.firstDataStatusAnm=false;
                                //直接初始化data
                                this.getFirstData();
                            }
                        }
                    })
                }).catch(() => {
                    // on cancel
                    console.log("关闭");
                });
            },
            //跳转商品详情的方法
            goToOrderContentFn(order){
                console.log(order);
                this.$router.push("/userCenter/orderList/"+order.pack_id);
            },
            //拿原价的方法
            getOldPriceFn(item){
                console.log("打印原价");
                console.log(item);
                return "￥" + (item.price * item.zkInfo.zkPro / 100).toFixed(2);
            },
            //返回改订单文字状态的方法
            orderStatusText (order) {
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
            //到底部加载新数据的方法
            orderListOnload () {
                console.log("加载更多");
                //拿到当前选择查询的类型
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin:true,
                        url:"/customer/order/index",
                        method:"GET",
                        params:{
                            p:this.orderListData.current+1,
                            order_status:this.returnSearchOrderStatusFn(this.topTabBarData.active+""),
                            numPerPage:this.orderListData.numPerPage,
                            module_type:1
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //计算总页数放到本地
                                this.orderListData.totalPage=this.tools.globalFn.totalPageCountFn(res.data.data.numPerPage,res.data.data.count);
                                this.orderListData.list=this.orderListData.list.concat(res.data.data.orderList);
                                this.orderListData.current=res.data.data.p;
                                this.orderListData.loading=false;
                                // this.firstDataStatusAnm=true;
                                //判断是否已经到底，如果到底，改变下拉加载状态
                                if(this.isLastPageFn()===true){
                                    this.orderListData.finished=true;
                                }
                                console.log("打印所有数组");
                                console.log(this.orderListData.list);
                            }
                        },
                        fail:(err)=>{
                            console.log(err);
                        }
                    }
                )
            },
            //切换顶部tab的方法
            changeTopTab (index, title) {
                //如果之前已经把下拉加载关闭，这里需要再次开启
                this.orderListData.finished=false;
                //清空数组
                this.orderListData.list=[];
                this.publicLocalStorageOrderStatusFn(index);
                //开始加载动画
                this.firstDataStatusAnm=false;
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin:true,
                        url:"/customer/order/index",
                        method:"GET",
                        params:{
                            p:1,
                            order_status:this.returnSearchOrderStatusFn(index+""),
                            numPerPage:this.orderListData.numPerPage,
                            module_type:1
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.publicOrderListEachFn(res);
                            }
                        }
                    }
                )

            },
            //判断当前页数是否等于总页数的方法
            isLastPageFn(){
                console.log("总页数为"+this.orderListData.totalPage);
                console.log("当前页为"+this.orderListData.current);
                if(this.orderListData.totalPage===this.orderListData.current){
                    console.log("当前页数已经是最后一页");
                    return true;
                }
                else{
                    return false;
                }
            },
            //返回上一页的方法
            backLastPage () {
                this.$router.go(-1);
            },
            //返回查询的方法
            returnSearchOrderStatusFn(type){
                // let searchStatus="";
                switch (type) {
                    case "0":
                        //全部
                        return "all";
                    case "1":
                        //待支付
                        return "payment_pending";
                    case "2":
                        //已支付(待发货)
                        return "processing";
                    case "3":
                        //待收货
                        return "dispatched";
                    case "4":
                        //待评价(已经确认收货完成)
                        return "review_pending";
                    case "5":
                        //已取消
                        return "canceled";
                }
                // if(type==="0"){
                //     searchStatus=""
                // }
                // else if(type==="1"){
                //     searchStatus="payment_pending";
                // }
                // else if(type==="2"){
                //     searchStatus="payment_confirmed";
                // }
                // else if(type==="3"){
                //     searchStatus="dispatched";
                // }
                // else if(type==="4"){
                //     searchStatus="canceled";
                // }
                // return searchStatus;
            },
            //公共的处理localstorage的orderStatus方法
            publicLocalStorageOrderStatusFn(index){
                switch (index) {
                    case 0:
                        //全部
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","0","edit");
                        break;
                    case 1:
                        //待支付
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","1","edit");
                        break;
                    case 2:
                        //待发货
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","2","edit");
                        break;
                    case 3:
                        //待收货
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","3","edit");
                        break;
                    case 4:
                        //待评价(买家确认收货)
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","4","edit");
                        break;
                    case 5:
                        //已取消
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","5","edit");
                        break;
                }
            },
            //公共的处理不同状态下的第一次加载数据的方法(下拉刷新不适用)
            publicOrderListEachFn(res){
                console.log(res);
                //计算总页数放到本地
                this.orderListData.totalPage=this.tools.globalFn.totalPageCountFn(res.data.data.numPerPage,res.data.data.count);
                console.log(this.tools.globalFn.totalPageCountFn(res.data.data.numPerPage,res.data.data.count));
                console.log("总页数为");
                console.log(this.orderListData.totalPage);
                console.log(res);
                this.orderListData.list=res.data.data.orderList;
                this.orderListData.current=1;
                //判断是否已经到底，如果到底，改变下拉加载状态
                if(this.isLastPageFn()===true){
                    this.orderListData.loading=false;
                    this.orderListData.finished=true;
                }
                //关闭动画
                this.firstDataStatusAnm=true;
            },
            //第一次加载数据的方法
            getFirstData(){
                let typeNum=JSON.parse(localStorage.shopSaveObject).orderListTypeByOuterShop;
                switch (typeNum) {
                    case "0":
                        //全部
                        this.topTabBarData.active=0;
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","0","edit");
                        break;
                    case "1":
                        //待支付
                        this.topTabBarData.active=1;
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","1","edit");
                        break;
                    case "2":
                        //待发货
                        this.topTabBarData.active=2;
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","2","edit");
                        break;
                    case "3":
                        //待收货
                        this.topTabBarData.active=3;
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","3","edit");
                        break;
                    case "4":
                        //已完成
                        this.topTabBarData.active=4;
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","4","edit");
                        break;
                    case "5":
                        //已完成
                        this.topTabBarData.active=5;
                        this.tools.globalFn.publicChangeLocalStorageFn("orderListTypeByOuterShop","5","edit");
                        break;
                }
                //请求
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin:true,
                        url:"/customer/order/index",
                        method:"GET",
                        params:{
                            p:1,
                            order_status:this.returnSearchOrderStatusFn(JSON.parse(localStorage.shopSaveObject).orderListTypeByOuterShop),
                            numPerPage:this.orderListData.numPerPage,
                            module_type:1
                        },
                        success:(res)=>{
                            if(res.data.code===200){
                                this.publicOrderListEachFn(res);
                            }
                        }
                    }
                )
            },
        },
        created() {
            //拿到路由传值根据订单状态类型查询不同列表
            this.getFirstData();
        },
        mounted() {

        },
        watch: {},
        beforeRouteEnter(to,from,next){
            if(from.name==="userCenter"){
                //如果来自个人中心，需要重载数据
                to.meta.useOldData=true;
            }
            else if(from.name==="orderListContent"){
                //如果来自订单详情，不需要重载数据
                to.meta.useOldData=false;
            }
            next();
        },
        activated(){
            if(this.$route.meta.useOldData===true){
                this.getFirstData();
            }
            this.$route.meta.useOldData=false;
        },
        deactivated(){

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .noOrderListDataTitle{
        width: 100%;
        text-align: center;
        color: #999;
        font-size: 14px;
        margin-top: 10px;
    }
    .orderListBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
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

    .orderTotalBox > div.body > span {
        display: inline-block;
        color: #051b28;
        font-size: 14px;
    }

    /*按钮部分*/
    .orderButtonBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 10px;
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

    .orderButtonBox > span.pay {
        border-color: #30aaff;
        color: #30aaff;
    }

    .orderButtonBox > span.evaluate {
        border-color: #30aaff;
        color: #30aaff;
    }
</style>
