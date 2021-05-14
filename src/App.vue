<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      this.userAuthorized()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
    globalData:{
		    base:"globaData3332",
        hasUserInfo:"false"
    },
    methods:{
      userAuthorized() {
        uni.getStorage({
          key: 'userBaseInfo',
          success: function (res) {
            uni.switchTab({
              url:"/pages/index/index"
            })
          },
          fail: function (res) {
            uni.redirectTo({
              url:"/pages/login/index",
            })
          }
        });
      }
    }

	}
</script>

<style>
@import "/wxcomponents/colorui/main.css";
@import "/wxcomponents/colorui/icon.css";
/* 引入动画 */
@import "/wxcomponents/colorui/animation.css";
@import "/wxcomponents/custom/color.css";
	/*每个页面公共css */
  @import "/wxcomponents/vant/dist/common/index.wxss";
</style>
