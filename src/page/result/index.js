import './index.css';
import _mm from '@/util/mm.js';
import '@/page/common/nav-simple/index.js'
import $ from 'jquery'
$(function () {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    if (type === 'payment') {
        var orderNumber = _mm.getUrlParam('orderNumber');
        $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber)
    }
    //显示对应的提示消息
    $element.show();
})