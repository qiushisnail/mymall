import './index.css'
import '@/page/common/nav-simple'
import _user from '@/service/user-service.js';
import _mm from '@/util/mm.js';

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
    // 验证username
    $('#username').blur(() => {
      let username = $.trim($('#username').val())
      // 异步验证用户名是否存在
      _user.checkUsername(username, (res) => {
        formError.hide();
      }, (errMsg) => {
        formError.show(errMsg);
      })
    })
  },
  submit() {
    let formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#answer').val())
    }
    let validateResult = this.formValidate(formData);
    if (validateResult.status) {
      // 表单验真返回成功，提交表单
      _user.login(formData, () => {
        window.location.href = _mm.getUrlParam('./result.html?type=register')
      }, function (errMsg) {
        formError.show(errMsg)
      })
    } else {
      // 验证失败，错误提示
      formError.show(validateResult.msg)
    }

  },
  // 表单字段的验证
  formValidate(formData) {
    var result = {
      status: false,
      msg: ''
    }
    // 验证用户名是否为空
    if (!_mm.validate(formData.username, 'required')) {
      result.msg = '用户名不能为空';
      return result;
    }
    // 验证密码是否为空
    if (!_mm.validate(formData.password, 'required')) {
      result.msg = '密码不能为空';
      return result;
    }
    // 验证密码长度
    if (formData.password.length < 6) {
      result.msg = '密码长度不能少于6位'
      return result;
    }
    // 验证两次输入的密码是否一致
    if (formData.password !== formData.passwordConfirm) {
      result.msg = '两次输入的密码不一致';
      return result;
    }
    // 验证手机号
    if (!_mm.validate(formData.phone, 'phone')) {
      result.msg = '手机号格式不正确';
      return result;
    }
    // 验证邮箱格式
    if (!_mm.validate(formData.email, 'email')) {
      result.msg = '邮箱格式不正确';
      return result;
    }
    // 验证密码提示问题是否为空
    if (!_mm.validate(formData.question, 'required')) {
      result.msg = '密码提示问题不能为空';
      return result;
    }
    // 验证密码提示问题答案是否为空
    if (!_mm.validate(formData.answer, 'required ')) {
      result.msg = '密码提示问题答案不能为空';
      return result;
    }
    // 通过验证，返回正确提示
    // 通过验证
    result.status = true;
    result.msg = '验证通过'
    return result
  }
}
$(function () {
  page.init()
})
