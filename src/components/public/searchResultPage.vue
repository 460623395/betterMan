<template>
    <div class="publicAllContentBg fullHeight" id="searchResultPage">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass"
                     @click-left="backLastPage"
                     left-text="返回"
                     fixed
        >
<!--            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>-->
            <van-field left-icon="search" slot="title" v-model="userSearchVal" readonly></van-field>
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa" @click="searchConfirm">搜索</span>-->
        </van-nav-bar>
        <!--<div @click="onp">点这</div>-->
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
        <!--<p :class="topNavData.third.className" @click="topNavData.third.screenIsShow=true">筛选</p>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--列表-->
        <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===true" class="globalLoadingAnmClass"></van-loading>
        <div class="searchResultBox" v-if="firstDataStatusAnm===false&&goodList.list.length>0">
            <van-list :offset="goodList.offset" v-model="goodList.loading" :finished="goodList.finished"
                      @load="goodsListOnload"
                      :immediate-check="goodList.immediateCheck"
            >
                <ul class="list">
                    <li v-for="(item,index) in goodList.list" :key="index">
                        <div class="goodsListStyle">
                            <div class="img" @click="goToGoodContentFn(item.product_id)">
                                <img :src="item.image" alt="">
                            </div>
                            <div class="goodInfo">
                                <p class="title" @click="goToGoodContentFn(item.product_id)">{{item.name}}</p>
                                <!--<div class="activity">-->
                                <!--<span class="freeShip">包邮</span>-->
                                <!--<span class="kill">秒杀</span>-->
                                <!--<span class="enough">满减</span>-->
                                <!--<span class="discount">折扣</span>-->
                                <!--</div>-->
                                <div class="priceAbout">
                                    <span class="price">{{"￥"+(item.price).toFixed(2)}}</span>
                                    <!--<span class="num">100人评价</span>-->
                                </div>
                                <!--<div class="shopInfo">-->
                                <!--<span class="name">哦牛批店铺</span>-->
                                <!--<span class="into">进入<van-icon name="arrow"></van-icon></span>-->
                                <!--</div>-->
                                <!--加入购物车按钮-->
                                <!--<van-icon @click="getIntoShopCartFn(item)" name="cart"-->
                                          <!--style="color: #e93b3d;font-size: 16px;position: absolute;bottom: 0;right: 0;border: 1px solid #e93b3d;padding: 3px;border-radius: 50%;"></van-icon>-->
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
        <!--暂无提示-->
        <div class="noDataLine marginTop" v-if="firstDataStatusAnm===false&&goodList.list.length===0">
            <p class="text">暂无数据</p>
        </div>
        <!--排序筛选-->
        <van-popup v-model="topNavData.first.propsIsShow" transition="none" position="top" :overlay="false" style="top: 86px;">
            <van-cell-group>
                <van-cell :title="item.name" v-for="item in topNavData.first.data" :key="item.id" @click="chooseSortTypeConfirm(item)"></van-cell>
            </van-cell-group>
        </van-popup>
        <!--筛选侧边栏-->
        <van-popup v-model="topNavData.third.screenIsShow" position="right" style="top: 86px;">
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
                //搜索请求配置
                getListPageOptions: {
                    //总页数
                    totalPage: 0,
                    //当前页
                    page: 1,
                    //每页数量
                    pageSize: 10,
                    //总数量
                    totalCount:0
                },
                //排序筛选蒙层样式
                sortOverlayStyle: {
                    "top": "40px"
                },
                //第一次数据请求是否完成
                firstDataStatusAnm: true,
                //顶部视图的数据
                topNavData: {
                    first: {
                        propsIsShow: false,
                        choose: {
                            id: 1,
                            name: "综合"
                        },
                        className: "active",
                        data: [
                            {
                                id: 1,
                                name: "综合"
                            },
                            {
                                id: 2,
                                name: "价格最低"
                            },
                            {
                                id: 3,
                                name: "价格最高"
                            },
                            {
                                id: 4,
                                name: "最新上架"
                            }
                        ]
                    },
                    second: {
                        //目前选择的是销量在上还是在下
                        salesVolumeMost: true,
                        className: ""
                    },
                    third: {
                        //筛选框是否显示
                        screenIsShow: false,
                        className: ""
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
                    offset: 300
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
            //加入购物车的方法
            getIntoShopCartFn(item) {
                //检测是否登录
                if (this.tools.globalFn.isLoginFn() === false) {
                    //跳转登录页面
                    //给xx传值
                    this.$bridge.callHandler('toLogin');
                    return false;
                }
                console.log(item);
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        url: "/checkout/cart/add",
                        data: {
                            product_id: item.product_id,
                            qty: 1
                        },
                        success: (res) => {
                            //console.log(res);
                            if (res.data.code === 200) {
                                this.tools.globalFn.publicToastFn(this, "加入成功");
                            }
                            else {
                                this.tools.globalFn.publicToastFn(this, "加入失败");
                            }
                        },
                        fail: (err) => {
                            console.log(err);
                        }
                    }
                )
            },
            //跳转到商品详情的方法
            goToGoodContentFn(id) {
                // this.$router.push({name:"goodsContent",params:{id:id}});
                console.log("触发跳转");
                console.log(id);
                this.$router.push("/goods/" + id);
                // this.tools.globalFn.publicLinkToGoodContentFn(id,this);
            },
            //拿到根据渲染dom元素
            getDomFn() {
                return document.getElementById("topNavBox");
            },
            //根据销量排序的方法
            salesVolumeSortFn() {
                //先关闭其他筛选框
                this.topNavData.first.propsIsShow = false;
                //判断目前存储的值是true还是false
                if (this.topNavData.second.salesVolumeMost === true) {
                    //是true就查询销量最多在下的排序
                    this.topNavData.second.salesVolumeMost = false;

                }
                else if (this.topNavData.second.salesVolumeMost === false) {
                    //是false就查询销量最多在上的排序
                    this.topNavData.second.salesVolumeMost = true;
                }
                //关闭其他的classname
                this.topNavData.first.className = "";
                this.topNavData.third.className = "";
                this.topNavData.second.className = "active";
            },
            //确认选择排序的方法
            chooseSortTypeConfirm(item) {
                console.log(item);
                //搜索当前选择的值，并且把值放到目前显示的地方
                this.topNavData.first.choose.id = item.id;
                this.topNavData.first.choose.name = item.name;
                //删除其他选项的classname
                this.topNavData.second.className = "";
                this.topNavData.third.className = "";
                this.topNavData.first.className = "active";
                this.topNavData.first.propsIsShow = false;
            },
            //选择排序的方法
            chooseSortFn() {
                console.log("哦牛批");
                if (this.topNavData.first.propsIsShow === false) {
                    //显示选择排序的弹窗
                    this.topNavData.first.propsIsShow = true;
                }
                else if (this.topNavData.first.propsIsShow = true) {
                    //关闭
                    this.topNavData.first.propsIsShow = false;
                }
            },
            //返回上一页的方法
            backLastPage() {
                //判断当前是否是被新开启的webview从而做不同操作
                if(this.$store.state.isNewWebView===false){
                    this.$router.go(-1);
                    return;
                }
                this.$bridge.callHandler("closeCurrentWebviewFn");

            },
            //搜索确认
            searchConfirm() {

            },
            //到底部加载新数据的方法
            goodsListOnload() {
                console.log("加载更多");
                //读取当前的类型
                if(JSON.parse(JSON.parse(localStorage.shopSaveObject).globalSearchVal).type==="menuId"){
                    //如果是类型id
                    //根据当前存储id搜索下一页
                    this.tools.globalFn.publicAxiosFn(this,
                        {
                            url: "/catalog/category/product",
                            method: "GET",
                            params: {
                                categoryId: JSON.parse(localStorage.globalSearchVal).val,
                                p: parseInt(this.getListPageOptions.page) + 1,
                                numPerPage: this.getListPageOptions.pageSize,
                                module_type:1
                            },
                            success: (res) => {
                                //console.log(res);
                                if (res.data.code === 200) {
                                    //拼接当前数组
                                    this.goodList.list = this.goodList.list.concat(res.data.data.products);
                                    //存储当前page
                                    this.getListPageOptions.page = parseInt(res.data.data.p);
                                    //计算当前总页数并存储
                                    this.getListPageOptions.totalPage = this.tools.globalFn.totalPageCountFn(this.getListPageOptions.pageSize, res.data.data.count);
                                    this.goodList.loading = false;
                                    //判断当前页数是否等于总页数，如果是，关闭下拉加载刷新的触发
                                    if (this.getListPageOptions.totalPage === this.getListPageOptions.page) {
                                        this.goodList.finished = true;
                                    }
                                    //关闭动画
                                    this.firstDataStatusAnm = false;
                                    // console.log("当前加载完后的对象");
                                    // console.log(this.getListPageOptions);
                                }
                            }
                        }
                    );
                }
                else if(JSON.parse(JSON.parse(localStorage.shopSaveObject).globalSearchVal).type==="keyword"){
                    // console.log("来自关键字的加载更多");
                    //根据当前存储关键字搜索下一页
                    //搜索关键字
                    this.tools.globalFn.publicAxiosFn(this,
                        {
                            url: "/catalogsearch/index/product",
                            method: "GET",
                            params: {
                                p: this.getListPageOptions.page+1,
                                numPerPage: this.getListPageOptions.pageSize,
                                module_type:1,
                                q:JSON.parse(JSON.parse(localStorage.shopSaveObject).globalSearchVal).val
                            },
                            success: (res) => {
                                //console.log(res);
                                if (res.data.code === 200 && res.data.data.productList !== null && res.data.data.productList.length > 0) {
                                    //存储数据
                                    this.goodList.list = this.goodList.list.concat(res.data.data.productList);
                                    //存储当前page
                                    this.getListPageOptions.page = res.data.data.p;
                                    //计算当前总页数并存储
                                    this.getListPageOptions.totalPage = this.tools.globalFn.totalPageCountFn(this.getListPageOptions.pageSize, res.data.data.count);
                                    this.firstDataStatusAnm = false;
                                    //判断当前页数是否等于总页数，如果是，关闭下拉加载刷新的触发
                                    if (this.getListPageOptions.totalPage === 1) {
                                        //如果等于1，直接关闭触发
                                        this.goodList.loading = false;
                                        this.goodList.finished = true;
                                    }
                                    else if (this.getListPageOptions.totalPage === this.getListPageOptions.page) {
                                        this.goodList.loading = false;
                                        this.goodList.finished = true;
                                    }
                                    //统一关闭加载动画
                                    this.goodList.loading = false;
                                    // console.log("打印配置");
                                    // console.log(this.getListPageOptions);
                                }
                                else {
                                    //置空数据
                                    this.goodList.list = [];
                                    this.firstDataStatusAnm = false;
                                }
                            }
                        }
                    );
                }

            },
            //拿到初始数据
            getFirstData() {
                /*拿到传递的全局搜索值*/
                /*搜索值类型规定*/
                /*
                * `type`  '类型[1=>商品,2=>店铺,3=>指定页,4=>活动页,5=>商品分类]',
                * */
                /*
                    把传递过来的字符串转化为json对象
                    参数：
                    type：传递过来的搜素类型
                    val:传递过来的搜索值

                    type：类型
                    1.keyword:关键字类型(比如用户输入);
                    2.menuId:分类选择,传递过来分类id
                    3.goodId:单独goodId
                    4.proId:活动id，活动下包括哪些商品
                    5.areaId:版块id，列如首页版块
                    val：值
                    {
                        type:'keyword',
                        val:'onp'
                    }
                */
                //如果是否启用新数据是false的话
                let searchObj = JSON.parse(JSON.parse(localStorage.shopSaveObject).globalSearchVal);
                // console.log(localStorage.globalSearchVal);
                console.log(searchObj);
                if (searchObj.type === "menuId"||searchObj.type == 5) {
                    this.userSearchVal="";
                    //搜索菜单id
                    this.tools.globalFn.publicAxiosFn(this,
                        {
                            url: "/catalog/category/product",
                            method: "GET",
                            params: {
                                categoryId: searchObj.val,
                                p: this.getListPageOptions.page,
                                numPerPage: this.getListPageOptions.pageSize,
                                module_type:1
                            },
                            success: (res) => {
                                //console.log(res);
                                if (res.data.code === 200 && res.data.data.products !== null && res.data.data.products.length > 0) {
                                    //存储数据
                                    this.goodList.list = res.data.data.products;
                                    //存储当前page
                                    this.getListPageOptions.page = res.data.data.p;
                                    //计算当前总页数并存储
                                    this.getListPageOptions.totalPage = this.tools.globalFn.totalPageCountFn(this.getListPageOptions.pageSize, res.data.data.count);
                                    this.firstDataStatusAnm = false;
                                    //判断当前页数是否等于总页数，如果是，关闭下拉加载刷新的触发
                                    if (this.getListPageOptions.totalPage === 1) {
                                        //如果等于1，直接关闭触发
                                        this.goodList.loading = false;
                                        this.goodList.finished = true;
                                    }
                                    else if (this.getListPageOptions.totalPage === this.getListPageOptions.page) {
                                        this.goodList.loading = false;
                                        this.goodList.finished = true;
                                    }
                                }
                                else {
                                    //置空数据
                                    this.goodList.list = [];
                                    this.firstDataStatusAnm = false;
                                }
                            }
                        }
                    );
                }
                else if(searchObj.type === "keyword"||searchObj.type == 6){
                    console.log("置空数据");
                    this.userSearchVal=searchObj.val;
                    //置空数据
                    // this.goodList.list = [];
                    // this.firstDataStatusAnm = false;
                    //搜索关键字
                    this.tools.globalFn.publicAxiosFn(this,
                        {
                            needLogin:this.tools.globalFn.isLoginFn()===true?true:false,
                            url: "/catalogsearch/index/product",
                            method: "GET",
                            params: {
                                p: 1,
                                numPerPage: this.getListPageOptions.pageSize,
                                module_type:1,
                                q:searchObj.val
                            },
                            success: (res) => {
                                // //console.log(res);
                                if (res.data.code === 200 && res.data.data.productList !== null && res.data.data.productList.length > 0) {
                                    //存储数据
                                    this.goodList.list = res.data.data.productList;
                                    //存储当前page
                                    this.getListPageOptions.page = res.data.data.p;
                                    //计算当前总页数并存储
                                    this.getListPageOptions.totalPage = this.tools.globalFn.totalPageCountFn(this.getListPageOptions.pageSize, res.data.data.count);
                                    this.firstDataStatusAnm = false;
                                    //判断当前页数是否等于总页数，如果是，关闭下拉加载刷新的触发
                                    if (this.getListPageOptions.totalPage === 1) {
                                        //如果等于1，直接关闭触发
                                        this.goodList.loading = false;
                                        this.goodList.finished = true;
                                    }
                                    else if (this.getListPageOptions.totalPage === this.getListPageOptions.page) {
                                        this.goodList.loading = false;
                                        this.goodList.finished = true;
                                    }
                                }
                                else {
                                    //置空数据
                                    this.goodList.list = [];
                                    this.firstDataStatusAnm = false;
                                }
                            }
                        }
                    );
                }

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
            //如果是来自分类，那么就不需要启用旧数据，重新读取
            if (from.name === "menu") {
                to.meta.useOldData = false;
            }
            else if (from.name === "goodsContent") {
                //如果是来自商品详情,那么就启用旧数据
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
                this.goodList.finished = false;
                this.firstDataStatusAnm = true;
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
    .searchResultBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        min-height: 50px;
        background-color: #fff;
        padding-top: 10px;
    }

    .searchResultBox ul.list {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px 10px 10px;
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

    .topNavBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 10px;
    }

    .topNavBox > ul {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .topNavBox > ul > li {
        width: 33.3%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        float: left;
    }

    .topNavBox > ul > li > p {
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

    .topNavBox > ul > li > p.active {
        color: #e93b3d;
    }

    .circle {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 2px;
        vertical-align: middle;
        border-top: 4px dashed;
        border-top: 4px solid \9;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
    }

    .circle.down {
        transform: rotate(180deg);
    }
</style>
