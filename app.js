//app.js
App({
  onLaunch: function () {

    
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData:{
    userInfo:null
  },
  onShareAppMessage() {//未测试
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/pages/item?id=' + this.data.id
    }
  }
})