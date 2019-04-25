<template>
    <div class="publicAllContentBg" id="myCoupon">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="收藏夹"
                     @click-left="backLastPage"
                     left-arrow
                     left-text="返回"
                     fixed
        >
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
            <!--<span slot="right" style="color: #fafafa"><van-icon name="search" style="color: #fafafa;margin-right: 2px;vertical-align:middle"></van-icon>管理</span>-->
        </van-nav-bar>
        <!--我的收藏商品列表-->
        <div class="publicListBox">
            <van-loading type="spinner" color="black" v-if="contentListOptions.loadingDone===false"
                         class="globalLoadingAnmClass"></van-loading>
            <van-list :offset="contentListOptions.offset" v-model="contentListOptions.loading" :finished="contentListOptions.finished"
                      @load="contentListOnload"
                      :immediate-check="contentListOptions.immediateCheck"
                      v-if="contentListOptions.loadingDone===true&&contentListOptions.list.length>0"
                      finished-text="没有更多了"
            >
                <ul class="list">
                    <li v-for="item in contentListOptions.list" :key="item.product_id">
                        <div class="goodsListStyle">
                            <div class="img" @click="goToGoodContentFn(item.product_id)">
                                <img :src="item.imgUrl" alt="">
                            </div>
                            <div class="goodInfo">
                                <p class="title" @click="goToGoodContentFn(item.product_id)">{{item.name}}</p>
                                <!--<div class="activity">-->
                                <!--<span class="freeShip">包邮</span>-->
                                <!--<span class="kill">秒杀</span>-->
                                <!--<span class="enough">满减</span>-->
                                <!--<span class="discount">折扣</span>-->
                                <!--</div>-->
                                <div class="priceAbout">
                                    <span class="price">{{"￥"+(item.price).toFixed(2)}}</span>
                                    <!--<span class="num">100人评价</span>-->
                                </div>
                                <!--<div class="shopInfo">-->
                                <!--<span class="name">哦牛批店铺</span>-->
                                <!--<span class="into">进入<van-icon name="arrow"></van-icon></span>-->
                                <!--</div>-->
                                <!--加入购物车按钮-->
                                <!--<van-icon @click="getIntoShopCartFn(item)" name="cart"-->
                                          <!--style="color: #e93b3d;font-size: 12px;position: absolute;bottom: 0;right: 0;border: 1px solid #e93b3d;padding: 3px;border-radius: 50%;"></van-icon>-->
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
            <p class="noMoreDataLine" style="margin-top: 10px" v-if="contentListOptions.loadingDone===true&&contentListOptions.list.length===0">暂无数据</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'myCollection',
        data() {
            return {
                //列表设置
                contentListOptions:{
                    list: [],
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
                    //默认每页数量
                    pageSize:10,
                    //当前页数
                    current:0,
                    //总页数
                    totalPage:0
                },
            }
        },
        methods: {
            //加入购物车的方法
            getIntoShopCartFn(item){
                console.log(item);
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        url:"/checkout/cart/add",
                        data:{
                            product_id:item.product_id,
                            qty:1
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.tools.globalFn.publicToastFn(this,"加入成功");
                            }
                            else{
                                this.tools.globalFn.publicToastFn(this,"加入失败");
                            }
                        },
                        fail:(err)=>{
                            console.log(err);
                        }
                    }
                )
            },
            //跳转到商品详情的方法
            goToGoodContentFn(id){
                this.tools.globalFn.publicLinkToGoodContentFn(id,this);
            },
            //内容下拉加载函数
            contentListOnload(){
                console.log("加载更多");
                this.tools.globalFn.publicAxiosFn(this,{
                    needLogin:true,
                    url:"/customer/productfavorite/index",
                    method:"GET",
                    params:{
                        p:this.contentListOptions.current+1,
                        numPerPage:this.contentListOptions.pageSize
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //放置数组
                            this.contentListOptions.list=this.contentListOptions.list.concat(res.data.data.productList);
                            //计算总页数
                            this.contentListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.contentListOptions.pageSize,res.data.data.count);
                            //放置当前页数
                            this.contentListOptions.current=parseInt(res.data.data.p);
                            //初次加载完成
                            this.contentListOptions.loadingDone=true;
                            this.contentListOptions.loading=false;
                            //判断是否是最后一页，如果是，关闭下拉加载
                            if(this.contentListOptions.current===this.contentListOptions.totalPage){
                                console.log("已经是最后一页了");
                                this.contentListOptions.finished=true;
                            }
                        }

                    }
                })
            },
            backLastPage(){
                this.$router.go(-1);
            },
            //初始化数据
            getFirstData(){
                this.tools.globalFn.publicAxiosFn(this,{
                    needLogin:true,
                    url:"/customer/productfavorite/index",
                    method:"GET",
                    params:{
                        module_type:1,
                        p:1,
                        numPerPage:this.contentListOptions.pageSize
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //放置数组
                            this.contentListOptions.list=res.data.data.productList;
                            //计算总页数
                            this.contentListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.contentListOptions.pageSize,res.data.data.count);
                            //放置当前页数
                            this.contentListOptions.current=parseInt(res.data.data.p);
                            //初次加载完成
                            this.contentListOptions.loadingDone=true;
                            //判断是否是最后一页，如果是，关闭下拉加载
                            if(this.contentListOptions.current===this.contentListOptions.totalPage){
                                console.log("已经是最后一页了");
                                this.contentListOptions.finished=true;
                                this.contentListOptions.loading=false;
                            }
                        }

                        console.log("打印配置");
                        console.log(this.contentListOptions);
                    }
                });
            }
        },
        created() {
            this.getFirstData();
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
    .publicListBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*padding: 0 0 10px 0;*/
    }
    .publicListBox ul.list {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 10px 10px 10px;
        background-color: #fff;
        /*margin-top: 10px;*/
    }

    .publicListBox ul.list > li {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 5px;
        border-top: 1px solid #f3f3f3;
        padding-top: 5px;
    }

    .publicListBox ul.list > li:first-child {
        margin-top: 0;
        padding-top: 0;
        border-top: none;
    }
    /*商品样式*/
    .goodsListStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
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
        justify-content: space-between;
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
</style>
