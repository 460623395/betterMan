<template>
    <div class="publicAllContentBg" id="refundApply">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="选择服务类型"
                     @click-left="backLastPage"
                     fixed
        >
            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--商品信息-->
        <div class="orderContentBg">
            <!--购买的商品详情-->
            <div class="orderListBox">
                <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===true"
                             class="globalLoadingAnmClass"></van-loading>
                <div class="orderListStyle">
                    <!--订单头部信息-->
                    <div class="header">
                        <div class="left">
                            <van-icon name="shop" style="margin-right: 4px"></van-icon>
                            {{orderContentData.shopInfo.name}}
                            <!--<van-icon name="arrow" style="margin-left: 4px"></van-icon>-->
                        </div>
                        <!--<div class="right" v-text="orderStatusText(orderContentData)"></div>-->
                    </div>
                    <!--订单商品列表-->
                    <div class="orderListGoodsStyle">
                        <!--左侧图片部分-->
                        <div class="img">
                            <img :src="orderContentData.good.imgUrl" alt="">
                        </div>
                        <!--右侧商品信息部分-->
                        <div class="info">
                            <div class="top">
                                <p class="title">{{orderContentData.good.title}}</p>
                                <p class="realPrice">￥{{(orderContentData.good.price/100).toFixed(2)}}<br
                                        v-if="orderContentData.good.zkInfo.zk===true"><span
                                        v-if="orderContentData.good.zkInfo.zk===true"
                                        v-text="getOldPriceFn(item)"></span></p>
                            </div>
                            <div class="bottom">
                                <p class="gg">{{orderContentData.good.ggName}}</p>
                                <p class="num">x{{orderContentData.good.num}}</p>
                            </div>
                        </div>
                    </div>
                    <!--总计部分-->
                    <!--<div class="orderTotalBox">-->
                    <!--<div class="body">-->
                    <!--&lt;!&ndash;<span>共<b>{{orderContentData.goodsList.length}}</b>件商品</span>&ndash;&gt;-->
                    <!--<p><span>运费</span><span class="price" v-if="orderContentData.yf===0">￥{{(orderContentData.yf/100).toFixed(2)}}</span><span-->
                    <!--class="price" v-if="orderContentData.yf>0">￥{{(orderContentData.yf/100).toFixed(2)}}</span>-->
                    <!--</p>-->
                    <!--<p><span>合计</span><span class="price">￥{{(orderContentData.total/100).toFixed(2)}}</span></p>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--根据不同订单显示不同按钮部分-->
                    <!--<div class="orderButtonBox">-->
                    <!--<span class="del" v-if="orderContentData.status==='collected'">删除订单</span>-->
                    <!--<span class="cancel" v-if="orderContentData.status==='ordered'">取消订单</span>-->
                    <!--<span class="pay" v-if="orderContentData.status==='ordered'">去付款</span>-->
                    <!--<span class="confirmGet" v-if="orderContentData.status==='shiped'">确认收货</span>-->
                    <!--<span class="checkShip" v-if="orderContentData.status==='paid'||orderContentData.status==='shiped'">查看物流</span>-->
                    <!--<span class="evaluate" v-if="orderContentData.status==='collected'">去评价</span>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
        <!--退货退款选项-->
        <van-cell-group style="margin-bottom: 10px">
            <van-cell title="货物状态" :value="applyNeedData.goodStatus.title" is-link @click="goodStatusPropsShow=true"></van-cell>
            <van-cell title="退款原因" :value="applyNeedData.reason.title" is-link @click="refundReasonPropsShow=true"></van-cell>
        </van-cell-group>

        <!--退款金额-->
        <van-cell-group>
            <van-field
                    :value="refundTotal"
                    label="退款金额"
                    readonly
            >
            </van-field>
        </van-cell-group>
        <p class="refundTotalInfo">最多￥9.99，运费不算</p>
        <!--退款说明-->
        <van-cell-group style="margin-bottom: 10px">
            <van-field
                    v-model="applyNeedData.remark"
                    label="退款说明"
                    type="textarea"
                    placeholder="选填"
                    rows="1"
                    autosize
            >
            </van-field>
        </van-cell-group>
        <!--上传凭证-->
        <div class="uploaderBg">
            <div class="header">上传凭证</div>
            <div class="content">
                <!--上传按钮和图片数组-->
                <ul class="uploadImgListBox">
                    <li class="uploadedImg" v-for="item in applyNeedData.photo">
                        <div class="uploadedImgBox">
                            <img :src="item" alt="">
                            <van-icon name="clear" @click="delThisPhoto(item)"></van-icon>
                        </div>
                    </li>
                    <li class="uploadLine" v-if="applyNeedData.photo.length<3">
                        <div class="uploadButton">
                            <div class="content">
                                <van-uploader :after-read="onRead" accept="image/jpg">
                                    <van-icon name="photograph" style="color: #999"></van-icon>
                                    <p>上传凭证</p>
                                    <p class="small">最多3张</p>
                                </van-uploader>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--提交按钮-->
        <p class="submitButton">提交申请</p>
        <!--选择货物状态的弹窗-->
        <van-popup v-model="goodStatusPropsShow" position="bottom" :overlay="true">
            <van-picker
                    show-toolbar
                    :columns="goodStatusData.show"
                    @cancel="chooseGoodStatusOnCancel"
                    @confirm="chooseGoodStatusOnConfirm"
            ></van-picker>
        </van-popup>
        <!--选择退款理由的弹窗-->
        <van-popup v-model="refundReasonPropsShow" position="bottom" :overlay="true">
            <van-picker
                    show-toolbar
                    :columns="refundReasonData.show"
                    @cancel="refundReasonOnCancel"
                    @confirm="refundReasonOnConfirm"
            ></van-picker>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: 'refundApply',
        data() {
            return {
                //货物状态弹窗是否显示
                goodStatusPropsShow: false,
                //选择退款理由弹窗是否显示
                refundReasonPropsShow:false,
                //退款理由数据
                refundReasonData:{
                    //本地存储的
                    list:[
                        {
                            id:1,
                            title:"7天无理由退货"
                        },
                        {
                            id:2,
                            title:"性能故障"
                        }
                    ],
                    //用来给用户显示的
                    show:["7天无理由退货","性能故障"]
                },
                //货物状态数据
                goodStatusData:{
                    //本地存储的
                    list:[
                        {
                            id:1,
                            title:"已收到货"
                        },
                        {
                            id:2,
                            title:"未收到货"
                        }
                    ],
                    //用来给用户显示的
                    show:["已收到货","未收到货"]
                },
                //申请退款需要的数据
                applyNeedData: {
                    //商品id
                    goodId: 1,
                    //货物状态
                    goodStatus: {
                        id:"",
                        title:""
                    },
                    //退款原因
                    reason: {
                        id:"",
                        title:""
                    },
                    //退款金额
                    refundPrice: {
                        //运费
                        freight: 10,
                        //商品价值
                        goodPrice: 100
                    },
                    //退款说明
                    remark: "",
                    //照片凭证
                    photo: [

                    ]

                },
                //本地的商品列表下拉加载数据
                orderContentData: {
                    orderId: "2451554712454",
                    shopInfo: {
                        id: 1,
                        name: "哦牛批店铺"
                    },
                    total: 1202355,
                    yf: 105,
                    good: {
                        id: 1,
                        title: "哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品哦牛批商品",
                        price: 10520,
                        imgUrl: "../../../images/shoppingMall/cart/goodImg.png",
                        ggName: "规格:哦牛批规格",
                        zkInfo: {
                            zk: false,
                            zkPro: 0.2
                        },
                        num: 2
                    },
                    status: "ordered"
                },
                //第一次数据请求是否完成
                firstDataStatusAnm: false,
            }
        },
        computed: {
            //计算属性，监听数据变化
            //    退货总金额计算
            refundTotal: function () {
                return "￥" + ((this.applyNeedData.refundPrice.freight + this.applyNeedData.refundPrice.freight) / 100).toFixed(2);
            }
        },
        methods: {
            //文件选择读取完成以后的回调
            onRead(file) {
                console.log(file);
                alert(file);
                // var formData = new FormData();
                // formData.append('name', "upload");
                // formData.append('type', "file");
                // formData.append('file', file.file);
                // this.axios({
                //     url:"http://47.104.2.231/cflusers/frontend/web/index.php?r=user/upload",
                //     method:"POST",
                //     headers: {'Content-Type': 'multipart/form-data'},
                //     data:formData
                // })
                //     .then((res)=>{
                //         console.log(res);
                //         this.$toast("上传成功！");
                //         console.log(res.data[0]);
                //         this.applyNeedData.photo.push(res.data[0]);
                //         //把已经上传过的file存到本地以进行比对
                //     })
                //     .catch((error) =>{
                //         console.log(error);
                //         this.$toast("上传失败！");
                //     })
            },
            //取消选择退款理由的方法
            refundReasonOnCancel(val,index){
                this.refundReasonPropsShow=false;
            },
            //确认选择退款理由的方法
            refundReasonOnConfirm(val,index){
                console.log(val);
                console.log(index);
                this.applyNeedData.reason.id=this.refundReasonData.list[index].id;
                this.applyNeedData.reason.title=this.refundReasonData.list[index].title;
                console.log(this.applyNeedData.reason);
                this.refundReasonPropsShow=false;
            },
            //取消选择货物状态的方法
            chooseGoodStatusOnCancel(val,index){
                console.log(val);
                console.log(index);
                this.goodStatusPropsShow=false;
            },
            //确认选择货物状态的方法
            chooseGoodStatusOnConfirm(val,index,val2){
                console.log(val);
                console.log(index);
                // console.log(val2);
                this.applyNeedData.goodStatus.id=this.goodStatusData.list[index].id;
                this.applyNeedData.goodStatus.title=this.goodStatusData.list[index].title;
                console.log(this.applyNeedData.goodStatus);
                this.goodStatusPropsShow=false;
            },
            //删除上传照片的方法
            delThisPhoto (item) {
                this.applyNeedData.photo.pop(item);
            },
            //拿原价的方法
            getOldPriceFn: function (item) {
                console.log("打印原价");
                console.log(item);
                return "￥" + (item.price * item.zkInfo.zkPro / 100).toFixed(2);
            },
            //返回改订单文字状态的方法
            orderStatusText: function (order) {
                console.log(order);
                if (order.status === "ordered") {
                    return "买家已下单";
                }
                else if (order.status === "paid") {
                    return "买家已付款";
                }
                else if (order.status === "shiped") {
                    return "卖家已发货";
                }
                else if (order.status === "collected") {
                    return "交易成功";
                }
            },
            //到底部加载新数据的方法
            orderListOnload: function () {
                console.log("加载更多");
            },
            //切换顶部tab的方法
            changeTopTab: function (index, title) {
                console.log(index);
                console.log(title);
            },
            //返回上一页的方法
            backLastPage: function () {
                this.$router.go(-1);
            },
            //到底部加载新数据的方法
            goodsListOnload: function () {
                console.log("加载更多");
            },
        },
        created() {
        },
        mounted() {

        },
        watch: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .orderListBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
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
        padding-bottom: 10px;
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

    .orderContentBg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 10px;
    }



    .refundTotalInfo {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px 15px;
        color: #999999;
        font-size: 12px;

    }

    /*上传图片部分*/
    .uploaderBg {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px 15px;
        margin-bottom: 10px;
    }

    .uploaderBg > div.header {
        color: #333;
        font-size: 14px;
        margin-bottom: 10px;
    }

    .uploaderBg > div.content {
        width: 100%;
        height: auto;
        /*overflow: hidden;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
    }

    .uploadImgListBox {
        width: 100%;
        height: auto;
        /*overflow: hidden;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
    }

    .uploadImgListBox > li {
        width: 25%;
        height: auto;
        /*overflow: hidden;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-left: 10px;
        /*float: left;*/
        /*padding: 0 10px;*/

    }

    .uploadImgListBox > li:first-child {
        margin-left: 0;
    }

    /*上传按钮样式*/
    .uploadButton {
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        border: 1px dashed #999;
    }

    .uploadButton::before {
        padding-top: 100%;
        content: '\20';
        display: block;
    }

    .uploadButton > div.content {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .uploadButton > div.content p {
        color: #999;
        text-align: center;
        font-size: 14px;
    }

    .uploadButton > div.content p.small {
        font-size: 12px;
    }

    /*显示的图片*/
    .uploadedImgBox {
        width: 100%;
        height: auto;
        padding-top: 100%;
        /*overflow: hidden;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }

    .uploadedImgBox img {
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
    }

    .uploadedImgBox .van-icon {
        position: absolute;
        right: -7px;
        top: -7px;
        color: #000;
        opacity: 0.8;
        background-color: #fff;
        border-radius: 100%;
    }

    .submitButton {
        width: 90%;
        margin: auto;
        margin-bottom: 10px;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 2px;
        background: linear-gradient(to right, #30aaff, #2BD0FE);
        color: #fff;
        padding: 10px;
        text-align: center;
        font-size: 14px;
    }
</style>
