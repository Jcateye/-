

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviewsPage: {},
    searchPageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this;
    var reviewVO = {};
    reviewVO.pageNo = 1;
    that.reviewPage(reviewVO);
  },

  onReachBottom: function () {
    this.setData({
      searchPageNum: 1 + 1
    })
    var reviewVO = {};
    reviewVO.pageNo = this.data.searchPageNum + 1;
    this.reviewPage(reviewVO);
  },

  reviewPage: function getPage(reviewVO) {
    let that = this;

    wx.request({
      url: 'http://localhost:8080/review/reviewPage',
      data: reviewVO,
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
        } else if (res.data.code  == 200) {
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
  reviewDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './reviewDetail/reviewDetail?reviewId=' + id
    })
  },

  tUserInfo: function () {
    var id = e.currentTarget.dataset.readerId;
    wx.navigateTo({
      url: '../user/user?readerId=' + id
    })
  }



})