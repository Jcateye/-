// read/read.js、
const app = getApp();
var tempFilePath = '/voice';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    chapter: {},
    bookId:'',
    seq:-9,
    color: '#FFFFFF'
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var bookId = options.bookId;
    app.getUserInfo(function (info) {
      //更新数据
      that.setData({
        userInfo: info,
        bookId: bookId
      });
    })
    that.jump(bookId);
  },

pageUp: function() {
  var that = this;
  if (that.data.seq ==1) {
    return;
  }
  

  that.setData({
    seq: that.data.seq -1
  })

  that.jump(that.data.bookId);

},

pageDown: function () {
  var that = this;
  that.setData({
    seq: that.data.seq + 1
  })

  that.jump(that.data.bookId);
  },

jump: function (bookId) {
  console.log("onJump")
  var that = this;

  wx.request({
    url: 'http://localhost:8080/read/start',
    data: {
      'readerId': that.data.userInfo.data.id,
      'bookId': bookId,
      'pageNo': that.data.seq
    },
    method: 'GET',
    success(res) {
      if (res.data.code == 200) {
        that.setData({
          chapter: res.data.data,
          seq: res.data.data.sequence
        })
      } else if (res.data.code == 500) {
        console.log(res.data.message);
      }
    }
  })
},

  start: app.start,

// stop: function () {
//   console.log("end");
//   this.setData({
//     color: '#ffffff'
//   })
  stop: app.stop
})