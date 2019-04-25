<template>
    <div class="publicAllContentBg none fullHeight whiteBg scrollY" id="shopCenterGoods">
        <!--顶部筛选-->
        <!--<div class="topNavBox" id="topNavBox">-->
            <!--<ul>-->
                <!--<li>-->
                    <!--<p :class="topNavData.first.className" @click="chooseSortFn">{{topNavData.first.choose.name}}<i class="circle"></i></p>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<p @click="salesVolumeSortFn" :class="topNavData.second.className">销量<i class="circle" v-if="topNavData.second.salesVolumeMost"></i><i class="circle down" v-if="topNavData.second.salesVolumeMost===false"></i></p>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<p :class="topNavData.third.className" @click="priceVolumeSortFn">价格<i class="circle" v-if="topNavData.third.priceVolumeMost"></i><i class="circle down" v-if="topNavData.third.priceVolumeMost===false"></i></p>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--列表-->
        <div class="searchResultBox">
            <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===true" class="globalLoadingAnmClass"></van-loading>
            <van-list :offset="goodList.offset" v-model="goodList.loading" :finished="goodList.finished"
                      @load="goodsListOnload"
                      :immediate-check="goodList.immediateCheck"
                      v-if="firstDataStatusAnm===false"
            >
                <ul class="list">
                    <li v-for="item in goodList.list" :key="item.product_id">
                        <div class="goodsListStyle" @click="goToGoodContentFn(item.product_id)">
                            <div class="img">
                                <img :src="item.image" alt="">
                            </div>
                            <div class="goodInfo">
                                <div>
                                    <p class="title">{{item.name}}</p>
                                    <!--<div class="activity">-->
                                        <!--<span class="freeShip">包邮</span>-->
                                        <!--<span class="kill">秒杀</span>-->
                                        <!--<span class="enough">满减</span>-->
                                        <!--<span class="discount">折扣</span>-->
                                    <!--</div>-->
                                </div>

                                <div class="priceAbout">
                                    <span class="price">￥{{item.price.toFixed(2)}}</span>
                                    <!--<span class="num">100人评价</span>-->
                                </div>
                                <!--<div class="shopInfo">-->
                                    <!--<span class="name">哦牛批店铺</span>-->
                                    <!--<span class="into">进入<van-icon name="arrow"></van-icon></span>-->
                                <!--</div>-->
                                <!--加入购物车按钮-->
                                <!--<van-icon name="cart"-->
                                          <!--style="color: #e93b3d;font-size: 12px;position: absolute;bottom: 0;right: 0;border: 1px solid #e93b3d;padding: 3px;border-radius: 50%;"></van-icon>-->
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
        <!--排序筛选-->
        <van-popup v-model="topNavData.first.propsIsShow" transition="none" position="top" :overlay="false" style="top: 189px;">
            <van-cell-group>
                <van-cell :title="item.name" v-for="item in topNavData.first.data" :key="item.id" @click="chooseSortTypeConfirm(item)"></van-cell>
            </van-cell-group>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: 'searchResultPage',
        data() {
            return {
                //排序筛选蒙层样式
                sortOverlayStyle:{
                    "top":"40px"
                },
                //第一次数据请求是否完成
                firstDataStatusAnm:false,
                //顶部视图的数据
                topNavData: {
                    first:{
                        propsIsShow:false,
                        choose:{
                            id:1,
                            name:"综合"
                        },
                        className:"active",
                        data:[
                            {
                                id:1,
                                name:"综合"
                            },
                            {
                                id:2,
                                name:"价格最低"
                            },
                            {
                                id:3,
                                name:"价格最高"
                            },
                            {
                                id:4,
                                name:"最新上架"
                            }
                        ]
                    },
                    second:{
                        //目前选择的是销量在上还是在下
                        salesVolumeMost:true,
                        className:""
                    },
                    third:{
                        //目前选择的是价格在上还是在下
                        priceVolumeMost:true,
                        className:""
                    }
                },
                //本地的商品列表下拉加载数据
                goodList: {
                    //存储列表数据
                    list: [],
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
                //确认组件是否显示
                confirmShowStatus: false,
                //用户输入的搜索值(搜索页面传递过来的)
                userSearchVal: "",
                //热门搜索数据
                hotSearchData: [],
                //历史搜索数据
                searchHistoryData: [],
                //本地存储传递过来的参数(一般是id)
                paramsFromSearchPage: ""
            }
        },
        methods: {
            //跳转到商品详情的方法
            goToGoodContentFn(id) {
                // this.$router.push({name:"goodsContent",params:{id:id}});
                console.log("触发跳转");
                console.log(id);
                this.$router.push("/goods/" + id);
                // this.tools.globalFn.publicLinkToGoodContentFn(id,this);
            },
            //拿到根据渲染dom元素
            getDomFn(){
                return document.getElementById("topNavBox");
            },
            //根据价格排序的方法
            priceVolumeSortFn(){
                //先关闭其他筛选框
                this.topNavData.first.propsIsShow=false;
                //判断目前存储的值是true还是false
                if(this.topNavData.third.priceVolumeMost===true){
                    //是true就查询销量最多在下的排序
                    this.topNavData.third.priceVolumeMost=false;

                }
                else if(this.topNavData.third.priceVolumeMost===false){
                    //是false就查询销量最多在上的排序
                    this.topNavData.third.priceVolumeMost=true;
                }
                //关闭其他的classname
                this.topNavData.first.className="";
                this.topNavData.second.className="";
                this.topNavData.third.className="active";
            },
            //根据销量排序的方法
            salesVolumeSortFn(){
                //先关闭其他筛选框
                this.topNavData.first.propsIsShow=false;
                //判断目前存储的值是true还是false
                if(this.topNavData.second.salesVolumeMost===true){
                    //是true就查询销量最多在下的排序
                    this.topNavData.second.salesVolumeMost=false;

                }
                else if(this.topNavData.second.salesVolumeMost===false){
                    //是false就查询销量最多在上的排序
                    this.topNavData.second.salesVolumeMost=true;
                }
                //关闭其他的classname
                this.topNavData.first.className="";
                this.topNavData.third.className="";
                this.topNavData.second.className="active";
            },
            //确认选择排序的方法
            chooseSortTypeConfirm(item){
                console.log(item);
                //搜索当前选择的值，并且把值放到目前显示的地方
                this.topNavData.first.choose.id=item.id;
                this.topNavData.first.choose.name=item.name;
                //删除其他选项的classname
                this.topNavData.second.className="";
                this.topNavData.third.className="";
                this.topNavData.first.className="active";
                this.topNavData.first.propsIsShow=false;
            },
            //选择排序的方法
            chooseSortFn(){
                console.log("哦牛批");
                if(this.topNavData.first.propsIsShow===false){
                    //显示选择排序的弹窗
                    this.topNavData.first.propsIsShow=true;
                }
                else if(this.topNavData.first.propsIsShow=true){
                    //关闭
                    this.topNavData.first.propsIsShow=false;
                }


            },
            //返回上一页的方法
            backLastPage () {
                this.$router.go(-1);
            },
            //搜索确认
            searchConfirm () {

            },
            //到底部加载新数据的方法
            goodsListOnload () {
                console.log("加载更多");
                this.tools.globalFn.publicAxiosFn(this,{
                    // needLogin:true,
                    url:"/catalog/product/getshopproduct",
                    method:"GET",
                    params:{
                        shop_id:this.$route.params.id,
                        module_type:1,
                        p:this.goodList.current+1,
                        numPerPage:this.goodList.pageSize
                    },
                    success:(res)=>{
                        console.log(res);
                        if (res.data.code === 200) {
                            //循环放数据
                            this.goodList.list = this.goodList.list.concat(res.data.data.productList);
                            //存储当前页数
                            this.goodList.current=parseInt(res.data.data.p);
                            //存储总条数
                            this.goodList.totalCount=res.data.data.count;
                            //存储总页数
                            this.goodList.totalPage=this.tools.globalFn.totalPageCountFn(this.goodList.pageSize,res.data.data.count);
                            this.goodList.loading = false;
                            if(this.goodList.current===this.goodList.totalPage){
                                console.log("已经等于了，不加载");
                                //关闭加载更多
                                this.goodList.finished = true;
                            }
                            console.log("打印总条数");
                            console.log(this.goodList);
                        }
                    }
                });
            },
            //初始化数据
            getFirstData(){
                this.tools.globalFn.publicAxiosFn(this,{
                    // needLogin:true,
                    url:"/catalog/product/getshopproduct",
                    method:"GET",
                    params:{
                        shop_id:this.$route.params.id,
                        module_type:1,
                        p:1,
                        numPerPage:this.goodList.pageSize
                    },
                    success:(res)=>{
                        console.log(res);
                        if (res.data.code === 200) {
                            //循环放数据
                            this.goodList.list = res.data.data.productList;
                            //存储当前页数
                            this.goodList.current=parseInt(res.data.data.p);
                            //存储总条数
                            this.goodList.totalCount=res.data.data.count;
                            //存储总页数
                            this.goodList.totalPage=this.tools.globalFn.totalPageCountFn(this.goodList.pageSize,res.data.data.count);
                            this.goodList.loading = false;
                            if(this.goodList.current===this.goodList.totalPage){
                                console.log("已经等于了，不加载");
                                //关闭加载更多
                                this.goodList.finished = true;
                            }
                            console.log("打印总条数");
                            console.log(this.goodList.list.length);
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
    .searchResultBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        min-height: 50px;
        padding:10px 0;
    }

    .searchResultBox ul.list {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px;
    }

    .searchResultBox ul.list > li {
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

    .searchResultBox ul.list > li:first-child {
        margin-top: 0;
        padding-top: 0;
        border: none;
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
    .topNavBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 10px;
    }
    .topNavBox>ul{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .topNavBox>ul>li{
        width: 33.3%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        float: left;
    }
    .topNavBox>ul>li>p{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 0;
        text-align: center;
        color: #333;
        font-size: 14px;
    }
    .topNavBox>ul>li>p.active{
        color: #e93b3d;
    }
    .circle{
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 2px;
        vertical-align: middle;
        border-top: 4px dashed;
        border-top: 4px solid\9;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
    }
    .circle.down{
        transform: rotate(180deg);
    }
</style>
