// pages/review/reviewDetail/reviewDetail.js

/**
 * 书评详情页
 */


Page({

  /**
   * 页面的初始数据
   */
  data: {
    review: {},
    sonReviewPage: {},
    searchPageNum: 1,
    mostReviewId: ""
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      mostReviewId: options.reviewId
    })

    wx.request({
      url: 'http://localhost:8080/review/reviewDetail',
      data: {
        'reviewId': that.data.mostReviewId
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res.data)
        if (res.data.code == 200) {
          //后台状态返回执行  
          that.setData({
            review: res.data.data
          })
          return
        }
      },
      fail(res) {
        fail(res);
      }
    })

    var reviewVO ={ };
    reviewVO.parentId = that.data.mostReviewId;
    reviewVO.pageNo = that.data.searchPageNum ;
    this.reviewPage(reviewVO);
  },
  
  onReachBottom: function () {
    this.setData({
      searchPageNum: that.data.searchPageNum+1
    })
    var reviewVO = {};
    reviewVO.parentId = this.data.mostReviewId;
    reviewVO.pageNo = that.data.searchPageNum;
    this.reviewPage(reviewVO);

  },

  reviewPage: function getPage(reviewVO){
    let that = this;

    wx.request({
      url: 'http://localhost:8080/review/sonReview',
      data: reviewVO,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res.data)
       if (res.data.code == 200) {
          //后台状态返回执行  
          that.setData({
            sonReviewPage: res.data.data
          })
          return
        }
      },
      fail(res) {
        fail(res);
      }
    })
  },

  tUserInfo: function() {
    var id = e.currentTarget.dataset.readerId;
    wx.navigateTo({
      url: '../../user/user?readerId=' + id
    })
  }
  }
 
)

