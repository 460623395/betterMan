<template>
    <div class="publicAllContentBg none fullHeight" id="searchThisShop">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass"
                     @click-left="backLastPage"
                     @click-right="searchConfirm"
                     fixed>
            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>
            <van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" clearable></van-field>
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <span slot="right" class="globalNavBarIconClass text">搜索</span>
        </van-nav-bar>
    </div>
</template>

<script>
    export default {
        name: 'searchThisShop',
        data() {
            return {
                //用户输入的搜索本店的值
                userSearchVal:""
            }
        },
        methods: {
            //搜索确认
            searchConfirm(){
                this.$router.push({name:"shopCenterSearchResult",params:{value:this.userSearchVal}})
            },
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
<style scoped></style>
