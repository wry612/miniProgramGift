//index.js
//获取应用实例
const app = getApp()
const api = app.appApi
Page({
  data: {
    typeList: [{ "typeName": '普洱茶', "commodityList": [{ "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }] }, { "typeName": '普洱茶', "commodityList": [{ "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }] }, { "typeName": '普洱茶', "commodityList": [{ "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }, { "name": "茶", "number": "256元/罐", "money": "8元/克" }]}],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  onLoad: function () {
    
  },
  getBanner:function(){
    api.dataRequest({
          url: api.config.baseUrl+'/test/pay/produceOrderForSmallProgram', //仅为示例，并非真实的接口地址
          method:"POST",
          header: { 'content-type':'application/x-www-form-urlencoded'},
          //data: 'commodityId=11&quantity=1&quantityType=1&activityId=0&brokerId=0&userKey='+userKey,
            data:'commodityContractId=11&applyCommodityStandardUnitQuantity=1&addresseeName=王若愚 &addresseeMobilePhone=15895999857&proviceFirstStageName=黑龙江省&addressCitySecondStageName=齐齐哈尔市&addressCountiesThirdStageName=建华区&addressDetailInfo=阿厄齐尔爱上戴&pwd=&totalMoneyFlag=false&userKey='+userKey,
          success: function (response) {
            if (response.data && response.data.code=='0'){
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
