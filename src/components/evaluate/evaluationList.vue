<template>
    <div class="publicAllContentBg" id="evaluationList">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="评价列表"
                     @click-left="backLastPage"
                     left-arrow
                     left-text="返回"
                     fixed>
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--评论类型筛选-->
        <div class="evaTypeBox" v-if="topNavShowStatus">
            <ul>
                <li v-for="(item,index) in evaTypeData" :key="index">
                    <p :class="item.className.join('')" @click="chooseEvaTypeFn(index)">{{item.typeName}}</p>
                </li>
            </ul>
        </div>
        <!--评论列表-->
        <div class="evaListBg">
            <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===false"
                         class="globalLoadingAnmClass"></van-loading>
            <van-list :offset="evaListData.offset" v-model="evaListData.loading" :finished="evaListData.finished"
                      @load="evaListOnload"
                      :immediate-check="evaListData.immediateCheck"
                      v-if="firstDataStatusAnm===true"
            >
                <!--评论列表-->
                <ul class="evaListBox">
                    <li v-for="item in evaListData.list" :key="item.id">
                        <div class="evaListStyle">
                            <!--顶部用户信息和评分-->
                            <div class="header">
                                <div class="img" :style="returnUserIconImgFn(item.head_img)">
                                    <!--<img :src="item.userInfo.icon" alt="">-->
                                </div>
                                <div class="info">
                                    <h3>{{item.name}}</h3>
                                    <van-rate
                                            v-model="item.rate_star"
                                            :count="5"
                                            :size="14"
                                            disabled-color="#ffa133"
                                            disabled
                                    ></van-rate>
                                </div>
                            </div>
                            <!--评论内容-->
                            <p class="content">{{item.review_content}}</p>
                            <!--图片列表-->
                            <ul class="imgList" v-if="item.review_image.length>0">
                                <li v-for="(img,index) in item.review_image" :key="index" @click="checkEvaImgBanner(item.review_image,index)">
                                    <img :src="img" alt="">
                                </li>
                            </ul>
                            <!--时间和规格-->
                            <div class="bottom">
                                <p class="left">{{item.product_sku_name}}</p>
                                <p class="right">{{item.review_date}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
        <!--评论图片弹窗-->
        <van-popup v-model="evaPicListPropData.show" :overlay="false" style="width: 100%;height: 100%;overflow-y:scroll;overflow-x:hidden;background-color: rgba(0,0,0,0.85)">
            <!--关闭按钮-->
            <div class="evaPicListPropCloseButton">
                <van-icon name="close" style="color: #bfbfbf;" @click="evaPicListPropData.show=false"></van-icon>
            </div>
            <div class="evaPicListPropBox">
                <van-swipe :autoplay="evaPicListPropData.evaPicBannerOptions.autoplay"
                           :loop="evaPicListPropData.evaPicBannerOptions.loop"
                           :show-indicators="evaPicListPropData.evaPicBannerOptions.showIndicators"
                           :initial-swipe="evaPicListPropData.evaPicBannerOptions.initialSwipe"
                >
                    <van-swipe-item v-for="item in evaPicListPropData.list" :key="item.id">
                        <div class="evaPicListBox">
                            <img :src="item" alt="">
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: 'evaluationList',
        data() {
            return {
                //顶部条件筛选是否显示
                topNavShowStatus:false,
                //评论图片弹窗数据
                evaPicListPropData:{
                    list:[],
                    show:false,
                    //banner设置
                    evaPicBannerOptions:{
                        //是否循环播放
                        loop:true,
                        //自动播放间隔时间
                        autoplay:0,
                        //是否展示指示器
                        showIndicators:false,
                        //默认选中的
                        initialSwipe:0
                    }
                },
                //目前选中的评论类型下标
                nowSelectEvaType:0,
                //评论类型数据
                evaTypeData:[
                    {
                        id:1,
                        typeName:"全部",
                        className:["active"]
                    },
                    {
                        id:2,
                        typeName:"有图",
                        className:[]
                    },
                    {
                        id:3,
                        typeName:"差评",
                        className:[]
                    }
                ],
                //本地的商品列表下拉加载数据
                evaListData: {
                    //存储列表数据
                    list: [],
                    //当前选中页数
                    current:0,
                    //总页数
                    totalPage:0,
                    //总条数
                    totalCount:0,
                    //每页条数
                    pageSize:1,
                    //是否显示加载中
                    loading: false,
                    //是否已经全部加载完成
                    finished: false,
                    //第一次进入是否加载一次
                    immediateCheck: false,
                    //多少是offset
                    offset: 300
                },
                //第一次数据请求是否完成
                firstDataStatusAnm: false
            }
        },
        methods: {
            //return用户头像的方法
            returnUserIconImgFn(url){
                console.log(url);
                return "background-image:url('"+url+"')";
            },
            //查看banner的方法
            checkEvaImgBanner(imgList,index){
                //imgList:当前选择的这个评论的所有图片列表
                //index:当前点击的这个图片的下标
                console.log(imgList);
                console.log(index);
                //把数组放入弹窗banner数据中
                this.evaPicListPropData.list=imgList;
                this.evaPicListPropData.evaPicBannerOptions.initialSwipe=index;
                //显示弹窗
                this.evaPicListPropData.show=true;
            },
            //筛选评论类型的方法
            chooseEvaTypeFn(index){
                //存储下标
                this.nowSelectEvaType=index;
                console.log(index);
                for(let key in this.evaTypeData){
                    this.evaTypeData[key].className.splice(0,this.evaTypeData[key].className.length);
                }
                this.evaTypeData[index].className.push("active");
                //底部加载动画开启
                this.firstDataStatusAnm=false;
                //把finsh改成false
                this.evaListData.finished = false;
                //调用通用分类查询的方法
                this.publicSearchTypeFn();
            },
            //公用的分类查询方法
            publicSearchTypeFn(){
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/catalog/reviewproduct/packlist",
                    method:"GET",
                    params:{
                        product_id:this.$route.params.id,
                        p:1,
                        numPerPage:this.evaListData.pageSize,
                        //筛选条件
                        filter:this.nowSelectEvaType
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.evaListData.list=res.data.data.reviewList;
                            //存储当前页数
                            this.evaListData.current=parseInt(res.data.data.p);
                            //存储总页数
                            this.evaListData.totalPage=this.tools.globalFn.totalPageCountFn(this.evaListData.pageSize,res.data.data.count);
                            this.evaListData.loading = false;
                            if(this.evaListData.current===this.evaListData.totalPage){
                                console.log("已经等于了，不加载");
                                //关闭加载更多
                                this.evaListData.finished = true;
                            }
                            //渲染顶部
                            // this.topNavShowStatus=true;
                            //渲染列表
                            this.firstDataStatusAnm=true;
                        }
                    }
                });
            },
            //返回当前级别文字的方法
            returnLvTextFn(val){
                console.log(val);
                if(val===0){
                    return "";
                }
                else if(val===1){
                    return "非常差";
                }
                else if(val===2){
                    return "差";
                }
                else if(val===3){
                    return "一般";
                }
                else if(val===4){
                    return "好";
                }
                else if(val===5){
                    return "非常好";
                }
            },
            //下拉加载更多数据的方法
            evaListOnload(){
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/catalog/reviewproduct/packlist",
                    method:"GET",
                    params:{
                        product_id:this.$route.params.id,
                        p:this.evaListData.current+1,
                        numPerPage:this.evaListData.pageSize,
                        //筛选条件
                        filter:this.nowSelectEvaType
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.evaListData.list=this.evaListData.list.concat(res.data.data.reviewList);
                            //存储当前页数
                            this.evaListData.current=parseInt(res.data.data.p);
                            //存储总页数
                            this.evaListData.totalPage=this.tools.globalFn.totalPageCountFn(this.evaListData.pageSize,res.data.data.count);
                            this.evaListData.loading = false;
                            if(this.evaListData.current===this.evaListData.totalPage){
                                console.log("已经等于了，不加载");
                                //关闭加载更多
                                this.evaListData.finished = true;
                            }
                            //渲染顶部
                            // this.topNavShowStatus=true;
                            //渲染列表
                            this.firstDataStatusAnm=true;
                        }
                    }
                });
            },
            //返回上一页的方法
            backLastPage () {
               this.$router.go(-1);
            },
            //初始化数据
            getFirstData(){
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/catalog/reviewproduct/packlist",
                    method:"GET",
                    params:{
                        product_id:this.$route.params.id,
                        p:1,
                        numPerPage:this.evaListData.pageSize,
                        //筛选条件，默认全部
                        filter:0
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.evaListData.list=res.data.data.reviewList;
                            //存储当前页数
                            this.evaListData.current=parseInt(res.data.data.p);
                            //存储总页数
                            this.evaListData.totalPage=this.tools.globalFn.totalPageCountFn(this.evaListData.pageSize,res.data.data.count);
                            this.evaListData.loading = false;
                            if(this.evaListData.current===this.evaListData.totalPage){
                                console.log("已经等于了，不加载");
                                //关闭加载更多
                                this.evaListData.finished = true;
                            }
                            console.log(this.evaListData);
                            //渲染顶部
                            this.topNavShowStatus=true;
                            //渲染列表
                            this.firstDataStatusAnm=true;

                        }
                    }
                });
            }
        },
        created() {
            //创建页面时获取数据
            // this.firstDataStatusAnm=true;
            this.getFirstData();
        },
        mounted() {

        },
        watch: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*评论列表的背景*/
    .evaTypeBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px;
        margin-bottom: 10px;
    }
    .evaTypeBox>ul{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
    }
    .evaTypeBox>ul>li{
        margin-left: 5px;
    }
    .evaTypeBox>ul>li:first-child{
        margin-left: 0;
    }
    .evaTypeBox>ul>li>p{
        border-radius: 2px;
        padding: 4px 12px;
        color: #cecece;
        border: 1px solid #cecece;
        font-size: 14px;
    }
    .evaTypeBox>ul>li>p.active{
        color: #e4393c;
        border: 1px solid #e4393c;
    }
    /*评论列表*/
    .evaListBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .evaListBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .evaListBox>li{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 10px;
        background-color: #fff;
    }
    .evaListBox>li:first-child{
        margin-top: 0;
    }
    .evaListStyle{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .evaListStyle .van-rate>:first-child{
        padding-left: 0!important;
    }
    .evaListStyle>div.header{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*display: flex;*/
        margin-bottom: 10px;
    }
    .evaListStyle>div.header>div.img{
        width: 10%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        border-radius: 50%;
        /*padding-top: 12%;*/
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        float: left;
    }
    .evaListStyle>div.header>div.img::before{
        padding-top: 100%;
        content: "";
        display: block;
    }
    .evaListStyle>div.header>div.img img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .evaListStyle>div.header>div.info{
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        /*margin-left: 10px;*/
        float: right;
        /*display: inline-block;*/
        width: 88%;
        /*display: table-cell;*/
        /*display: flex;*/
        /*flex-direction:column;*/
        /*justify-content: space-between;*/
    }
    .evaListStyle>div.header>div.info>h3{
        color: #333;
        font-size: 14px;
        font-weight: normal;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .evaListStyle>p.content{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .evaListStyle>ul.imgList{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
        display: flex;
    }
    .evaListStyle>ul.imgList>li{
        width: 25%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-left: 5px;
        align-items: center;
        display: flex;
    }
    /*.evaListStyle>ul.imgList>li::before{*/
    /*padding-top: 100%;*/
    /*content: "";*/
    /*display: block;*/
    /*}*/
    .evaListStyle>ul.imgList>li>img{
        width: 100%;
        display: block;
    }
    /*弹出banner设置*/
    .evaPicListBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    .evaPicListBox>img{
        display: block;
        width: 100%;
    }
    .evaPicListPropBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 50px 0;
    }
    .evaPicListPropBox .van-swipe{
        height: 100%!important;
    }
    .evaPicListPropCloseButton{
        padding: 12px;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        right: 0;
        top:0;
    }
    .evaPicListPropCloseButton .van-icon{
        font-size: 20px;
    }
    .evaListStyle>div.bottom{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    .evaListStyle>div.bottom>p.left{
        color: #999;
        font-size: 12px;
    }
    .evaListStyle>div.bottom>p.right{
        color: #999;
        font-size: 12px;
    }
</style>
