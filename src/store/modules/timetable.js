export default {
  namespaced: true,
  state: {
    // 开学时间
    startDay: '',
    // 课表数据
    timetableList: [],
    // 课表周切换显示数据
    timetableWeek: [],
    // 显示周选择组件
    showTimetableWeek: false,
    // 跳转周索引
    targetWeekIndex: -1,
    // 节次时间
    classTime: [{
      's': '08:20',
      'e': '09:05'
    }, {
      's': '09:15',
      'e': '10:00'
    }, {
      's': '10:20',
      'e': '11:05'
    }, {
      's': '11:15',
      'e': '12:00'
    }, {
      's': '14:30',
      'e': '15:15'
    }, {
      's': '15:25',
      'e': '16:10'
    }, {
      's': '16:20',
      'e': '17:05'
    }, {
      's': '17:15',
      'e': '18:00'
    }, {
      's': '19:00',
      'e': '19:45'
    }, {
      's': '19:45',
      'e': '20:30'
    }],
    // 色卡
    colorArray: [
      ['#FFDC72', '#CE7CF4', '#FF7171', '#66CC99', '#FF9966', '#66CCCC', '#6699CC', '#99CC99', '#669966',
        '#66CCFF', '#99CC66', '#FF9999', '#81CC74'
      ],
      ['#99CCFF', '#FFCC99', '#CCCCFF', '#99CCCC', '#A1D699', '#7397db', '#ff9983', '#87D7EB', '#99CC99']
    ],
    // 色卡索引
    colorArrayIndex: 0,
    // 背景图片
    bgImage: ''
  },
  mutations: {
    setStartDay(state, startDay) {
      state.startDay = startDay
    },
    setTimetableList(state, timetableList) {
      state.timetableList = timetableList
    },
    changeShowTimetableWeek(state) {
      state.showTimetableWeek = !state.showTimetableWeek
    },
    setCurrentWeekIndex(state, weekIndex) {
      state.targetWeekIndex = weekIndex
    },
    setColorArrayIndex(state, colorArrayIndex) {
      state.colorArrayIndex = colorArrayIndex
    },
    setBgImage(state, bgImage) {
      state.bgImage = bgImage
    }
  },
  getters: {
    originalWeekIndex: (state) => {
      const startDate = new Date(state.startDay)
      const days = new Date().getTime() - startDate.getTime()
      return parseInt((days / (1000 * 60 * 60 * 24)) / 7)
    },
    currentWeekIndex: (state, getters) => {
      if (state.targetWeekIndex === -1) {
        return getters.originalWeekIndex
      }
      return state.targetWeekIndex
    },
    currentMonth: (state, getters) => {
      const weekIndex = getters.currentWeekIndex
      const myDate = new Date(state.startDay)
      myDate.setDate(myDate.getDate() + weekIndex * 7)
      return myDate.getMonth() + 1
    },
    currentWeekdDayArray: (state, getters) => {
      const weekIndex = getters.currentWeekIndex
      const myDate = new Date(state.startDay)
      myDate.setDate(myDate.getDate() + weekIndex * 7)
      const dayArray = []
      dayArray.push(myDate.getDate())
      for (let i = 0; i < 6; i++) {
        myDate.setDate(myDate.getDate() + 1)
        dayArray.push(myDate.getDate())
      }
      return dayArray
    },
    weekWeekIndex: (state) => {
      const week = new Date().getDay()
      if (week) return (week - 1)
      else return 6
    }
  },
  actions: {

  }
}
