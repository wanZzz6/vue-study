// vue3 Proxy  ref
const isObject = v => typeof v === "object" && v !== null;

const baseHandler = {
  get(target, key) {
    const res = Reflect.get(target, key);
    console.log("get", key);

    // 收集依赖
    track(target, key);
    return isObject(res) ? reactive(res) : res;
  },
  set(target, key, value) {
    const res = Reflect.set(target, key, value);
    console.log("set", key);

    trigger(target, key);
    return res;
  },
  deleteProperty(target, key) {
    const res = Reflect.deleteProperty(target, key);
    console.log("deleteProperty", key);

    trigger(target, key);
    return res;
  },
};

function reactive(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  return new Proxy(obj, baseHandler);
}

const effectStack = [];

function effect(fn) {
  // 获取响应函数
  const e = createReactiveEffect(fn)();
  // 立刻执行它
  return e;
}

function createReactiveEffect(fn) {
  const effect = function() {
    try {
      // 1.保存fn
      effectStack.push(fn);
      // 2.执行 fn
      return fn()
    } finally {
      // 取消fn保存
      effectStack.pop();
    }
  };
  return effect;
}

// 创建一个数据结构可以保存依赖和响应函数之间的映射关系
const targetMap = new WeakMap();
function track(target, key) {
  // 获取响应函数
  const effect = effectStack[effectStack.length - 1];

  if (effect) {
    // 获取一下target值，不存在就创建
    let depMap = targetMap.get(target);

    if (!depMap) {
      depMap = new Map();
      targetMap.set(target, depMap);
    }

    // 获取depMap对应的依赖集合，不存在则创建
    let deps = depMap.get(key);
    if (!deps) {
      deps = new Set();
      depMap.set(key, deps);
    }

    // 响应函数放入deps
    deps.add(effect);
  }
}


function trigger(target, key) {
  const depMap = targetMap.get(target);
  if (!depMap) {
    return;
  }

  const deps = depMap.get(key);
  if (deps) {
    deps.forEach((dep) => dep());
  }
}

const state = reactive({ foo: "foo", bar: { n: 1 } });

effect(() => {
  console.log("effect1", state.foo);
});
effect(() => {
    console.log("effect2", state.foo);
  });
// state.foo;
state.foo = "fooooo";
// state.bar = "bar";
// state.bar;
// delete state.bar;
state.bar.n;
