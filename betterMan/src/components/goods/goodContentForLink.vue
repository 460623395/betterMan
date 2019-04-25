<template>
    <div class="publicAllContentBg none" id="goodContent">
        <!--顶部透明导航-->
        <van-nav-bar style="background-color: rgba(0,0,0,0);position: absolute;left: 0;top: 0;width: 100%;"
                     class="topFixedNav"
                    @click-left="backLastPage"
        >
            <van-icon name="arrow-left" slot="left"></van-icon>
            <!--<van-icon name="share" slot="right"></van-icon>-->
        </van-nav-bar>
        <!--顶部banner-->
        <div class="topIndexBannerBg">
            <van-loading type="spinner" color="black" v-if="contentAnmShowStatus.topBanner===true"
                         class="globalLoadingAnmClass"></van-loading>
            <!--<van-swipe :autoplay="topBannerOption.autoplay" v-if="contentAnmShowStatus.topBanner===false">-->
                <!--<van-swipe-item v-for="(item,index) in topBannerOption.list" :key="index">-->
                    <!--<div class="topIndexBannerBox">-->
                        <!--<img :src="item.imgUrl" alt="" :title="item.name"/>-->
                    <!--</div>-->
                <!--</van-swipe-item>-->
            <!--</van-swipe>-->
            <swiper :options="indexTopSwiperOption" v-if="contentAnmShowStatus.topBanner===false">
                <swiper-slide v-for="(item,index) in topBannerOption.list" :key="index">
                    <div class="topIndexBannerBox">
                        <img :src="item" alt="" :title="item"/>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination" id="indexTopBannerPagination"></div>
            </swiper>
        </div>
        <!--商品名-->
        <div class="goodTitleBox">
            <!--商品名-->
            <p class="title">{{goodContentData.title}}</p>
            <!--价格-->
            <p class="price">￥{{(goodContentData.price).toFixed(2)}}</p>
            <!--其他信息-->
            <div class="otherInfo">
                <p><span>快递:￥{{(goodContentData.yf).toFixed(2)}}</span></p>
                <p><span>月销{{goodContentData.saleNum}}笔</span></p>
                <!--<p><span>{{goodContentData.area}}</span></p>-->
            </div>
        </div>

        <!--优惠促销信息-->
        <div class="publicCellBox" v-if="contentAnmShowStatus.coupon===false">
            <van-cell title="优惠券" value="领取优惠券" is-link @click="couponCellClickFn" v-if="comShowStatus.couponCell" />
            <!--<van-cell title="促销信息" value="查看促销信息" is-link @click="popupOptions.promotion.show=true" v-if="goodContentData.promotion.length>0"/>-->
        </div>
        <!--包含服务(售后等)-->
        <!--<div class="publicCellBox">-->
            <!--<van-cell title="服务" class="serviceCell" is-link v-if="goodContentData.service.length>0" @click="popupOptions.service.show=true" :value="returnServieTotal()"/>-->
        <!--</div>-->
        <!--商品规格和商品详细参数-->
        <div class="publicCellBox" v-if="!contentAnmShowStatus.sku">
            <van-cell title="规格" :value="returnNowSkuSelectedName" is-link @click="popupOptions.sku.show=true" v-if="goodSkuInfo.sku.none_sku===false"/>
            <!--<van-cell title="规格" :value="returnNowSkuSelectedName" is-link @click="popupOptions.sku.show=true" v-if="goodSkuInfo.sku.none_sku===true"/>-->
            <!--<van-cell title="参数" value="商品详细参数" is-link @click="popupOptions.goodParams.show=true" v-if="goodContentData.goodDetailParams.length>0" />-->
        </div>
        <!--商品晒单评价和购买咨询-->
        <!--<div class="goodJAndQBg">-->
            <!--<van-tabs v-model="goodJAndQData.tabActive">-->
                <!--&lt;!&ndash;晒单评价&ndash;&gt;-->
                <!--<van-tab title="晒单评价">-->
                    <!--<ul class="evaListBox" id="evaListBox">-->
                        <!--<li v-for="(item,index) in goodJAndQData.goodJList" :key="index">-->
                            <!--<div class="evaListStyle">-->
                                <!--&lt;!&ndash;顶部用户信息和评分&ndash;&gt;-->
                                <!--<div class="header">-->
                                    <!--<div class="img" :style="returnUserIconImgFn(item.userInfo.icon)">-->
                                        <!--&lt;!&ndash;<img :src="item.userInfo.icon" alt="">&ndash;&gt;-->
                                    <!--</div>-->
                                    <!--<div class="info">-->
                                        <!--<h3>{{item.userInfo.userName}}</h3>-->
                                        <!--<van-rate-->
                                                <!--v-model="item.evaLv"-->
                                                <!--:count="5"-->
                                                <!--:size="14"-->
                                                <!--color="#ffa133"-->
                                                <!--void-color="#999"-->
                                                <!--disabled-->
                                        <!--&gt;</van-rate>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--&lt;!&ndash;评论内容&ndash;&gt;-->
                                <!--<p class="content">{{item.content}}</p>-->
                                <!--&lt;!&ndash;图片列表&ndash;&gt;-->
                                <!--<ul class="imgList" v-if="item.evaImg.length>0">-->
                                    <!--<li v-for="(img,index) in item.evaImg" :key="index">-->
                                        <!--<img :src="img" alt="">-->
                                    <!--</li>-->
                                <!--</ul>-->
                                <!--&lt;!&ndash;时间和规格&ndash;&gt;-->
                                <!--<div class="bottom">-->
                                    <!--<p class="left">{{item.ggName}}</p>-->
                                    <!--<p class="right">{{item.time}}</p>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</van-tab>-->
                <!--<van-tab title="购买咨询">-->
                    <!--&lt;!&ndash;购买咨询列表&ndash;&gt;-->
                    <!--<div class="qAndAListBox">-->
                        <!--<van-cell :title="'问:'+item.q" :label="'答:'+item.a" is-link v-for="(item,index) in goodJAndQData.goodQList" :key="index">-->
                        <!--</van-cell>-->
                    <!--</div>-->
                <!--</van-tab>-->
            <!--</van-tabs>-->
            <!--&lt;!&ndash;查看更多&ndash;&gt;-->
            <!--<div class="checkMore">查看更多<van-icon name="arrow"></van-icon></div>-->
        <!--</div>-->
        <!--店铺介绍-->
        <div class="goodShopBox"  v-if="!contentAnmShowStatus.shopInfo">
            <!--头部-->
            <div class="header">
                <!--<p class="left">-->
                    <!--<img :src="goodContentData.shopInfo.shopIcon" alt="">-->
                <!--</p>-->
                <p class="shopName">{{goodContentData.shopInfo.shopName}}</p>
                <!--<p class="into" @click="goToShopCenter">进入店铺<van-icon name="arrow"></van-icon></p>-->
            </div>
            <!--店铺商品滚动列表-->
            <!--<div class="floatSwiperBox">-->
                <!--<swiper :options="floatSwiperOption">-->
                    <!--<swiper-slide v-for="(item,index) in floatSwiperOption.goodsList" :key="index">-->
                        <!--<div class="indexFloatBox" @click="floatBannerClickFn(item)">-->
                            <!--<div class="img">-->
                                <!--<img :src="item.imgUrl" alt=""/>-->
                            <!--</div>-->
                            <!--<p class="text">{{item.name}}</p>-->
                            <!--<p class="price">￥{{(item.newPrice/100).toFixed(2)}}</p>-->
                        <!--</div>-->
                    <!--</swiper-slide>-->
                    <!--<div class="swiper-pagination" slot="pagination" id="indexFloatBannerPagination"></div>-->
                <!--</swiper>-->
            <!--</div>-->
        </div>
        <!--商品详情的line-->
        <div class="goodContentHeaderLine">商品详情</div>
        <!--商品详情的显示区域-->
        <div class="goodContentShowBox">
            <van-loading type="spinner" color="black" v-if="contentAnmShowStatus.goodIContent===true"
                         class="globalLoadingAnmClass"></van-loading>
            <div v-html="goodContentData.goodIContent" v-if="contentAnmShowStatus.goodIContent===false">
            </div>

            <!--<img src="../../assets/images/shoppingMall/goodContent/img1.jpg" alt="">-->
            <!--<img src="../../assets/images/shoppingMall/goodContent/img2.jpg" alt="">-->
        </div>
        <!--商品详情的line-->
        <!--<div class="goodContentHeaderLine">猜你喜欢</div>-->
        <!--&lt;!&ndash;猜你喜欢列表&ndash;&gt;-->
        <!--<div class="guessYourLikeBox">-->
            <!--<guessYouLikeGood v-bind:guessLikeData="toGuessLikeData"></guessYouLikeGood>-->
        <!--</div>-->
        <!--行动点-->
        <van-goods-action style="z-index: 2000;">
            <van-goods-action-mini-btn :icon="returnGoodLoveStatus()[0]" :text="returnGoodLoveStatus()[1]" @click="getIntoMyCollection"/>
            <!--<van-goods-action-mini-btn icon="cart" text="购物车" @click="goToCartPage"/>-->
            <!--<van-goods-action-mini-btn icon="shop" text="店铺" @click="goToShopCenter"/>-->
            <van-goods-action-big-btn text="加入购物车" @click="getIntoCart"/>
            <!--<van-goods-action-big-btn text="立即购买" primary @click="buyNowFn" />-->
        </van-goods-action>
        <!--服务弹窗-->
        <van-popup v-model="popupOptions.service.show" :position="popupOptions.service.position" :overlay="popupOptions.service.overlay">
            <p class="publicPopupTitle">商品服务</p>
            <van-cell-group class="goodServicePopupBox">
                <van-cell icon="passed" :title="item.title" v-for="(item,index) in goodContentData.service" :key="index"></van-cell>
            </van-cell-group>
            <p class="publicClosePopupButton" @click="popupOptions.service.show=false">完成</p>
        </van-popup>
        <!--商品详细参数弹窗-->
        <van-popup v-model="popupOptions.goodParams.show" :position="popupOptions.goodParams.position" :overlay="popupOptions.goodParams.overlay">
            <!--<p class="publicPopupTitle">产品参数</p>-->
            <van-cell-group class="goodDetailParams" style="overflow: scroll">
                <van-cell :value="item.value" :title="item.key" v-for="(item,index) in goodContentData.goodDetailParams" :key="index"></van-cell>
            </van-cell-group>
            <p class="publicClosePopupButton" @click="popupOptions.goodParams.show=false">完成</p>
        </van-popup>
        <!--促销信息弹窗-->
        <van-popup v-model="popupOptions.promotion.show" :position="popupOptions.goodParams.position" :overlay="popupOptions.goodParams.overlay">
            <p class="publicPopupTitle">促销信息</p>
            <van-cell-group class="promotion">
                <van-cell icon="after-sale" :label="item.content" :title="item.title" v-for="(item,index) in goodContentData.promotion" :is-link="item.isLink" :key="index"></van-cell>
            </van-cell-group>
            <p class="publicClosePopupButton" @click="popupOptions.promotion.show=false">完成</p>
        </van-popup>
        <!--优惠券信息弹窗-->
        <van-popup class="couponPopup" v-model="popupOptions.coupon.show" :position="popupOptions.coupon.position" :overlay="popupOptions.coupon.overlay">
            <p class="publicPopupTitle">店铺优惠券</p>
            <!--优惠券列表-->
            <div class="shopCouponListBox">
                <van-loading type="spinner" color="black" v-if="popupOptions.coupon.loadingDone===false"
                             class="globalLoadingAnmClass"></van-loading>
                <ul class="shopCouponList" v-if="popupOptions.coupon.loadingDone===true">
                    <li v-for="(item,index) in goodWithCouponList" :key="index">
                        <div class="shopCouponListStyle" @click="getCouponFn(item)">
                            <div class="left">
                                <div class="shopCouponListLeftBorder">
                                    
                                </div>
                                <div class="shopCouponListLeftContent">
                                    <h3><span>￥</span>{{(item.discount/100).toFixed(2)}}</h3>
                                    <p v-text="returnCouponThresholdFn(item)"></p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="had" v-if="item.is_received===1">
                                    <van-icon name="success" style="color: #fff;"></van-icon>
                                </div>
                                <h3>{{item.coupon_name}}</h3>
                                <p><span v-text="tools.globalFn.returnDateForCoupon(item.start_time)"></span>至<span v-text="tools.globalFn.returnDateForCoupon(item.expiration_date)"></span></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="publicClosePopupButton" @click="popupOptions.coupon.show=false">完成</p>
        </van-popup>
        <!--sku信息弹窗-->
        <!--<van-popup class="sku" v-model="popupOptions.sku.show" :position="popupOptions.sku.position" :overlay="popupOptions.sku.overlay">-->
            <!--<van-loading type="spinner" color="black" v-if="popupOptions.sku.loadingDone===false"-->
                         <!--style="position: absolute;left:50%;top: 50%;margin-left: -15px;margin-top: -15px;"></van-loading>-->
            <!---->
        <!--</van-popup>-->
        <van-sku
                v-model="popupOptions.sku.show"
                :sku="goodSkuInfo.sku"
                :goods="goodSkuInfo.goods"
                :goods-id="goodContentData.id"
                :hide-stock="goodSkuInfo.hideStock"
                :quota="goodSkuInfo.quota"
                :quota-used="goodSkuInfo.quotaUsed"
                :show-add-cart-btn="goodSkuInfo.showAddCartBtn"
                :reset-stepper-on-hide="goodSkuInfo.resetStepperOnHide"
                :reset-selected-sku-on-hide="goodSkuInfo.resetSelectedSkuOnHide"
                :close-on-click-overlay="goodSkuInfo.closeOnClickOverlay"
                :disable-stepper-input="goodSkuInfo.disableStepperInput"
                @buy-clicked="onBuyClicked"
                @add-cart="onAddCartClicked"
                @stepper-change="skuNumChangeFn"
                @sku-selected="skuComOnSelect"
                ref="skuCom"
        >
            <!-- 自定义 sku actions -->
            <template slot="sku-actions" slot-scope="props">
                <div class="van-sku-actions">
                    <!--<van-button bottom-action @click="onPointClicked">加入购物车</van-button>-->
                    <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
                    <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">加入购物车</van-button>
                </div>
            </template>
        </van-sku>
    </div>
</template>

<script>
    import vm from "../../main"
    import guessYouLikeGood from "../global/guessYouLikeGood"
    export default {
        name: 'goodContent',
        data() {
            return {
                //各个组件是否显示
                comShowStatus:{
                    //领取优惠券的cell
                    couponCell:false
                },
                //用户选择的sku信息
                userSkuSelectDataSave:{
                    //用来返回文字的数组
                    nameArr:[],
                    //存储上一次的选择是否完成
                    lastSelectSave:null,
                    //用来存储的
                    save:{
                        s1:"",
                        s2:"",
                        s3:""
                    }
                },
                //存储需要对照的skuId（来自fecshop）
                fecSkuSave:{
                    list:[]
                },
                //存储请求到的列表
                localToOrderGoodObj:{},
                //顶部banner配置
                //首页顶部banner配置
                indexTopSwiperOption: {
                    pagination: {
                        el: '#indexTopBannerPagination'
                    },
                    slidesPerView: 1,
                    spaceBetween: 0,
                    autoHeight:true,
                    autoplay: {
                        delay: 2000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false
                    }
                },
                //是否收藏了该商品
                thisGoodIsLoveStatus:false,
                //该商品可领取的优惠券列表
                goodWithCouponList:[
                    // {
                    //     id:11,
                    //     title:"哦牛批-5元优惠券",
                    //     price:100,
                    //     needEnough:1000,
                    //     startTime:18212514141,
                    //     endTime:1512512541,
                    //     checked:true
                    // }
                ],
                //几个弹窗的设置
                popupOptions:{
                    //服务弹窗
                    service:{
                        show:false,
                        position:"bottom",
                        //是否显示遮罩层
                        overlay:true
                    },
                    //商品详细参数
                    goodParams:{
                        show:false,
                        position:"bottom",
                        //是否显示遮罩层
                        overlay:true
                    },
                    //促销信息
                    promotion:{
                        show:false,
                        position:"bottom",
                        //是否显示遮罩层
                        overlay:true
                    },
                    //优惠券信息
                    coupon:{
                        show:false,
                        position:"bottom",
                        //是否显示遮罩层
                        overlay:true,
                        //是否已经加载完成
                        loadingDone:false
                    },
                    //sku信息
                    sku:{
                        show:false,
                        position:"bottom",
                        //是否显示遮罩层
                        overlay:true,
                        //是否已经加载完成
                        loadingDone:true
                    }
                },
                //传递给猜你喜欢组件的信息
                toGuessLikeData:{
                    id:199,
                    title:"哦牛批"
                },
                //店铺信息下的滚动列表
                floatSwiperOption: {
                    pagination: {
                        el: '#indexFloatBannerPagination'
                    },
                    slidesPerView: 3,
                    spaceBetween: 10,
                    freeMode: true,
                    resistanceRatio: 0,
                    // autoplay: {
                    //     delay: 0,
                    //     stopOnLastSlide: false,
                    //     disableOnInteraction: false
                    // },
                    goodsList:[
                        {
                            id:188,
                            imgUrl: require("../../assets/images/shoppingMall/index/MsShopImg.png"),
                            name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                            goodJNum: 50,
                            oldPrice: 100,
                            newPrice: 80
                        },
                        {
                            id:2,
                            imgUrl: require("../../assets/images/shoppingMall/index/MsShopImg.png"),
                            name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                            goodJNum: 50,
                            oldPrice: 100,
                            newPrice: 80
                        },{
                            id:3,
                            imgUrl: require("../../assets/images/shoppingMall/index/MsShopImg.png"),
                            name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                            goodJNum: 50,
                            oldPrice: 100,
                            newPrice: 80
                        },
                        {
                            id:4,
                            imgUrl: require("../../assets/images/shoppingMall/index/MsShopImg.png"),
                            name: "哦牛批商品1哦牛批商品1哦牛批商品1哦牛批商品1",
                            goodJNum: 50,
                            oldPrice: 100,
                            newPrice: 80
                        }
                    ]
                },
                //晒单和购买咨询的tab
                goodJAndQData:{
                    //目前选中哪个
                    tabActive:0,
                    //goodJ内容
                    goodJList:[
                        {
                            id:166,
                            userInfo:{
                                id:112,
                                userName:"哦牛批用户",
                                icon:require("../../assets/images/shoppingMall/userCenter/guassYouLikeImg.png")
                            },
                            //评论星级
                            evaLv:2,
                            //评论内容
                            content:"哦牛批，东西真的牛皮，下次不买了。",
                            //评论图片
                            evaImg:["../../assets/images/shoppingMall/userCenter/evaListImg1.png","../../../images/shoppingMall/index/indexFloorAd1.png"],
                            //评论时间
                            time:"2018-8-20",
                            //购买的规格
                            ggName:"颜色：哦牛批颜色"
                        },
                        {
                            id:2,
                            userInfo:{
                                id:2323,
                                userName:"哦牛批用户",
                                icon:require("../../assets/images/shoppingMall/userCenter/guassYouLikeImg.png")
                            },
                            //评论星级
                            evaLv:2,
                            //评论内容
                            content:"哦牛批，东西真的牛皮，下次不买了。",
                            //评论图片
                            evaImg:["../../assets/images/shoppingMall/userCenter/evaListImg1.png"],
                            //评论时间
                            time:"2018-8-20",
                            //购买的规格
                            ggName:"颜色：哦牛批颜色"
                        }
                    ],
                    //购买咨询
                    goodQList:[
                        {
                            id:144,
                            q:"必须把这表镜给我拿下奥。",
                            a:"必须滴，放心吧"
                        }
                    ]
                },
                //各板块是否加载完成的动画(true是显示动画，false关闭动画)
                contentAnmShowStatus:{
                    //顶部banner部分
                    topBanner:true,
                    //商品图文详情介绍
                    goodIContent:true,
                    //sku规格
                    sku:true,
                    //优惠券
                    coupon:true,
                    //店铺信息
                    shopInfo:true
                },
                //顶部banner配置
                topBannerOption:{
                    //轮播速度
                    autoplay:0,
                    //banner列表
                    list:[
                    //     {
                    //     id: 123,
                    //     imgUrl: require("../../assets/images/shoppingMall/index/banner1.png"),
                    //     name: "banner1"
                    // },
                    //     {
                    //         id: 345,
                    //         imgUrl: require("../../assets/images/shoppingMall/index/banner2.png"),
                    //         name: "banner2"
                    //     }
                    ]
                },
                //该商品详情
                goodContentData:{
                    id:"",
                    title:"读取中",
                    price:0,
                    sku:{

                    },
                    //商品介绍详情
                    goodIContent:"",
                    yf:0,
                    saleNum:0,
                    area:"济南",
                    //包含的服务
                    service:[
                        {
                            id:34,
                            title:"不支持七天无理由"
                        },
                        {
                            id:2,
                            title:"三年质保，只修不换"
                        }
                    ],
                    //商品详细参数
                    goodDetailParams:[
                        {
                            key:"哦牛批参数1",
                            value:"哦牛批值1"
                        }
                    ],
                    //店铺信息
                    shopInfo:{
                        id:123,
                        shopName:"哦牛批店铺",
                        shopIcon:require("../../assets/images/shoppingMall/index/banner2.png")
                    },
                    //促销信息
                    promotion:[
                        {
                            id:213,
                            title:"满减",
                            content:"满100-50",
                            time:"2018-02-30 - 2018-02-50",
                            isLink:false
                        },
                        {
                            id:435,
                            title:"折扣",
                            content:"0.7折",
                            time:"2018-02-30 - 2018-02-50",
                            isLink:true
                        }
                    ]
                },
                //该商品下sku信息
                goodSkuInfo:{
                    //sku信息
                    sku: {
                        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                        tree: [
                            // {
                            //     k: '颜色', // skuKeyName：规格类目名称
                            //     v: [
                            //         {
                            //             id: '30349', // skuValueId：规格值 id
                            //             name: '红色', // skuValueName：规格值名称
                            //             imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                            //         },
                            //         {
                            //             id: '1215',
                            //             name: '蓝色',
                            //             imgUrl: 'https://img.yzcdn.cn/2.jpg'
                            //         },
                            //         {
                            //             id: '1216',
                            //             name: '黑色',
                            //             imgUrl: 'https://img.yzcdn.cn/2.jpg'
                            //         },
                            //         {
                            //             id: '1299',
                            //             name: '白色',
                            //             imgUrl: 'https://img.yzcdn.cn/2.jpg'
                            //         }
                            //     ],
                            //     k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            // },
                            // {
                            //     k: '大小', // skuKeyName：规格类目名称
                            //     v: [
                            //         {
                            //             id: '5469', // skuValueId：规格值 id
                            //             name: '大', // skuValueName：规格值名称
                            //         },
                            //         {
                            //             id: '5632',
                            //             name: '小',
                            //         },
                            //         {
                            //             id: '563223',
                            //             name: '很小',
                            //         },
                            //         {
                            //             id: '563223',
                            //             name: '非常小',
                            //         }
                            //     ],
                            //     k_s: 's2' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            // },
                            // {
                            //     k: '材质', // skuKeyName：规格类目名称
                            //     v: [
                            //         {
                            //             id: '12345', // skuValueId：规格值 id
                            //             name: '塑料', // skuValueName：规格值名称
                            //         },
                            //         {
                            //             id: '5632',
                            //             name: '皮革',
                            //         },
                            //         {
                            //             id: '56321',
                            //             name: '混合',
                            //         },
                            //         {
                            //             id: '563212',
                            //             name: '俺也不知道是啥',
                            //         }
                            //     ],
                            //     k_s: 's3' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            // }
                        ],
                        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                        list: [
                            // {
                            //     id: 2259, // skuId，下单时后端需要
                            //     price: 100, // 价格（单位分）
                            //     s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                            //     s2: '5469', // 规格类目 k_s 为 s2 的对应规格值 id
                            //     s3: '12345', // 最多包含3个规格值，为0表示不存在该规格
                            //     stock_num: 110 // 当前 sku 组合对应的库存
                            // },
                            // {
                            //     id: 6398, // skuId，下单时后端需要
                            //     price: 120, // 价格（单位分）
                            //     s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                            //     s2: '5632', // 规格类目 k_s 为 s2 的对应规格值 id
                            //     s3: '5632', // 最多包含3个规格值，为0表示不存在该规格
                            //     stock_num: 90 // 当前 sku 组合对应的库存
                            // }
                        ],
                        price: '500', // 默认价格（单位元）
                        stock_num: 227, // 商品总库存
                        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                        none_sku: false, // 是否无规格商品(无规格商品需要把sku规格列表和所有sku组合列表清空)
                        messages: [
                            {
                                // 商品留言
                                datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                                multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                                name: '留言', // 留言名称
                                type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                                required: '0' // 是否必填 '1' 表示必填
                            }
                        ],
                        hide_stock: false // 是否隐藏剩余库存
                    },
                    //商品信息
                    goods: {
                        // 商品标题
                        title: '读取中',
                        // 默认商品 sku 缩略图
                        picture: ''
                    },
                    //是否显示剩余库存
                    hideStock:false,
                    //限购数
                    quota:0,
                    //已经买过的数量
                    quotaUsed:0,
                    //窗口隐藏时是否重置选择的商品数量
                    resetStepperOnHide:false,
                    //窗口隐藏时是否重置已选择的sku
                    resetSelectedSkuOnHide:false,
                    //点击popup的overlay后是否关闭弹窗
                    closeOnClickOverlay:true,
                    //是否禁用sku中stepper的input框
                    disableStepperInput:false,
                    //是否显示加入购物车按钮
                    showAddCartBtn:true
                },
            }
        },
        computed:{
            returnNowSkuSelectedName(){
                if(this.userSkuSelectDataSave.nameArr.length===0){
                    console.log("触发等于0");
                    return "选择规格";
                }
                else if(this.userSkuSelectDataSave.nameArr.length>0){
                    console.log("触发不等于0");
                    console.log(this.userSkuSelectDataSave.nameArr.join());
                    return this.userSkuSelectDataSave.nameArr.join();
                }
            }
        },
        components:{
            guessYouLikeGood
        },
        methods: {
            //点击领取优惠券cell
            couponCellClickFn(){
                //如果优惠券里已经有值，那么就不再请求，直接显示
                if(this.goodWithCouponList.length>0){
                    //显示优惠券
                    this.popupOptions.coupon.show=true;
                    return;
                }
                //如果没登录，且当前模式为线上，那么就请求无登录的
                if(this.tools.globalFn.isLoginFn(this)===false&&this.$store.state.isDevMode===0){
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/promotion/cata/shopcoupon",
                        method:"GET",
                        params:{
                            ushop_id:this.goodContentData.shopInfo.id
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.goodWithCouponList=res.data.data.couponList;
                                this.popupOptions.coupon.loadingDone=true;
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
                            ushop_id:this.goodContentData.shopInfo.id
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.goodWithCouponList=res.data.data.couponList;
                                this.popupOptions.coupon.loadingDone=true;
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
                            ushop_id:this.goodContentData.shopInfo.id
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.goodWithCouponList=res.data.data.couponList;
                                this.popupOptions.coupon.loadingDone=true;
                            }
                        }
                    });
                }
                //显示优惠券
                this.popupOptions.coupon.show=true;


            },
            //选择sku的方法
            skuComOnSelect(e){
                /*
                  返回三个参数
                  1.selectedSku:有几层sku就是几层，例如
                  一层：{
                     s1:""
                  }
                  2.selectedSkuComb:已经选择的sku组合，如果有返回
                  id:(...)
                  price:(...)
                  s1:(...)
                  s2:(...)
                  s3:(...)
                  stock_num:(...)
                  没有的话返回null(只有多规格的情况下会返回null)
                  3.skuValue:当前选择的这个规格类目的详情
                */
                console.log(e);
                // //如果null说明不止单层规格，尚未选择完成,只做暂存，不显示
                //存储上一次的选择
                this.userSkuSelectDataSave.lastSelectSave=e.selectedSkuComb;
                if(e.selectedSkuComb===null){
                    if(e.skuValue.skuKeyStr==="s1"){
                        //存储到0位置
                        this.userSkuSelectDataSave.save.s1=e.skuValue.name;
                    }
                    else if(e.skuValue.skuKeyStr==="s2"){
                        this.userSkuSelectDataSave.save.s2=e.skuValue.name;
                    }
                    console.log("打印null存储的");
                    console.log(this.userSkuSelectDataSave.save);
                    //只要null，就清空
                    this.userSkuSelectDataSave.nameArr=[];
                    //存完以后直接return
                    return;
                }
                else if(e.selectedSkuComb!==null){
                    //说明已经选择完成,存储最后一个值
                    if(e.skuValue.skuKeyStr==="s1"){
                        //存储到0位置
                        this.userSkuSelectDataSave.save.s1=e.skuValue.name;
                    }
                    else if(e.skuValue.skuKeyStr==="s2"){
                        this.userSkuSelectDataSave.save.s2=e.skuValue.name;
                    }
                    else if(e.skuValue.skuKeyStr==="s3"){
                        this.userSkuSelectDataSave.save.s3=e.skuValue.name;
                    }
                }
                console.log("已经存储完毕，准备更新视图");
                console.log(this.userSkuSelectDataSave.save);
                //如果不是null，说明已经选择完毕，那么可以进行视图更新
                if(this.userSkuSelectDataSave.save.s1!==""&&this.userSkuSelectDataSave.save.s1!==null){
                    console.log("放置0位置");
                    //存储到0位置
                    this.$set(this.userSkuSelectDataSave.nameArr,0,this.userSkuSelectDataSave.save.s1);
                }
                if(this.userSkuSelectDataSave.save.s2!==""&&this.userSkuSelectDataSave.save.s2!==null){
                    console.log("放置1位置");
                    this.$set(this.userSkuSelectDataSave.nameArr,1,this.userSkuSelectDataSave.save.s2);
                }
                if(this.userSkuSelectDataSave.save.s3!==""&&this.userSkuSelectDataSave.save.s3!==null){
                    console.log("放置2位置");
                    this.$set(this.userSkuSelectDataSave.nameArr,2,this.userSkuSelectDataSave.save.s3);
                }
                console.log(this.userSkuSelectDataSave.nameArr);
            },
            //商品加入收藏的方法
            getIntoMyCollection(){
                console.log(this.thisGoodIsLoveStatus);
                console.log(this.goodContentData.id);
                if(this.tools.globalFn.isLoginFn()===false&&this.$store.state.isDevMode===0){
                    //跳转登录页面
                    //给xx传值
                    this.$bridge.callHandler('toLogin');
                    return false;
                }
                if(this.thisGoodIsLoveStatus===true){
                    //如果已经收藏，取消收藏
                    //请求接口
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin:true,
                        url:"/customer/productfavorite/remove",
                        method:"POST",
                        data:{
                            product_id:this.goodContentData.id
                        },
                        success:(res)=>{
                            this.$toast(res.data.data);
                            if(res.data.code===200){
                                this.tools.globalFn.publicToastFn(this,"已取消");
                                this.thisGoodIsLoveStatus=false;
                            }
                        }
                    })
                }
                else if(this.thisGoodIsLoveStatus===false){
                    //如果是false，请求收藏
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin:true,
                        url:"/catalog/product/favorite",
                        method:"GET",
                        params:{
                            product_id:this.goodContentData.id
                        },
                        success:(res)=>{
                            if(res.data.code===200){
                                this.tools.globalFn.publicToastFn(this,"收藏成功！");
                                this.thisGoodIsLoveStatus=true;
                            }
                        }
                    })
                }

            },
            //立即购买的方法
            buyNowFn(){
                if(this.tools.globalFn.isLoginFn()===false&&this.$store.state.isDevMode===0){
                    // alert("没登录！！");
                    //跳转登录页面
                    //给xx传值
                    this.$bridge.callHandler('toLogin');
                    return false;
                }
                //否则弹出sku选择
                this.popupOptions.sku.show=true;
                // {
                //     "item_id": 10,
                //     "active": 1,
                //     "product_id": "581c6833f656f2042f2f0b77",
                //     "sku": "222212",
                //     "name": "",
                //     "qty": 11,
                //     "custom_option_sku": "red-s-s2-s3",
                //     "product_price": 25,
                //     "img_url": "//img.tobebetterman.com/2/01/20161024170457_10036.jpg",
                //     "url": "/catalog/product/581c6833f656f2042f2f0b77",
                //     "custom_option_info": []
                // }
                //检测是否选择规格
                // if(this.userSkuSelectDataSave.nameArr.length===0){
                //     //如果名字数组的长度为0，那就是没有选择，直接弹出sku选择框
                //     this.popupOptions.sku.show=true;
                //     return;
                // }
                //如果大于0，那就是选择了，直接进行订单确认跳转
                // console.log("跳转结算订单");
                //拼成如上对象组成数组放入本地存储
                // sessionStorage.setItem("selectedGoodList",JSON.stringify([{
                //     item_id:""
                // }]));
                // this.$router.push({name:"confirmOrder"});
                //把商品放入本地存储，然后到订单详情页面解析
            },
            //加入购物车的方法
            getIntoCart(){
                // alert(localStorage.nickName);
                if(this.$store.state.isDevMode===0){
                    if(this.tools.globalFn.isLoginFn()===false){
                        //跳转登录页面
                        //给xx传值
                        this.$bridge.callHandler('toLogin');
                        return false;
                    }
                }
                //如果是有sku的商品，弹出sku选择
                if(!this.goodSkuInfo.sku.none_sku){
                    //弹出sku选择框
                    this.popupOptions.sku.show=true;
                    return;
                }
                //如果是没有sku的商品
                // console.log(this.goodSkuInfo);
                // console.log("打印该商品id");
                // console.log(this.goodSkuInfo.sku.collection_id);
                //直接请求加入
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/checkout/cart/add",
                    needLogin:true,
                    data:{
                        //商品id
                        product_id:this.goodSkuInfo.sku.collection_id,
                        //数量
                        qty:1,
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.tools.globalFn.publicToastFn(this,"加入成功");
                        }
                    }
                });
            },
            //去店铺中心的方法
            goToShopCenter(){
                //
                // this.tools.globalFn.publicToastFn(this,"敬请期待");
                this.$router.push("/shopCenter/index/"+this.goodContentData.shopInfo.id);
                // this.$router.push('/shopCenter/index/'+10);
            },
            //去购物车的方法
            goToCartPage(){
                if(this.tools.globalFn.isLoginFn()===false&&this.$store.state.isDevMode===0){
                    //跳转登录页面
                    //给xx传值
                    this.$bridge.callHandler('toLogin');
                    return false;
                }
                this.$router.push({name:'shopCart'});
            },
            //返回上一页方法
            backLastPage(){
                // this.$router.go(-1);
                //关闭当前webview
                this.$bridge.callHandler("closeCurrentWebviewFn");
            },
            //返回该商品的icon和文字的方法
            returnGoodLoveStatus(){
                if(this.thisGoodIsLoveStatus===false){
                    return ["like-o","收藏"];
                }
                else if(this.thisGoodIsLoveStatus===true){
                    return ["like","已收藏"]
                }
            },
            //商品选择数量发生变化的方法
            skuNumChangeFn(value){
                console.log(value);
            },
            //通用的找寻fecSku的方法
            publicSearchFecSkuFn(word){
                /*参数说明
                * word:需要查找的skuKey
                * 结果：找到返回key值所在的对象，找不到返回-1
                * */
                for(let key in this.fecSkuSave.list){
                    if(key===word){
                        return this.fecSkuSave.list[key];
                    }
                }
                return -1;
            },
            //sku-点击了加入购物车的方法
            onAddCartClicked(skuData){
                alert("sku加入购物车");
                alert(JSON.stringify(skuData));
                console.log("来自加入购物车");
                console.log(skuData);
                let result=this.publicSearchFecSkuFn(skuData.selectedSkuComb.custom_option_key);
                console.log(JSON.stringify(result));
                if(result!==-1){
                    console.log("哦牛批");
                    //去掉result的img属性
                    delete result.image;
                    console.log(result);
                    //如果找到了对应的sku，那么就开始加入购物车请求
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/checkout/cart/add",
                        needLogin:true,
                        data:{
                            //fecSku
                            custom_option:JSON.stringify(result),
                            //商品id
                            product_id:skuData.goodsId,
                            //数量
                            qty:skuData.selectedNum,
                            //所属模块
                            module_type:1
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.tools.globalFn.publicToastFn(this,"添加成功");
                            }
                            else{
                                this.tools.globalFn.publicToastFn(this,res.data.message);
                            }
                        }
                    });
                }
            },
            //点击了立即购买的方法(当成加入购物车做)
            onBuyClicked(skuData){
                if(this.$store.state.isDevMode===0){
                    if(this.tools.globalFn.isLoginFn()===false){
                        //跳转登录页面
                        //给xx传值
                        this.$bridge.callHandler('toLogin');
                        return false;
                    }
                }
                //如果找到了对应的sku，那么就开始加入购物车请求
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/checkout/cart/add",
                    needLogin:true,
                    data:{
                        //fecSku
                        custom_option:JSON.stringify(this.returnFinalNeedDataFn(skuData)),
                        //商品id
                        product_id:skuData.goodsId,
                        //数量
                        qty:skuData.selectedNum,
                        //所属模块
                        module_type:1
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            this.tools.globalFn.publicToastFn(this,"添加成功");
                        }
                        else{
                            this.tools.globalFn.publicToastFn(this,res.data.message);
                        }
                    }
                });
            },
            //返回最终提交data的方法
            returnFinalNeedDataFn(skuData){
                let result=this.publicSearchFecSkuFn(skuData.selectedSkuComb.custom_option_key);
                //去掉result的img属性
                delete result.image;
                return result;
            },
            //return用户头像的方法
            returnUserIconImgFn(url){
                // console.log(url);
                return "background-image:url('"+url+"')";
            },
            //返回所有服务的方法
            returnServieTotal(){
                let str="";
                for(let key in this.goodContentData.service){
                    str+=" ";
                    str+=this.goodContentData.service[key].title;
                }
                return str;
            },
            //领取优惠券的方法
            getCouponFn(item){
                console.log(item);
                //如果魅登录且是线上模式直接登录
                if(this.tools.globalFn.isLoginFn(this)===false&&this.$store.state.isDevMode===0){
                    this.$bridge.callHandler("toLogin");
                    return false;
                }
                //如果已经登录且是线上模式,直接领取
                if(this.tools.globalFn.isLoginFn(this)===true&&this.$store.state.isDevMode===0){
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
                            }
                            else{
                                this.tools.globalFn.publicToastFn(this,res.data.message);
                            }
                        }
                    });
                    return false;
                }
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
                        }
                        else{
                            this.tools.globalFn.publicToastFn(this,res.data.message);
                        }
                    }
                });
            },
            //返回优惠券门槛的方法
            returnCouponThresholdFn(item){
                // return item.coupon_title;
                if(item.type==1){
                    //1是折扣型，直接返回无门槛
                    return "无门槛";
                }
                else if(item.type==2){
                    if(parseInt(item.conditions)===0){
                        return "无门槛"
                    }
                    return "满"+(parseInt(item.conditions)/100).toFixed(2)+"元可用";
                }
            },
            //是否需要传递header的方法
            needHeaderFn(){
                //如果当前是开发模式，那么默认传递
                if(this.$store.state.isDevMode===1){
                    return true;
                }
                //如果当前是线上模式，且已经登录，那么传递
                else if(this.$store.state.isDevMode===0&&this.tools.globalFn.isLoginFn(this)===true){
                    return true;
                }
                else{
                    return false;
                }
            },
            //初始化数据
            getFirstData(){
                //拿到路由里的商品id
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin:this.needHeaderFn(),
                        url:"/catalog/product/index",
                        method:"GET",
                        params:{
                            product_id:this.$route.params.id
                            // product_id:"5bbae9647209a84eb746d764"
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //查询店铺优惠券
                                this.tools.globalFn.publicAxiosFn(this,{
                                    url:"/promotion/cata/shopcoupon",
                                    method:"GET",
                                    ushop_id:res.data.data.product.ushop_id,
                                    success:(result)=>{
                                        if(result.data.code===200&&result.data.data.couponList.length>0){
                                            //有数据，那么就显示领取优惠券按钮
                                            this.comShowStatus.couponCell=true;
                                        }
                                    }
                                });
                                //存储到本地
                                // this.localToOrderGoodList[0]=res.data.data.product;
                                //放置参数信息
                                // this.goodContentData.goodDetailParams=res.data.data.product.groupAttrArr;
                                //放置商品名称
                                this.goodContentData.title=res.data.data.product.name;
                                //sku
                                //商品价格
                                this.goodContentData.price=res.data.data.product.price;
                                //商品id
                                this.goodContentData.id=res.data.data.product.product_id;
                                //商品图文详情
                                this.goodContentData.goodIContent=res.data.data.product.description;
                                //关闭图文详情动画
                                this.contentAnmShowStatus.goodIContent=false;
                                //顶部banner
                                this.topBannerOption.list=res.data.data.product.thumbnail_img;
                                //关闭banner加载动画
                                this.contentAnmShowStatus.topBanner=false;
                                //判断是否收藏
                                if(res.data.data.product.is_favorite===true){
                                    this.thisGoodIsLoveStatus=true;
                                }
                                else{
                                    this.thisGoodIsLoveStatus=false;
                                }
                                //存储fecSku
                                this.fecSkuSave.list=res.data.data.product.custom_option;
                                //放置所属店铺信息-id
                                this.goodContentData.shopInfo.id=res.data.data.product.ushop_id;
                                //放置所属店铺信息-店铺名
                                this.goodContentData.shopInfo.shopName=res.data.data.product.shop_name;
                                //显示店铺信息
                                this.contentAnmShowStatus.shopInfo=false;
                                //显示店铺优惠券cell
                                this.contentAnmShowStatus.coupon=false;
                                //放置sku中的商品标题
                                this.goodSkuInfo.goods.title=res.data.data.product.name;
                                //sku中放置商品id

                                //放置sku中的商品默认图
                                this.goodSkuInfo.goods.picture=res.data.data.product.thumbnail_img[0];
                                //放置sku中的默认价格
                                this.goodSkuInfo.sku.price=res.data.data.product.sku.price;
                                //放置sku的tree
                                this.goodSkuInfo.sku.tree=res.data.data.product.sku.tree;
                                //放置sku组合
                                this.goodSkuInfo.sku.list=res.data.data.product.sku.list;
                                //判断是否是无sku商品，从而从不同位置取商品id
                                this.goodSkuInfo.sku.collection_id=res.data.data.product.sku.collection_id;
                                // if(this.goodSkuInfo.sku.none_sku){
                                //     this.goodSkuInfo.sku.collection_id=res.data.data.product.product_id;
                                // }
                                // else{
                                //     //放置sku固定商品id
                                //     this.goodSkuInfo.sku.collection_id=res.data.data.product.sku.collection_id.$oid;
                                // }
                                console.log("打印放置完成以后的goodId");
                                console.log(this.goodSkuInfo.sku.collection_id);
                                //放置是否是无sku商品
                                this.goodSkuInfo.sku.none_sku=res.data.data.product.sku.none_sku;
                                //放置商品总库存
                                this.goodSkuInfo.sku.stock_num=res.data.data.product.sku.stock_num;
                                //放置商品是否显示剩余库存
                                this.goodSkuInfo.sku.hide_stock=res.data.data.product.sku.hide_stock;
                                //放置商品销量
                                this.goodContentData.saleNum=res.data.data.product.sale_num;
                                //显示sku
                                this.contentAnmShowStatus.sku=false;
                            }
                        }
                    }
                );
            },
        },
        created() {
            this.getFirstData();
            // alert(this.tools.globalFn.regDevModeFn(this));
        },
        mounted() {
        },
        updated() {
            // window.scroll(0, 0);
        },
        watch: {},
        // //在进入此路由之前，通知客户端进行状态栏改变操作
        // beforeRouteEnter(to, from, next){
        //     // alert(vm.$bridge.callHandler);
        //     // console.log(vm.$store.state.isDevMode);
        //     // alert(vm.$store.state.isDevMode);
        //     // alert(vm);
        //     if(vm.$store.state.isDevMode==0){
        //         // alert("进入模式");
        //         vm.$bridge.callHandler("statusBarBgChangeFn","#000000",(res)=>{
        //             // alert(res);
        //             next();
        //             // vm.tools.globalFn.publicToastFn(vm,"客户端传递"+res);
        //             // if(res==="true"){
        //             //     next();
        //             // }
        //         });
        //     }
        //     else if(vm.$store.state.isDevMode==1){
        //         next();
        //     }
        //
        // },
        // //在退出此路由之前，通知客户端进行状态栏改变操作
        // beforeRouteLeave(to, from, next){
        //     console.log(to);
        //     console.log(from);
        //     if(this.tools.globalFn.regDevModeFn(this)===0){
        //         //判断是否进入的是shopCenter
        //         this.$bridge.callHandler("statusBarBgChangeFn","0",(res)=>{
        //             // this.tools.globalFn.publicToastFn(this,"客户端传递"+res);
        //             if(res==="true"){
        //                 next();
        //             }
        //         });
        //     }
        //     else if(vm.$store.state.isDevMode==1){
        //         next();
        //     }
        // }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*猜你喜欢*/
    .guessYourLikeBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
    #goodContent{
        position: relative;
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
    /*通用的关闭弹窗的按钮样式*/
    .publicClosePopupButton{
        width: 90%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        line-height: 40px;
        color: #fafafa;
        background: #f44;
        margin: auto;
        border-radius: 50px;
        text-align: center;
        font-size: 14px;
        margin-bottom: 10px;
    }
    /*通用的弹窗title*/
    .publicPopupTitle{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
        color: #333;
        font-size: 16px;
        text-align: center;
        padding-top: 10px;
    }
    /*商品详情*/
    .goodContentShowBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        min-height: 50px;
    }
    .goodContentShowBox img{
        width:100%;
        display: block;
    }
    /*商品详情的头部*/
    .goodContentHeaderLine{
        padding: 10px 10px;
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
        color: #999;
    }
    /*店铺商品banner的样式*/
    .floatSwiperBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px;
    }
    .indexFloatBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .indexFloatBox>div.img{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .indexFloatBox>div.img img{
        display: block;
        width: 100%;
    }
    .indexFloatBox>p.text{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .indexFloatBox>p.price{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #e4393c;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    /*店铺介绍*/
    .goodShopBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        /*padding-bottom: 10px;*/
    }
    .goodShopBox>div.header{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 15px;
    }
    .goodShopBox>div.header>p.left{
        float: left;
        width: 30px;
        height: 30px;
        overflow: hidden;
        position: relative;
        margin-right: 6px;
        border-radius: 50%;
    }
    .goodShopBox>div.header>p.left img{
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .goodShopBox>div.header>p.shopName{
        float: left;
        height: 30px;
        line-height: 30px;
        color: #666;
        font-size: 16px;
    }
    .goodShopBox>div.header>p.into{
        float: right;
        color: #666;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        display: flex;
        align-items: center;
    }
    /*查看更多样式*/
    .goodJAndQBg .checkMore{
        text-align: center;
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #666;
        font-size: 12px;
        padding: 10px 0;
        background-color: #fff;
        border-top: 1px solid #f2f2f2;
        margin-bottom: 10px;
    }
    /*评论列表样式*/
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
    /*cell*/
    .publicCellBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*margin-bottom: 10px;*/
    }
    .publicCellBox>:last-child{
        margin-bottom: 10px;
    }
    /*商品基本信息*/
    .goodTitleBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 10px;
        background-color: #fff;
        margin-bottom: 10px;
    }
    .goodTitleBox p.title{
        color: #333;
        font-size: 16px;
        font-weight: 800;
        margin-bottom: 10px;
    }
    .goodTitleBox p.price{
        color: #f44;
        font-size: 16px;
        font-weight: 800;
        margin-bottom: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .goodTitleBox div.otherInfo{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    .goodTitleBox div.coupon{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .goodTitleBox div.otherInfo>p{
        color: #999;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
    }
    /*顶部banner*/
    .topIndexBannerBg{
        width: 100%;
        min-height: 50px;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }
    .topIndexBannerBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .topIndexBannerBox img{
        display: block;
        width: 100%;
    }
</style>
