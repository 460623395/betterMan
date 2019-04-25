<template>
    <div class="publicAllContentBg" id="shopCart">
        <!--头部导航-->
        <van-nav-bar title="购物车"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     @click-right="changeCartAdminStatus"
                     class="globalNavBarHeaderClass"
                     fixed
        >
            <!--<van-icon name="arrow-left" slot="left" style="color: #fafafa" @click="backLastPage"></van-icon>-->
            <span slot="right" v-if="nowCartStatus===1&&localShopCartData.data.length>0">管理</span>
            <span slot="right" v-if="nowCartStatus===0">完成</span>
        </van-nav-bar>
        <!--商品列表块-->
        <div class="cartListBg">
            <van-loading type="spinner" color="black" v-if="cartDataIsDoneStatus===false"
                         class="globalLoadingAnmClass"></van-loading>
            <p class="cartNoContent" v-if="cartDataIsDoneStatus&&localShopCartData.data.length===0">暂无商品，快去添加吧</p>
            <!--商铺列表-->
            <ul class="cartListByShopBox" v-if="cartDataIsDoneStatus&&localShopCartData.data.length>0">
                <!--<li class="noContent" v-if=" localShopCartData.data.length===0"></li>-->
                <li v-for="shop in localShopCartData.data" :key="shop.ushop_id">
                    <!--<li v-if=" localShopCartData.data.length>0">-->
                    <!--店铺名以及全选该店铺商品按钮(右侧点击进入该店铺)-->
                    <div class="cartListByShopStyle">
                        <!---头部店铺按钮-->
                        <div class="header">
                            <div @click="chooseOneShopAllGoods(shop)">
                                <!--<i class="checkBoxSeq" :ref="shop.shopId" @click="chooseOneShopAllGoods($event,shop.shopId)"></i>-->
                            <van-checkbox v-model="shop.shopCheck"
                                          style="float: left">{{shop.shop_name}}
                            </van-checkbox>
                            </div>
                            <!--<p>{{shop.shopName}}</p>-->
                            <van-icon name="arrow" @click="goToShopPageFn(shop)" style="float: right;color: #cecece;"/>
                        </div>
                        <!--商品列表-->
                        <ul class="list">
                            <li v-for="item in shop.products">
                                <div class="listGoodsStyle">
                                    <!--顶部信息-->
                                    <div class="top">
                                        <!--左侧选择标签-->
                                        <div class="left">
                                            <!--<i class="checkBoxSeq" :ref="shop.shopId"-->
                                            <!--@click="chooseSingleGoodFn($event,shop.shopId,item.goodsId)"></i>-->
                                            <!--<van-checkbox v-model="item.goodCheck"-->
                                            <!--@change="chooseSingleGoodFn(shop.shopId,item.skuDTO.id,$event)"></van-checkbox>-->
                                            <van-checkbox v-model="item.active"
                                                          @change="chooseSingleGoodFn(item,shop,$event)"></van-checkbox>
                                        </div>
                                        <!--商品图片-->
                                        <div class="img">
                                            <img :src="item.img_url" alt=""
                                                 @click="goToGoodContentPageFn(item.product_id)">
                                        </div>
                                        <!--商品名，规格等-->
                                        <div class="right">
                                            <h3 @click="goToGoodContentPageFn(item.product_id)">{{item.name}}</h3>
                                            <h4 @click="goToGoodContentPageFn(item.goodsId)" v-text="returnGoodSkuName(item)">哦牛批</h4>
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
            <!--失效商品列表-->
            <div class="cannotBuyGoodListBg" v-if="cannotBuyGoodData.list.length>0&&cartDataIsDoneStatus===true">
                <!--顶部header-->
                <div class="header">
                    <p class="left">失效商品{{cannotBuyGoodData.list.length}}件</p>
                    <p class="right" @click="clearCannotBuyGoods">清空失效宝贝</p>
                </div>
                <!--失效商品列表-->
                <ul class="list">
                    <li v-for="(item,index) in cannotBuyGoodData.list" :key="index">
                        <div class="listGoodsStyle">
                            <!--顶部信息-->
                            <div class="top">
                                <!--左侧选择标签-->
                                <div class="left">
                                    <!--<i class="checkBoxSeq" :ref="shop.shopId"-->
                                    <!--@click="chooseSingleGoodFn($event,shop.shopId,item.goodsId)"></i>-->
                                    <!--<van-checkbox v-model="item.goodCheck"-->
                                    <!--@change="chooseSingleGoodFn(shop.shopId,item.skuDTO.id,$event)"></van-checkbox>-->
                                    <van-tag>失效</van-tag>
                                </div>
                                <!--商品图片-->
                                <div class="img">
                                   <!-- <img :src="item.img_url" alt=""
                                         @click="goToGoodContentPageFn(item.product_id)">-->
                                    <img :src="item.img_url" alt=""/>
                                </div>
                                <!--商品名，规格等-->
                                <div class="right">
                                    <!--<h3 @click="goToGoodContentPageFn(item.product_id)">{{item.name}}</h3>
                                    <h4 @click="goToGoodContentPageFn(item.goodsId)" v-text="returnGoodSkuName(item)">哦牛批</h4>-->
                                    <h3>{{item.name}}</h3>
                                    <h4 v-text="returnGoodSkuName(item)"></h4>
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
        </div>
        <!--去结算底部栏-->
        <van-submit-bar
                v-if="nowCartStatus===1"
                :price="shopCartTotal"
                button-text="去结算"
                @submit="goToOrderPage"
        >
            <!--<van-checkbox v-model="shopCartAllChecked" @change="allSelectedChangeFn" v-if="this.localShopCartData.data.length>0">全选</van-checkbox>-->
            <p @click="allSelectedChangeFn" v-if="localShopCartData.data.length>0">
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
            <p @click="allSelectedChangeFn" v-if="localShopCartData.data.length>0">
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
                //失效商品数组
                cannotBuyGoodData:{
                    list:[]
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
                    //显示数据
                    data: [
                        // {
                        //     shopId: 1,
                        //     shopName: "变福侠商城",
                        //     goods: [
                        //         // {
                        //         //     id:1,
                        //         //     goodsName:"哦牛批商品",
                        //         //     price:102360,
                        //         //     checked:false,
                        //         //     imgUrl:require("../../assets/images/shoppingMall/cart/goodImg.png"),
                        //         //     ggName:"哦牛批规格",
                        //         //     skuDTO:{
                        //         //         id:1,
                        //         //         title:"60g"
                        //         //     },
                        //         //     num:2
                        //         // }
                        //     ],
                        //     shopCheck: false
                        // }
                    ],
                    //所有加入购物车的商品长度
                    length:0
                }
            }
        },
        computed:{
            //实时返回所有选中数组id的方法
            returnAllSelectedGoodIdsFn(){
                let idArr=[];
                if(this.cartSelectedData.list.length>0){
                    for(let shop of this.cartSelectedData.list){
                        for(let good of shop.goods){
                            idArr.push(good.item_id);
                        }
                    }
                }
                return idArr;
            },
            //检测购物车选中商品长度的方法
            returnShopCartLength(){
                let count=0;
                for(let shop of this.cartSelectedData.list){
                    count+=shop.goods.length;
                }
                return count;
            }
        },
        methods: {
            //返回失效宝贝的id数组
            returnCannotBuyIdArr(){
                let idArr=[];
                if(this.cannotBuyGoodData.list.length>0){
                    for(let good of this.cannotBuyGoodData.list){
                        idArr.push(good.item_id);
                    }
                }
                return idArr;
            },
            //清空失效宝贝
            clearCannotBuyGoods(){
                //询问是否确认清空
                this.$dialog.confirm({
                    title: '清空确认',
                    message: '是否确认清空'
                }).then(() => {
                    console.log("确认");
                    //确认，走接口
                    this.tools.globalFn.publicAxiosFn(this,{
                        url:"/checkout/cart/remove",
                        needLogin:true,
                        method:"POST",
                        data:{
                            item_ids:this.returnCannotBuyIdArr().join(',')
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //清空所有
                                this.cannotBuyGoodData.list=[];
                                //提示删除成功
                                this.tools.globalFn.publicToastFn(this,"删除成功");
                            }
                            else{
                                //提示网络错误
                                this.tools.globalFn.publicToastFn(this,"网络错误");
                            }
                        }
                    });
                }).catch(() => {
                    // on cancel
                });
            },
            //计算所有加入购物车件数总长度的方法
            returnAllCartGoodsLengthFn(arr){
                let count=0;
                for(let shop of arr){
                    count+=shop.products.length;
                }
                return count;
            },
            //返回商品规格名称的方法
            returnGoodSkuName(item){
                // console.log("返回商品规格名称的方法");
                // console.log(item);
                let strArr=[];
                for(let key in item.custom_option_info){
                    strArr.push(item.custom_option_info[key]);
                }
                return strArr.join(" ");
            },
            //移除指定商品提交的方法
            cartAdminDelGoods() {
                if (this.returnAllSelectedGoodIdsFn.length === 0) {
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
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin:true,
                        url: "/checkout/cart/remove",
                        method: "POST",
                        data: {
                            item_ids: this.returnAllSelectedGoodIdsFn.join(",")
                        },
                        success: (res) => {
                            console.log(res);
                            if (res.data.code === 200) {
                                this.tools.globalFn.publicToastFn(this, "移除成功");
                                //改变购物车状态
                                this.nowCartStatus = 1;
                                //清除选中商品
                                this.eachChangeGoodSelectFn(false);
                                //重置当前总计
                                this.shopCartTotal = 0;
                                //重新请求
                                this.getFirstData();
                            }
                            else {
                                this.tools.globalFn.publicToastFn(this, "网络错误！");
                            }
                        }
                    }
                );
            },
            //返回单个商品价格的方法
            returnGoodPrice(item) {
                console.log(item);
                return "￥" + (item.product_price/100).toFixed(2);
            },
            //返回单个数据
            getSingelGoodsTotal(item) {
                return "￥" + ((item.product_price * 100) * item.qty / 100).toFixed(2);
            },
            //循环改变视图中商品选中状态的方法
            eachChangeGoodSelectFn(val) {
                //如果值是false，直接清空就完事了
                if(val===false){
                    //改变视图中的数据
                    for(let shop of this.localShopCartData.data){
                        for(let good of shop.products){
                            good.active=false;
                        }
                    }
                    //然后清空存储的数据
                    for(let shop of this.cartSelectedData.list){
                        shop.goods=[];
                    }
                    // this.$set(this.cartSelectedData.list,[]);
                    // this.cartSelectedData.list=[];
                    return;
                }
                else if(val===true){
                    //先清空存储的数据
                    // for(let shop of this.cartSelectedData.list){
                    //     shop.goods=[];
                    // }
                    //全部改成true
                    for(let shop of this.localShopCartData.data){
                        for(let good of shop.products){
                            good.active=true;
                        }
                    }
                }
                //如果值是true循环店铺
                //也先清空选中数组
                // this.$set(this.cartSelectedData.list,[]);
                // for (let key in this.localShopCartData.data) {
                //     console.log(this.localShopCartData.data[key]);
                //     //循环商品
                //     for(let good of this.localShopCartData.data[key].goods){
                //         good.goodCheck=val;
                //     }
                // }
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
                    this.eachChangeGoodSelectFn(false);
                }
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
                //如果购物车没有商品直接返回0元
                if (this.returnShopCartLength === 0) {
                    return totalCount;
                }
                //循环计算总价
                for (let shop of this.cartSelectedData.list) {
                    for(let good of shop.goods){
                        console.log("打印商品");
                        console.log(good);
                        totalCount += good.qty * good.product_price;
                    }
                }
                console.log("打印价格总计");
                console.log(totalCount);
                return totalCount;
            },

            //统一的触发修改数量的方法
            publicChangeGoodCountFn(item, num, oldNum) {
                console.log("打印元素");
                console.log(item);
                console.log("改变后的树立");
                console.log(num);
                console.log("打印元素");
                console.log(oldNum);
                //开启全屏loading动画
                this.$toast.loading({
                    message: "加载中",
                    duration: 0,
                    mask: true
                });
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin:true,
                        url: "/checkout/cart/updateinfo",
                        method: "POST",
                        data: {
                            //固定的type
                            up_type: "update_qty",
                            //商品id
                            item_id: item.item_id,
                            //更新的数量
                            update_qty: num
                        },
                        success: (res) => {
                            console.log(res);
                            if (res.data.code === 200) {
                                //直接更改本地数据
                                item.qty=num;
                                // this.tools.globalFn.publicToastFn(this,"修改成功！");
                                //重新查询
                                // this.getFirstData();
                                //重新计算价格
                                this.shopCartTotal = this.publicShopCartTotalCountFn();
                                //关闭加载动画
                                this.$toast.clear();
                            }
                            else {
                                this.tools.globalFn.publicToastFn(this, res.data.message);
                            }
                            // this.publicSearchCartFn();
                        }
                    }
                );
            },
            //用户输入某一商品数量的方法
            blurGoodNum(item) {
                console.log("触发了输入修改数量方法");
                console.log(item);
                this.publicChangeGoodCountFn(item, item.qty);
            },
            //添加购物车数量的方法(因为返回的是修改前的，所以需要+1)
            addGoodNum(item) {
                console.log("触发了添加方法");
                this.publicChangeGoodCountFn(item, item.qty + 1, item.qty);
            },
            //减少购物车数量的方法(因为返回的是修改前的，所以需要-1)
            delGoodNum(item) {
                console.log("触发了减少方法");
                console.log(item.qty);
                this.publicChangeGoodCountFn(item, item.qty - 1, item.qty);
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
                console.log("打印最大可购买数");
                console.log(item);
                // return item.qty;
                return 10;
            },
            //获取最小可购买数的方法
            getGoodCanBuyLessNumFn(item) {
                return 1;
            },
            //是否显示折扣活动的返回方法
            zkDomIsShowStatus(item){
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
                let url = img.split(',')[0];
                return url;
            },
            //跳转单个商品详情的方法
            goToGoodContentPageFn(id) {
                console.log(id);
                this.tools.globalFn.publicLinkToGoodContentFn(id,this);
            },
            // //选择单个商品的方法(给有sku的使用)
            // chooseSingleGoodFn(shopId, skuId, e) {
            //     console.log(shopId);
            //     console.log(skuId);
            //     console.log(e);
            // },
            //公共的放置或删除某个商品到购物车项的方法
            publicPutOrDelGoodToShopCartFn(good,type){
                console.log("打印被进入购物车的方法");
                console.log(good);
                //good:被选中的商品
                //type:add增加，del删除
                for(let shop of this.cartSelectedData.list){
                    if(good.ushop_id===shop.shopId){
                        if(type==="add"){
                            shop.goods.push(good);
                        }
                        else if(type==="del"){
                            shop.goods.splice(shop.goods.indexOf(good),1);
                        }
                        console.log("打印操作后的购物车选中项");
                        console.log(shop);
                        return;
                    }
                }
            },
            //选择单个商品的方法
            chooseSingleGoodFn(good,shop, e) {
                console.log("触发选择单个商品的方法");
                console.log("打印商品");
                console.log(good);
                console.log(good.active);
                console.log("打印商品所属店铺");
                console.log(shop);
                console.log("打印$event");
                console.log(e);
                if (e === true) {
                    //改变当前商品的存储状态
                    good.active=true;
                    //push这个商品到已选中数组
                    this.publicPutOrDelGoodToShopCartFn(good,"add");
                }
                else if (e === false) {
                    //删除这个商品
                    console.log("删除商品");
                    this.publicPutOrDelGoodToShopCartFn(good,"del");
                }
                // //检测该店铺下的商品是否已经全部选中
                if(this.eachOneShopIsAllChecked(shop)===true){
                    shop.shopCheck=true;
                }
                else if(this.eachOneShopIsAllChecked(shop)!==true){
                    //返回不等于true，需要
                    shop.shopCheck=false;
                }
                console.log("打印当前选中数组");
                console.log(this.cartSelectedData.list);
                this.shopCartTotal = this.publicShopCartTotalCountFn();
                //关闭动画
                this.$toast.clear();
            },
            //检测该店铺下是否全部选中
            eachOneShopIsAllChecked(shop){
                /*
                * shop:单个店铺
                * 全选返回true，未全选返回数量
                * */
                let selectNum=0;
                for(let good of shop.products){
                    if(good.active===false){
                        return false;
                    }
                    else if(good.active===true){
                        selectNum+=1;
                    }
                }
                if(selectNum===shop.products.length){
                    return true;
                }
                else if(selectNum<shop.products.length){
                    return selectNum;
                }
                // return true;
            },
            //跳转到商家中心页面的方法
            goToShopPageFn(shop) {
                console.log(shop);
                this.tools.globalFn.publicLinkToShopCenterFn(shop.ushop_id, this);
            },
            //全选单一店铺商品的方法
            chooseOneShopAllGoods(shopInfo) {
                /*
                * shop:传递过来的单一店铺(视图上的)
                * */
                console.log(shopInfo);
                //操作shop，进行shopCheck操作
                if(shopInfo.shopCheck===true){
                    console.log("清空店铺");
                    //首先清空当前店铺中选中的商品，防止出错
                    // for(let shop of this.cartSelectedData.list){
                    //     if(shop.shopId===shopInfo.ushop_id){
                    //         shop.goods=[];
                    //         console.log("清空完成");
                    //     }
                    // }
                    // for (let good of shopInfo.products) {
                    //     good.active=false;
                    // }
                    for (let good of shopInfo.products) {
                        good.active=true;
                    }
                    console.log("打印购物车选中项");
                    console.log(this.cartSelectedData.list);
                }
                else if(shopInfo.shopCheck===false){
                    console.log("打印目前数组id");
                    // console.log(this.returnAllSelectedGoodIdsFn);
                    //如果是false
                    for (let shop of this.cartSelectedData.list) {
                        if (shop.shopId === shopInfo.ushop_id) {
                            //清空选中购物车项
                            shop.goods=[];
                            // this.localShopCartData.data[key].shopCheck = true;
                        }
                    }
                    for(let good of shopInfo.products){
                        good.active=false;
                    }
                }
            },
            //提交购买的商品id
            submitItemIdFn(){
                //进入全屏加载动画
                this.tools.globalFn.publicFullScreenLoadingFn(this);
                //开始走接口
                this.tools.globalFn.publicAxiosFn(this,{
                    needLogin:true,
                    url:"/checkout/cart/selectmulti",
                    data:{
                        item_ids:this.returnAllSelectedGoodIdsFn.join(','),
                        checked:1
                    },
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //关闭动画加载
                            this.$toast.clear();
                            //跳转确认订单
                            this.$router.push({name:"confirmOrder"});
                        }
                    }
                });
            },
            //去结算
            goToOrderPage() {
                // alert(localStorage.shopToken);
                // console.log("去结算");
                //如果没有选中的商品，提示
                if (this.returnShopCartLength === 0) {
                    this.tools.globalFn.publicToastFn(this, "请先选中商品");
                    return false;
                }
                //如果有，先查询一下用户是否有收货地址，如果没有，提示去添加收货地址
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/customer/address/index",
                    method:"GET",
                    needLogin:true,
                    success:(res)=>{
                        if(res.data.data.addressList.length>0){
                            //有地址，提交
                            this.submitItemIdFn();
                        }
                        else{
                            //如果没有地址，提示，并且return
                            this.tools.globalFn.publicToastFn(this,"请先添加收货地址");
                            //跳转收货地址列表
                            this.$router.push({name:"chooseAddress"});
                            return false;
                        }
                    }
                })
                // console.log("打印选中的购物车id");
                // console.log(this.returnAllSelectedGoodIdsFn);

                // this.$router.push({name: "confirmOrder"});
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
                //清除所有选中
                // this.tools.globalFn.publicAxiosFn(this,{
                //     needLogin:true,
                //     url:"/checkout/cart/selectall",
                //     method:"GET",
                //     params:{
                //         checked:0
                //     },
                //     success:(res)=>{
                //         // if(res.data.code===200){
                //         //
                //         // }
                //     }
                // });
                this.$router.go(-1);
            },
            //初始化数据
            getFirstData() {
                //清空数组
                this.localShopCartData.data=[];
                // this.localShopCartData.data[0].goods=[];
                // this.localShopCartData.data[0].shopCheck=false;
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin:true,
                        url: "/checkout/cart/index",
                        method: "GET",
                        success: (res) => {
                            console.log(res);
                            if (res.data.code === 200 &&res.data.data.cart_info!=null) {
                                //push商品到数组
                                for (let shop of res.data.data.cart_info.shop_packs) {
                                    //先循环把当前店铺的商品价格全部改为分
                                    for(let good of shop.products){
                                        good.product_price*=100;
                                    }
                                    //当前循环对应到某一商家
                                    //添加当前店铺是否全选节点
                                    shop.shopCheck=false;
                                    //push进本地存储
                                    this.localShopCartData.data.push(shop);
                                    //在购物车备选项中创建shop节点(有几个创建几个)
                                    let shopObj={
                                        //店铺id
                                        shopId:shop.ushop_id,
                                        //店铺名称
                                        shopName:shop.shop_name,
                                        //商品存储
                                        goods:[]
                                    };
                                    //循环添加商品到备用
                                    for(let good of shop.products){
                                        if(good.active===true){
                                            //如果记录已经选中，那么push到购物车选中项对应的店铺中
                                            shopObj.goods.push(good);
                                        }
                                    }
                                    //循环完成以后，检查被push的商品数量是否等于该商铺下所有商品长度
                                    if(shop.products.length===shopObj.goods.length){
                                        //如果等于，那么店铺全选
                                        shop.shopCheck=true;
                                    }
                                    this.cartSelectedData.list.push(shopObj);
                                    //释放
                                    shopObj=null;
                                    // this.cartSelectedData.list.push({
                                    //     //店铺id
                                    //     shopId:shop.ushop_id,
                                    //     //店铺名称
                                    //     shopName:shop.shop_name,
                                    //     //商品存储
                                    //     goods:[]
                                    // });
                                    //循环商铺里的商品，如果有，推到购物车选中列表
                                }
                                //记录总goods长度
                                this.localShopCartData.length=this.returnAllCartGoodsLengthFn(res.data.data.cart_info.shop_packs);
                                //比对总长度和加入购物车的长度，如果相等，那么全选按钮选中
                                console.log("打印当前购物车选中长度");
                                console.log(this.returnShopCartLength);
                                console.log("打印当前渲染购物车总长度");
                                console.log(this.localShopCartData.length);
                                if(this.returnShopCartLength===this.localShopCartData.length){
                                    this.shopCartAllChecked = true;
                                }
                                //放置总价
                                this.cartAdminOptions.total=this.publicShopCartTotalCountFn();
                                this.shopCartTotal=this.publicShopCartTotalCountFn();
                                //放置不可用商品
                                this.cannotBuyGoodData.list=res.data.data.cart_info.invalid;
                                // console.log("记录总goods长度");
                                // console.log(this.localShopCartData.length);
                                // alert(this.localShopCartData.data[0].goods.length);
                                // this.localShopCartData.data=res.data.data.cart_info.products;
                                //赋值总价(字符串，需要转换为num类型)
                                // this.shopCartTotal=parseInt(res.data.data.cart_info.product_total)*100;
                            }
                            // //关闭加载动画
                            this.cartDataIsDoneStatus = true;
                            console.log("打印购物车选中项");
                            console.log(this.cartSelectedData.list);
                            // //关闭加载动画(全屏加载)
                            // this.$toast.clear();
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
        beforeRouteLeave(to,from,next){
            console.log("打印to");
            console.log(to);
            // console.log(from);
            //如果是确认订单，不需要清除，直接走下一步
            if(to.name==="confirmOrder"){
                next();
                return;
            }
            //如果目标不是确认订单，清除所有选中
            this.tools.globalFn.publicAxiosFn(this,{
                needLogin:true,
                url:"/checkout/cart/selectall",
                method:"GET",
                params:{
                    checked:0
                },
                success:(res)=>{
                    // if(res.data.code===200){
                    //
                    // }
                    next();
                }
            });
            next();
        },
        watch: {
            //监听被选中的购物车
            'cartSelectedData.list': {
                handler(newValue, oldValue) {
                    if(this.returnShopCartLength===this.localShopCartData.length){
                        this.shopCartAllChecked = true;
                    }
                    else{
                        this.shopCartAllChecked = false;
                    }
                    // console.log(newValue);
                    // console.log(oldValue);
                    // console.log("购物车项发生变化");
                    // //计算当前购物车总数量
                    // let localCartGoodsCount=this.getShopCartLenthFn(this.localShopCartData.data);
                    // //计算当前购物车选中数量
                    // let cartSelectedCount=this.cartSelectedData.list.length;
                    // console.log("购物车数量为"+localCartGoodsCount);
                    // console.log("购物车选中数量为"+cartSelectedCount);
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
                    // if(localCartGoodsCount===cartSelectedCount){
                    //     //如果选中长度等于总长度，全选按钮为选中状态
                    //     this.shopCartAllChecked = true;
                    // }
                    // else{
                    //     this.shopCartAllChecked = false;
                    // }
                },
                deep: true
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*不可用列表*/
    .cannotBuyGoodListBg>div.header>p.right{
        color: #f44;
        font-size: 14px;
        float: right;
    }
    .cannotBuyGoodListBg>div.header>p.left{
        color: #333;
        font-size: 14px;
        float: left;
    }
    .cannotBuyGoodListBg>div.header{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: inherit;
        -moz-box-sizing: inherit;
        box-sizing: inherit;
        margin-bottom: 10px;
    }
    .cannotBuyGoodListBg{
        width: 100%;
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
        margin-bottom: 60px;

    }

    .cartListByShopBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
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
    .cartNoContent{
        color: #999;
        font-size: 14px;
        text-align: center;
        padding: 10px;
        background-color: transparent;
        border: none;
    }
    .cartListByShopBox > li.noContent {

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
