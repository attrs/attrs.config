
function Configurator(name, options) {
  if( name && name.filename ) {
    var m = {filename:name.filename,exports:{}};
    require('pkginfo')(m);
    name = m.exports.name;
  }
  if( !name ) throw new Error('missing name');
  if( typeof name !== 'string' ) throw new Error('illegal name');
  
  options = options || {};
  
  var store;
  if( typeof window === 'object' ) {
    if( window.localStorage ) store = require('./storage/localstorage.js')(options);
    else store = require('./storage/cookie.js')(options);
  } else {
    store = require('./storage/fs.js')(options);
  }
  
  function has(key) {
    if( typeof key !== 'string' ) return false;
    return store.has(name, key);
  }
  
  function keys() {
    return store.keys(name);
  }
  
  function getvalue(key) {
    if( typeof key !== 'string' ) throw new TypeError('key must be a string');
    return store.get(name, key) || null;
  }
  
  function remove(key) {
    store.remove(name, key);
  }
  
  function clear() {
    store.clear(name);
    return this;
  }
  
  function all() {
    return store.all();
  }
  
  function setvalue(key, value) {
    if( arguments.length === 1 ) {
      if( typeof key === 'object' ) {
        Object.keys(key).forEach(function(k) {
          setvalue(k, key[k]);
        });
      }
      return this;
    }
    
    if( typeof key !== 'string' ) throw new TypeError('key must be a string');
    if( value === null || value === undefined ) store.remove(name, key);
    else store.set(name, key, value);
    return this;
  }
  
  function ctx(key, value) {
    if( !arguments.length ) return all();
    if( arguments.length === 1 && typeof key === 'object' ) return setvalue(key);
    if( arguments.length === 1 ) return getvalue(key);
    else setvalue(key, value);
    return this;
  }
  
  ctx.id = name;
  ctx.keys = keys;
  ctx.get = getvalue;
  ctx.set = setvalue;
  ctx.remove = remove;
  ctx.all = all;
  ctx.has = has;
  ctx.clear = clear;
  
  return ctx;
}

module.exports = Configurator;