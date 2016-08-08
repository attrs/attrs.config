var path = require('path');
var fs = require('fs');
var os = require('os');
var base = path.join(os.homedir(), '.attrs.config');

function Configurator(name, options) {
  if( !name ) throw new Error('missing name');
  if( typeof name !== 'string' ) throw new Error('illegal name');
  
  if( !fs.existsSync(base) ) fs.mkdirSync(base);
  var file = path.resolve(base, name);
  var config = {};
  options = options || {};
  options.autosave = options.autosave === false ? false : true;
  
  /*function evaluation(key, value) {
    if( arguments.length === 1 ) {
      if( !~key.indexOf('.') ) return config[key];
      
      var result;
      try {
        eval('result = config.' + key);
      } catch(e) {}
      
      return result;
    } else if( value === null || value === undefined ) {
      if( !~key.indexOf('.') ) {
        delete config[key];
      } else {
        try {
          eval('delete config.' + key);
        } catch(e) {}
      }
    } else {
      if( !~key.indexOf('.') ) {
        config[key] = value;
      } else {
        var current = config;
        var arg = key.split('.'), i = 1;
        arg.every(function(k) {
          if( !current ) return false;
          
          if( i === arg.length ) current = current[k] = value;
          else if( !(k in current) ) current = current[k] = {};
          else if( typeof current[k] !== 'object' ) return false;
          else current = current[k];
          
          i = i + 1;
          return true;
        });
      }
    }
  }*/
  
  function save() {
    console.log('!save');
    config = config || {};
    fs.writeFileSync(file, JSON.stringify(config, null, '  '), {
      encoding: options.encoding || 'utf8',
      mode: options.mode || 0777
    });
    return this;
  }
  
  function autosave() {
    if( options.autosave ) save();
    return this;
  }
  
  function load() {
    if( !fs.existsSync(file) ) return;
    config = JSON.parse(fs.readFileSync(file));
    return this;
  }
  
  function has(key) {
    if( typeof key !== 'string' ) return false;
    return key in config;
  }
  
  function subset(key) {
    var subset = {};
    Object.keys(config).forEach(function(k) {
      if( !k.startsWith(key) ) return;
      
      var subkey = k.substring(key.length+1) || '';
      subset[subkey] = config[k];
    });
    return subset;
  }
  
  function getvalue(key) {
    return config[key] || null;
  }
  
  function setvalue(key, value) {
    if( arguments.length === 1 ) {
      if( typeof key === 'object' ) {
        Object.keys(key).forEach(function(k) {
          config[k] = key[k];
        });
      }
      autosave();
      return this;
    }
    
    if( value === null || value === undefined ) delete config[key];
    else config[key] = value;
    autosave();
    return this;
  }
  
  function clear() {
    config = {};
    autosave();
  }
  
  function ctx(key, value) {
    if( !arguments.length ) return config;
    if( arguments.length === 1 && typeof key === 'object' ) return setvalue(key);
    if( arguments.length === 1 ) return getvalue(key);
    else setvalue(key, value);
    return this;
  }
  
  ctx.refresh = load;
  ctx.save = save;
  ctx.get = getvalue;
  ctx.set = setvalue;
  ctx.subset = subset;
  ctx.has = has;
  ctx.clear = clear;
  ctx.options = options;
  load();
  
  return ctx;
}

module.exports = Configurator;