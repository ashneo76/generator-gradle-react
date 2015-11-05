'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('gradle-react:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ name: 'test_gradle_react', package_name: 'net.ashishshah' })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'test_gradle_react/build.gradle',
      'test_gradle_react/client/js/app.js',
      'test_gradle_react/client/sass/index.scss',
      'test_gradle_react/gradle.properties',
      'test_gradle_react/Gulpfile.js',
      'test_gradle_react/package.json',
      'test_gradle_react/settings.gradle',
      'test_gradle_react/src/main/groovy/net/ashishshah/AppConfig.groovy',
      'test_gradle_react/src/main/groovy/net/ashishshah/App.groovy',
      'test_gradle_react/src/main/groovy/net/ashishshah/WebController.groovy',
      'test_gradle_react/src/main/resources/application.properties',
      'test_gradle_react/src/main/resources/templates/index.html'
    ]);
  });
});
