// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var postData = postsData.postList[postId];

    var globalData = app.globalData;
    // this.data.currentPostId = postId;

    //this.data.postData = postData;
    this.setData({
      postData: postData,
      currentPostId: postId
    });

    var postsCollected = wx.getStorageSync('posts_collected')
    if(postsCollected){
      var postsCollected = postsCollected[postId];
      this.setData({
        collected: postsCollected
      });
    }else{
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected',postsCollected);
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId){
      this.setData({
        isPlayingMusic:true
      })
    }

    this.setMusicMonitor();

  },

  setMusicMonitor: function(){
    var that = this;
    wx.onBackgroundAudioPlay(function (event) {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },

  onCollectionTap:function(event){
    this.getPostsCollectedSync();
  },

  getPostsCollectionAsyc:function(){
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      },
    })
    
  },

  getPostsCollectedSync:function(){
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;

    this.showToast(postsCollected,postCollected);
  },

  onShareTap:function(event){
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success:function(res){
        wx.showModal({
          title: itemList[res.tapIndex],
          content: "现在还无法实现分享功能,用户是否取消？"
        })
      }
    });
  },

  showToast:function(postsCollected,postCollected){
    wx.setStorageSync('posts_collected',postsCollected);
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected? "收藏成功":"取消成功",
      duration: 1000
    });
  },

  onMusicTap:function(event){
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      });
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
      app.globalData.g_isPlayingMusic = true;
    }

    


  }
  
})