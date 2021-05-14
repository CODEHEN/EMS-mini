<template class="page">
  <view class="baseContainer">
    <view>
      <van-cell @click="onClose" title-class="gradeTitle" value-class="gradeValue" custom-class="downSelect" :title="'当前学期：'+selectSemester+'学年'" value="切换 >"></van-cell>
    </view>
    <van-action-sheet
        :show="show"
        :actions="actions"
        @close="onClose"
        @select="onSelect"
    />
    <d-card v-for="(co,index) in course" :key="index" :title="co.courseName" :content="'['+co.courseAttr+'] '+' ['+co.teacherName+']'"></d-card>
  </view>
</template>

<script>
import { getSemester,getGrade,getClassTask } from '@/api/http'
import dCard from '@/wxcomponents/douglee-card/douglee-card.vue';
export default {
name: "courseGrade",
  components:{
  dCard
  },
  onLoad() {
    this.semester()
  },
  data() {
  return {
    show: false,
    actions: [],
    selectSemester: '',
    course: [],
    usersInfo: {}
  }
  },
  methods: {
    onClose() {
      this.show = !this.show
    },
    onSelect(event) {
      this.selectSemester = event.detail.name
      this.getCourse(this.selectSemester)
    },
    semester() {
      getSemester().then(res => {
        if (res.length > 0) {
          this.selectSemester = res[0]
          res.forEach(item => {
            const obj = {name: item}
            this.actions.push(obj)
          })
          this.getCourse(this.selectSemester)
        }
      })
    },
    getUserInfo() {
      const _this = this
      uni.getStorage({
        key: 'userBaseInfo',
        success: function (res) {
          _this.usersInfo = res.data
        },
        fail: function (res) {
          console.log(res)
        }
      })
    },
    getCourse(semester) {
      const _this = this
      if (_this.usersInfo.classes !== null || _this.usersInfo.classes !== '') {
        const queryParam = {className: this.usersInfo.classes,semester: semester}
        getClassTask(`/course/classTask?pageNum=1&pageSize=10`,queryParam).then(res => {
          this.course = res.data.list
        })
      }
    }
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
    font-size: 33rpx;
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
