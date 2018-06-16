// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookPage:{},
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var readerId =  options.readerId;
    var that = this;

    wx.request({
      url: "http://localhost:8080/bookrack/books",
      data: {
        readerId: readerId,
        pageNo: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res.data)
        if (!res.data && res.code == 500) {
          //后台没有数据返回执行  
          return;
        } else if (res.code == 200) {
          //后台状态返回执行  
          that.setData({
            bookPage: res.data
          })
          return
        }
      },
      fail(res) {
        fail(res);
      }
    })


    wx.request({
      url: "http://localhost:8080/user/userInfo",
      data:{
        readerId: readerId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res.data)
        if (!res.data && res.code == 500) {
          //后台没有数据返回执行  
          return;
        } else if (res.data.status == 200) {
          //后台状态返回执行  
          that.setData({
            user: res.data
          })
          return
        }
      },
      fail(res) {
        fail(res);
      }
    })

  }
})