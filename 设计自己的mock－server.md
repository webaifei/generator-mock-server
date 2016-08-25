## 制作一个自己的生成mock平台的generator


当前的需求：
1. 构建项目结构 yo mock-server
2. 新增api yo mock-server:api apiName




最终的文件结构 模仿express官方推荐文件结构

```
  - config
    - config.js
  - models
  - controllers
  - routes
  - views
  - public
  - bin
    - www
  app.js
```



### 如何修改已经存在的文件
> 修改一个已经存在的文件的内容是比较麻烦的，尤其是js文件。
yeoman官方推荐的做法是使用js语法解析器将js文件解析成抽象语法树(AST),也就是abstract syntax tree
然后修改这个树，之后再将这棵树转换成js语法，存储到文件中，替换原来的文件。
所以我们基本上把这个过程分三步：
1. js=>AST(abstract syntax tree)
2. modify AST
3. AST=>js
要实现上面的流程，我们在步骤1中，把js解析成抽象语法树 可以使用esprima ;
```
export const AGE = 10;
//=> ast
{
    "type": "Program",
    "body": [
        {
            "type": "ExportNamedDeclaration",//这个注意点 和 esprima-fb的区别
            "declaration": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "AGE"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 10,
                            "raw": "10"
                        }
                    }
                ],
                "kind": "const"
            },
            "specifiers": [],
            "source": null
        }
    ],
    "sourceType": "module"
}
```
对应的步骤3 需要使用和esprima 配套的escodegen用来把AST转换成js代码
步骤2中的操作 目前 只会增加新的node  push
> 如果是jsx语法 需要将两个库文件 分别替换成：esprima-fb escodegen-wallaby

** 两套只能install一套 否则会影响使用 **


对于js源码的修改参考这个：http://www.cnblogs.com/ziyunfei/p/3183325.html
