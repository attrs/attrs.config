function meta(name, alt) {
  if( typeof document !== 'object' ) return alt || null;
  var root = document.head.querySelector('meta[name="' + name + '"][content]');
  return (root && root.getAttribute('content')) || alt || null;
}

function getDefault(name, key) {
  var envkey = (name + (key ? ('.' + key) : '')).toUpperCase().split('.').join('_');
  return meta(name + '.' + key, process.env[envkey]);
}

module.exports = function(options) {
  var ls = window.localStorage;
  return {
    get: function(name, key) {
      var value = ls.getItem(name + '.' + key);
      if( value ) return JSON.parse(value);
      return getDefault(name, key);
    },
    keys: function(name) {
      var arr = [];
      for(var i =0; i < ls.length; i++) {
        var key = ls.key(i);
        if( key.indexOf(name + '.') === 0 ) arr.push(key.substring(name.length + 1));
      }
      return arr;
    },
    has: function(name, key) {
      return !!ls.getItem(name + '.' + key);
    },
    set: function(name, key, value) {
      ls.setItem(name + '.' + key, JSON.stringify(value || ''));
    },
    remove: function(name, key) {
      ls.removeItem(name + '.' + key);
    },
    clear: function(name) {
      var keys = [];
      for(var i = 0; i < ls.length; i++) {
        var key = ls.key(i);
        if( key.indexOf(name + '.') === 0 ) keys.push(key);
      }
      
      keys.forEach(function(key) {
        ls.removeItem(key);
      });
    }
  };
};