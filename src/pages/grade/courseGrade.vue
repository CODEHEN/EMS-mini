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
    <view class="gradeView">
      <van-cell-group>
        <van-cell v-for="(grade,index) in grades" value-class="gradeValue2" :title="grade.course" :value="grade.grade" :key="index"></van-cell>
      </van-cell-group>
    </view>
  </view>
</template>

<script>
import { getSemester,getGrade } from '@/api/http'
export default {
name: "courseGrade",
  onLoad() {
    this.semester()
  },
  data() {
  return {
    show: false,
    actions: [],
    selectSemester: '',
    grades: []
  }
  },
  methods: {
    onClose() {
      this.show = !this.show
    },
    onSelect(event) {
      this.selectSemester = event.detail.name
      this.grade(this.selectSemester)
    },
    semester() {
      getSemester().then(res => {
        if (res.length > 0) {
          this.selectSemester = res[0]
          console.log(this.selectSemester)
          res.forEach(item => {
            const obj = {name: item}
            this.actions.push(obj)
          })
          this.grade(this.selectSemester)
        }
      })
    },
    grade(semester) {
      const _this = this
      uni.getStorage({
        key: 'userBaseInfo',
        success: function (res) {
          console.log('grade')
          getGrade(`/grade/student/course?semester=${semester}&number=${res.data.number}`).then(resa => {
            _this.grades = resa
            console.log(_this.grades)
          })
        }
      })
    }
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
