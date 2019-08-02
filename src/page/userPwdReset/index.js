import './index.css'
import '@/page/common/nav-simple'
import _user from '@/service/user-service.js';import _mm from '@/util/mm.js'

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
  data: {
    username: '',
    question: '',
    answer: '',
    token: '',
  },
  init() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad() {
    this.loadStepUserName();
  },
  bindEvent() {
    // 输入用户名下一步按钮的点击
    $('#submit-username').click(() => {
      let username = $.trim($('#username').val())
      if (username) {
        // 用户名存在
        _user.getQuestion(username, (res) => {
          this.data.username = username;
          this.data.question = res.question;
          this.loadStepQuestion();
        }, (errorMsg) => {
          formError.show(errorMsg)
        })
      } else {
        formError.show('请输入用户名')
      }
    })
    // 输入密码提示问题下一步按钮的点击
    $('#submit-question').click(() => {
      let answer = $.trim($('#answer').val())
      if (answer) {
        // 检查密码提示答案
        _user.checkAnswer({
          username: this.data.username,
          question: this.data.question,
          answer: answer
        }, (res) => {
          this.data.answer = answer;
          this.data.token = res.token;
          this.loadStepPwd();
        }, (errorMsg) => {
          formError.show(errorMsg)
        })
      } else {
        formError.show('请输入密码提示问题')
      }
    })
    // 输入新密码按钮的点击
    $('#submit-password').click(() => {
      let password = $.trim($('#password').val())
      if (password && password.length >= 6) {
        // 检查密码提示答案
        _user.resetPassword({
          username: this.data.username,
          passwordNew: password,
          forgetToken: this.data.token
        }, (res) => {
         window.location.href="./result.html?type=pass-reset"
        }, (errorMsg) => {
          formError.show(errorMsg)
        })
      } else {
        formError.show('请输入不少于6位的新密码')
      }
    })
  },
  // 加载输入用户名的一步
  loadStepUserName() {
    $('.step-username').show();
  },
  // 加载输入密码提示问题答案的一步
  loadStepQuestion() {
    // 清除错误提示
    formError.hide();
    // 容器的切换
    $('.step-username').hide()
      .siblings('.step-question').show()
      .find('.question').text(this.data.question);
  },
  // 加载输入密码的一步
  loadStepPwd() {

  }
}
$(function () {
  page.init()
})
