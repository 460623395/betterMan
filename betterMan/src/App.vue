<template>
    <div id="app">
        <!--<transition :name='transitionName' keep-alive>-->
        <!--这里是需要缓存的页面-->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!--</transition>-->
        <!--这里是不需要缓存的页面-->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return {
                transitionName:"slide-left"
            }
        },
        methods:{
        //    全局注册登录后存储token和用户信息的方法
            registerEvent(){
                //注册等待客户端开启了新webview传递data的方法
                this.$bridge.registerHandler("transferDataToWebWhenWebviewLoadingDone",(data,responseCallback)=>{
                    // alert(data);
                    if(data!==""&&data!==undefined&&data!==null){
                        //存储其他webview跳转的数据
                        this.$store.commit("saveDataFromOtherMoudleFn",JSON.parse(data));
                    }
                    //成功后返回给app端
                    responseCallback("true");
                });
                //注册等待客户端传递信息的方法
                this.$bridge.registerHandler("transferDataToNewWebview",(data,responseCallback)=>{
                    // alert("调用了传递方法");
                    // alert("开始");
                    // alert(JSON.parse(data).shopToken);
                    // alert(JSON.parse(data).nickName);
                    // alert(JSON.parse(data).tel);
                    // alert(JSON.parse(data).uuid);
                    if(data!==""&&data!==undefined&&data!==null){
                        //先删除商城节点防止出错
                        localStorage.removeItem("shopSaveObject");
                        //创建商城节点
                        localStorage.setItem("shopSaveObject",JSON.stringify({}));
                        this.tools.globalFn.publicChangeLocalStorageFn("uuid",JSON.parse(data).uuid,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("shopToken",JSON.parse(data).shopToken,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("nickName",JSON.parse(data).nickName,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("userTel",JSON.parse(data).tel,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("userId",JSON.parse(data).userId,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("token",JSON.parse(data).token,"add");
                        // alert("存完了");
                        // alert(localStorage.shopSaveObject)
                        // localStorage.shopSaveObject=JSON.stringify({
                        //     shopToken:JSON.parse(data).shopToken,
                        //     userTel:JSON.parse(data).tel,
                        //     nickName:JSON.parse(data).nickName,
                        //     uuid:JSON.parse(data).uuid
                        // });
                        // alert(data.shopToken);
                        //存储用户商城token,电话，昵称
                        // localStorage.setItem("shopToken",JSON.parse(data).shopToken);
                        // localStorage.setItem("userTel",JSON.parse(data).tel);
                        // localStorage.setItem("nickName",JSON.parse(data).nickName);
                        // localStorage.setItem("uuid",JSON.parse(data).uuid);
                    }
                    //成功后返回给app端
                    responseCallback("true");
                });
                //注册获取shopToken的方法
                this.$bridge.registerHandler("transferTokenToWeb",(data,responseCallback)=>{
                    // alert("开始");
                    // alert(JSON.parse(data).shopToken);
                    // alert(JSON.parse(data).nickName);
                    // alert(JSON.parse(data).tel);
                    // alert(JSON.parse(data).uuid);
                    if(data!==""&&data!==undefined&&data!==null){
                        //先删除商城节点防止出错
                        localStorage.removeItem("shopSaveObject");
                        //创建商城节点
                        localStorage.setItem("shopSaveObject",JSON.stringify({}));
                        this.tools.globalFn.publicChangeLocalStorageFn("uuid",JSON.parse(data).uuid,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("shopToken",JSON.parse(data).shopToken,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("nickName",JSON.parse(data).nickName,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("userTel",JSON.parse(data).tel,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("token",JSON.parse(data).token,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("userId",JSON.parse(data).userId,"add");
                        this.tools.globalFn.publicChangeLocalStorageFn("userIcon",JSON.parse(data).userIcon,"add");
                        // localStorage.shopSaveObject=JSON.stringify({
                        //     shopToken:JSON.parse(data).shopToken,
                        //     userTel:JSON.parse(data).tel,
                        //     nickName:JSON.parse(data).nickName,
                        //     uuid:JSON.parse(data).uuid
                        // });
                        // alert(data.shopToken);
                        // this.tools.globalFn.publicToastFn(this,"存储成功！");
                        // alert(localStorage.shopSaveObject);
                        //存储用户商城token,电话，昵称
                        // localStorage.setItem("shopToken",JSON.parse(data).shopToken);
                        // localStorage.setItem("userTel",JSON.parse(data).tel);
                        // localStorage.setItem("nickName",JSON.parse(data).nickName);
                        // localStorage.setItem("uuid",JSON.parse(data).uuid);
                    }
                    //成功后返回给app端
                    responseCallback("true");
                });
                //注册客户端通知web端
                this.$bridge.registerHandler("noticeWebLogout",(data,responseCallback)=>{
                    // alert("调用了清除方法");
                    // alert(JSON.parse(data).shopToken);
                    // alert(JSON.parse(data).nickName);
                    // alert(JSON.parse(data).tel);
                    // alert(JSON.parse(data).uuid);
                    if(data==="true"){
                        //清除shopToken等信息
                        localStorage.clear();
                        // alert("清除完成");
                    }
                    //成功后返回给app端
                    responseCallback("true");
                });
            },
            //改变当前token的方法
            regNowModeFn(){
                if(this.tools.globalFn.regDevModeFn(this)===1){
                    //先清空，然后创建
                    localStorage.clear();
                    //创建
                    localStorage.setItem("shopSaveObject",JSON.stringify({}));
                    //本地赋值
                    this.tools.globalFn.publicChangeLocalStorageFn("uuid","7a274e00-d028-11e8-8812-00163e0561ee","add");
                    this.tools.globalFn.publicChangeLocalStorageFn("shopToken","RqENyMUbpT15foUHSevoSPc2CuahODpR","add");
                    this.tools.globalFn.publicChangeLocalStorageFn("userToken","MTg2MTU2MjM0NDJ8emhhbmd5dWU2MzI","add");
                    this.tools.globalFn.publicChangeLocalStorageFn("userId","5bebcf077209a86bad033862","add");
                }
            }
        },
        created(){
            // this.regNowModeFn();
            this.registerEvent();
        },
        mounted(){
            // this.$bridge.registerHandler("transferTokenToShop",(data,responseCallback)=>{
            //     alert(JSON.parse(data).shopToken);
            //     alert(JSON.parse(data).nickName);
            //     alert(JSON.parse(data).tel);
            //     if(data){
            //         //存储用户商城token,电话，昵称
            //         localStorage.setItem("shopToken",JSON.parse(data).shopToken);
            //         localStorage.setItem("userTel",JSON.parse(data).tel);
            //         localStorage.setItem("nickName",JSON.parse(data).nickName);
            //         alert("存储完成");
            //     }
            //     //成功后返回给app端
            //     responseCallback("true");
            // })
        },
        watch:{
            // '$route' (to, from) {
            //     console.log("打印to");
            //     console.log(to);
            //     var toDepth = "";
            //     var fromDepth = "";
            //     console.log("打印from");
            //     console.log(from);
            //     //判断是否来自首页
            //     if(from.path==="/"){
            //         console.log("path===首页");
            //         fromDepth=["/"];
            //     }
            //     //如果不是就分割成数组
            //     else{
            //         fromDepth=from.path.split("/");
            //     }
            //     //判断是否来自首页
            //     if(to.path==="/"){
            //         toDepth=["/"];
            //     }
            //     //如果不是就分割成数组
            //     else{
            //         toDepth=to.path.split("/");
            //     }
            //     console.log(toDepth);
            //     console.log(fromDepth);
            //     if(toDepth.length < fromDepth.length){
            //         //小于的话
            //         this.transitionName='slide-right';
            //     }
            //     else if(toDepth.length === fromDepth.length){
            //         //等于的话(不同板块之间跳转)
            //         this.transitionName='slide-left';
            //     }
            //     else if(toDepth.length > fromDepth.length){
            //         //大于的话
            //         this.transitionName='slide-left';
            //     }
            //     // this.transitionName = toDepth.length < fromDepth.length ? 'slide-right' : 'slide-left'
            // }
            // $route(to, from) {
            //     console.log(to);
            //     console.log(from);
            //     //如果to索引大于from索引,判断为前进状态,反之则为后退状态
            //     if(to.meta.index > from.meta.index){
            //         //设置动画名称
            //         this.transitionName = 'slide-left';
            //     }else{
            //         this.transitionName = 'slide-right';
            //     }
            // }
        }
    }
</script>

<style>
    #app {
        height: 100%;
    }
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all 500ms;
        position: absolute;
    }
    .slide-right-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
</style>
