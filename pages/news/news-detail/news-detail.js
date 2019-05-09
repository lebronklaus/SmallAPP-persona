// pages/newss/news-detail/news-detail.js
//var newssData = require('../../../data/news-data.js')
//var tagNewsData = require('../../../data/tag-news-data.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var itemId = options.id;
    var source = options.frm;
    var newsData = null;

    var globalData = app.globalData;

    var baseURL = globalData.baseURL;
    //var username = globalData.username;
    // var newsList = globalData.newsList;
    // var tagNewsList = globalData.tagNewsList;

    // this.setData({
    //   username: globalData.username
    // })

    if(source == "tag"){
      newsData = globalData.tagNewsList[itemId];
    }else if(source == "collection"){
      newsData = globalData.collectedNewsList[itemId];
    }else{
      // newsData = newssData.newsList[newsId];
      newsData = globalData.newsList[itemId];
    }
    

    this.setData({
      username: globalData.username,
      // username: username,
      newsData: newsData,
      newsId: newsData.newsId,
      baseURL: baseURL
      // currentnewsId: newsId
    });

    this.getCollectState();

  },

  onReady: function(options){
    
    wx.request({
      url: this.data.baseURL + 'recordBehavior',
      // url: 'http://120.95.132.103:8080/recordBehavior',
      data: {
        username: this.data.username,
        newsId: this.data.newsId,
        behaviorCode: 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // that.setData({
        //   collectedNewsIdList: res.data.collectId
        // })
      }
    })
  },

  onLikeTap: function(){
    wx.request({
      url: this.data.baseURL + 'recordBehavior',
      // url: 'http://120.95.132.103:8080/recordBehavior',
      data: {
        username: this.data.username,
        newsId: this.data.newsId,
        behaviorCode: 1
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if(res.data){
          wx.showToast({
            title: "赞一个",
            duration: 1000
          });
        }
      }
    })
   
  },

  onDislikeTap: function(){
    wx.request({
      url: this.data.baseURL + 'recordBehavior',
      // url: 'http://120.95.132.103:8080/recordBehavior',
      data: {
        username: this.data.username,
        newsId: this.data.newsId,
        behaviorCode: 4
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data) {
          wx.showToast({
            title: "踩一个",
            duration: 1000
          });
        }
      }
    })
   
  },

  getCollectNewsId: function(){
    wx.request({
      url: this.data.baseURL + 'collectedNewsId',
      // url: 'http://120.95.132.103:8080/collectedNewsId',
      data: {
        username: this.data.username,
        newsId: this.data.newsId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          collectedNewsIdList: res.data.collectId
        })
        app.globalData.collectedNewsIdList = res.data.collectId;
      }
    })
  },

  getCollectState: function () {
    var that = this;
    wx.request({
      url: this.data.baseURL + 'queryCollectState',
      // url: 'http://120.95.132.103:8080/queryCollectState',
      data: {
        username: this.data.username,
        newsId: this.data.newsId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data==true){

          that.setData({
            collected: true
          })
        }else{
          that.setData({
            collected: false
          })
        }
      }
    })
  },

  showCollectionState: function(){

  },

  onCollectionTap:function(event){

    var collectState = this.data.collected;

    var that = this;

    if(collectState){
      wx.request({
        url: this.data.baseURL + 'removeCollection',

        // url: 'http://120.95.132.103:8080/removeCollection',
        data: {
          username: that.data.username,
          newsId: that.data.newsId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data == true) {
            wx.showToast({
              title: "取消成功",
              duration: 1000
            });
            that.setData({
              collected: false
            })
          } else {
            wx.showToast({
              title: "取消失败",
              duration: 1000
            });
          }
        }
      })
    }else{
      wx.request({
        url: this.data.baseURL + 'addCollection',

        // url: 'http://120.95.132.103:8080/addCollection',
        data: {
          username: that.data.username,
          newsId: that.data.newsId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data == true) {
            wx.showToast({
              title: "收藏成功",
              duration: 1000
            });
            that.setData({
              collected: true
            })
          } else {
            wx.showToast({
              title: "收藏失败",
              duration: 1000
            });            
          }
        }
      });
      
    }

    //this.getnewssCollectedSync();
  },

  // getnewssCollectionAsyc:function(){
  //   var that = this;
  //   wx.getStorage({
  //     key: 'newss_collected',
  //     success: function(res) {
  //       var newssCollected = res.data;
  //       var newsCollected = newssCollected[that.data.currentnewsId];
  //       newsCollected = !newsCollected;
  //       newssCollected[that.data.currentnewsId] = newsCollected;
  //       that.showToast(newssCollected, newsCollected);
  //     },
  //   })
    
  // },

  // getnewssCollectedSync:function(){
  //   var newssCollected = wx.getStorageSync('newss_collected');
  //   var newsCollected = newssCollected[this.data.currentnewsId];
  //   newsCollected = !newsCollected;
  //   newssCollected[this.data.currentnewsId] = newsCollected;

  //   this.showToast(newssCollected,newsCollected);
  // },

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

  // showToast:function(newssCollected,newsCollected){
  //   wx.setStorageSync('newss_collected',newssCollected);
  //   this.setData({
  //     collected: newsCollected
  //   });
  //   wx.showToast({
  //     title: newsCollected? "收藏成功":"取消成功",
  //     duration: 1000
  //   });
  // },

  // onMusicTap:function(event){
  //   var currentnewsId = this.data.currentnewsId;
  //   var newsData = newssData.newsList[currentnewsId];
  //   var isPlayingMusic = this.data.isPlayingMusic;
  //   if(isPlayingMusic){
  //     wx.pauseBackgroundAudio();
  //     this.setData({
  //       isPlayingMusic: false
  //     });
  //     app.globalData.g_isPlayingMusic = false;
  //   }else{
  //     wx.playBackgroundAudio({
  //       dataUrl: newsData.music.url,
  //       title: newsData.music.title,
  //       coverImgUrl: newsData.music.coverImg
  //     });
  //     this.setData({
  //       isPlayingMusic: true
  //     });
  //     app.globalData.g_currentMusicnewsId = this.data.currentnewsId;
  //     app.globalData.g_isPlayingMusic = true;
  //   }

    


  // }
  
})