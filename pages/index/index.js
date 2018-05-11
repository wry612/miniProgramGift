//index.js
//获取应用实例
const app = getApp()
const api = app.appApi
Page({
  data: {
    typeList: [{ "typeName": '普洱茶', "commodityList": [{ "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }] }, { "typeName": '普洱茶', "commodityList": [{ "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }] }, { "typeName": '普洱茶', "commodityList": [{ "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }] }],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  onLoad: function () {
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            var simpleUser = res.userInfo;
            console.error(simpleUser.nickName);
          }
        });
      }
    });
    api.dataRequest({
      url: 'https://api.weixin.qq.com/wxa/msg_sec_check', //仅为示例，并非真实的接口地址
      method: "POST",
      data: { access_token: api.config.userKey, content:'good'},
      success: function (response) {
          console.log(response)
      }
    })
  },
  onShow:function(){
    if(app.globalData.hasKey){
      this.getBanner();
    }else{
      var that = this
      setTimeout(function(){
        that.getBanner();
      },500)
    }
  },
  getBanner: function () {
    api.dataRequest({
      url: api.config.baseUrl + '/static/images/queryAdvertisement', //仅为示例，并非真实的接口地址
      method: "POST",
      data: '',
      success: function (response) {
        if (response.data && response.data.code == '0') {
          var data = response.data.body;
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
      }
    })
  }
})
