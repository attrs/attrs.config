module.exports = function(options) {
  return {
    save: function(name, config) {
      config = config || {};
      window.localStorage[name] = JSON.stringify(config);
    },
    load: function(name) {
      var value = window.localStorage[name];
      return value && JSON.parse(value);
    }
  };
};