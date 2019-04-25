<template>
    <div class="publicAllContentBg" id="confirmOrder">
        <!--头部导航-->
        <van-nav-bar title="确认订单" class="globalNavBarHeaderClass"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     fixed
        >
            <!--<van-icon name="arrow-left" slot="left" style="color: #fafafa" @click="backLastPage"></van-icon>-->
        </van-nav-bar>
        <!--订单信息-->
        <!--整个确认订单背景-->
        <div class="publicOrderBg">
            <van-loading type="spinner" color="black" v-if="allIsLoadingDone===false"
                         class="globalLoadingAnmClass"></van-loading>
            <van-cell id="confirmOrderSelectAddress" v-if="allIsLoadingDone" @click="goToAddressSelectPage" is-link icon="location" :title="shipAddress.first_name" :value="shipAddress.telephone"/>
            <!--收货地址部分-->
            <div class="addressBox" v-if="allIsLoadingDone">
                <!--图标-->
                <!--<div class="icon">-->
                    <!--<van-icon name="location"></van-icon>-->
                <!--</div>-->
                <!--信息-->
                <div class="info">
                    <!--电话和联系人-->
                    <!--<div class="contact">-->
                    <!--<p class="user">联系人:{{shipAddress.first_name}}</p>-->
                    <!--<p class="phone">{{shipAddress.telephone}}</p>-->
                    <!--</div>-->
                    <p class="address">收货地址:{{shipAddress.state+shipAddress.city+shipAddress.district+shipAddress.street1}}</p>
                </div>
            </div>
            <!--购买的店铺列表-->
            <ul class="orderShopListBox" v-if="allIsLoadingDone">
                <li v-for="shop in confirmData.list">
                    <!--单个店铺带商品的样式-->
                    <div class="orderListStyle">
                        <!--订单头部信息-->
                        <div class="header">
                            <div class="left">
                                <van-icon name="shop" style="margin-right: 4px"></van-icon>
                                {{shop.shopName}}
                                <!--<van-icon name="arrow" style="margin-left: 4px"></van-icon>-->
                            </div>
                        </div>
                        <!--订单商品列表-->
                        <ul class="list">
                            <li v-for="item in shop.goods" :key="item.product_id">
                                <div class="orderListGoodsStyle">
                                    <!--左侧图片部分-->
                                    <div class="img">
                                        <img :src="item.img_url" alt="">
                                    </div>
                                    <!--右侧商品信息部分-->
                                    <div class="info">
                                        <div class="top">
                                            <p class="title">{{item.name}}</p>
                                            <p class="realPrice">￥{{(item.product_price/100).toFixed(2)}}
                                                <!--<br v-if="item.zkInfo.zk===true"/><span v-if="item.zkInfo.zk===true"-->
                                                <!--v-text="getOldPriceFn(item)"></span>-->
                                            </p>
                                        </div>
                                        <div class="bottom">
                                            <!--<p class="gg">{{item.ggName}}</p>-->
                                            <p class="num">x{{item.qty}}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!--底部cell-->
                        <van-cell-group>
                            <!--配送方式-->
                            <van-cell title="配送方式" is-link :value="returnShipMethodFn(shop.shippingMethod)"
                                      @click="showShipTypeFn(shop)"/>
                            <!--<van-cell title="促销信息" is-link value="内容" v-if="returnProStatusFn(shop)" />-->
                            <!--商家优惠券-->
                            <van-coupon-cell
                                    title="商家优惠券"
                                    :coupons="shop.userCanUseCoupons"
                                    :chosen-coupon="shop.couponSelected.id"
                                    @click="shopCouponCellClickFn(shop)"
                                    v-if="allIsLoadingDone&&shop.userCanUseCoupons.length>0"
                            />
                            <!--买家留言-->
                            <van-field
                                    v-model="shop.remark"
                                    clearable
                                    label="买家留言"
                                    placeholder="请输入您的留言"
                            />

                        </van-cell-group>
                        <!--底部店铺小计-->
                        <div class="orderShopTotalBox">
                            <div>
                                <p class="priceTotal">小计:<span v-text="shopPriceTotalFn(shop)"></span></p>
                                <p class="numTotal">共<span>{{shop.goods.length}}</span>件商品</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <!--选择平台优惠券-->
            <!--<van-coupon-cell-->
                    <!--title="平台优惠券"-->
                    <!--:coupons="userPlatformCoupons.coupons"-->
                    <!--:chosen-coupon="userPlatformCoupons.selected"-->
                    <!--@click="popupsStatus.platformCoupon = true"-->
                    <!--v-if="allIsLoadingDone"-->
                    <!--style="margin-bottom: 10px"-->
            <!--/>-->
            <!--所有店铺总计-->
            <van-cell-group id="orderTotalMoudel" v-if="allIsLoadingDone">
                <van-cell title="商品金额" :value="goodsPirceCount" id="confirmOrderOrderTotalPrice"/>
                <van-cell title="运费" :value="orderShipPriceTotal"/>
                <van-cell title="商家优惠券" v-if="shopCouponsCutPriceTotal!==0" :value="shopCouponsCutPriceTotal"/>
                <!--<van-cell title="平台优惠券" v-if="userPlatformCoupons.selected!==-1" :value="platformCouponsCutPriceTotal"/>-->
            </van-cell-group>
        </div>
        <!--底部提交订单栏-->
        <van-submit-bar
                v-if="allIsLoadingDone"
                :loading="orderOptions.isLoading"
                :price="orderOptions.total"
                button-text="提交订单"
                @submit="confirmOrderFn"
        />
        <!--运费选择弹窗-->
        <van-popup v-model="popupsStatus.shipInfo" position="bottom">
            <van-radio-group v-model="shipTypeData.selected">
                <van-cell-group>
                    <van-cell :title="item.label" :label="'￥'+(item.cost/100).toFixed(2)" v-for="(item,index) in shipTypeData.list"
                              :key="index" @click="selectShipTypeFn(item)">
                        <van-radio :name="item.method"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-popup>
        <!-- 平台优惠券弹窗 -->
        <van-popup v-model="popupsStatus.platformCoupon" position="bottom">
            <van-coupon-list
                    :coupons="userPlatformCoupons.coupons"
                    :chosen-coupon="userPlatformCoupons.selected"
                    :disabled-coupons="userPlatformCoupons.disabledCoupons"
                    :show-exchange-bar="false"
                    @change="choosePlatformCouponChange"
            />
        </van-popup>
        <!-- 店铺优惠券弹窗 -->
        <van-popup v-model="popupsStatus.shopCoupon" position="bottom">
            <van-coupon-list
                    :coupons="shopCoupons.coupons"
                    :chosen-coupon="shopCoupons.selected"
                    :disabled-coupons="shopCoupons.disabledCoupons"
                    :show-exchange-bar="false"
                    @change="chooseShopCouponChange"
            />
        </van-popup>
        <!-- 选择地址弹窗 -->
        <van-popup v-model="popupsStatus.selectAddress" position="bottom">
            <van-address-list
                    v-model="userAddressData.current"
                    :list="userAddressData.list"
                    :add-button-text="userAddressData.bottomButtonText"
                    @select="selectAddressConfirm"
                    @add="popupsStatus.selectAddress=false"
                    id="confirmOrderSelectAddressPopup"
            />
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: 'confirmOrder',
        computed: {
            //商家优惠券优惠总金额
            shopCouponsCutPriceTotal(){
                //循环数据，如果没有选中的，那么就为0
                //记录使用次数
                let usedShopCouponCount=0;
                //记录使用优惠的金额
                let usedShopCouponPriceCount=0;
                this.confirmData.list.forEach((shop)=>{
                    //如果可用的优惠券大于0且已经选中了优惠券
                    if(shop.userCanUseCoupons.length>0&&shop.couponSelected.id!==-1){
                        //使用次数+1
                        usedShopCouponCount+=1;
                        //记录折扣的金额
                        usedShopCouponPriceCount+=shop.userCanUseCoupons[shop.couponSelected.id].denominations;
                    }
                });
                //循环结束以后，根据记录，返回不同值
                if(usedShopCouponCount===0){
                    //如果使用次数为0，那么直接返回false(同时也让商家优惠券折扣不显示)
                    return 0;
                }
                //不为0，返回折扣的金额(这里返回字符串)
                return "-￥"+(usedShopCouponPriceCount/100).toFixed(2);
            },
            //计算商品总金额的方法(单位为分)
            goodPriceCountForCom(){
                let count = 0;
                for (let key in this.confirmData.list) {
                    for (let index in this.confirmData.list[key].goodsList) {
                        count += (this.confirmData.list[key].goodsList[index].product_price * this.confirmData.list[key].goodsList[index].qty);
                    }
                }
               return count*100;
            },
            //计算所有优惠券
            platformCouponsCutPriceTotal() {
                if(this.userPlatformCoupons.selected===-1){
                    return "￥0.00";
                }
                else{
                    return "-￥"+(this.userPlatformCoupons.coupons[this.userPlatformCoupons.selected].denominations/100).toFixed(2);
                }
                // let count = 0;
                // // for (let key in this.confirmData.list) {
                // //
                // // }
                // count = (count / 100).toFixed(2);
                // return `￥${count}`;
            },
            //计算商品金额的属性(只有商品金额，不包含优惠券等)
            goodsPirceCount() {
                // return (this.confirmData.orderTotalCount/100).toFixed(2);
                let count = 0;
                for (let shop of this.confirmData.list) {
                    for (let good of shop.goods) {
                        count += (good.product_price * good.qty);
                    }
                }
                count = (count/100).toFixed(2);
                return `￥${count}`;
            },
            //计算运费
            orderShipPriceTotal() {
                let count = 0;
                // for (let key in this.confirmData.list) {
                //     if (this.confirmData.list[key].userSelectShipInfo.saveSelected.price !== undefined && this.confirmData.list[key].userSelectShipInfo.saveSelected.price !== null && this.confirmData.list[key].userSelectShipInfo.saveSelected.price !== "") {
                //         count += this.confirmData.list[key].userSelectShipInfo.saveSelected.price;
                //     }
                // }
                count = (count / 100).toFixed(2);
                return `+￥${count}`;
            }
        },
        data() {
            return {
                //存储地址信息
                userAddressData:{
                    //地址列表
                    list:[],
                    //当前选中
                    current:-1,
                    //底部按钮文字
                    bottomButtonText:"完成",
                },
                //存储订单号
                orderNumCreatedSave:null,
                //存储后端返回的初始化订单数据
                orderDataFromService: {
                    //支付方式
                    // "payments": [
                    //     {
                    //         "method": "check_money",
                    //         "label": "Check / Money Order",
                    //         "imageUrl": "",
                    //         "supplement": "Off-line Money Payments",
                    //         "checked": true
                    //     },
                    //     {
                    //         "method": "alipay_standard",
                    //         "label": "支付宝支付",
                    //         "imageUrl": "",
                    //         "supplement": null
                    //     }
                    // ],
                    // //配送方式
                    // "shippings": [
                    //     {
                    //         "method": "free_shipping",
                    //         "label": "Free shipping( 7-20 work days)",
                    //         "name": "HKBRAM",
                    //         "checked": true,
                    //         "shipping_i": 1
                    //     },
                    //     {
                    //         "method": "middle_shipping",
                    //         "label": "middle shipping( 6-15 work days)",
                    //         "name": "HKBRAM",
                    //         "checked": "",
                    //         "shipping_i": 2
                    //     },
                    //     {
                    //         "method": "fast_shipping",
                    //         "label": "Fast Shipping( 5-10 work days)",
                    //         "name": "HKDHL",
                    //         "checked": "",
                    //         "shipping_i": 3
                    //     }
                    // ],
                    // //选中的配送方式
                    // "current_shipping_method": "free_shipping",
                    // //选中的支付方式
                    // "current_payment_method": 0,
                    // //选中的购物车信息
                    // "cart_info": {
                    //     "cart_id": "12",
                    //     "items_count": 3,
                    //     "shipping_method": "free_shipping",
                    //     "payment_method": null,
                    //     "shipping_cost": 0,
                    //     "product_total": "372.00",
                    //     "products": [
                    //         {
                    //             "item_id": 27,
                    //             "store": "shop-server.tobebetterman.com",
                    //             "product_id": "57bab0d5f656f2940a3bf56e",
                    //             "sku": "kilw0001",
                    //             "name": "¼ç´ø³¤Ðä¸ßµÍÈÕÀñ·þ",
                    //             "qty": 3,
                    //             "custom_option_sku": "",
                    //             "product_price": 124,
                    //             "imgUrl": "//img.tobebetterman.com/media/catalog/product/cache/bd935443df1c50537d4edaab4af5d446/100/100/1/22/12229472_1.jpg",
                    //             "custom_option_info": []
                    //         }
                    //     ],
                    //     "product_weight": 297,
                    //     "product_volume_weight": 0,
                    //     "product_volume": null
                    // }
                },
                //用户选择的配送方式（目前作为单商户）
                userSelectShipInfo: {
                    //用于显示
                    showUserVal: "",
                    //买家留言
                    remark: ""
                },
                //存储用户领取的平台优惠券
                userPlatformCoupons: {
                    //可以使用的
                    coupons: [
                        // {
                        //     //优惠券id
                        //     id:1,
                        //     //优惠券名称
                        //     name: '哦牛批优惠券',
                        //     //折扣（0为满减券）88=>8.8折
                        //     discount: 0,
                        //     //面值（0为折扣券）单位分
                        //     denominations: 150,
                        //     //满减条件（0为无门槛，满XX元可用）单位分
                        //     originCondition: 0,
                        //     //不可用原因
                        //     reason: '',
                        //     //订单优惠金额，单位分
                        //     value: 150,
                        //     //卡有效开始时间 (时间戳, 单位秒)
                        //     startAt: 1489104000,
                        //     //卡失效日期 (时间戳, 单位秒)
                        //     endAt: 1514592000
                        // }
                    ],
                    //已经选中的
                    selected: -1,
                    //不能使用的
                    disabledCoupons: []
                },
                //存储某一店铺下用户领取的优惠券
                shopCoupons: {
                    //可以使用的
                    coupons: [
                        // {
                        //     //优惠券id
                        //     id:1,
                        //     //优惠券名称
                        //     name: '哦牛批优惠券',
                        //     //折扣（0为满减券）88=>8.8折
                        //     discount: 0,
                        //     //面值（0为折扣券）单位分
                        //     denominations: 150,
                        //     //满减条件（0为无门槛，满XX元可用）单位分
                        //     originCondition: 0,
                        //     //不可用原因
                        //     reason: '',
                        //     //订单优惠金额，单位分
                        //     value: 150,
                        //     //卡有效开始时间 (时间戳, 单位秒)
                        //     startAt: 1489104000,
                        //     //卡失效日期 (时间戳, 单位秒)
                        //     endAt: 1514592000
                        // }
                    ],
                    //已经选中的
                    selected: -1,
                    //不能使用的
                    disabledCoupons: [],
                    //存储用户选择的店铺id
                    shopId:""
                },
                //所有选项是否已经加载完成
                allIsLoadingDone: false,
                //地址存储
                shipAddress: {},
                //配送方式的数据
                shipTypeData: {
                    list: [],
                    selected: "",
                    //选择的方式
                    selectedMethod: "",
                    //存储当前选择的shopId，用来改变和查询所有list里的值
                    selectedShopId: ""
                },
                //几个弹窗的显示状态
                popupsStatus: {
                    //选择运费弹窗
                    shipInfo: false,
                    //平台优惠券弹窗
                    platformCoupon: false,
                    //店铺优惠券弹窗
                    shopCoupon:false,
                    //选择地址
                    selectAddress:false
                },
                //订单提交栏设置
                orderOptions: {
                    total: 0,
                    //是否在加载中
                    isLoading: false
                },
                //结算订单数据
                confirmData: {
                    //以店铺为单位的商品列表
                    list: [
                        // {
                        //     //店铺id
                        //     shopId: "1",
                        //     //店铺名称
                        //     shopName: "变福侠商城",
                        //     //商品列表
                        //     goodsList: [],
                        //     //配送方式
                        //     userSelectShipInfo: {
                        //         //显示给用户看的
                        //         showUser: "",
                        //         //存储的
                        //         localSave: [
                        //             {
                        //                 id: 1,
                        //                 name: "顺丰包邮",
                        //                 price: 0
                        //             },
                        //             {
                        //                 id: 2,
                        //                 name: "EMS平邮",
                        //                 price: 0
                        //             },
                        //             {
                        //                 id: 3,
                        //                 name: "圆通6元",
                        //                 price: 600
                        //             }
                        //         ],
                        //         //存储的选择
                        //         saveSelected: {}
                        //     },
                        //     //备注
                        //     remark: "",
                        //     //单一店铺所有商品总计
                        //     shopPriceTotal: 0,
                        //     //店铺优惠券
                        //     proInfo: {
                        //         //店铺优惠券列表(用户已经领取的)
                        //         list: [],
                        //         //选中的优惠券
                        //         selectedId: ""
                        //     }
                        // }
                    ],
                    //订单总计
                    orderTotalCount: 0
                }
            }
        },
        methods: {
            //选择地址
            selectAddressConfirm(){
                console.log(this.userAddressData);
                //切换地址
                // console.log(this.userAddressData.list.find((el)=>{
                //     return el.id==this.userAddressData.current;
                // }));
                this.shipAddress=this.userAddressData.list.find((el)=>{
                    return el.id==this.userAddressData.current;
                });
                //关闭
                this.popupsStatus.selectAddress=false;
            },
            //选择商家优惠券的方法
            chooseShopCouponChange(index) {
                /*
                * index:选中的优惠券的下标
                * 如果下标为-1，那就是没有选中，直接关闭优惠券选择窗口
                * */
                console.log(index);
                //赋值已经选中的优惠券下标
                this.shopCoupons.selected=index;
                //如果返回的下标等于-1，用户选择不使用优惠或取消选择，关闭窗口
                if(index===-1){
                    //用户如果取消优惠券，也需要重新计算
                    //循环把当前用户选择的shop的优惠券选择id取消
                    for(let shop of this.confirmData.list){
                        if(shop.shopId==this.shopCoupons.shopId){
                            shop.couponSelected.id=-1;
                        }
                    }
                    this.orderOptions.total=this.countFinalPriceFn();
                    this.popupsStatus.shopCoupon = false;
                    return false;
                }
                console.log("不是-1");
                //先找到对应的shopId把选择的优惠券存储
                for(let shop of this.confirmData.list){
                    if(shop.shopId==this.shopCoupons.shopId){
                        shop.couponSelected.id=index;
                    }
                    // console.log("打印修改后的元素");
                    // console.log(shop);
                    // console.log(index);
                    //如果不是-1，那么重新计算价格
                    this.orderOptions.total=this.countFinalPriceFn();
                    //关闭窗口
                    this.popupsStatus.shopCoupon = false;
                    // return;
                }
                // this.confirmData.list.forEach((el,index,arr)=>{
                //      if(el.shopId==this.shopCoupons.shopId){
                //          el.couponSelected.id=index;
                //      }
                //      console.log("打印修改后的元素");
                //      console.log(el);
                //      console.log(index);
                //      return false;
                // });

            },
            //点击商家优惠券选择cell方法
            shopCouponCellClickFn(shop){
                console.log(shop);
                //shop:店铺的所有信息
                //把可用优惠券放入优惠券信息中
                this.shopCoupons.coupons=shop.userCanUseCoupons;
                //如果有，放置选择的id
                shop.couponSelected.id===-1?this.shopCoupons.selected=-1:this.shopCoupons.selected=shop.couponSelected.id;
                //存储店铺id
                this.shopCoupons.shopId=shop.shopId;
                //显示弹窗
                this.popupsStatus.shopCoupon=true;
            },
            //返回配送方式名称的方法
            returnShipMethodFn(currentName){
                // console.log("打印选中名称");
                // console.log(currentName);
                //currentName:当前店铺默认选中的运送方式
                //和现在现有的方法作比较
                return this.shipTypeData.list.find((el)=>{
                    return el.method===currentName;
                }).label;
            },
            //计算所有价格的方法(商品总价+运费+优惠券减免费用)
            countFinalPriceFn(){
                let count=0;
                //计算所有商品价格
                this.confirmData.list.forEach((shop,index,arr)=>{
                    //先计算单一商品所有商品原价
                    shop.goods.forEach((good)=>{
                        count+=good.product_price*good.qty;
                    });
                    //计算完商品原价以后看是否有选中优惠券
                    if(shop.userCanUseCoupons.length>0&&shop.couponSelected.id!==-1){
                        //如果可用优惠券不为0并且有选中的话，那么计算一哈
                        count-=shop.userCanUseCoupons[shop.couponSelected.id].denominations;
                    }
                });
                return count;
                // for (let key in this.confirmData.list) {
                //     //店铺运费
                //     if (this.confirmData.list[key].userSelectShipInfo.saveSelected.price !== undefined && this.confirmData.list[key].userSelectShipInfo.saveSelected.price !== null && this.confirmData.list[key].userSelectShipInfo.saveSelected.price !== "") {
                //         count += this.confirmData.list[key].userSelectShipInfo.saveSelected.price;
                //     }
                //     //店铺商品总价
                //     for (let index in this.confirmData.list[key].goodsList) {
                //         count += (this.confirmData.list[key].goodsList[index].product_price * this.confirmData.list[key].goodsList[index].qty*100);
                //     }
                // }
                //计算平台优惠券减去的价格(如果已经选中的话)
                // if(this.userPlatformCoupons.selected!==-1){
                //     count-=this.userPlatformCoupons.coupons[this.userPlatformCoupons.selected].denominations;
                // }
            },
            //选择平台优惠券的方法
            choosePlatformCouponChange(index) {
                /*
                * index:选中的优惠券的下标
                * 如果下标为-1，那就是没有选中，直接关闭优惠券选择窗口
                * */
                console.log(index);
                this.userPlatformCoupons.selected=index;
                // console.log(this.userPlatformCoupons.selected);
                if (index === -1) {
                    //用户选择不使用优惠，关闭窗口
                    this.popupsStatus.platformCoupon = false;
                }
                else{
                    //重新计算价格
                    this.orderOptions.total=this.countFinalPriceFn();
                    //计算完以后关闭窗口
                    this.popupsStatus.platformCoupon = false;
                }
            },
            //去选择地址的方法
            goToAddressSelectPage() {
                //打开一个弹窗选择地址，把地址赋值到选择中
                this.popupsStatus.selectAddress=true;
                // this.$router.push({name: "chooseAddress"});
            },
            //计算单一店铺总价的方法
            shopPriceTotalFn(shop) {
                let total = 0;
                for (let key in shop.goods) {
                    total += shop.goods[key].product_price * shop.goods[key].qty;
                }
                return "￥" + (total/100).toFixed(2);
            },
            //返回是否有优惠信息的方法
            returnProStatusFn(shop) {
                for (let key in shop.goodsList) {
                    if (shop.goodsList[key].zkInfo.zk === true) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            //拿原价的方法
            getOldPriceFn (item) {
                console.log("打印原价");
                console.log(item);
                return "￥" + (item.price * item.zkInfo.zkPro / 100).toFixed(2);
            },
            //选择店铺配送方式的方法
            selectShipTypeFn(item) {
                //放置选择id到shopInfo中
                console.log("哦牛批")
                console.log(item);
                this.shipTypeData.selected = item.method;
                //放置选择方式
                this.shipTypeData.selectedMethod = item.method;
                //放置选择的文字
                // this.userSelectShipInfo.showUserVal = item.name;
                //改变店铺列表里原有的存储
                this.confirmData.list.forEach((el,index,arr)=>{
                    //如果找到了相同id，那么改变选中的配送方式且记录下运费
                    if(el.shopId==this.shipTypeData.selectedShopId){
                        //存储运送方式
                        el.shippingMethod=item.method;
                        //存储运费
                        item.cost==0?el.shippingCost=0:el.shippingCost=item.cost;
                    }
                });
                //触发计算方法
                // this.orderOptions.total=this.countFinalPriceFn();
                //关闭窗口
                this.popupsStatus.shipInfo=false;
            },
            //显示该店铺配送方式的方法
            showShipTypeFn(shop) {
                console.log(shop);
                //放置选中的id
                this.shipTypeData.selected = shop.shippingMethod;
                console.log(this.shipTypeData);
                //存储这个shopId，方便以后查询和修改
                this.shipTypeData.selectedShopId = shop.shopId;
                //显示弹窗
                this.popupsStatus.shipInfo = true;
            },
            //返回运费信息的方法
            returnYfFn(shop) {
                if (shop.shipInfo.selected === "" || shop.shipInfo.selected === null) {
                    return "请选择配送方式";
                }
                else {
                    //拿到选中id，循环，return
                    console.log(this.shipTypeData.selected);
                    //循环当前这个店铺的配送方式列表,当前选中的id和选择配送方式组件id相同就return
                    for (let key in shop.shipInfo.list) {
                        if (shop.shipInfo.list[key].id == this.shipTypeData.selected) {
                            console.log(shop.shipInfo.list[key].id);
                            return shop.shipInfo.list[key].name + "￥" + (shop.shipInfo.list[key].price / 100).toFixed(2);
                        }
                    }
                }
            },
            //查看物流的方法
            goToLogPage(id) {
                this.$router.push("/checkLog/" + id);
            },
            //返回上一页的方法
            backLastPage() {
                //通知服务端把选中状态清除
                // this.tools.globalFn.publicAxiosFn(this,{
                //     url:"/checkout/cart/selectall",
                //     needLogin:true,
                //     params:{
                //         checked:0
                //     },
                //     success:(res)=>{
                //         if(res.data.code===200){
                //             //返回上一页
                //             this.$router.go(-1);
                //         }
                //     }
                // });
                this.$router.go(-1);
            },
            //提交订单的方法
            confirmOrderFn() {
                //先判断是否有订单号，没有新建，否则继续支付
                if(this.orderNumCreatedSave===null){
                    console.log("提交订单");
                    //生成需要的数据
                    // console.log(this.shipAddress);
                    // let obj={
                    //     address_id:this.shipAddress.address_id,
                    //     payment_method:"alipay_standard",
                    //     module_type:1,
                    //     post_info:this.confirmData.list.map((shop)=>{
                    //         console.log(shop);
                    //         return {
                    //             //店铺id
                    //             ushop_id:shop.shopId,
                    //             //优惠券id
                    //             coupon_id:shop.couponSelected.id===-1?0:shop.userCanUseCoupons[shop.couponSelected.id].id,
                    //             //配送方式
                    //             shipping_method:shop.shippingMethod,
                    //             //备注信息
                    //             order_remark:shop.remark
                    //         }
                    //     })
                    // }
                    // console.log(obj);
                    //请求接口
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin:true,
                        url:"/checkout/onepage/submitorder",
                        data:{
                            address_id:this.shipAddress.address_id,
                            payment_method:"alipay_standard",
                            module_type:1,
                            post_info:JSON.stringify(this.confirmData.list.map((shop)=>{
                                console.log(shop);
                                return {
                                    //店铺id
                                    ushop_id:shop.shopId,
                                    //优惠券id
                                    coupon_id:shop.couponSelected.id===-1?0:shop.userCanUseCoupons[shop.couponSelected.id].id,
                                    //配送方式
                                    shipping_method:shop.shippingMethod,
                                    //备注信息
                                    order_remark:shop.remark
                                }
                            }))
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //存储订单号
                                this.orderNumCreatedSave=res.data.data.order_sn;
                                //跳转支付
                                this.goToPayFn(res.data.data.order_sn);
                            }
                            else{
                                this.tools.globalFn.publicToastFn(this,res.data.message);
                            }
                        }
                    })
                    // this.orderOptions.isLoading = true;
                    //生成订单
                    //生成店铺为单位的列表
                    // let orderGoodsList = [
                    //     {
                    //         "store_id": 1,            //店铺id
                    //         "item_list": [            //购买item_id数组
                    //
                    //         ],
                    //         "order_remark": ""     //备注
                    //     }
                    // ];
                    // console.log(this.confirmData.list);
                    // //循环放置商品
                    // for (let good of this.confirmData.list[0].goodsList) {
                    //     orderGoodsList[0].item_list.push(good.item_id);
                    // }
                    // this.tools.globalFn.publicAxiosFn(this,
                    //     {
                    //         url: "/checkout/onepage/submitorder",
                    //         method: "POST",
                    //         data: {
                    //             address_id: this.shipAddress.address_id,
                    //             shipping_method: this.shipTypeData.selectedMethod,
                    //             payment_method: "alipay_standard",
                    //             product_list: orderGoodsList
                    //         },
                    //         success: (res) => {
                    //             console.log(res);
                    //             // alert(res.data.message);
                    //             if (res.data.code === 200) {
                    //                 this.tools.globalFn.publicToastFn(this, "创建成功");
                    //                 //存储订单编号
                    //                 this.orderNumCreatedSave=res.data.data.order_sn;
                    //                 //支付
                    //                 this.goToPayFn(res.data.data.order_sn);
                    //             }
                    //         },
                    //         fail: (err) => {
                    //             console.log(err);
                    //             // alert("创建未成功");
                    //         }
                    //     }
                    // );
                }
                else{
                    this.goToPayFn(this.orderNumCreatedSave);
                }

            },
            //去支付的方法
            goToPayFn(orderNum){
                // this.tools.globalFn.publicToastFn(this,"传递给安卓客户端订单号"+orderNum);
                //跳转支付
                this.$bridge.callHandler("confirmOrderFn", orderNum, (res) => {
                    // alert("传递给安卓客户端订单号"+orderNum)
                    // alert("来自客户端的回复信息"+res);
                    //存储接下来要跳的订单type
                    localStorage.orderListType = "0";
                    if (res === "true") {
                        //跳转订单页面
                        // alert("结算成功，跳转订单页面");
                        this.$router.replace({name: "orderList"});
                    }
                    else if (res === "false") {
                        // alert("结算失败，跳转订单页面");
                        this.$router.replace({name: "orderList"});
                    }
                    else if(res==="cancel"){
                        // alert("应该继续支付");
                        //用户取消支付，但订单已经生成，取消按钮loading
                        this.$router.replace({name: "orderList"});
                        this.orderOptions.isLoading=false;
                    }
                });
            },
            //初始化平台优惠券的方法
            getFirstPlatformCouponFn() {
                //重置
                this.userPlatformCoupons.coupons=[];
                this.userPlatformCoupons.disabledCoupons=[];
                this.userPlatformCoupons.selected=-1;
                //请求成功以后放置值，然后return
                let list=[
                    {
                        //优惠券id
                        id: 1,
                        //优惠券名称
                        name: '减1.5元优惠券',
                        //折扣（0为满减券）88=>8.8折
                        discount: 0,
                        //面值（0为折扣券）单位分
                        denominations: 150,
                        //满减条件（0为无门槛，满XX元可用）单位分
                        originCondition: 0,
                        //不可用原因
                        reason: '',
                        //订单优惠金额，单位分
                        value: 150,
                        //卡有效开始时间 (时间戳, 单位秒)
                        startAt: 1489104000,
                        //卡失效日期 (时间戳, 单位秒)
                        endAt: 1514592000,
                        //是否启用
                        isEnabled:true
                    },
                    {
                        //优惠券id
                        id:2,
                        //优惠券名称
                        name: '满10元减1.2元优惠券',
                        //折扣（0为满减券）88=>8.8折
                        discount: 0,
                        //面值（0为折扣券）单位分
                        denominations: 120,
                        //满减条件（0为无门槛，满XX元可用）单位分
                        originCondition: 1000,
                        //不可用原因
                        reason: '',
                        //订单优惠金额，单位分
                        value: 120,
                        //卡有效开始时间 (时间戳, 单位秒)
                        startAt: 1489104000,
                        //卡失效日期 (时间戳, 单位秒)
                        endAt: 1514592000,
                        //是否启用
                        isEnabled:true
                    },
                    {
                        //优惠券id
                        id:3,
                        //优惠券名称
                        name: '满100元减10元优惠券',
                        //折扣（0为满减券）88=>8.8折
                        discount: 0,
                        //面值（0为折扣券）单位分
                        denominations: 1000,
                        //满减条件（0为无门槛，满XX元可用）单位分
                        originCondition: 10000,
                        //不可用原因
                        reason: '',
                        //订单优惠金额，单位分
                        value: 1000,
                        //卡有效开始时间 (时间戳, 单位秒)
                        startAt: 1538365825,
                        //卡失效日期 (时间戳, 单位秒)
                        endAt: 1540871425,
                        //是否启用
                        isEnabled:true
                    },
                    {
                        //优惠券id
                        id:4,
                        //优惠券名称
                        name: '满100元减10元优惠券',
                        //折扣（0为满减券）88=>8.8折
                        discount: 0,
                        //面值（0为折扣券）单位分
                        denominations: 1000,
                        //满减条件（0为无门槛，满XX元可用）单位分
                        originCondition: 10000,
                        //不可用原因
                        reason: '',
                        //订单优惠金额，单位分
                        value: 1000,
                        //卡有效开始时间 (时间戳, 单位秒)
                        startAt: 1538365825,
                        //卡失效日期 (时间戳, 单位秒)
                        endAt: 1540871425,
                        //是否启用
                        isEnabled:false
                    },
                    {
                        //优惠券id
                        id:5,
                        //优惠券名称
                        name: '满200元减20元优惠券',
                        //折扣（0为满减券）88=>8.8折
                        discount: 0,
                        //面值（0为折扣券）单位分
                        denominations: 2000,
                        //满减条件（0为无门槛，满XX元可用）单位分
                        originCondition: 20000,
                        //不可用原因
                        reason: '',
                        //订单优惠金额，单位分
                        value: 2000,
                        //卡有效开始时间 (时间戳, 单位秒)
                        startAt: 1538365825,
                        //卡失效日期 (时间戳, 单位秒)
                        endAt: 1540871425,
                        //是否启用
                        isEnabled:true
                    },
                ];
                for(let obj of list){
                    if(this.couponCanUseFn(obj)===false){
                        //push进不可用
                        this.userPlatformCoupons.disabledCoupons.push(obj);
                    }
                    else if(this.couponCanUseFn(obj)===true){
                        //push进可用
                        this.userPlatformCoupons.coupons.push(obj);
                    }
                }

            },
            //判断优惠券是否可以使用的方法
            couponCanUseFn(coupon) {
                // console.log(coupon.name);
                // console.log("打印总金额");
                // console.log(this.goodPriceCountForCom);
                // console.log("打印必满金额");
                // console.log(coupon.originCondition);
                // console.log("打印是否大于必满金额");
                // console.log(this.goodPriceCountForCom>=coupon.originCondition);
                // console.log("打印是否小于必满金额");
                // console.log(this.goodPriceCountForCom<coupon.originCondition);
                /*
                * coupon:单个优惠券对象
                * */
                //创建时间对象
                let nowTime=(new Date().getTime())/1000;
                // let nowTime=(new Date()).getSeconds();
                console.log("打印当前时间");
                console.log(nowTime);
                console.log("打印优惠券开始时间");
                console.log(coupon.startAt);
                console.log("打印优惠券结束时间");
                console.log(coupon.endAt);
                //先判断是否启用(不启用直接让不进任何列表)
                if(coupon.isEnabled===false){
                    coupon.reason="商家为启用";
                    return 0;
                }
                //先判断时间，如果时间尚未开始，直接return false
                if(nowTime>=coupon.startAt&&nowTime<coupon.endAt){
                    //如果现在时间大于等于开始时间并且小于等于结束时间,进行中，继续下一步判断
                    // return true;
                }
                else if(nowTime<coupon.startAt){
                    //如果小于开始时间，那就是尚未开始,push到不可用
                    coupon.reason="尚未开始";
                    return false;
                }
                else if(nowTime>coupon.endAt){
                    //如果大于开始时间，那就是已经结束,push到不可用
                    coupon.reason="已过期";
                    return false;
                }
                else if(this.goodPriceCountForCom<coupon.originCondition){
                    //未满金额，push到不可用
                    coupon.reason="未满金额";
                    return false;
                }
                if(this.goodPriceCountForCom>=coupon.originCondition){
                    console.log(this.goodPriceCountForCom);
                    console.log("大于等于");
                    console.log(coupon.originCondition);
                    //满金额，push到可用
                    return true;
                }

            },
            //初始化数据
            getFirstData() {
                //初始化订单
                this.tools.globalFn.publicAxiosFn(this,{
                    needLogin:true,
                    url:"/checkout/onepage/index",
                    success:(res)=>{
                        console.log("打印初始化订单");
                        console.log(res);
                        // alert(JSON.stringify(res));
                        if(res.data.code===200){
                            // alert(JSON.stringify(res.data.data));
                            //放置默认地址
                            this.shipAddress=res.data.data.address_list.find((currentValue,index,arr)=>{
                                return currentValue.is_default==1;
                            });
                            //放置所有地址
                            this.userAddressData.list=res.data.data.address_list.map((currentValue,index,arr)=>{
                                return {
                                    id: currentValue.address_id,
                                    name: currentValue.first_name,
                                    tel: currentValue.telephone,
                                    address_id: currentValue.address_id,
                                    first_name: currentValue.first_name,
                                    telephone: currentValue.telephone,
                                    country: currentValue.country,
                                    state: currentValue.state,
                                    city: currentValue.city,
                                    district: currentValue.district,
                                    street1: currentValue.street1,
                                    street2: currentValue.street2,
                                    zip: currentValue.zip,
                                    address: currentValue.address,
                                    isDefault: currentValue.is_default,
                                    last_checked:currentValue.last_checked
                                }
                            });
                            //放置选中地址
                            this.userAddressData.current=res.data.data.address_list.find((currentValue,index,arr)=>{
                                return currentValue.is_default==1;
                            }).address_id;
                            //放置配送方式
                            this.shipTypeData.list=res.data.data.shippings;
                            //放置店铺和商品
                            for(let shop of res.data.data.cart_info.shop_packs){
                                this.confirmData.list.push({
                                    //店铺id
                                    shopId:shop.ushop_id,
                                    //店铺名称
                                    shopName:shop.shop_name,
                                    //商铺下的商品列表
                                    goods:shop.products.map((currentValue)=>{
                                        currentValue.product_price*=100;
                                        return currentValue;
                                    }),
                                    //该商铺下所有商品总计价格(尚未使用优惠券)
                                    priceTotal:shop.product_total*100,
                                    //店铺优惠券-可用的
                                    userCanUseCoupons:shop.coupon_list===null?[]:shop.coupon_list.map((currentValue)=>{
                                        //减去价格乘以100
                                        currentValue.discount=parseFloat(currentValue.discount)*100;
                                        //需满价格乘以100
                                        currentValue.conditions=parseFloat(currentValue.conditions)*100;
                                        return {
                                            //优惠券id
                                            id:currentValue.coupon_id,
                                            //优惠券名称
                                            name:currentValue.coupon_name,
                                            //折扣(0为满减券 88等于8.8折)
                                            discount:currentValue.type==1?parseFloat(currentValue.discount):0,
                                            //满减面值(0为折扣券，单位为分)
                                            denominations:currentValue.type==2?parseFloat(currentValue.discount):0,
                                            //满减条件
                                            originCondition:currentValue.type==2?parseFloat(currentValue.conditions):0,
                                            //开始时间
                                            startAt:parseInt(currentValue.start_time),
                                            //失效时间
                                            endAt:parseInt(currentValue.expiration_date),
                                            //不可用原因(目前同一暂不可用)
                                            reason:"暂不可用",
                                            //	折扣券优惠金额，单位分(最大可以打折的金额,目前暂时用不到)
                                            value:currentValue.type==1?parseFloat(currentValue.discount):0
                                        };
                                        // return currentValue;
                                    }),
                                    //店铺优惠券-不可用的(请求到的都是可用的，所以直接置空不可用)
                                    userCantUseCoupons:[],
                                    //店铺的配送方式
                                    shippingMethod:shop.shipping_method,
                                    //店铺备注
                                    remark:"",
                                    //店铺运费
                                    shippingCost:0,
                                    //当前选中的优惠券
                                    couponSelected:{
                                        //默认放上
                                        id:-1,
                                        info:""
                                    }
                                });
                            }
                            //放置购物车所有总价(不包括使用的优惠券)
                            this.confirmData.orderTotalCount=res.data.data.cart_info.product_total*100;
                            //放置总价到提交订单栏显示(不包括使用的优惠券)
                            this.orderOptions.total=res.data.data.cart_info.product_total*100;
                            //渲染页面
                            this.allIsLoadingDone=true;
                            console.log("打印循环出来的数据");
                            console.log(this.confirmData);
                        }
                    }
                })
                //拿到传递过来的数据
                //循环添加一些必要的节点(比如选择了那种配送方式，选择了那些优惠券)
                // var list = [
                //     {
                //         shopInfo: {
                //             shopId: 1,
                //             shopName: "哦牛批店铺"
                //         },
                //         total: 2015114,
                //         shipInfo: {
                //             list: [
                //                 {
                //                     id: 22,
                //                     name: "快递",
                //                     price: 2200
                //                 },
                //                 {
                //                     id: 33,
                //                     name: "EMS",
                //                     price: 1000
                //                 }
                //             ],
                //             //是否包邮
                //             isFree: false,
                //
                //         },
                //         goodsList: [
                //             {
                //                 id: 1,
                //                 title: "哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品",
                //                 price: 10520,
                //                 imgUrl: require("../../assets/images/shoppingMall/cart/goodImg.png"),
                //                 ggName: "规格:哦牛批规格",
                //                 zkInfo: {
                //                     //是否启用
                //                     zk: false,
                //                     //折扣具体数量(为1或为null为没有)
                //                     zkPro: 0.2,
                //                     //活动id
                //                     id: 22,
                //                     //满减活动-满减需要满足的金额(不需要就等于0)
                //                     needEnough: 1000,
                //                     //满减活动-达到条件后满足的金额
                //                     cutPrice: 100
                //                 },
                //                 num: 2
                //             },
                //             {
                //                 id: 33,
                //                 title: "哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品",
                //                 price: 10520,
                //                 imgUrl: require("../../assets/images/shoppingMall/cart/goodImg.png"),
                //                 ggName: "规格:哦牛批规格",
                //                 zkInfo: {
                //                     //是否启用
                //                     zk: true,
                //                     //折扣具体数量(为1或为null为没有)
                //                     zkPro: 0.2,
                //                     //活动id
                //                     id: 22,
                //                     //满减活动-满减需要满足的金额(不需要就等于0)
                //                     needEnough: 1000,
                //                     //满减活动-达到条件后满足的金额
                //                     cutPrice: 100
                //                 },
                //                 num: 2
                //             }
                //         ]
                //     },
                // ];
                // for (let key in list) {
                //     //创建必要的节点（如选择了哪张优惠券，选择了哪种配送方式）
                //     //选中哪个方式
                //     list[key].shipInfo.selected = "";
                //     //显示给客户看的配送信息
                //     list[key].shipInfo.showUserVal = "请选择配送方式";
                //     //选中的优惠
                //     //买家留言
                //     list[key].remark = "";
                // }
                // this.confirmData.list = list;
                //拿到收货地址
                // this.tools.globalFn.publicAxiosFn(this,
                //     {
                //         url: "/customer/address/index",
                //         method: "GET",
                //         success: (res) => {
                //             // alert("请求成功");
                //             // console.log("请求成功");
                //             if (res.data.code === 200 && res.data.data.addressList.length > 0) {
                //                 //放置默认收货地址
                //                 for (let val of res.data.data.addressList) {
                //                     if (val.last_checked === "1") {
                //                         //如果有选中的话，直接放选中的,直接结束循环
                //                         this.shipAddress = val;
                //                         break;
                //                     }
                //                     if (val.last_checked === "0" && val.is_default === "1") {
                //                         //如果没有选中，切当前地址为默认，那就选中
                //                         this.shipAddress = val;
                //                         // return;
                //                     }
                //                     else if (val.last_checked === "0" && val.is_default === "0") {
                //                         //如果没有默认地址，默认放第一个
                //                         this.shipAddress = res.data.data.addressList[0];
                //                     }
                //                 }
                //                 //放置商品
                //                 // console.log(sessionStorage.selectedGoodList);
                //                 // var goodList=JSON.parse(sessionStorage.selectedGoodList);
                //                 // console.log(goodList);
                //                 //循环拿到
                //                 // for(let good of goodList){
                //                 //     //创建必要的节点（如选择了哪张优惠券，选择了哪种配送方式）
                //                 //     //选中哪个方式
                //                 //     good.shipInfo={};
                //                 //     good.shipInfo.selected = "";
                //                 //     //显示给客户看的配送信息
                //                 //     good.shipInfo.showUserVal = "请选择配送方式";
                //                 //     //选中的优惠
                //                 //     //买家留言
                //                 //     good.remark = "";
                //                 //     this.confirmData.list.push(good);
                //                 // }
                //                 this.confirmData.list[0].goodsList = JSON.parse(sessionStorage.selectedGoodList);
                //                 //循环拿id，给后端生成初始化订单
                //                 var idArr = [];
                //                 for (let good of JSON.parse(sessionStorage.selectedGoodList)) {
                //                     idArr.push(good.item_id);
                //                 }
                //                 //开始初始化订单请求
                //                 this.tools.globalFn.publicAxiosFn(this,
                //                     {
                //                         url: "/checkout/onepage/index",
                //                         method: "POST",
                //                         data: {
                //                             item_list: idArr.join(",")
                //                         },
                //                         success: (res) => {
                //                             console.log(res);
                //                             //本地存储后端的初始化订单
                //                             this.orderDataFromService = res.data.data;
                //                             //放置总价
                //                             this.orderOptions.total = res.data.data.cart_info.product_total * 100;
                //                             //再次请求优惠券
                //                             this.getFirstPlatformCouponFn();
                //                             //显示提交订单
                //                             this.allIsLoadingDone = true;
                //                             //删除存储的变量
                //                             // goodList=null;
                //                         },
                //                         fail: (err) => {
                //
                //                         }
                //                     }
                //                 );
                //             }
                //             else {
                //                 //如果没有地址列表，那就跳转添加地址列表
                //                 //先提示用户，然后跳转
                //                 this.$dialog.confirm({
                //                     message: '没有填写地址，移步到添加地址'
                //                 }).then(() => {
                //                     // on confirm
                //                     this.$router.push({name: "chooseAddress"});
                //                 }).catch(() => {
                //                     //on close
                //                     this.$router.go(-1);
                //                 });
                //
                //             }
                //
                //         },
                //         fail: (err) => {
                //             console.log(err);
                //             // alert(err);
                //             // alert("请求失败");
                //         }
                //     }
                // );
            }
        },
        created() {
            this.getFirstData();
        },
        mounted() {

        },
        watch: {},
        // beforeRouteLeave(to, from, next) {
        //     //通知服务端把选中状态清除
        //     this.tools.globalFn.publicAxiosFn(this,{
        //         url:"/checkout/cart/selectall",
        //         needLogin:true,
        //         params:{
        //             checked:0
        //         },
        //         success:(res)=>{
        //             if(res.data.code===200){
        //                 //返回上一页
        //                 // this.$router.go(-1);
        //                 next();
        //             }
        //         }
        //     });
        // }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*小计样式*/
    .orderShopTotalBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .orderShopTotalBox > div {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-top: 1px solid #f3f3f3;
        padding: 10px;
    }

    .orderShopTotalBox p.numTotal {
        color: #666666;
        font-size: 14px;
        float: right;
    }

    .orderShopTotalBox p.numTotal span {
        color: #333;
        font-weight: bold;
        margin: 0 2px;
    }

    .orderShopTotalBox p.priceTotal {
        color: #666666;
        font-size: 14px;
        float: right;
        margin-left: 10px;
    }

    .orderShopTotalBox p.priceTotal span {
        color: #f44;
    }

    .orderShopListBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    .orderShopListBox > li {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
    }

    /*订单样式*/
    .orderListStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 4px;
    }

    .orderListStyle > div.header {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 8px 10px;
    }

    .orderListStyle > div.header > div.left {
        float: left;
        color: #333;
        font-size: 14px;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .orderListStyle > div.header > div.left .van-icon {
        font-size: 12px;
    }

    .orderListStyle > div.header > div.right {
        float: right;
        color: #30aaff;
        font-size: 14px;
    }

    .orderListStyle > ul.list {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .orderListStyle > ul.list > li {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-top: 1px solid #f3f3f3;
    }

    .orderListStyle > ul.list > li:first-child {
        border-top: none;
    }

    /*商品样式*/
    .orderListGoodsStyle {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fafafa;
        padding: 10px;
    }

    .orderListGoodsStyle div.img {
        width: 20%;
        padding-top: 20%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        float: left;
    }

    .orderListGoodsStyle div.img img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .orderListGoodsStyle div.info {
        width: 78%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        float: right;
    }

    .orderListGoodsStyle div.info > div.top {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }

    .orderListGoodsStyle div.info > div.top > p.title {
        width: 70%;
        float: left;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        white-space: normal;
        -webkit-box-orient: vertical;
        word-break: break-all;
        display: -webkit-box;
        font-size: 14px;
        color: #333;
    }

    .orderListGoodsStyle div.info > div.top > p.realPrice {
        width: 28%;
        color: #333;
        float: left;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        font-size: 14px;
        text-align: right;
        font-weight: bold;
    }

    .orderListGoodsStyle div.info > div.top > p.realPrice span {
        color: #999;
        text-decoration: line-through;
        font-size: 12px;
    }

    .orderListGoodsStyle div.info > div.bottom {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }

    .orderListGoodsStyle div.info > div.bottom > p.gg {
        float: left;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 14px;
        color: #999;
    }

    .orderListGoodsStyle div.info > div.bottom > p.num {
        float: right;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 14px;
        color: #999;
    }

    /*公共的版块盒子*/
    .publicOrderBg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 50px;
    }

    /*收货地址*/
    .addressBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*padding: 10px;*/
        display: flex;
        background-color: #fff;
        border-radius: 4px;
    }

    .addressBox > div.icon {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 6%;
    }

    .addressBox > div.icon .van-icon {
        color: #666666;
    }

    .addressBox > div.info {
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        padding: 4px 15px 10px 15px;
    }

    .addressBox > div.info > div.contact {
        display: flex;
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .addressBox > div.info > div.contact p.user {
        color: #666;
        font-size: 14px;

    }

    .addressBox > div.info > div.contact p.phone {
        color: #666;
        font-size: 14px;
    }

    .addressBox > div.info > p.address {
        color: #666;
        font-size: 14px;
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        justify-content: space-between;
        word-break: break-all;
    }
</style>
