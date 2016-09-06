var instances = {};

function Configurator(name, options) {
  if( name && name.filename ) {
    var m = {filename:name.filename,exports:{}};
    require('pkginfo')(m);
    name = m.exports.name;
  }
  if( !name ) throw new Error('missing name');
  if( typeof name !== 'string' ) throw new Error('illegal name');
  
  if( instances[name] ) return instances[name];
  
  options = options || {};
  options.autosave = options.autosave === false ? false : true;
  
  var store;
  if( typeof window === 'object' ) {
    store = require('./storage/browser.js')(options);
  } else {
    store = require('./storage/fs.js')(options);
  }
  
  var config = store.load(name) || {};
  
  function autosave() {
    if( options.autosave ) store.save(name, config);
    return this;
  }
  
  function has(key) {
    if( typeof key !== 'string' ) return false;
    return key in config;
  }
  
  function keys(key) {
    if( key ) return subkeys(key);
    return Object.keys(config);
  }
  
  function subkeys(key) {
    var subkeys = [];
    Object.keys(config).forEach(function(k) {
      if( k.startsWith(key) )
        subkeys.push(k.substring(key.length+1) || '');
    });
    
    return subkeys;
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
    if( typeof key !== 'string' ) throw new TypeError('key must be a string');
    return config[key] || store.defaults(name, key) || null;
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
    
    if( typeof key !== 'string' ) throw new TypeError('key must be a string');
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
  
  ctx.id = name;
  ctx.refresh = function() {
    config = store.load(name) || {};
    return this;
  };
  ctx.save = function() {
    store.save(name, config);
    return this;
  };
  ctx.keys = keys;
  ctx.get = getvalue;
  ctx.set = setvalue;
  ctx.subset = subset;
  ctx.has = has;
  ctx.clear = clear;
  ctx.options = options;
  
  instances[name] = ctx;
  
  return ctx;
}

module.exports = Configurator;