export default(params) => {

    const header={'content-type': 'application/json; charset=UTF-8'}

    uni.showLoading({
        title:"正在加载"
    })
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header,
            success(res){
                resolve(res.data)
            },
            fail(err){
                reject(err)
            },
            complete(){
                uni.hideLoading()
            }
        })
    })
}
