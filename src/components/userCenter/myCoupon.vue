<template>
    <div class="publicAllContentBg" id="myCoupon">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass"
                     @click-left="backLastPage"
                     title="我的优惠券"
                     left-arrow
                     left-text="返回"
                     fixed
        >
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" class="globalNavBarIconClass text"><van-icon name="search" class="globalNavBarIconClass" style="margin-right: 2px;vertical-align:middle"></van-icon>管理</span>-->
        </van-nav-bar>
        <!--优惠券tab选项-->
        <van-tabs v-model="tabOptions.tabActIndex" @change="tabOnchange">
            <van-tab v-for="item in tabOptions.tabHeader" :title="item.title" :key="item.id"></van-tab>
        </van-tabs>
        <!--优惠券列表-->
        <div class="shopCouponListBox">
            <van-loading type="spinner" color="black" v-if="couponListOptions.loadingDone===false"
                         class="globalLoadingAnmClass"></van-loading>
            <van-list :offset="couponListOptions.offset" v-model="couponListOptions.loading" :finished="couponListOptions.finished"
                      @load="contentListOnload"
                      :immediate-check="couponListOptions.immediateCheck"
                      v-if="couponListOptions.loadingDone===true"
                      finished-text="没有更多了"
            >
                <ul class="shopCouponList">
                    <li v-for="(item,index) in couponListOptions.canUselist" :key="index" v-if="tabOptions.tabActIndex===0">
                        <!--可使用的优惠券的样式-->
                        <div class="shopCouponListStyle">
                            <div class="left">
                                <div class="shopCouponListLeftBorder">

                                </div>
                                <div class="shopCouponListLeftContent">
                                    <h3><span>￥</span>{{parseFloat(item.discount).toFixed(2)}}</h3>
                                    <p v-text="returnCouponThresholdFn(item)"></p>
                                </div>
                            </div>
                            <div class="right">
                                <!--<div class="had" v-if="item.checked===true">-->
                                <!--<van-icon name="success" style="color: #fff;"></van-icon>-->
                                <!--</div>-->
                                <h3>{{item.coupon_name}}</h3>
                                <p><span v-text="tools.globalFn.returnDateForCoupon(item.start_time)"></span>至<span v-text="tools.globalFn.returnDateForCoupon(item.expiration_date)"></span></p>
                            </div>
                        </div>
                    </li>
                    <!--已使用的优惠券样式-->
                    <!--<li v-for="(item,index) in couponListOptions.usedList" :key="index" v-if="tabOptions.tabActIndex===1">-->
                        <!--<div class="shopCouponListStyle">-->
                            <!--<div class="left used">-->
                                <!--<div class="shopCouponListLeftBorder used">-->

                                <!--</div>-->
                                <!--<div class="shopCouponListLeftContent used">-->
                                    <!--<h3><span>￥</span>{{(item.price/100).toFixed(2)}}</h3>-->
                                    <!--<p v-text="returnCouponThresholdFn(item)"></p>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="right">-->
                                <!--&lt;!&ndash;<div class="had" v-if="item.checked===true">&ndash;&gt;-->
                                <!--&lt;!&ndash;<van-icon name="success" style="color: #fff;"></van-icon>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--<h3>{{item.title}}</h3>-->
                                <!--<p><span v-text="tools.globalFn.returnDateForCoupon(item.startTime)"></span>至<span v-text="tools.globalFn.returnDateForCoupon(item.endTime)"></span></p>-->
                                <!--<p class="cantUseReason">已使用</p>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</li>-->
                    <!--已过期的优惠券样式-->
                    <li v-for="(item,index) in couponListOptions.timeOutList" :key="index" v-if="tabOptions.tabActIndex===1">
                        <div class="shopCouponListStyle">
                            <div class="left used">
                                <div class="shopCouponListLeftBorder used">

                                </div>
                                <div class="shopCouponListLeftContent used">
                                    <h3><span>￥</span>{{parseFloat(item.discount).toFixed(2)}}</h3>
                                    <p v-text="returnCouponThresholdFn(item)"></p>

                                </div>
                            </div>
                            <div class="right">
                                <!--<div class="had" v-if="item.checked===true">-->
                                <!--<van-icon name="success" style="color: #fff;"></van-icon>-->
                                <!--</div>-->
                                <h3>{{item.coupon_name}}</h3>
                                <p><span v-text="tools.globalFn.returnDateForCoupon(item.start_time)"></span>至<span v-text="tools.globalFn.returnDateForCoupon(item.expiration_date)"></span></p>
                                <p class="cantUseReason">已失效</p>
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
                    loadingDone:false,
                    //可用优惠券列表
                    canUselist:[],
                    //已使用优惠券列表
                    usedList:[],
                    //已过期优惠券列表
                    timeOutList:[],
                    //是否显示加载中
                    loading: false,
                    //是否已经全部加载完成
                    finished: false,
                    //第一次进入是否加载一次
                    immediateCheck: false,
                    //多少是offset
                    offset: 300,
                    //每页条数
                    pageSize:10,
                    //总页数
                    totalPage:0,
                    //当前页数
                    current:0
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
                            title:"已失效"
                        }
                        // {
                        //     id:1,
                        //     title:"可使用"
                        // },
                        // {
                        //     id:2,
                        //     title:"已使用"
                        // },
                        // {
                        //     id:3,
                        //     title:"已过期"
                        // }
                    ]
                },


            }
        },
        methods: {
            //切换tab
            tabOnchange(index,title){
                if(index===0){
                    //如果为0，请求可用列表
                    if(this.couponListOptions.canUselist.length===0){
                        this.getFirstData();
                    }
                }
                else if(index===1){
                    //如果为1，请求不可用列表
                    if(this.couponListOptions.timeOutList.length===0){
                        this.tools.globalFn.publicAxiosFn(this,{
                            needLogin:true,
                            url:"/promotion/coupon/customer",
                            method:"GET",
                            params:{
                                module_type:1,
                                is_effective:0,
                                numPerPage:this.couponListOptions.pageSize
                            },
                            success:(res)=>{
                                console.log(res);
                                if(res.data.code===200){
                                    //放置数组
                                    this.couponListOptions.timeOutList=res.data.data.couponList;
                                    //计算总页数
                                    this.couponListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.couponListOptions.pageSize,res.data.data.count);
                                    //放置当前页数
                                    this.couponListOptions.current=parseInt(res.data.data.p);
                                    //初次加载完成
                                    this.couponListOptions.loadingDone=true;
                                    //判断是否是最后一页，如果是，关闭下拉加载
                                    if(this.couponListOptions.current===this.couponListOptions.totalPage||res.data.data.couponList.length===0){
                                        console.log("已经是最后一页了");
                                        this.couponListOptions.finished=true;
                                        this.couponListOptions.loading=false;
                                    }
                                    console.log(this.couponListOptions);
                                }
                            }
                        });
                    }
                }
            },
            //内容下拉加载函数
            contentListOnload(){
                console.log("加载更多");
                this.tools.globalFn.publicAxiosFn(this,{
                    needLogin:true,
                    url:"/promotion/coupon/customer",
                    method:"GET",
                    params:{
                        module_type:1,
                        is_effective:this.tabOptions.tabActIndex===0?2:0,
                        numPerPage:this.couponListOptions.pageSize
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //放置数组
                            this.couponListOptions.canUselist=this.couponListOptions.canUselist.concat(res.data.data.couponList);
                            //计算总页数
                            this.couponListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.couponListOptions.pageSize,res.data.data.count);
                            //放置当前页数
                            this.couponListOptions.current=parseInt(res.data.data.p);
                            //初次加载完成
                            this.couponListOptions.loadingDone=true;
                            //判断是否是最后一页，如果是，关闭下拉加载
                            if(this.couponListOptions.current===this.couponListOptions.totalPage||res.data.data.couponList.length===0){
                                console.log("已经是最后一页了");
                                this.couponListOptions.finished=true;
                                this.couponListOptions.loading=false;
                            }
                            console.log(this.couponListOptions);
                        }
                    }
                });
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
                if(item.conditions===0){
                    return "无门槛";
                }
                else if(item.conditions>0){
                    return "满"+(parseFloat(item.conditions)).toFixed(2)+"元可用";
                }
            },
            //初始化数据
            getFirstData(){
                //默认请求可用的
                this.tools.globalFn.publicAxiosFn(this,{
                    needLogin:true,
                    url:"/promotion/coupon/customer",
                    method:"GET",
                    params:{
                        module_type:1,
                        is_effective:2,
                        numPerPage:this.couponListOptions.pageSize
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //放置数组
                            this.couponListOptions.canUselist=res.data.data.couponList;
                            //计算总页数
                            this.couponListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.couponListOptions.pageSize,res.data.data.count);
                            //放置当前页数
                            this.couponListOptions.current=parseInt(res.data.data.p);
                            //初次加载完成
                            this.couponListOptions.loadingDone=true;
                            //判断是否是最后一页，如果是，关闭下拉加载
                            if(this.couponListOptions.current===this.couponListOptions.totalPage||res.data.data.couponList.length===0){
                                console.log("已经是最后一页了");
                                this.couponListOptions.finished=true;
                                this.couponListOptions.loading=false;
                            }
                            console.log(this.couponListOptions);
                        }
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
