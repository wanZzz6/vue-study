// 1. 实现单个数据基本响应式
// 2. 实现对象所有属性响应式，遍历
// 3. 实现对象所有属性的多层响应式，递归
// 4. 实现对象属性被覆盖赋值为新object 时的响应式，set修饰
// 5. 实现对象新增属性的响应式，定义 set方法
// 思考题：// 数组响应式：  7个mutation方法：push、pop。。。
function defineReactive(obj, key, val) {
// 注意
  observe(val)

  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key, "->", newVal);
        // 注意
        observe(newVal)
        val = newVal;
      }
    },
  });
}


// 属性动态新增和删除
function set(obj, key, val) {
  defineReactive(obj, key, val)
}

function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
  });
}

const obj = {
  foo: "foo",
  bar: { a: 1 },
};

observe(obj);

obj.foo;
obj.foo = "fooooooo";
obj.bar.a
obj.bar.a = 2

obj.bar = {b: '3'}
obj.bar.b


set(obj, 'dong', 'dong')
obj.dong
obj.dong = 'xi'