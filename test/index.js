var config = require('..')(module);

config('a', {a:1,b:1});
config('b', 1);
config('c', null);
config('d', 'd');
config('e', [1,2,3]);

console.log(config.keys());
config.keys().forEach(function(k) {
  console.log(k, config(k));
});

config.remove('a');
config.remove('b');
config.remove('c');

console.log(config.keys());
config.keys().forEach(function(k) {
  console.log(k, config(k));
});

config.clear();

console.log(config.keys());
config.keys().forEach(function(k) {
  console.log(k, config(k));
});