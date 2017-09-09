// search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 20,
    subtitle: '请在此输入搜索内容',
    list: [],
    search: '', 
    loading: false,
    hasMore:false
  },

  handleSearch(e) {
    if (!e.detail.value) return
    this.setData({ list: [], page: 1 })//每次搜索前清空数据
    this.setData({ subtitle: '加载中...', hasMore:true, loading: true, search: e.detail.value });
    this.loadList()
  },
  loadList: function () {
    this.setData({ subtitle: '加载中...', hasMore: true,loading: true })
    let start = (this.data.page - 1)*this.data.size;//计算开始条数
    this.setData({
      page:this.data.page+1
    });
    console.log('https://api.douban.com/v2/movie/search?q=' + this.data.search + '&start=' + start + '&count=' + this.data.size);
    wx.request({
      url: 'https://api.douban.com/v2/movie/search?q=' + this.data.search + '&start=' + start +'&count='+this.data.size,
      header: {
        'Content-Type': 'json'  //豆瓣要改成JSON
      },
      success: (res) => {
        this.setData({ loading: false, hasMore: false, subtitle: res.data.title });
        if (!res.data.subjects.length){
          return;
        }

        let result = [];
        res.data.subjects.map((item) => {
          result.push({
            image: item.images.small,
            id: item.id,
            title: item.title,
            average: item.rating.average,
            original_title: item.original_title,
            year: item.year,
            directors: (item.directors.length && item.directors[0].name)||'-'
          })
        });
        this.setData({
          list: this.data.list.concat(result),
        });
        wx.stopPullDownRefresh(); //停止下拉刷新UI
        console.log(this.data.list)
      },
      fail: () => {
        console.log('search请求失败')
      },
      complete: () => {
        console.log('search请求完成')
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.data.list=[];
    this.data.page=1;
    this.loadList();
      // app.wechat.original.stopPullDownRefresh(); //停止下拉刷新UI
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadList(); //加载更多
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})