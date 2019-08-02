
const render = require('./index.art');
require("../module.js")
const data = {

    title: 'My Page',

    msg: '模板测试信息'

};

const html = render(data);
// $('body').html(html)
console.log(html)