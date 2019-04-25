<template>
    <div class="publicAllContentBg" id="publishRating">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="发布评价"
                     left-arrow
                     left-text="返回"
                     @click-left="backLastPage"
                     fixed>
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--loading动画-->
        <van-loading type="spinner" color="black" v-if="firstDataStatusAnm===false"
                     class="globalLoadingAnmClass"></van-loading>
        <!--对单个商品的评价背景-->
        <div class="singleGoodEvaBg">
            <div class="singleGoodEvaBox" v-for="(good,index) in goodContentData.list" :key="index">
                <!--上传凭证-->
                <div class="uploaderBg" v-if="firstDataStatusAnm===true">
                    <!--描述相符选择-->
                    <div class="msRateBox">
                        <!--左侧图片-->
                        <div class="img">
                            <img :src="good.goodImg" alt="">
                        </div>
                        <!--中间星号-->
                        <div class="rate">
                            <p class="text">描述相符</p>
                            <van-rate
                                    v-model="good.describeMatch"
                                    :count="5"
                                    color="#ffa133"
                                    void-color="#999"
                            >
                            </van-rate>
                        </div>
                        <!--右侧文字-->
                        <p class="text" v-text="returnLvTextFn(good.describeMatch)"></p>
                    </div>
                    <!--评价内容-->
                    <van-field
                            v-model="good.goodEvaContent"
                            type="textarea"
                            placeholder="请填写您的评价"
                            rows="3"
                            autosize
                    >
                    </van-field>
                    <!--图片上传-->
                    <div class="content">
                        <!--上传按钮和图片数组-->
                        <ul class="uploadImgListBox">
                            <li class="uploadedImg" v-for="(img,i) in good.imgList" :key="i">
                                <div class="uploadedImgBox">
                                    <img :src="img" alt="">
                                    <van-icon name="clear" @click="delThisPhoto(good,i,img)"></van-icon>
                                </div>
                            </li>
                            <li class="uploadLine" v-if="good.imgList.length<3">
                                <div class="uploadButton" @click="recordEditGoodIndex(index)">
                                    <div class="content">
                                        <van-uploader :after-read="onRead">
                                            <van-icon name="photograph" style="color: #999"></van-icon>
                                            <p>上传凭证</p>
                                            <p class="small">最多3张</p>
                                        </van-uploader>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--是否匿名-->
                    <div class="anonymousBox">
                        <van-checkbox v-model="orderInfo.noName">匿名</van-checkbox>
                        <p class="text" v-if="orderInfo.noName===false">你的评价能帮助其他小伙伴</p>
                        <p class="text" v-if="orderInfo.noName===true">你写的评价会以匿名的形式展现</p>
                    </div>
                </div>
            </div>
        </div>
        <!--提交按钮-->
        <p class="submitButton" v-if="firstDataStatusAnm===true" @click="goToJFn">发布评价</p>
    </div>
</template>

<script>
    export default {
        name: 'publishRating',
        data() {
            return {
                goodContentData:{
                    list:[
                        // {
                        //     //商品id
                        //     goodId: good.product_id,
                        //     //商品图片
                        //     goodImg:good.imgUrl,
                        //     //商品名称
                        //     goodName:good.name,
                        //     //商品评价内容
                        //     goodEvaContent:"",
                        //     //描述相符
                        //     describeMatch:0,
                        //     //上传图片
                        //     imgList:[],
                        //     //是否匿名
                        //     noName:false
                        // }
                    ],
                    //当前编辑的商品的下标
                    current:0
                },
                //第一次数据请求是否完成
                firstDataStatusAnm: true,
                //店铺评价的全部内容
                ratingContentData:{
                    //物流服务
                    shipService:0,
                    //服务态度
                    attitude:0
                },
                //订单号
                orderInfo:{
                    //订单号
                    orderNum:"",
                    //服务id
                    serviceId:"",
                    //是否匿名
                    noName:false
                }
            }
        },
        methods: {
            //记录当前编辑的是哪个商品
            recordEditGoodIndex(index){
                console.log(index);
                this.goodContentData.current=index;
            },
            //发布评价的方法
            goToJFn(){
                console.log(this.goodContentData.list);
                //检查描述相符评分
                if(this.goodContentData.list[0].describeMatch===0){
                    this.tools.globalFn.publicToastFn(this,"请评价服务！");
                    return false;
                }
                //检查评价
                if(this.goodContentData.list[0].goodEvaContent===""){
                    this.tools.globalFn.publicToastFn(this,"请填写评价内容！");
                    return false;
                }
                //弹出确认框
                this.$dialog.confirm({
                    title: '确认提示',
                    message: '确认发表评价吗，一旦发表不可撤回哦'
                })
                    .then(()=>{
                        //开启loading
                        this.tools.globalFn.publicFullScreenLoadingFn(this);
                        //发起请求
                        this.tools.globalFn.publicAxiosFn(this,{
                            baseUrl:this.tools.ajaxAddress.other,
                            url:"/servicecomment/addcomment",
                            headerNeed:"noNeed",
                            data:{
                                //token
                                token:this.$store.state===0?JSON.parse(localStorage.shopSaveObject).token:"MTU2ODk3MTk0NjR8MTIzNDU2Nzg5",
                                //服务id
                                sid:this.orderInfo.serviceId,
                                //服务订单id
                                soid:this.$route.params.id,
                                //评论内容
                                content:this.goodContentData.list[0].goodEvaContent,
                                //评论图片
                                imgs:this.goodContentData.list[0].imgList,
                                //评分
                                score:this.goodContentData.list[0].describeMatch,
                                //是否匿名
                                anonymous:this.orderInfo.noName===true?1:2
                            },
                            success:(res)=>{
                                console.log(res);
                                if(res.data.code===200){
                                    this.tools.globalFn.publicToastFn(this,"评价成功！");
                                    this.$router.go(-1);
                                }
                                else{
                                    this.tools.globalFn.publicToastFn(this,"网络错误！");
                                }
                            }
                        });
                    })
                    .catch(()=>{

                    })
            },
            //返回当前级别文字的方法
            returnLvTextFn(val){
                console.log(val);
                if(val===0){
                    return "";
                }
                else if(val===1){
                    return "非常差";
                }
                else if(val===2){
                    return "差";
                }
                else if(val===3){
                    return "一般";
                }
                else if(val===4){
                    return "好";
                }
                else if(val===5){
                    return "非常好";
                }
            },
            //文件选择读取完成以后的回调
            onRead(file) {
                console.log(this.tools.globalFn.makeUploadImgFormDataFn(5,file.file));
                console.log(file);
                //请求上传
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/backman/upload/images",
                    needLogin:true,
                    data:this.tools.globalFn.makeUploadImgFormDataFn(5,file.file),
                    success:(res)=>{
                        console.log(res);
                        if(res.data.code===200){
                            //返回上传的路径(返回一个数组，第一个元素是前端拿来显示的地址,第二个元素是提交给后端的地址)
                            if (res.data.code === 200) {
                                this.goodContentData.list[this.goodContentData.current].imgList.push(res.data.data.img_list[0]);
                            }
                        }
                        else{
                            this.tools.globalFn.publicToastFn(this,"上传失败！");
                        }
                    }
                });
            },
            //删除上传照片的方法
            delThisPhoto (good,index,item) {
                // console.log(index);
                // console.log(item);
                good.imgList.splice(index,1);
                // this.ratingContentData.ratingImg.pop(item);
            },
            //返回上一页的方法
            backLastPage () {
                this.$router.go(-1);
            },
            //初始化数据的方法
            getFirstData(){
                //开启全屏loading动画
                this.tools.globalFn.publicFullScreenLoadingFn(this);
                //拿到路由传递的orderId，查询商品，循环
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        headerNeed:"noNeed",
                        baseUrl:this.tools.ajaxAddress.other,
                        url:"/serviceorder/orderdetails",
                        method:"POST",
                        data:{
                            token:this.$store.state===0?JSON.parse(localStorage.shopSaveObject).token:"MTU2ODk3MTk0NjR8MTIzNDU2Nzg5",
                            order_id:this.$route.params.id
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //存储订单号
                                this.orderInfo.orderNum=res.data.result.order_id;
                                //存储服务id
                                this.orderInfo.serviceId=res.data.result.sid;
                                this.goodContentData.list.push({
                                        //商品图片
                                        goodImg:res.data.result.imgs,
                                        //商品名称
                                        goodName:res.data.result.title,
                                        //商品评价内容
                                        goodEvaContent:"",
                                        //商品描述相符
                                        describeMatch:0,
                                        //上传图片
                                        imgList:[],
                                        // //是否匿名
                                        // anonymous:false
                                });
                                // //根据商品数量循环出对应数量的表单
                                // for(let good of res.data.data.order.products){
                                //    this.goodContentData.list .push({
                                //         //商品id
                                //         goodId: good.product_id,
                                //         //商品图片
                                //         goodImg:good.imgUrl,
                                //         //商品名称
                                //         goodName:good.name,
                                //         //商品评价内容
                                //         goodEvaContent:"",
                                //         //商品选中的fecshop的sku（如果有的话）
                                //         skuName:good.custom_option_sku,
                                //         //商品描述相符
                                //         describeMatch:0,
                                //         //上传图片
                                //         imgList:[],
                                //         //是否匿名
                                //         anonymous:false
                                //     });
                                // }
                                // //循环结束以后，关闭loading动画，渲染页面
                                this.firstDataStatusAnm=true;
                                console.log(this.goodContentData.list);
                                //关闭动画
                                this.$toast.clear();
                            }
                        }
                    }
                );
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
    .singleGoodEvaBg{
        width: 100%;
        height:auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .singleGoodEvaBox{
        width: 100%;
        height:auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
    }
    .singleGoodEvaBg>:first-child{
        margin-top: 0;
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
        padding: 10px 10px;
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
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid #f3f3f3;
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
    .uploaderBg .van-cell{
        padding: 0;
        margin-bottom: 10px;
    }
    [class*=van-hairline]::after{
        border: none;
    }
    .msRateBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        align-items:center;
        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid #f3f3f3;
    }
    .msRateBox>div.img{
        width: 10%;
        padding-top: 10%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
    }
    .msRateBox>div.img img{
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .msRateBox>div.rate{
        color: #333;
        font-size: 14px;
        margin: 0 10px;
        display: flex;
    }
    .msRateBox>div.rate>p.text{
        font-size: 14px;
        color: #666;
        margin-right: 4px;
    }
    .msRateBox>p.text{
        color: #333;
        font-size: 14px;
    }
    /*匿名*/
    .anonymousBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .anonymousBox>p.text{
        color: #999;
        font-size: 12px;
    }
    .anonymousBox .van-checkbox__label{
        color: #666;
        font-size: 12px;
    }
    .anonymousBox .van-checkbox__icon .van-icon{
        width: 14px;
        height: 14px;
    }
    .anonymousBox .van-checkbox__icon{
        line-height: 14px;
    }
    .anonymousBox .van-checkbox__icon--checked .van-icon{
        border-color: #ffa133;
        background-color: #ffa133;
    }
    /*店铺评分*/
    .shopRateBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        padding: 10px;
        margin-bottom: 10px;
    }
    .shopRateBox>div.header{
        display: flex;
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        align-items: center;
        font-size: 14px;
        color: #666;
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid #f3f3f3;
    }
    .shopRateBox>div.content{
        display: flex;
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        align-items: center;
    }
    .shopRateBox>div.content>p{
        color: #666;
        font-size: 12px;
        margin: 0 0 0 4px;
    }
    .shopRateBox>div.content>p:first-child{
        margin: 0 4px 0 0;
    }
</style>
