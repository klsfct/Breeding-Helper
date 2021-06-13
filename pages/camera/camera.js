// camera.js

const app = getApp();
Page({
  data: {
    deviceHeight: "", //设备高度
    progress: "", //上传进度
    imgUrl: '', // 拍摄图片的本地显示路径
    resultLest: [] //识别结果列表
    //  data:{},
  },
  onLoad: function (options) {
    var that = this;
    that.getDeviceHeight()
  },

  getDeviceHeight: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log('设备的可视高度为', res.windowHeight);
        that.setData({
          deviceHeight: res.windowHeight
        })
      }
    })
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    var that = this
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        //	  var tempFilePaths = res.tempFilePaths
        var tempFilePaths = res.tempImagePath
        // imgUrl=tempFilePaths
        this.setData({
          //	    	imgUrl: tempFilePaths[0],
          src: res.tempImagePath,
          imgUrl: tempFilePaths
        })
        console.log(tempFilePaths)
        //		that.upMap(tempFilePaths[0])
        that.upMap(tempFilePaths)
      }
    })
  },

  upMap: function(imgUrl) {
    var that = this;
    var uid = wx.getStorageSync('uid');
    const uploadTask = wx.uploadFile({
      // url: getSave, //
        //  url: 'https://nayinart.cn/',

      url: 'https://yzxzs.sdaubigdata.cn/',
      filePath: imgUrl,
      name: 'file',
      formData: {
        'uid': uid,
        'longitude': that.data.longitude,
        'latitude': that.data.latitude,
      },
      success: function(res) {
        app.success('分析完成')

        var result = JSON.parse(res.data)
        //  var result3 = JSON.parse(result)
        var result2 = JSON.stringify(result)
        //      console,log( eval('(' + result2 + ')') )
        //    var json = eval('(' + result2 + ')')
        console.log('parse' + result2)
        console.log(typeof(result))
        console.log(typeof(result2))

        var dateList = result2.split(":");
        var arr = []
        for (var i in dateList) {
          arr = arr.concat(dateList[i]);

        }
       

        //   var aa= CLASS_ILL.
        //  console.log(CLASS_ILL.c_0)
        //下面一行仅用作转换为中文
        //    app.globalData.zhonglei =CLASS_ILL[arr[1]]

        // app.globalData.zhonglei = arr[1]

        // app.globalData.gailv = arr[3]
        app.globalData.shuliang = arr[1]
        app.globalData.num = app.globalData.shuliang.substr(0,arr[1].length-1)
        console.log(arr[1])
        console.log(app.globalData.zhonglei + '概率' + app.globalData.gailv)
        console.log(imgUrl)
        app.globalData.imgUrl = imgUrl
        wx.showActionSheet({
          itemList: ['小麦麦穗数目是', app.globalData.num],
          success: function(res) {
            console.log(res.tapIndex)
          },
          fail: function(res) {
            console.log(res.errMsg)
            console.log("meishangchuanchenggong ")
          }
        })

        if (global.zhonglei == "非植物") {
          wx.showToast({
            title: '非植物 请重新上传！',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        that.setData({
          //   resultLest: result.result, //识别列表
          //   recognitionId: result.recognitionId, //识别id
          //   recognitionName: global.zhonglei //设置默认识别名称
        })
      },
      fail: function(res) {
        // console.log("没有识别成功")
        app.success('发送失败请检查网络')
        wx.showToast({
          title: '识别失败，请重新上传',
          icon: 'none',
          duration: 3000
        })
      }
    });


    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      wx.showToast({
        title: '小麦麦穗计算中...',
        duration: 5500,
        icon: 'loading',

        mask: true,
        success: (res) => {res.progress},
        fail: (res) => {},
        complete: (res) => {res.progress},
      })
      that.setData({
        progress: res.progress
      })
    })
  },

  formSubmit: function(e) { //提交按钮 



    // wx.navigateTo({
    //   url: '../fenxi/fenxi',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
    wx.showActionSheet({
      itemList: ['小麦麦穗计算中...'],
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })

    var that = this
  },
  payoff: function (e) {
    var that = this;

    // wx.showToast({
    //   title: '成功支付1元',
    //   icon: 'none',
    //   duration: 20000
    // })
    wx.showModal({
      title: '提示',
      content: '确定要支付1元？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '成功支付1元',
            icon: 'none',
            duration: 20000
          })
          
        }
      }
    })
    wx.showActionSheet({
      itemList: ['123预测病害结果为', '种类为' + app.globalData.zhonglei, '概率为' + app.globalData.gailv],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

    wx.login({
      success: function (res) {
        that.getOpenId(res.code);
      }
    });

  },
  //获取openid
  getOpenId: function (code) {
    var that = this;
    wx.request({
      url: 'https://www.see-source.com',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'code': code },
      success: function (res) {
        var openId = res.data.openid;
        that.xiadan(openId);
      }
    })
  },
  //下单
  xiadan: function (openId) {
    var that = this;
    wx.request({
      url: 'https://www.see-source.com',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'openid': openId },
      success: function (res) {
        var prepay_id = res.data.prepay_id;
        console.log("统一下单返回 prepay_id:" + prepay_id);
        that.sign(prepay_id);
      }
    })
  },
  //签名
  sign: function (prepay_id) {
    var that = this;
    wx.request({
      url: 'https://www.see-source.com',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'repay_id': prepay_id },
      success: function (res) {
        that.requestPayment(res.data);

      }
    })
  },
  //申请支付
  requestPayment: function (obj) {
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })
  }  


  // error(e) {
  //   console.log(e.detail)
  // }

})