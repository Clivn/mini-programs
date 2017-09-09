// https://api.douban.com/v2/movie/subject/25812712   API地址 用ID访问
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '加载中',
    loading:true,
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/'+options.id,
      header: {
        'Content-Type': 'json'  //豆瓣要改成JSON
      },
      success: (res) => {
        if(res.data.msg){
          console.log('detail ID有误');
          return;
        }
        this.setData({
          loading: false
        });
        this.setData({
          detail: res.data,
          title:res.data.title
        });
        wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' }); //加载完了修改
        console.log(this.data.detail)
        
      },
      fail: () => {
        console.log('detail请求失败')
      },
      complete: () => {
        console.log('detail请求完成')
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })//先显示加载中
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})