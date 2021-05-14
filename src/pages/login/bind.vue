<template>
  <view class="content">
    <view class="login-t">
      <van-image width="100" height="100" round fit="cover" :src="avatarUrl"></van-image>
    </view>
    <view class="login-m">
      <van-cell-group>
        <van-field
            :value="number"
            required
            clearable
            label="学工号"
            icon="question-o"
            placeholder="请输入学工号"
            bind:click-icon="onClickIcon"
            @blur='myBlur($event,"number")'
        />

        <van-field
            :value="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            :border="false"
            @blur='myBlur($event,"password")'
        />
      </van-cell-group>

    </view>
    <view class="login-b">
      <button @click="bind()">登录</button>
    </view>
    <van-notify id="van-notify" />
  </view>
</template>

<script>
import Notify from '@/wxcomponents/vant/dist/notify/notify'
export default {
  data() {
    return {
      number: '',
      password: '',
      openId: '',
      avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/apln1GQuM3FAL1oQeeUbL6WEV0WL5uYQbPYiaB42YAHAqQn8pc7LZXCz2sbh8hIlA4g8ehbumFgXic9lrLjvxCvg/132'
    }
  },
  onLoad(option) {
    this.avatarUrl = option.avat
    const _this = this
    uni.getStorage({
      key: 'openId',
      success: function (res) {
        _this.openId = res.data
      },
      fail: function (res) {
        uni.redirectTo({
          url:"/pages/login/index",
        })
      }
    })
  },
  computed: {

  },
  onShow() {

  },
  methods: {
    bind() {
      this.request({
        url: "http://10.175.31.231:8083/wx/bind",
        data: {
          password: this.password,
          number: this.number,
          openId: this.openId
        },
        method: 'POST'
      }).then(res => {
          if (res.code === 202 || res.code === 201) {
            Notify({ type: 'danger', message: res.message });
          }
          if (res.code === 200) {
            wx.setStorageSync('userBaseInfo', res.data);
            Notify({ type: 'success', message: res.message });
            uni.switchTab({
              url:"/pages/index/index"
            })
          }
      })
    },
    myBlur(e, name) {
      if (name === 'number') {
        this.number = e.detail.value
      }
      if (name === 'password'){
        this.password = e.detail.value
      }
    }
  }
}
</script>

<style lang="scss">
.content {
  /*  #ifdef  H5  */
  height: calc(100vh - 90upx);
  /*  #endif  */
  /*  #ifndef  H5  */
  height: 100vh;
  /*  #endif  */
  background-color: #fff;

  padding: 0upx 100upx;
}
.login-t {
  text-align: center;
  padding: 50upx 0;
}
.login-logo {
  width: 180upx;
  height: 180upx;
  border-radius: 20upx;
  background-color: #f8f8f8;
  /* margin: 0 auto; */
}
.login-m {
  margin-bottom: 100upx;
}
.login-item {
  border-bottom: 2upx solid #d0d0d0;
  overflow: hidden;
  padding: 10upx;
  color: #333;
  margin-bottom: 30upx;
}
.login-item-input {
  display: inline-block;
  flex: 1;
  box-sizing: border-box;
}
.login-item .btn {
  border: none;
  width: 40%;
  text-align: right;
  padding: 0;
  &.btn-b {
    background: none;
    color: #333 !important;
  }
}
.login-b .btn {
  color: #999;
}
.btn-b {
  color: #fff !important;
}
.login-other {
  margin-bottom: 40upx;
  .item {
    padding: 20upx 0;
  }
}
.btn-square {
  color: #333;
}
</style>
