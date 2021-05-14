<template>
  <view>
    <timetable-body></timetable-body>
  </view>
</template>

<script>
import { studentSchedule } from '@/api/http'
import {mapState, mapGetters} from 'vuex'
import timetableBody from '../../wxcomponents/timetable/timetableBody.vue'
  export default {
    name: "schedule",
    components: {
      timetableBody
    },
    onLoad() {
      // 设置开学时间
      this.$store.commit('timetable/setStartDay', '2021/03/01 00:00:00')
      // 初始化课表数据
    },
    data() {
      return{
        timetableData: [],
        usersInfo: {}
      }
    },
    computed: {
      ...mapState('timetable', [
        'showTimetableWeek',
        'bgImage'
      ]),
      ...mapGetters('timetable', [
        'originalWeekIndex',
        'currentWeekIndex',
        'weekWeekIndex'
      ])
    },
    watch: {
      currentWeekIndex(newVal, oldVal) {
        uni.setNavigationBarTitle({
          title: '本学期课表'
        })
      }
    },
    methods:{
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
      }
    },
    created() {
      this.getUserInfo()
    },
    mounted() {
      const _this = this
      if (_this.usersInfo.classes !== null || _this.usersInfo.classes !== '') {
        const queryParam = {studentNumber: this.usersInfo.number}
        studentSchedule(queryParam).then(res => {
          const timetableData = []
          res.data.forEach(item => {
            const day = []
            item.forEach(tb => {
              if (tb != null) {
                const va = tb.split(String.fromCharCode(10))
                const obj = {}
                obj.title = va[0]
                obj.teacher = va[1]
                obj.location = va[2]+va[3]
                const arr = []
                arr.push(obj)
                day.push(arr)
              }
              if (tb === null) {
                  day.push([])
              }
            })
            timetableData.push(day)
          })
          _this.timetableData = timetableData
          _this.$store.commit('timetable/setTimetableList', this.timetableData)
        })
      }
    }
  }
</script>

<style scoped>

</style>
