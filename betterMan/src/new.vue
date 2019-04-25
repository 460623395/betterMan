<template>
    <div class="publicAllContentBg" id="checkLogistics">
        <!--头部导航-->
        <van-nav-bar title="我发布的悬赏" class="globalNavBarHeaderClass"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     fixed
        >
            <!--<van-icon name="setting" slot="right" style="color: #fafafa" @click="goToShopMalloptions"></van-icon>-->
            <!--<van-icon name="setting" slot="right" class="globalNavBarIconClass"></van-icon>-->
        </van-nav-bar>
    </div>
</template>

<script>
    export default {
        name: 'orderList',
        data() {
            return {

            }
        },
        methods: {
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
