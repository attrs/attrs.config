var config = require('..')(module, {autosave: false});

console.log(config.id);
config('', 'empty');
config('a.b.c', 1);
config('a.b', 2);
config.clear();
config('a.b.d', 3);
config('c.a', {g:4});
config('c.b', 'test');
config('d', 1);
config({
  q:1,
  z:2
});

console.log('config("")', config(''));
console.log('config("q")', config('q'));
console.log('config', JSON.stringify(config(), null, '  '));
console.log('config.subset("a")', config.subset('a'));
console.log('config.subset("b")', config.subset('b'));
console.log('config.subset("c")', config.subset('c'));
console.log('config.subset("d")', config.subset('d'));
console.log('config.keys()', config.keys());
console.log('config.keys("a")', config.keys('a'));


console.log('config.clear', config());

config.save();