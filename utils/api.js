var util = require("./util.js");
const config = {
  baseUrl: "http://wangruoyu.developer.jsdttec.com/xcx/",
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
      //'content-type': 'application/json' // 默认值
      "content-type":"application/x-www-form-urlencoded"
    },
    method: requestObj.method ? requestObj.method : "GET",
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (requestObj.success && typeof (requestObj.success) === "function") {
        if (res.data && res.data.code==0){
          requestObj.success(res);
        }else{
          wx.showModal({
            title: '信息提示',
            content: res.data?res.data.msg:'查询数据失败',
            showCancel:false
          })
        }
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
              url: config.baseUrl + "/login",
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
  },
  secCheck:function(text){
    api.dataRequest({
      url: 'https://api.weixin.qq.com/wxa/msg_sec_check', //仅为示例，并非真实的接口地址
      method: "POST",
      data: { access_token: config.userKey, content: text },
      success: function (response) {
        return response;
      }
    })
  }
}
module.exports = {
  config: config,
  xccApi: apiFunction,
  dataRequest: dataRequest
}