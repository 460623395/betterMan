<template>
    <div class="publicAllContentBg" id="myCoupon">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="我的优惠券"
                     @click-left="backLastPage"
                     fixed>
            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass" ></van-icon>
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--优惠券tab选项-->
        <van-tabs v-model="tabOptions.tabActIndex">
            <van-tab v-for="item in tabOptions.tabHeader" :title="item.title"></van-tab>
        </van-tabs>
        <!--优惠券列表-->
        <div class="shopCouponListBox">
            <van-loading type="spinner" color="black" v-if="couponListOptions.loadingDone===false"
                         class="globalLoadingAnmClass"></van-loading>
            <van-list :offset="couponListOptions.offset" v-model="couponListOptions.loading" :finished="couponListOptions.finished"
                      @load="contentListOnload"
                      :immediate-check="couponListOptions.immediateCheck"
                      v-if="couponListOptions.loadingDone===true"
            >
                <ul class="shopCouponList">
                    <li v-for="(item,index) in couponListOptions.canUselist" :key="index" v-if="tabOptions.tabActIndex===0">
                        <!--可使用的优惠券的样式-->
                        <div class="shopCouponListStyle">
                            <div class="left">
                                <div class="shopCouponListLeftBorder">

                                </div>
                                <div class="shopCouponListLeftContent">
                                    <h3><span>￥</span>{{(item.price/100).toFixed(2)}}</h3>
                                    <p v-text="returnCouponThresholdFn(item)"></p>
                                </div>
                            </div>
                            <div class="right">
                                <!--<div class="had" v-if="item.checked===true">-->
                                <!--<van-icon name="success" style="color: #fff;"></van-icon>-->
                                <!--</div>-->
                                <h3>{{item.title}}</h3>
                                <p><span v-text="tools.globalFn.returnDateForCoupon(item.startTime)"></span>至<span v-text="tools.globalFn.returnDateForCoupon(item.endTime)"></span></p>
                            </div>
                        </div>
                    </li>
                    <!--已使用的优惠券样式-->
                    <li v-for="(item,index) in couponListOptions.usedList" :key="index" v-if="tabOptions.tabActIndex===1">
                        <div class="shopCouponListStyle">
                            <div class="left used">
                                <div class="shopCouponListLeftBorder used">

                                </div>
                                <div class="shopCouponListLeftContent used">
                                    <h3><span>￥</span>{{(item.price/100).toFixed(2)}}</h3>
                                    <p v-text="returnCouponThresholdFn(item)"></p>

                                </div>
                            </div>
                            <div class="right">
                                <!--<div class="had" v-if="item.checked===true">-->
                                <!--<van-icon name="success" style="color: #fff;"></van-icon>-->
                                <!--</div>-->
                                <h3>{{item.title}}</h3>
                                <p><span v-text="tools.globalFn.returnDateForCoupon(item.startTime)"></span>至<span v-text="tools.globalFn.returnDateForCoupon(item.endTime)"></span></p>
                                <p class="cantUseReason">已使用</p>
                            </div>
                        </div>
                    </li>
                    <!--已过期的优惠券样式-->
                    <li v-for="(item,index) in couponListOptions.timeOutList" :key="index" v-if="tabOptions.tabActIndex===2">
                        <div class="shopCouponListStyle">
                            <div class="left used">
                                <div class="shopCouponListLeftBorder used">

                                </div>
                                <div class="shopCouponListLeftContent used">
                                    <h3><span>￥</span>{{(item.price/100).toFixed(2)}}</h3>
                                    <p v-text="returnCouponThresholdFn(item)"></p>

                                </div>
                            </div>
                            <div class="right">
                                <!--<div class="had" v-if="item.checked===true">-->
                                <!--<van-icon name="success" style="color: #fff;"></van-icon>-->
                                <!--</div>-->
                                <h3>{{item.title}}</h3>
                                <p><span v-text="tools.globalFn.returnDateForCoupon(item.startTime)"></span>至<span v-text="tools.globalFn.returnDateForCoupon(item.endTime)"></span></p>
                                <p class="cantUseReason">已过期</p>
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
        name: 'myCoupon',
        data() {
            return {

                //优惠券列表设置
                couponListOptions:{
                    //是否已经加载完成
                    loadingDone:true,
                    //可用优惠券列表
                    canUselist:[
                        {
                            id:11,
                            title:"哦牛批-5元优惠券",
                            price:100,
                            needEnough:1000,
                            startTime:18212514141,
                            endTime:1512512541,
                            checked:true,
                            status:"used",
                        },
                        {
                            id:1225,
                            title:"哦牛批10元优惠券",
                            price:1000,
                            needEnough:0,
                            startTime:18212514141,
                            endTime:1512512541,
                            checked:false
                        },
                        {
                            id:22222,
                            title:"哦牛批10元优惠券",
                            price:1000,
                            needEnough:0,
                            startTime:18212514141,
                            endTime:1512512541,
                            checked:false
                        }
                    ],
                    //已使用优惠券列表
                    usedList:[
                        {
                            id:22222,
                            title:"哦牛批10元优惠券",
                            price:1000,
                            needEnough:0,
                            startTime:18212514141,
                            endTime:1512512541,
                            checked:true
                        }
                    ],
                    //已过期优惠券列表
                    timeOutList:[
                        {
                            id:22222,
                            title:"哦牛批10元优惠券",
                            price:1000,
                            needEnough:0,
                            startTime:18212514141,
                            endTime:1512512541,
                            checked:true
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
                //tab设置
                tabOptions:{
                    //目前选中的
                    tabActIndex:0,
                    //tab栏目
                    tabHeader:[
                        {
                            id:1,
                            title:"可使用"
                        },
                        {
                            id:2,
                            title:"已使用"
                        },
                        {
                            id:3,
                            title:"已过期"
                        }
                    ]
                },


            }
        },
        methods: {
            //内容下拉加载函数
            contentListOnload(){
                console.log("加载更多");
            },
            backLastPage(){
                this.$router.go(-1);
            },
            //领取优惠券的方法
            getCouponFn(item){
                console.log(item);
            },
            //返回优惠券门槛的方法
            returnCouponThresholdFn(item){
                if(item.needEnough===0){
                    return "无门槛";
                }
                else if(item.needEnough>0){
                    return "满"+(item.needEnough/100).toFixed(2)+"元可用";
                }
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
    /*已使用文字*/
    .cantUseReason{
        color: #999;
        font-size: 12px;
    }
    /*优惠券列表样式*/
    .shopCouponListBox{
        width: 100%;
        height: auto;
        overflow: scroll;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        min-height: 50px;
        position: relative;
        flex: 1;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .shopCouponList{
        flex: 1;
        /*display: flex;*/
        flex-direction: column;
        /*overflow: auto;*/
        margin-bottom: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px;
    }
    .shopCouponList>li{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
    }
    .shopCouponList>li:first-child{
        margin-top: 0;
    }
    .shopCouponListStyle{
        width: 100%;
        /*overflow: auto;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        height: 90px;
    }
    .shopCouponListStyle>div.left{
        display: flex;
        height: 100%;
        line-height: 1;
        width: 126px;
    }
    .shopCouponListLeftContent{
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        color: #fff;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        text-align: center;
        margin-left: -16px;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        background-image: -webkit-linear-gradient(45deg, #ff6868, #ff8c8c);
        background-image: linear-gradient(45deg, #ff6868, #ff8c8c);
        width: 100%;
    }
    .shopCouponListLeftContent.used{
        background:linear-gradient(45deg, #a4a9b2, #b7bcc3);
    }
    .shopCouponListLeftContent h3{
        font-size: 22px;
        font-weight: normal;
        margin: 0 0 10px;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .shopCouponListLeftContent h3 span{
        font-size: 16px;
    }
    .shopCouponListLeftContent p{
        margin: 0;
        font-size: 14px;
        font-weight: 300;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
    }
    .shopCouponListStyle>div.right{
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        height: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        padding: 0 15px;
        overflow: hidden;
        position: relative;
        background-color: #fff;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        border-radius: 0 4px 4px 0;
    }
    .shopCouponListStyle>div.right div.had{
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 18px 19px;
        border-radius: 0 4px 0 0;
        border-color: #f44 #f44 transparent transparent;
    }
    .shopCouponListStyle>div.right h3{
        line-height: 1.4;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
        opacity: .8;
        font-size: 16px;
        font-weight: normal;
    }
    .shopCouponListStyle>div.right p{
        line-height: 1.4;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #999;
        font-size: 12px;
        margin: 5px 0 0;
    }
    .shopCouponListLeftBorder{
        height: 100%;
        min-width: 18px;
        background: url("../../assets/images/shoppingMall/goodContent/couponBorder.png");
        background-size: 18px 100px;
        line-height: 1;
    }
    /*已经用过的样式*/
    .shopCouponListLeftBorder.used{
        background-image: url("../../assets/images/shoppingMall/goodContent/couponBorderUsed.png");
        background-repeat: round;
    }
</style>
