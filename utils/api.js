var util = require("./util.js");
const config = {
  baseUrl: "https://wangruoyu.developer.jsdttec.com",
};

//wx.request接口再封装
const dataRequest = (requestObj) => {
  wx.request({
    url: requestObj.url,
    data: requestObj.data ? requestObj.data : "",
    header: {
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
        dataRequest({
          url: config.baseUrl + "/xcx/login",
          data:{code:res.code},
          success: function (res) {
            wx.setStorageSync('session_key', res.session_key);
            doFunction();
          }
        });
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