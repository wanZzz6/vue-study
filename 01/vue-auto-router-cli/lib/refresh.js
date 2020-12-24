const fs = require("fs");
const handlebars = require("handlebars");
const chalk = require("chalk");
module.exports = async () => {
  // 获取页面列表
  const list = fs
    .readdirSync("./src/views")
    .filter((v) => v !== "Home.vue")
    .map((v) => ({
      name: v.replace(".vue", "").toLowerCase(),
      file: v,
    }));
  compile(
    {
      list,
    },
    "./src/router.js",
    "./template/router.js.hbs"
  );

  // 生成菜单
  compile(
    {
      list,
    },
    "./src/App.vue",
    "./template/App.vue.hbs"
  );

  /**
   *
   * 编译模板文件
   * @param meta 数据定义
   * @param filePath 目标文件路径
   * @param templatePath 模板文件路径
   */
  function compile(meta, filePath, templatePath) {
    // 判断存在
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString();
      const reslut = handlebars.compile(content)(meta);
      fs.writeFileSync(filePath, reslut);
    }
    console.log(chalk.red(`🚀${filePath} 创建成功`));
  }
};
