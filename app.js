//app.js
var util = require("utils/util.js");
var api = require("utils/api.js");
App({
  onLaunch: function () {
    // 展示本地存储能力
    var userKey = wx.getStorageSync('userKey') || '';
    if (userKey == "") {
      api.api.login(function () {
        userKey = wx.getStorageSync('userKey') || ''
        api.dataRequest({
          url: 'http://wangruoyu.developer.jsdttec.com/test/pay/buyCommodityForSmallProgram', //仅为示例，并非真实的接口地址
          method:"POST",
          header: { 'content-type':'application/x-www-form-urlencoded'},
          data: 'commodityId=11&quantity=1&quantityType=1&activityId=0&brokerId=0&userKey='+userKey
          ,
          success: function (response) {
            if (response.data.head && response.data.head.code=='0'){
              var data = response.data.body;                                                                                                wx.requestPayment({
                'timeStamp': data.timeStamp,
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': 'MD5',
                'paySign': data.paySign,
                'success': function (r) {
                  wx.showToast({
                    title: '支付成功',
                  })
                },
                'fail': function (r) {
                }
              })
            }
          }
        })
      });
    }

    
  },
  globalData: {
    api: api,
    userInfo: null
  }
})