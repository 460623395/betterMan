<template>
    <div class="guessYouLikeBg">
        <!--<div class="header" v-if="pageComAnmShowStatus.recForYou===false">猜你喜欢</div>-->
        <!--加载动画-->
        <van-loading type="spinner" color="black" v-if="recForYouStatus===false"
                     class="globalLoadingAnmClass"></van-loading>
        <van-list :offset="recForYou.offset" v-model="recForYou.loading" :finished="recForYou.finished"
                  @load="goodsListOnload"
                  :immediate-check="recForYou.immediateCheck" v-if="recForYouStatus===true">
            <ul class="list">
                <li v-for="item in recForYou.list" @click="goToGoodsContentFn(item)">
                    <div class="guessYouLikeStyle">
                        <!--产品图片-->
                        <div class="img">
                            <img :src="item.image" alt="">
                        </div>
                        <!--产品名称-->
                        <p class="name">{{item.name}}</p>
                        <!--价格和销量-->
                        <div class="goodInfo">
                            <p class="left">￥{{item.price}}</p>
                            <!--<p class="right">{{item.saleNum}}人已付款</p>-->
                        </div>
                    </div>
                </li>
            </ul>
        </van-list>
        <div class="noMoreDataLine" v-if="recForYou.finished===true">到底啦</div>
    </div>
</template>

<script>
    export default {
        name: "guessYouLikeGood",
        //接收父组件的传值
        props: ["guessLikeData"],
        data() {
            return {
                //是否已经加载完成
                recForYouStatus: true,
                //为你推荐数据
                recForYou: {
                    list: [
                        // {
                        //     id:1,
                        //     img:require("../../assets/images/shoppingMall/userCenter/guassYouLikeImg.png"),
                        //     title:"哦牛批商品",
                        //     price:128,
                        //     saleNum:21
                        // }
                    ],
                    //总页数
                    totalPage:0,
                    //当前选中页
                    current:0,
                    //是否显示加载中
                    loading: false,
                    //是否已经全部加载完成
                    finished: false,
                    //第一次进入是否加载一次
                    immediateCheck: false,
                    //多少是offset
                    offset: 30,
                    //每页页数
                    pageSize:10
                }
            }
        },
        methods: {
            //跳转商品详情的方法
            goToGoodsContentFn(item) {
                console.log(item);
                //判断当前路由是什么,如果当前是商品详情，那么需要调用空白页面再跳转到商品详情
                console.log(this.$route);
                if(this.$route.name==="goodsContent"){
                    //如果是商品详情，跳转空白页，并且附带商品id
                    this.$router.push({name:"linkWaitPage",params:{id:item.product_id}});
                }
                else if(this.$route.name==="index"){
                    //如果是开发模式，直接跳
                    if(this.tools.globalFn.regDevModeFn(this)===1){
                        this.$router.push({name:"linkWaitPage",params:{id:item.product_id}});
                        return;
                    }
                    //如果是首页，需要先关闭tabBar
                    this.$bridge.callHandler('tabBarStatus',"false",  (res)=>{
                        if(res==="true"){
                            // alert("跳转！");
                            // this.$router.push({name: "goodsContent", params: {id: item.product_id}});
                            this.$router.push({name:"linkWaitPage",params:{id:item.product_id}});
                            // this.$router.push({name:'linkWaitPage'});
                        }
                    });
                }
                else if(this.$route.name==="userCenter"){
                    this.$router.push({name:"linkWaitPage",params:{id:item.product_id}});
                }
                else{
                    //如果不等于，直接跳转商品详情
                    this.$router.push({name: "goodsContent", params: {id: item.product_id}});
                }
                // this.$router.replace({name: "goodsContent", params: {id: item.product_id}});
                // this.$router.go(0);
                // this.tools.globalFn.publicLinkToGoodContentFn(item.product_id,this);
            },
            //到底部加载新数据的方法
            goodsListOnload() {
                console.log("加载更多");
                // alert("触发加载更多");
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        // needLogin:true,
                        url: "/catalog/productextend/guesslike",
                        method: "GET",
                        params:{
                            p:this.recForYou.current+1,
                            numPerPage:this.recForYou.pageSize,
                            module_type:1
                        },
                        success: (res) => {
                            // console.log(res);
                            if (res.data.code === 200) {
                                //循环放数据
                                this.recForYou.list = this.recForYou.list.concat(res.data.data.products);
                                //存储当前页数
                                this.recForYou.current=parseInt(res.data.data.p);
                                //存储总页数
                                this.recForYou.totalPage=this.tools.globalFn.totalPageCountFn(this.recForYou.pageSize,res.data.data.count);
                                this.recForYou.loading = false;
                                if(this.recForYou.current===this.recForYou.totalPage){
                                    console.log("已经等于了，不加载");
                                    //关闭加载更多
                                    this.recForYou.finished = true;
                                }
                                console.log("打印总条数");
                                console.log(this.recForYou.list.length);
                            }
                        }
                    }
                );
            },
            //初始化数据
            getFirstData(){
                //先清空数组
                this.recForYou.list=[];
                // alert("已经清空");
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        // needLogin:true,
                        url: "/catalog/productextend/guesslike",
                        method: "GET",
                        params:{
                            p:1,
                            numPerPage:this.recForYou.pageSize,
                            module_type:1
                        },
                        success: (res) => {
                            // console.log(res);
                            if (res.data.code === 200) {
                                //循环放数据
                                this.recForYou.list = res.data.data.products;
                                //存储当前页数
                                this.recForYou.current=parseInt(res.data.data.p);
                                //存储总页数
                                this.recForYou.totalPage=this.tools.globalFn.totalPageCountFn(this.recForYou.pageSize,res.data.data.count);
                                this.recForYou.loading = false;
                                if(this.recForYou.totalPage===this.recForYou.current){
                                    //关闭加载更多
                                    this.recForYou.finished = true;
                                }
                            }
                        },
                        fail: (err) => {
                            console.log(err);
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

<style scoped>
    .noMoreDataLine {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 5px 10px;
        font-size: 14px;
        color: #999;
        text-align: center;
    }

    .guessYouLikeBg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 5px;
    }

    .guessYouLikeBg > div.header {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        font-size: 16px;
        padding: 0 5px;
    }

    .guessYouLikeBg ul.list {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*column-count: 1;*/
        /*column-gap: 0;*/
        /*display: flex;*/
    }

    .guessYouLikeBg ul.list > li {
        width: 50%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 5px 5px;
        float: left;
        /*break-inside: avoid;*/
    }

    .guessYouLikeStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 4px;
    }

    .guessYouLikeStyle > div.img {
        width: 100%;
        padding-top: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 6px;
    }

    .guessYouLikeStyle > div.img img {
        width: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        /*height: 100%;*/
    }
    .guessYouLikeStyle > p.name {
        color: #666;
        font-size: 14px;
        display: -webkit-box;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        white-space: normal;
        -webkit-box-orient: vertical;
        word-break: break-all;
        margin-bottom: 4px;
        padding: 0 10px;
        height: 36px;
        line-height: 18px;
    }

    .guessYouLikeStyle > div.goodInfo {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px;
        margin-bottom: 10px;
    }

    .guessYouLikeStyle > div.goodInfo > p.left {
        float: left;
        color: #ff9921;
        font-size: 14px;
    }

    .guessYouLikeStyle > div.goodInfo > p.right {
        float: right;
        color: #999;
        font-size: 12px;
    }
</style>