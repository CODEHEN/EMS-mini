<template>
	<view>


		<view class="test-card" :style="{'background': 'linear-gradient(to right, '+colorArray[Math.floor(Math.random()*10)]+','+colorArray[Math.floor(Math.random()*10)]+')'}">
			<view class="test-card-title"> {{ title }}</view>
			<view class="test-card-item u-line-5">
				{{ content }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"douglee-card",
		props: {
			title:{
				info: String,
				default: '卡片标题'
			},
			content:{
				info: String,
				default: '卡片内容'
			},
		},
		data() {
			return {
        colorArray: ['#FFDC72', '#CE7CF4', '#FF7171', '#66CC99', '#FF9966', '#66CCCC', '#6699CC', '#99CC99', '#669966',
            '#99CC66', '#FF9999', '#81CC74', '#99CCFF', '#FFCC99', '#CCCCFF', '#99CCCC',
            '#7397db', '#ff9983', '#99CC99'
        ],
			};
		},
    methods: {
    }
	}
</script>
<style lang="scss">
.test-card {
  font-size: 30rpx;
  border-radius: 10rpx;
	margin: 20rpx;
	color: rgb(240, 240, 240);
	padding: 20rpx 10rpx;
	height: 150rpx;
	box-shadow: 0rpx 10rpx 50rpx 10rpx rgba(226, 147, 147, 0.1);
 }
.test-card-title {

}
.test-card-item {
	font-size: 26rpx;
	width: 95%;
	float: left;
	height: 80rpx;
	padding: 20rpx 10rpx;
}
</style>
