import _mm from '@/util/mm.js';

let _product = {
    // 获取商品列表
    getProductList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            // method  : 'POST',请求方式默认即可
            success: resolve,
            error: reject
        });
    },
    // 获取商品详细信息
    getProductDetail: function (detailInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/detail.do'),
            data: detailInfo,
            // method  : 'POST',请求方式默认即可
            success: resolve,
            error: reject
        });
    },
}

export default _product;