<template class="page">
  <view class="baseContainer">
    <view>
      <van-cel title-class="gradeTitle" value-class="gradeValue" custom-class="downSelect" :title="'当前学期：'+selectType+'学年'" value="切换 >"></van-cel>
    </view>
    <d-card v-for="(co,index) in reward" :key="index" :title="co.type===0?'处罚':'奖励'" :content="'详情：'+co.content"></d-card>
  </view>
</template>

<script>
import { getReward } from '@/api/http'
import dCard from '@/wxcomponents/douglee-card/douglee-card.vue';
export default {
  name: "courseGrade",
  components:{
    dCard
  },
  data() {
    return {
      show: false,
      actions: [],
      selectType: '',
      reward: [],
      usersInfo: {}
    }
  },
  methods:{
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
    getReaward() {
      const _this = this
      if (_this.usersInfo.classes !== null || _this.usersInfo.classes !== '') {
        console.log('ter')
        console.log(_this.usersInfo)
        const queryParam = {name: this.usersInfo.username}
        getReward(`/rap/info?pageNum=1&pageSize=10`,queryParam).then(res => {
          this.reward = res.data.list
          console.log(this.reward)
        })
      }
    }
  },
  mounted() {
    this.getReaward()
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style>
.downSelect {
  margin: 18rpx;
  width: auto !important;
  border-bottom-left-radius: 4%;
  border-bottom-right-radius: 4%;
  border-top-right-radius: 4%;
  border-top-left-radius: 4%;
  height: 90rpx;

}
page {
  height: 100%;
  background-color: RGB(245,246,248);
}
.gradeTitle {
  min-width: 60%;
  font-size: 29rpx;
  font-weight: 400;
}
.gradeValue {
  color: orange !important;
}
.gradeView {
  margin: 18rpx;
  border-bottom-left-radius: 4%;
  border-bottom-right-radius: 4%;
  border-top-right-radius: 4%;
  border-top-left-radius: 4%;
}
.gradeValue2 {
  color: blue !important;
}
</style>
