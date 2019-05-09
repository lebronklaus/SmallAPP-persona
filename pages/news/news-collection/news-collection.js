// pages/news/news-collection/news-collection.js
// var tagNews = require('../../../data/tag-news-data.js')

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
    // var tagNewsList = tagNews.tagNewsList;
    // console.log(tagNewsList);
    // console.log('---------------')


    var that = this;
    var username = app.globalData.username;
    var baseURL = app.globalData.baseURL;

    wx.request({
      url: baseURL + 'collectedNews',
      // url: 'http://120.95.132.103:8080/collectedNews',
      data: {
        username: username,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data==null){
          that.setData({
            collectedNewsList: null
          })
        }else{
          that.setData({
            collectedNewsList: res.data.list
          })
          app.globalData.collectedNewsList = res.data.list;
        }
        
      }
    })

    // var globalData = app.globalData;
    // var collectedNews = this.data.collectedNewsList;
    // app.globalData.collectedNewsList = collectedNews

    // module.exports = {
    //   collectedNewsList: collectedNews
    // }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // wx.request({
    //   url: 'http://120.95.132.103:8080/collectedNewsId',
    //   data: {
    //     username: '001',
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     that.setData({
    //       collectedNewsList: res.data.list
    //     })
    //   }
    // })

  },

  onNewsTap: function (event) {
    var newsId = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: '../news-detail/news-detail?id=' + newsId + '&frm=collection',
    })
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