<template>
    <div class="publicAllContentBg" id="killList">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="发布评价" @click-left="backLastPage" fixed>
            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--抢购活动banner-->
        <div class="proBannerBox">
            <img :src="indexTopBanner.imgUrl" alt="">
        </div>
        <!--秒杀列表日期切换-->
        <div class="MSDateTabBox">
            <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===true"
                         class="globalLoadingAnmClass"></van-loading>
            <van-tabs v-model="floatBannerList.active" @click="MsTabChangeFn" v-if="firstDataStatusAnm===false">
                <van-tab v-for="item in floatBannerList.list" :key="item.id">
                    <div slot="title" class="coustomDateTabStyle">
                        <p class="date" v-text="returnDateFn(item.time)"></p>
                        <p class="time" v-text="returnTimeFn(item.time)"></p>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <!--秒杀商品列表-->
        <div class="goodsListBg">
            <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===true"
                         class="globalLoadingAnmClass"></van-loading>
            <van-list :offset="goodsListData.offset" v-model="goodsListData.loading" :finished="goodsListData.finished"
                      @load="goodsListOnload"
                      :immediate-check="goodsListData.immediateCheck"
                      v-if="firstDataStatusAnm===false"
            >
                <!--秒杀商品列表-->
                <div class="goodsListBox">
                    <ul class="list">
                        <li v-for="item in goodsListData.list" :key="item.id">
                            <div class="goodsListStyle">
                                <!--左侧图片-->
                                <div class="img">
                                    <img :src="item.imgUrl" alt="">
                                </div>
                                <!--右侧商品信息-->
                                <div class="info">
                                    <!--标题-->
                                    <p class="title">{{item.name}}</p>
                                    <!--已秒杀的量-->
                                    <div class="msNum">已秒{{(item.selledNum/item.total/100).toFixed(2)}}%
                                        <van-progress
                                                :percentage="returnPercentageFn(item)"
                                                pivot-text="50%"
                                                pivot-color="#7232dd"
                                                color="linear-gradient(to right, #be99ff, #7232dd)"
                                        ></van-progress>
                                    </div>
                                    <!--价格和立即抢购按钮-->
                                    <div class="bottom">
                                        <p class="price">￥{{item.proPrice}}<span>￥{{item.price}}</span></p>
                                        <p class="button">立即抢购</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'killList',
        data() {
            return {
                //抢购活动banner
                indexTopBanner:{
                    id:1,
                    imgUrl:"../../assets/images/shoppingMall/promotion/promotionBanner1.png"
                },
                //本地的商品列表下拉加载数据
                goodsListData: {
                    //存储列表数据
                    list: [
                        {
                            id:1,
                            name:"哦牛批商品",
                            imgUrl:"../../assets/images/shoppingMall/promotion/goodsImg1.png",
                            //已抢数量
                            selledNum:50,
                            //商品总计数量
                            total:100,
                            //原价
                            price:1023,
                            // 折扣价
                            proPrice:800
                        }
                    ],
                    //是否显示加载中
                    loading: false,
                    //是否已经全部加载完成
                    finished: false,
                    //第一次进入是否加载一次
                    immediateCheck: false,
                    //多少是offset
                    offset: 300
                },
                //本地存储的秒杀数据
                floatBannerList: {
                    //当前选中的
                    active: 0,
                    //请求到的秒杀列表
                    list: [
                        {
                            id: 1,
                            time:156254125422520,
                            goodsList:[
                                {
                                    id:1,
                                    imgUrl: "../../assets/images/shoppingMall/index/MsShopImg.png",
                                    name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                },
                                {
                                    id:1,
                                    imgUrl: "../../assets/images/shoppingMall/index/MsShopImg.png",
                                    name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                },{
                                    id:1,
                                    imgUrl: "../../assets/images/shoppingMall/index/MsShopImg.png",
                                    name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                }
                            ]
                        }
                    ],
                    //用来显示给用户的单层秒杀列表
                    single:[
                        {
                            id:1,
                            imgUrl: "../../assets/images/shoppingMall/index/MsShopImg.png",
                            name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                            goodJNum: 50,
                            oldPrice: 100,
                            newPrice: 80
                        },
                        {
                            id:1,
                            imgUrl: "../../assets/images/shoppingMall/index/MsShopImg.png",
                            name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                            goodJNum: 50,
                            oldPrice: 100,
                            newPrice: 80
                        },{
                            id:1,
                            imgUrl: "../../assets/images/shoppingMall/index/MsShopImg.png",
                            name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                            goodJNum: 50,
                            oldPrice: 100,
                            newPrice: 80
                        }
                    ]
                },
                //第一次数据请求是否完成
                firstDataStatusAnm: false
            }
        },
        methods: {
            //返回返回日期格式的方法
            returnDateFn(val){
                return this.tools.globalFn.getDate(val);
            },
            //返回返回日期格式的方法
            returnTimeFn(val){
                return this.tools.globalFn.getTime(val);
            },
            //返回百分比的方法
            returnPercentageFn(item){
                return parseInt((item.selledNum/item.total*100).toFixed(0));
            },
            //切换秒杀日期的方法
            MsTabChangeFn(index,title){
                // console.log(vm.floatBannerList.list[index].goodsList);
                //因为自定义了title，所以title是未定义
                this.floatBannerList.single=this.floatBannerList.list[index].goodsList;
            },
            //点击秒杀选项的方法
            floatBannerClickFn: function (item) {
                console.log(item);
            },
            //下拉加载更多数据的方法
            goodsListOnload :function(){

            },
            //返回上一页的方法
            backLastPage: function () {
                this.$router.go(-1);
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
    /*顶部banner*/
    .proBannerBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*margin-bottom: 10px;*/
    }
    .proBannerBox>img{
        width: 100%;
        display:block;
    }
    .goodsListBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    /*秒杀列表*/
    .MSDateTabBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        min-height: 50px;
        position: relative;
        margin-bottom: 10px;
    }
    .MSDateTabBox .van-tabs__line{
        display: none;
    }
    .MSDateTabBox .van-tab{
        line-height: inherit!important;
    }
    .MSDateTabBox .van-tab>div{
        height: 100%;
    }
    .MSDateTabBox .coustomDateTabStyle{
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 0;
    }
    .MSDateTabBox .coustomDateTabStyle p.date{
        font-size: 14px;
    }
    .MSDateTabBox .coustomDateTabStyle p.time{
        font-size: 16px;
        font-weight: bold;
    }
    .MSDateTabBox .van-tab--active{
        color: #ff8e2a!important;
    }
    .MSDateTabBox .van-tab{
        color: #515151;
    }
    .MSDateTabBox .van-tabs--line .van-tabs__wrap{
        height: 100%;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .MSDateTabBox .van-tabs--line{
        padding-top: 60px;
    }
    .MSDateTabBox .van-tabs__nav--line{
        padding-bottom: 0;
    }
    /*秒杀列表*/
    .goodsListBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .goodsListBox>ul.list{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px 10px 10px;
    }
    .goodsListBox>ul.list>li{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
    }
    .goodsListBox>ul.list>li:first-child{
        margin-top: 0;
    }
    /*商品列表单个样式*/
    .goodsListStyle{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>
