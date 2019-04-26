<template>
    <div class="linkWaitPageBg" id="linkWaitPage">
        <van-loading type="spinner" color="black"
                     class="globalLoadingAnmClass"></van-loading>
    </div>
</template>

<script>
    export default {
        name: "linkWaitPage",
        //接收父组件的传值
        data() {
            return {

            }
        },
        methods: {

        },
        created() {
            //拿到路由参数
            console.log(this.$route);
            //跳转商品详情
            setTimeout(()=>{
                this.$router.replace({name: "goodsContent", params: {id: this.$route.params.id}});
                // this.$router.replace({name: "goodsContent", params: {id: "5bb075b27209a814e06f68ec"}});

            },0.01);
        },
        mounted() {

        },
        watch: {}
    }
</script>

<style scoped>
   .linkWaitPageBg{
       width: 100%;
       height: 100%;
       overflow: hidden;
       -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
       box-sizing: border-box;
       background-color: #f1f1f1;
       position: relative;
   }
</style>