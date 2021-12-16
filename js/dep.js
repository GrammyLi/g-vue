/*
 * @Author: your name
 * @Date: 2021-11-07 17:36:39
 * @LastEditTime: 2021-12-16 12:39:46
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /g-vue/js/dep.js
 */
class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = [];
  }
  // 添加观察者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }
  // 发送通知
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
