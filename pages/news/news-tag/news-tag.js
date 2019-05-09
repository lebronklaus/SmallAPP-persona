// pages/news/news-tag/news-tag.js
//var tagNews = require('../../../data/tag-news-data.js')

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
    var tagName = decodeURIComponent(options.tagName);
    var that = this;
    var baseURL = app.globalData.baseURL;
    this.setData({
      tagName: tagName
    })
    
    // this.setData({
    //   tagNewsList: tagNews.tagNewsList,
    // });
    wx.request({
      url: baseURL + 'tagNews',
      // url: 'http://120.95.132.103:8080/tagNews',
      data: {
        tagName: tagName,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          tagNewsList: res.data.list,
        });
        app.globalData.tagNewsList = res.data.list;
      }
    })

  },

  onNewsTap: function (event) {
    var itemId = event.currentTarget.dataset.itemid;
    wx.navigateTo({
      url: '../news-detail/news-detail?id=' + itemId + '&frm=tag',
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