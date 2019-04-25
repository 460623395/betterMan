// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import {routes} from './router/index'
import store from './store/store'
//引入公共方法
import globalTools from './components/global/globalTools'
//引入vant
import Vant from 'vant'
import 'vant/lib/index.css';
//引入axios
import axios from 'axios'
//引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/lib/swiper/swiper.css'
//引入自定义的公共css
import './assets/css/global/global.css'
import './assets/css/shoppingMall/global.css'
//引入自定义图标的css
import './assets/css/font/font.css'
//引入覆盖vant样式的css
import './assets/css/global/resetVant.css'
//引入覆盖swiper样式的css
import './assets/css/global/resetSwiper.css'
//引入jsBridge
import Bridge from "./assets/js/jsBridge/bridge"
//引入fastclick处理移动端click延时问题
import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vant);
Vue.use(VueAwesomeSwiper);
//注册axios
Vue.prototype.axios = axios;
//挂载全局的方法和属性到vue中
Vue.prototype.tools = globalTools;
//挂载全局的方法和属性到vue中
Vue.prototype.$bridge = Bridge;
//引入路由
const router = new VueRouter({
    routes: routes,
    // mode: "history"
});

/* eslint-disable no-new */
let vm=new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
export default vm;
// 请求的拦截器
axios.interceptors.request.use((config) =>{
    // alert(JSON.stringify(config.data));
    // 判断请求的类型
    // 如果是post请求就把默认参数拼到data里面
    // 如果是get请求就拼到params里面
    //存储以前的data
    // let data = config.data;
    // //先判断是否需要header
    // //
    // if(data.token!==undefined&&data.token!==""){
    //     //直接在本地存储里写段token
    //     // vm.tools.globalFn.publicChangeLocalStorageFn("")
    //     return config;
    // }
    // else {
    //     //判断当前是什么开发模式
    //     if (vm.$store.state.isDevMode === 1) {
    //         //如果当前是开发模式，那么手动在请求前添加token
    //         config.data = {
    //             token: "MTU2ODk3MTk0NjR8MTIzNDU2Nzg5",
    //             ...data
    //         };
    //     } else {
    //         //否则按照原来的配置
    //         config.data = {
    //             token: JSON.parse(localStorage.shopSaveObject).token,
    //             ...data
    //         };
    //     }
    // }
    // console.log("打印配置以后的data");
    // console.log(config);
    return config;
}, (error)=> {
    return Promise.reject(error);
});
//触摸事件
// document.addEventListener('touchstart', function(event) {
//     // 判断默认行为是否可以被禁用
//     if (event.cancelable) {
//         // 判断默认行为是否已经被禁用
//         if (!event.defaultPrevented) {
//             event.preventDefault();
//         }
//     }
// }, false);
//js
// 添加响应拦截器
axios.interceptors.response.use((res)=>{
    // console.log(res);
    // 对响应数据做点什么
    // return response;
    // console.log("响应拦截器！成功");
    // if(res.data.code===1100003){
    //     //token过期
    //     console.log("token过期");
    //     vm.tools.globalFn.publicToastFn(vm,"身份过期！请重新登录！",800);
    //     //清除本地存储
    //     localStorage.clear();
    //     vm.$router.push({name:"index"});
    // }
    // else{
    //     return res;
    // }
    // alert("公婆")
    // alert(JSON.stringify(res));
    return res;
},  (err) =>{
    // 对响应错误做点什么
    // console.log("响应拦截器！失败！");
    return Promise.reject(err);
});
// console.log(Vue.prototype.$bridge);
