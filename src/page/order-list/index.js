import '@/page/common/nav-simple';
import '@/page/common/header/index.js';
import './index.css';
import navSide from '@/page/common/nav-side/index.js';
import _mm from '@/util/mm.js'
import _order from '@/service/order-service.js';
import Pagination from '@/util/pagination/index.js';
import render from './index.art';

var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
    },
    //加载订单列表
    loadOrderList: function () {
        var _this = this,
            orderListHtml = '',
            $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function (res) {
            //渲染html
            orderListHtml = render(res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            })
        }, function (errMsg) {
            $listCon.html('<p class="err-tip">记载信息失败，请刷新后重试</p>')
        });
    },
    // 加载分页信息
    loadPagination: function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    },

};
$(function () {
    page.init();
});