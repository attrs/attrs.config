function meta(name, alt) {
  if( typeof document !== 'object' ) return alt || null;
  var root = document.head.querySelector('meta[name="' + name + '"][content]');
  return (root && root.getAttribute('content')) || alt || null;
}

module.exports = function(options) {
  if( !window.localStorage ) throw new Error('browser does not support localstorage');
  
  return {
    save: function(name, config) {
      config = config || {};
      window.localStorage[name] = JSON.stringify(config);
    },
    load: function(name) {
      var value = window.localStorage[name];
      return value && JSON.parse(value);
    },
    defaults: function(name, key) {
      var envkey = (name + (key ? ('.' + key) : '')).toUpperCase().split('.').join('_');
      return meta(name + '.' + key, process.env[envkey]);
    }
  };
};