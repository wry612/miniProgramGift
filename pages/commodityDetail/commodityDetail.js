// pages/commodityDetail/commodityDetail.js
const app = getApp()
const api = app.appApi
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    buyShow:false,
    orderShow:false,
    commodity:{},
    imgList: [],
    inputNumber: 1,
    chooseUnit: '',
    chooseUnitNumber: 1,
    commodityStock: 0,
    standardIndex:0
  },
  getCommodityDetail: function (id) {
    var that = this
    api.dataRequest({
      url: api.config.baseUrl + 'buyCommodity/queryCommodityDetail', //仅为示例，并非真实的接口地址
      method: "POST",
      data: { commodityId: id },
      success: function (response) {
        if (response.data && response.data.code == '0') {
          var data = response.data.body;
          //类型为普洱茶的商品不用显示规格、提货等信息
          if (data.code != '' && data.code == 'puer_tea') {
            that.isPuer = true;
          }
          //类型为普洱积分的商品不用显示规格、购买、提货等信息
          if (data.commodityCode != '' && data.commodityCode == 'puer_integral') {
            that.isIntegral = true;
          }
          var picList = [];
          var introDetailList = [];
          if (data.picUrl) {
            var picUrl = data.picUrl.split(',');
            for (var i = 0; i < picUrl.length; i++) {
              picList.push({
                'src': "https://gifttest.jsdttec.com/main/static/images/view/" + picUrl[i] });
            }
          }
          if (data.introDetailLink) {
            var introDetailUrl = data.introDetailLink.split(',');
            for (var i = 0; i < introDetailUrl.length; i++) {
              introDetailList.push({ 'src': "https://gifttest.jsdttec.com/main/static/images/view/" + introDetailUrl[i] });
            }
          }
          var commodity = {
            commodityContractId: data.commodityContractId,
            headImg: 'https://gifttest.jsdttec.com/main/static/images/view/'+data.iconUrl,
            commodityType: data.subjectMatter,
            typeName: data.typeName,
            commodityName: data.commodityName,
            desc: data.introBrief,
            unit: data.unit,
            company: data.company,
            brand: data.brand,
            packingType: data.packType,
            packingSize: data.packSize,
            standardUnitName: data.standardUnitName,
            standardUnitMultiple: data.standardUnitMultiple,
            unitPrice: Number(data.unitPrice) / 100,
            chooseUnitNumber: '',
            validDate: (new Date(data.expireTime)).format('yyyy年MM月dd日'),
            imgList: introDetailList,
            standardPrice: Number(data.standardPrice) / 100
          }
          if (data.properties) {
            that.properties = JSON.parse(data.properties);
          }
          wx.setNavigationBarTitle({
            title: data.commodityName
          })
          that.setData({
            commodity: commodity,
            imgList: picList,
            chooseUnit: commodity.unit,
            chooseUnitNumber:1
          })
        }
      }
    })
  },
  getStock: function (callback) {
    var that = this
    api.dataRequest({
      url: api.config.baseUrl + 'gift/queryOperaterInfo', //仅为示例，并非真实的接口地址
      method: "POST",
      data: { commodityId: that.commodity.commodityContractId },
      success: function (rsp) {
        if (rsp.data && rsp.data.code == 0) {
          var data = rsp.data.body;
          that.setData({
            commodityStock: data.availableUnitQuantity
          })
          var maxUnitMultiple = 100;
          var maxUnit = maxUnitMultiple * that.commodity.standardUnitMultiple;
          if (that.inputNumber > that.stock) {
            that.setData({
              inputNumber: that.stock()
            })
          }
          if (that.chooseUnitNumber == 1) {
            if (that.stock > maxUnit) {
              if (that.inputNumber > maxUnit) {
                that.setData({
                  inputNumber: maxUnit
                })
              }
            } else {
              if (that.inputNumber > that.stock) {
                that.setData({
                  inputNumber: that.stock()
                })
              }
            }
          } else {
            if (that.stock > maxUnitMultiple) {
              if (that.inputNumber > maxUnitMultiple) {
                that.setData({
                  inputNumber: maxUnitMultiple
                })
              }
            } else {
              if (that.inputNumber > that.stock) {
                that.setData({
                  inputNumber: that.stock()
                })
              }
            }
          }
          if (callback) {
            callback();
          }
        }
      }
    });
  },
  bindKeyInput: function (e) {
    this.setData({
      inputNumber: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCommodityDetail(options.commodityContractId)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  showBuy:function(){
    this.setData({
      buyShow:true
    })
  },
  showOrder:function(){
    this.setData({
      orderShow:true
    })
  },
  changeStandard:function(event){
    var that = this
    var idx = event.currenttarget.dataset.index;
    that.setData({
      standardIndex:idx
    })
    that.getStock();
    if (idx == 0) {
      that.setData({
        chooseUnit: that.commodity.unit,
        chooseUnitNumber:1
      })
    } else {
      that.setData({
        chooseUnit: that.commodity.standardUnitName,
        chooseUnitNumber: that.commodity.standardUnitMultiple
      })
    }
    if (commodityDetails.inputNumber > commodityDetails.stock) {
      that.setData({
        inputNumber: that.stock()
      })
    }
  },
  hideBuy:function(){
    this.setData({
      buyShow:false
    })
  },
  hideOrder: function () {
    this.setData({
      orderShow: false
    })
  },
  minus:function(){
    var num = this.inputNumber
    if(num==0){
      num==0
    }else{
      num = Number(num)-1
    }
    this.setData({
      inputNumber:num
    })
  },
  add:function(){
    var num = this.inputNumber
    if (num > this.stock()) {
      num == this.stock()
    } else {
      num = Number(num) + 1
    }
    this.setData({
      inputNumber: num
    })
  },
  totalMoney: function () {
    if (this.inputNumber == '') {
      return '0.00';
    } else {
      var num = 0;
      if (this.chooseUnitNumber == 1) {
        num = this.inputNumber * this.commodity.unitPrice;
      } else {
        num = this.inputNumber * this.commodity.standardPrice;
      }
      return num.toFixed(2);
    }
  },
  stock: function () {
    var max = Math.floor(this.commodityStock / this.chooseUnitNumber);
    return max;
  },
  showBuyDetail: function () {

  }
})