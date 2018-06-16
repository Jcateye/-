const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    reviewsPage: {},
    userInfo: {},
    bookVO:{
      bookId:"",
      readerId:"",
      pageNo: 0
    }
  },

  onLoad: function(options) {
    var that = this;
    app.getUserInfo(function (info) {
      //更新数据
      that.setData({
        userInfo: info
      })
    })

    var bookId = options.bookId;

    that.setData({
      bookVO: {
        'bookId': bookId,
        'readerId': that.data.userInfo.data.id,
        'pageNo': 0
      }
    })
   
    wx.request({
      url: 'http://localhost:8080/market/bookBasicInfo',
      data: {
        'bookId': bookId
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res.data)
        if (!res.data && res.data.code == 500) {
          //后台没有数据返回执行  
          return;
        } else if (res.data.code == 200) {
          //后台状态返回执行  
          that.setData({
            book: res.data.data
          })
          return
        }
      },
      fail(res) {
        fail(res);
      }
    })

    var that = this;
    wx.request({
      url: 'http://localhost:8080/review/reviewPage',
      data: that.data.bookVO,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res.data)
        if (!res.data && res.data.code == 500) {
          //后台没有数据返回执行  
          return;
        } else if (res.data.code== 200) {
          //后台状态返回执行  
          that.setData({
            reviewsPage: res.data.data
          })
          return
        }
      },
      fail(res) {
        fail(res);
      }
    })

  },

/**
 * 跳转到书评详情 
 */
  reviewDetails: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../review/reviewDetail/reviewDetail?reviewId=' + id
    })
  },

  tUserInfo: function () {
    var id = e.currentTarget.dataset.readerId;
    wx.navigateTo({
      url: '../user/user?readerId=' + id
    })
  },

  addbook: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/bookrack/add',
      data: that.data.bookVO,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        if(res.data.code == 200) {
          if(res.data.data == 0) {
            console.log("书籍已在书架");
            return;
          }
          console.log("添加成功");
        }else if(res.data.code == 500) {
          console.log("添加失败")
        }
      }
    })
  }


})