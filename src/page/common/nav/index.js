import './index.css'
import _mm from '@/util/mm.js'
import _user from "@/service/user-service.js"
import _cart from "@/service/cart-service.js"

let nav = {
  init() {
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();
  },
  bindEvent() {
    $('.user-login').click(() => {
      _mm.doLogin();
    })

    $('.user-reg').click(() => {
      window.location.href = './register.html';
    })

    $('.user-logout').click(() => {
      _user_logout((res) => {
        window.location.reload();
      }, (errorMsg) => {
        _mm.errorTips(errorMsg);
      })
    })
  },
  // 加载用户信息
  loadUserInfo() {
    _user.checkLogin((res) => {
      $('.user.not-login').hide().siblings('.user.login').show()
        .find('.username').text(res.username);
    }, (errorMsg) => {

    })
  },
  // 加载购物车数量
  loadCartCount() {
    _cart.getCartCount((res) => {
      $('.nav  .cart-count').text(res || 0)
    }, (errorMsg) => {
      $('.nav  .cart-count').text(0)
    })
  }
}
export const init = nav.init()