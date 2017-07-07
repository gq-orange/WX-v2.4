Page({
    data: {
      condition:true,
      
      title:"",
      content:"",
      trash:"",
      img:"",
      cTime:"",
  },
  onLoad: function(options) {
    //  console.log(options); 
    var that = this;
    
    this.setData({
      title: options.title,
      content:options.content,
      trash:options.trash,
      img:options.img,
      cTime:options.cTime
    })

    wx.setNavigationBarTitle({
      title: '内容详情',
      success: function(res) {
        // success
      }
    })
    that.check();
    console.log(this.data.condition);
  },
  check:function(){
    if(this.data.img===""){
      this.setData({   
        condition:false,
      });
    }
    console.log(111111111111);
  }
})