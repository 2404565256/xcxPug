
export default function (options) {
    if (!options.baseUrl) {
        options.baseUrl = "https://autumnfish.cn/wx/"
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: options.baseUrl + options.url,
            data: options.data || {},
            header: options.header || {},
            success: res => {
                resolve(res.data)
            },
            fail: res => {
                reject(res.data)
            }
        })
    })
}
