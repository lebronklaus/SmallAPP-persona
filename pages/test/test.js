// pages/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  showModal: function(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
            url: '../posts/post'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  showLoading: function(){
    wx.showLoading({
      title: '加载中',
    })
    
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },


  showActionSheet: function(){
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  showNavigationBarLoading: function(){
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: 'TEST页面'
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },

  hideNavigationBarLoading: function(){
    wx.hideNavigationBarLoading();
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#00FFFF',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },

  setBackgroundText: function(){
    // wx.setBackgroundTextStyle({
    //   textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
    // });
    wx.setBackgroundColor({
      backgroundColor: '#8470FF', // 窗口的背景色为白色
    
      backgroundColorTop: '#828282', // 顶部窗口的背景色为白色
      backgroundColorBottom: '#7EC0EE', // 底部窗口的背景色为白色
    })
  },

  showTabBar: function(){
    wx.showTabBar()
  },

  loadFontFace: function(){
    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
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