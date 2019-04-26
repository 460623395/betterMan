<template>
    <div class="publicAllContentBg" id="myCoupon">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="我的足迹"
                     @click-left="backLastPage"
                     left-text="返回"
                     left-arrow
                     fixed
        >
            <!--<van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>-->
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--优惠券列表-->
        <div class="publicContentListBox">
            <van-loading type="spinner" color="black" v-if="contentListOptions.loadingDone===false"
                         class="globalLoadingAnmClass"></van-loading>
            <van-list :offset="contentListOptions.offset" v-model="contentListOptions.loading" :finished="contentListOptions.finished"
                      @load="contentListOnload"
                      :immediate-check="contentListOptions.immediateCheck"
                      v-if="contentListOptions.loadingDone===true"
                      finished-text="没有更多了"
            >
                <!--我的足迹列表-->
                <ul class="myFooterPointerList">
                    <!--<li v-for="(item,index) in contentListOptions.list" :key="index">-->
                    <li>
                        <!--<p class="dateHeaderLine">{{item.time}}</p>-->
                        <ul class="goodsListStyleList">
                            <li v-for="(item,index) in contentListOptions.list" :key="index" @click="goToGoodContentFn(item.product_id)">
                                <div class="goodsListStyle">
                                    <div class="img">
                                        <img :src="item.imgUrl" alt="">
                                    </div>
                                    <div class="goodInfo">
                                        <p class="title">{{item.name}}</p>
                                        <!--<div class="activity">-->
                                            <!--<span class="freeShip">包邮</span>-->
                                            <!--<span class="kill">秒杀</span>-->
                                            <!--<span class="enough">满减</span>-->
                                            <!--<span class="discount">折扣</span>-->
                                        <!--</div>-->
                                        <div class="priceAbout">
                                            <span class="price">￥{{item.price.toFixed(2)}}</span>
                                            <!--<span class="num">100人评价</span>-->
                                        </div>
                                        <div class="shopInfo">
                                            <span class="name">{{item.updated_at}}</span>
                                            <!--<span class="name">哦牛批店铺</span>-->
                                            <!--<span class="into">进入<van-icon name="arrow"></van-icon></span>-->
                                        </div>
                                        <!--&lt;!&ndash;加入购物车按钮&ndash;&gt;-->
                                        <!--<van-icon name="cart"-->
                                                  <!--style="color: #e93b3d;font-size: 12px;position: absolute;bottom: 0;right: 0;border: 1px solid #e93b3d;padding: 3px;border-radius: 50%;"></van-icon>-->
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </li>
                </ul>
            </van-list>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'myFooterPointer',
        data() {
            return {

                //列表设置
                contentListOptions:{
                    list:[
                        // {
                        //     id:50,
                        //     time:"2018-2-20",
                        //     list:[
                        //         {
                        //             id: 1,
                        //             title: "那真的牛皮1",
                        //             price: 10520,
                        //             imgUrl: require("../../assets/images/shoppingMall/cart/goodImg.png")
                        //         },
                        //         {
                        //             id: 2,
                        //             title: "那真的牛皮2",
                        //             price: 3520,
                        //             imgUrl:require ("../../assets/images/shoppingMall/cart/goodImg.png"),
                        //         }
                        //     ]
                        //
                        // },
                        // {
                        //     id:51,
                        //     time:"2018-2-20",
                        //     list:[
                        //         {
                        //             id: 22,
                        //             title: "那真的牛皮1",
                        //             price: 10520,
                        //             imgUrl: require("../../assets/images/shoppingMall/cart/goodImg.png")
                        //         },
                        //         {
                        //             id: 33,
                        //             title: "那真的牛皮2",
                        //             price: 3520,
                        //             imgUrl:require ("../../assets/images/shoppingMall/cart/goodImg.png"),
                        //         },
                        //         {
                        //             id: 44,
                        //             title: "那真的牛皮3",
                        //             price: 3520,
                        //             imgUrl:require ("../../assets/images/shoppingMall/cart/goodImg.png"),
                        //         }
                        //     ]
                        //
                        // }

                    ],
                    //是否已经加载完成
                    loadingDone:false,
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
                    current:0,
                    //总条数
                    totalCount:0,
                    //每页条数
                    pageSize:10
                },


            }
        },
        methods: {
            //去商品详情
            goToGoodContentFn(id){
                this.tools.globalFn.publicLinkToGoodContentFn(id,this);
            },
            //内容下拉加载函数
            contentListOnload(){
                console.log("加载更多");
                this.tools.globalFn.publicAxiosFn(this,{
                    needLogin:true,
                    url:"/customer/footprint/index",
                    method:"GET",
                    params:{
                        module_type:1,
                        pagesize:this.contentListOptions.paegSize,
                        p:this.contentListOptions.current+1
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //放置数组
                            this.contentListOptions.list=this.contentListOptions.list.concat(res.data.data.productList);
                            //计算总页数
                            this.contentListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.contentListOptions.pageSize,res.data.data.count);
                            //放置当前页数
                            // this.contentListOptions.current=parseInt(res.data.data.p);
                            this.contentListOptions.current=parseInt(res.data.data.p);
                            //默认关闭一哈
                            this.contentListOptions.loading=false;
                            //初次加载完成
                            // this.contentListOptions.loadingDone=true;
                            //判断是否是最后一页，如果是，关闭下拉加载
                            if(this.contentListOptions.current===this.contentListOptions.totalPage||res.data.data.productList.length===0){
                                console.log("已经是最后一页了");
                                this.contentListOptions.finished=true;
                                this.contentListOptions.loading=false;
                            }
                        }
                    }
                })
            },
            //返回上一页的方法
            backLastPage(){
                this.$router.go(-1);
            },
            //初始化数据
            getFirstData(){
                this.tools.globalFn.publicAxiosFn(this,{
                    needLogin:true,
                    url:"/customer/footprint/index",
                    method:"GET",
                    params:{
                        module_type:1,
                        pagesize:this.contentListOptions.paegSize
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //放置数组
                            this.contentListOptions.list=res.data.data.productList;
                            //计算总页数
                            this.contentListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.contentListOptions.pageSize,res.data.data.count);
                            //放置当前页数
                            // this.contentListOptions.current=parseInt(res.data.data.p);
                            this.contentListOptions.current=parseInt(res.data.data.p);
                            //初次加载完成
                            this.contentListOptions.loadingDone=true;
                            //判断是否是最后一页，如果是，关闭下拉加载
                            if(this.contentListOptions.current===this.contentListOptions.totalPage||res.data.data.productList.length===0){
                                console.log("已经是最后一页了");
                                this.contentListOptions.finished=true;
                                this.contentListOptions.loading=false;
                            }
                        }
                    }
                })
            }
        },
        created() {
            this.getFirstData()
        },
        mounted() {

        },
        watch: {},
        beforeRouteEnter(to, from, next) {
            // console.log(to);
            // console.log(from);
            //如果是来自分类，那么就不需要启用旧数据，重新读取
            if (from.name === "userCenter") {
                to.meta.useOldData = false;
            }
            else if (from.name === "goodsContent") {
                //如果是来自商品详情,那么就启用旧数据
                to.meta.useOldData = true;
            }
            next();
        },
        //激活(页面被缓存的情况下)
        activated() {
            console.log(this.$route.meta.useOldData);
            if (this.$route.meta.useOldData === false) {
                //请求新数据
                console.log("重新请求数据");
                this.contentListOptions.finished = false;
                this.contentListOptions.loadingDone = false;
                this.getFirstData();
            }
            //重置防止出错
            this.$route.meta.useOldData = false;
        },
        //取消激活(页面被缓存的情况下)
        deactivated() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .goodsListStyleList{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px;
    }
    .goodsListStyleList>li{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 5px;
        padding-top: 5px;
        border-top: 1px solid #f3f3f3;
    }
    .goodsListStyleList>li:first-child{
        padding-top: 0;
        margin-top: 0;
        border-top: none;
    }
    .goodsListStyleList>li:first-child div.goodInfo{
        padding-top: 5px;
    }
    .goodsListStyleList>:last-child div.goodInfo{
        padding-bottom: 5px;
    }
    .goodsListStyleList>:last-child .van-icon-cart{
        bottom: 5px!important;
    }
    .goodsListStyleList>:last-child .shopInfo{
        margin-bottom: 5px;
    }
    .dateHeaderLine{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #999;
        font-size: 14px;
        padding:6px 10px;
    }
    /*商品样式*/
    .goodsListStyle.first{

    }
    .goodsListStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        /*padding: 10px;*/
        background-color: #fff;
    }

    .goodsListStyle > div.img {
        width: 36%;
        position: relative;
    }

    .goodsListStyle > div.img::before {
        padding-top: 100%;
        content: '\20';
        display: block;
    }

    .goodsListStyle > div.img img {
        width: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
    }

    .goodsListStyle > div.goodInfo {
        /*width: 62%;*/
        flex: 1;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        margin-left: 10px;
        position: relative;
        margin-right: 10px;
    }

    .goodsListStyle > div.goodInfo p.title {
        display: -webkit-box;
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        font-size: 14px;
        color: #333;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        white-space: normal;
        -webkit-box-orient: vertical;
        word-break: break-all;
        margin-bottom: 4px;
    }

    .goodsListStyle > div.goodInfo .activity {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 4px;
    }

    .goodsListStyle > div.goodInfo .activity span {
        padding: 2px 3px;
        font-size: 12px;
        display: inline-block;
        border: 1px solid #30aaff;
        color: #30aaff;
        border-radius: 4px;
    }

    .goodsListStyle > div.goodInfo .priceAbout {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .goodsListStyle > div.goodInfo .priceAbout .price {
        color: #e93b3d;
        font-size: 16px;
    }

    .goodsListStyle > div.goodInfo .priceAbout .num {
        color: #aaaaaa;
        font-size: 12px;

    }

    .goodsListStyle > div.goodInfo .shopInfo {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .goodsListStyle > div.goodInfo .shopInfo {
        width: 80%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .goodsListStyle > div.goodInfo .shopInfo .name {
        display: inline-block;
        color: #aaaaaa;
        font-size: 12px;
    }

    .goodsListStyle > div.goodInfo .shopInfo .into {
        display: inline-block;
        color: #333;
        font-size: 12px;
    }

    .goodsListStyle > div.goodInfo .shopInfo .into > .van-icon {
        vertical-align: text-bottom;
        padding-bottom: 1px;
    }
    .publicContentListBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        min-height: 50px;
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*margin-top: 10px;*/
    }
</style>
