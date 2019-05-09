// pages/profile/profile.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'by xiuhao ',
    msg: ' @NWAFU',
    userInfo: {},
    startTime: 0,
    endTime: 0

  },

  onLoad: function() {
    //   var userInfo = {
    //   avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIdLUtkvdNcLb1ZZK8F3PzIvcfVE6auibcIecWZkxvGA6h5NSm5aN82syv9ctibfeqc4zDTyFsgZPicg/132",
    //   city: "渭南",
    //   province: "陕西",
    //   gender: "男",
    //   nickName: "傲娇的1%",
    //   name: "李民仓"
    // }

    // var userInterest = {
    //   "cropstag": ["油料", "水稻", "小麦", "大豆"],
    //   "specialtag": ["猕猴桃", "苹果", "石榴", "葡萄"]
    // }

    // this.setData({
    //   userInfo: userInfo,
    //   userInterest: userInterest
    // })

    var that = this;
    var baseURL = app.globalData.baseURL;

    this.setData({
      avatarUrl: app.globalData.avatarUrl,
      baseURL: baseURL
    })

    wx.request({
      url: this.data.baseURL+'tag',
      // url: 'http://120.95.132.103:8080/tag',
      data: {
        username: app.globalData.username,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          userInfo: res.data.userInfo,
          userInterest: res.data.userInterest
        })
      }
    })

  },

  // onTagTap: function(event){
  //   var tagName = event.currentTarget.dataset.tagname;
  //   console.log(tagName);
  //   wx.navigateTo({
  //     url: '../news/news-tag/news-tag?tagName=' + tagName,
  //   })
  // },


  handleTouchStart: function(e)  {    
    this.startTime  =  e.timeStamp;    
    // console.log(" startTime = "  +  e.timeStamp);  
  },

  //touch end
  handleTouchEnd: function(e)  {
    var tag = e.currentTarget.dataset.tagname;
    this.endTime  =  e.timeStamp;
    // console.log(" endTime = "  +  e.timeStamp);
  },

  handleClick: function(e)  {
    //     console.log("handleClick:endTime - startTime = " + (this.endTime - this.startTime));
    //     console.log("点击");
    //     console.log(tagName);
    var that = this;
    var tagName = e.currentTarget.dataset.tagname;    
    if  (this.endTime  -  this.startTime  <  350)  {

      wx.navigateTo({
        url: '../news/news-tag/news-tag?tagName=' + tagName,
      })
      // if (this.data.holdTime < 350) {
      //   wx.navigateTo({
      //     url: '../news/news-tag/news-tag?tagName=' + tagName,
      //   })
      // }
          
    }
  },

  handleLongPress: function(e)  {
    // console.log("handleLongPress:endTime - startTime = " + (this.endTime - this.startTime));
    // console.log("长按");
    var tag = e.currentTarget.dataset.tagname;
    var that = this;
    var username = app.globalData.username;
    wx.showModal({
      title: '提示',
      content: '确定删除标签："' + tag + '" 吗？',
      success(res) {
        if (res.confirm) {

          wx.request({
            url: that.data.baseURL + 'reloadTags',
            // url: 'http://120.95.132.103:8080/reloadTags',
            data: {
              username: username,
              tagName: tag,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data);
              that.setData({
                // userInfo: res.data.userInfo,
                userInterest: res.data.userInterest
              })
            }
          })
          
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })

        } else if (res.cancel) {
          console.log('用户取消')
        }
      }
    })
  },


  // handleTouchStart: function (e) {
  //   console.log(e.timestamp);
  //   var myDate = new Date();
  //   var start = myDate.getMilliseconds();
  //   console.log('start:'+start)
  //   var timestamp = Date.parse(new Date());
  //   timestamp = timestamp / 1000;
  //   console.log("当前时间戳为：" + timestamp);  
  //   this.setData({
  //     startTime : start
  //   })
  //   //console.log(" startTime = " + e.timeStamp);  
  // },

  // handleTouchEnd: function (e) {
  //   var myDate = new Date();
  //   var end = myDate.getMilliseconds();

  //   console.log('end:'+end)
  //   var timestamp = Date.parse(new Date());
  //   timestamp = timestamp / 1000;
  //   console.log("当前时间戳为：" + timestamp);  
  //   this.setData({
  //     holdTime : end-this.data.startTime
  //   })
  //   //this.endTime = e.timeStamp;
  //   //console.log(" endTime = " + e.timeStamp);  
  // },  

  onTagTap: function(event) {
    var tagName = event.currentTarget.dataset.tagname;
    console.log(tagName);
    if (this.data.holdTime < 350) {

      wx.navigateTo({
        url: '../news/news-tag/news-tag?tagName=' + tagName,
      })
    }

  },

  onLongTap: function(event) {
    var tag = event.currentTarget.dataset.tagname;
    wx.showModal({
      title: '提示',
      content: '确定删除标签："' + tag + '" 吗？',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  showCollect: function(event){
    wx.navigateTo({
      url: '../news/news-collection/news-collection',
    })
  },

  logout: function(event){
    wx.showModal({
      title: '提示',
      content: '确定退出当前登录吗？',
      success(res) {
        if (res.confirm) {
         
          app.globalData.collectedNewsList = null;
          app.globalData.collectedNewsIdList = null;
          app.globalData.newsList = null;
          app.globalData.tagNewsList = null;
          app.globalData.username = null;

          wx.redirectTo({
            url: '../index/index',
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})