var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    bookMap:[]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  onShow: function() {
    var that = this;

    wx.request({
      url: 'http://localhost:8080/bookrack/books',
      data: {
        'readerId': that.data.userInfo.data.id,
        'pageNo': 0
      },
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          that.setData({
            bookMap: res.data.data
          })
        }
      }
    })
  },

  read: function(e) {
    var id = e.currentTarget.dataset.bookId;
    wx.navigateTo({
      url: '../read/read?bookId=' + id
    })
  }

})
