/**
 * 辅助函数
 */
const fs = require('fs');
const path = require('path');

const escodegenJsx = require('escodegen-wallaby');
const esprimaFb = require('esprima-fb');

function read(path){
  // 读取文件内容
  const data = fs.readFileSync(path, 'utf8');
  // 解析配置
  const options = {
    sourceType: 'module',
    range: true,
    tokens: true,
    comment: true
  };
  // 解析成ast
  return esprimaFb.parse(data, options);
}

function write(tree,path){
  tree = escodegenJsx.attachComments(tree, tree.comments, tree.tokens);
  const options = { comment: true, format: { indent: { style: '  ' } } };
  const code = escodegenJsx.generate(tree, options) + '\n';
  console.log(path,'----')
  fs.writeFileSync(path, code, 'utf8');
}

module.exports = {
  read: read,
  write: write
}
