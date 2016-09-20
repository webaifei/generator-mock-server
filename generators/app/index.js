'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.option('skip-install');
    this.fileStructure = ['config', 'models', 'controllers', 'routes',
      'views', 'public', 'bin'
    ];
  },
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the rad ' + chalk.red('generator-mock-server') + ' generator!'
    ));

    return this.prompt([{
      type: 'input',
      name: 'appname',
      message: 'input your appname?',
      default: ''
    }])
      .then(function (props) {
        // To access props later use this.props.someAnswer;
        this.config.set(props);
      }.bind(this));
  },

  writting: function() {
    // init
    this.fileStructure.forEach(function(item, index) {
      this.mkdir(item)
    }.bind(this));


    // 拷贝模版文件 www app

    this.fs.copyTpl(
      this.templatePath('app.js'),
      this.destinationPath('app.js'), {
        name: this.config.get('appname')
      }
    );
    this.fs.copyTpl(
        this.templatePath('www'),
        this.destinationPath('bin/www'), {
          name: this.config.get('appname')
        }
      )
      // routes/index
    this.fs.copy(
      this.templatePath('routes.index'),
      this.destinationPath('routes/index.js')
    )

    this.fs.copy(
      this.templatePath('index.html.tpl'),
      this.destinationPath('views/index.html')
    )
    this.fs.copy(
      this.templatePath('error.html.tpl'),
      this.destinationPath('views/error.html')
    )
    this.fs.copy(
      this.templatePath('eslintrc'),
      this.destinationPath('.eslintrc')
    )


    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    )


    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        name: this.config.get('appname')
      }
    )


  },

  install: function () {
    if(this.options['skip-install']){
      return;
    }
    this.npmInstall();
  }
});
