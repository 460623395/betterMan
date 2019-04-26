<template>
    <div class="publicAllContentBg none fullHeight" id="shopCenterCategory">
        <!--<p>分类</p>-->
        <!--所有商品-->
        <div class="allGoodsLink">
            <van-cell title="所有商品" is-link/>
        </div>
        <!--所有分类-->
        <ul class="allCategoryList">
            <li v-for="first in allCategoryListData">
                <!--一级分类名-->
                <van-cell :title="first.title" is-link @click="goToResultFn(first.id)"/>
                <!--二级分类-->
                <ul class="categoryLv2List" v-if="first.children.length>0">
                    <li v-for="sec in first.children">
                        <p @click="goToResultFn(sec.id)">{{sec.title}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <!--分类列表-->
        <div class=""></div>
    </div>
</template>

<script>
    export default {
        name: 'shopCenterCategory',
        data() {
            return {
                //分类数组
                allCategoryListData:[
                    {
                        id:11,
                        title:"cpu",
                        children:[
                            {
                                id:22,
                                title:"intel"
                            },
                            {
                                id:33,
                                title:"AMD"
                            }
                        ]
                    },
                    {
                        id:13,
                        title:"显卡",
                        children:[
                            {
                                id:23,
                                title:"英伟达"
                            },
                            {
                                id:34,
                                title:"ATI"
                            },
                            {
                                id:23,
                                title:"英伟达"
                            },
                            {
                                id:34,
                                title:"ATI"
                            }
                        ]
                    },
                    {
                        id:290,
                        title:"电源",
                        children:[

                        ]
                    }
                ]
            }
        },
        methods: {
            //跳转结果搜索页面的方法
            goToResultFn(id){
                console.log(id);
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
    /*下级分类的样式*/
    .categoryLv2List{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding:5px 5px 5px 10px;
    }
    .categoryLv2List>li{
        width: 50%;
        float: left;
        padding: 5px 5px;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .categoryLv2List>li>p{
        background-color: #f0f2f5;
        color: #333;
        width: 100%;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
    }
    .allCategoryList{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .allCategoryList>li{
        width: 100%;
        border-bottom: 1px solid #e8e8e8;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
    }
    .allCategoryList>li:first-child{
        border-top: 1px solid #e8e8e8;
    }
    .allGoodsLink{
        width: 100%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #e8e8e8;
        margin-bottom: 10px;
    }
</style>
