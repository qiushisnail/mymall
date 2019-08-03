import '@/page/common/nav';
import '@/page/common/header/index.js';
import './index.css';
import navSide from '@/page/common/nav-side/index.js';
import _mm from '@/util/mm.js'
import _order from '@/service/order-service.js';
import render from './index.art';

var page = {
    data: {
        rderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {

        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        //加载detail数据
        this.loadDetail();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', 'order-cancel', function () {
            if (window.confirm(' 确实要取消该订单？')) {
                _order.cancelOrder(_this.data.orderNumber, function (res) {
                    _mm.successTips('该订单取消成功');
                    _this.loadDetail();
                });
            }
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        })
    },
    //加载订单列表
    loadDetail: function () {
        var _tis = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function (res) {
            _this.dataFilter(res)
            //渲染html
            orderDetailHtml = render(res);
            $content.html(orderDetailHtml);
        }, function (errMsg) {
            $content.html('<p class="err-tip">' + errMsg + '</p>')
        });
    },
    //数据的适配
    dataFilter: function (data) {
        data.nedPay = data.status == 10;
        data.isCancelabel = data.status == 10;
    }
};
$(function () {
    page.init();
});