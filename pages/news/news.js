// pages/posts/post.js
//var newsData = require('../../data/news-data.js')
var swiperData = require('../../data/swiper-data.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var username = app.globalData.username;
    var baseURL = app.globalData.baseURL;
    var that = this;
    wx.request({
      url: baseURL+'news',
      // url: 'http://120.95.132.103:8080/news',
      data: {
        username: username
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res)
        that.setData({
          newsList: res.data.newsList
        })
        app.globalData.newsList = res.data.newsList
      }
    })
   
    this.setData({
      // newsList: newsData.newsList,
      swiperList: swiperData.swiperList 
    });

  },

  onNewsTap:function(event){
    var newsId = event.currentTarget.dataset.newsid;
    var itemId = event.currentTarget.dataset.itemid;
    wx.navigateTo({
      url: 'news-detail/news-detail?id=' + itemId + '&frm=indx',
    })
  },
  onSwiperTap:function(event){
    var swiperId = event.target.dataset.swiperid;
    wx.navigateTo({
      url: 'news-photo/news-photo?id=' + swiperId,
    })
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