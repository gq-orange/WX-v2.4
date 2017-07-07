Page({
  data: {
    Height: 0,
    Width:0,
    heightTemple :"",
    scale: 13,
    condition:false,
    latitude: "",
    longitude: "",
    content:"",
    address:'',
    trash:'',
    img:"",
    phone:'',
    cTime:'',
    markersData:[],
    markers: [],
    controls: [
    {
      id:3,
      iconPath:'../../images/dingwei.png',
      position:{
        left:25,
        top:50,
        width:25,
        height:25
      },
      clickable: true
    }
    ],
    // circles: []
  },
//加载页面
  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
            Height: res.windowHeight,
            Width: res.windowWidth,
            heightTemple: res.windowHeight//点击标志改变地图大小设置的
        })
      }
    });
 
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    });
    wx.request({
        url:"https://www.guorange.cn/index.php?s=/addon/Cms/Cms/getList",
        data: {
            x: '' ,
            y: ''
          },
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res.data)
            _this.setData({
              markers:_this.getSchoolMarkers(res.data),
              markersData:res.data
            })
          }
    });
    // console.log(this.img);
    // console.log(this.data.markers);
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },

  regionchange: function(e) {
    // console.log("regionchange===" + e.type)
  },
  //点击取消按钮时触发
  mapchange:function(){
      var that = this;
      that.setData({
        Height : this.data.Height + 150,
        condition : false 
            })
  },
  //点击markers
  markertap: function(e) {
    var id = e.markerId-1;
    var that = this;
    that.showMarkerInfo(this.data.markersData,id);
    that.changeMarkerColor(this.data.markersData,id);
    that.setData({
        Height : this.data.heightTemple - 150,
        condition : true 
    });
  },

  //点击缩放按钮和定位按钮动态请求数据
  controltap: function(e) {
    var that = this;
    this.mapCtx.moveToLocation();
  },
  //添加标记
  getSchoolMarkers: function(schoolData){
    let markers=[];
    let index = 1;
    for(let item of schoolData){
      let marker=this.createMarker(item,index);
      markers.push(marker);
      index++;
    }
    return markers;
  },
   createMarker: function(point,indexof){
    let latitude = point.latitude; 
    let longitude = point.longitude; 
    let marker= {
      iconPath: "../../images/marker.png",
      id:indexof,
      name:point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 40,
      height: 40,
    };
    return marker;
  },

//底部显示文字
  showMarkerInfo:function(data,i){
    var that = this;
    that.setData({
      address:data[i].address,
      trash:data[i].trash,
      phone:data[i].phone,
      cTime:data[i].cTime,
      content:data[i].content,
      img:data[i].img
    });
  },
//点击标志，改变标志颜色
  changeMarkerColor:function(data,i){
    var that = this;
    var index = 1 ;
    var newmarkers = [];
    for(var j=0;j<data.length;j++){
        if(j==i){
            data[j].iconPath = "../../images/markerselected.png"
        }else{
            data[j].iconPath = "../../images/marker.png"
        }

        newmarkers.push({
        id:index++,
        latitude: data[j].latitude,
        longitude: data[j].longitude,
        iconPath: data[j].iconPath,
        width: 40,
        height: 40
      })
      
    }
      that.setData({
      markers: newmarkers
    });
  },
//分享
  onShareAppMessage: function () {
    return {
      title: '后院阳光·绿色地图',
      path: 'pages/map/map',
      success: function(res) {
        // 分享成功
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res) {
        // 分享失败
                wx.showToast({
          title: '分享失败',
          icon: 'loadng',
          duration: 2000
        })
      }
    }
  }

})