<template>
    <div class="publicAllContentBg none shopIndex fullHeight" id="shopCenterIndex">
        <!--顶部固定背景(顶部栏，tab选项)-->
        <div class="shopIndexTopFixedBox" :style="returnTopBgImgFn()">
            <!--覆盖的黑色背景-->
            <div class="blockBg">
                <!--头部导航-->
                <van-nav-bar style="background-color: rgba(0,0,0,0);color: #fafafa;"
                             left-arrow
                             left-text="返回"
                             @click-left="backLastPage"
                    >
                    <!--<van-icon name="arrow-left" slot="left" style="color: #fafafa" @click="backLastPage"></van-icon>-->
                    <!--<van-field left-icon="search" placeholder="搜本店" slot="title" readonly @click="goToShopSearchPage"></van-field>-->
                    <!--<span slot="right" style="color: #fafafa">搜索</span>-->
                    <!--<van-icon name="search" slot="right" style="color: #fafafa"></van-icon>-->
                </van-nav-bar>
                <!--店铺信息和是否关注-->
                <div class="shopBasicInfoBox">
                    <!--左侧店铺头像-->
                    <div class="icon">
                        <img :src="shopBasicInfo.shopIcon" alt="">
                    </div>
                    <!--中间店铺信息和关注数-->
                    <div class="info">
                        <p>{{shopBasicInfo.shopName}}</p>
                        <p>粉丝数:{{shopBasicInfo.fansNum}}</p>
                    </div>
                    <!--右侧关注按钮(根据不同状态显示)-->
                    <div class="button">
                        <p class="isFollowedButton" v-if="shopBasicInfo.isFollow===true" @click="followButtonFn(false)"><van-icon name="like" style="margin-right: 2px;vertical-align:middle;color: #f44;"/>已关注</p>
                        <p class="unFollowButton" v-if="shopBasicInfo.isFollow===false" @click="followButtonFn(true)"><van-icon name="like-o" style="margin-right: 2px;vertical-align:middle"/>关注</p>
                    </div>
                </div>
                <!--tab切换-->
                <van-tabs v-model="shopIndexTabOptions.shopIndexActive" :line-width="shopIndexTabOptions.lineWidth" @change="tabChangeFn">
                    <van-tab v-for="item in shopIndexTabOptions.list" :title="item.title" :key="item.id">
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <!--切换的内容-->
        <div class="tabChangeContentBox">
            <transition><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vm from "../../main"
    export default {
        name: 'shopCenterIndex',
        data() {
            return {
                //目前选中的哪个店铺tab
                shopIndexTabOptions:{
                    //目前选中的
                    shopIndexActive:0,
                    //店铺tab选项设置
                    list:[
                        // {
                        //     id:11,
                        //     title:"首页"
                        // },
                        {
                            id:22,
                            title:"商品"
                        },
                        {
                            id:33,
                            title:"活动"
                        },
                        // {
                        //     id:44,
                        //     title:"分类"
                        // }
                    ],
                    //选中条宽度
                    lineWidth:40
                },

                //该店铺的基本信息
                shopBasicInfo:{
                    id:22,
                    shopName:"读取中",
                    fansNum:"读取中",
                    isFollow:false,
                    shopIcon:require("../../assets/images/shoppingMall/shopCenter/shopCenterBg.jpg"),
                    shopBg:require("../../assets/images/shoppingMall/shopCenter/shopCenterBg.jpg")
                }

            }
        },
        methods: {
            //点击搜索框打开店铺搜索页面
            goToShopSearchPage(){
                this.$router.push({name:"shopCenterSearch"});
            },
            //当前tab选中发生改变的方法
            tabChangeFn(index,title){
                switch (index) {
                    // case 0:
                    //     this.$router.replace({name:"shopCenterHome"});
                    //     break;
                    // case 1:
                    //     this.$router.replace({name:"shopCenterGoods"});
                    //     break;
                    // case 2:
                    //     this.$router.replace({name:"shopCenterPro"});
                    //     break;
                    // case 3:
                    //     this.$router.replace({name:"shopCenterCategory"});
                    //     break;
                    case 0:
                        this.$router.replace({name:"shopCenterGoods"});
                        break;
                    case 1:
                        this.$router.replace({name:"shopCenterPro"});
                        break;
                }
            },
            //关注商店的方法
            followButtonFn(status){
                console.log(status);
                if(status===true){
                    //如果是true，那就是确定关注,显示已关注
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/customer/shopfollow/add",
                        needLogin:true,
                        method:"GET",
                        params:{
                            ushop_id:this.$route.params.id,
                            module_type:1
                        },
                        success:(res)=>{
                            if(res.data.code===200){
                                this.tools.globalFn.publicToastFn(this,"关注成功");
                                this.shopBasicInfo.isFollow=true;
                            }
                        }
                    });
                }
                else if(status===false){
                    //如果是false，那就是取消关注,显示关注
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/customer/shopfollow/remove",
                        needLogin:true,
                        method:"POST",
                        data:{
                            ushop_id:this.$route.params.id,
                            module_type:1
                        },
                        success:(res)=>{
                            if(res.data.code===200){
                                this.tools.globalFn.publicToastFn(this,"取消成功");
                                this.shopBasicInfo.isFollow=false;
                            }
                        }
                    });
                }
            },
            //返回上一级方法
            backLastPage(){
                //判断当前是否是被新开启的webview从而做不同操作
                if(this.$store.state.isNewWebView===false){
                    this.$router.go(-1);
                    return;
                }
                this.$bridge.callHandler("closeCurrentWebviewFn");
            },
            //返回顶部背景图片地址的方法
            returnTopBgImgFn(){
                return "background-image:url('"+this.shopBasicInfo.shopBg+"')";
            },
            //初始化数据
            getFirstData(){
                //判断是否登录从而发起不同请求
                if(this.tools.globalFn.isLoginFn()===false&&this.$store.state.isDevMode===0){
                    //如果没登录且是线上，那么不需要token
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/ushop/shopinfo/detail",
                        method:"POST",
                        data:{
                            ushopId:this.$route.params.id
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //放置店铺信息
                                this.shopBasicInfo.id=res.data.data.ushopId;
                                //放置店铺名
                                this.shopBasicInfo.shopName=res.data.data.shopName;
                                //店铺头像
                                this.shopBasicInfo.shopIcon=res.data.data.shopPortrait;
                                //放置粉丝数
                                this.shopBasicInfo.fansNum=res.data.data.followCount;
                                //判断是否关注
                                this.shopBasicInfo.isFollow=res.data.data.isFollow===1?true:false;
                            }
                        }
                    });
                }
                else if(this.tools.globalFn.isLoginFn()===true&&this.$store.state.isDevMode===0){
                    //如果已经登录并且是线上模式，那么发起需要token的请求
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/ushop/shopinfo/detail",
                        method:"POST",
                        needLogin:true,
                        data:{
                            ushopId:this.$route.params.id
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //放置店铺信息
                                this.shopBasicInfo.id=res.data.data.ushopId;
                                //放置店铺名
                                this.shopBasicInfo.shopName=res.data.data.shopName;
                                //店铺头像
                                this.shopBasicInfo.shopIcon=res.data.data.shopPortrait;
                                //放置粉丝数
                                this.shopBasicInfo.fansNum=res.data.data.followCount;
                                //判断是否关注
                                this.shopBasicInfo.isFollow=res.data.data.isFollow===1?true:false;
                            }
                        }
                    });
                }
                else{
                    //如果是线下，默认传递token
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/ushop/shopinfo/detail",
                        method:"POST",
                        needLogin:true,
                        data:{
                            ushopId:this.$route.params.id
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //放置店铺信息
                                this.shopBasicInfo.id=res.data.data.ushopId;
                                //放置店铺名
                                this.shopBasicInfo.shopName=res.data.data.shopName;
                                //店铺头像
                                this.shopBasicInfo.shopIcon=res.data.data.shopPortrait;
                                //放置粉丝数
                                this.shopBasicInfo.fansNum=res.data.data.followCount;
                                //判断是否关注
                                this.shopBasicInfo.isFollow=res.data.data.isFollow===1?true:false;
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
        watch: {
        },
        //在进入此路由之前，通知客户端进行状态栏改变操作
        beforeRouteEnter(to, from, next){
            // alert(vm.$bridge.callHandler);
            // console.log(vm.$store.state.isDevMode);
            // alert(vm.$store.state.isDevMode);
            // alert(vm);
            if(vm.$store.state.isDevMode==0){
                // alert("进入模式");
                vm.$bridge.callHandler("statusBarBgChangeFn","#000000",(res)=>{
                    // alert(res);
                    next();
                    // vm.tools.globalFn.publicToastFn(vm,"客户端传递"+res);
                    // if(res==="true"){
                    //     next();
                    // }
                });
            }
            else if(vm.$store.state.isDevMode==1){
                next();
            }
        },
        //在退出此路由之前，通知客户端进行状态栏改变操作
        beforeRouteLeave(to, from, next){
            if(this.tools.globalFn.regDevModeFn(this)===0){
                this.$bridge.callHandler("statusBarBgChangeFn","0",(res)=>{
                    // this.tools.globalFn.publicToastFn(this,"客户端传递"+res);
                    if(res==="true"){
                        next();
                    }
                });
            }
            else if(vm.$store.state.isDevMode==1){
                next();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .tabChangeContentBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .shopBasicInfoBox>div.button{
        float: right;
        height: 100%;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        align-items: flex-end;
    }
    .shopBasicInfoBox>div.button p.unFollowButton{
        color: #fff;
        font-size: 12px;
        background-color: #f44;
        padding: 4px 8px;
        border-radius: 100px;
    }
    .shopBasicInfoBox>div.button p.isFollowedButton{
        color: #666;
        font-size: 12px;
        background-color: #fff;
        padding: 4px 8px;
        border-radius: 100px;

    }
    .blockBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: rgba(0,0,0,0.65);
    }
    /*店铺信息*/
    .shopBasicInfoBox{
        width: 100%;
        height: 60px;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
    }
    .shopBasicInfoBox>div.icon{
        width:40px;
        height:40px;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        border-radius: 50%;
        float: left;
        margin-right: 6px;
    }
    .shopBasicInfoBox>div.icon img{
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .shopBasicInfoBox>div.info{
        width: 58%;
        height: 40px;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .shopBasicInfoBox>div.info>p{
        color: #fff;
        font-size: 12px;
    }
    .shopBasicInfoBox>div.info>p:first-child{
        font-size: 12px;
    }
    .shopIndexTopFixedBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: rgba(0,0,0,0.65);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position: fixed;
        left: 0;
        top: 0;
    }
</style>
