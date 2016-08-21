'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
const path = require('path');
var walk = require('esprima-walk');
var utils = require('../app/utils')
/**
 * 输入的api 格式 api/xxx/product/xxx
 * 路由的格式
 * 文件夹的名称 api.xxx.product.xxx
 */

module.exports = yeoman.Base.extend({
  constructor:function (){
    yeoman.Base.apply(this, arguments);

    // apiName 用来说明次api的用途
    this.argument('apiName',{
      required: true,
      type: String
    })

  },
  // 把新的路由添加index中
  _addExportRoute: function(path,routePath, routeName){
    var tree = utils.read(path);

    var routeNode = {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": routeName
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "require"
                        },
                        "arguments": [
                            {
                                "type": "Literal",
                                "value": routePath,
                                "raw": routePath
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        }
    const routeExportNode = {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name":  routeName
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": routeName
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
    walk(tree, function (node){
      if(node.type == 'Program'){

        node.body.unshift(routeNode);
      }else if(node.type =='ExpressionStatement' && node.expression.type =='AssignmentExpression'){
        node.expression.right.properties.push(routeExportNode)
      }
    })
    // console.log(JSON.stringify(tree))
    utils.write(tree,path)

  },
  // path type
  prompting: function (){
    return this.prompt([
      {
        type:'input',
        name:'path',
        message:'input the requested path for this api',
        default:'get'
      },
      {
        type:'input',
        name:'type',
        message:'input the method for requestting this api',
        default:'get'
      }
    ]).then(function (answers){
      this.config.set(answers)
    }.bind(this))
  },
  // TODO: 把新增的api增加到routes/index.js 中
  writing: function (){
    var apiName = this.apiName,
        reqPath = this.config.get('path'),
        type = this.config.get('type'),
        exportPath = this.destinationPath('routes/index.js'),
        routePath = this.destinationPath('routes/api.'+apiName+'.js'),
        routeName = apiName;
    // this.fs.copyTpl(
    //   this.templatePath('route.index'),
    //   this.destinationPath('routes/index.js')
    // )
    this.fs.copyTpl(
      this.templatePath('api.tpl'),
      routePath,
      {
        apiName: apiName,
        reqPath: reqPath,
        type: type
      }
    )

    this._addExportRoute(exportPath, './api.'+apiName+'.js', routeName);

  }
})
