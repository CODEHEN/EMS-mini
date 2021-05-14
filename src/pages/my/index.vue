<template>

</template>

<script>
export default {
  name: "index",
  onLaunch: function() {
    console.log('my Launch')
    this.userAuthorized()
  },
  methods:{
    userAuthorized() {
      uni.getStorage({
        key: 'userBaseInfo',
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

<style scoped>

</style>
