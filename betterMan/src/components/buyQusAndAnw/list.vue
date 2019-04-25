<template>
    <div class="publicAllContentBg" id="buyQusAndAnwList">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass" title="购买咨询"
                     @click-left="backLastPage"
                     fixed>
            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>
            <!--<van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" readonly></van-field>-->
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <!--<span slot="right" style="color: #fafafa">搜索</span>-->
        </van-nav-bar>
        <!--购买咨询列表-->
        <ul class="qAndAListBg">
            <li class="qAndAListBox" v-for="(item,index) in goodQList" :key="index">
                <van-cell :title="'问:'+item.q.title" :label="'答:'+item.a[0].title" is-link></van-cell>
                
                <!--<div class="van-cell van-cell&#45;&#45;clickable van-hairline">-->
                    <!--<div class="van-cell__title">-->
		                <!--<span>{{"问："+item.q.title}}</span>-->
                        <!--<div class="van-cell__label" v-for="anw in item.a">{{"答："+anw.title}}</div>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;&ndash;&gt;-->
                    <!--<i class="van-icon van-icon-arrow van-cell__right-icon">-->
                    <!--</i>-->
                <!--</div>-->
                <div class="info">
                    <p class="left">全部{{item.a.length}}个回答</p>
                    <p class="right">提问时间:{{tools.globalFn.returnDateForCoupon(item.q.time)}}</p>
                </div>
            </li>

        </ul>
        <!--底部提问列-->
        <div class="bottomFixedQusLine" @click="popupOptions.show=true">我要提问</div>
        <!--提问弹窗-->
        <van-popup v-model="popupOptions.show" :overlay="popupOptions.overlay" style="justify-content:center;width: 100%;height: 100%;overflow-y:scroll;overflow-x:hidden;background-color: rgba(0,0,0,0);display: flex;align-items: center;">
            <div class="popupPublicBox">
                <!--header-->
                <p class="qHeaderBox">您的问题</p>
                <div class="qContentBox">
                    <van-field
                            v-model="userPostAnwData.qName"
                            type="textarea"
                            placeholder="输入您的问题"
                            rows="2"
                            autosize
                    ></van-field>
                </div>

            </div>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: 'buyQusAndAnwList',
        data() {
            return {
                //用户提问数据
                userPostAnwData:{
                    qName:""
                },
                //提问弹窗的设置
                popupOptions:{
                    show:false,
                    overlay:true
                },
                //购买咨询列表
                goodQList:[
                    {
                        id:144,
                        q:{
                            id:1,
                            title:"必须给我拿下奥。",
                            time:154157456754
                        },
                        a:[
                            {
                                id:2,
                                title:"必须滴，放心吧。"
                            },
                            {
                                id:3,
                                title:"你，来沈阳，我等你。"
                            }
                        ]
                    },
                    {
                        id:144,
                        q:{
                            id:1,
                            title:"必须给我拿下奥。",
                            time:154157456754
                        },
                        a:[
                            {
                                id:2,
                                title:"必须滴，放心吧。"
                            },
                            {
                                id:3,
                                title:"你，来沈阳，我等你。"
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            backLastPage(){
                this.$router.go(-1);
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
    .qContentBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #f3f3f3;
        padding: 4px;
    }
    .qHeaderBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px;
        text-align: center;
        font-size: 16px;
        margin-bottom: 10px;
    }
    .popupPublicBox{
        width: 80%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        background-color: #fff;
        border-radius: 2px;
    }
    .bottomFixedQusLine{
        width: 100%;
        line-height: 46px;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #f44;
        text-align: center;
        position: fixed;
        bottom: 0;
        left: 0;
        color: #fff;
        font-size: 16px;
    }
    .qAndAListBox>div.info{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    .qAndAListBox>div.info p.left{
         color: #999;
         font-size: 12px;
     }
    .qAndAListBox>div.info p.right{
        color: #999;
        font-size: 12px;
    }
    .qAndAListBg{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px;
        margin-bottom: 56px;
    }
    .qAndAListBox{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 10px;
        background-color: #fff;
        border-radius: 4px;
    }
</style>
