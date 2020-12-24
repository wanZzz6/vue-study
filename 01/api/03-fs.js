const fs = require("fs");

// 同步
// const data = fs.readFileSync("./download.js");
// console.log(data, data.toString());

// 异步方式1
// fs.readFile("./download.js", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// 异步方式2: async/await
(async () => {
  const fs = require("fs");
  const { promisify } = require("util");
  const readFile = promisify(fs.readFile);
  const data = await readFile("./index.html");
  console.log("data", data);
  // 打印
  console.log(Buffer.from(data).toString('utf-8'))
})();
console.log("=============");
