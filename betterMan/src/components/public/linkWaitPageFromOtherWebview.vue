<template>
    <div class="publicAllContentBg fullHeight pos" id="linkWaitPageFromOtherWebView">
        <van-loading type="spinner" class="globalLoadingAnmClass" />
    </div>
</template>

<script>
    export default {
        name: 'linkWaitPageFromOtherWebView',
        data() {
            return {
                //存储从其他模块openNewWebview传递过来的数据
                saveDataFromOtherMoudle:{
                    //数据（字符串json）
                    data:null,
                    //跳转类型(1.stuffList(列表) 2.stuffContent(商品详情) 3.shopCenter(店铺中心))
                    linkType:null
                }
            }
        },
        methods: {
            registerEvent(){
                //注册等待客户端开启了新webview传递data的方法
                this.$bridge.registerHandler("transferDataToWebWhenWebviewLoadingDone",(data,responseCallback)=>{
                    // alert(data);
                    if(data!==""&&data!==undefined&&data!==null){
                        // alert(JSON.stringify(data));
                        //存储其他webview跳转的数据
                        // this.$store.commit("saveDataFromOtherMoudleFn",JSON.parse(data));
                        this.saveDataFromOtherMoudle.data=JSON.parse(data).data;
                        this.saveDataFromOtherMoudle.linkType=JSON.parse(data).linkType;
                        // sessionStorage.data=JSON.parse(data).data;
                        // sessionStorage.linkType=JSON.parse(data).linkType;
                    }
                    //成功后返回给app端
                    responseCallback("true");
                });
            },
            //初始化数据并且进行跳转
            getFirstData() {
                if(this.saveDataFromOtherMoudle.linkType==="stuffList"){
                    //跳转列表,根据传递过来的type决定传值(这里需要把传递过来的JSON字符串转化为对象)
                    this.tools.globalFn.publicChangeLocalStorageFn("globalSearchVal",this.saveDataFromOtherMoudle.data,"add");
                    //跳转前改变存储当前是否是新建的一个webview的状态
                    this.$store.commit("changeIsNewWebviewFn",true);
                    //跳转列表
                    this.$router.replace({name:"searchResult"});
                }
                else if(this.saveDataFromOtherMoudle.linkType==="stuffContent"){
                    // alert("跳转详情辣");
                    // alert(JSON.parse(this.saveDataFromOtherMoudle.data).val);
                    //跳转专门的详情
                    this.$router.replace({name:"goodContentForLink",params:{id:JSON.parse(this.saveDataFromOtherMoudle.data).val}});
                }
                else if(this.saveDataFromOtherMoudle.linkType==="shopCenter"){
                    //跳转前改变存储当前是否是新建的一个webview的状态
                    this.$store.commit("changeIsNewWebviewFn",true);
                    //跳转店铺中心
                    this.$router.replace("/shopCenter/index/"+JSON.parse(this.saveDataFromOtherMoudle.data).val);
                }
                // alert(JSON.stringify(this.$store.state.saveDataFromOtherMoudle));
            }
        },
        created() {
            this.registerEvent();
        },
        mounted() {
            setTimeout(()=>{
                this.getFirstData();
                // alert(JSON.stringify(this.saveDataFromOtherMoudle));
                // alert(sessionStorage.data);
                // alert(sessionStorage.linkType);
            },500);

            // alert(JSON.stringify(this.$store.state.saveDataFromOtherMoudle));
        },
        watch: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
