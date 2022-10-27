const config = require('@/utils/requestUtil');

export function getSemester() {
  return config.getRequest("/course/semester")
}

export function getGrade(url) {
  return config.getRequest(url)
}

export function studentSchedule (info) {
  return config.postRequest('/schedule/student',info)
}

export function cetSearch (url) {
  return config.getRequest(url)
}

export function getNotice (url,info) {
  return config.postRequest(url,info)
}

export function getClassTask (url, info) {
  return config.postRequest(url,info)
}

export function getReward (url, info) {
  return config.postRequest(url,info)
}

export function updateUserInfo (url, info) {
  return config.postRequest(url, info)
}

export function getBuildInfo(url, info) {
  return config.postRequest(url, info)
}

export function getNullRoom(url) {
  return config.getRequest(url)
}