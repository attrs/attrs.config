var config = require('..')('test', {autosave: false});

config('', 'empty');
config('a.b.c', 1);
config('a.b', 2);
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

config.clear();

console.log('config("")', config(''));
console.log('config("q")', config('q'));
console.log('config', JSON.stringify(config(), null, '  '));
console.log('config', JSON.stringify(config.subset('a'), null, '  '));
console.log('config', JSON.stringify(config.subset('c'), null, '  '));
console.log('config', JSON.stringify(config.subset('d'), null, '  '));
console.log('config', JSON.stringify(config.subset('e'), null, '  '));

config.save();