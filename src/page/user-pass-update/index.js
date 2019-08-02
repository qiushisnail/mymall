import '@/page/common/nav';
import '@/page/common/header';
import './index.css';
import navSide from '@/page/common/nav-side';
import _user from '@/service/user-service.js';
import _mm from '@/util/mm.js'

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent: function () {
        $(document).on('click', '.btn-submit', () => {
            //点击提交按钮后的动作
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            };
            var validateResult = this.validateForm(userInfo);
            if (validateResult.status) {
                //更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function (res, msg) {
                    _mm.successTips(msg);
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                });
            } else {
                _mm.errorTips(validateResult.msg)
            }
        })
    },
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        // 验证原密码是否为空
        if (!_mm.validate(formData.password, 'required')) {
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '新密码长度不得少于6位';
            return result;
        }
        // 验证两次输入密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }

};
$(function () {
    page.init();
});