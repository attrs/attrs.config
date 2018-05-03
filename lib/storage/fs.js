var fs = require('fs');
var os = require('os');
var path = require('path');
var mkdirp = require('mkdirp');
var base = path.join(os.homedir(), '.tinyconfig');

function getDefault(name, key) {
  var envkey = (name + (key ? ('.' + key) : '')).toUpperCase().split('.').join('_');
  return process.env[envkey];
}

module.exports = function(options) {
  // @TODO: watch 구현, save 시 여러번 호출된 결과를 비동기로 저장하는 방식으로 변경
  
  function save(name, config) {
    var file = path.resolve(base, name + '.config.json');
    var dirname = path.dirname(file);
    
    if( !config ) {
      if( fs.existsSync(file) ) fs.unlinkSync(file);
    } else {
      if( !fs.existsSync(dirname) ) mkdirp.sync(dirname);
      fs.writeFileSync(file, JSON.stringify(config, null, '  '), {
        encoding: options.encoding || 'utf8'
      });
    }
  }
  
  function load(name) {
    var file = path.resolve(base, name + '.config.json');
    if( !fs.existsSync(file) ) return null;
    var contents = fs.readFileSync(file);
    return contents ? JSON.parse(contents) : null;
  }
  
  var configs = {};
  
  return {
    get: function(name, key) {
      var config = configs[name] = load(name);
      return (config && config[key]) || getDefault(name, key);
    },
    keys: function(name) {
      var config = configs[name];
      return config ? Object.keys(config) : [];
    },
    has: function(name, key) {
      var config = configs[name];
      return config && config[key] ? true : false;
    },
    set: function(name, key, value) {
      var config = configs[name] = configs[name] || {};
      config[key] = value;
      save(name, config);
    },
    remove: function(name, key) {
      var config = configs[name];
      if( config ) delete config[key];
      save(name, config);
    },
    clear: function(name) {
      delete configs[name];
      save(name, null);
    }
  };
};