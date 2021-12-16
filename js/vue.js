/*
 * @Author: your name
 * @Date: 2021-11-07 17:36:39
 * @LastEditTime: 2021-12-16 12:38:25
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: /g-vue/js/vue.js
 */
class Vue {
  constructor(options) {
    // 1. 通过属性保存选项的数据
    this.$options = options || {};
    this.$data = options.data || {};
    this.$methods = options.methods || {};
    this.$el =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el;
    // 2. 把data中的成员转换成getter和setter，注入到vue实例中
    this._proxyData(this.$data);
    // 2. 把method注入到vue实例中
    this._proxyMethods(this.$methods);
    // 3. 调用observer对象，监听数据的变化
    new Observer(this.$data);
    // 4. 调用compiler对象，解析指令和差值表达式
    new Compiler(this);
  }
  _proxyData(data) {
    // 遍历data中的所有属性
    const keys = Object.keys(data);
    keys.forEach((k) => {
      // 把data的属性注入到vue实例中
      Object.defineProperty(this, k, {
        enumerable: true,
        configurable: true,
        get() {
          return data[k];
        },
        set(newValue) {
          if (newValue === data[k]) {
            return;
          }
          // 更新数据
          data[k] = newValue;
        },
      });
    });
  }

  _proxyMethods(methods) {
    const keys = Object.keys(methods);
    // 对 method 执行同样操作
    keys.forEach((k) => {
      // 把 method 的属性注入到vue实例中
      Object.defineProperty(this, k, {
        enumerable: true,
        configurable: true,
        get() {
          return methods[k];
        },
      });
    });
  }
}
