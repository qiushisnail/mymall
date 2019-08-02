import '@/page/common/nav'
import '@/page/common/header'
import './index.css';
import navSide from '@/page/common/nav-side';
import _mm from "@/util/mm.js"
import _user from '@/service/user-service.js';
import render from './index.art';
var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        //加载用户信息
        // this.loadUserInfo();

    },
    //加载用户信息
    loadUserInfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = render(res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        })
    }

};
$(function () {
    page.init();
});