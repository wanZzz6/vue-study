// vue3 Proxy  ref
const isObject = (v) => typeof v === "object" && v !== null;

const baseHandler = {
  get(target, key) {
    const res = Reflect.get(target, key);
    console.log("get", key);
    return isObject(res) ? reactive(res) : res;
  },
  set(target, key, value) {
    const res = Reflect.set(target, key, value);
    console.log("set", key);
    return res;
  },
  deleteProperty(target, key) {
    const res = Reflect.deleteProperty(target, key);
    console.log("deleteProperty", key);
    return res;
  },
};

function reactive(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  return new Proxy(obj, baseHandler);
}

// fixme
const state = reactive({ foo: "foo", bar: { n: 1 } });
state.foo;
state.foo = "fooooo";
// state.bar = "bar";
// state.bar;
state.bar.n;
delete state.bar;
