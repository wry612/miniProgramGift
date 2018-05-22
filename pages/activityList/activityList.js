// pages/activityList/activityList.js
const app = getApp()
const api = app.appApi
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList:[]
  },
  getActivity: function () {
    var that = this
    api.dataRequest({
      url: api.config.baseUrl + 'conversion/getList', //仅为示例，并非真实的接口地址
      method: "GET",
      data: '',
      success: function (response) {
          var data = response.data.body;
          that.setData({
            activityList: data
          })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getActivity()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})