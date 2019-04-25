<template>
    <div class="publicAllContentBg" id="searchPage">
        <!--头部导航-->
        <van-nav-bar class="globalNavBarHeaderClass"
                     @click-left="backLastPage"
                     @click-right="searchConfirm"
                     fixed
        >
            <van-icon name="arrow-left" slot="left" class="globalNavBarIconClass"></van-icon>
            <van-field left-icon="search" placeholder="搜索你想要的" slot="title" v-model="userSearchVal" clearable></van-field>
            <!--<van-icon name="search" slot="right" style="color: #fafafa" @click="searchConfirm"></van-icon>-->
            <span slot="right" class="globalNavBarIconClass text">搜索</span>
        </van-nav-bar>
        <!--热门搜索-->
        <div class="hotSearchKeywordBox">
            <p class="header">热门搜索</p>
            <ul class="list">
                <li v-for="(item,index) in hotSearchData" :key="index">
                    <p @click="publicSearchWordFn(item)">{{item}}</p>
                </li>
            </ul>
            <p class="noContent" v-if="hotSearchData.length===0">暂无历史</p>
        </div>
        <!--历史搜索-->
        <div class="historySearchBox">
            <p class="header">历史搜索</p>
            <!--<van-cell-group v-if="searchHistoryData.length>0">-->
            <!--<van-cell :value="item.name" v-for="item in searchHistoryData" is-link @click="wordSearchFn(item)"></van-cell>-->
            <!--</van-cell-group>-->
            <!--<van-cell-swipe  :right-width="65" v-for="item in searchHistoryData" :key="item.id">-->
                <!--&lt;!&ndash;<span slot="left">选择</span>&ndash;&gt;-->
                <!--<van-cell :title="item.name"></van-cell>-->
                <!--<span slot="right" class="delButton" @click="delThisHistory(item)">删除</span>-->
            <!--</van-cell-swipe>-->
            <van-swipe-cell :right-width="65" v-for="(item,index) in searchHistoryData" :key="index">
                    <van-cell :title="item.search_text" @click="publicSearchWordFn(item.search_text)"></van-cell>
                    <span slot="right" class="delButton" @click="delThisHistory(item)">删除</span>
            </van-swipe-cell>
            <p class="noContent" v-if="searchHistoryData.length===0">暂无历史</p>
        </div>
        <!--清空历史记录按钮-->
        <div class="clearHistoryBox" v-if="searchHistoryData.length>0">
            <!--<div class="clearHistoryBox">-->
            <van-button size="large" @click="clearHistoryFn()">
                <van-icon name="delete" style="margin-right: 6px;vertical-align:sub;"></van-icon>清空历史
            </van-button>
        </div>
        <!--确认组件-->
        <van-dialog v-model="confirmShowStatus" message="是否清空历史记录" show-cancel-button @confirm="clearHistoryConfirm" @cancel="clearHistoryCancel">
        </van-dialog>
    </div>
</template>

<script>
    export default {
        name: 'orderList',
        data() {
            return {
                //确认组件是否显示
                confirmShowStatus: false,
                //用户输入的搜索值
                userSearchVal: "",
                //热门搜索数据
                hotSearchData: [],
                //历史搜索数据
                searchHistoryData: []
            }
        },
        methods: {
            //通用的搜索方法
            publicSearchWordFn(val,type){
                console.log(val);
                // console.log(type);
                //val:搜索值
                //type：为1是热门搜索，传递的是字符串；2是历史搜索，传递字符串
                this.tools.globalFn.publicChangeLocalStorageFn("globalSearchVal",JSON.stringify({
                    type:"keyword",
                    val:val
                }),"add");
                //跳转到搜索结果页面
                this.$router.push({name:"searchResult"});
            },
            //历史记录搜索
            historySearchFn(item){
                console.log(item);
            },
            //删除某一条历史记录
            delThisHistory(item){
                console.log(item);
                //删除单个历史记录
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/catalogsearch/index/delsearch",
                    needLogin:true,
                    data:{
                        search_id:item.search_id
                    },
                    success:(res)=>{
                        if(res.data.code===200){
                            //删除指定历史记录
                            this.searchHistoryData.splice(this.searchHistoryData.indexOf(item),1);
                        }
                    }
                });
            },
            //关闭前的函数
            // beforeCloseFn(act, done) {
            //     console.log(act);
            //     if(act === "cancel") {
            //         done();
            //     } else {
            //         done(false);
            //     }
            // },
            //确认清空历史记录
            clearHistoryConfirm() {
                console.log("确认");
                //请求删除所有历史搜索
                this.tools.globalFn.publicAxiosFn(this,{
                    url:"/catalogsearch/index/delsearch",
                    needLogin:true,
                    success:(res)=>{
                        if(res.data.code===200){
                            //清空历史记录
                            this.searchHistoryData=[];
                        }
                    }
                });
            },
            //取消清空历史记录
            clearHistoryCancel() {
                console.log("取消");
            },
            //清空历史记录的方法
            clearHistoryFn() {
                this.confirmShowStatus = true;
                //					vm.$dialog.confirm({
                //							message: '是否确认清空历史记录?',
                //							beforeClose: function(action, done) {
                //								console.log(action);
                //								done(false);
                //							}
                //						})
                //						.then(function() {
                //							console.log("确认");
                //							//请求完了重新渲染然后关闭
                //						})
                //						.catch(function() {
                //							console.log("取消");
                //							//关闭窗口
                //							vm.$dialog.close();
                //						})
            }, //点击热门搜索或历史进行搜索的方法
            wordSearchFn(obj) {
                // console.log(obj);
                // localStorage.setItem("globalSearchVal",JSON.stringify({
                //     val:obj.name,
                //     type:"keyword"
                // }));
                // //跳转到搜索结果页面
                // this.$router.push({name:"searchResult"});
            },
            //返回上一页的方法
            backLastPage() {
               this.$router.go(-1);
            },
            //通过输入关键字进行搜索
            searchConfirm() {
                console.log(this.userSearchVal);
                if(this.userSearchVal===""){
                    this.tools.globalFn.publicToastFn(this,"搜索值不能为空");
                    return false;
                }
                this.publicSearchWordFn(this.userSearchVal);
                // //存储到全局搜索的字段里
                // localStorage.setItem("globalSearchVal",JSON.stringify({
                //     val:this.userSearchVal,
                //     type:"keyword"
                // }));
                // console.log(localStorage);
                // //跳转到搜索结果页面
                // this.$router.push({name:"searchResult"});
            },
            //初始化数据
            getFirstData(){
                //已经登录且是线上模式
                if(this.tools.globalFn.isLoginFn()===true&&this.$store.state.isDevMode===0){
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin:true,
                        url:"/catalogsearch/index/searchrecord",
                        data:{
                            //热门搜索条数
                            hotNumPerPage:10,
                            //搜索记录条数
                            userNumPerPage:10
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //放置热门搜索
                                this.hotSearchData=res.data.data.hotSearch;
                                //放置用户搜索历史
                                this.searchHistoryData=res.data.data.userSearch;
                            }
                        }
                    });
                }
                //没登录且是线上模式
                else if(this.tools.globalFn.isLoginFn()===false&&this.$store.state.isDevMode===0){
                    this.tools.globalFn.publicAxiosFn(this,{
                        // needLogin:true,
                        url:"/catalogsearch/index/searchrecord",
                        data:{
                            //热门搜索条数
                            hotNumPerPage:10,
                            //搜索记录条数
                            userNumPerPage:10
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //放置热门搜索
                                this.hotSearchData=res.data.data.hotSearch;
                                //放置用户搜索历史
                                this.searchHistoryData=res.data.data.userSearch;
                            }
                        }
                    });
                }
                else{
                    this.tools.globalFn.publicAxiosFn(this,{
                        needLogin:true,
                        url:"/catalogsearch/index/searchrecord",
                        data:{
                            //热门搜索条数
                            hotNumPerPage:10,
                            //搜索记录条数
                            userNumPerPage:10
                        },
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //放置热门搜索
                                this.hotSearchData=res.data.data.hotSearch;
                                //放置用户搜索历史
                                this.searchHistoryData=res.data.data.userSearch;
                            }
                        }
                    });
                }

            }
        },
        created() {
            this.getFirstData();
        },
        mounted() {

        },
        watch: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .hotSearchKeywordBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 10px;
    }

    .hotSearchKeywordBox>p.header {
        width: 100%;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 6px;
    }

    .hotSearchKeywordBox>ul.list {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
    }

    .hotSearchKeywordBox>ul.list li {
        float: left;
        padding-right: 10px;
        padding-bottom: 10px;
    }

    .hotSearchKeywordBox>ul.list li p {
        padding: 4px 8px;
        color: #666;
        border-radius: 50px;
        background-color: #eaeaea;
        /*border: 1px solid #999;*/
        font-size: 14px;
    }

    .historySearchBox {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        margin-bottom: 20px;
    }

    .historySearchBox>p.header {
        width: 100%;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 6px;
        padding: 0 10px;
    }

    .historySearchBox p.noContent,.hotSearchKeywordBox p.noContent {
        text-align: center;
        color: #999;
        font-size: 14px;
    }

    .clearHistoryBox {
        width: 90%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        margin: auto;
        margin-bottom: 20px;
    }


    .delButton{
        color: #FFFFFF;
        font-size: 15px;
        width: 65px;
        height: 44px;
        display: inline-block;
        text-align: center;
        line-height: 44px;
        background-color: #F44;
    }
</style>
