//aboutme.js
//获取应用实例
var app = getApp()
Page({
  data: {
    img: '../../images/logo.jpg',
    title: "农大育种小助手",
    intro:"山东农业大学育种小助手",
    contab:"联系方式",
    address:"山东农业大学",
    mobile:"0538-23729769",
    email:"sdaubigdata@aliyun.com",
    qqgroup: '169580852'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    console.log(app.globalData.zhonglei)
 //   data.qqgroup=app.globalD
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      //  qqgroup:app.glo
      })
    })
  }
})