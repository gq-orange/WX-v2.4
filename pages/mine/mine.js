// Page({
//   data: {
//     text: "This is page data."
//   },
//   onLoad: function(options) {
//     // Do some initialize when page load.
//   },
//   onReady: function() {
//     // Do something when page ready.
//   },
//   onShow: function() {
//     // Do something when page show.
//   },
//   onHide: function() {
//     // Do something when page hide.
//   },
//   onUnload: function() {
//     // Do something when page close.
//   },
//   onPullDownRefresh: function() {
//     // Do something when pull down.
//   },
//   onReachBottom: function() {
//     // Do something when page reach bottom.
//   },
//   onShareAppMessage: function () {
//    // return custom share data when user share.
//   },
//   // Event handler.
//   viewTap: function() {
//     this.setData({
//       text: 'Set some data for updating view.'
//     })
//   },
//   customData: {
//     hi: 'MINA'
//   }
// })

//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '示例小程序-获取当前地理位、速度',
    userInfo: {},
    hasLocation: false,
    location: {},
    focus:false,
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    index: 0,
    source: '',
    showCondition:false

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')

  },
  //点击按钮获取本地图片
  listenerButtonChooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function (res) {
        //重绘视图
        that.setData({
          source: res.tempFilePaths,
          showCondition:true,
        });
        console.log(res.tempFilePaths);
      }
    });
    
  },
  //上传图片
  // upload: function (page, path) {
  //   wx.showToast({
  //     icon: "loading",
  //     title: "正在上传"
  //   }),
  //     wx.uploadFile({
  //       url: "https://www.guorange.cn/index.php?s=/addon/Cms/Cms/addFeedback",
  //       filePath: path[0],
  //       name:"image",
  //       header: { "Content-Type": "application/json" },
  //       data: path,
  //       success: function (res) {
  //         console.log(res);
  //         if (res.statusCode != 200) {
  //           wx.showModal({
  //             title: '提示',
  //             content: '上传失败',
  //             showCancel: false
  //           })
  //           return;
  //         }
  //       },
  //       fail: function (e) {
  //         console.log(e);
  //         wx.showModal({
  //           title: '提示',
  //           content: '上传失败',
  //           showCancel: false
  //         })
  //       },
  //       complete: function () {
  //         wx.hideToast();  //隐藏Toast
  //       }
  //     })
  // },
  //点击按钮获取经纬度
  setLocation: function (){
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    }),
      wx.getLocation({
        success: function (res) {
          console.log(res)
          that.setData({
            hasLocation: true,
            location: {
              longitude: res.longitude,
              latitude: res.latitude
            }
          })
        }
      })
  },
//底部确定和清除按钮
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });
  },
  //弹出提示框  
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },

  formSubmit: function (e) {
    var that = this;
    e.detail.value.img = this.data.source[0];
    var formData = e.detail.value;

    console.log(formData);
    wx.request({
      url: 'https://www.guorange.cn/index.php?s=/addon/Cms/Cms/addFeedback',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      
      success: function (res) {
        console.log(res.data)
        that.modalTap();
        
      }
    });
    //上传图片
    // that.upload(that, this.data.source);
  },


})
