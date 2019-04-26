import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    //需要中间管理的数据
    state:{
        //存储的值
        val:"",
        //存储token
        userToken:"",
        //当前是否是被新开启的webview-默认false
        isNewWebView:false,
        //目前的开发模式(1是开发，0是线上)
        isDevMode:1,
        //存储从其他模块openNewWebview传递过来的数据
        saveDataFromOtherMoudle:{
            //数据（字符串json）
            data:null,
            //跳转类型(1.stuffList(列表) 2.stuffContent(商品详情) 3.shopCenter(店铺中心))
            linkType:null
        }
    },
    //可以认为是 store 的计算属性
    getters:{
        //获取当前开发模式的值
        getIsDevModeFn:(state)=>{
            return state.isDevMode;
        }
        // getWiFiList: (state) => {
        //     return state.mapPoint;
        // }
        //获取shopInfo店铺信息
        // getShopInfo: (state)=>{
        //     return state.shopInfo;
        // }
    },
    //在这里创建改变state里数据的方法
    mutations:{
        //改变当前是否是新建的webview的方法
        changeIsNewWebviewFn(state, value){
            state.isNewWebView=value;
        },
        //存储从其他模块传递过来的数据的方法
        saveDataFromOtherMoudleFn(state, value){
            // alert(value);
            //存储数据
            state.saveDataFromOtherMoudle.data=value.data;
            //存储跳转方式
            state.saveDataFromOtherMoudle.linkType=value.linkType;
            // alert("存储完成");
        },
        //改变目前开发模式的方法
        changeDevModeFn(state, value){
            console.log(value);
            state.isDevMode=value;
        },
        //改变orderList的方法
        // changeOrderList(state, value){
        //     console.log(value);
        //     state.val=value;
        // }
    },
    actions:{

    }
});