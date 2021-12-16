/*
 * @Author: your name
 * @Date: 2021-11-07 17:36:39
 * @LastEditTime: 2021-12-16 12:39:40
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /g-vue/js/observer.js
 */
class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    // 1. 判断data是否是对象
    if (!data || typeof data !== "object") {
      return;
    }
    // 2. 遍历data对象的所有属性
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(obj, key, val) {
    let that = this;
    // 负责收集依赖，并发送通知
    let dep = new Dep();
    // 如果val是对象，把val内部的属性转换成响应式数据
    this.walk(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newValue) {
        if (newValue === val) {
          return;
        }
        val = newValue;
        that.walk(newValue);
        // 发送通知
        dep.notify();
      },
    });
  }
}
