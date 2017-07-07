Page({
  data: {
    switchstate:true,
    listData:[]
  },
  //页面加载
  onLoad: function () {
      console.log('onLoad');
        var that = this;
        wx.request({
        url:"https://www.guorange.cn/index.php?s=/addon/Cms/Cms/getItem",
        data: {},
        header: {
              'content-type': 'application/json'
          },
        success: function(res) {
            that.setData({
                listData:res.data
            })
          }
    })
      wx.setNavigationBarTitle({
      title: '数据排名',
      success: function(res) {
        // success
      }
    })
  },
  //下拉页面刷新
onPullDownRefresh(){
    console.log('--------下拉刷新-------')
    var that = this;
    wx.showLoading({title:'加载中'}) //在标题栏中显示加载
    wx.request({
        url: 'https://www.guorange.cn/index.php?s=/addon/Cms/Cms/getItem',
        data: {},
        method: 'GET', 
  // header: {}, // 设置请求的 header
        success: function(res){
        // success
                that.setData({
                listData:res.data
            })
                setTimeout(function(){
                    wx.hideLoading();
                    },1000)
        },
        fail: function() {
        // fail
              wx.showLoading({
                 title: '糟糕，没有网络',
                })   
              setTimeout(function(){
                 wx.hideLoading()
            },2000)
        },
        complete: function() {
        // complete
                wx.hideNavigationBarLoading() //完成停止加载
                wx.stopPullDownRefresh() //停止下拉刷新
        }
    })
},
  //点击按钮切换排列顺序
    switchNow:function(){
      this.switchPicker('trash');
},
    switchYesterday:function(){
    this.switchPicker('yesterday');
},
//
switchPicker:function(val){
     if(this.data.switchstate){
        this.data.listData.sort(this.positiveCompare(val));
        this.setData({
        listData:this.data.listData,
        switchstate:false
      })
    }else{
        this.data.listData.sort(this.invertCompare(val));
        this.setData({
        listData:this.data.listData,
        switchstate:true
        })  
  }
},
  //正序排序
  positiveCompare:function(property){
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value2-value1;
      }
  },
 //逆序排序
  invertCompare:function(property){
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1-value2;
      }
  }
})
