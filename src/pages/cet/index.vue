<template>
  <view>
    <view class="margin-sm padding-sm bg-white" style="border-radius:20rpx;">
      <view class="cu-list menu sm-border">
        <view class="cu-form-group cu-item">
          <view class="title">准考证号</view>
          <input v-model='ticketNumber' placeholder="请输入准考证号"></input>
        </view>
        <view class="cu-form-group cu-item">
          <view class="title">姓名</view>
          <input v-model='username' placeholder="请输入姓名" style="padding-left: 60rpx;"></input>
        </view>
      </view>
      <view class="padding flex flex-direction">
        <button class="cu-btn bg-orange-1 round shadow-blur lg" @click="cetSearch">查询</button>
      </view>
      <view class="margin-sm padding-sm solids" style="border-radius:20rpx;">
        <view class="text-bold text-lg">
          <text>英语四、六级考试（含口试）成绩查询</text>
        </view>
        <view>1.仅限查询最近一次考试成绩</view>
        <view>2.准考证号为15位</view>
        <view>3.姓名超过三个字，可只输入前三个</view>
      </view>
    </view>
    <neil-modal
        :show="visible"
        :show-cancel="false"
        title="查询结果"
        @close="closeModal"
        >
      <view style="min-height: 90upx;padding: 32upx 24upx;">
        <van-cell title-class="cetTitle" title="学校" :value="LevelGrade.x" :border="false" />
        <van-cell title-class="cetTitle" value-class="cetValue" title="总分" :value="LevelGrade.s" :border="false" />
        <van-cell title-class="cetTitle" title="听力" :value="LevelGrade.l" :border="false" />
        <van-cell title-class="cetTitle" title="阅读" :value="LevelGrade.r" :border="false" />
        <van-cell title-class="cetTitle" title="写作" :value="LevelGrade.w" :border="false" />
      </view>
    </neil-modal>
  </view>
</template>

<script>
import {cetSearch} from "@/api/http";
import neilModal from '@/wxcomponents/neil-modal/neil-modal.vue';
export default {
  components: {
    neilModal
  },
  data() {
    return {
      ticketNumber: '',
      username: '',
      visible: false,
      LevelGrade: {}
    }
  },
  created() {
  },

  methods: {
    closeModal() {
      this.visible = false
    },
    cetSearch() {
      cetSearch(`/grade/student/cet?ticketNumber=${this.ticketNumber}&name=${this.username}`).then(res => {
        console.log(res)
        if (res.code === 500) {
          wx.showModal({
            title: '错误',
            content: "请检查准考证或姓名格式是否正确",
          })
          return;
        }
        if (res.error !== null && typeof(res.error) === "string") {
          wx.showModal({
            title: '错误',
            content: res.error,
          })
          return
        }
        this.visible = true
        this.LevelGrade = res
      })
    },
  }
}
</script>

<style lang="scss">
.cetTitle {
  color: rgb(7, 78, 151);
  font: 30rpx 微软雅黑, san-serif;
}
.cetValue {
  color: #d71e04 !important;
  font-weight: bold;
}
.container {
  position: relative;
  width: 300rpx;
  height: 300rpx;
  margin: 0 auto;
  overflow: hidden;

  .wave {
    position: relative;
    width: 300rpx;
    height: 300rpx;
    background-color: rgb(118, 218, 255);
    border-radius: 50%;
    border: 2px solid #f1f1f1;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 600rpx;
      height: 600rpx;
      top: 0;
      left: 50%;
      background-color: rgba(255, 255, 255, .4);
      border-radius: 45%;
      transform: translate(-50%, -70%) rotate(0);
      animation: rotate 6s linear infinite;
      z-index: 10;
    }

    &::after {
      border-radius: 47%;
      background-color: rgba(255, 255, 255, .7);
      transform: translate(-50%, -70%) rotate(0);
      animation: rotate 10s linear -5s infinite;
      z-index: 20;
    }
  }


  @keyframes rotate {
    50% {
      transform: translate(-50%, -73%) rotate(180deg);
    }

    100% {
      transform: translate(-50%, -70%) rotate(360deg);
    }
  }

  .dushu {
    position: absolute;
    top: 150rpx;
    left: 150rpx;
    z-index: 99;
    transform: translate(-50%, -50%);
  }
}
</style>
