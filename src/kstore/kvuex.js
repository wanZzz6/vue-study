// 任务：
// 1.插件：$store
// 2.Store类：保存响应式状态state、方法：commit()/dispatch()
let _Vue;

class Store {
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions;

    // 利用Vue做响应式数据
    this._vm = new _Vue({
      data: options.state,
      // 基础实现: $store.getters.doubleCounter
      computed: (() => {
        let get = {},
          getters = options.getters;
        for (const key in getters) {
          if (Object.prototype.hasOwnProperty.call(getters, key)) {
            get[key] = getters[key];
          }
        }
        return get;
      })(),
    });

    // 绑定this
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    console.log(this._vm);

    this.getters = this._vm;
  }

  get state() {
    return this._vm._data;
  }

  set state(v) {
    console.error("please use replaceState to reset state");
  }

  // commit(type, payload)
  commit(type, payload) {
    // 获取type对应的mutation
    const entry = this._mutations[type];

    if (!entry) {
      console.error("unknown mutation!");
      return;
    }

    entry(this.state, payload);
  }

  dispatch(type, payload) {
    // 获取type对应的mutation
    const entry = this._actions[type];

    if (!entry) {
      console.error("unknown action!");
      return;
    }

    entry(this, payload);
  }
}

function install(Vue) {
  _Vue = Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

// 导出对象就是Vuex
export default { Store, install };
