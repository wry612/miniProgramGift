//app.js
var util = require("utils/util.js");
var api = require("utils/api.js");
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var userKey = wx.getStorageSync('userKey') || ''
    if (userKey == "") {
      api.xccApi.login(function () {
        that.golbalData.hasKey=true
        that.getGlobalData()
      });
    }
  },
  getGlobalData:function(){
    var that = this
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        that.globalData.userInfo = res.userInfo
      }
    })
  },
  appApi:api,
  globalData: {
    hasKey:false,
    userInfo: null
  }
})