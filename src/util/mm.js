let conf = {
    serverHost: ''
}
let _mm = {
    // ajax 请求
    request: function (param) {
        $.ajax({
            url: param.url || '',
            type: param.type || 'get',
            dataType: param.dataType || 'json',
            data: param.data || '',
            success(res) {
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data)
                } else if (10 === res.status) {
                    // 没有登录状态，需要强制登录
                    this.doLogin()
                } else if (1 === res.status) {
                    // 请求数据错误
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error(error) {
                typeof param.error === 'function' && param.error(error.statusText)
            }
        })
    },
    // 获取服务器地址
    getServerUrl(path) {
        return conf.serverHost + 'path'
    },
    // 获取url参数
    getUrlParam(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let result = window.location.search.substr(1).match(reg)
        console.log(result)
        return result ? decodeURIComponent(result[2]) : null
    },
    // 成功提示
    successTips(msg) {
        alert(msg || '操作成功')
    },
    // 失败提示
    errorTips(msg) {
        alert(msg || '哪里出错了~~')
    },
    // 表单校验，进行非空， 手机，邮箱的判断
    validate(value, type) {
        value = $.trim(value);
        if ("required" === type) {
            return !!value
        }

        if ("phone" === type) {
            return /^1\d{10}$/.test(value)
        }

        if ("email" === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
        }
    },
    doLogin() {
        window.location.href = "./userLogin.html?redirect=" || encodeURIComponent(window.location.href)
    },
    getHome() {
        window.location.href = "./index.html"
    }
}

export default _mm;