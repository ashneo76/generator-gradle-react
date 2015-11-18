'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the excellent ' + chalk.red('Gradle-React') + ' generator!'
      + 'This will create a project directory with neccessary Gradle + React files'
    ));

    var prompts = [{
        name: 'name',
        message: 'What is the project name?'
      },
      {
        name: 'package_name',
        message: 'What is the base package name?'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var name = this.props.name;
      var package_name = this.props.package_name;

      var src_root_from = 'src/main/groovy/package_name';
      var src_root_to = 'src/main/groovy/' + package_name.replace('.', '/');
      var res_root = 'src/main/resources';
      var client_root = 'client/';

      var name_files = ['package.json', 'settings.gradle'];
      var package_name_files = ['gradle.properties'];
      var src_files = [
        'App.groovy',
        'AppConfig.groovy',
        'WebController.groovy'
      ];
      var normal_files = ['build.gradle', 'Gulpfile.js', 'package.json',
        client_root + '/js/app.js', client_root + '/sass/index.scss',
        res_root + '/application.properties', res_root + '/templates/index.html'];

      var self = this;
      normal_files.forEach(function(item) {
        self.fs.copy(
          self.templatePath(item),
          self.destinationPath(name + '/' + item)
        );
      });

      name_files.forEach(function(item) {
        self.fs.copyTpl(
          self.templatePath(item),
          self.destinationPath(name + '/' + item),
          {
            name: name
          }
        );
      });

      package_name_files.forEach(function(item) {
        self.fs.copyTpl(
          self.templatePath(item),
          self.destinationPath(name + '/' + item),
          {
            package_name: package_name
          }
        );
      });

      src_files.forEach(function(item) {
        self.fs.copyTpl(
          self.templatePath(src_root_from + '/' + item),
          self.destinationPath(name + '/' + src_root_to + '/' + item),
          {
            package_name: package_name
          }
        );
      });
    },

    projectfiles: function () {
    }
  },

  install: function () {
    if(!this.options.skipInstall) {
      this.log('Run "gradle wrapper && ./gradlew setup" in the project root to get started');
    }
  }
});
