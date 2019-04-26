<template>
    <div class="publicAllContentBg index" id="index">
        <!--头部导航-->
        <van-nav-bar title="变福侠商城"
                     class="globalNavBarHeaderClass"
                     style="z-index:99999"
                     @click-left="goToUserCenterFn"
                     fixed
        >
            <van-icon name="contact" slot="left" class="globalNavBarIconClass"></van-icon>
        </van-nav-bar>
        <!--头部二次导航-->
        <van-nav-bar style="top:45px;z-index:99999"
                     class="globalNavBarHeaderClass"
                     @click-left="openMenuFn"
                     @click-right="goToShopCartPage"
                     fixed
        >
            <van-icon name="wap-nav" slot="left" class="globalNavBarIconClass"></van-icon>
            <van-field left-icon="search" placeholder="搜索你想要的" slot="title" readonly @click="goToSearchPage"></van-field>
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa" @click="searchConfirm">搜索</span>-->
            <van-icon name="cart" slot="right" class="globalNavBarIconClass"></van-icon>
        </van-nav-bar>
        <!--banner-->
        <div class="publicBannerBox needLoading" style="margin-bottom: 10px">
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.topBanner===true"
                         class="globalLoadingAnmClass"></van-loading>
            <!--<van-swipe :autoplay="3000" v-if="pageComAnmShowStatus.topBanner===false">-->
            <!--<van-swipe-item v-for="item in bannerList" :key="item.id">-->
            <!--<div class="shoppingMallIndexBannerBox" @click="indexBannerLinkFn(item)">-->
            <!--<img :src="item.imgUrl" alt="" :title="item.name"/>-->
            <!--</div>-->
            <!--</van-swipe-item>-->
            <!--</van-swipe>-->
            <swiper :options="indexTopSwiperOption" v-if="pageComAnmShowStatus.topBanner===false">
                <swiper-slide v-for="item in bannerList" :key="item.id">
                    <div class="shoppingMallIndexBannerBox" @click="indexBannerLinkFn(item)">
                        <img :src="item.image" alt="" :title="item.name"/>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination" id="indexTopBannerPagination"></div>
            </swiper>
        </div>
        <!--8个导航-->
        <div class="indexIconNavBox">
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.topNavList===true"
                         class="globalLoadingAnmClass"></van-loading>
            <ul class="indexIconNavList" v-if="pageComAnmShowStatus.topNavList===false">
                <li v-for="(item,index) in indexTopNavList" :key="index">
                    <div class="style" @click="indexTopNavLinkFn(item,index)">
                        <div class="icon">
                            <img :src="item.image" alt="">
                        </div>
                        <p class="text">{{item.name}}</p>
                    </div>
                </li>
                <!--<li v-for="item in indexTopNavList" :key="item.id" :class="item.liClassName">-->
                    <!--<div class="style" @click="indexTopNavLinkFn(item)">-->
                        <!--<div :class="item.className"></div>-->
                        <!--<p class="text">{{item.text}}</p>-->
                    <!--</div>-->
                <!--</li>-->
            </ul>
        </div>
        <!--导航下的广告-->
        <div class="indexPublicFloorAdBox">
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.userCustom===true"
                         class="globalLoadingAnmClass"></van-loading>
            <div class="img" v-if="pageComAnmShowStatus.userCustom===false">
                <img :src="floorAdList.first.image" alt="">
            </div>
        </div>
        <!--&lt;!&ndash;公共的非推荐的头部&ndash;&gt;-->
        <div class="indexPublicHeaderBox">
            <div class="left first">商城抢购</div>
            <div class="right">商城尖货轮番抢
                <van-icon name="arrow" style="vertical-align: middle;font-size: 14px!important;"></van-icon>
            </div>
        </div>
        <!--秒杀列表日期切换-->
        <div class="MSDateTabBox">
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.MSDate===true"
                         class="globalLoadingAnmClass"></van-loading>
            <van-tabs v-model="floatBannerList.active" @click="MsTabChangeFn" v-if="pageComAnmShowStatus.MSDate===false">
                <van-tab v-for="item in floatBannerList.list" :key="item.id">
                    <div slot="title" class="coustomDateTabStyle">
                        <p class="date" v-text="returnDateFn(item.time)"></p>
                        <p class="time" v-text="returnTimeFn(item.time)"></p>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <!--滚动的秒杀列表-->
        <div class="indexFloatBannerBox">
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.floatBanner===true"
                         class="globalLoadingAnmClass"></van-loading>
            <swiper :options="floatSwiperOption" v-if="pageComAnmShowStatus.floatBanner===false">
                <swiper-slide v-for="item in floatBannerList.single" :key="item.id">
                    <div class="indexFloatBox" @click="floatBannerClickFn(item)">
                        <div class="img">
                            <img :src="item.imgUrl" alt=""/>
                            <div class="fixedTitle">好评率{{item.goodJNum}}%</div>
                        </div>
                        <p class="text">{{item.name}}</p>
                        <div class="bottom">
                            <div class="pirce">
                                <p class="newPrice">￥{{(item.newPrice/100).toFixed(2)}}</p>
                                <p class="oldPrice">￥{{(item.oldPrice/100).toFixed(2)}}</p>
                            </div>
                            <div class="button">抢</div>
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination" id="indexFloatBannerPagination"
                     style="display: none"></div>
            </swiper>
        </div>
        <!--秒杀列表下的广告-->
        <div class="indexPublicFloorAdBox">
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.teamShop===true"
                         class="globalLoadingAnmClass"></van-loading>
            <div class="img" v-if="pageComAnmShowStatus.teamShop===false">
                <img :src="floorAdList.second.image" alt=""/>
            </div>
        </div>
        <!--今日推荐-->
        <div class="todayRecBox">
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.todayRec===true"
                         class="globalLoadingAnmClass"></van-loading>
            <!--今日推荐header-->
            <div class="indexPublicHeaderBox" v-if="pageComAnmShowStatus.todayRec===false">
                <div class="left todayRec">今日推荐</div>
            </div>
            <!--今日推荐内容-->
            <div class="todayRecContentBox" v-if="pageComAnmShowStatus.todayRec===false">
                <div class="left">
                    <div class="content">
                        <div class="box">
                            <h3>{{todayRecData.left.name}}</h3>
                            <h4>{{todayRecData.left.title}}</h4>
                            <div class="img">
                                <img :src="todayRecData.left.image" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="top">
                        <div class="left">
                            <h3>{{todayRecData.right.top.name}}</h3>
                            <h4>{{todayRecData.right.top.title}}</h4>
                        </div>
                        <div class="right">
                            <img :src="todayRecData.right.top.image" alt="">
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <h3>{{todayRecData.right.bottom.name}}</h3>
                            <h4>{{todayRecData.right.bottom.title}}</h4>
                        </div>
                        <div class="right">
                            <img :src="todayRecData.right.top.image" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <!--今日推荐底部图片-->
            <div class="todayRecBottomImg" v-if="pageComAnmShowStatus.todayRec===false">
                <img :src="todayRecData.bottomBanner.image" alt="">
            </div>
        </div>
        <!--公共的无底色header(品质生活)-->
        <div class="indexPublicFloorHeaderBox">
            <div class="header">
                <img :src="floorNavHeaderImgList.life.text" alt=""/>
            </div>
            <span class="more">更多<img :src="floorNavHeaderImgList.life.arrow"/></span>
        </div>
        <!--品质生活-->
        <div class="indexPublicAreaBox" id="goodLife">
            <!--加载动画-->
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.goodLife===true"
                         class="globalLoadingAnmClass"></van-loading>
            <!--顶部img-->
            <div class="publicTopImg" v-if="pageComAnmShowStatus.goodLife===false">
                <img :src="goodLifeData.topBanner.image" alt=""/>
            </div>
            <!--品质生活六大分类-->
            <ul class="goodLifeMenuList" v-if="pageComAnmShowStatus.goodLife===false" id="goodLifeMenuList">
                <li v-for="item in goodLifeData.list" :key="item.id">
                    <div class="goodLifeMenuStyle" :id="item.domId" :key="item.id">
                        <h3>{{item.name}}</h3>
                        <h4>{{item.title}}</h4>
                        <div class="img">
                            <img :src="item.image" alt=""/>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--公共的无底色header(订餐外卖)-->
        <div class="indexPublicFloorHeaderBox">
            <div class="header">
                <img :src="floorNavHeaderImgList.orderFood.text" alt=""/>
            </div>
            <span class="more">更多<img :src="floorNavHeaderImgList.orderFood.arrow"/></span>
        </div>
        <!--订餐外卖-->
        <div class="indexPublicAreaBox" id="orderFood">
            <!--加载动画-->
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.orderFood===true"
                         class="globalLoadingAnmClass"></van-loading>
            <!--顶部img-->
            <div class="publicTopImg orderFood" v-if="pageComAnmShowStatus.orderFood===false">
                <img :src="orderFoodData.topBanner.image" alt=""/>
            </div>
            <!--两大活动-->
            <ul class="orderFoodCenterMenuList">
                <li v-for="(item,index) in orderFoodData.middle" :key="index">
                    <div class="orderFoodCenterMenuStyle">
                        <div class="bgImg">
                            <img :src="item.image" alt=""/>
                        </div>
                        <div class="fixed">
                            <span class="top">{{item.name}}</span>
                            <span class="leftOne">{{item.title}}</span>
<!--                            <span class="leftTwo">{{item.leftTwo}}</span>-->
                        </div>
                    </div>
                </li>
            </ul>
            <!--四个大分类-->
            <ul class="orderFoodBottomMenuList" v-if="pageComAnmShowStatus.orderFood===false">
                <li v-for="item in orderFoodData.bottom" :key="item.id">
                    <div class="orderFoodBottomMenuStyle" :id="item.domId" :key="item.id">
                        <h3>{{item.name}}</h3>
                        <h4>{{item.title}}</h4>
                        <div class="img">
                            <img :src="item.image" alt=""/>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--公共的无底色header(个人服务)-->
        <div class="indexPublicFloorHeaderBox">
            <div class="header">
                <img :src="floorNavHeaderImgList.personalService.text" alt="">
            </div>
            <span class="more">更多<img :src="floorNavHeaderImgList.personalService.arrow"/></span>
        </div>
        <!--个人服务-->
        <div class="indexPublicAreaBox" id="personalService">
            <!--加载动画-->
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.goodLife===true"
                         class="globalLoadingAnmClass"></van-loading>
            <!--顶部img-->
            <div class="publicTopImg" v-if="pageComAnmShowStatus.personalService===false">
                <img :src="personalServiceData.topBanner.image" alt="">
            </div>
            <!--个人服务六大分类-->
            <ul class="goodLifeMenuList" v-if="pageComAnmShowStatus.personalService===false" id="personalServiceList">
                <li v-for="(item,index) in personalServiceData.list" :key="index">
                    <div class="goodLifeMenuStyle" :id="item.domId">
                        <h3>{{item.name}}</h3>
                        <h4>{{item.title}}</h4>
                        <div class="img">
                            <img :src="item.image" alt="">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--公共的无底色header(企业服务)-->
        <div class="indexPublicFloorHeaderBox">
            <div class="header">
                <img :src="floorNavHeaderImgList.companyService.text" alt="">
            </div>
            <span class="more">更多<img :src="floorNavHeaderImgList.companyService.arrow"/></span>
        </div>
        <!--企业服务-->
        <div class="indexPublicAreaBox" id="enterpriseService">
            <!--加载动画-->
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.enterpriseService===true"
                         class="globalLoadingAnmClass"></van-loading>
            <!--顶部img-->
            <div class="publicTopImg" v-if="pageComAnmShowStatus.enterpriseService===false">
                <img :src="enterpriseServiceData.topBanner.image" alt=""/>
            </div>
            <!--tab选项-->
            <div class="enterpriseServiceTabBarBox" id="indexEnterpriseServiceTabBar">
                <van-tabs @change="enterpriseServiceTabChangeFn">
                    <van-tab v-for="(item,index) in enterpriseServiceData.navList" :title="item.title" :key="index"></van-tab>
                </van-tabs>
            </div>
            <!--企业服务tab-->
            <ul class="goodLifeMenuList company" v-if="pageComAnmShowStatus.personalService===false" id="companyServiceList">
                <li v-for="(item,index) in enterpriseServiceData.list" :key="index">
                    <div class="goodLifeMenuStyle">
                        <h3>{{item.name}}</h3>
                        <h4>{{item.title}}</h4>
                        <div class="img">
                            <img :src="item.image" alt=""/>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--公共的无底色header-->
        <div class="indexPublicFloorHeaderBox">
            <div class="header">
                <img :src="this.floorNavHeaderImgList.recForYou.text" alt="">
            </div>
            <!--<span class="more">更多<img src="../assets/images/shoppingMall/index/indexToMoreIcon4.png"></span>-->
        </div>
        <!--猜你喜欢列表-->
        <guessYouLikeGood v-bind:guessLikeData="toGuessLikeData"></guessYouLikeGood>
    </div>
</template>

<script>
    //引入猜你喜欢
    import guessYouLikeGood from "./global/guessYouLikeGood"
    export default {
        name: 'index',
        components: {
            guessYouLikeGood
        },
        data() {
            return {
                //楼层导航的图片
                floorNavHeaderImgList:{
                    //品质生活
                    life:{
                        //文字
                        text:"",
                        //箭头
                        arrow:""
                    },
                    //订餐外卖
                    orderFood:{
                        //文字
                        text:"",
                        //箭头
                        arrow:""
                    },
                    //个人服务
                    personalService:{
                        //文字
                        text:"",
                        //箭头
                        arrow:""
                    },
                    //企业服务
                    companyService:{
                        //文字
                        text:"",
                        //箭头
                        arrow:""
                    },
                    //为你推荐
                    recForYou:{
                        //文字
                        text:"",
                    }
                },
                //传给猜你喜欢组件的值
                toGuessLikeData: {
                    id: 1,
                    title: "首页"
                },
                //广告楼层list
                floorAdList: {
                    //个人定制入口
                    first: {
                        // id: 1,
                        // type: "shopId",
                        // url: require("../assets/images/shoppingMall/index/indexTopFloorAd.png"),
                        // params: "1"
                    },
                    //拼团入口
                    second: {
                        // id: 2,
                        // type: "shopId",
                        // url: require("../assets/images/shoppingMall/index/indexTeamShopAd.png"),
                        // params: "1"
                    }
                },
                //顶部五个导航的文字和图片
                indexTopNavList: [
                    // {
                    //     id: 1,
                    //     text: "悬赏",
                    //     className: "icon icon1",
                    //     liClassName: "marginBottom",
                    //     icon: "background-image: url('../assets/images/shoppingMall/index/indexNavIcon1.png')"
                    // },
                    // {
                    //     id: 2,
                    //     text: "订餐",
                    //     className: "icon icon2",
                    //     liClassName: "marginBottom",
                    //     icon: "background-image: url('../assets/images/shoppingMall/index/indexNavIcon2.png')"
                    // },
                    // {
                    //     id: 3,
                    //     text: "定制",
                    //     className: "icon icon3",
                    //     liClassName: "marginBottom",
                    //     icon: "background-image: url('../assets/images/shoppingMall/index/indexNavIcon3.png')"
                    // },
                    // {
                    //     id: 4,
                    //     text: "拼单",
                    //     className: "icon icon4",
                    //     liClassName: "marginBottom",
                    //     icon: "background-image: url('../assets/images/shoppingMall/index/indexNavIcon4.png')"
                    // },
                    // {
                    //     id: 5,
                    //     text: "星店",
                    //     className: "icon icon5",
                    //     icon: "background-image: url('../assets/images/shoppingMall/index/indexNavIcon5.png')"
                    // },
                    // {
                    //     id: 6,
                    //     text: "服务",
                    //     className: "icon icon6",
                    //     icon: "background-image: url('../assets/images/shoppingMall/index/indexNavIcon6.png')"
                    // },
                    // {
                    //     id: 7,
                    //     text: "医疗",
                    //     className: "icon icon7",
                    //     icon: "background-image: url('../assets/images/shoppingMall/index/indexNavIcon7.png')"
                    // },
                    // {
                    //     id: 8,
                    //     text: "教育",
                    //     className: "icon icon8",
                    //     icon: "background-image: url('../assets/images/shoppingMall/index/indexNavIcon8.png')"
                    // }
                ],
                //秒杀列表banner配置
                floatSwiperOption: {
                    pagination: {
                        el: '#indexFloatBannerPagination'
                    },
                    slidesPerView: 3,
                    spaceBetween: 10,
                    freeMode: true,
                    resistanceRatio: 0,
                    autoplay: {
                        delay: 2000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false
                    }
                },
                //首页顶部banner配置
                indexTopSwiperOption: {
                    pagination: {
                        el: '#indexTopBannerPagination'
                    },
                    slidesPerView: 1,
                    spaceBetween: 10,
                    autoHeight: true,
                    autoplay: {
                        delay: 2000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false
                    }
                },
                //当前页面组件的渲染动画是否显示
                pageComAnmShowStatus: {
                    //顶部8个导航
                    topNavList:true,
                    //秒杀列表
                    floatBanner: true,
                    //顶部banner
                    topBanner: true,
                    //秒杀时间选项
                    MSDate: true,
                    //用户自定义的图片加载
                    userCustom: true,
                    //拼团图片加载
                    teamShop: true,
                    //今日推荐
                    todayRec: true,
                    //品质生活
                    goodLife: true,
                    //订餐外卖
                    orderFood: true,
                    //个人服务
                    personalService: true,
                    //企业服务
                    enterpriseService: true,
                    //为你推荐
                    recForYou: true
                },
                //本地存储的数据
                bannerList: [],
                //本地存储的秒杀数据
                floatBannerList: {
                    //当前选中的
                    active: 0,
                    //请求到的秒杀列表
                    list: [
                        {
                            id: 1,
                            time: 156254125422520,
                            goodsList: [
                                {
                                    id: 1,
                                    imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                                    name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                },
                                {
                                    id: 1,
                                    imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                                    name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                }, {
                                    id: 1,
                                    imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                                    name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                }
                            ]
                        },
                        {
                            id: 2,
                            time: 156255695422520,
                            goodsList: [
                                {
                                    id: 1,
                                    imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                                    name: "哦牛批商品2哦牛批商品2哦牛批商品2哦牛批商品2",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                },
                                {
                                    id: 1,
                                    imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                                    name: "哦牛批商品2哦牛批商品2哦牛批商品2哦牛批商品2",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                }, {
                                    id: 1,
                                    imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                                    name: "哦牛批商品2哦牛批商品2哦牛批商品2哦牛批商品2",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                }
                            ]
                        },
                        {
                            id: 3,
                            time: 156255523422520,
                            goodsList: [
                                {
                                    id: 1,
                                    imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                                    name: "哦牛批商品3哦牛批商品3哦牛批商品3哦牛批商品3",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                },
                                {
                                    id: 1,
                                    imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                                    name: "哦牛批商品3哦牛批商品3哦牛批商品3哦牛批商品3",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                }, {
                                    id: 1,
                                    imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                                    name: "哦牛批商品3哦牛批商品3哦牛批商品3哦牛批商品3",
                                    goodJNum: 50,
                                    oldPrice: 100,
                                    newPrice: 80
                                }
                            ]
                        }
                    ],
                    //用来显示给用户的单层秒杀列表
                    single: [
                        {
                            id: 1,
                            imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                            name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                            goodJNum: 50,
                            oldPrice: 100,
                            newPrice: 80
                        },
                        {
                            id: 2,
                            imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                            name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                            goodJNum: 50,
                            oldPrice: 100,
                            newPrice: 80
                        },
                        {
                            id: 3,
                            imgUrl: require("../assets/images/shoppingMall/index/MsShopImg.png"),
                            name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                            goodJNum: 50,
                            oldPrice: 100,
                            newPrice: 80
                        }
                    ]
                },
                //存储的今日推荐数据
                todayRecData: {
                    //左侧
                    left: {

                    },
                    //右侧
                    right: {
                        top: {

                        },
                        bottom: {

                        }
                    },
                    //底部banner
                    bottomBanner: {

                    }
                },
                //存储品质生活的数据
                goodLifeData: {
                    //顶部banner
                    topBanner:"",
                    //六个分类
                    list: []
                },
                //订餐外卖的数据
                orderFoodData: {
                    //顶部banner
                    topBanner: "",
                    //中间两个图
                    middle: [],
                    //底部四个分类
                    bottom: []
                },
                //存储个人服务的数据
                personalServiceData: {
                    //顶部banner
                    topBanner: "",
                    //六个分类
                    list: []
                },
                //存储企业服务的数据
                enterpriseServiceData: {
                    //顶部banner
                    topBanner:"",
                    //导航栏目
                    navList: [],
                    //存储的数据
                    listSave:{
                        //类目1
                        first:[],
                        //类目2
                        second:[],
                        //类目3
                        third:[]
                    },
                    //渲染的数据
                    list: []
                },
                //为你推荐数据
                recForYou: {
                    list: [],
                    //是否显示加载中
                    loading: false,
                    //是否已经全部加载完成
                    finished: false,
                    //第一次进入是否加载一次
                    immediateCheck: false,
                    //多少是offset
                    offset: 300
                }
            }
        },
        methods: {
            //企业服务tab标签页change的方法
            enterpriseServiceTabChangeFn(index,title){
                // console.log(index);
                //开启loading
                switch (index) {
                    case 0:
                        //放置第一级数据
                        this.enterpriseServiceData.list=this.enterpriseServiceData.listSave.first;
                        //渲染
                        break;
                    case 1:
                        //放置第二级数据
                        this.enterpriseServiceData.list=this.enterpriseServiceData.listSave.second;
                        //渲染
                        break;
                    case 2:
                        //放置第三级数据
                        this.enterpriseServiceData.list=this.enterpriseServiceData.listSave.third;
                        //渲染
                        break;
                }
            },
            //首页8大导航点击
            indexTopNavLinkFn(item,index) {
                // this.tools.globalFn.publicToastFn(this,"敬请期待！");
                console.log(item);
                switch (index+1) {
                    case 1:
                        // this.tools.globalFn.publicToastFn(this,"敬请期待");
                        // console.log("悬赏");
                        // //判断是否登录
                        // if(this.tools.globalFn.isLoginFn()===false){
                        //     //没登录直接去登录
                        //     this.$bridge.callHandler("toLogin");
                        //     return;
                        // }
                        // this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.234:5789", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject)}));
                        if (this.tools.globalFn.regDevModeFn(this) === 1) {
                            //如果是线下，进入线下地址
                            this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.234:5789", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-1"}));
                        } else if (this.tools.globalFn.regDevModeFn(this) === 0) {
                            //如果是线下，进入线上地址
                            this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.234:5789", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-1"}));
                            // this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://www.tobebetterman.com:8002/shop/offerReward", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-1"}));
                        }
                        break;
                    case 2:
                        // console.log("订餐");
                        // this.tools.globalFn.publicToastFn(this,"敬请期待");
                        //通知开启服务
                        this.$bridge.callHandler("jsNoticeClientNeedOpenService",{serviceNum:1},(res)=>{
                            if(res==="true"){
                                if (this.tools.globalFn.regDevModeFn(this) === 1) {
                                    //如果是线下，进入线下地址
                                    this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.234:8089", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-2"}));
                                } else if (this.tools.globalFn.regDevModeFn(this) === 0) {
                                    //如果是开发，进入线上地址
                                    // this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://www.tobebetterman.com:8002/shop/orderFood", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-2"}));
                                    this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.234:8089", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-2"}));
                                }
                            }
                            else{
                                this.tools.globalFn.publicToastFn(this,"请开启定位服务！");
                                return false;
                            }
                        });

                        break;
                    case 3:
                        // console.log("定制");
                        this.tools.globalFn.publicToastFn(this,"敬请期待");
                        break;
                    case 4:
                        // console.log("拼单");
                        //判断是否登录
                        if(this.tools.globalFn.isLoginFn()===false){
                            //没登录直接去登录
                            this.$bridge.callHandler("toLogin");
                            return;
                        }
                        //先改变状态栏
                        if (this.tools.globalFn.regDevModeFn(this) === 1) {
                            //如果是线下，进入线下地址
                            this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.13:8080/#/index", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-4"}));
                            // this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.100:6329", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-4"}));
                        } else if (this.tools.globalFn.regDevModeFn(this) === 0) {
                            //如果是线上，进入线上地址
                            this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.13:8080/#/index", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-4"}));
                            // this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://dev.tobebetterman.com:8002/shop/groupPurchase", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-4"}));
                        }
                        break;
                    case 5:
                        // console.log("星店");
                        // this.tools.globalFn.publicToastFn(this,"敬请期待");
                        if (this.tools.globalFn.regDevModeFn(this) === 1) {
                            this.$router.push({name: "starShopCenter"});
                            return;
                        }
                        this.$bridge.callHandler("tabBarStatus", "false", (res) => {
                            // alert(res);
                            if (res === "true") {
                                this.$router.push({name: "starShopCenter"});
                            }
                        });
                        break;
                    case 6:
                        console.log("服务");
                        this.tools.globalFn.publicToastFn(this,"敬请期待");
                        // if (this.tools.globalFn.regDevModeFn(this) === 1) {
                        //     //如果是线下，进入线下地址
                        //     this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.234:6320", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject)}));
                        // } else if (this.tools.globalFn.regDevModeFn(this) === 0) {
                        //     //如果是线下，进入线上地址
                        //     // this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://www.tobebetterman.com:8002/shop/service", statusbarStatus: "#000000"}));
                        //     this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.234:6320", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject)}));
                        // }
                        break;
                    case 7:
                        // console.log("医疗");
                        // localStorage.clear()
                        // this.tools.globalFn.publicToastFn(this, "敬请期待");
                        //判断是否登录
                        if(this.tools.globalFn.isLoginFn()===false){
                            //没登录直接去登录
                            this.$bridge.callHandler("toLogin");
                            return;
                        }
                        //先改变状态栏
                        if (this.tools.globalFn.regDevModeFn(this) === 1) {
                            // alert("VUE");
                            //如果是线下，进入线下地址
                            this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.53:8081", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-7"}));
                        } else if (this.tools.globalFn.regDevModeFn(this) === 0) {
                            // alert("测试地址");
                            //如果是线上，进入线上地址
                            this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://192.168.0.53:8081", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-7"}));

                            // this.$bridge.callHandler("openNewWebviewFn", JSON.stringify({url: "http://dev.tobebetterman.com:8002/shop/medicalCare/#/", statusbarStatus: "#000000",data:JSON.stringify(localStorage.shopSaveObject),type:"shop-7"}));
                        }
                        break;
                    case 8:
                        this.tools.globalFn.publicToastFn(this,"敬请期待");
                        // this.axios({
                        //     url:"http://beta.tobebetterman.com/userrelated/get-module-bannerimg",
                        //     data:{
                        //         cid: '5b67c634f6354b25cc00566c'
                        //     },
                        //     method:"POST"
                        // })
                        //     .then((res)=>{
                        //         console.log(res);
                        //     });
                        // alert(JSON.stringify(localStorage.shopSaveObject));
                        // alert(JSON.parse(localStorage.shopSaveObject));
                        // this.axios({
                        //     url:"http://shop-beta.tobebetterman.com/customer/token/index",
                        //     method:"POST",
                        //     data:{
                        //         token:"MTU2ODk3MTk0NjR8MTIzNDU2Nzg5"
                        //     }
                        // })
                        //     .then((res)=>{
                        //         console.log(res);
                        //     })
                        // localStorage.uuid="";
                        // localStorage.shopToken="";
                        // this.tools.globalFn.publicToastFn(this,"清空token！");
                        // this.tools.globalFn.publicToastFn(this, "敬请期待");
                        // alert(localStorage.shopSaveObject);
                        // console.log("教育-获取token");
                        // alert("打印uuid");
                        // alert(localStorage.uuid);
                        // alert(localStorage.shopToken);
                        // alert(localStorage.token);
                        // alert(localStorage.tel);
                        // this.getTokenFn();
                        break;
                }
            },
            //返回返回日期格式的方法
            returnDateFn(val) {
                return this.tools.globalFn.getDate(val);
            },
            //返回返回日期格式的方法
            returnTimeFn(val) {
                return this.tools.globalFn.getTime(val);
            },
            //切换秒杀日期的方法
            MsTabChangeFn(index, title) {
                console.log(this.floatBannerList.list[index].goodsList);
                //因为自定义了title，所以title是未定义
                this.floatBannerList.single = this.floatBannerList.list[index].goodsList;
            },
            //点击秒杀选项的方法
            floatBannerClickFn(item) {
                console.log(item);
            },
            //打开用户中心的方法
            goToUserCenterFn() {
                if (this.tools.globalFn.regDevModeFn(this) === 1) {
                    this.$router.push("/userCenter");
                    return;
                }
                //判断是否登录
                if (this.tools.globalFn.isLoginFn() === false) {
                    //跳转登录页面
                    this.$bridge.callHandler('toLogin');
                    return;
                }
                // alert("已经登录了");
                this.$bridge.callHandler("tabBarStatus", "false", (res) => {
                    // alert(res);
                    if (res === "true") {
                        // alert("应该跳转用户中心");
                        this.$router.push("/userCenter");
                    }
                });
            },
            //打开分类页面方法
            openMenuFn() {
                // this.$router.push("/menu");
                // this.getUserFn();
                if (this.tools.globalFn.regDevModeFn(this) === 1) {
                    this.$router.push("/menu");
                    return;
                }
                this.$bridge.callHandler("tabBarStatus", "false", (res) => {
                    // alert(res);
                    if (res === "true") {
                        this.$router.push("/menu");
                    }
                });
                //打印本地存储
                // console.log(this.tools.localUserInfo);
            },
            //去购物车页面
            goToShopCartPage() {
                // this.$toast("尚未登录");
                // this.$router.push("/linkPage");
                //如果是开发模式
                if (this.tools.globalFn.regDevModeFn(this) === 1) {
                    this.$router.push("/cart");
                    return;
                }
                //调用是否登录的方法
                if (this.tools.globalFn.isLoginFn() === false) {
                    //跳转登录页面
                    //给xx传值
                    this.$bridge.callHandler('toLogin');
                    return false;
                }
                //给xx传值
                this.$bridge.callHandler('tabBarStatus', "false", (res) => {
                    if (res === "true") {
                        this.$router.push("/cart");
                    }
                });
                //跳转其他页面
                // this.$router.push("/cart");
            },
            //去搜索页面
            goToSearchPage() {
                // console.log("去搜索页面");
                // this.tools.globalFn.publicToastFn(this,"敬请期待！");
                //如果是开发模式
                if (this.tools.globalFn.regDevModeFn(this) === 1) {
                    console.log("1");
                    this.$router.push({name: "search"});
                } else if (this.tools.globalFn.regDevModeFn(this) === 0) {
                    console.log("0");
                    //给xx传值
                    this.$bridge.callHandler('tabBarStatus', "false", (res) => {
                        if (res === "true") {
                            this.$router.push({name: "search"});
                        }
                    });
                }

            },
            //banner点击跳转事件
            indexBannerLinkFn(item) {
                console.log(item);
            },
            //请求第一次数据
            getFirstData() {
                //请求推荐位
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/catalog/mall/index",
                    method:"GET",
                    success:(res)=>{
                        // console.log("打印首页推荐位");
                        // console.log(res);
                        if(res.data.code===200){
                            //放置banner
                            this.bannerList=res.data.data.top_rotation;
                            //渲染banner
                            this.pageComAnmShowStatus.topBanner = false;
                            //放置8个导航
                            this.indexTopNavList=res.data.data.top_module;
                            //渲染导航
                            this.pageComAnmShowStatus.topNavList = false;
                            //放置8个导航下的广告
                            this.floorAdList.first=res.data.data.middle_customization[0];
                            //渲染
                            this.pageComAnmShowStatus.userCustom = false;
                            //放置秒杀下的广告
                            this.floorAdList.second=res.data.data.middle_team[0];
                            //放置今日推荐-左侧
                            this.todayRecData.left=res.data.data.recent_recommend[0];
                            //放置今日推荐-右侧-上
                            this.todayRecData.right.top=res.data.data.recent_recommend[1];
                            //放置今日推荐-右侧-下
                            this.todayRecData.right.bottom=res.data.data.recent_recommend[2];
                            //放置今日推荐-底部banner
                            this.todayRecData.bottomBanner=res.data.data.recent_recommend_bottom[0];
                            //渲染今日推荐
                            this.pageComAnmShowStatus.todayRec=false;
                            //放置品质生活图片
                            this.floorNavHeaderImgList.life.text=res.data.data.quality_life_icon[0].image;
                            //放置品质生活箭头
                            this.floorNavHeaderImgList.life.arrow=res.data.data.quality_life_icon[1].image;
                            //放置品质生活
                            this.goodLifeData.topBanner=res.data.data.quality_life_banner[0];
                            //放置品质生活推荐
                            this.goodLifeData.list=res.data.data.quality_life_detail;
                            //渲染品质生活
                            this.pageComAnmShowStatus.goodLife = false;
                            //放置订餐外卖顶部header图片
                            this.floorNavHeaderImgList.orderFood.text=res.data.data.meal_icon[0].image;
                            //放置订餐外卖顶部header箭头图片
                            this.floorNavHeaderImgList.orderFood.arrow=res.data.data.meal_icon[1].image;
                            //放置订餐外卖顶部banner
                            this.orderFoodData.topBanner=res.data.data.meal_banner[0];
                            //放置订餐外卖两个推荐位
                            this.orderFoodData.middle=res.data.data.meal_middle_ad;
                            //放置订餐外卖底部4个推荐位
                            this.orderFoodData.bottom=res.data.data.meal_detail;
                            //渲染订餐外卖
                            this.pageComAnmShowStatus.orderFood = false;
                            //放置个人服务顶部header图片
                            this.floorNavHeaderImgList.personalService.text=res.data.data.personal_service_icon[0].image;
                            //放置个人服务顶部header箭头图片
                            this.floorNavHeaderImgList.personalService.arrow=res.data.data.personal_service_icon[1].image;
                            //放置个人服务顶部banner
                            this.personalServiceData.topBanner=res.data.data.personal_service_banner[0];
                            //放置个人服务推荐
                            this.personalServiceData.list=res.data.data.personal_service_detail;
                            //渲染个人服务
                            this.pageComAnmShowStatus.personalService = false;
                            //放置企业服务顶部header图片
                            this.floorNavHeaderImgList.companyService.text=res.data.data.enterprise_service_icon[0].image;
                            //放置企业服务顶部header箭头图片
                            this.floorNavHeaderImgList.companyService.arrow=res.data.data.enterprise_service_icon[1].image;
                            //放置企业服务-顶部banner
                            this.enterpriseServiceData.topBanner=res.data.data.enterprise_service_banner[0];
                            //放置企业服务-tab标签
                            this.enterpriseServiceData.navList=res.data.data.enterprise_service_category;
                            //放置企业服务-当前渲染的（默认是第一个）
                            this.enterpriseServiceData.list=res.data.data.enterprise_service_detail_1;
                            //放置企业服务-第一类目
                            this.enterpriseServiceData.listSave.first=res.data.data.enterprise_service_detail_1;
                            //放置企业服务-第二类目
                            this.enterpriseServiceData.listSave.second=res.data.data.enterprise_service_detail_2;
                            //放置企业服务-第三类目
                            this.enterpriseServiceData.listSave.third=res.data.data.enterprise_service_detail_3;
                            //渲染企业服务
                            this.pageComAnmShowStatus.enterpriseService = false;
                            //放置为你推荐顶部图标
                            this.floorNavHeaderImgList.recForYou.text=res.data.data.product_recommend_icon[0].image;
                        }
                    }
                });
                this.pageComAnmShowStatus.floatBanner = false;

                this.pageComAnmShowStatus.MSDate = false;

                this.pageComAnmShowStatus.teamShop = false;
            },
            //登录账号方法
            // getTokenFn() {
            //     this.axios({
            //         url: this.tools.ajaxAddress.defaultUrl + "/customer/login/account",
            //         method: "POST",
            //         data: {
            //             email: "2240097108@qq.com",
            //             password: "123456",
            //         }
            //     })
            //         .then(res => {
            //             console.log(res);
            //             //配置axios请求头
            //             if (res.headers['fecshop-uuid'] !== undefined) {
            //                 //uuid存储到本地
            //                 // this.axios.defaults.headers.common['Fecshop-Uuid'] = res.headers['fecshop-uuid'];
            //                 window.localStorage.setItem("uuid", res.headers['fecshop-uuid']);
            //             }
            //             if (res.headers['access-token'] !== undefined) {
            //                 //配置axiostoken
            //                 // this.axios.defaults.headers.common['Access-Token'] = res.headers['access-token'];
            //                 //token存储到本地
            //                 window.localStorage.setItem("userToken", res.headers['access-token']);
            //             }
            //         })
            //         .catch(error => {
            //             console.log(error);
            //         });
            //
            // },
            //显示tabbar的方法
            showTabBarFn() {
                console.log(this.$route);
                if (this.$route.name === "index") {
                    this.$bridge.callHandler('tabBarStatus', "true", (res) => {
                        // if(res==="true"){
                        //     this.$router.push("/cart");
                        // }
                    });
                }
            },
        },
        created() {
            this.getFirstData();
            // this.getTokenFn();
        },
        mounted() {
            // this.showTabBarFn();
        },
        watch: {},
        activated() {
            this.showTabBarFn();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*猜你喜欢*/
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
        height: 100%;
    }

    .guessYouLikeStyle > p.name {
        color: #666;
        font-size: 14px;
        display: -webkit-box;
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        white-space: normal;
        -webkit-box-orient: vertical;
        word-break: break-all;
        margin-bottom: 4px;
        padding: 0 10px;
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

    /*企业服务样式覆盖*/
    #companyServiceList > li:nth-child(1) > .goodLifeMenuStyle > h3 {
        color: #436999;
    }

    #companyServiceList > li:nth-child(1) > .goodLifeMenuStyle > h4 {
        color: #436999;
    }

    #companyServiceList > li:nth-child(2) > .goodLifeMenuStyle > h3 {
        color: #6a9b3c;
    }

    #companyServiceList > li:nth-child(2) > .goodLifeMenuStyle > h4 {
        color: #6a9b3c;
    }

    #companyServiceList > li:nth-child(3) > .goodLifeMenuStyle > h3 {
        color: #c0765e;
    }

    #companyServiceList > li:nth-child(3) > .goodLifeMenuStyle > h4 {
        color: #c0765e;
    }

    #companyServiceList > li > .goodLifeMenuStyle {
        background-color: #fff;
    }

    #companyServiceList > li > .goodLifeMenuStyle > h3 {
        text-align: center;
    }

    #companyServiceList > li > .goodLifeMenuStyle > h4 {
        text-align: center;
    }

    #enterpriseService {
        background-color: transparent !important;
    }

    #enterpriseService .publicTopImg {
        background-color: #fff;
        padding-top: 10px;
    }

    /*企业服务*/
    .enterpriseServiceTabBarBox {
        width: 100%;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        height: auto;
        overflow: hidden;
    }

    /*个人服务版块的六大模块样式调整*/
    #personalServiceList > li:nth-child(1) > .goodLifeMenuStyle {
        background: #d5e6f2;
    }

    #personalServiceList > li:nth-child(2) > .goodLifeMenuStyle {
        background: #dbead2;
    }

    #personalServiceList > li:nth-child(3) > .goodLifeMenuStyle {
        background: #f9d7cc;
    }

    #personalServiceList > li:nth-child(4) > .goodLifeMenuStyle {
        background: #d5e6f2;
    }

    #personalServiceList > li:nth-child(5) > .goodLifeMenuStyle {
        background: #dbead2;
    }

    #personalServiceList > li:nth-child(6) > .goodLifeMenuStyle {
        background: #f9d7cc;
    }

    /*各自定义的字体颜色,one*/
    #personalServiceList > li:nth-child(1) > .goodLifeMenuStyle h3 {
        color: #436999;
        text-align: center;
    }

    #personalServiceList > li:nth-child(1) > .goodLifeMenuStyle h4 {
        color: #436999;
        text-align: center;
    }

    /*各自定义的字体颜色,two*/
    #personalServiceList > li:nth-child(2) > .goodLifeMenuStyle h3 {
        color: #6a9b3c;
        text-align: center;

    }

    #personalServiceList > li:nth-child(2) > .goodLifeMenuStyle h4 {
        color: #6a9b3c;
        text-align: center;
    }

    /*各自定义的字体颜色,three*/
    #personalServiceList > li:nth-child(3) > .goodLifeMenuStyle h3 {
        color: #c0765e;
        text-align: center;
    }

    #personalServiceList > li:nth-child(3) > .goodLifeMenuStyle h4 {
        color: #c0765e;
        text-align: center;
    }

    /*各自定义的字体颜色,four*/
    #personalServiceList > li:nth-child(4) > .goodLifeMenuStyle h3 {
        color: #436999;
        text-align: center;
    }

    #personalServiceList > li:nth-child(4) > .goodLifeMenuStyle h4 {
        color: #436999;
        text-align: center;
    }

    /*各自定义的字体颜色,five*/
    #personalServiceList > li:nth-child(5) > .goodLifeMenuStyle h3 {
        color: #6a9b3c;
        text-align: center;
    }

    #personalServiceList > li:nth-child(5) > .goodLifeMenuStyle h4 {
        color: #6a9b3c;
        text-align: center;
    }

    /*各自定义的字体颜色,six*/
    #personalServiceList > li:nth-child(6) > .goodLifeMenuStyle h3 {
        color: #c0765e;
        text-align: center;
    }

    #personalServiceList > li:nth-child(6) > .goodLifeMenuStyle h4 {
        color: #c0765e;
        text-align: center;
    }

    /*外卖版块*/
    .orderFoodCenterMenuList {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        padding: 0 10px;
        justify-content: space-between;
    }

    .orderFoodCenterMenuList > li {
        margin-left: 5px;
    }

    .orderFoodCenterMenuList > li:first-child {
        margin-left: 0;
        margin-right: 5px;
    }

    .orderFoodCenterMenuStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }

    .orderFoodCenterMenuStyle > div.bgImg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .orderFoodCenterMenuStyle > div.bgImg img {
        width: 100%;
        display: block;
    }

    .orderFoodCenterMenuStyle > div.fixed {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .orderFoodCenterMenuStyle > div.fixed span {
        display: block;

    }

    .orderFoodCenterMenuStyle > div.fixed span.top {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fe4a4c;
        padding: 4px 6px;
        color: #fff;
        font-size: 12px;
        margin-bottom: 10px;
        float: left;
    }

    .orderFoodCenterMenuStyle > div.fixed span.leftOne {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 4px 6px;
        color: #fff;
        font-size: 14px;
        background-color: rgba(0, 0, 0, 0.65);
        clear: both;
        float: left;
    }

    .orderFoodCenterMenuStyle > div.fixed span.leftTwo {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 4px 6px;
        color: #373133;
        font-size: 12px;
        background-color: #fed068;
        clear: both;
        float: left;
    }

    /*外卖底部列表*/
    .orderFoodBottomMenuList {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        padding: 0 5px;
        margin-bottom: 10px;
        /*display: flex;*/
        /*flex-wrap: wrap;*/
    }

    .orderFoodBottomMenuList > li {
        width: 25%;
        position: relative;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 5px;
        float: left;
        margin-top: 10px;
        /*margin-left: 10px;*/
    }

    .orderFoodBottomMenuList > li::before {
        /*padding-top: 100%;*/
        /*content: ' ';*/
        /*display: block;*/
    }

    .orderFoodBottomMenuList > li:first-child {
        /*margin-left: 0;*/
    }

    .orderFoodBottomMenuStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 4px;
        background-color: #fef9fa;
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 0;*/
    }

    .orderFoodBottomMenuStyle > h3 {
        font-size: 16px;
        font-weight: 800;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .orderFoodBottomMenuStyle > h4 {
        font-size: 12px;
        font-weight: normal;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .orderFoodBottomMenuStyle > div.img {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .orderFoodBottomMenuStyle > div.img img {
        display: block;
        width: 100%;
    }

    /*五大推荐分类*/
    .goodLifeMenuList {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        padding: 0 5px;
        margin-bottom: 10px;
        /*display: flex;*/
        /*flex-wrap: wrap;*/
    }

    .goodLifeMenuList > li {
        width: 33.3%;
        position: relative;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 5px;
        float: left;
        margin-top: 10px;
        /*margin-left: 10px;*/
    }

    .goodLifeMenuList > li::before {
        /*padding-top: 100%;*/
        /*content: ' ';*/
        /*display: block;*/
    }

    .goodLifeMenuList > li:first-child {
        /*margin-left: 0;*/
    }

    .goodLifeMenuStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 4px;
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 0;*/
    }

    .goodLifeMenuStyle > h3 {
        font-size: 16px;
        font-weight: 800;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .goodLifeMenuStyle > h4 {
        font-size: 12px;
        font-weight: normal;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .goodLifeMenuStyle > div.img {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .goodLifeMenuStyle > div.img img {
        display: block;
        width: 100%;
    }

    #goodLifeMenuList>li:nth-child(1)>.goodLifeMenuStyle{
        background: linear-gradient(#d2f3fc, #7cd5f5);
    }

    #goodLifeMenuList>li:nth-child(2)>.goodLifeMenuStyle {
        background: linear-gradient(#ffd0c1, #ff4d49);
    }

    #goodLifeMenuList>li:nth-child(3)>.goodLifeMenuStyle {
        background: linear-gradient(#fedfa7, #ffbc67);
    }

    #goodLifeMenuList>li:nth-child(4)>.goodLifeMenuStyle {
        background: linear-gradient(#fecbde, #f762b3);
    }

    #goodLifeMenuList>li:nth-child(5)>.goodLifeMenuStyle {
        background: linear-gradient(#ffe9dc, #fca490);
    }

    #goodLifeMenuList>li:nth-child(6)>.goodLifeMenuStyle {
        background: linear-gradient(#bcfddd, #67d3a9);
    }

    /*各自定义的字体颜色,one*/
    #goodLife .goodLifeMenuStyle#one h3 {
        color: #436999;
    }

    #goodLife .goodLifeMenuStyle#one h4 {
        color: #436999;
    }

    /*各自定义的字体颜色,two*/
    #goodLife .goodLifeMenuStyle#two h3 {
        color: #644792;
    }

    #goodLife .goodLifeMenuStyle#two h4 {
        color: #644792;
    }

    /*各自定义的字体颜色,three*/
    #goodLife .goodLifeMenuStyle#three h3 {
        color: #94733f;
    }

    #goodLife .goodLifeMenuStyle#three h4 {
        color: #94733f;
    }

    /*各自定义的字体颜色,four*/
    #goodLife .goodLifeMenuStyle#four h3 {
        color: #a14e61;
    }

    #goodLife .goodLifeMenuStyle#four h4 {
        color: #a14e61;
    }

    /*各自定义的字体颜色,five*/
    #goodLife .goodLifeMenuStyle#five h3 {
        color: #a46058;
    }

    #goodLife .goodLifeMenuStyle#five h4 {
        color: #a46058;
    }

    /*各自定义的字体颜色,six*/
    #goodLife .goodLifeMenuStyle#six h3 {
        color: #368063;
    }

    #goodLife .goodLifeMenuStyle#six h4 {
        color: #368063;
    }

    /*公共的盒子*/
    .indexPublicAreaBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        min-height: 50px;
        /*padding: 10px;*/
        background-color: #fff;
        margin-bottom: 10px;
    }

    .indexPublicAreaBox > div.publicTopImg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        padding: 10px 10px 0 10px;
        /*margin-bottom: 10px;*/
    }

    .indexPublicAreaBox > div.publicTopImg img {
        display: block;
        width: 100%;
    }

    .publicTopImg.orderFood {
        margin-bottom: 10px;
    }

    #app {
        padding-top: 92px;
    }

    .publicBg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    body {
        background-color: #f1f1f1;
    }

    .shoppingMallIndexBannerBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
    }

    .shoppingMallIndexBannerBox img {
        display: block;
        width: 100%;
    }

    .swiper-container {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        /*text-align: center;*/
        font-size: 18px;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .indexFloatBannerBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        padding: 10px 10px;
        position: relative;
        min-height: 50px;
    }

    .indexFloatBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        background-color: #fff;
        padding: 10px;
        box-sizing: border-box;
    }

    .indexFloatBox div.fixedTitle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 4px 4px;
        background-color: #ff9921;
        border-radius: 360px;
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -50%;
        font-size: 14px;
        opacity: 0.9;
        text-align: center;
    }

    .indexFloatBox div.img {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 4px;
    }

    .indexFloatBox div.img img {
        display: block;
        width: 100%;
    }

    .indexFloatBox p.text {
        display: -webkit-box;
        width: 100%;
        height: 36px;
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
        line-height: 18px;
    }

    .indexFloatBox div.bottom {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
    }

    .indexFloatBox div.bottom div.pirce {
        height: auto;
        float: left;
        overflow: hidden;
        box-sizing: border-box;
    }

    .indexFloatBox div.bottom p.oldPrice {
        height: auto;
        overflow: hidden;
        text-decoration: line-through;
        color: #999;
        font-size: 14px;
    }

    .indexFloatBox div.bottom p.newPrice {
        height: auto;
        overflow: hidden;
        color: #ff9921;
        font-size: 16px;
    }

    .indexFloatBox div.bottom div.button {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 4px;
        border-radius: 4px;
        color: #fff;
        background-color: #ff1818;
        font-size: 16px;
        display: inline-block;
        float: right;
    }

    .indexIconNavBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 0;
        background-color: #fff;
        border-top: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
        margin-bottom: 10px;
        position: relative;
        min-height: 50px;
    }

    .indexIconNavList {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        /*justify-content: space-between;*/
        flex-wrap: wrap;
    }

    .indexIconNavList > li {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 20px;
        width: 25%;
    }
    .indexIconNavList > li:first-child{
        margin-bottom: 10px;
    }
    .indexIconNavList > li.marginBottom {
        margin-bottom: 10px;
    }

    .indexIconNavList > li div.style {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .indexIconNavList > li div.style p.text {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        color: #333;
        font-size: 14px;
    }

    .indexIconNavList > li div.style div.icon {
        width: 80%;
        padding-top: 80%;
        border-radius: 50%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*background-repeat: no-repeat;*/
        background-position: center;
        background-size: cover;
        margin: 0 auto 4px auto;
        position: relative;
    }
    .indexIconNavList > li div.style div.icon>img{
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .indexIconNavList > li div.style div.icon.icon1 {
        background-image: url("../assets/images/shoppingMall/index/indexNavIcon1.png");
    }

    .indexIconNavList > li div.style div.icon.icon2 {
        background-image: url("../assets/images/shoppingMall/index/indexNavIcon2.png");
    }

    .indexIconNavList > li div.style div.icon.icon3 {
        background-image: url("../assets/images/shoppingMall/index/indexNavIcon3.png");
    }

    .indexIconNavList > li div.style div.icon.icon4 {
        background-image: url("../assets/images/shoppingMall/index/indexNavIcon4.png");
    }

    .indexIconNavList > li div.style div.icon.icon5 {
        background-image: url("../assets/images/shoppingMall/index/indexNavIcon5.png");
    }

    .indexIconNavList > li div.style div.icon.icon6 {
        background-image: url("../assets/images/shoppingMall/index/indexNavIcon6.png");
    }

    .indexIconNavList > li div.style div.icon.icon7 {
        background-image: url("../assets/images/shoppingMall/index/indexNavIcon7.png");
    }

    .indexIconNavList > li div.style div.icon.icon8 {
        background-image: url("../assets/images/shoppingMall/index/indexNavIcon8.png");
    }

    /*公共的广告楼层样式*/
    .indexPublicFloorAdBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
        position: relative;
        min-height: 50px;
    }

    .indexPublicFloorAdBox > div.img {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .indexPublicFloorAdBox > div.img img {
        display: block;
        width: 100%;
    }

    /*秒杀的header样式*/
    .indexPublicHeaderBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 10px;
        background-color: #fff;
    }

    .indexPublicHeaderBox > div.left {
        float: left;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        font-size: 16px;
    }

    .indexPublicHeaderBox > div.left.first {
        background-image: url("../assets/images/shoppingMall/index/indexMsIcon.png");
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 18%;
        text-indent: 1.25em;
    }

    .indexPublicHeaderBox > div.left.todayRec {
        background-image: url("../assets/images/shoppingMall/index/indexRecIcon.png");
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 18%;
        text-indent: 1.25em;
    }

    /*.indexPublicHeaderBox>div.left img{*/
    /*width: 14px;*/
    /*vertical-align: middle;*/
    /*}*/
    .indexPublicHeaderBox > div.right {
        float: right;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #ff3838;
        font-size: 14px;
    }

    .MSDateTabBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        min-height: 50px;
        position: relative;
    }

    .MSDateTabBox .van-tab > div {
        height: 100%;
    }

    .MSDateTabBox .coustomDateTabStyle {
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 0;
    }

    .MSDateTabBox .coustomDateTabStyle p.date {
        font-size: 14px;
    }

    .MSDateTabBox .coustomDateTabStyle p.time {
        font-size: 16px;
        font-weight: bold;
    }

    /*今日推荐*/
    .todayRecBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        min-height: 50px;
        background-color: #fff;
        padding: 10px;
        margin-bottom: 10px;
    }

    .todayRecBox .indexPublicHeaderBox {
        padding: 0 !important;
        margin-bottom: 10px;
    }

    /*今日推荐内容*/
    .todayRecContentBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        margin-bottom: 10px;
    }

    .todayRecContentBox > div.left {
        width: 50%;
        position: relative;
        background: linear-gradient(140deg, #ffe7e0, #fec2ae);
        /*padding: 10px;*/
        /*height: auto;*/
        /*overflow: hidden;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .todayRecContentBox > div.left::before {
        padding-top: 100%;
        content: '\20';
        display: block;
    }

    .todayRecContentBox > div.left > div.content {
        height: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        box-sizing: border-box;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }

    .todayRecContentBox > div.left > div.content > div.box {
        padding: 10px;
        position: relative;
        z-index: 1;
        height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .todayRecContentBox > div.left > div.content > div.box > h3 {
        color: #4f4f4f;
        font-size: 14px;
        font-weight: 800;
    }

    .todayRecContentBox > div.left > div.content > div.box > h4 {
        color: #4f4f4f;
        font-weight: 900;
        font-size: 15px;
    }

    .todayRecContentBox > div.left > div.content > div.box > div.img {
        width: 68%;
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .todayRecContentBox > div.left > div.content > div.box > div.img img {
        display: block;
        width: 100%;
    }

    .todayRecContentBox > div.right {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        margin-left: 10px;
    }

    .todayRecContentBox > div.right > div.top {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 1px;
        background: linear-gradient(140deg, #ffe7e0, #fec2ae);
        margin-bottom: 10px;
        display: flex;
        padding: 10px;
    }

    .todayRecContentBox > div.right > div.top > div.left {
        width: 54%;
    }

    .todayRecContentBox > div.right > div.top > div.left > h3 {
        color: #4f4f4f;
        font-size: 14px;
        font-weight: 800;
    }

    .todayRecContentBox > div.right > div.top > div.left > h4 {
        color: #4f4f4f;
        font-size: 14px;
        font-weight: 900;
    }

    .todayRecContentBox > div.right > div.top > div.right {
        width: 44%;
    }

    .todayRecContentBox > div.right > div.top > div.right > img {
        width: 100%;
        display: block;
    }

    .todayRecContentBox > div.right > div.bottom {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 1px;
        background: linear-gradient(140deg, #ffe7e0, #fec2ae);
        display: flex;
        padding: 10px;
    }

    .todayRecContentBox > div.right > div.bottom > div.left {
        width: 54%;
    }

    .todayRecContentBox > div.right > div.bottom > div.left > h3 {
        color: #4f4f4f;
        font-size: 14px;
        font-weight: 800;
    }

    .todayRecContentBox > div.right > div.bottom > div.left > h4 {
        color: #4f4f4f;
        font-size: 14px;
        font-weight: 900;
    }

    .todayRecContentBox > div.right > div.bottom > div.right {
        width: 44%;
    }

    .todayRecContentBox > div.right > div.bottom > div.right > img {
        width: 100%;
        display: block;
    }

    .todayRecBottomImg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .todayRecBottomImg > img {
        display: block;
        width: 100%;
    }

    /*公共的无底色的header样式*/
    .indexPublicFloorHeaderBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*padding: 0 10px;*/
        position: relative;
        margin-bottom: 10px;
    }

    .indexPublicFloorHeaderBox > div.header {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-size: 50%;
        background-position: center;
        position: relative;
    }

    .indexPublicFloorHeaderBox > div.header > img {
        display: block;
        width: 100%;
        /*min-height: 100%;*/
        margin: auto;
    }

    .indexPublicFloorHeaderBox > span.more {
        position: absolute;
        bottom: 2px;
        right: 10px;
        color: #333;
        font-size: 14px;
    }

    .indexPublicFloorHeaderBox > span.more img {
        width: 12px;
        margin-left: 2px;
    }
</style>
