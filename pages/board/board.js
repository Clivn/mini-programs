// 创建一个页面对象
// 如果不显式调用，系统也会自动调用
// 也就是说：此文件可以留空
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: { 
      key: 'in_theaters',
      title: '正在热映',
      content:[
        // {image:'',id:xx}
      ]
    },
    list: [
      { key: 'coming_soon', title:'即将上映'},
      { key: 'top250', title:'Top250' },
      { key: 'in_theaters', title:'正在热映' },
      // { key: 'us_box', title: '北美票房榜' }  数据格式有误
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://api.douban.com/v2/movie/' + this.data.banner.key+'?count=5',
      header: {
        'Content-Type': 'json'  //豆瓣要改成JSON
      },
      success: (res) => {
        console.log(res.data.subjects);
        if(!res.data.subjects) return;
        let result=[];
        res.data.subjects.map((item)=>{
          result.push({
            image:item.images.large,
            id:item.id
          })
        });
        this.setData({
          'banner.content':result
        });
        console.log(this.data.banner.content);
      },
      fail: () => {
        console.log('banner请求失败')
      },
      complete: () => {
        console.log('banner请求完成')
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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