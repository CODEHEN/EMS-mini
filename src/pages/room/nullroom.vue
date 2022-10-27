<template>
  <view>
    <van-cell-group>
      <van-cell v-for="(item,index) in room" :title="item" :key="index" title-class="titleroom"/>
    </van-cell-group>
  </view>
</template>

<script>
import {getNullRoom} from '@/api/http'
export default {
  name: "nullroom",
  data() {
    return {
      room: []
    }
  },
  onLoad:function(option){
    getNullRoom(`/classRoom/nullroom?time=${option.time}&build=${option.build}`).then(res => {
      this.room = res
      console.log(this.room)
    })
  }
}
</script>

<style>
  .titleroom {
    color: var(--cell-value-color,#969799);;
  }
</style>