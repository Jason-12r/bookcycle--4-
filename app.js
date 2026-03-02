// app.js - WeOUCBC 微信小程序
App({
  onLaunch: function () {
    // 云开发初始化
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // 云开发环境ID - WeOUCBC生产环境
        env: 'cloudbase-2gswhsg1728d0f01',
        traceUser: true,
      });
    }
    
    // 检查登录状态
    this.checkLoginStatus();
  },
  
  checkLoginStatus: function() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },
  
  globalData: {
    userInfo: null,
    // API基础地址（如果使用自有服务器）
    apiBase: 'https://your-server.com'
  }
});
