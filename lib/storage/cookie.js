module.exports = function(options) {
  return {
    save: function(name, config) {
    },
    load: function(name) {
    }
  };
};

/*
function savetoken(token) {
  if( typeof document === 'object' ) {
    cleartoken();
    var date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = 'accesstoken=' + token + '; path=/; expires=' + date.toUTCString();
  } else {
    _token = token;
  }
}

function cleartoken() {
  if( typeof document === 'object' ) {
    var date = new Date();
    date.setDate( date.getDate() - 1 );
    document.cookie = 'accesstoken=; path=/; ' + date.toUTCString();
  } else {
    _token = null;
  }
}
function gettoken() {
  if( typeof document === 'object' ) {
    var name = 'accesstoken=';
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return '';
  } else {
    return _token || '';
  }
}
*/