var fs = require('fs');
var os = require('os');
var path = require('path');
var mkdirp = require('mkdirp');
var base = path.join(os.homedir(), '.attrs.config');

module.exports = function(options) {
  return {
    save: function(name, config) {
      config = config || {};
    
      var file = path.resolve(base, name);
      var dirname = path.dirname(file);
      if( !fs.existsSync(dirname) ) mkdirp.sync(dirname, {mode:options.mode || 0777});
    
      fs.writeFileSync(file, JSON.stringify(config, null, '  '), {
        encoding: options.encoding || 'utf8',
        mode: options.mode || 0777
      });
    },
    load: function(name) {
      var file = path.resolve(base, name);
      if( !fs.existsSync(file) ) return;
      return JSON.parse(fs.readFileSync(file));
    },
    defaults: function(name, key) {
      var envkey = (name + (key ? ('.' + key) : '')).toUpperCase().split('.').join('_');
      return process.env[envkey];
    }
  };
};