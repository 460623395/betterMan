// function setupWebViewJavascriptBridge(callback) {
//   if (window.WebViewJavascriptBridge) {
//     return callback(window.WebViewJavascriptBridge)
//   }
//   if (window.WVJBCallbacks) {
//     return window.WVJBCallbacks.push(callback)
//   }
//   window.WVJBCallbacks = [callback]
//   let WVJBIframe = document.createElement('iframe')
//   WVJBIframe.style.display = 'none'
//   WVJBIframe.src = 'https://__bridge_loaded__'
//   document.documentElement.appendChild(WVJBIframe)
//   setTimeout(() => {
//     document.documentElement.removeChild(WVJBIframe)
//   }, 0)
// }
//
// export default {
//   callhandler(name, data, callback) {
//     setupWebViewJavascriptBridge(function (bridge) {
//       bridge.callHandler(name, data, callback)
//     })
//   }, registerhandler(name, callback) {
//     setupWebViewJavascriptBridge(function (bridge) {
//       bridge.registerHandler(name, function (data, responseCallback) {
//         callback(data, responseCallback)
//       })
//     })
//   }
// }
let JsBridge = {
    init(callback) {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (!isiOS) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady',
                    ()=> {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        } else {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            let WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(()=> {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }
    },

    first() {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (!isiOS) {
            let _this = this;
            _this.init((bridge)=> {
                bridge.init(function(message, responseCallback) {
                    responseCallback(data);
                })
            })
        }
    },

    registerHandler: function(name, fun) {
        let _this = this;
        _this.init((bridge)=> {
            bridge.registerHandler(name, fun);
        })
    },

    callHandler: function(name, data, fun) {
        let _this = this;
        _this.init((bridge) =>{
            bridge.callHandler(name, data, fun);
        })
    }
}

JsBridge.first();


export default JsBridge