<template>
    <div class="publicAllContentBg" id="myFollow">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="关注的店铺"
                     @click-left="backLastPage"
                     left-arrow
                     left-text="返回"
                     fixed
        >
            <!--<van-icon name="arrow-left" slot="left" class="globalNavBarIconClass" ></van-icon>-->
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
            <!--<span slot="right" class="globalNavBarIconClass text"><van-icon name="search" class="globalNavBarIconClass" style="margin-right: 2px;vertical-align:middle"></van-icon>管理</span>-->
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
                    <li v-for="item in contentListOptions.list" @click="goShopCenterIndex(item)">
                        <div class="followShopListStyle">
                            <!--左侧头像-->
                            <div class="left">
                                <img :src="item.imgUrl" alt="">
                            </div>
                            <!--中间店铺名-->
                            <div class="center">{{item.shop_name}}</div>
                            <!--最右-->
                            <div class="icon">
                                <van-icon name="arrow" style="color: #999;font-size: 14px"></van-icon>
                            </div>
                            <!--右侧上新-->
                            <div class="right">粉丝：{{item.follow_count}}</div>
                        </div>
                    </li>
                </ul>
            </van-list>
            <!--没有数据显示-->
            <p class="noMoreDataLine marginTop">没有更多了</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'myFollow',
        data() {
            return {
                //列表设置
                contentListOptions:{
                    list: [
                        // {
                        //     id:1,
                        //     imgUrl: require("../../assets/images/shoppingMall/cart/goodImg.png"),
                        //     shopName:"哦牛批店铺",
                        //     newNum:3
                        // },
                        // {
                        //     id:2,
                        //     imgUrl: require("../../assets/images/shoppingMall/cart/goodImg.png"),
                        //     shopName:"哦牛批店铺2",
                        //     newNum:0
                        // },
                    ],
                    //是否已经加载完成
                    loadingDone:true,
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
                    //每页条数
                    paegSize:10,
                    //总条数
                    totalCount:0
                },


            }
        },
        methods: {
            //去店铺中心的方法
            goShopCenterIndex(item){
                console.log(item);
                // this.$router.push({name:"shopCenterIndex",params:{id:item.id}});
                this.$router.push("/shopCenter/index/"+item.ushop_id);
            },
            //内容下拉加载函数
            contentListOnload(){
                console.log("加载更多");
                this.tools.globalFn.publicAxiosFn(this,{
                    needLogin:true,
                    url:"/customer/shopfollow/index",
                    method:"GET",
                    params:{
                        module_type:1,
                        p:this.contentListOptions.current+1,
                        numPerPage:this.contentListOptions.pageSize
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //放置数组
                            this.contentListOptions.list=res.data.data.ushopList;
                            //计算总页数
                            this.contentListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.contentListOptions.pageSize,res.data.data.count);
                            //放置当前页数
                            this.contentListOptions.current=parseInt(res.data.data.p);
                            //初次加载完成
                            this.contentListOptions.loadingDone=true;
                            //判断是否是最后一页，如果是，关闭下拉加载
                            if(this.contentListOptions.current===this.contentListOptions.totalPage||res.data.data.ushopList.length===0){
                                console.log("已经是最后一页了");
                                this.contentListOptions.finished=true;
                                this.contentListOptions.loading=false;
                            }
                        }

                        console.log("打印配置");
                        console.log(this.contentListOptions);
                    }
                });
            },
            backLastPage(){
                this.$router.go(-1);
            },
            //初始化数据
            getFirstData(){
                this.tools.globalFn.publicAxiosFn(this,{
                    needLogin:true,
                    url:"/customer/shopfollow/index",
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
                            this.contentListOptions.list=res.data.data.ushopList;
                            //计算总页数
                            this.contentListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.contentListOptions.pageSize,res.data.data.count);
                            //放置当前页数
                            this.contentListOptions.current=parseInt(res.data.data.p);
                            //初次加载完成
                            this.contentListOptions.loadingDone=true;
                            //判断是否是最后一页，如果是，关闭下拉加载
                            if(this.contentListOptions.current===this.contentListOptions.totalPage||res.data.data.ushopList.length===0){
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
            console.log(to);
            console.log(from);
            // alert(JSON.stringify(from))
            // this.tools.globalFn.publicToastFn(this,from.name);
            //如果是来自分类，那么就不需要启用旧数据，重新读取
            if (from.name === "userCenter") {
                to.meta.useOldData = false;
            }
            else if (from.name === "shopCenterGoods"||from.name === "shopCenterPro") {
                //如果是来自店铺中心,那么就启用旧数据
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
        /*background-color: #fff;*/
        /*padding: 10px 0;*/
    }
    /*店铺列表样式*/
    .followShopListStyle{
        width: 100%;
        height: 50px;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: space-between;*/
    }
    .followShopListStyle>div.center{
        width: 50%;
        height: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 10px;
        font-size: 16px;
        color: #333;
        white-space: nowrap;
        float: left;
        line-height: 50px;
    }
    .followShopListStyle>div.right{
        width: 20%;
        height: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #ed6400;
        white-space: nowrap;
        float: right;
        line-height: 50px;
    }
    .followShopListStyle>div.icon{
        width: 10%;
        height: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        font-size: 14px;
        text-align: right;
        float: right;
        line-height: 50px;
    }
    .followShopListStyle>div.left{
        width: 50px;
        padding-top:50px;
        border-radius: 50%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        float: left;
    }
    .followShopListStyle>div.left img{
        display: block;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
    }
    .publicListBox ul.list {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 10px;
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
        padding-top: 5px;
        border-top: 1px solid #f3f3f3;
    }

    .publicListBox ul.list > li:first-child {
        margin-top: 0;
        padding-top: 0;
        border-top:none;
    }
    /*店铺列表样式*/

</style>
