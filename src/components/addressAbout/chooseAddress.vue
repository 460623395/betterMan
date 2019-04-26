<template>
    <div class="publicAllContentBg" id="selectAddressList">
        <!--头部导航-->
        <van-nav-bar title="收货地址设置" class="globalNavBarHeaderClass"
                     left-arrow
                     left-text="返回"
                     @click-left="backLastPage"
                     fixed
        >
            <!--<van-icon name="arrow-left" slot="left" style="color: #fafafa" @click="backLastPage"></van-icon>-->
        </van-nav-bar>
        <!--地址列表-->
        <div class="addressListBg">
            <van-loading type="spinner" color="black" v-if="addressOptions.addressListLoadingStatus===false"
                         class="globalLoadingAnmClass"></van-loading>
            <van-address-list
                    v-model="addressOptions.chosenAddressId"
                    :list="addressOptions.list"
                    @add="onAdd"
                    @edit="onEdit"
                    v-if="addressOptions.addressListLoadingStatus===true"
            ></van-address-list>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'selectAddressList',
        data() {
            return {
                //收货地址相关信息
                addressOptions:{
                    //目前加载状态
                    addressListLoadingStatus:false,
                    //目前选中的地址
                    chosenAddressId:"",
                    //地址列表
                    list:[
                        // {
                        //     id: '1',
                        //     name: '张三',
                        //     tel: '13000000000',
                        //     address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                        //     sex:"1",
                        //     addressInfo:{
                        //         province:{
                        //             id:1,
                        //             title:"山东省"
                        //         },
                        //         city:{
                        //             id:2,
                        //             title:"济南市"
                        //         },
                        //         area:{
                        //             id:3,
                        //             title:"槐荫区"
                        //         },
                        //         detail:"泰安路恒大雅苑10号楼1101"
                        //     },
                        //     isDefault:false
                        // },
                    ]
                }
            }
        },
        methods: {
            //点击新增的方法
            onAdd(){
                console.log("点击新增");
                this.$router.push({name:"addAddress"});
            },
            //点击编辑的方法
            onEdit(item,index){
                console.log("点击编辑");
                console.log(item);
                console.log(index);
                //把这段信息存储到localStorage里
                // sessionStorage.setItem('editAddressContent',JSON.stringify(item));
                this.$router.push({name:"editAddress",params:{id:item.id}});
            },
            //选中地址的方法
            onSelect(item,index){
                console.log(item);
                console.log(index);
                //弹窗，是否需要切换默认地址
                this.$dialog.confirm({
                    title:"切换确认",
                    message:"是否切换默认地址"
                })
                    .then(()=>{
                        //走接口，已经是选中地址
                        this.tools.globalFn.publicAxiosFn(this,{
                            needLogin:true,
                            url:"/customer/address/check",
                            method:"POST",
                            data:{
                                address_id:item.id
                            },
                            success:(res)=>{
                                if(res.data.code===200){
                                    //重新开始加载动画
                                    this.addressOptions.addressListLoadingStatus=false;
                                    //清空地址
                                    this.addressOptions.list=[];
                                    //清空选中
                                    this.addressOptions.chosenAddressId=index;
                                    //重新请求渲染页面
                                    this.getFirstData();
                                }
                            },
                            fail:(err)=>{
                                console.log(err);
                            }
                        })
                    })
                    .catch(()=>{

                    })
                // this.$toast({
                //     message:"已设置为默认地址",
                //     duration:500
                // });

            },
            //返回上一页的方法
            backLastPage() {
                this.$router.go(-1);
            },
            //初始化数据
            getFirstData(){
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin:true,
                        url:"/customer/address/index",
                        success:(res)=>{
                            console.log(res);
                            for(let key in res.data.data.addressList) {
                                // alert(res.data.data.addressList[key].last_checked);
                                // let obj = {
                                //     id: res.data.data.addressList[key].address_id,
                                //     name: res.data.data.addressList[key].first_name,
                                //     tel: res.data.data.addressList[key].telephone,
                                //     address: res.data.data.addressList[key].state + res.data.data.addressList[key].city + res.data.data.addressList[key].district + res.data.data.addressList[key].street1,
                                //     sex: res.data.data.addressList[key].gender,
                                //     // addressInfo:{
                                //     //     province:{
                                //     //         id:1,
                                //     //         title:"山东省"
                                //     //     },
                                //     //     city:{
                                //     //         id:2,
                                //     //         title:"济南市"
                                //     //     },
                                //     //     area:{
                                //     //         id:3,
                                //     //         title:"槐荫区"
                                //     //     },
                                //     //     detail:"泰安路恒大雅苑10号楼1101"
                                //     // },
                                //     isDefault: res.data.data.addressList[key].is_default,
                                //     last_checked:res.data.data.addressList[key].last_checked
                                // };
                                //先循环放数据
                                this.addressOptions.list.push({
                                    id: res.data.data.addressList[key].address_id,
                                    name: res.data.data.addressList[key].first_name,
                                    tel: res.data.data.addressList[key].telephone,
                                    address: res.data.data.addressList[key].state + res.data.data.addressList[key].city + res.data.data.addressList[key].district + res.data.data.addressList[key].street1,
                                    sex: res.data.data.addressList[key].gender,
                                    // addressInfo:{
                                    //     province:{
                                    //         id:1,
                                    //         title:"山东省"
                                    //     },
                                    //     city:{
                                    //         id:2,
                                    //         title:"济南市"
                                    //     },
                                    //     area:{
                                    //         id:3,
                                    //         title:"槐荫区"
                                    //     },
                                    //     detail:"泰安路恒大雅苑10号楼1101"
                                    // },
                                    isDefault: res.data.data.addressList[key].is_default,
                                    last_checked:res.data.data.addressList[key].last_checked
                                });

                            }
                            //再次循环弄选中
                            for(let item of this.addressOptions.list){
                                // alert("是否已经选中"+item.last_checked);
                                // alert("是否为默认地址"+item.isDefault);
                                if(item.last_checked==="1"){
                                    //如果是默认且选中，那就选中
                                    // this.tools.globalFn.publicToastFn(this,"从已经选中的获取");
                                    //先判断如果有已经选中的，就直接把选中id换成这个
                                    this.addressOptions.chosenAddressId = item.id;
                                    break;
                                }
                                else if(item.last_checked==="0"){
                                    //如果没有已经选中的，就把默认地址默认选中
                                    if (item.isDefault ==="1"){
                                        // this.tools.globalFn.publicToastFn(this,"没有选中的，所以放默认的");
                                        this.addressOptions.chosenAddressId = item.id;
                                    }
                                    else if(item.isDefault ==="0"){
                                        //如果没有默认地址且没有选中的，直接放第一个
                                        this.addressOptions.chosenAddressId=this.addressOptions.list[0].id;
                                    }
                                }
                            }
                            //存储地址列表的个数
                            this.tools.globalFn.publicChangeLocalStorageFn("userAddressListLength",this.addressOptions.list.length,"edit");
                            // localStorage.userAddressListLength=this.addressOptions.list.length;
                            //关闭加载动画
                            this.addressOptions.addressListLoadingStatus=true;
                            // console.log("打印addressid");
                            // console.log(this.addressOptions.chosenAddressId);
                            // console.log("打印本地数据");
                            // console.log(this.addressOptions.list);
                        },
                        fail:(err)=>{
                            console.log(err);
                        }
                    }
                )
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
    .addressListBg{
        width: 100%;
        height: auto;
        min-height: 50px;
        /*position: relative;*/
    }
</style>
