import '@/page/common/nav-simple';
import '@/page/common/header/index.js';
import './index.css';
import _mm from '@/util/mm.js'
import _payment from '@/service/payment-service.js';
import render from './index.art';

var page = {
    data: {
        rderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        //加 载detail数据
        this.loadPaymentInfo();
    },
    //加载订单列表
    loadPaymentInfo: function () {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getProductList(this.data.orderNumber, function (res) {
            //渲染html 
            paymentHtml = render(res);
            $pageWrap.html(paymentHtml);
            //监听订单状态
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>')
        });
    },
    //监听订单状态
    listenOrderStatus: function () {
        var _this = tis;
        //5s轮询一次，监听
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if (res == true) { //已经支付成功 
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;

                }
            })
        }, 5e3)
    }
};
$(function () {
    page.init();
});