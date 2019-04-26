import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import shopCart from '../components/shopCart/index'
import userCenter from '../components/userCenter/index'
import orderList from '../components/order/orderList'
import orderContent from '../components/order/orderContent'
import checkLogistics from '../components/logistics/checkLogistics'
import menu from '../components/menu/index'
import evaList from '../components/evaluate/evaluationList'
import publishRating from '../components/evaluate/publishRating'
import killList from '../components/promotion/killList'
import searchPage from '../components/public/searchPage'
import searchResult from '../components/public/searchResultPage'
import refundList from '../components/afterSale/refundList'
import refundContent from '../components/afterSale/refundContent'
import refundType from '../components/afterSale/refundType'
import refundApply from '../components/afterSale/refundApply'
import goodContent from '../components/goods/goodContent'
import guessYouLikeGood from '../components/global/guessYouLikeGood'
import buyQusAndAnwList from '../components/buyQusAndAnw/list'
import myCoupon from '../components/userCenter/myCoupon'
import myFooter from '../components/userCenter/myFooterPointer'
import myCollection from '../components/userCenter/myCollection'
import myFollow from '../components/userCenter/myFollow'
import chooseAddress from '../components/addressAbout/chooseAddress'
import editAddress from '../components/addressAbout/editAddress'
import addAddress from '../components/addressAbout/addAddress'
import confirmOrder from '../components/confirmOrder/confirmOrder'
import shopCenterIndex from '../components/shopCenter/index'
import shopCenterHome from '../components/shopCenter/home'
import shopCenterGoods from '../components/shopCenter/goods'
import shopCenterCategory from '../components/shopCenter/category'
import shopCenterPro from '../components/shopCenter/promotion'
import shopCenterSearchResult from '../components/shopCenter/shopSearchResult'
import shopCenterSearch from '../components/shopCenter/searchThisShop'
//跳转等待页面(给同路由之间的跳转使用)
import linkWaitPage from '../components/global/linkWaitPage'
//明星店铺首页
import starShopCenter from '../components/starShop/index'
//我的悬赏列表-我发布的
import myRewardList from '../components/myReward/myRewardList'
//我的悬赏-我发布的详情
import myRewardContent from '../components/myReward/myRewardContent'
//我的悬赏列表-我接单的
import myReceiptList from '../components/myReward/myReceiptList'
//我的悬赏-我接单的详情
import myReceiptContent from '../components/myReward/myReceiptContent'
//我的服务-我发布的服务列表
import myReleaseServiceList from '../components/myService/myRelease'
//我的服务-我购买的服务列表
import myPurchasedServiceList from '../components/myService/myPurchasedServicesList'
//商品详情-给其他模块跳转
import goodContentForLink from '../components/goods/goodContentForLink'
//立即购买的确认订单
import confirmOrderImmediately from '../components/confirmOrder/confirmOrderImmediately'
//我的服务-雇佣我的列表
import myHireMeServicesList from '../components/myService/myHireMeServicesList'
//我的服务-我购买的服务详情
import myPurchasedServiceContent from '../components/myService/myPurchasedServiceContent'
//我的服务-雇用我的服务详情
import myHireMeServiceContent from '../components/myService/myHireMeServiceContent'
//我的服务-评价
import myPurchasedServicePublishRating from '../components/myService/publishRating'
//从其他webview跳转过来的跳转等待页
import linkWaitPageFromOtherWebView from '../components/public/linkWaitPageFromOtherWebview'
Vue.use(Router);

export const routes= [
    //错误路由跳转
    { path: "*", redirect: "/"},
    //从其他webview跳转过来的跳转等待页
    {
        path: '/linkWaitPageFromOtherWebView',
        name: 'linkWaitPageFromOtherWebView',
        component: linkWaitPageFromOtherWebView,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //立即购买确认订单
    {
        path: '/confirmOrderImmediately',
        name: 'confirmOrderImmediately',
        component: confirmOrderImmediately,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //商品详情-给其他模块跳转准备的
    {
        path: '/goodContentForLink/:id',
        name: 'goodContentForLink',
        component: goodContentForLink,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //我的悬赏-我接单的悬赏详情
    {
        path: '/userCenter/myReceiptList/:id',
        name: 'myReceiptContent',
        component: myReceiptContent,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //我的服务-添加评论
    {
        path: '/userCenter/myService/addEva/:id',
        name: 'myPurchasedServicePublishRating',
        component: myPurchasedServicePublishRating,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //我的服务-我购买的服务列表
    {
        path: '/userCenter/myService/purchased',
        name: 'myPurchasedServiceList',
        component: myPurchasedServiceList,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //我的服务-我购买的服务订单详情
    {
        path: '/userCenter/myService/purchased/:id',
        name: 'myPurchasedServiceContent',
        component: myPurchasedServiceContent,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //我的服务-我发布的服务列表
    {
        path: '/userCenter/myService/release',
        name: 'myReleaseServiceList',
        component: myReleaseServiceList,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //我的服务-雇佣我的的服务列表
    {
        path: '/userCenter/myService/hireMe',
        name: 'myHireMeServicesList',
        component: myHireMeServicesList,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //我的服务-雇用我的服务订单详情
    {
        path: '/userCenter/myService/hireMe/:id',
        name: 'myHireMeServiceContent',
        component: myHireMeServiceContent,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //我的悬赏-我接单的悬赏列表
    {
        path: '/userCenter/myReceiptList',
        name: 'myReceiptList',
        component: myReceiptList,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //我的悬赏-我发布的悬赏详情
    {
        path: '/userCenter/myRewardList/:id',
        name: 'myRewardContent',
        component: myRewardContent,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //我的悬赏-我发布的悬赏列表
    {
        path: '/userCenter/myRewardList',
        name: 'myRewardList',
        component: myRewardList,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //明星店铺首页
    {
        path: '/starShopCenter',
        name: 'starShopCenter',
        component: starShopCenter,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //跳转等待页面(给商品详情之间的跳转使用)
    {
        path: '/waitPage/:id',
        name: 'linkWaitPage',
        component: linkWaitPage,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //首页
    {
      path: '/',
      name: 'index',
      component: index,
        meta:{
            //是否开启缓存
            keepAlive:true,
            //是否用以前的数据
            useOldData:false
        }
    },
    //购物车
    {
        path: '/cart',
        name: 'shopCart',
        component: shopCart,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //个人中心
    {
        path: '/userCenter',
        name: 'userCenter',
        component: userCenter,
        meta:{
            //是否开启缓存
            keepAlive:true,
            //是否用以前的数据
            useOldData:false
        }
        // children:[
        //     { path: 'myCoupon',name:"myCoupon", component: myCoupon}
        // ]
    },
    //订单列表
    {
        path: '/userCenter/orderList',
        name: 'orderList',
        component: orderList,
        meta:{
            //是否开启缓存
            keepAlive:true,
            //是否用以前的数据
            useOldData:false
        }
    },
    //订单详情
    {
        path: '/userCenter/orderList/:id',
        name: 'orderListContent',
        component: orderContent,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //查看物流
    {
        path: '/checkLog/:id',
        name: 'checkLog',
        component: checkLogistics,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //分类菜单
    {
        path: '/menu',
        name: 'menu',
        component: menu,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //评价列表
    {
        path: '/evaList/:id',
        name: 'evaList',
        component: evaList,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //发布评价页面
    {
        path: '/publishRating/:id',
        name: 'publishRating',
        component: publishRating,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //秒杀列表
    {
        path: '/killList',
        name: 'killList',
        component: killList,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //搜索页面
    {
        path: '/search',
        name: 'search',
        component: searchPage,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //搜索结果页面
    {
        path: '/searchResult',
        name: 'searchResult',
        component: searchResult,
        meta:{
            //是否开启缓存
            keepAlive:true,
            //是否用以前的数据
            useOldData:false
        }
    },
    //退款/售后列表
    {
        path:'/refundList',
        name:'refundList',
        component:refundList,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //退款/售后列表详情
    {
        path:'/refundList/:id',
        name:'refundListContent',
        component:refundContent,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //退款类型
    {
        path:'/refund/refundType',
        name:'refundType',
        component:refundType,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //提交退款/退货申请
    {
        path:'/refund/apply',
        name:'refundApply',
        component:refundApply,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //商品详情
    {
        path:'/goods/:id',
        name:'goodsContent',
        component:goodContent,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //问答列表
    {
        path:'/qaList/:id',
        name:'qaList',
        component:buyQusAndAnwList,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //个人中心-我的优惠券
    {
        path:'/userCenter/myCoupon',
        name:'myCoupon',
        component:myCoupon,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //个人中心-我的足迹
    {
        path:'/userCenter/myFooter',
        name:'myFooter',
        component:myFooter,
        meta:{
            //是否开启缓存
            keepAlive:true,
            //是否用以前的数据
            useOldData:false
        }
    },
    //个人中心-我的商品收藏
    {
        path:'/userCenter/myCollection',
        name:'myCollection',
        component:myCollection,
        meta:{
            //是否开启缓存
            keepAlive:true,
            //是否用以前的数据
            useOldData:false
        }
    },
    //个人中心-我的店铺关注
    {
        path:'/userCenter/myFollow',
        name:'myFollow',
        component:myFollow,
        meta:{
            //是否开启缓存
            keepAlive:true,
            //是否用以前的数据
            useOldData:false
        }
    },
    //选择收货地址列表（公用）
    {
        path:'/addressInfo/choose',
        name:'chooseAddress',
        component:chooseAddress,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //编辑单个收货地址（公用）
    {
        path:'/addressInfo/:id/edit',
        name:'editAddress',
        component:editAddress,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //增加单个收货地址（公用）
    {
        path:'/addressInfo/add',
        name:'addAddress',
        component:addAddress,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //提交订单页面
    {
        path:'/order/confirmOrder',
        name:'confirmOrder',
        component:confirmOrder,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //店铺中心首页
    {
        path:'/shopCenter/index/:id',
        // name:'shopCenterIndex',
        component:shopCenterIndex,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        },
        //重定向
        // redirect: '/shopCenter/index/:id',
        //子路由
        children:[
            //店铺首页
            // {
            //     path:'',
            //     name:'shopCenterHome',
            //     component:shopCenterHome,
            //     // meta:{
            //     //     //是否开启缓存
            //     //     keepAlive:false,
            //     //     //是否用以前的数据
            //     //     useOldData:false
            //     // },
            // },
            //店铺商品
            {
                path:'',
                name:'shopCenterGoods',
                component:shopCenterGoods,
                // meta:{
                //     //是否开启缓存
                //     keepAlive:false,
                //     //是否用以前的数据
                //     useOldData:false
                // },
            },
            //店铺分类
            {
                path:'category',
                name:'shopCenterCategory',
                component:shopCenterCategory,
                meta:{
                    //是否开启缓存
                    keepAlive:false,
                    //是否用以前的数据
                    useOldData:false
                },
            },
            //店铺活动
            {
                path:'promotion',
                name:'shopCenterPro',
                component:shopCenterPro,
                meta:{
                    //是否开启缓存
                    keepAlive:false,
                    //是否用以前的数据
                    useOldData:false
                },
            }
        ]
    },
    //店铺中心搜索页面
    {
        path:'/shopCenter/index/search',
        name:'shopCenterSearch',
        component:shopCenterSearch,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    },
    //店铺中心搜索结果页面
    {
        path:'/shopCenter/index/search/result',
        name:'shopCenterSearchResult',
        component:shopCenterSearchResult,
        meta:{
            //是否开启缓存
            keepAlive:false,
            //是否用以前的数据
            useOldData:false
        }
    }
  ];
