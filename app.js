//app.js
var util = require("utils/util.js");
var api = require("utils/api.js");
App({
  onLaunch: function () {
    // 展示本地存储能力
    var sessionKey = wx.getStorageSync('session_key') || '';
    if (sessionKey == "") {
      api.api.login(function () {
        api.dataRequest({
          url: 'http://wangruoyu.developer.jsdttec.com/test/pay/buyCommodityForSmallProgram', //仅为示例，并非真实的接口地址
          data: {
            commodityId: 11,
            quantity: 1,
            quantityType: 1,
            activityId: 0,
            brokerId: 0,
            smallProgrammeLoginCode: sessionKey
          },
          success: function (response) {
            var data = response.data;
            wx.requestPayment({
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
        })
      });
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    api: api,
    userInfo: null
  }
})