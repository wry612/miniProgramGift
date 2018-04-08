var util = require("./util.js");
const config = {
  baseUrl: "http://wangruoyu.developer.jsdttec.com",
};

//wx.request接口再封装
const dataRequest = (requestObj) => {
  wx.request({
    url: requestObj.url,
    data: requestObj.data ? requestObj.data : "",
    header: requestObj.header ? requestObj.header:{
      'content-type': 'application/json' // 默认值
    },
    method: requestObj.method ? requestObj.method : "GET",
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (requestObj.success && typeof (requestObj.success) === "function") {
        requestObj.success(res);
      }
    },
    fail: function (res) {
      if (requestObj.fail && typeof (requestObj.fail) === "function") {
        requestObj.fail(res);
      }
    },
    complete: function (res) {
      if (requestObj.complete && typeof (requestObj.complete) === "function") {
        requestObj.complete(res);
      }
    }
  })
}
var apiFunction = {
  login:function(doFunction){//小程序登录
    wx.login({
      success: function(res) {
        // 获取用户信息
        wx.getSetting({
          success: res1 => {
            if (res1.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                withCredentials: true,
                success: function (res2) {
                  dataRequest({
                    url: config.baseUrl + "/xcx/login",
                    method: 'GET',
                    data: { 
                      code: res.code,//服务器用来获取sessionKey的必要参数
                      encryptedData: res2.encryptedData,//加密过的字符串
                      iv: res2.iv//加密算法的初始向量
                     },
                    success: function (res3) {
                      if (res3.data.head.code == 0) {
                        wx.setStorageSync('userKey', res3.data.body.userKey);
                        doFunction();
                      } else {
                        wx.showToast({
                          title: '小程序登录失败',
                        })
                      }
                    }
                  });
                }
              })
            }
          }
        })
        
      },
      fail: function(res) {},
      complete: function(res) {},
    });
  }
}






























module.exports = {
  config: config,
  api: apiFunction,
  dataRequest: dataRequest
}