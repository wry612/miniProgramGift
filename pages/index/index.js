//index.js
//获取应用实例
const app = getApp()
const api = app.appApi
Page({
  data: {
    typeList: [],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    advList:[]
  },
  onLoad: function () {
  },
  onShow:function(){
    if(app.globalData.hasKey){
      this.getBanner()
      this.getType()
    }else{
      var that = this
      setTimeout(function(){
        that.getBanner()
        that.getType()
      },500)
    }
  },
  getBanner: function () {
    var that = this
    api.dataRequest({
      url: api.config.baseUrl + 'static/images/queryAdvertisement', //仅为示例，并非真实的接口地址
      method: "GET",
      data: '',
      success: function (response) {
        if (response.data && response.data.code == '0') {
          var data = response.data.body;
          that.setData({
            advList:data
            })
        }
      }
    })
  },
  getType: function () {
    var that = this
    api.dataRequest({
      url: api.config.baseUrl + 'gift/queryCommodityTypeList', //仅为示例，并非真实的接口地址
      method: "GET",
      data: '',
      success: function (response) {
        if (response.data && response.data.code == '0') {
          var data = response.data.body;
          for(var i=0;i<data.length;i++){
            that.getCommodity(data[i].commodityTypeId,data[i])
          }
        }
      }
    })
  },
  getCommodity: function (id,obj) {
    var that = this
    api.dataRequest({
      url: api.config.baseUrl + 'gift/queryCommodityContract', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {commodityTypeId:id},
      success: function (response) {
        if (response.data && response.data.code == '0') {
          var data = response.data.body;
          that.data.typeList.push({type: obj, commodityList:data.slice(0,4)})
          that.setData({
            typeList: that.data.typeList
          })
        }
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getBanner()
    this.getType()
  }
})
