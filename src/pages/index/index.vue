<template>
  <view>
    <bw-swiper :swiperList="swiperList" :swiperType="swiperType" style="width:100%"></bw-swiper>
    <van-grid column-num="4" :border="false">
      <van-grid-item icon="/static/images/app_icon/score.png" url="/pages/grade/courseGrade" text="成绩查询" />
      <van-grid-item icon="/static/images/app_icon/attendance.png" @click="toSchedule" text="课表查询" />
      <van-grid-item icon="/static/images/app_icon/gpa.png" url="/pages/cet/index" text="四六级成绩" />
      <van-grid-item icon="/static/images/app_icon/new_student.png" url="/pages/tip/index" text="公告查看" />
      <van-grid-item icon="/static/images/app_icon/course_list.png" url="/pages/course/index" text="学期课程" />
      <van-grid-item icon="/static/images/app_icon/assess.png" url="/pages/reaward/index" text="奖惩信息" />
      <van-grid-item icon="/static/images/app_icon/summary.png" url="/pages/userinfo/index" text="个人信息" />
      <van-grid-item icon="/static/images/app_icon/classroom.png" text="空教室" />
    </van-grid>

    <view class="todayCourse">
      <van-cell-group>
        <van-cell :value="week[day-1]" :label="hasCourse===true?null:'今天没有课，好好休息吧'">
          <view slot="title">
            <view class="courseTitle">今日课表</view>
          </view>
        </van-cell>
        <view v-if="hasCourse">
          <van-cell v-for="(course,index) in todayCourse" value-class="value" title-class="title" :value="course[2]+course[3]" :title="course[4]+' '+course[0]" :key="index"></van-cell>
        </view>
      </van-cell-group>
    </view>
  </view>
</template>

<script>
import bwSwiper from '@/wxcomponents/bw-swiper/bw-swiper.vue'
export default {
  components: {
    bwSwiper
  },
name: "index",
  onLaunch: function() {
    console.log('index Launch')
    this.userAuthorized()
  },
  onLoad: function () {
    this.day = new Date().getDay()
    this.studentSchedule()
  },
  data() {
    return{
      swiperList:[{img: 'https://hbimg.huabanimg.com/243b5cc78755b1ef25768589d7af24a20a957d6c1437f-K9X3js_fw658/format/webp',text:'加油'},
        {img: 'https://hbimg.huabanimg.com/1e4c780ab0c893da9cf427bcf1eb1a92d8f1e7fe35fef-zqeT0H_fw658/format/webp'},
        {img: 'https://hbimg.huabanimg.com/595d9f8e27a595a15b0bc710ab8c841ddb5ff5f829a8c-L3ReWY_fw658/format/webp'}
        ],
      swiperType: true,
      number: '',
      day: 1,
      week: ['周一','周二','周三','周四','周五','周六','周日'],
      todayCourse: [],
      hasCourse: true
    }
  },
  methods:{
    toSchedule() {
      uni.switchTab({
        url:"/pages/schedule/index"
      })
    },
    userAuthorized() {
      uni.getStorage({
        key: 'userBaseInfo',
        fail: function (res) {
          uni.redirectTo({
            url:"/pages/login/index",
          })
        }
      });
    },
    studentSchedule() {
      const _this = this
      uni.getStorage({
        key: 'userBaseInfo',
        success: (result => {
          this.number = result.data.number
          _this.request({
            url: 'http://mini.test.utools.club/schedule/student',
            method: 'POST',
            data: {
              studentNumber: _this.number,
              semester: '2020-2021-1'
            }
          }).then(res => {
            if (res.code === 200) {
              res.data[_this.day-1].forEach((item,index) => {
                if (item != null) {
                  const va = item.split(String.fromCharCode(10))
                  va.push('第'+(index+1)+'节')
                  this.todayCourse.push(va)
                }
              })
            }
            if (this.todayCourse.length === 0) {
              this.hasCourse = false
            }
          })
         }),
        fail: (result => {
          uni.redirectTo({
            url:"/pages/login/index",
          })
        })
      })
    }
  },

}
</script>

<style>
.screen-swiper {
  min-height: 300rpx !important;
}
 .courseTitle {
   font-size: 36rpx;
   font-weight: 700;
   line-height: 1.8;
   font-weight: bold;
   color: black;
 }
 .title {
   font-size: 28rpx;
   font-weight: 400;
 }
 .value {
   font-size: 24rpx;
   font-weight: 400;
   color: black !important;
 }
</style>
