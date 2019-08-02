import './index.css'
import _mm from '@/util/mm.js';
/* 通用头部*/
let header = {
  init() {
    this.bindEvent();
  },
  bindEvent() {
    // 点击提交提交按钮提交
    $('#btn-search').click(() => {
      this.searchSubmit();
    })

    //输入回车 做搜索提交
    $('#input-search').keyup((e) => {
      console.log(e)
      if (e.keyCode === 13) {
        this.searchSubmit();
      }
    })
  },
  onLoad() {
    let keyword = _mm.getUrlParam('keyword');
    if (keyword) {
      $('#input-search').val(keyword);
    }
  },
  //搜索的提交
  searchSubmit() {
    let keyword = $.trim($('#input-search').val());
    // 如果提交的时候有keyword，正常跳转到list页
    if (keyword) {
      window.location.href = "./list.html?keyword=" + keyword
    } else {
      // 如果keyword为空，直接返回首页
      _mm.goHome();
    }
  }

}

header.init();