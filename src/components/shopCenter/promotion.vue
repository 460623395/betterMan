<template>
    <div class="publicAllContentBg none" id="shopCenterPro">
        <!--优惠券模块-->
        <div class="couponListBox">
            <!--标题-->
            <p class="header" v-if="couponListOptions.loadingDone===true">优惠券</p>
            <!--loading动画-->
            <van-loading type="spinner" color="black" v-if="couponListOptions.loadingDone===false"
                         class="globalLoadingAnmClass"></van-loading>
            <!--加载列表-->
            <van-list :offset="couponListOptions.offset" v-model="couponListOptions.loading" :finished="couponListOptions.finished"
                      @load="stuffListOnload"
                      :immediate-check="couponListOptions.immediateCheck"
                      v-if="couponListOptions.loadingDone===true"
            >
                <ul class="shopCouponList" v-if="couponListOptions.loadingDone===true&&couponListOptions.list.length>0">
                    <li v-for="(item,index) in couponListOptions.list" :key="index" v-if="item.is_received===0">
                        <!--未领取的优惠券的样式-->
                        <div class="shopCouponListStyle" @click="getCouponFn(item)">
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
                    <li v-for="(item,index) in couponListOptions.list" :key="index" v-if="item.is_received===1">
                        <!--已领取的优惠券的样式-->
                        <div class="shopCouponListStyle" @click="getCouponFn(item)">
                            <div class="left">
                                <div class="shopCouponListLeftBorder">

                                </div>
                                <div class="shopCouponListLeftContent">
                                    <h3><span>￥</span>{{parseFloat(item.discount).toFixed(2)}}</h3>
                                    <p v-text="returnCouponThresholdFn(item)"></p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="had" v-if="item.is_received===1">
                                    <van-icon name="success" style="color: #fff;position: relative;top: -17px;right: -2px;font-size: 13px;"></van-icon>
                                </div>
                                <h3>{{item.coupon_name}}</h3>
                                <p><span v-text="tools.globalFn.returnDateForCoupon(item.start_time)"></span>至<span v-text="tools.globalFn.returnDateForCoupon(item.expiration_date)"></span></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
            <!--数据为空时显示-->
            <p class="noMoreDataLine" v-if="couponListOptions.loadingDone===true&&couponListOptions.list.length===0">暂无优惠券</p>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'shopCenterPro',
        data() {
            return {
                //优惠券列表设置
                couponListOptions:{
                    //是否已经加载完成
                    loadingDone:false,
                    //优惠券列表
                    list:[],
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
                    //总条数
                    totalCount:0,
                    //当前页数
                    current:0,
                    //总页数
                    totalPage:0
                },
            }
        },
        methods: {
            //下拉加载更多
            stuffListOnload(){
                //如果没登录，且当前模式为线上，那么就请求无登录的
                if(this.tools.globalFn.isLoginFn(this)===false&&this.$store.state.isDevMode===0){
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/promotion/cata/shopcoupon",
                        method:"GET",
                        params:{
                            ushop_id:this.$route.params.id,
                            p:this.couponListOptions.current+1,
                            pagesize:this.couponListOptions.pageSize
                        },
                        success:(res)=>{
                            console.log(res);
                            if (res.data.code === 200) {
                                //循环放数据
                                this.couponListOptions.list=res.data.data.couponList;
                                //存储当前页数
                                this.couponListOptions.current=parseInt(res.data.data.p);
                                //存储总条数
                                this.couponListOptions.totalCount=parseInt(res.data.data.count);
                                //存储总页数
                                this.couponListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.couponListOptions.pageSize,res.data.data.count);
                                this.couponListOptions.loading = false;
                                if(this.couponListOptions.current===this.couponListOptions.totalPage){
                                    console.log("已经等于了，不加载");
                                    //关闭加载更多
                                    this.couponListOptions.finished = true;
                                }
                                //开始渲染
                                this.couponListOptions.loadingDone=true;
                                console.log("打印总条数");
                                console.log(this.couponListOptions);
                            }
                        }
                    });
                }
                //如果已经登录，且为线上模式,那么请求已经登录的列表
                else if(this.tools.globalFn.isLoginFn(this)===true&&this.$store.state.isDevMode===0){
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin:true,
                        url:"/promotion/cata/shopcoupon",
                        method:"GET",
                        params:{
                            ushop_id:this.$route.params.id
                        },
                        success:(res)=>{
                            console.log(res);
                            if (res.data.code === 200) {
                                //循环放数据
                                this.couponListOptions.list=res.data.data.couponList;
                                //存储当前页数
                                this.couponListOptions.current=parseInt(res.data.data.p);
                                //存储总条数
                                this.couponListOptions.totalCount=parseInt(res.data.data.count);
                                //存储总页数
                                this.couponListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.couponListOptions.pageSize,res.data.data.count);
                                this.couponListOptions.loading = false;
                                if(this.couponListOptions.current===this.couponListOptions.totalPage){
                                    console.log("已经等于了，不加载");
                                    //关闭加载更多
                                    this.couponListOptions.finished = true;
                                }
                                //开始渲染
                                this.couponListOptions.loadingDone=true;
                                console.log("打印总条数");
                                console.log(this.couponListOptions);
                            }
                        }
                    });
                }
                //如果是线下模式，直接当已经登录请求就完事了
                else if(this.$store.state.isDevMode===1){
                    //请求优惠券
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin:true,
                        url:"/promotion/cata/shopcoupon",
                        method:"GET",
                        params:{
                            ushop_id:this.$route.params.id
                        },
                        success:(res)=>{
                            console.log(res);
                            if (res.data.code === 200) {
                                //循环放数据
                                this.couponListOptions.list=res.data.data.couponList;
                                //存储当前页数
                                this.couponListOptions.current=parseInt(res.data.data.p);
                                //存储总条数
                                this.couponListOptions.totalCount=parseInt(res.data.data.count);
                                //存储总页数
                                this.couponListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.couponListOptions.pageSize,res.data.data.count);
                                this.couponListOptions.loading = false;
                                if(this.couponListOptions.current===this.couponListOptions.totalPage){
                                    console.log("已经等于了，不加载");
                                    //关闭加载更多
                                    this.couponListOptions.finished = true;
                                }
                                //开始渲染
                                this.couponListOptions.loadingDone=true;
                                console.log("打印总条数");
                                console.log(this.couponListOptions);
                            }
                        }
                    });
                }
            },
            //领取优惠券的方法
            getCouponFn(item){
                console.log(item);
                if(item.is_received===1){
                    this.tools.globalFn.publicToastFn(this,"您已经领取过了");
                    return false;
                }
                //如果魅登录且是线上模式直接登录
                if(this.tools.globalFn.isLoginFn(this)===false&&this.$store.state.isDevMode===0){
                    this.$bridge.callHandler("toLogin");
                    return false;
                }
                //如果已经登录且是线上模式,直接领取
                else if(this.tools.globalFn.isLoginFn(this)===true&&this.$store.state.isDevMode===0){
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/promotion/coupon/receive",
                        method:"POST",
                        needLogin:true,
                        data:{
                            coupon_id:item.coupon_id
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                item.is_received=1;
                                this.tools.globalFn.publicToastFn(this,"领取成功！");
                            }
                            else{
                                this.tools.globalFn.publicToastFn(this,res.data.message);
                            }
                        }
                    });
                    return false;
                }
                console.log("走本地领取");
                //如果是其他模式，直接走本地领取
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/promotion/coupon/receive",
                    method:"POST",
                    needLogin:true,
                    data:{
                        coupon_id:item.coupon_id
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.tools.globalFn.publicToastFn(this,"领取成功！");
                            //改变优惠券的领取值
                            item.is_received=1;
                        }
                        else{
                            this.tools.globalFn.publicToastFn(this,res.data.message);
                        }
                    }
                });
            },
            //返回优惠券门槛的方法
            returnCouponThresholdFn(item){
                if(parseFloat(item.conditions)===0){
                    return "无门槛";
                }
                else if(parseFloat(item.conditions)>0){
                    return "满"+(parseFloat(item.conditions)).toFixed(2)+"元可用";
                }
            },
            //初始化订单
            getFirstData(){
                //如果没登录，且当前模式为线上，那么就请求无登录的
                if(this.tools.globalFn.isLoginFn(this)===false&&this.$store.state.isDevMode===0){
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/promotion/cata/shopcoupon",
                        method:"GET",
                        params:{
                            ushop_id:this.$route.params.id,
                            p:1,
                            pagesize:this.couponListOptions.pageSize
                        },
                        success:(res)=>{
                            console.log(res);
                            if (res.data.code === 200) {
                                //循环放数据
                                this.couponListOptions.list=res.data.data.couponList;
                                //存储当前页数
                                this.couponListOptions.current=parseInt(res.data.data.p);
                                //存储总条数
                                this.couponListOptions.totalCount=parseInt(res.data.data.count);
                                //存储总页数
                                this.couponListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.couponListOptions.pageSize,res.data.data.count);
                                this.couponListOptions.loading = false;
                                if(this.couponListOptions.current===this.couponListOptions.totalPage){
                                    console.log("已经等于了，不加载");
                                    //关闭加载更多
                                    this.couponListOptions.finished = true;
                                }
                                //开始渲染
                                this.couponListOptions.loadingDone=true;
                                console.log("打印总条数");
                                console.log(this.couponListOptions);
                            }
                        }
                    });
                }
                //如果已经登录，且为线上模式,那么请求已经登录的列表
                else if(this.tools.globalFn.isLoginFn(this)===true&&this.$store.state.isDevMode===0){
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin:true,
                        url:"/promotion/cata/shopcoupon",
                        method:"GET",
                        params:{
                            ushop_id:this.$route.params.id,
                            p:1,
                            pagesize:this.couponListOptions.pageSize
                        },
                        success:(res)=>{
                            console.log(res);
                            if (res.data.code === 200) {
                                //循环放数据
                                this.couponListOptions.list=res.data.data.couponList;
                                //存储当前页数
                                this.couponListOptions.current=parseInt(res.data.data.p);
                                //存储总条数
                                this.couponListOptions.totalCount=parseInt(res.data.data.count);
                                //存储总页数
                                this.couponListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.couponListOptions.pageSize,res.data.data.count);
                                this.couponListOptions.loading = false;
                                if(this.couponListOptions.current===this.couponListOptions.totalPage){
                                    console.log("已经等于了，不加载");
                                    //关闭加载更多
                                    this.couponListOptions.finished = true;
                                }
                                //开始渲染
                                this.couponListOptions.loadingDone=true;
                                console.log("打印总条数");
                                console.log(this.couponListOptions);
                            }
                        }
                    });
                }
                //如果是线下模式，直接当已经登录请求就完事了
                else if(this.$store.state.isDevMode===1){
                    //请求优惠券
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin:true,
                        url:"/promotion/cata/shopcoupon",
                        method:"GET",
                        params:{
                            ushop_id:this.$route.params.id,
                            p:1,
                            pagesize:this.couponListOptions.pageSize
                        },
                        success:(res)=>{
                            console.log(res);
                            if (res.data.code === 200) {
                                //循环放数据
                                this.couponListOptions.list=res.data.data.couponList;
                                //存储当前页数
                                this.couponListOptions.current=parseInt(res.data.data.p);
                                //存储总条数
                                this.couponListOptions.totalCount=parseInt(res.data.data.count);
                                //存储总页数
                                this.couponListOptions.totalPage=this.tools.globalFn.totalPageCountFn(this.couponListOptions.pageSize,res.data.data.count);
                                this.couponListOptions.loading = false;
                                if(this.couponListOptions.current===this.couponListOptions.totalPage){
                                    console.log("已经等于了，不加载");
                                    //关闭加载更多
                                    this.couponListOptions.finished = true;
                                }
                                //开始渲染
                                this.couponListOptions.loadingDone=true;
                                console.log("打印总条数");
                                console.log(this.couponListOptions);
                            }
                        }
                    });
                }
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
    .couponListBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-top: 10px;
    }
    .couponListBox>.header{
        color: #666;
        font-size: 16px;
        padding: 0 10px;
        margin-bottom: 10px;
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
