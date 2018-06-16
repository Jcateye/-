//app.js
const recorderManager = wx.getRecorderManager();

App(
  {
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    },

  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      let _code = '';
      //调用登录接口
      wx.login({
        success: res =>{
          let _code = res.code;
          wx.request({
            // 通过此 url ，获取 openid 与 unionid
            url: 'http://localhost:8080/wxuser/checkout',
            method: 'POST',  
            data: {
              'mycode': _code,
              'wxUserInfo': cb
              },
            success: resp => {
              console.log(resp.data);
              that.globalData.userInfo = resp.data;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          });  
        }
      });
    }
  },
  globalData: {
    userInfo: null
  },

  //开始录音的时候
  start: function () {

    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  }
})