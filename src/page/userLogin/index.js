import './index.css'
import '@/page/common/nav-simple'
import _user from '@/service/user-service.js'; import _mm from '@/util/mm.js'

// 表单的错误提示
let formError = {
  show(errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg)
  },
  hide() {
    $('.error-item').hide().find('.err-msg').text('')
  }
}
let page = {
  init() {
    this.bindEvent();
  },
  bindEvent() {
    $('#submit').click(() => {
      this.submit();
    })
    //如果按下回车进行提交
    $('.user-content').keyup((e) => {
      if (e.keyCode === 13) {
        this.submit();
      }
    })
  },
  submit() {
    let formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val()),
    }
    let validateResult = this.formValidate(formData);
    if (validateResult.status) {
      // 表单验真返回成功，提交表单 
      _user.login(formData, () => {
        window.location.href = _mm.getUrlParam('redirect') || './index.html'
      }, function (errMsg) {
        formError.show(errMsg)
      })
    } else {
      //  验证失败，错误提示
      formError.show(validateResult.msg)
    }

  },
  // 表单字段的验证
  formValidate(formData) {
    var result = {
      status: false,
      msg: ''
    }
    if (!_mm.validate(formData.username, 'required')) {
      result.msg = '用户名不能为空'
      return result;
    }
    if (!_mm.validate(formData.password, 'required')) {
      result.msg = '密码不能为空'
      return result;
    }
    // 通过验证
    result.status = true;
    result.msg = '验证通过'
    return result
  }
}
$(function () {
  page.init()
})
