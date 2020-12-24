#!/usr/bin/env node

const program = require("commander");
program.version(require("../package").version);
program
  .command("init <name>")
  .description("init project")
  // .action(name => console.log('init '+ name));
  // 传入可执行函数
  .action(require("../lib/init"));
