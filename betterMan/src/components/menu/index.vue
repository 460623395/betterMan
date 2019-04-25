<template>
    <div class="publicAllContentBg" id="menu">
        <!--头部导航-->
        <van-nav-bar title="商品分类" class="globalNavBarHeaderClass"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     fixed
        >
            <!--<van-icon name="cart" slot="right" class="globalNavBarIconClass"></van-icon>-->
        </van-nav-bar>
        <div class="shopMenuBox">
            <!--侧边栏-->
            <div class="left">
                <van-loading type="spinner" color="black" v-if="leftDataLoadingAnmStatus===true" class="globalLoadingAnmClass"></van-loading>
                <van-badge-group ref="sidebar" v-if="leftDataLoadingAnmStatus===false" :active-key="sideBarActiveKey" style="width:100%;height: 100%;background-color: #fff;overflow-y: scroll;">
                    <van-badge v-for="item in sideBarListData" :title="item.name" :key="item._id" @click="sideBarOnClickFn(item)"></van-badge>
                </van-badge-group>
            </div>
            <!--右侧内容模块-->
            <div class="right">
                <!--加载动画-->
                <van-loading type="spinner" color="black" v-if="rightDataLoadingAnmStatus===true" class="globalLoadingAnmClass"></van-loading>
                <!--banner模块-->
                <van-swipe :autoplay="3000" style="margin-bottom: 10px;" v-if="rightDataLoadingAnmStatus===false">
                    <van-swipe-item v-for="item in bannerList" :key="item.id">
                        <div class="publicBannerBox" @click="bannerLinkFn(item)">
                            <img :src="item.imgUrl" alt="" :title="item.name" />
                        </div>
                    </van-swipe-item>
                </van-swipe>
                <!--二级菜单列表-->
                <ul class="lv2MenuListBox" v-if="rightDataLoadingAnmStatus===false">
                    <li class="" v-for="lv2 in lv2MenuList">
                        <div class="header">{{lv2.name}}</div>
                        <ul class="lv2MenuList">
                            <li v-for="item in lv2.child" :key="item._id">
                                <div class="lv2MenuListStyle" @click="clickLv2MenuFn(item)">
                                    <div class="img">
                                        <img :src="item.image" alt="" />
                                    </div>
                                    <p>{{item.name}}</p>
                                </div>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'orderList',
        data() {
            return {
                //左侧加载动画是否显示
                leftDataLoadingAnmStatus: true,
                //右侧加载动画是否显示
                rightDataLoadingAnmStatus: true,
                //侧边栏目前选中的下表
                sideBarActiveKey: 0,
                //侧边栏数据
                sideBarListData: [

                ],
                //banner列表数据
                bannerList: [{
                    id: 1,
                    imgUrl: require("../../assets/images/shoppingMall/index/banner1.png"),
                    name: "banner1"
                }
                ],
                //二级分类列表
                lv2MenuList: [
                    // {
                    //     id: 1,
                    //     imgUrl: require("../../assets/images/shoppingMall/index/banner1.png"),
                    //     name: "分类1"
                    // }
                ]
            }
        },
        methods: {
            //二级分类点击事件
            clickLv2MenuFn(item) {
                console.log(item);
                //跳转搜索结果页面
                console.log(item._id);
                this.tools.globalFn.publicChangeLocalStorageFn("globalSearchVal",JSON.stringify(
                    {
                        "type":"menuId",
                        "val":item._id
                    }
                ),"add");
                // localStorage.globalSearchVal=JSON.stringify(
                //     {
                //         "type":"menuId",
                //         "val":item._id
                //     }
                // );
                this.$router.push({name:'searchResult'});
            },
            //banner点击事件
            bannerLinkFn(item) {
                console.log(item);
            },
            //侧边栏点击事件
            sideBarOnClickFn(item) {
                console.log(item);
                // console.log(item);
                // console.log(this.sideBarListData);
                // console.log(this.sideBarListData[this.sideBarListData.indexOf(item)].child);
                // console.log(this.sideBarListData.indexOf(item));
                if(this.sideBarActiveKey != this.sideBarListData.indexOf(item)) {
                    this.sideBarActiveKey = this.sideBarListData.indexOf(item);
                    console.log(this.sideBarActiveKey);
                    //开始加载动画
                    this.rightDataLoadingAnmStatus = true;
                    //循环加载二级和三级数据
                    // console.log(this.sideBarListData[this.sideBarListData.indexOf(item)].child);
                    this.lv2MenuList=item.child;
                    //关闭加载动画
                    this.rightDataLoadingAnmStatus = false;
                    // setTimeout(() =>{
                    //     this.rightDataLoadingAnmStatus = false;
                    // }, 100);
                }

            },
            //返回上一页的方法
            backLastPage() {
                this.$router.go(-1);
                // this.$bridge.callHandler("tabBarStatus","true", (res)=> {
                //     if(res==="true"){
                //         // alert("应该返回到首页");
                //
                //         // Vue.prototype.$router.go(-1);
                //     }
                // });
            },
            //进入购物车的方法
            goToCartPage() {
                //检测是否登录
                if(this.tools.globalFn.isLoginFn()===false){
                    //如果尚未登录，跳转登录
                    this.$bridge.callHandler('toLogin');
                    return false;
                }
                this.$router.push("/cart");
            },
            //获取栏目数据的方法
            getFirstData() {
                //请求栏目数据
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        // headerNeed:"noNeed",
                        needLogin:false,
                        url:"/catalog/category/list",
                        method:"GET",
                        success:(res)=>{
                            console.log(res);
                            // alert(res);
                            if(res.data.code===200){
                                console.log("成功循环");
                                //请求成功，放置数据一级
                                this.sideBarListData=res.data.data;
                                //放置二级数据
                                this.lv2MenuList=res.data.data[0].child;
                                //清除动画
                                this.leftDataLoadingAnmStatus=false;
                                this.rightDataLoadingAnmStatus = false;
                                // console.log(this.leftDataLoadingAnmStatus,this.rightDataLoadingAnmStatus)
                            }
                        }
                    }
                );
                // setTimeout(()=>{
                //     this.leftDataLoadingAnmStatus = false;
                // }, 500);
                // setTimeout(()=> {
                //     this.rightDataLoadingAnmStatus = false;
                // }, 500)
            }
        },
        created() {
            //创建页面时获取数据
            this.getFirstData();
        },
        mounted() {

        },
        watch: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #menu{
        height: 100%;
    }
    .shopMenuBox {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
    }

    .shopMenuBox div.right {
        float: right;
        width: 76%;
        height: 100%;
        overflow-y: scroll;
        box-sizing: border-box;
        padding: 10px;
        position: relative;
        min-height: 100px;
    }

    .lv2MenuList {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        padding: 10px;
        background-color: #fff;
        /*border-radius: 10px;*/
    }

    .lv2MenuList>li {
        width: 33.3%;
        float: left;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        padding: 2px 2px;
        margin-top: 4px;
    }
    .lv2MenuList>li:first-child{
        margin-top: 0;
    }
    .lv2MenuList>li:nth-child(2){
        margin-top: 0;
    }
    .lv2MenuList>li:nth-child(3){
        margin-top: 0;
    }
    .lv2MenuListStyle img {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .lv2MenuListStyle>div.img{
        width: 100%;
        padding-top: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 50%;
        position: relative;
        margin-bottom: 4px;

    }
    .lv2MenuListStyle p {
        display: block;
        width: 100%;
        text-align: center;
        color: #333;
        font-size: 12px;
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
        /*overflow: hidden;*/
    }

    .shopMenuBox>div.left {
        float: left;
        width: 24%;
        height: 100%;
        position: relative;
    }
    .van-badge{
        background-color: #fff;
    }
    .van-badge--select{
        background-color: #f1f1f1!important;
    }
    [class*=van-badge]::after {
        border: none!important;
    }
    /*.van-badge-group,.van-badge-group .van-badge{
        transition: all ease .3s;
    }*/
    .lv2MenuListBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .lv2MenuListBox>li{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
    }
    .lv2MenuListBox>li:first-child{
        margin-top: 0;
    }
    .lv2MenuListBox div.header{
        color: #333;
        font-size: 14px;
        margin-bottom: 6px;

    }
</style>
