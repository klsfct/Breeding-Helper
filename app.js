var common = require('utils/common.js')
App({
  //url: 'http://localhost/weiphp5/public/index.php?pbid=1&s=/',
  url:'https://nayinart.cn',
  PHPSESSID: '',
  common: common,
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  success: function (msg) {
    if (!msg) {
      msg = '操作成功'
    }
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    });
  },
  error: function (msg) {
    if (!msg) {
      msg = '操作成功'
    }
    wx.showToast({
      title: msg,
      image: '/images/icon_wrong.png',
      duration: 2000
    });
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo: {
      avatarUrl: "",
      nickname: "",
      //   age:'',
      province: "",
      city: "",
      country: "",
      language: "",
      
      

    },
    zhonglei: '',
    gailv: '',
    imgUrl: '',// 拍摄图片的本地显示路径
  }
})