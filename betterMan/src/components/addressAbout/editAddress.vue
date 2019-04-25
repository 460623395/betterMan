<template>
    <div class="publicAllContentBg" id="addressEdit">
        <!--头部导航-->
        <van-nav-bar title="编辑地址" class="globalNavBarHeaderClass"
                     left-text="返回"
                     left-arrow
                     @click-left="backLastPage"
                     @click-right="delThisAddress"
                     fixed
        >
            <!--<van-icon name="arrow-left" slot="left" style="color: #fafafa" @click="backLastPage"></van-icon>-->
            <van-icon name="delete" slot="right" class="globalNavBarIconClass"></van-icon>
        </van-nav-bar>
        <div class="editAddressBg">
            <!--加载动画-->
            <van-loading type="spinner" color="black" v-if="editDataLoadingStatus===false"
                         class="globalLoadingAnmClass"></van-loading>
            <!--编辑地址-->
            <van-cell-group v-if="editDataLoadingStatus===true">
                <van-field
                        v-model="addressData.name"
                        label="收货人"
                        placeholder="请输入收货人姓名"
                />
                <van-cell>
                    <van-radio name="1" slot="title" v-model="addressData.sex" style="margin-right: 10px">先生</van-radio>
                    <van-radio name="0" slot="title" v-model="addressData.sex" >女士</van-radio>
                    <!--<van-icon slot="right-icon" name="search" class="van-cell__right-icon" />-->
                </van-cell>
                <van-field
                        v-model="addressData.tel"
                        label="电话号码"
                        placeholder="请输入联系电话"
                />
                <van-field
                        label="所在地区"
                        placeholder="请选择所在地区"
                        :value="returnChooseAddress"
                        readonly
                        @click="popupStatus=true"
                />
                <van-field
                        v-model="addressData.addressInfo.detail"
                        label="详细地址"
                        placeholder="请填写详细地址，需要精确到门牌号"
                        type="textarea"
                        row="1"
                        autosize
                />
                <van-cell title="是否设为默认地址">
                    <van-switch v-model="addressData.isDefault" slot="right-icon"/>
                </van-cell>
            </van-cell-group>
            <!--确认编辑按钮-->
            <div class="editConfirmButton" @click="editConfirm" v-if="editDataLoadingStatus===true">确认编辑</div>
        </div>
        <!--选择省市区的弹窗-->
        <!--<van-popup v-model="popupStatus" position="bottom" :overlay="true">-->
            <!--<van-picker-->
                    <!--show-toolbar-->
                    <!--title="选择地区"-->
                    <!--:columns="pickerData"-->
                    <!--@cancel="onCancel"-->
                    <!--@confirm="onConfirm"-->
                    <!--@change="onChange"-->
                    <!--:loading="pickerStatus"-->
                    <!--refs="picker"-->
            <!--/>-->
        <!--</van-popup>-->
        <!--省市区选择-->
        <van-popup v-model="popupStatus" position="bottom" :overlay="true">
            <van-area :area-list="areaAboutInfo.showData" @confirm="selectAreaConfirm" @cancel="popupStatus=false"></van-area>
        </van-popup>
    </div>

</template>

<script>
    import AreaList from "../../assets/lib/area"
    export default {
        name: 'addressEdit',
        data() {
            return {
                //省市区相关信息
                areaAboutInfo:{
                    //是否显示
                    showStatus:false,
                    //用来展示的数据
                    showData:AreaList
                },
                //编辑地址信息是否已经加载完成
                editDataLoadingStatus:false,
                //省市区信息(本地存储)
                cityData:{
                    province:[],
                    city:[],
                    area:[]
                },
                //省市区信息(给picker示例显示)
                pickerData:[
                    //0是省
                    {
                        values:[],
                        defaultIndex:0,
                        className:""
                    },
                    //1是市
                    {
                        values:[],
                        defaultIndex:0,
                        className:""
                    },
                    //2是区
                    {
                        values:[],
                        defaultIndex:0,
                        className:""
                    }
                ],
                //选择省市区弹窗是否显示
                popupStatus:false,
                //省市区是否在加载中
                pickerStatus:false,
                //收货地址相关信息
                addressData:{
                    id: '',
                    name: '',
                    tel: '',
                    // address: '浙江省杭州市拱墅区莫干山路 50 号',
                    addressInfo:{
                        province:{
                            id:"",
                            title:""
                        },
                        city:{
                            id:"",
                            title:""
                        },
                        area:{
                            id:"",
                            title:""
                        },
                        detail:""
                    },
                    sex:"1",
                    //是否是默认地址
                    isDefault:false
                },
                //最终提交的信息
                finalNeedAddress:{

                }
            }
        },
        computed:{
            returnChooseAddress(){
                console.log(this.addressData.addressInfo);
                return this.addressData.addressInfo.province.title+this.addressData.addressInfo.city.title+this.addressData.addressInfo.area.title;
            }
        },
        methods: {
            //确认选择省市区的方法
            selectAreaConfirm(arr){
                console.log(arr);
                //放置省
                this.addressData.addressInfo.province.title=arr[0].name;
                //放置市
                this.addressData.addressInfo.city.title=arr[1].name;
                //放置区
                this.addressData.addressInfo.area.title=arr[2].name;
                // this.releaseReqForm.address=arr.map((currentValue,index,arr)=>{
                //     return currentValue.name;
                // }).join("");
                //关闭弹窗
                this.popupStatus=false;
            },
            //确认编辑此地址
            editConfirm(){
                //验证是否填写
                if(this.addressData.name===""||this.addressData.name===null){
                    this.tools.globalFn.publicToastFn(this,"请填写联系人姓名");
                    return false;
                }
                else if(this.addressData.sex===""||this.addressData.sex===null){
                    this.tools.globalFn.publicToastFn(this,"请选择性别");
                    return false;
                }
                else if(this.tools.globalFn.regPhoneNumFn(this.addressData.tel)===false){
                    this.tools.globalFn.publicToastFn(this,"请填写联系电话");
                    return false;
                }
                else if(this.addressData.addressInfo.province.title===""||this.addressData.addressInfo.province.title===null){
                    this.tools.globalFn.publicToastFn(this,"请选择省");
                    return false;
                }
                else if(this.addressData.addressInfo.city.title===""||this.addressData.addressInfo.city.title===null){
                    this.tools.globalFn.publicToastFn(this,"请选择市");
                    return false;
                }
                // else if(this.addressData.addressInfo.area.id===""||this.addressData.addressInfo.area.id===null){
                //     this.tools.globalFn.publicToastFn(this,"请选择区");
                //     return false;
                // }
                else if(this.addressData.addressInfo.detail===""||this.addressData.addressInfo.detail===null){
                    this.tools.globalFn.publicToastFn(this,"请填写详细地址");
                    return false;
                }
                //验证通过
                //联系人姓名
                this.finalNeedAddress.first_name=this.addressData.name;
                //联系人性别
                this.finalNeedAddress.gender=this.addressData.sex;
                //电话
                this.finalNeedAddress.telephone=this.addressData.tel;
                //省
                this.finalNeedAddress.addressState=this.addressData.addressInfo.province.title;
                //市
                this.finalNeedAddress.city=this.addressData.addressInfo.city.title;
                //区
                this.finalNeedAddress.district=this.addressData.addressInfo.area.title;
                //详细地址
                this.finalNeedAddress.street1=this.addressData.addressInfo.detail;
                //是否默认地址判断
                if(this.addressData.isDefault===true){
                    this.finalNeedAddress.isDefaultActive="1";
                }
                else if(this.addressData.isDefault===false){
                    this.finalNeedAddress.isDefaultActive="0";
                }
                console.log(this.finalNeedAddress);
                //判断一下该用户的地址列表长度是否为1，如果是0把当前新增的设置为默认
                if(localStorage.userAddressListLength==="1"){
                    this.finalNeedAddress.isDefaultActive=1;
                }
                //走接口提交
                //加载动画
                this.tools.globalFn.publicFullScreenLoadingFn(this);
                //提交编辑
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin:true,
                        url:"/customer/address/save",
                        data:this.finalNeedAddress,
                        success:(res)=>{
                            console.log(res);
                            if(res.data.code===200){
                                //关闭动画
                                this.$toast.clear();
                                this.tools.globalFn.publicToastFn(this,"修改成功");
                                //返回上一页
                                this.$router.go(-1);
                            }
                            else {
                                //关闭动画
                                this.$toast.clear();
                                this.tools.globalFn.publicToastFn(this,"修改失败");
                            }
                        },
                        fail:(err)=>{
                            console.log(err);
                        }
                    }
                );
                // this.tools.globalFn.publicAxiosFn(this,"/customer/address/save","POST",{},this.finalNeedAddress,
                //     (res)=>{
                //         console.log(res);
                //         if(res.data.code===200){
                //             //关闭动画
                //             this.$toast.clear();
                //             this.tools.globalFn.publicToastFn(this,"修改成功");
                //
                //         }
                //         else {
                //             //关闭动画
                //             this.$toast.clear();
                //             this.tools.globalFn.publicToastFn(this,"修改失败");
                //         }
                //     },
                //     (err)=>{
                //         console.log(err);
                //     }
                // )
                // this.axios({
                //     url:this.tools.ajaxAddress.defaultUrl+"/customer/address/save",
                //     method:"POST",
                //     data:this.finalNeedAddress
                // })
                //     .then(res=>{
                //         console.log(res);
                //         if(res.data.code===200){
                //             this.tools.globalFn.publicToastFn(this,"添加成功");
                //         }
                //         else {
                //             this.tools.globalFn.publicToastFn(this,"添加失败");
                //         }
                //     })
                //     .catch(err=>{
                //         console.log(err);
                //     })
            },
            //删除此条地址
            delThisAddress(){
                console.log("删除开始");
                this.$dialog.confirm({
                    message: '是否删除'
                })
                    .then(()=>{
                        //
                        // console.log("用户确认删除");
                        // alert("用户确认删除");
                        //进行删除操作
                        this.tools.globalFn.publicFullScreenLoadingFn(this);
                        //执行加载动画
                        // this.tools.globalFn.publicAxiosFn(this,"/customer/address/remove","POST",{},
                        //     {
                        //         address_id:this.$route.params.id
                        //     },
                        //     (res)=>{
                        //         console.log(res);
                        //         if(res.data.code==200){
                        //             //删除成功
                        //             console.log("删除成功");
                        //             //关闭动画
                        //             this.$toast.clear();
                        //             //跳转到列表页面
                        //             this.$router.go(-1);
                        //         }
                        //     },
                        //     (err)=>{
                        //
                        //     }
                        // );
                        //请求
                        this.tools.globalFn.publicAxiosFn(this,
                            {
                                needLogin:true,
                                url:"/customer/address/remove",
                                data:{
                                    address_id:this.$route.params.id
                                },
                                success:(res)=>{
                                    console.log(res);
                                    // alert(res.data.code);
                                    if(res.data.code===200){
                                        //删除成功
                                        this.tools.globalFn.publicToastFn(this,"删除成功");
                                        //关闭动画
                                        this.$toast.clear();
                                        //跳转到列表页面
                                        this.$router.go(-1);
                                    }
                                    else{
                                        // alert(res.data.code);
                                    }
                                },
                                fail:(err)=>{
                                    console.log(err);
                                    // alert(err);
                                }
                            }
                        )
                    })
                    .catch(()=>{
                        //误操作
                    });
            },
            //省市区发生变化时触发的函数
            onChange(picker,arr,index){
                //picker：picker示例对象
                //arr:存储所有选种植的数组
                //index:当前列对应的索引
                //让picker进入加载状态
                this.pickerStatus=true;
                if(index===0){
                    //清除下级的数据
                    picker.setColumnValues(1,[]);
                    picker.setColumnValues(2,[]);
                    //拿到id
                    this.axios({
                        url:this.tools.ajaxAddress.defaultUrl+"/region/region/index",
                        method:"POST",
                        data:{
                            parent_id:this.eachGetCityIdFn(arr[0],this.cityData.province)
                        }
                    })
                        .then(res=>{
                            console.log(res);
                            //请求成功，存储到本地
                            this.cityData.city=res.data.data.coll;
                            //循环数据给picker显示
                            this.eachDataToPicker(1,res.data.data.coll,picker);
                            //让picker关闭加载状态
                            this.pickerStatus=false;
                        })
                }
                else if(index===1){
                    picker.setColumnValues(2,[]);
                    //拿到id
                    this.axios({
                        url:this.tools.ajaxAddress.defaultUrl+"/region/region/index",
                        method:"POST",
                        data:{
                            parent_id:this.eachGetCityIdFn(arr[1],this.cityData.city)
                        }
                    })
                        .then(res=>{
                            console.log(res);
                            //请求成功，存储到本地
                            this.cityData.area=res.data.data.coll;
                            this.eachDataToPicker(2,res.data.data.coll,picker);
                            //让picker关闭加载状态
                            this.pickerStatus=false;
                        })
                }
                else if(index===2){
                    //让picker关闭加载状态
                    this.pickerStatus=false;
                }
            },
            //循环放置数据给picker显示的方法
            eachDataToPicker(index,localData,picker){
                //index:需要放置的picker数组id
                //localData:本地存储的省市区数据
                //picker:picker实例
                let cityArr=[];
                for(let key in localData){
                    cityArr.push(localData[key].name);
                }
                picker.setColumnValues(index,cityArr);
                cityArr=null;
            },
            //循环拿到id的方法
            eachGetCityIdFn(city,thisCityArr){
                //city:当前这个省/市/区的名
                //thisCityArr:当前选择的省/市/区的数组
                for(let key in thisCityArr){
                    if(thisCityArr[key].name===city){
                        console.log("拿到的id为");
                        console.log(thisCityArr[key]);
                        return thisCityArr[key].id;
                    }
                }
            },
            //点击确认选择省市区的方法
            onConfirm(arr,index){
                //arr:整个已经选择的数组
                //index：所有列选中的名字索引
                console.log(arr);
                console.log(index);
                console.log("打印省这个对象");
                console.log(this.cityData.province[index[0]]);
                if(arr[0]==="北京"||arr[0]==="上海"||arr[0]==="天津"||arr[0]==="重庆"||arr[0]==="香港特别行政区"||arr[0]==="澳门特别行政区"||arr[0]==="海外"){
                    //直辖市只需要选择2个
                    if(arr[0]===undefined||arr[0]===null||arr[0]===""||arr[1]===undefined||arr[1]===null||arr[1]===""){
                        this.tools.globalFn.publicToastFn(this,"请选择完整！");
                    }
                    else{
                        //存储选择的id,然后关闭弹窗
                        //存储省
                        this.addressData.addressInfo.province.id=this.cityData.province[index[0]].id;
                        this.addressData.addressInfo.province.title=this.cityData.province[index[0]].name;
                        //存储市
                        this.addressData.addressInfo.city.id=this.cityData.city[index[1]].id;
                        this.addressData.addressInfo.city.title=this.cityData.city[index[1]].name;
                        //清空区
                        this.addressData.addressInfo.area.id="";
                        this.addressData.addressInfo.area.title="";
                        this.popupStatus=false;

                    }
                }
                else{
                    for(let key in arr){
                        if(arr[key]===undefined||arr[key]===null||arr[key]===""){
                            this.tools.globalFn.publicToastFn(this,"请选择完整！");
                            return false;
                        }
                    }
                    //存储id,关闭弹窗
                    //存储省
                    this.addressData.addressInfo.province.id=this.cityData.province[index[0]].id;
                    this.addressData.addressInfo.province.title=this.cityData.province[index[0]].name;
                    //存储市
                    this.addressData.addressInfo.city.id=this.cityData.city[index[1]].id;
                    this.addressData.addressInfo.city.title=this.cityData.city[index[1]].name;
                    //清空区
                    this.addressData.addressInfo.area.id=this.cityData.area[index[2]].id;
                    this.addressData.addressInfo.area.title=this.cityData.area[index[2]].name;
                    this.popupStatus=false;
                }
            },
            //点击取消选择省市区的方法
            onCancel(){
                this.popupStatus=false;
            },
            //点击新增的方法
            onAdd(){
                console.log("点击新增");
            },
            //点击编辑的方法
            onEdit(item,index){
                console.log("点击编辑");
                console.log(item);
                console.log(index);
            },
            //选中地址的方法
            onSelect(item,index){
                console.log(item);
                console.log(index);
                this.$toast({
                    message:"已设置为默认地址",
                    duration:500
                });
            },
            //返回上一页的方法
            backLastPage() {
                this.$router.go(-1);
            },
            //初始化数据的方法
            getFirstData(){
                //把获取到的信息存到本地
                // this.addressData=JSON.parse(sessionStorage.getItem('editAddressContent'));
                //查询该地址详情
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        needLogin:true,
                        url:"/customer/address/info",
                        data:{
                            address_id:this.$route.params.id
                        },
                        success:(res)=>{
                            console.log(res);
                            //放置源数据到本地存储
                            this.finalNeedAddress=res.data.data[0];
                            //放置到编辑框
                            //id
                            this.addressData.id=res.data.data[0].address_id;
                            //id
                            this.addressData.name=res.data.data[0].first_name;
                            //电话
                            this.addressData.tel=res.data.data[0].telephone;
                            //性别
                            if(res.data.data[0].gender==1){
                                this.addressData.sex="1";
                            }
                            else{
                                this.addressData.sex="0";
                            }
                            //省
                            this.addressData.addressInfo.province.title=res.data.data[0].addressState;
                            //市
                            this.addressData.addressInfo.city.title=res.data.data[0].city;
                            //区
                            this.addressData.addressInfo.area.title=res.data.data[0].district;
                            //详细地址
                            this.addressData.addressInfo.detail=res.data.data[0].street1;
                            //是否默认地址
                            if(res.data.data[0].is_default==1){
                                this.addressData.isDefault=true;
                            }
                            else{
                                this.addressData.isDefault=false;
                            }
                            //loading动画
                            this.editDataLoadingStatus=true;
                        },
                        fail:(err)=>{
                            console.log(err)
                        }
                    }
                );
                //查询省
                this.tools.globalFn.publicAxiosFn(this,
                    {
                        url:"/region/region/index",
                        data:{
                            parent_id:"0"
                        },
                        success:(res)=>{
                            // console.log(res);
                            if(res.data.code===200){
                                //请求成功，存储到本地
                                this.cityData.province=res.data.data.coll;
                                //循环name放到picker第一栏中
                                for(let key in res.data.data.coll){
                                    this.pickerData[0].values.push(res.data.data.coll[key].name);
                                }
                            }
                            else{
                                this.tools.globalFn.publicToastFn(this);
                            }
                        },
                        fail:(err)=>{
                            console.log(err)
                        }
                    }
                );
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
    .editConfirmButton{
        width: 90%;
        height: auto;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 46px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        background:linear-gradient(to right,#30aaff,#2BD0FE);
        margin: 10px auto 0 auto;
        border-radius: 50px;
    }
</style>
