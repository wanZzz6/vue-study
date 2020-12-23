test("⽣生成测试代码", () => {
  const src = new (require("../index"))();

console.log(src)
  const ret = src.getTextSource("fun", "class");
  console.log(ret)
//   expect(ret).toBe(`
//     test('TEST fun',() => {
//     const fun = require('../class') const ret = fun()
//     // expect(ret)
//     })
//     //
//     .toBe('test ret')
//     `);
});

// test("测试文件名生成", () => {
//   const src = new (require("../index"))();
//   const ret = src.getTestFileName("/abc/class.js");
//   console.log("getTestFileName", ret);

//   expect(ret).toBe("/abc/__test__/class.spec.js");
// });
