//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    username: '',
    password: '',
    motto: 'by xiuhao ',
    msg:' @NWAFU',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../posts/post'
      //url: '../welcome/welcome'
      //url: '../profile/profile'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  profile1:function(){

    //this.setData({msg:"#hello"})
    wx.navigateTo({
      url: '../profile/profile1'
    })
  },
  profile2: function () {

    //this.setData({msg:"#hello"})
    wx.navigateTo({
      url: '../profile/profile2'
    })
  },

  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  //微信登陆按钮
  doLogin: function (e) {
    var city = e.detail.userInfo.city;
    var province = e.detail.userInfo.province;
    var username = this.data.username;
    var password = this.data.password;

    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    if (username.length == 0 ||password.length == 0) {
      wx.showToast({
        title: '账号或密码为空',
        icon: 'loading',
        image: '/resource/icon/warn.png',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面
      wx.login({
        success: function (res) {
          console.log(res)
          // 获取登录的临时凭证
          var code = res.code;
          // 调用后端，获取微信的session_key, secret

          wx.request({
            url: "http://120.95.132.103:8080/wxLogin?code=" + code + "&city=" + city + "&province=" + province + "&username=" + username + "&password=" + password,
            method: "POST",
            success: function (result) {
              console.log(result);

              if (result.data.msg != "OK"){
                console.log("登陆失败");
                wx.showToast({
                  title: '账号或密码错误！',
                  icon: 'loading',
                  image: '/resource/icon/warn.png',
                  duration: 2000
                })
              }else{
                console.log("登陆成功")

                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1000
                });
                // 保存用户信息到本地缓存，可以用作小程序端的拦截器
                //app.setGlobalUserInfo(e.detail.userInfo);
                // wx.navigateTo({
                //   url: '../profile/profile',
                // })
                setTimeout(function () {
                  //要延时执行的代码 
                  wx.switchTab({
                    url: '../posts/post'
                  })
                }, 1000)

              }
                            
            }
          })

        }
      })

    }

    // wx.login({
    //   success: function (res) {
    //     console.log(res)
    //     // 获取登录的临时凭证
    //     var code = res.code;
    //     // 调用后端，获取微信的session_key, secret
        
    //     wx.request({
    //       url: "http://120.95.132.103:8080/wxLogin?code=" + code +"&city="+ city+"&province="+province+"&username="+username+"&password="+password,
    //       method: "POST",
    //       success: function (result) {
    //         console.log(result);
    //         // 保存用户信息到本地缓存，可以用作小程序端的拦截器
    //         //app.setGlobalUserInfo(e.detail.userInfo);
    //         // wx.navigateTo({
    //         //   url: '../profile/profile',
    //         // })
    //         wx.switchTab({
    //           url: '../posts/post'
    //         })
    //       }
    //     })

    //   }
    // })
  },


  login: function () {
    if (this.data.phone.username == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面 
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
    }
  }

})
