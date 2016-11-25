'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  initializing() {
    this.argument('name', {
      type: String,
      required: true,
      description: 'Your tempalte name:',
    });
  },
  writing: function () {
    this.fs.copy(
      this.templatePath('template.css'),
      this.destinationPath(`src/templates/${this.name}.css`)
    );

    this.fs.copyTpl(
      this.templatePath('template.xml'),
      this.destinationPath(`src/templates/${this.name}.xml`),
      this
    );
  },
});
