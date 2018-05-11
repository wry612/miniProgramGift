var util = require("./util.js");
const config = {
  baseUrl: "http://wangruoyu.developer.jsdttec.com",
  userKey:''
};

//wx.request接口再封装
const dataRequest = (requestObj) => {
  var userKey = wx.getStorageSync('userKey') || ''
  var requestData = {}
  if (requestObj.data) {
    requestObj.data.userKey = userKey
    requestData = requestObj.data
  } else {
    requestData = { 'userKey': userKey }
  }
  wx.request({
    url: requestObj.url,
    data: requestData,
    header: requestObj.header ? requestObj.header : {
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
  login: function (doFunction) {//小程序登录
    wx.login({
      success: function (res) {
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
                  config.userKey = res3.data.body.userKey
                  doFunction();
                } else {
                  wx.showToast({
                    title: '小程序登录失败',
                  })
                }
              }
            });
          },
          fail: function (res2) {
            console.log(res2)
          }
        })
      },
      fail: function (res) {
        console.log(res)
       },
      complete: function (res) { },
    });
  }
}
module.exports = {
  config: config,
  xccApi: apiFunction,
  dataRequest: dataRequest
}