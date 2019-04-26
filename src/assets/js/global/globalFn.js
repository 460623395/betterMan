//获取时间戳的方法
var shoppingMallTools={
    //商城秒杀需要的日期
    getDate:function (ms) {
        var time=new Date(ms);
        // return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + "/ " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        return (time.getMonth() + 1)+"月"+time.getDate()+"日";
    },
    //商城秒杀需要的时间点
    getTime:function (ms) {
        var time=new Date(ms);
        return time.getHours()+":"+time.getMinutes();
    },

};