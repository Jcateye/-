var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
 
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function () {
    console.log('onLoad');
    let that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }

  // onGotUserInfo: function (e) {
  //   this.authorize(false, into => {
  //     // 打印用户信息
  //     console.log(into);
  //     var that = this
  //     var userI = into.userInfo;

  //     app.globalData.userInfo = userI;

  //     //调用应用实例的方法获取全局数据
  //     app.getUserInfo(function (userI) {
  //       //更新数据
  //       that.setData({
  //         userInfo: userI
  //       })
  //     });

  // })
  // },

//   /*
//    * 授权获取用户信息
//    * @withCredentials 是否带上登录态信息
//    * @doSuccess 成功获取用户信息的回调
//    */
//   authorize: function (withCredentials, doSuccess) {
//     let _pageCxt = this;
//     // 通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
//     wx.getSetting({
//       success: res => {
//         // 先判断用户是否授权获取用户信息，如未授权，则会弹出授权框
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           _pageCxt.getUserInfo(withCredentials, doSuccess);
//         } else {
//           wx.authorize({
//             scope: 'scope.userInfo',
//             success() {
//               _pageCxt.getUserInfo(withCredentials, doSuccess);
//               console.log("授权获取信息成功")
//             },
//             fail() {
//               wx.showToast({
//                 title: '授权获取信息失败',
//                 icon: 'loading',
//                 duration: 1500
//               });
//             }
//           });
//         }
//       }
//     });
//   },

// /**
//  * 获取微信用户信息
//  */
// getUserInfo: function (withCredentials, doSuccess) {
//     let _pageCxt = this;
//     wx.getUserInfo({
//       withCredentials: withCredentials,
//       success: function (res) {
//         _pageCxt.onSuccess(res, doSuccess);
//       },
//       fail: function () {
//         wx.showToast({
//           title: '获取用户信息失败',
//           icon: 'loading',
//           duration: 1200
//         });
//       }
//     });
//   },

// /**
//  * 获取信息成功的回调
//  */
// onSuccess: function (data, doSuccess) {
//     if (typeof doSuccess == 'function') {
//       doSuccess(data);
//     }
//   }
 })