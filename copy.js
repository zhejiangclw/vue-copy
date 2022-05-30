// 参考clipboard.js插件，https://github.com/zenorocha/clipboard.js
// 本方法采用的是vue-cli搭建的项目引入，如果使用vue.js直接开发简单页面html，则直接注册指令
// 直接在main.js引入该文件即可，import './copy.js'。
// 另外如果想在复制成功时进行提示，则找到 document.execCommand('copy') 这行代码，下面有注明写提示的位置
import Vue from 'vue';
const copyFn = (el) => {
  const fakeElement  = document.createElement('textarea'); // 创建textarea标签虚拟dom，用于复制
  fakeElement.style.fontSize = '12pt'; // 设置字体大小

  // 重置textarea的样式
  fakeElement.style.border = '0';
  fakeElement.style.padding = '0';
  fakeElement.style.margin = '0';

  // 让虚拟dom脱离可视界面
  fakeElement.style.position = 'absolute';
  fakeElement.style.right = '-9999px';
  let yPosition = window.pageYOffset || document.documentElement.scrollTop; // 在同一水平位置嵌入
  fakeElement.style.top = `${yPosition}px`;

  fakeElement.setAttribute('readonly', ''); // 设置为只读，处理ios中点击复制出现抖动的问题，这是因为聚焦到输入框，键盘弹起瞬间有消失导致的
  fakeElement.value = el.innerText; // 获取当前元素中的文本内容，即要复制的内容
  document.body.appendChild(fakeElement); // 插入
  fakeElement.setSelectionRange(0, 9999); // 设置选中范围，避免ios中选不全
  fakeElement.select(); // 选中，只有input和textarea才有这个方法

  try{
    document.execCommand('copy');
    // 提示成功
    // Toast('复制成功')
  }catch (e) {
    // 提示失败
    console.error(`不支持exceCommand('copy')命令`);
    // Toast(`不支持exceCommand('copy')命令`)
  }
};
Vue.directive('copy', {
  bind: (el) => {
    el.addEventListener('click', copyFn.bind(null, el))
  },
  unbind: (el) => {
    el.removeEventListener('click', copyFn.bind(null, el))
  }
});
