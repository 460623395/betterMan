<template>
    <div class="publicAllContentBg" id="shoppingMallOptions">
        <!--头部导航-->
        <van-nav-bar title="收货地址设置" class="globalNavBarHeaderClass"
                     @click-left="backLastPage"
                     fixed
        >
            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>
        </van-nav-bar>
        <!--地址列表-->
        <van-address-list
                v-model="addressOptions.chosenAddressId"
                :list="addressOptions.list"
                @add="onAdd"
                @edit="onEdit"
                @select="onSelect"
        ></van-address-list>
    </div>
</template>

<script>
    export default {
        name: 'shoppingMallOptions',
        data() {
            return {
                //收货地址相关信息
                addressOptions:{
                    //目前选中的地址
                    chosenAddressId:"1",
                    //地址列表
                    list:[
                        // {
                        //     id: '1',
                        //     name: '张三',
                        //     tel: '13000000000',
                        //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
                        // },
                        // {
                        //     id: '2',
                        //     name: '李四',
                        //     tel: '1310000000',
                        //     address: '浙江省杭州市拱墅区莫干山路 50 号'
                        // }
                    ]
                }
            }
        },
        methods: {
            //点击新增的方法
            onAdd(){
                console.log("点击新增");
            },
            //点击编辑的方法
            onEdit(item,index){
                console.log("点击编辑");
                console.log(item);
                console.log(index);
            },
            //选中地址的方法
            onSelect(item,index){
                console.log(item);
                console.log(index);
                this.$toast({
                    message:"已设置为默认地址",
                    duration:500
                });
            },
            //返回上一页的方法
            backLastPage() {
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
<style scoped></style>
