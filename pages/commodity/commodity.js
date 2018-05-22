// pages/commodity/commodity.js
const app = getApp()
const api = app.appApi
Page({
  /**
   * 页面的初始数据
   */
  data: {
    commodityList: [],
    current:0,
    typeList:[]
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
          that.setData({
            typeList:data
            })
            that.getCommodity()
        }
      }
    })
  },
  getCommodity: function (event) {
    var that = this
    var typeId = 0    
    if(event){
      that.setData({
        current: Number(event.currentTarget.dataset.currentId)+1
      })
      typeId = event.currentTarget.dataset.typeId
    }else{
      typeId = 0
    }
    api.dataRequest({
      url: api.config.baseUrl + 'gift/queryCommodityContract', //仅为示例，并非真实的接口地址
      method: "POST",
      data: { commodityTypeId: typeId },
      success: function (response) {
        if (response.data && response.data.code == '0') {
          var data = response.data.body;
          that.setData({
            commodityList: data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getType()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getType()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})