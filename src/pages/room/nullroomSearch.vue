<template>
 <view class="picker-list">
   <view>
     <van-cell-group>
      <van-cell @click="onClose('1')" is-link title-class="gradeTitle" value-class="gradeValue" custom-class="downSelect" title="教学楼" :value="build"></van-cell>
      <van-cell @click="onClose('2')" is-link title-class="gradeTitle" value-class="gradeValue" custom-class="downSelect" title="星期" :value="week"></van-cell>
      <van-cell @click="onClose('3')" is-link title-class="gradeTitle" value-class="gradeValue" custom-class="downSelect" title="节数" :value="day"></van-cell>
     </van-cell-group>
    <view class="button-view">
     <van-button class="block-button" @click="searchNullRoom" color="#2f54eb" type="primary" block>查询</van-button>
    </view>
   </view>
   <van-action-sheet
       :show="show"
       :actions="actions"
       @close="onClose"
       @select="onSelect"
   />
 </view>
</template>

<script>
import {getBuildInfo, getNullRoom} from '@/api/http'
export default {
  name: "nullroomSearch",
  components: {
  },
  data() {
    return {
      show: false,
      build: '格物楼',
      week: '周一',
      day: '1-2节',
      actions: [],
      opr: '1',
      buildActions: [],
      weekActions: [{name: '周一',index:1},{name:'周二',index:2},{name:'周三',index:3},{name:'周四',index:4},{name:'周五',index:5},{name:'周六',index:6},{name:'周日',index:7}],
      dayActions: [{name:'1-2节',index:1},{name:'3-4节',index:2},{name:'5-6节',index:3},{name:'7-8节',index:4},{name:'9-10节',index:5}],
      classTime: 1,
      weekTime: 1,
      dayTime: 1
    }
  },
  methods: {
    onClose(item) {
      if (item === '1') {
        this.actions = this.buildActions
      }
      if (item === '2') {
        this.actions = this.weekActions
      }
      if (item === '3') {
        this.actions = this.dayActions
      }
      this.opr = item
      this.show = !this.show
    },
    onSelect(event) {
      console.log(event)
      if (this.opr === '1') {
        this.build = event.detail.name
      }
      if (this.opr === '2') {
        this.week = event.detail.name
        this.weekTime = event.detail.index
      }
      if (this.opr === '3') {
        this.day = event.detail.name
        this.dayTime = event.detail.index
      }
    },
    getBuild() {
      getBuildInfo('/teach_build/info?pageNum=1&pageSize=10',{}).then(res => {
        res.data.list.forEach(item => {
          const obj = {name: item.buildName}
          this.buildActions.push(obj)
        })
      })
    },
    searchNullRoom() {
      this.classTime = (this.weekTime-1)*5+this.dayTime
      uni.navigateTo({
        //多个参数用&拼接:url: '../comment/comment?id='+id+'&name='+name
        url: `/pages/room/nullroom?time=${this.classTime}&build=${this.build}`
      });
    }
  },
  mounted() {
    this.getBuild()
  }
}
</script>

<style>
  .picker-list {
    padding: 25rpx;
  }
  .button-view {
    margin-top: 25rpx;
  }
  .button-normal {
    width: 100%;
  }
  .van-button--block {
    height: 65rpx !important;
  }
</style>