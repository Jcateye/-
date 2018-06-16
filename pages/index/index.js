
//index.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookMap:{
      reviewTotalBook: [],
      readerTotalBook: [],
      noteTotalBook: [],
      searchTotalBook: []
    },
    userInfo: {}
  },

  clickBook: function(e) {
    var bookId = e.currentTarget.dataset.bookId;
    wx.navigateTo({
      url: "../bookInfo/bookInfo?bookId="+bookId,
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    console.log("onLoad");
    console.log(app.globalData.userInfo);
    wx.request({
      url: "http://localhost:8080/market/focus",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'GET',
      success(res) {
        that.setData({
          bookMap: res.data.data
        });
      }
    })
    },

  getUserInfo: function() {
   
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
    console.log('onShow');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (info) {
      //更新数据
      that.setData({
        userInfo: info
      })
    })
  }
})