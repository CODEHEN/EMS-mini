const commonUrl ="http://mini.test.utools.club"  //公共路径

// post请求封装
function postRequest(url, data) {
  var promise = new Promise((resolve, reject) => {
    var that = this;
    var postData = data;
    uni.request({
      url: commonUrl + url,
      data: postData,
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: function(res) {
        if (res.statusCode == 200 && res.data.code == 0) {
          resolve(res.data);
        } else {
          // 请求服务器成功，但是由于服务器没有数据返回，
          //此时无code。会导致这个空数据

          // 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
          //不会被阻断在那里执行不下去！
          resolve(res.data);
        }
      },
      error: function(e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

// get请求封装
function getRequest(url) {
  var promise = new Promise((resolve, reject) => {
    var that = this;
    uni.request({
      url: commonUrl + url,
      method: 'GET',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: function(res) {
        if (res.statusCode == 200 && res.data.code == 200) {
          resolve(res.data.data);
        } else {
          resolve(res.data);
        }
      },
      error: function(e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}


module.exports = {
  postRequest,
  getRequest
}
