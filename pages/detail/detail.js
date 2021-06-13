//aboutme.js
//获取应用实例
var app = getApp()
Page({
  data: {
      toastHidden:true,
     info: {}
  },

  onLoad: function (options) {
    var common = require('../../utils/common.js')
    common.loadInfo(options.id, this)
  },
  closepage: function(){
      wx.navigateBack()
  },
  //http://localhost/weicms/index.php?s=/addon/Cms5/Cms5/getList
  toastChange: function(){
    this.setData({toastHidden:true})
    wx.navigateBack()
  },  
})