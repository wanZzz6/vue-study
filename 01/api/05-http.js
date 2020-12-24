// 打印原型链
function getPrototypeChain(obj) {
  var protoChain = [];
  while ((obj = Object.getPrototypeOf(obj))) {
    //返回给定对象的原型。如果没有继承属 性，则返回 null 。
    protoChain.push(obj);
  }
  protoChain.push(null);
  return protoChain;
}

// const { captureRejectionSymbol } = require("events");

// ==================================================
const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response) => {
  //   console.log("there is a request");
  //   console.log(request);
  //   console.log("=================");
  //   console.log(getPrototypeChain(response));
  //   response.end("a response from server");

  const { url, method, headers } = request;
  if (url === "/" && method === "GET") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" });
        response.end("500，服务器错误");
        return;
      }
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.end(data);
    });
  } else if (url === "/users" && method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify([{ name: "tom", age: 20 }]));
  } else if (method === "GET" && headers.accept.indexOf("image/*") !== -1) {
    fs.createReadStream("." + url).pipe(response);
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain;charset=utf-8");
    response.end("404, 页面没有找到");
  }
});
server.listen(3000);
