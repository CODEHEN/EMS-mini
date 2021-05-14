<template>
  <div class="hm-friend-information-card">
    <div class="box">
      <image class="primary" :src="options.avatar" />
      <div class="side">
        <div class="namClass">
          <text class="address">{{ options.username }}</text>
        </div>
          <text class="address">{{ options.number }}</text>
          <text class="address">{{ options.classes+ '-' + options.major }}</text>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmFriendInformationCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-friend-information-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
          primary:
            '/static/hm-friend-information-card/images/img_24031_0_1.png',
          name: '张三',
          titleImg:
            '/static/hm-friend-information-card/images/img_24031_0_0.png',
          address: '深圳'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
@import './index.response.css';
</style>
