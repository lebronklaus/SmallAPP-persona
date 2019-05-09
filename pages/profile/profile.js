// pages/profile/profile.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'by xiuhao ',
    msg: ' @NWAFU',
    userInfo: {},
  },

  onLoad: function () {
    var userInfo = {
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIdLUtkvdNcLb1ZZK8F3PzIvcfVE6auibcIecWZkxvGA6h5NSm5aN82syv9ctibfeqc4zDTyFsgZPicg/132",
      city: "渭南",
      province: "陕西",
      gender: "男",
      nickName: "傲娇的1%",
      name: "李民仓"
    }

    var userInterest = {
      "cropstag":["油料","水稻","小麦","大豆"],
      "specialtag":["猕猴桃","苹果","石榴","葡萄"]
    }

    this.setData({
      userInfo: userInfo,
      userInterest: userInterest
    })

  }

})
