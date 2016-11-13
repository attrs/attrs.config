function meta(name, alt) {
  if( typeof document !== 'object' ) return alt || null;
  var root = document.head.querySelector('meta[name="' + name + '"][content]');
  return (root && root.getAttribute('content')) || alt || null;
}

function getDefault(name, key) {
  var envkey = (name + (key ? ('.' + key) : '')).toUpperCase().split('.').join('_');
  return meta(name + '.' + key, process.env[envkey]);
}

function setItem(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (365*24*60*60*1000));
  var expires = 'expires='+ d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function removeItem(cname) {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; ;path=/';
}

function getItem(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length);
    }
  }
  return '';
}

function getCookieNames(prefix) {
  var keys = [];
  document.cookie.split(';').forEach(function(cookie) {
    cookie = cookie.trim();
    var key = cookie.substring(0, cookie.indexOf('='));
    if( key.indexOf(prefix) === 0 ) keys.push(key);
  });
  
  return keys;
}

module.exports = function(options) {
  return {
    get: function(name, key) {
      var value = getItem(name + '.' + key);
      if( value ) return JSON.parse(value);
      return getDefault(name, key);
    },
    keys: function(name) {
      var arr = [];
      getCookieNames(name + '.').forEach(function(key) {
        arr.push(key.substring(name.length + 1));
      });
      return arr;
    },
    has: function(name, key) {
      return !!getItem(name + '.' + key);
    },
    set: function(name, key, value) {
      setItem(name + '.' + key, JSON.stringify(value || ''));
    },
    remove: function(name, key) {
      removeItem(name + '.' + key);
    },
    clear: function(name) {
      getCookieNames(name + '.').forEach(function(key) {
        removeItem(key);
      });
    }
  };
};