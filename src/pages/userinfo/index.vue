<template>
	<view class="container">
		<view class="ui-all">
      <hm-friend-information-card :options="usersInfo"></hm-friend-information-card>
			<view class="ui-list">
				<text>学院</text>
				<input disabled class="disabled" type="text" :value="usersInfo.college" />
			</view>
			<view class="ui-list">
				<text>生源地</text>
				<input disabled class="disabled" :value="usersInfo.origin" />
			</view>
			<view class="ui-list">
				<text>政治面貌</text>
        <input disabled class="disabled" :value="usersInfo.political"/>
			</view>
			<view class="ui-list">
				<text>性别</text>
        <input disabled class="disabled" :value="usersInfo.sex"/>
			</view>
      <view class="ui-list">
        <text>电话号码</text>
        <input :placeholder="value" :value="usersInfo.phone" @input="bindmobile" placeholder-class="place" />
      </view>
      <view class="ui-list">
        <text>邮箱</text>
        <input :placeholder="value" :value="usersInfo.email" @input="bindEmail" placeholder-class="place" />
      </view>
      <view class="ui-list">
        <text>家庭地址</text>
        <textarea :placeholder="value" :value="usersInfo.address" @input="bindAddress" placeholder-class="place" />
      </view>
			<button class="save" @tap="savaInfo">保 存 修 改</button>
		</view>

	</view>
</template>

<script>
import HmFriendInformationCard from '@/wxcomponents/hm-friend-information-card/index.vue'
	export default {
  components: {
    HmFriendInformationCard
  },
		data() {
			return {
				value: '请填写',
				sex: [{
					id: 1,
					name: '男'
				}, {
					id: 2,
					name: '女'
				}],
				index: 0,
				date: '请填写',
				avater: '',
				description: '',
				url: '',
				nickName: '',
				mobile: '',
				headimg: '',
        usersInfo: {}
			}

		},
		methods: {
      bindEmail(e) {
				this.usersInfo.email = e.detail.value;

			},
      bindAddress(e) {
				this.usersInfo.address = e.detail.value;

			},
			bindmobile(e) {
				this.usersInfo.phone = e.detail.value;

			},
      getUserInfo() {
        const _this = this
        uni.getStorage({
          key: 'userBaseInfo',
          success: function (res) {
            _this.usersInfo = res.data
            console.log('usersInfo')
            console.log(_this.usersInfo)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      },
			savaInfo() {
				if (!this.usersInfo.phone) {
					uni.showToast({
						title: '请填写手机号码',
						icon: 'none',
						duration: 2000
					});
					return;
				}
        if (!this.usersInfo.email) {
          uni.showToast({
            title: '请填写邮箱',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        if (!this.usersInfo.address) {
          uni.showToast({
            title: '请填写地址',
            icon: 'none',
            duration: 2000
          });
          return;
        }
				if (!this.isPoneAvailable(mobile)) {
					uni.showToast({
						title: '手机号码有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.updata(updata);
			},
			isPoneAvailable(poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(poneInput)) {
					return false;
				} else {
					return true;
				}
			},
			async updata(datas) {
				//传后台

			},

		},
    created() {
		  this.getUserInfo()
    },
    mounted() {
      console.log(this.usersInfo.avatar)
    },
    onLoad() {
		}

	}
</script>

<style lang="scss">
.disabled {
  color: #c8c9cc;
  cursor: not-allowed;
  opacity: 1;
  -webkit-text-fill-color: #c8c9cc;
}
	.container {
		display: block;
	}
  page {
    background-color: white !important;
  }

	.ui-all {
		padding: 20rpx 40rpx;

		.avatar {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

			.imgAvatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;

				.iavatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 40rpx;
			}
		}

		.ui-list {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

			text {
				color: #4a4a4a;
				font-size: 28rpx;
				display: inline-block;
				vertical-align: middle;
				min-width: 150rpx;
			}

			input {
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
			}
			button{
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				background: none;
				margin: 0;
				padding: 0;
				&::after{
					display: none;
				}
			}
			picker {
				width: 90%;
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				position: absolute;
				top: 30rpx;
				left: 150rpx;
			}

			textarea {
				color: #030303;
				font-size: 30rpx;
				vertical-align: middle;
				height: 150rpx;
				width: 100%;
				margin-top: 50rpx;
			}

			.place {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.right:after {
			content: ' ';
			width: 20rpx;
			height: 20rpx;
			border-top: solid 1px #030303;
			border-right: solid 1px #030303;
			transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			/* IE 9 */
			-moz-transform: rotate(45deg);
			/* Firefox */
			-webkit-transform: rotate(45deg);
			/* Safari 和 Chrome */
			-o-transform: rotate(45deg);
			position: absolute;
			top: 40rpx;
			right: 0;
		}

		.save {
			background: #99CC99;
			border: none;
			color: #ffffff;
			margin-top: 40rpx;
			font-size: 28rpx;
		}
	}
</style>
