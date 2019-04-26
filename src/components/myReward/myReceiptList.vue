<template>
    <div class="publicAllContentBg" id="myRewardList">
        <!--头部导航-->
        <van-nav-bar title="我接单的悬赏" class="globalNavBarHeaderClass"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     fixed
        >
            <!--<van-icon name="setting" slot="right" style="color: #fafafa" @click="goToShopMalloptions"></van-icon>-->
            <!--<van-icon name="setting" slot="right" class="globalNavBarIconClass"></van-icon>-->
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
            <p class="nomyRewardListDataTitle" v-if="firstDataStatusAnm===true&&myRewardListData.list.length===0">暂无数据</p>
            <van-list :offset="myRewardListData.offset" v-model="myRewardListData.loading" :finished="myRewardListData.finished"
                      @load="orderListOnload"
                      :immediate-check="myRewardListData.immediateCheck"
                      v-if="firstDataStatusAnm===true&&myRewardListData.list.length>0"
            >
                <ul class="list">
                    <li v-for="item in myRewardListData.list" :key="item.id">
                        <div class="orderListStyle">
                            <!--订单头部信息-->
                            <div class="header">
                                <div class="left">
                                    <span class="company" v-if="item.iscompany===1">企业悬赏</span>
                                    <span class="person" v-if="item.iscompany===0">个人悬赏</span>
                                </div>
                                <div class="right" v-text="orderStatusText(item)"></div>
                            </div>
                            <!--订单商品列表-->
                            <ul class="list" @click="goToTaskContentFn(item)">
                                <li>
                                    <div class="orderListGoodsStyle">
                                        <!--左侧图片部分-->
                                        <div class="img">
                                            <img :src="returnImgFn(item.imgs)" alt="">
                                        </div>
                                        <!--右侧商品信息部分-->
                                        <div class="info">
                                            <div class="top">
                                                <p class="title">{{item.title}}</p>
                                                <!--<p class="realPrice">￥{{(item.price/100).toFixed(2)}}-->
                                                <!--&lt;!&ndash;折扣&ndash;&gt;-->
                                                <!--&lt;!&ndash;<br v-if="item.zkInfo.zk===true"/><span v-if="item.zkInfo.zk===true" v-text="getOldPriceFn(item)"></span>&ndash;&gt;-->
                                                <!--</p>-->
                                            </div>
                                            <div class="bottom">
                                                <p class="gg">定金:￥{{(item.earnest_money/100).toFixed(2)}}</p>
                                                <p class="num">￥{{(item.price/100).toFixed(2)}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <!--总计部分-->
                            <!--<div class="orderTotalBox">-->
                            <!--<div class="body">-->
                            <!--&lt;!&ndash;<span>共<b>{{order.products.length}}</b>件商品</span>&ndash;&gt;-->
                            <!--&lt;!&ndash;<span>合计:￥<b>{{(order.total/100).toFixed(2)}}</b></span>&ndash;&gt;-->
                            <!--&lt;!&ndash;<span>(含运费￥<b>{{(order.yf/100).toFixed(2)}}</b>)</span>&ndash;&gt;-->
                            <!--<span>合计:￥<b>{{order.subtotal}}</b></span>-->
                            <!--&lt;!&ndash;<span>(含运费￥<b>{{order.shipping_total}}</b>)</span>&ndash;&gt;-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--根据不同订单显示不同按钮部分-->
                            <div class="orderButtonBox">
                                <!--只有已经发布的切目前是打开状态的，显示中止悬赏按钮-->
                                <!--<span class="del" v-if="item.status==1&&item.open==1">中止悬赏</span>-->
                                <!--打开状态切目前状态为已被接单，那么显示拒绝接单按钮-->
                                <!--<span class="pay" v-if="item.taskStatus==='payment_pending'" @click="goPayFn(item)">去付款</span>-->
                                <span class="confirmGet" v-if="item.status==2" @click="confirmFinshJob(item)">确认完成</span>
                                <!--<span class="checkShip" v-if="(item.taskStatus==='receipt'&&item.isOpen===true)||(item.taskStatus==='completed'&&item.isOpen===true)">查看进度</span>-->
                                <!--只要悬赏是关闭的就显示-->
                                <!--<span class="evaluate" v-if="item.open==0">开启悬赏</span>-->
                                <!--任何时候都可以查看详情-->
                                <span class="check" @click="goToOrderContentFn(item)">查看订单</span>
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
        name: 'myRewardList',
        computed:{
            //返回目前选中的状态
            returnNowSelectedStatus(){
                switch (this.topTabBarData.active) {
                    case 0:
                        return "";
                    case 1:
                        return "1";
                    case 2:
                        return "2";
                    case 3:
                        return "3";
                    case 4:
                        return "4";
                    case 5:
                        return "5";
                }
            }
        },
        data() {
            return {
                //本地的商品列表下拉加载数据
                myRewardListData: {
                    //存储列表数据
                    list: [],
                    //当前页码
                    current: 0,
                    //是否显示加载中
                    loading: false,
                    //是否已经全部加载完成
                    finished: false,
                    //第一次进入是否加载一次
                    immediateCheck: false,
                    //多少是offset
                    offset: 300,
                    //当前总页数
                    totalPage: 0,
                    //每页条数
                    numPerPage: 5,
                    //总条数
                    totalCount:0
                },
                //第一次数据请求是否完成
                firstDataStatusAnm: false,
                //顶部tab栏数据
                topTabBarData: {
                    active: 0,
                    list: [
                        {
                            id: 0,
                            title: "全部"
                        },
                        {
                            id: 1,
                            title: "已接单"
                        },
                        {
                            id: 2,
                            title: "已确认"
                        },
                        {
                            id: 3,
                            title: "待审核"
                        },
                        {
                            id: 4,
                            title: "已完成"
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
            //确认完成订单
            confirmFinshJob(item){
                //弹出提示框，是否确认
                this.$dialog.confirm({
                    title: '完成确认',
                    message: '确认完成该悬赏？'
                }).then(() => {
                    // 确认
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/rewardorder/changestatus",
                        baseUrl:this.tools.ajaxAddress.other,
                        data:{
                            token:this.publicGetUserNormalTokenFn(this),
                            roid:item.id,
                            status:"3"
                        },
                        success:(res)=>{
                            if(res.data.code===200){
                                this.tools.globalFn.publicToastFn(this,"确认成功！");
                                //改变该item的值,变为已发布待接单的状态
                                item.status="3";
                            }
                        },
                        fail:(err)=>{
                            console.log(err);
                        }
                    })

                }).catch(() => {
                    // 取消
                });
            },
            //获取封面
            returnImgFn(str){
                return str.split("|")[0];
            },
            //到底部加载新数据的方法
            orderListOnload() {
                console.log("加载更多");
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/rewardorder/myreceiveorder",
                    baseUrl:this.tools.ajaxAddress.other,
                    data:{
                        token:this.publicGetUserNormalTokenFn(this),
                        status:this.returnNowSelectedStatus,
                        pagesize:this.myRewardListData.numPerPage,
                        page:this.myRewardListData.current+1
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //放置数据
                            this.myRewardListData.list=this.myRewardListData.list.concat(res.data.result.data);
                            //放置总页数
                            this.myRewardListData.totalPage=res.data.result.pages.pagecount;
                            //放置当前页数
                            this.myRewardListData.current=res.data.result.pages.page;
                            //放置总页数
                            this.myRewardListData.totalCount=res.data.result.pages.total;
                            //关闭加载动画
                            this.myRewardListData.loading=false;
                            //判断是否已经加载完成
                            if(this.myRewardListData.current===this.myRewardListData.totalPage){
                                this.myRewardListData.finished=true;
                            }
                        }
                    },
                    fail:((err)=>{
                        console.log(err);
                    })
                });
                //拿到当前选择查询的类型
                // this.tools.globalFn.publicAxiosFn(this,
                //     {
                //         url:"/customer/order/index",
                //         method:"GET",
                //         params:{
                //             p:this.orderListData.current+1,
                //             order_status:this.returnSearchOrderStatusFn(this.topTabBarData.active+""),
                //             numPerPage:this.orderListData.numPerPage
                //         },
                //         success:(res)=>{
                //             console.log(res);
                //             if(res.data.code===200){
                //                 //计算总页数放到本地
                //                 this.orderListData.totalPage=this.tools.globalFn.totalPageCountFn(res.data.data.numPerPage,res.data.data.count);
                //                 this.orderListData.list=this.orderListData.list.concat(res.data.data.orderList);
                //                 this.orderListData.current=res.data.data.p;
                //                 this.orderListData.loading=false;
                //                 // this.firstDataStatusAnm=true;
                //                 //判断是否已经到底，如果到底，改变下拉加载状态
                //                 if(this.isLastPageFn()===true){
                //                     this.orderListData.finished=true;
                //                 }
                //                 console.log("打印所有数组");
                //                 console.log(this.orderListData.list);
                //             }
                //         },
                //         fail:(err)=>{
                //             console.log(err);
                //         }
                //     }
                // )
            },
            //返回改订单文字状态的方法
            orderStatusText(item) {
                if(item.open==="0"){
                    return "尚未开启";
                }
                switch (item.status) {
                    case "1":
                        return "已接单";
                    case "2":
                        return "已确认";
                    case "3":
                        return "待审核";
                    case "4":
                        return "已完成";
                    case "5":
                        return "已取消";
                }
            },
            //跳转悬赏详情的方法
            goToTaskContentFn(item) {
                // alert(JSON.stringify(item));
                // console.log(item);
                // this.$router.push("/userCenter/myRewardList/"+item.id);
                // this.$router.push("/userCenter/myRewardList/"+item.id);
                // this.$bridge.callHandler("openNewWebviewFn",JSON.stringify({
                //     url:"http://192.168.0.234:5789/#/taskContent/"+item.rewardid,
                //     statusbarStatus:"#000000"
                // }));
                if(this.$store.state.isDevMode===1){
                    //如果是开发模式，那么进入开发地址
                    this.$bridge.callHandler("openNewWebviewFn",JSON.stringify({
                        url:"http://192.168.0.234:5789/#/taskContentForLink/"+item.rewardid,
                        statusbarStatus:"#000000"
                    }));
                }
                else{
                    //进入线上地址
                    this.$bridge.callHandler("openNewWebviewFn",JSON.stringify({
                        url:"http://www.tobebetterman.com:8002/shop/offerReward/#/taskContentForLink/"+item.rewardid,
                        statusbarStatus:"#000000"
                    }));
                }
            },
            //跳转订单详情的方法
            goToOrderContentFn(item) {
                console.log(item);
                this.$router.push("/userCenter/myReceiptList/"+item.id);
            },
            //判断当前页数是否等于总页数的方法
            isLastPageFn() {
                console.log("总页数为" + this.myRewardListData.totalPage);
                console.log("当前页为" + this.myRewardListData.current);
                if (this.myRewardListData.totalPage === this.myRewardListData.current) {
                    console.log("当前页数已经是最后一页");
                    return true;
                }
                else {
                    return false;
                }
            },
            //公共的处理不同状态下的第一次加载数据的方法(下拉刷新不适用)
            publicOrderListEachFn(res) {
                //计算总页数放到本地
                this.myRewardListData.totalPage = this.tools.globalFn.totalPageCountFn(res.data.data.numPerPage, res.data.data.count);
                console.log(this.tools.globalFn.totalPageCountFn(res.data.data.numPerPage, res.data.data.count));
                console.log("总页数为");
                console.log(this.myRewardListData.totalPage);
                console.log(res);
                this.myRewardListData.list = res.data.data.orderList;
                this.myRewardListData.current = 1;
                //判断是否已经到底，如果到底，改变下拉加载状态
                if (this.isLastPageFn() === true) {
                    this.myRewardListData.loading = false;
                    this.myRewardListData.finished = true;
                }
                //关闭动画
                this.firstDataStatusAnm = true;
            },
            //切换顶部tab的方法
            changeTopTab(index, title) {
                //如果之前已经把下拉加载关闭，这里需要再次开启
                this.myRewardListData.finished = false;
                //清空数组
                this.myRewardListData.list = [];
                // this.publicLocalStorageOrderStatusFn(index);
                //开始加载动画
                this.firstDataStatusAnm = false;
                //开始请求
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/rewardorder/myreceiveorder",
                    baseUrl:this.tools.ajaxAddress.other,
                    data:{
                        token:this.publicGetUserNormalTokenFn(this),
                        status:this.returnNowSelectedStatus,
                        pagesize:this.myRewardListData.numPerPage,
                        page:1
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //放置数据
                            this.myRewardListData.list=res.data.result.data;
                            //放置总页数
                            this.myRewardListData.totalPage=res.data.result.pages.pagecount;
                            //放置当前页数
                            this.myRewardListData.current=res.data.result.pages.page;
                            //放置总页数
                            this.myRewardListData.totalCount=res.data.result.pages.total;
                            //关闭加载动画
                            this.myRewardListData.loading=false;
                            //判断是否已经加载完成
                            if(this.myRewardListData.current===this.myRewardListData.totalPage){
                                this.myRewardListData.finished=true;
                            }
                            //渲染页面
                            this.firstDataStatusAnm = true;
                        }
                    },
                    fail:((err)=>{
                        console.log(err);
                    })
                });
                // this.tools.globalFn.publicAxiosFn(this,
                //     {
                //         url:"/customer/order/index",
                //         method:"GET",
                //         params:{
                //             p:1,
                //             order_status:this.returnSearchOrderStatusFn(index+""),
                //             numPerPage:this.myRewardListData.numPerPage
                //         },
                //         success:(res)=>{
                //             console.log(res);
                //             if(res.data.code===200){
                //                 this.publicOrderListEachFn(res);
                //             }
                //         },
                //         fail:(err)=>{
                //             console.log(err);
                //         }
                //     }
                // )

            },
            //返回上一页的方法
            backLastPage() {
                this.$router.go(-1);
            },
            //初始化数据
            getFirstData() {
                // alert(JSON.parse(localStorage.shopSaveObject).token);
                //默认请求全部数据
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/rewardorder/myreceiveorder",
                    baseUrl:this.tools.ajaxAddress.other,
                    data:{
                        token:this.publicGetUserNormalTokenFn(this),
                        // status:"1"
                        pagesize:this.myRewardListData.numPerPage
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //放置数据
                            this.myRewardListData.list=res.data.result.data;
                            //放置总页数
                            this.myRewardListData.totalPage=res.data.result.pages.pagecount;
                            //放置当前页数
                            this.myRewardListData.current=res.data.result.pages.page;
                            //放置总页数
                            this.myRewardListData.totalCount=res.data.result.pages.total;
                            //判断是否已经加载完成
                            if(this.myRewardListData.current===this.myRewardListData.totalPage){
                                this.myRewardListData.finished=true;
                            }
                            // alert(JSON.stringify(res.data));
                        }
                    },
                    fail:((err)=>{
                        console.log(err);
                    })
                });
                this.firstDataStatusAnm = true;
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
    .nomyRewardListDataTitle {
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
        align-items: center;
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
        /*float: left !important;*/
        /*margin-left: 0;*/
        color: #f44;
        border-color: #f44;
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
