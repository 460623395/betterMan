//这是web前端调用的方法
function remindClientTabbarStatusFn(val){
    console.log(val);
    hideBar("true");
}
//这是客户端需要的方法
function hideBar(val) {
    console.log(val);
}

export default {remindClientTabbarStatusFn, hideBar}