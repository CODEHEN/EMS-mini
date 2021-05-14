<template>
  <view>
    <van-cell-group>
      <van-cell v-for="(notice,index) in Notice" @click="showContent(index)" custom-class="noticeCustom" title-class="noticeTitle" value-class="noticeValue" :label="notice.createdName+notice.createdTime" center  :title="notice.title" is-link :key="index"></van-cell>
    </van-cell-group>
    <neil-modal
        :show="visible"
        :show-cancel="false"
        title="公告内容"
        @close="closeModal"
    >
      <view style="min-height: 90upx;padding: 32upx 24upx;">
        <span>{{Notice[index].content}}</span>
      </view>
    </neil-modal>
  </view>
</template>

<script>
import neilModal from '@/wxcomponents/neil-modal/neil-modal.vue';
import { getNotice } from '@/api/http'
export default {
  components: {
    neilModal
  },
  name: "index",
  data() {
    return {
      Notice: [],
      visible: false,
      index: 0
    }
  },
  methods: {
    getTip() {
      getNotice("/notice/info?pageNum=1&pageSize=10",{}).then(res => {
        this.Notice = res.data.list
      })
    },
    showContent(index) {
      this.index = index
      this.visible = true
    },
    closeModal() {
      this.visible = false
    },
  },
  created() {
    this.getTip()
  }
}
</script>

<style lang="scss">
  .noticeTitle {
    min-width: 100%;
  }
  .noticeCustom {
    .van-icon-arrow {
      color: RGB(136,154,164);
      right: 20rpx;
    }
  }
  .noticeValue {}
</style>
