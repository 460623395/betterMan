<template>
    <div class="publicAllContentBg" id="starShopIndex">
        <!--头部导航-->
        <van-nav-bar title="明星店铺"
                     class="globalNavBarHeaderClass"
                     style="z-index:9999"
                     @click-left="backLastPage"
                     @click-right="goToSearchPage"
                     left-arrow
                     left-text="返回"
                     fixed
        >
            <!--<van-icon name="sweep" slot="left" style="color: #fafafa" @click="useSweepCom"></van-icon>-->
            <!--<van-icon name="search" slot="right" class="globalNavBarIconClass"></van-icon>-->
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
                <swiper-slide v-for="(item,index) in bannerList" :key="index">
                    <div class="shoppingMallIndexBannerBox" @click="indexBannerLinkFn(item)">
                        <img :src="item.image" alt="" :title="item.name"/>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination" id="indexTopBannerPagination"></div>
            </swiper>
        </div>
        <!--明星版块-->
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
                            <img :src="todayRecData.right.bottom.image" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <!--今日推荐底部图片-->
            <!--<div class="todayRecBottomImg">-->
            <!--<img :src="todayRecData.bottomBanner.imgUrl" alt="">-->
            <!--</div>-->
        </div>
        <!--明星店铺滑动版块-->
        <div class="publicBannerBox needLoading whiteBg paddingAll" style="margin-bottom: 10px">
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.starShopBanner===true"
                         class="globalLoadingAnmClass"></van-loading>
            <!--顶部banner1-->
            <swiper id="starShopBottomBanner" :options="starShopSwiperOption" ref="starShopSwiper"
                    @slideChange="starShopSlideChange" v-if="pageComAnmShowStatus.starShopBanner===false">
                <swiper-slide v-for="(item,index) in starShopBannerList" :key="index">
                    <!--顶部图片-->
                    <div class="starShopBannerBox" @click="starShopBannerLinkFn(item)">
                        <img :src="item.star_head_img" alt="" :title="item.shop_name"/>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination" id="starShopBannerPagination"></div>
            </swiper>
            <!--横线-->
            <div class="starShopBannerMiddleLine"  v-if="pageComAnmShowStatus.starShopBanner===false">
                <span></span>
            </div>
            <!--顶部banner2-->
            <swiper id="starShopBottomBanner2" :options="starShopSwiperOption2" ref="starShopSwiper2"
                    v-if="pageComAnmShowStatus.starShopBanner===false">
                <swiper-slide v-for="item in starShopBannerList" :key="item.id">
                    <!--顶部图片-->
                    <div class="starShopBannerBottomBox" @click="starShopBannerLinkFn(item)">
                        <div class="topLine">
                            <p class="ownerName">明星店长：{{item.star_name}}</p>
                            <p class="icon">
                                <van-icon name="shop" style="margin-right: 4px"/>
                                店铺
                            </p>
                        </div>
                        <div class="bottomLine">
                            <p class="shopName">明星店铺：{{item.shop_name}}</p>
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination" id="starShopBannerPagination2"></div>
            </swiper>
        </div>
        <!--明星店铺列表-->
        <div class="starShopListBg">
            <van-loading type="spinner" color="black" v-if="pageComAnmShowStatus.starShopList===true"
                         class="globalLoadingAnmClass"></van-loading>
            <van-list :offset="starShopListData.offset" v-model="starShopListData.loading" :finished="starShopListData.finished"
                      @load="stuffListOnload"
                      :immediate-check="starShopListData.immediateCheck"
                      v-if="pageComAnmShowStatus.starShopList===false"
            >
                <ul class="starShopList">
                    <li v-for="(item,index) in starShopListData.list" :key="index">
                        <div class="starShopListStyle" @click="goToShopCenterFn(item)">
                            <!--顶部背景-->
                            <div class="topImg">
                                <img :src="item.ushop_img" alt="">
                            </div>
                            <!--底部信息-->
                            <div class="bottomInfo">
                                <!--左侧头像-->
                                <div class="icon">
                                    <img :src="item.star_head_img" alt="">
                                </div>
                                <!--中间店铺信息-->
                                <div class="info">
                                    <!--店铺信息-->
                                    <div class="left">
                                        <p class="top">明星店长：{{item.star_name}}</p>
                                        <p class="bottom">店铺：{{item.shop_name}}</p>
                                    </div>
                                    <!--进入图标-->
                                    <div class="right">
                                        <van-icon name="arrow"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>

        </div>
    </div>
</template>

<script>
    //引入猜你喜欢
    export default {
        name: 'index',
        data() {
            return {
                //明星店铺banner的data
                starShopSwiperData: {
                    height: 0
                },
                //明星店铺banner2配置
                starShopSwiperOption2: {
                    //控制swiper1
                    // controller: {
                    //     control: "", //控制Swiper1
                    // },
                    //初始化下标位置
                    initialSlide: 1,
                    //指示器
                    pagination: {
                        el: '#starShopBannerPagination2'
                    },
                    //一屏幕显示几个
                    slidesPerView: 1,
                    //之间距离
                    spaceBetween: 10,
                    //是否开启自动高度
                    autoHeight: true,
                    //选中的slide是否居中
                    centeredSlides: true
                },
                //明星店铺banner配置
                starShopSwiperOption: {
                    //初始化下标位置
                    initialSlide: 1,
                    //指示器
                    pagination: {
                        el: '#starShopBannerPagination'
                    },
                    //动画类型
                    // effect: 'coverflow',
                    //一屏幕显示几个
                    slidesPerView: 3,
                    //之间距离
                    spaceBetween: 10,
                    //是否开启
                    autoHeight: true,
                    //选中的slide是否居中
                    centeredSlides: true,
                    //3d动画配置
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 0,
                        modifier: 0,
                        slideShadows: true,
                    }
                    // autoplay: {
                    //     delay: 2000,
                    //     stopOnLastSlide: false,
                    //     disableOnInteraction: false
                    // }
                },
                //存储的今日推荐数据
                todayRecData: {
                    //左侧
                    left: {
                        // "id": "59",
                        // "name": "明星款",
                        // "title": "明星款",
                        // "image": "//img-beta.tobebetterman.com/media/backman/recommend/g/6v/g6v6165mt1x434f1554361428.png",
                        // "type": "1",
                        // "link": "",
                        // "rel_id": "",
                        // "keywords": "明星款"
                    },
                    //右侧
                    right: {
                        top: {},
                        bottom: {}
                    },
                    //底部banner
                    // bottomBanner:{
                    //     id:4,
                    //     type:"url",
                    //     params:"",
                    //     imgUrl:require("../../assets/images/shoppingMall/index/todayRecImg4.png")
                    // }
                },
                //首页顶部banner配置
                indexTopSwiperOption: {
                    pagination: {
                        el: '#indexTopBannerPagination'
                    },
                    slidesPerView: 1,
                    spaceBetween: 10,
                    autoHeight: true,
                    // autoplay: {
                    //     delay: 2000,
                    //     stopOnLastSlide: false,
                    //     disableOnInteraction: false
                    // }
                },
                //当前页面组件的渲染动画是否显示
                pageComAnmShowStatus: {
                    //推荐位
                    todayRec:true,
                    //明星店铺banner
                    starShopBanner: true,
                    //顶部banner
                    topBanner: true,
                    //明星店铺列表
                    starShopList:true
                },
                //明星店铺列表数据
                starShopListData: {
                    //是否显示加载中
                    loading: false,
                    //是否已经全部加载完成
                    finished: false,
                    //第一次进入是否加载一次
                    immediateCheck: false,
                    //多少是offset
                    offset: 300,
                    //总页数
                    totalPage:0,
                    //总条数
                    totalCount:0,
                    //当前页数
                    current: 1,
                    //每页条数
                    pageSize: 10,
                    //列表数据
                    list: [
                        /*{
                            id: 1,
                            shopOwner: "孙笑川",
                            shopName: "孙笑川の店铺",
                            shopIcon: require("../../assets/images/shoppingMall/index/banner2.png"),
                            shopBgImg: require("../../assets/images/shoppingMall/index/banner1.png")
                        },
                        {
                            id: 2,
                            shopOwner: "孙笑川",
                            shopName: "孙笑川の店铺",
                            shopIcon: require("../../assets/images/shoppingMall/index/banner2.png"),
                            shopBgImg: require("../../assets/images/shoppingMall/index/banner1.png")
                        },
                        {
                            id: 3,
                            shopOwner: "孙笑川",
                            shopName: "孙笑川の店铺",
                            shopIcon: require("../../assets/images/shoppingMall/index/banner2.png"),
                            shopBgImg: require("../../assets/images/shoppingMall/index/banner1.png")
                        }*/
                    ]
                },
                //明星店铺banner数据
                starShopBannerList: [
                ],
                //顶部banner列表
                bannerList: [],
            }
        },
        methods: {
            //去店铺中心的方法
            goToShopCenterFn(shop){
                this.$router.push("/shopCenter/index/"+shop.ushop_id);
            },
            //星店banner
            starShopSlideChange() {
                //获取当前选中下标
                // console.log(this.$refs.starShopSwiper.swiper.slides);
                // //获取当前选中的slide
                // console.log(this.$refs.starShopSwiper.swiper.slides[this.$refs.starShopSwiper.swiper.activeIndex]);
                //循环先把其他的silde高度改成初始值
                for (let key in this.$refs.starShopSwiper.swiper.slides) {
                    if (this.$refs.starShopSwiper.swiper.slides.hasOwnProperty(key) && key !== "length") {
                        // console.log(key);
                        // console.log(this.$refs.starShopSwiper.swiper.slides[key]);
                        // console.log(this.$refs.starShopSwiper.swiper.activeIndex);
                        //如果key不等于当前选中的index,那么就把高度改为初始值
                        // if(key!=this.$refs.starShopSwiper.swiper.activeIndex){
                        //     console.log("不等于！打印key值");
                        //     console.log(key);
                        //     console.log(this.$refs.starShopSwiper.swiper.activeIndex);
                        //     this.$refs.starShopSwiper.swiper.slides[key].style.height=this.starShopSwiperData.height;
                        // }
                        this.$refs.starShopSwiper.swiper.slides[key].style.height = this.starShopSwiperData.height + 'px';
                    }
                }
                // console.log(this.$refs.starShopSwiper.swiper.slides[this.$refs.starShopSwiper.swiper.activeIndex]);
                //循环结束后改变当前选中的高度
                this.$refs.starShopSwiper.swiper.slides[this.$refs.starShopSwiper.swiper.activeIndex].style.height = '70px';
            },
            //去往搜索页面
            goToSearchPage() {
            },
            //返回上一页
            backLastPage() {
                this.$router.go(-1);
            },
            //明星店铺banner点击跳转事件
            starShopBannerLinkFn(item) {
                this.$router.push("/shopCenter/index/"+item.ushop_id);
                // console.log(item);
            },
            //banner点击跳转事件
            indexBannerLinkFn(item) {
                console.log(item);
            },
            //加载更多
            stuffListOnload(){
                this.publicSearchShopListFn(this.starShopListData.current+1,1);
            },
            //公共的请求列表的方法
            publicSearchShopListFn(page,type){
                /*
                * page:页数
                * type:1是追加，0是赋值
                * */
                //请求明星店铺列表
                this.tools.globalFn.publicAxiosFn(this, {
                    url: "/star/index/index",
                    method: "POST",
                    data: {
                        page: page,
                        pageNum:this.starShopListData.pageSize
                    },
                    success: (res) => {
                        console.log("打印星店列表");
                        console.log(res.data);
                        if (res.data.code === 200) {
                            //放置数据
                            if(type===0||type===undefined){
                                this.starShopListData.list=res.data.data.star_ushop_info;
                            }
                            else{
                                this.starShopListData.list=this.starShopListData.list.concat(res.data.data.star_ushop_info);
                            }
                            //放置当前页数
                            this.starShopListData.current=res.data.data.page;
                            //放置总条数
                            this.starShopListData.totalCount=res.data.data.count;
                            //放置总页数
                            this.starShopListData.totalPage=this.tools.globalFn.totalPageCountFn(this.starShopListData.pageSize,res.data.data.count);
                            //判断当前页数是否等于总页数
                            if(this.starShopListData.totalPage===this.starShopListData.current){
                                this.starShopListData.finished=true;
                            }
                            //统一关闭加载动画
                            this.starShopListData.loading=false;
                            //渲染
                            this.pageComAnmShowStatus.starShopList=false;
                        }
                    }
                });
            },
            //请求第一次数据
            getFirstData() {
                //请求首页推荐位
                this.tools.globalFn.publicAxiosFn(this, {
                    url: "/backman/recommend/lists",
                    method: "GET",
                    params: {
                        page_name: "star_home"
                    },
                    success: (res) => {
                        // console.log(res);
                        if (res.data.code === 200) {
                            //放置banner
                            this.bannerList = res.data.data.star_banner;
                            //渲染banner
                            this.pageComAnmShowStatus.topBanner = false;
                            //放置三个广告图
                            this.todayRecData.left = res.data.data.stars_in_the_same_paragraph[0];
                            this.todayRecData.right.top = res.data.data.stars_in_the_same_paragraph[1];
                            this.todayRecData.right.bottom = res.data.data.stars_in_the_same_paragraph[2];
                            //渲染
                            this.pageComAnmShowStatus.todayRec=false;
                        }
                    }
                });
                //请求明星店铺推荐banner
                this.tools.globalFn.publicAxiosFn(this, {
                    url: "/star/index/popularityinfo",
                    method: "POST",
                    data: {
                        popularityNum: 5
                    },
                    success: (res) => {
                        console.log("打印明星店铺推荐banner");
                        console.log(res.data);
                        if (res.data.code === 200) {
                            //放置数据
                            this.starShopBannerList=res.data.data;
                            //渲染
                            this.pageComAnmShowStatus.starShopBanner=false;
                        }
                    }
                });
                //请求明显店铺列表
                this.publicSearchShopListFn(1);
            },
            //获取starshopbanner高度的方法
            getStarShopBannerHeightFn() {
                this.starShopSwiperData.height = this.$refs.starShopSwiper.swiper.height;
                console.log("打印swiper高度");
                console.log(this.$refs.starShopSwiper.swiper);
                console.log(this.$refs.starShopSwiper.swiper.height);
                console.log(this.starShopSwiperData.height);
                this.$refs.starShopSwiper.swiper.slides[this.$refs.starShopSwiper.swiper.activeIndex].style.height = '70px';
                // console.log(this.$refs.starShopSwiper.swiper.slides[this.$refs.starShopSwiper.swiper.activeIndex].children[0].children[0].style.height="100px");
                // console.log(this.$refs.starShopSwiper.swiper.el.style);
                this.$refs.starShopSwiper.swiper.el.style.height = "70px";
                // console.log(this.$refs.starShopSwiper.swiper.el.style);
                //放置swiper2控制1
                // this.starShopSwiperOption2.controller.control=this.$refs.starShopSwiper2.swiper;
                this.$refs.starShopSwiper.swiper.controller.control = this.$refs.starShopSwiper2.swiper;
            }
        },
        created() {
            //初始化数据
            this.getFirstData();
            // this.getTokenFn();
        },
        mounted() {
            //获取banner高度，存储
            // this.getStarShopBannerHeightFn();
        },
        watch: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .starShopBannerBottomBox {
        width: 100%;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .starShopBannerBottomBox > .topLine {
        display: flex;
        justify-content: space-between;
    }

    .starShopBannerBottomBox > .topLine > .ownerName {
        color: #333;
        font-size: 16px;
    }

    .starShopBannerBottomBox > .topLine > .icon {
        color: #30aaff;
        font-size: 14px;
        display: flex;
        align-items: center;
    }

    .starShopBannerBottomBox > .bottomLine {

    }

    .starShopBannerBottomBox > .bottomLine > .shopName {
        color: #666;
        font-size: 12px;
    }

    #starShopBannerPagination2 {
        display: none;
    }

    .starShopBannerMiddleLine {
        width: 100%;
        border-bottom: 2px solid #30aaff;
        display: flex;
        align-items: end;
        justify-content: center;
        margin-top: 4px;
    }

    .starShopBannerMiddleLine span {
        content: "";
        border-top: 0;
        border-bottom: 4px dashed #30aaff;
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: middle;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
    }

    /*覆盖明星店铺banner*/
    .starShopBannerBox {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
    }

    .starShopBannerBox img {
        display: block;
        width: 100%;
        height: 100%;
    }

    #starShopBannerPagination {
        display: none;
    }

    /*明星店铺列表样式*/
    .starShopListStyle > div.bottomInfo > .info {
        width: 86%;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*float: right;*/
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
    }

    .starShopListStyle > div.bottomInfo > .info > div.left {
        width: 90%;
    }

    .starShopListStyle > div.bottomInfo > .info > div.left p.top {
        color: #333;
        font-size: 16px;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .starShopListStyle > div.bottomInfo > .info > div.left p.bottom {
        color: #333;
        font-size: 12px;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .starShopListStyle > div.bottomInfo > .info > div.right {
        display: flex;
        align-items: center;
    }

    /*.starShopListStyle>div.bottomInfo>.icon::before{*/
    /*padding-top: 100%;*/
    /*content: ' ';*/
    /*display: block;*/
    /*}*/
    .starShopListStyle > div.bottomInfo > .icon {
        width: 12%;
        /*padding-top: 12%;*/
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        float: left;
        border-radius: 50%;
        /*border:2px solid #fff;*/
        margin-top: -6px;
        overflow: hidden;
    }

    .starShopListStyle > div.bottomInfo > .icon::before {
        padding-top: 100%;
        content: "";
        display: block;
    }

    .starShopListStyle > div.bottomInfo > .icon img {
        width: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        z-index: 9999;
    }

    .starShopListStyle > div.bottomInfo {
        width: 100%;
        height: auto;
        padding: 0 10px 10px 10px;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*display: flex;*/
        clear: both;
    }

    .starShopListStyle {
        width: 100%;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .starShopListStyle > div.topImg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .starShopListStyle > div.topImg img {
        display: block;
        width: 100%;
    }

    /*明星店铺列表*/
    .starShopListBg {
        width: 100%;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px;
        margin-bottom: 10px;
        position: relative;
        min-height: 50px;
    }

    .starShopList {
        width: 100%;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .starShopList > li {
        width: 100%;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
    }

    .starShopList > li:first-child {
        margin-top: 0;
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
        /*margin-bottom: 10px;*/
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
        padding: 0 10px;
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

</style>
