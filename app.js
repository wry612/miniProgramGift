//app.js
var util = require("utils/util.js");
var api = require("utils/api.js");
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var userKey = wx.getStorageSync('userKey') || ''
    if (userKey == "") {
      api.api.login(function () {
        userKey = wx.getStorageSync('userKey') || ''
        that.getGlobalData()
        // api.dataRequest({
        //   url: api.config.baseUrl+'/test/pay/produceOrderForSmallProgram', //仅为示例，并非真实的接口地址
        //   method:"POST",
        //   header: { 'content-type':'application/x-www-form-urlencoded'},
        //   //data: 'commodityId=11&quantity=1&quantityType=1&activityId=0&brokerId=0&userKey='+userKey,
        //     data:'commodityContractId=11&applyCommodityStandardUnitQuantity=1&addresseeName=王若愚 &addresseeMobilePhone=15895999857&proviceFirstStageName=黑龙江省&addressCitySecondStageName=齐齐哈尔市&addressCountiesThirdStageName=建华区&addressDetailInfo=阿厄齐尔爱上戴&pwd=&totalMoneyFlag=false&userKey='+userKey,
        //   success: function (response) {
        //     if (response.data && response.data.code=='0'){
        //       var data = response.data.body;
        //       wx.requestPayment({
        //         'timeStamp': data.timeStamp,
        //         'nonceStr': data.nonceStr,
        //         'package': data.package,
        //         'signType': 'MD5',
        //         'paySign': data.paySign,
        //         'success': function (r) {
        //           wx.showToast({
        //             title: '支付成功',
        //           })
        //         },
        //         'fail': function (r) {
        //         }
        //       })
        //     }
        //   }
        // })
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
    userInfo: null
  }
})