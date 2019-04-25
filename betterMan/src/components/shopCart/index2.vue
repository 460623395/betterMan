<template>
    <div class="publicAllContentBg" id="shopCart">
        <!--头部导航-->
        <van-nav-bar title="购物车"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     class="globalNavBarHeaderClass"
                     fixed
        >
            <!--<van-icon name="arrow-left" slot="left" style="color: #fafafa" @click="backLastPage"></van-icon>-->
            <span slot="right" v-if="nowCartStatus===1&&this.localShopCartData.data.length>0" @click="changeCartAdminStatus">管理</span>
            <span slot="right" v-if="nowCartStatus===0" @click="changeCartAdminStatus">完成</span>
        </van-nav-bar>
        <!--商品列表块-->
        <div class="cartListBg">
            <van-loading type="spinner" color="black" v-if="cartDataIsDoneStatus===false"
                         class="globalLoadingAnmClass"></van-loading>
            <!--商品列表-->
            <ul class="cartListByShopBox" v-if="cartDataIsDoneStatus">
                <li class="noContent" v-if=" localShopCartData.data.length===0">暂无商品，快去添加吧</li>
                <li v-for="shop in localShopCartData.data" :key="shop.shopId">
                    <!--<li v-if=" localShopCartData.data.length>0">-->
                    <!--店铺名以及全选该店铺商品按钮(右侧点击进入该店铺)-->
                    <div class="cartListByShopStyle">
                        <!---头部店铺按钮-->
                        <div class="header">
                            <!--<i class="checkBoxSeq" :ref="shop.shopId" @click="chooseOneShopAllGoods($event,shop.shopId)"></i>-->
                            <van-checkbox v-model="shop.shopCheck" @change="chooseOneShopAllGoods(shop.shopId,$event)"
                                          style="float: left">{{shop.shopName}}
                            </van-checkbox>
                            <!--<p>{{shop.shopName}}</p>-->
                            <van-icon name="arrow" @click="goToShopPageFn(shop)" style="float: right;color: #cecece;"/>
                        </div>
                        <!--商品列表-->
                        <ul class="list">
                            <li v-for="item in shop.goods">
                                <div class="listGoodsStyle">
                                    <!--顶部信息-->
                                    <div class="top">
                                        <!--左侧选择标签-->
                                        <div class="left">
                                            <!--<i class="checkBoxSeq" :ref="shop.shopId"-->
                                            <!--@click="chooseSingleGoodFn($event,shop.shopId,item.goodsId)"></i>-->
                                            <!--<van-checkbox v-model="item.goodCheck"-->
                                            <!--@change="chooseSingleGoodFn(shop.shopId,item.skuDTO.id,$event)"></van-checkbox>-->
                                            <van-checkbox v-model="item.goodCheck"
                                                          @change="chooseSingleGoodFn(item,$event)"></van-checkbox>
                                        </div>
                                        <!--商品图片-->
                                        <div class="img">
                                            <img :src="item.img_url" alt=""
                                                 @click="goToGoodContentPageFn(item.product_id)">
                                        </div>
                                        <!--商品名，规格等-->
                                        <div class="right">
                                            <h3 @click="goToGoodContentPageFn(item.product_id)">{{item.name}}</h3>
                                            <!--<h4 @click="goToGoodContentPageFn(item.goodsId)">{{item.ggName}}</h4>-->
                                            <div class="priceLine" v-text="returnGoodPrice(item)">
                                                <!--￥{{item.product_price}}-->
                                            </div>
                                            <div class="addOrSub">
                                                <!--有最大数量的-->
                                                <!--<van-stepper-->
                                                <!--v-model="item.qty"-->
                                                <!--integer-->
                                                <!--:min="getGoodCanBuyLessNumFn(item)"-->
                                                <!--:step="cartGoodNumOptions.step"-->
                                                <!--:max="getGoodCanBuyMostNumFn(item)"-->
                                                <!--@plus="addGoodNum(item)"-->
                                                <!--@overlimit="clickStepCantUseFn(item)"-->
                                                <!--@minus="delGoodNum(item)"-->
                                                <!--@blur="blurGoodNum(item)"-->
                                                <!--&gt;-->
                                                <!--</van-stepper>-->
                                                <!--没有最大数量的-->
                                                <van-stepper
                                                        v-model="item.qty"
                                                        integer
                                                        :min="getGoodCanBuyLessNumFn(item)"
                                                        :step="cartGoodNumOptions.step"
                                                        @plus="addGoodNum(item)"
                                                        @overlimit="clickStepCantUseFn(item)"
                                                        @minus="delGoodNum(item)"
                                                        @blur="blurGoodNum(item)"
                                                >
                                                </van-stepper>
                                            </div>
                                        </div>
                                    </div>
                                    <!--促销信息板块(暂无，先不做)-->
                                    <!--<div class="cxInfoBox" v-if="getProNumFn(item)!==0">-->
                                    <!--<div class="cx">-->
                                    <!--<p class="text">{{item.promotionSelected.name}}</p>-->
                                    <!--<p class="button" @click="chooseYHFn(item)"><span-->
                                    <!--v-text="getProNumFn(item)"></span>-->
                                    <!--<van-icon name="arrow"/>-->
                                    <!--</p>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="cxInfoBox">-->
                                    <!--<div class="cx">-->
                                    <!--<p class="text">牛皮</p>-->
                                    <!--<p class="button"><span-->
                                    <!--v-text="1"></span>-->
                                    <!--<van-icon name="arrow"/>-->
                                    <!--</p>-->
                                    <!--</div>-->
                                    <!--</div>-->
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <!--去结算底部栏-->
        <van-submit-bar
                v-if="nowCartStatus===1"
                :price="shopCartTotal"
                button-text="去结算"
                @submit="goToOrderPage"
        >
            <!--<van-checkbox v-model="shopCartAllChecked" @change="allSelectedChangeFn" v-if="this.localShopCartData.data.length>0">全选</van-checkbox>-->
            <p @click="allSelectedChangeFn" v-if="this.localShopCartData.data.length>0">
                <van-checkbox v-model="shopCartAllChecked">全选</van-checkbox>
            </p>
            <!--<span slot="tip">-->
            <!--您的收货地址不支持同城送, <span>修改地址</span>-->
            <!--</span>-->
        </van-submit-bar>
        <!--管理商品底部栏-->
        <van-submit-bar
                v-if="nowCartStatus===0"
                :price="cartAdminOptions.total"
                button-text="移除"
                @submit="cartAdminDelGoods"
                class="carAdminLine"
        >
            <!--<van-checkbox v-model="shopCartAllChecked" @change="allSelectedChangeFn" v-if="this.localShopCartData.data.length>0">全选</van-checkbox>-->
            <!--<p @click="cartAdminAllSelectedChangeFn" v-if="this.localShopCartData.data.length>0">-->
            <!--<van-checkbox v-model="cartAdminOptions.shopCartAllChecked">全选</van-checkbox>-->
            <!--</p>-->
            <p @click="allSelectedChangeFn" v-if="this.localShopCartData.data.length>0">
                <van-checkbox v-model="shopCartAllChecked">全选</van-checkbox>
            </p>
            <!--<span slot="tip">-->
            <!--您的收货地址不支持同城送, <span>修改地址</span>-->
            <!--</span>-->
        </van-submit-bar>
    </div>
</template>

<script>
    //引入公共方法和变量
    // import tabbarStatus from "../assets/js/toClientFn/tabbarStatus"
    export default {
        name: 'index',
        data() {
            return {
                //管理商品的底部栏相关配置
                cartAdminOptions: {
                    //占位，不显示
                    total: 0,
                    //目前是否全选
                    shopCartAllChecked: false
                },
                //目前是商品选择状态还是编辑状态(1是选择，0是编辑)
                nowCartStatus: 1,
                //已经选中的数据
                cartSelectedData: {
                    list: []
                },
                //计步器设置
                cartGoodNumOptions: {
                    //一步几个
                    step: 1
                },
                //购物车显示的总价
                shopCartTotal: 0,
                //是否需要全选方法
                isNeedAllCheckFn: true,
                //是否全选
                shopCartAllChecked: false,
                //购物车项数据是否已经加载完成
                cartDataIsDoneStatus: false,
                //拉去数据后重新循环用来显示的购物车数据
                localShopCartData: {
                    shopId: "",
                    data: [
                        // {
                        //     "item_id": 13,
                        //     "active": 1,
                        //     "product_id": "57bab0d5f656f2940a3bf56e",
                        //     "sku": "kilw0001",
                        //     "name": "",
                        //     "qty": 1,
                        //     "custom_option_sku": "",
                        //     "product_price": 124,
                        //     "img_url": "//img.tobebetterman.com/media/catalog/product/cache/bd935443df1c50537d4edaab4af5d446/150/150/1/22/12229472_1.jpg",
                        //     "url": "/catalog/product/57bab0d5f656f2940a3bf56e",
                        //     "custom_option_info": []
                        // }
                        {
                            shopId: 1,
                            shopName: "变福侠商城",
                            goods: [
                                // {
                                //     id:1,
                                //     goodsName:"哦牛批商品",
                                //     price:102360,
                                //     checked:false,
                                //     imgUrl:require("../../assets/images/shoppingMall/cart/goodImg.png"),
                                //     ggName:"哦牛批规格",
                                //     skuDTO:{
                                //         id:1,
                                //         title:"60g"
                                //     },
                                //     num:2
                                // }
                            ],
                            shopCheck: false
                        }
                    ]
                }
            }
        },
        methods: {
            //购物车管理全选的方法
            cartAdminAllSelectedChangeFn() {
                console.log("购物车管理-打印当前选中项目");
                console.log(this.cartSelectedData.list)
            },
            //移除指定商品提交的方法
            cartAdminDelGoods() {
                if (this.cartSelectedData.list.length === 0) {
                    this.tools.globalFn.publicToastFn(this, "请选中商品");
                    return false;
                }
                //加载动画
                this.$toast.loading({
                    duration: 0,
                    message: "加载中",
                    mask: true
                });
                // console.log("移除商品提交");
                var arr = [];
                for (let key in this.cartSelectedData.list) {
                    arr.push(this.cartSelectedData.list[key].item_id);
                }
                console.log(arr);
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        url: "/checkout/cart/remove",
                        method: "POST",
                        data: {
                            item_ids: arr.join(",")
                        },
                        success: (res) => {
                            console.log(res);
                            if (res.data.code === 200) {
                                this.tools.globalFn.publicToastFn(this, "移除成功");
                                //改变购物车状态
                                this.nowCartStatus = 1;
                                //清空当前购物车选中项
                                this.cartSelectedData.list = [];

                                //重置当前总计
                                this.shopCartTotal = 0;
                                //重新请求
                                this.getFirstData();
                            }
                            else {
                                this.tools.globalFn.publicToastFn(this, "网络错误！");
                            }
                        },
                        fail: (err) => {
                            console.log(err);
                        }
                    }
                );
            },
            //返回单个商品价格的方法
            returnGoodPrice(item) {
                console.log(item);
                return "￥" + item.product_price.toFixed(2);
            },
            //返回单个数据
            getSingelGoodsTotal(item) {
                return "￥" + ((item.product_price * 100) * item.qty / 100).toFixed(2);
            },
            //循环改变视图中商品选中状态的方法
            eachChangeGoodSelectFn(val) {
                //先清空选中数组
                // this.cartSelectedData.list=[];
                for (let key in this.localShopCartData.data) {
                    this.localShopCartData.data[key].shopCheck = val;
                }
            },
            //全选状态发生变化的方法
            allSelectedChangeFn() {
                if (this.shopCartAllChecked === true) {
                    console.log("全选");
                    this.eachChangeGoodSelectFn(true);
                }
                else if (this.shopCartAllChecked === false) {
                    console.log(this.shopCartAllChecked);
                    console.log("取消全选");
                    // this.shopCartAllChecked=false;
                    this.eachChangeGoodSelectFn(false);
                    this.cartSelectedData.list[0].goods = [];
                }
                // if(val===true){
                //     //如果是，那么选中购物车中就是全部的数据
                //     this.eachChangeGoodSelectFn(true);
                //     // this.cartSelectedData.list=this.localShopCartData.data;
                // }
                // else if(val===false){
                //     //如果不是，那么清空已选中购物车项
                //     this.eachChangeGoodSelectFn(false);
                //     this.cartSelectedData.list=[];
                // }
                // //统一触发计算方法
                // this.shopCartTotal=this.publicShopCartTotalCountFn();
            },
            //通用的计算购物车总价的方法
            publicShopCartTotalCountFn() {
                //开始加载动画
                //  this.$toast.loading({
                //      mask: true,
                //      message: '加载中...',
                //      duration:0
                //  });
                console.log("计算总价");
                //创建价格总计
                let totalCount = 0;
                //创建商品总计
                let goodTotal = 0;
                //循环计算是否有选中商品
                for (let shop of this.cartSelectedData.list) {
                    goodTotal += shop.goods.length;
                }
                //如果没有商品直接返回0元
                if (goodTotal === 0) {
                    return totalCount;
                }
                //循环计算总价
                for (let shop of this.cartSelectedData.list) {
                    for (let good of shop.goods) {
                        console.log(good);
                        totalCount += good.qty * (good.product_price * 100);
                    }
                }
                console.log(totalCount);
                return totalCount;
            },
            //统一的触发修改数量的方法
            publicChangeGoodCountFn(goodId, num, oldNum) {
                //开启全屏loading动画
                // this.tools.globalFn.publicFullScreenLoadingFn(this,
                //     {
                //         message:"加载中"
                //     }
                // );
                this.$toast.loading({
                    message: "加载中",
                    duration: 0,
                    mask: true
                });
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        url: "/checkout/cart/updateinfo",
                        method: "POST",
                        data: {
                            //固定的type
                            up_type: "update_qty",
                            //商品id
                            item_id: goodId,
                            //更新的数量
                            update_qty: num
                        },
                        success: (res) => {
                            console.log(res);
                            if (res.data.code === 200) {
                                // this.tools.globalFn.publicToastFn(this,"修改成功！");
                                //重新查询
                                // this.getFirstData();
                            }
                            else {
                                this.tools.globalFn.publicToastFn(this, res.data.message);
                            }
                            this.publicSearchCartFn();
                        },
                        fail: (err) => {
                            console.log(err);
                        }
                    }
                )
            },
            //通用的重新查询整个购物车的方法
            publicSearchCartFn() {
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        url: "/checkout/cart/index",
                        method: "GET",
                        success: (res) => {
                            console.log(res);
                            if (res.data.code === 200 && res.data.data.cart_info !== false) {
                                console.log("修改完成打印已经选中的商品");
                                console.log(this.cartSelectedData.list);
                                //清空当前数组
                                this.localShopCartData.data[0] = {
                                    shopId: 1,
                                    shopName: "变福侠商城",
                                    goods: [],
                                    shopCheck: false
                                };
                                let newLocalArr = [];
                                //push商品到数组
                                for (let key in res.data.data.cart_info.products) {
                                    //再循环选中购物车数组,从而进行是否选中判断
                                    for (let i in this.cartSelectedData.list) {
                                        if (this.cartSelectedData.list[i].item_id === res.data.data.cart_info.products[key].item_id) {
                                            console.log("有" + i + "选中");
                                            if (this.cartSelectedData.list[i].goodCheck === true) {
                                                //给该商品添加选中属性
                                                res.data.data.cart_info.products[key].goodCheck = true;
                                            }
                                            else if (this.cartSelectedData.list[i].goodCheck === false) {
                                                console.log("有" + i + "未选中");
                                                //给该商品添加未选中属性
                                                res.data.data.cart_info.products[key].goodCheck = false;
                                            }
                                            //赋值数量
                                            this.cartSelectedData.list[i].qty = res.data.data.cart_info.products[key].qty;
                                        }
                                        // else if(this.cartSelectedData.list[i].item_id!==res.data.data.cart_info.products[key].item_id){
                                        //     //如果没选中直接添加未选中
                                        //     // console.log("第"+key+"商品尚未选中");
                                        //     // console.log(this.cartSelectedData.list[i].item_id);
                                        //     // console.log(res.data.data.cart_info.products[key].item_id);
                                        //     res.data.data.cart_info.products[key].goodCheck = false;
                                        //     // newLocalArr.push(res.data.data.cart_info.products[key]);
                                        // }
                                    }
                                    newLocalArr.push(res.data.data.cart_info.products[key]);
                                    // newLocalArr.push(res.data.data.cart_info.products[key]);
                                    // console.log("打印判断完的res.data"+key);
                                    // console.log(res.data.data.cart_info.products[key]);
                                    // newLocalArr.push(res.data.data.cart_info.products[key]);
                                }
                                console.log("循环完成打印");
                                console.log(newLocalArr);
                                this.localShopCartData.data[0].goods = newLocalArr;
                                //重新计算价格
                                this.shopCartTotal = this.publicShopCartTotalCountFn();
                                // this.localShopCartData.data=res.data.data.cart_info.products;
                            }
                            //调用计算

                            //关闭加载动画(全屏加载)
                            this.$toast.clear();
                        },
                        fail: (err) => {
                            console.log(err);
                        }
                    }
                )
            },
            //用户输入某一商品数量的方法
            blurGoodNum(item) {
                console.log("触发了输入修改数量方法");
                console.log(item);
                this.publicChangeGoodCountFn(item.item_id, item.qty);
            },
            //添加购物车数量的方法(因为返回的是修改前的，所以需要+1)
            addGoodNum(item) {
                console.log("触发了添加方法");
                this.publicChangeGoodCountFn(item.item_id, item.qty + 1, item.qty);
            },
            //减少购物车数量的方法(因为返回的是修改前的，所以需要-1)
            delGoodNum(item) {
                console.log("触发了减少方法");
                console.log(item.qty);
                this.publicChangeGoodCountFn(item.item_id, item.qty - 1, item.qty);
            },
            //点击了不可用计步器不可用按钮的时候的方法
            clickStepCantUseFn(item) {
                console.log(item);
                this.tools.globalFn.publicToastFn(this, "不可小于或大于最低/最高购买数量");
                // if(item.qty<item.qty){
                //     //当前选中小于库存且按钮是不可选择状态，那么就是最小(进行删除操作)
                //     this.tools.globalFn.publicToastFn(this, "不可小于或大于最低/最高购买数量");
                // }
                // else if(item.qty===item.qty){
                //     //当前选中小于库存且按钮是不可选择状态，那么就是最小(进行删除操作)
                //     this.tools.globalFn.publicToastFn(this, "不可小于或大于最低/最高购买数量");
                // }
            },
            //获取最大可购买数的方法
            getGoodCanBuyMostNumFn(item) {
                // return item.qty;
                return 10;
            },
            //获取最小可购买数的方法
            getGoodCanBuyLessNumFn(item) {
                return 1;
            },
            //是否显示折扣活动的返回方法
            zkDomIsShowStatus: function (item) {
                console.log("打印折扣活动的对象！！！");
                console.log(item);
                return true;
                //先判断是否为空
                // if(item.zkObj!==undefined&&item.zkObj!==null&&item.zkObj!==''){
                //     //有这个活动，再判断是否在时间之内
                //     //拿到开始时间
                //     let start=new Date(item.zkObj.start).getTime();
                //     //拿到结束时间
                //     let end=new Date(item.zkObj.end).getTime();
                //     //拿到现在的时间
                //     let nowTime=new Date().getTime();
                //     console.log("开始毫秒数为");
                //     console.log(start);
                //     console.log("结束毫秒数为");
                //     console.log(end);
                //     console.log("现在毫秒数为");
                //     console.log(nowTime);
                //     if(nowTime>=start&&nowTime<end){
                //         console.log("显示折扣价！");
                //         //在时间之内，显示
                //         return true;
                //     }
                //     else {
                //         console.log("不显示折扣价！");
                //         //不在时间段之内，不显示
                //         return false;
                //     }
                // }
                // else{
                //     return false;
                // }
            },
            //获取商品图片的方法
            getImgUrlFn(img) {
                var url = img.split(',')[0];
                return url;
            },
            //跳转单个商品详情的方法
            goToGoodContentPageFn(id) {
                console.log(id);
                this.tools.globalFn.publicLinkToGoodContentFn(id, this);
            },
            // //选择单个商品的方法(给有sku的使用)
            // chooseSingleGoodFn(shopId, skuId, e) {
            //     console.log(shopId);
            //     console.log(skuId);
            //     console.log(e);
            // },
            //选择单个商品的方法
            chooseSingleGoodFn(good, e) {
                console.log(good);
                console.log(e);
                if (e === true) {
                    //push这个商品到已选中数组
                    console.log("触发选择单个商品的方法");
                    this.cartSelectedData.list[0].goods.push(good);
                }
                else if (e === false) {
                    //删除这个商品
                    console.log("删除商品");
                    console.log(this.cartSelectedData.list[0].goods.indexOf(good));
                    this.cartSelectedData.list[0].goods.splice(this.cartSelectedData.list[0].goods.indexOf(good), 1);
                }
                console.log("打印当前选中数组");
                console.log(this.cartSelectedData.list);
                this.shopCartTotal = this.publicShopCartTotalCountFn();
                //关闭动画
                this.$toast.clear();

            },
            //跳转到商家中心页面的方法
            goToShopPageFn(shop) {
                console.log(shop);
                this.tools.globalFn.publicLinkToShopCenterFn(shop.shopId, this);
            },
            //全选单一店铺商品的方法
            chooseOneShopAllGoods(shopId, e) {
                /*
                * shop:被全选的shopid
                * e:组件传递过来的值,布尔类型,是否全选
                * */
                console.log(shopId);
                console.log(e);
                //在本地数据里找到shop，进行shopCheck操作
                for (let shop of this.localShopCartData.data) {
                    if (shop.shopId == shopId) {
                        // this.localShopCartData.data[key].shopCheck = true;
                        for (let good of shop.goods) {
                            good.goodCheck = e;
                        }
                    }
                }
            },
            //去结算的方法
            goToOrderPage() {
                console.log("去结算");
                if (this.cartSelectedData.list.length === 0) {
                    this.tools.globalFn.publicToastFn(this, "请先选中商品");
                    return false;
                }
                //把数据带到结算订单中
                sessionStorage.setItem("selectedGoodList", JSON.stringify(this.cartSelectedData.list[0].goods));
                this.$router.push({name: "confirmOrder"});
            },
            //改变购物车管理状态
            changeCartAdminStatus() {
                if (this.nowCartStatus === 0) {
                    this.nowCartStatus = 1;
                }
                else if (this.nowCartStatus === 1) {
                    this.nowCartStatus = 0;
                }
            },
            //返回上一页的方法
            backLastPage() {
                //给xx传值
                // this.$bridge.callHandler('tabBarStatus', "true", (res) => {
                //     if (res === "true") {
                //         this.$router.go(-1);
                //     }
                // });
                this.$router.go(-1);
            },
            //获取购物车长度的方法(包括选中和渲染)
            getShopCartLenthFn(cartArr) {
                let count = 0;
                for (let shop of cartArr) {
                    count += shop.goods.length;
                }
                return count;
            },
            getFirstData() {
                //清空数组
                // this.localShopCartData.data=[];
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        url: "/checkout/cart/index",
                        method: "GET",
                        success: (res) => {
                            console.log(res);
                            if (res.data.code === 200 && res.data.data.cart_info !== null && res.data.data.cart_info !== false) {
                                //push商品到数组
                                for (let key in res.data.data.cart_info.products) {
                                    //给每个商品添加是否选中属性
                                    res.data.data.cart_info.products[key].goodCheck = false;
                                    this.localShopCartData.data[0].goods.push(res.data.data.cart_info.products[key]);
                                }
                                // this.localShopCartData.data=res.data.data.cart_info.products;
                                //赋值总价(字符串，需要转换为num类型)
                                // this.shopCartTotal=parseInt(res.data.data.cart_info.product_total)*100;
                            }
                            //创建待选中的购物车列表
                            this.cartSelectedData.list[0] = {
                                shopId: 1,
                                shopName: "变福侠商城",
                                goods: [
                                    // {
                                    //     "item_id": 13,
                                    //     "active": 1,
                                    //     "product_id": "57bab0d5f656f2940a3bf56e",
                                    //     "sku": "kilw0001",
                                    //     "name": "",
                                    //     "qty": 1,
                                    //     "custom_option_sku": "",
                                    //     "product_price": 124,
                                    //     "img_url": "//img.tobebetterman.com/media/catalog/product/cache/bd935443df1c50537d4edaab4af5d446/150/150/1/22/12229472_1.jpg",
                                    //     "url": "/catalog/product/57bab0d5f656f2940a3bf56e",
                                    //     "custom_option_info": []
                                    // }
                                ]
                            };
                            //关闭全选状态
                            this.shopCartAllChecked = false;
                            //关闭加载动画
                            this.cartDataIsDoneStatus = true;
                            //关闭加载动画(全屏加载)
                            this.$toast.clear();
                        },
                        fail: (err) => {
                            console.log(err);
                        }
                    }
                )
            }
        },
        created() {
            this.getFirstData();
        },
        mounted() {

        },
        watch: {
            //监听被选中的购物车
            'cartSelectedData.list': {
                handler(newValue, oldValue) {
                    console.log(newValue);
                    console.log(oldValue);
                    console.log("购物车项发生变化");
                    //计算当前购物车总数量
                    let localCartGoodsCount = this.getShopCartLenthFn(this.localShopCartData.data);
                    //计算当前购物车选中数量
                    let cartSelectedCount = this.getShopCartLenthFn(this.cartSelectedData.list);
                    console.log("购物车数量为" + localCartGoodsCount);
                    console.log("购物车选中数量为" + cartSelectedCount);
                    // if (this.cartSelectedData.list.length === this.localShopCartData.data.length) {
                    //     //全选按钮选中
                    //     this.shopCartAllChecked = true;
                    // }
                    // else if (this.cartSelectedData.list.length === 0) {
                    //     //全选按钮非选中
                    //     this.shopCartAllChecked = false;
                    // }
                    // else if (this.cartSelectedData.list.length > 0 && (this.cartSelectedData.list.length < this.localShopCartData.data.length)) {
                    //     //取消全选按钮，再选中
                    //     //取消全选按钮状态
                    //     this.shopCartAllChecked = false;
                    // }
                    if (localCartGoodsCount === cartSelectedCount) {
                        //如果选中长度等于总长度，全选按钮为选中状态
                        this.shopCartAllChecked = true;
                    }
                    else {
                        this.shopCartAllChecked = false;
                    }
                },
                deep: true
            },
            //监听全选
            // shopCartAllChecked(newValue, oldValue){
            //     console.log(newValue);
            //     if(newValue===true){
            //         console.log("全选");
            //         this.eachChangeGoodSelectFn(true);
            //     }
            //     else if(newValue===false){
            //         console.log(this.shopCartAllChecked);
            //         console.log("取消全选");
            //         // this.shopCartAllChecked=false;
            //         this.eachChangeGoodSelectFn(false);
            //         this.cartSelectedData.list=[];
            //     }
            // }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    /*购物车列表*/
    .cartListBg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        min-height: 50px;
        position: relative;
    }

    .cartListByShopBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 60px;
    }

    .cartListByShopBox > li {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 10px;
        background-color: #fff;
        border-top: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;
        margin-top: 10px;
    }

    .cartListByShopBox > li.noContent {
        color: #999;
        font-size: 14px;
        text-align: center;
        padding: 10px;
        background-color: transparent;
        border: none;
    }

    .cartListByShopBox > li:first-child {
        margin-top: 0;
    }

    .listGoodsStyle > div.cxInfoBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        background-color: #fef5f5;
    }

    .listGoodsStyle > div.cxInfoBox div.cx {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .listGoodsStyle > div.cxInfoBox div.cx p.text {
        width: 64%;
        float: left;
        color: #666;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .listGoodsStyle > div.cxInfoBox div.cx p.button {
        width: 32%;
        float: right;
        color: #666;
        font-size: 12px;
        text-align: right;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .listGoodsStyle > div.cxInfoBox div.cx p.button span {
        margin-right: 4px;
    }

    .listGoodsStyle > div.cxInfoBox div.cx p.button .van-icon {
        transform: rotate(90deg);
        margin-bottom: 4px;
    }

    .spinBox {
        width: 100%;
        text-align: center;
        overflow: hidden;
        height: auto;
        padding: 10px 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .listGoodsStyle > div.top div.right > div.priceLine {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        color: #ff9921;
        font-size: 14px;
        margin-bottom: 4px;
        /*display: flex;*/
    }

    .listGoodsStyle > div.top div.right > div.addOrSub {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .listGoodsStyle > div.top div.right > div.addOrSub > .van-stepper {
        float: right;
    }

    /*.priceLine>div.price>.msOldpirce{*/
    /*float: left;*/
    /*color: #999;*/
    /*text-decoration: line-through;*/
    /*font-size: 14px;*/
    /*}*/
    /*.priceLine>div.price>.msPrice{*/
    /*float: left;*/
    /*color: #999;*/
    /*font-size: 14px;*/
    /*margin-left: 8px;*/
    /*}*/
    /*.priceLine>div.price>.msPrice span{*/
    /*color: #f44;*/
    /*font-size: 14px;*/
    /*}*/
    .cartListByShopStyle > ul.list {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .cartListByShopStyle > ul.list > li {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
        border-top: 1px solid #f5f5f5;
        padding-top: 10px;
    }

    .cartListByShopStyle > ul.list > li:first-child {
        margin-top: 0;
        border-top: none;
        padding-top: 0;
    }

    .listGoodsStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .listGoodsStyle > div.top {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 8px;
    }

    /*.listGoodsStyle > div.bottom {*/
    /*width: 100%;*/
    /*height: auto;*/
    /*overflow: hidden;*/
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    /*}*/

    /*.listGoodsStyle > div.bottom p.price {*/
    /*float: left;*/
    /*color: #f44;*/
    /*font-size: 12px;*/
    /*padding: 4px 0;*/
    /*}*/

    /*.listGoodsStyle > div.bottom p.price span {*/
    /*font-size: 16px;*/
    /*}*/

    /*.listGoodsStyle > div.bottom div {*/
    /*float: right;*/
    /*height: auto;*/
    /*overflow: hidden;*/
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    /*}*/

    /*.listGoodsStyle > div.bottom div > * {*/
    /*float: left;*/
    /*}*/

    /*.listGoodsStyle > div.bottom div > p.reduce {*/
    /*color: #666;*/
    /*font-size: 16px;*/
    /*padding: 4px 10px;*/
    /*font-weight: bold;*/
    /*}*/

    /*.listGoodsStyle > div.bottom div > p.num {*/
    /*color: #666;*/
    /*font-size: 16px;*/
    /*padding: 4px 0;*/
    /*margin: 0 6px;*/
    /*}*/

    /*.listGoodsStyle > div.bottom div > p.add {*/
    /*color: #333;*/
    /*font-size: 16px;*/
    /*padding: 4px 10px;*/
    /*font-weight: bold;*/
    /*}*/

    .checkBoxSeq {
        font: normal normal normal 14px/1 vant-icon;
        font-size: 12px;
        color: transparent;
        text-align: center;
        border: 1px solid #aaa;
        width: 20px;
        height: 20px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: middle;
        line-height: 20px;
        border-radius: 100%;
    }

    .checkBoxSeq.check:before {
        content: "\F056";
    }

    .checkBoxSeq.check {
        color: #fff;
        background-color: #06bf04;
        border-color: #06bf04;
    }

    .cartListByShopStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .cartListByShopStyle > div.header {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #f5f5f5;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    .cartListByShopStyle > div.header > p {
        display: inline-block;
        vertical-align: middle;
        line-height: 20px;
        margin-left: 4px;
        font-size: 16px;
        font-weight: bold;
    }

    .listGoodsStyle > div.cxInfoBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        background-color: #fef5f5;
    }

    .listGoodsStyle > div.cxInfoBox div.cx {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .listGoodsStyle > div.cxInfoBox div.cx p.text {
        width: 64%;
        float: left;
        color: #666;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .listGoodsStyle > div.cxInfoBox div.cx p.button {
        width: 32%;
        float: right;
        color: #666;
        font-size: 12px;
        text-align: right;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .listGoodsStyle > div.cxInfoBox div.cx p.button span {
        margin-right: 4px;
    }

    .listGoodsStyle > div.cxInfoBox div.cx p.button .van-icon {
        transform: rotate(90deg);
        margin-bottom: 4px;
    }

    .spinBox {
        width: 100%;
        text-align: center;
        overflow: hidden;
        height: auto;
        padding: 10px 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .listGoodsStyle > div.top div.left {
        float: left;
        width: 12%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
    }

    .listGoodsStyle > div.top div.img {
        width: 28%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-top: 28%;
        position: relative;
        float: left;
    }

    .listGoodsStyle > div.top div.img img {
        display: block;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
    }

    .listGoodsStyle > div.top div.right {
        float: right;
        width: 58%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .listGoodsStyle > div.top div.right h3 {
        color: #333;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 4px;
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
    }

    .listGoodsStyle > div.top div.right h4 {
        color: #999;
        font-size: 14px;
        font-weight: normal;
        margin-bottom: 4px;
        word-break: break-all;
    }

    .listGoodsStyle > div.top div.right h5 {
        color: #666;
        font-size: 14px;
        font-weight: normal;
    }
</style>
