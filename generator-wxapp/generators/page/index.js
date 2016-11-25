'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  initializing() {
    this.argument('name', {
      type: String,
      required: true,
      description: 'Your page name:',
    });
  },
  writing: function () {
    this.fs.copy(
      this.templatePath('page.js'),
      this.destinationPath(`src/pages/${this.name}.js`)
    );

    this.fs.copy(
      this.templatePath('page.css'),
      this.destinationPath(`src/pages/${this.name}.css`)
    );

    this.fs.copy(
      this.templatePath('page.xml'),
      this.destinationPath(`src/pages/${this.name}.xml`)
    );
  },
});
