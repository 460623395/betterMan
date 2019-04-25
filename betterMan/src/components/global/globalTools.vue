<script>
    //公共地址
    const ajaxAddress={
        // defaultUrl:"http://shop-server.tobebetterman.com",
        //以下是正式地址
        // defaultUrl:"http://shop.tobebetterman.net",
        // ming:"http://www.tobebetterman.net",
        // other:"http://www.tobebetterman.net"


        //以下是开发地址
        defaultUrl:"http://shop-beta.tobebetterman.com",
        ming:"http://beta.tobebetterman.com",
        other:"http://beta.tobebetterman.com"
    };
    //公共信息
    const publicDataSave={
        //默认头像
        defaultUserIcon:"http://beta.tobebetterman.com/uploads/15229490522/cover/1546482962316445.png"
    };
    //公共方法
    let globalFn = {
        //商城专用上传图片的方法
        makeUploadImgFormDataFn(type,file){
            /*参数
            * type:类型，决定文件存储位置
            * [
                商品相关 => 1,    // 商品主图,展示图,详情图
                分类相关 => 2,    // 分类的图标相关
                店铺相关 => 3,    // 店铺头像,logo,认证信息图片
                品牌相关 => 4,    // 品牌的图片
                用户上传 => 5,    // 如用户的评价图片等
                推荐位   => 6,    // 后台使用
                内容相关 => 7,    // 如文章图片等
                ]
                file:文件,上传的图片
            * */
            let formData=new FormData();
            //生成type
            formData.append('type',type);
            //生成文件
            formData.append('file',file);
            return formData;
        },
        //公共的改变本地存储的方法
        publicChangeLocalStorageFn(key,val,type){
            /*
            * key:需要改变的key
            * val:改变的val
            * type:edit:编辑key;add:添加key;search:查询是否有这个key
            * 返回值：-1:找不到该元素;true:修改或添加完成;false:修改或添加失败
            * */
            // alert(key);
            // alert(JSON.parse(localStorage.shopSaveObject)[key]);
            // console.log("开始启动函数");
            //如果本地存储里不存在shopSaveObject字段，自己添加
            if(localStorage.shopSaveObject===undefined){
                localStorage.shopSaveObject=JSON.stringify({});
            }
            if(JSON.parse(localStorage.shopSaveObject)[key]===undefined){
                // alert("不存在该key");
                // console.log("该key不存在");
                //如果类型是搜索，那么就终止直接返回-1
                if(type==="search"){
                    return -1;
                }
            }
            // console.log("不是搜索");
            //创建修改对象，等待最后赋值
            let thisObj=JSON.parse(localStorage.shopSaveObject);
            // console.log("打印json对象");
            // console.log(thisObj);
            //如果不是搜索,那么根据type改变或新增
            if(type==="add"){
                // console.log("进入add");
                //修改对象
                thisObj[key]=val;
                //赋值给本地存储
                localStorage.shopSaveObject=JSON.stringify(thisObj);
                //释放变量
                thisObj=null;
                return true;
            }
            //如果类型是增加
            if(type==="edit"){
                // console.log("进入编辑");
                //修改对象
                thisObj[key]=val;
                //赋值给本地存储
                localStorage.shopSaveObject=JSON.stringify(thisObj);
                //释放变量
                thisObj=null;
                return true;
            }
            //都没走，那么就false
            return false;
        },
        //验证是开发模式还是调试模式
        regDevModeFn(vue){
            // console.log(vue);
            // console.log(vue.$store);
            // console.log(vue.$store.state.isDevMode);
            //1是开发模式,0是线上模式
            if(vue.$store.state.isDevMode===1){
                vue.tools.globalFn.publicChangeLocalStorageFn("nickName","开发账号名称","add");
                vue.tools.globalFn.publicChangeLocalStorageFn("userTel","15689719464","add");
                // localStorage.nickName="开发账号名称";
                // localStorage.userTel="15689719464";
                return 1;
            }
            else if(vue.$store.state.isDevMode===0){
                return 0;
            }
        },
        //验证是否登录的方法
        isLoginFn(){
            // alert("判断是否登录");
            // alert(localStorage.shopSaveObject);
            if(localStorage.shopSaveObject===undefined){
                return false;
            }
            //商城token存储到localStorage
            if(JSON.parse(localStorage.shopSaveObject).shopToken===""||JSON.parse(localStorage.shopSaveObject).shopToken==="undefined"||JSON.parse(localStorage.shopSaveObject).shopToken==="null"||JSON.parse(localStorage.shopSaveObject).shopToken===undefined||JSON.parse(localStorage.shopSaveObject).shopToken===null){
                return false;
            }
            // return JSON.parse(localStorage.shopSaveObject).shopToken;
            return true;
        },
        //计算返回当前总页数的方法
        totalPageCountFn(size,total){
            // console.log(size);
            // console.log(total);
            // let pageSize=parseInt(size);
            // let allTotal=parseInt(total);
            // console.log("打印每页条数");
            // console.log(pageSize);
            // console.log(allTotal);
            //计算结果
            let pageTotal=parseInt(total)/parseInt(size);
            // console.log(pageTotal);
            if(pageTotal<=1){
                //如果小于1，就只有一页
                // console.log("总页数为1");
                return 1;
            }
            else if(pageTotal>1&&(parseInt(pageTotal)==pageTotal)===false){
                //当前计算结果大于1且是小数，那么返回page+1
                // console.log("总页数为");
                // console.log(parseInt(pageTotal)+1);
                return parseInt(pageTotal)+1;
            }
            else if(pageTotal>1&&(parseInt(pageTotal)==pageTotal)===true){
                //当前计算结果大于1且是整数，那么返回page
                return parseInt(pageTotal);
            }
        },
        //返回完整日期的方法
        getFullDate(ms) {
            let time = new Date(ms);
            let hours=time.getHours();
            let minutes=time.getMinutes();
            let second=time.getSeconds();
            //小时
            if(hours.toString().length===1){
                hours="0"+hours;
            }
            //分钟
            if(minutes.toString().length===1){
                minutes="0"+minutes;
            }
            //秒
            if(second.toString().length===1){
                second="0"+second;
            }
            return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + "  " + hours + ":" + minutes + ":" + second;
        },
        //通用的全屏loading(带黑边的方法)
        publicFullScreenLoadingFn(vue,options){
            console.log('publicFullScreenLoadingFn');
            // console.log(options);
            if(options===undefined){
                options={}
            }
            if(options.mask===undefined){
                options.mask=true;
            }
            if(options.duration===undefined){
                options.duration=0;
            }
            if(options.message===undefined){
                options.message="加载中...";
            }
            console.log(options);
            vue.$toast.loading(options);
        },
        //通用请求方法
        publicAxiosFn(vue,options){
            // alert("进入请求方法");
            // let obj={
            //     //请求的地址
            //     url:"",
            //     //请求的前缀地址
            //     baseUrl:"",
            //     //是否是需要登录的请求
            //     needLogin:true或者false
            //     //body传参
            //     data:{},
            //     //url传参
            //     params:{},
            //     //状态(用于判断是否需要传递商城的header),有need和noNeed两个值，如果不传这个参数，就当默认是need处理(商城中是)
            //     headerNeed:"need",
            //     //请求成功回调
            //     success:(res)=>{
            //
            //     },
            //     //发生错误的回调
            //     fail:(err)=>{
            //
            //     }
            // }
            //先判断是否是需要登录的请求，如果是，那么判断是否有登录，没有直接弹出登录
            if(options.needLogin){
                //检查是否有登录,没登录，直接跳登录页面
                if(vue.tools.globalFn.isLoginFn(vue)===false&&vue.tools.globalFn.regDevModeFn(vue)===0){
                    vue.$bridge.callHandler("toLogin");
                    return;
                }
            }
            //请求方式
            if(options.method===undefined||options.method===null||options.method===""){
                options.method="POST";
            }
            //url参数
            if(options.params===undefined||options.params===null||options.params===""){
                options.params={};
            }
            //body参数
            if(options.data===undefined||options.data===null||options.data===""){
                options.data={};
            }
            //baseUrl判断
            if(options.baseUrl===undefined||options.baseUrl===null||options.baseUrl===""){
                options.baseUrl=vue.tools.ajaxAddress.defaultUrl;
            }
            //成功回调
            if(options.success===undefined||options.success===null||options.success===""){
                console.error("成功回调未定义");
                options.success=(res)=>{
                    console.log(res);
                };
            }
            //中间出现错误的回调
            // if(options.fail===undefined||options.fail===null||options.fail===""){
            //     console.error("失败回调未定义");
            //     options.success=(res)=>{
            //
            //     };
            // }
            //统一执行的错误回调
            options.fail=(err)=>{
                console.log(err);
                // alert(err);
                vue.tools.globalFn.publicToastFn(vue,"网络错误，请稍后再试");
            };
            //判断是否是需要登录的操作
            if(options.needLogin===true){
                //保存之前的data
                // let oldData=options.data;
                // alert("需要登录");
                //如果是需要登录的操作并且目前是线上模式并且尚未登录
                if(vue.tools.globalFn.isLoginFn(vue)===false&&vue.tools.globalFn.regDevModeFn(vue)===0){
                    //那么直接跳转登录
                    // vue.$bridge.callHandler("toLogin");
                }
                //如果需要登录，且也已经登录
                else if(vue.tools.globalFn.isLoginFn(vue)===true){
                    //那么判断是否需要header
                    if(options.headerNeed===undefined||options.headerNeed===null||options.headerNeed===""){
                        // alert(JSON.stringify(options))
                        // alert("iBook");
                        // alert(JSON.parse(localStorage.shopSaveObject).uuid);
                        // alert(JSON.parse(localStorage.shopSaveObject).shopToken)
                        //因为是商城，默认传递header
                        vue.axios({
                            url:options.baseUrl+options.url,
                            method:options.method,
                            headers:{
                                "Fecshop-Uuid":JSON.parse(localStorage.shopSaveObject).uuid,
                                "Access-Token":JSON.parse(localStorage.shopSaveObject).shopToken
                            },
                            params:options.params,
                            data:options.data
                        })
                            .then(options.success)
                            .catch(options.fail)
                    }
                    //如果已经登录且需要header,那么也传递
                    else if(options.headerNeed==="need"){
                        // alert("need");
                        vue.axios({
                            url:options.baseUrl+options.url,
                            method:options.method,
                            headers:{
                                "Fecshop-Uuid":JSON.parse(localStorage.shopSaveObject).uuid,
                                "Access-Token":JSON.parse(localStorage.shopSaveObject).shopToken
                            },
                            params:options.params,
                            data:options.data
                        })
                            .then(options.success)
                            .catch(options.fail)
                    }
                    //如果不登录且不需要header，那么就不传递
                    else if(options.headerNeed==="noNeed"){
                        alert(JSON.stringify(options));
                        // alert("noNeed");
                        vue.axios({
                            url:options.baseUrl+options.url,
                            method:options.method,
                            // headers:{
                            //     "Fecshop-Uuid":JSON.parse(localStorage.shopSaveObject).uuid,
                            //     "Access-Token":JSON.parse(localStorage.shopSaveObject).shopToken
                            // },
                            params:options.params,
                            data:options.data
                        })
                            .then(options.success)
                            .catch(options.fail)
                    }
                }
                //如果是需要登录的操作并且目前是线下模式并且尚未登录(用于调试)
                else if(vue.tools.globalFn.isLoginFn(vue)===false&&vue.$store.state.isDevMode===1){
                    //如果headerNeed是空的那么就手动配置请求(用于调试和开发)
                    if(options.headerNeed===undefined||options.headerNeed===null||options.headerNeed===""){
                        //因为这是商城，所以默认传递上
                        vue.axios({
                            url:options.baseUrl+options.url,
                            method:options.method,
                            headers:{
                                "Fecshop-Uuid":"f3c2f0ae-5069-11e9-9aa6-00163e0561ee",
                                "Access-Token":"eW9HPc1UT35U_PSJqjAbcr_XZ8lYbcsO"
                            },
                            params:options.params,
                            data:options.data
                        })
                            .then(options.success)
                            .catch(options.fail)
                    }
                    else if(options.headerNeed==="need"){
                        //如果需要，那么直接传上
                        vue.axios({
                            url:options.baseUrl+options.url,
                            method:options.method,
                            headers:{
                                "Fecshop-Uuid":"f3c2f0ae-5069-11e9-9aa6-00163e0561ee",
                                "Access-Token":"eW9HPc1UT35U_PSJqjAbcr_XZ8lYbcsO"
                            },
                            params:options.params,
                            data:options.data
                        })
                            .then(options.success)
                            .catch(options.fail)
                    }
                    else if(options.headerNeed==="noNeed"){
                        //如果不需要，那么不传
                        vue.axios({
                            url:options.baseUrl+options.url,
                            method:options.method,
                            // headers:{
                            //     "Fecshop-Uuid":"dd252400-ff49-11e8-818a-00163e0561ee",
                            //     "Access-Token":"RqENyMUbpT15foUHSevoSPc2CuahODpR"
                            // },
                            params:options.params,
                            data:options.data
                        })
                            .then(options.success)
                            .catch(options.fail)
                    }
                }
            }
            //如果是不需要登录的请求
            else if (options.needLogin===false||options.needLogin===null||options.needLogin===""||options.needLogin===undefined){
                console.log("不需要登录请求");
                //那直接请求就完事了
                vue.axios({
                    url:options.baseUrl+options.url,
                    method:options.method,
                    // headers:{
                    //     "Fecshop-Uuid":"dd252400-ff49-11e8-818a-00163e0561ee",
                    //     "Access-Token":"RqENyMUbpT15foUHSevoSPc2CuahODpR"
                    // },
                    params:options.params,
                    data:options.data
                })
                    .then(options.success)
                    .catch(options.fail)
            }
        },
        // publicAxiosFn(vue,options){
        //     // alert("进入请求方法");
        //     // let obj={
        //     //     //请求的地址
        //     //     url:"",
        //     //     //请求的前缀地址
        //     //     baseUrl:"",
        //     //     //是否是需要登录的请求
        //     //     needLogin:true或者false
        //     //     //body传参
        //     //     data:{},
        //     //     //url传参
        //     //     params:{},
        //     //     //状态(用于判断是否需要传递商城的header),有need和noNeed两个值，如果不传这个参数，就当默认是need处理(商城中是)
        //     //     headerNeed:"need",
        //     //     //请求成功回调
        //     //     success:(res)=>{
        //     //
        //     //     },
        //     //     //发生错误的回调
        //     //     fail:(err)=>{
        //     //
        //     //     }
        //     // }
        //     //先判断是否是需要登录且是线上模式的请求，如果是，那么判断是否有登录，没有直接弹出登录
        //     if(options.needLogin&&vue.tools.globalFn.regDevModeFn()===0){
        //         //检查是否有登录,没登录，直接跳登录页面
        //         if(vue.tools.globalFn.isLoginFn(vue)===false){
        //             vue.$bridge.callHandler("toLogin");
        //             return;
        //         }
        //     }
        //     //请求方式
        //     if(options.method===undefined||options.method===null||options.method===""){
        //         options.method="POST";
        //     }
        //     //url参数
        //     if(options.params===undefined||options.params===null||options.params===""){
        //         options.params={};
        //     }
        //     //body参数
        //     if(options.data===undefined||options.data===null||options.data===""){
        //         options.data={};
        //     }
        //     //baseUrl判断
        //     if(options.baseUrl===undefined||options.baseUrl===null||options.baseUrl===""){
        //         options.baseUrl=vue.tools.ajaxAddress.defaultUrl
        //     }
        //     //成功回调
        //     if(options.success===undefined||options.success===null||options.success===""){
        //         console.error("成功回调未定义");
        //         options.success=(res)=>{
        //             console.log(res);
        //         };
        //     }
        //     //中间出现错误的回调
        //     // if(options.fail===undefined||options.fail===null||options.fail===""){
        //     //     console.error("失败回调未定义");
        //     //     options.success=(res)=>{
        //     //
        //     //     };
        //     // }
        //     //统一执行的错误回调
        //     options.fail=(err)=>{
        //         console.log(err);
        //         alert(err);
        //         vue.tools.globalFn.publicToastFn(vue,"网络错误，请稍后再试");
        //     };
        //     //判断是否是需要登录的操作
        //     if(options.needLogin===true||options.needLogin===undefined||options.needLogin===""||options.needLogin===null){
        //         // alert("需要登录");
        //         //如果是需要登录的操作并且目前是线上模式并且尚未登录
        //         if(vue.tools.globalFn.isLoginFn(vue)===false&&vue.tools.globalFn.regDevModeFn(vue)===1){
        //             //那么直接跳转登录
        //             vue.$bridge.callHandler("toLogin");
        //         }
        //         //如果需要登录，且也已经登录
        //         else if(vue.tools.globalFn.isLoginFn(vue)===true){
        //             // alert("确认是已经登录");
        //             //那么判断是否需要header
        //             if(options.headerNeed===undefined||options.headerNeed===null||options.headerNeed===""){
        //                 //因为是商城，默认传递需要header
        //                 vue.axios({
        //                     url:options.baseUrl+options.url,
        //                     method:options.method,
        //                     headers:{
        //                         "Fecshop-Uuid":JSON.parse(localStorage.shopSaveObject).uuid,
        //                         "Access-Token":JSON.parse(localStorage.shopSaveObject).shopToken
        //                     },
        //                     params:options.params,
        //                     data:options.data
        //                 })
        //                     .then(options.success)
        //                     .catch(options.fail)
        //             }
        //             //如果需要header,那么也传递
        //             else if(options.headerNeed==="need"){
        //                 // alert("need");
        //                 vue.axios({
        //                     url:options.baseUrl+options.url,
        //                     method:options.method,
        //                     headers:{
        //                         "Fecshop-Uuid":JSON.parse(localStorage.shopSaveObject).uuid,
        //                         "Access-Token":JSON.parse(localStorage.shopSaveObject).shopToken
        //                     },
        //                     params:options.params,
        //                     data:options.data
        //                 })
        //                     .then(options.success)
        //                     .catch(options.fail)
        //             }
        //             //如果不需要header，那么就不传递
        //             else if(options.headerNeed==="noNeed"){
        //                 // alert("noNeed");
        //                 vue.axios({
        //                     url:options.baseUrl+options.url,
        //                     method:options.method,
        //                     // headers:{
        //                     //     "Fecshop-Uuid":JSON.parse(localStorage.shopSaveObject).uuid,
        //                     //     "Access-Token":JSON.parse(localStorage.shopSaveObject).shopToken
        //                     // },
        //                     params:options.params,
        //                     data:options.data
        //                 })
        //                     .then(options.success)
        //                     .catch(options.fail)
        //             }
        //         }
        //         //如果是需要登录的操作并且目前是线下模式并且尚未登录(用于调试)
        //         else if(vue.tools.globalFn.isLoginFn(vue)===false&&vue.tools.globalFn.regDevModeFn(vue)===0){
        //             //如果headerNeed是空的那么就手动配置请求(用于调试和开发)
        //             if(options.headerNeed===undefined||options.headerNeed===null||options.headerNeed===""){
        //                 //因为这是商城，所以默认就给传递上
        //                 vue.axios({
        //                     url:options.baseUrl+options.url,
        //                     method:options.method,
        //                     headers:{
        //                         "Fecshop-Uuid":"dd252400-ff49-11e8-818a-00163e0561ee",
        //                         "Access-Token":"RqENyMUbpT15foUHSevoSPc2CuahODpR"
        //                     },
        //                     params:options.params,
        //                     data:options.data
        //                 })
        //                     .then(options.success)
        //                     .catch(options.fail)
        //             }
        //             else if(options.headerNeed==="need"){
        //                 //如果需要，那么直接传上
        //                 vue.axios({
        //                     url:options.baseUrl+options.url,
        //                     method:options.method,
        //                     headers:{
        //                         "Fecshop-Uuid":"dd252400-ff49-11e8-818a-00163e0561ee",
        //                         "Access-Token":"RqENyMUbpT15foUHSevoSPc2CuahODpR"
        //                     },
        //                     params:options.params,
        //                     data:options.data
        //                 })
        //                     .then(options.success)
        //                     .catch(options.fail)
        //             }
        //             else if(options.headerNeed==="noNeed"){
        //                 //如果不需要，那么不传
        //                 vue.axios({
        //                     url:options.baseUrl+options.url,
        //                     method:options.method,
        //                     // headers:{
        //                     //     "Fecshop-Uuid":"dd252400-ff49-11e8-818a-00163e0561ee",
        //                     //     "Access-Token":"RqENyMUbpT15foUHSevoSPc2CuahODpR"
        //                     // },
        //                     params:options.params,
        //                     data:options.data
        //                 })
        //                     .then(options.success)
        //                     .catch(options.fail)
        //             }
        //         }
        //     }
        //     //如果是不需要登录的请求
        //     else if (options.needLogin===false){
        //         //那直接请求就完事了
        //         vue.axios({
        //             url:options.baseUrl+options.url,
        //             method:options.method,
        //             // headers:{
        //             //     "Fecshop-Uuid":"dd252400-ff49-11e8-818a-00163e0561ee",
        //             //     "Access-Token":"RqENyMUbpT15foUHSevoSPc2CuahODpR"
        //             // },
        //             params:options.params,
        //             data:options.data
        //         })
        //             .then(options.success)
        //             .catch(options.fail)
        //     }
        // },
        // publicAxiosFn(vue,url,method="get",params,data,successFn,failFn){
        //     vue.axios({
        //         url:vue.tools.ajaxAddress.defaultUrl+url,
        //         method:method,
        //         headers:{
        //             "Fecshop-Uuid":localStorage.getItem("uuid"),
        //             "Access-Token":localStorage.getItem("userToken")
        //         },
        //         params:params,
        //         data:data
        //     })
        //         .then(successFn)
        //         .catch(failFn)
        // },
        //通用的加载等待的方法(全屏，无法操作)
        // publicFullScreenLoadingFn(vue,msg,time,mask){
        //     vue.$toast.loading({
        //         message:msg,
        //         mask:mask,
        //         duration:time
        //     });
        // },
        //商城秒杀需要的日期
        getDate(ms) {
            let time = new Date(ms);
        // return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + "/ " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
            return (time.getMonth() + 1) + "月" + time.getDate() + "日";
        },
        //商城秒杀需要的时间点
        getTime (ms) {
            let time = new Date(ms);
            let hours=time.getHours();
            let minutes=time.getMinutes();
            //小时
            if(hours.toString().length===1){
                hours="0"+hours;
            }
            //分钟
            if(minutes.toString().length===1){
                minutes="0"+minutes;
            }
            return hours + ":" + minutes;
        },
        //返回年月日的方法(优惠券显示使用)
        returnDateForCoupon(ms){
            // console.log(ms);
            // console.log(ms);
            let time=new Date(parseInt(ms*1000));
            // console.log(time);
            // console.log(time);
            return time.getFullYear()+"-"+(time.getMonth() + 1)+"-"+time.getDate();
        },
        //公共的吐司方法
        publicToastFn(vue,msg='网络错误',time=500){
            vue.$toast({
                message:msg,
                duration:time
            });
        },
        //公共的跳转某一商品详情页的方法
        publicLinkToGoodContentFn(id,vue){
            console.log(id);
            console.log("跳转详情");
            // vue.$router.push({name:"goodsContent",params:{id:id}});
            vue.$router.push("/goods/"+id);
        },
        //公共的跳转某一店铺中心的方法
        publicLinkToShopCenterFn(id,vue){
            vue.$router.push("/shopCenter/index/"+id);
        },
        //验证手机号的方法
        regPhoneNumFn(phone){
            // let reg=/^1[34578]\d{9}$/;
            return /^1[34578]\d{9}$/.test(phone);
        }
    };
    export default {
        ajaxAddress,
        globalFn,
        publicDataSave
    }
</script>