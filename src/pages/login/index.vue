<template>
  <view class="container">
    <view class="login-btn">
      <van-button type="primary" size="large" round open-type="getUserInfo" @getuserinfo="onGetUserInfo" withCredentials="true">登录</van-button>
      <van-notify id="van-notify" />
      <van-dialog id="van-dialog" />
    </view>
  </view>
</template>


<script>
import Dialog from './@/wxcomponents/vant/dist/dialog/dialog';
  export default {
    components: {
    },
    name: "login",
    onLoad() {

    },
    onShow: function() {
      wx.hideHomeButton({
        success: function () {
        },
      })
    },
    methods:{
      onGetUserInfo(e) {
        const _this = this
        const userInfo = e.detail.userInfo
        if (userInfo) {
          // 1. 小程序通过wx.login()获取code
          wx.login({
            success: function(login_res) {
              //获取用户信息
              wx.getUserInfo({
                success: function(info_res) {
                  // 2. 小程序通过wx.request()发送code到开发者服务器

                  _this.request({
                    url: 'http://mini.test.utools.club/wx/login',
                    method: 'POST',
                    data: {
                      code: login_res.code, //临时登录凭证
                      rawData: info_res.rawData, //用户非敏感信息
                      signature: info_res.signature, //签名
                      encrypteData: info_res.encryptedData, //用户敏感信息
                      iv: info_res.iv //解密算法的向量
                    }
                  }).then(res => {
                    if (res.code == 200) {
                      console.log(res)
                      // 7.小程序存储skey（自定义登录状态）到本地
                      wx.setStorageSync('userBaseInfo', res.data);
                      wx.setStorageSync('token', res.data.token);
                      uni.switchTab({
                        url:"/pages/index/index"
                      })
                    } else if (res.code === 201){
                      wx.setStorageSync('openId', res.data.openId);
                      wx.setStorageSync('token', res.data.token);
                      Dialog.alert({
                        message: '账号暂未绑定学工号，即将前往绑定'
                      }).then(() => {
                        uni.redirectTo({
                          url:`/pages/login/bind?avat=${res.data.avatarUrl}`
                        })
                      })

                    } else {
                      console.log('服务器异常');
                      _this.$notify({ type: "danger", message: "服务器异常" });
                    }
                  })
                }
              })
            }
          })
          this.hasUserInfo=true
          this.userInfo=userInfo
        }
      }
    }
  }
</script>

<style lang="scss">
  .container{
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-image: url("https://pic.qqtn.com/up/2019-4/15543576705739607.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .login-btn {
      margin-top: 120%;
      width: 90vw;
    }
  }


</style>
