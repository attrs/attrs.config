# tinyconfig

```sh
$ npm install tinyconfig --save
```

```sh
// init
var config = require('tinyconfig')(module);

// alt init
config = require('tinyconfig')('category');

// set
config('key', 'value');

// get
var value = config('key');

// remove
config('key', null);

// misc
var b = config.has('key');
var value = config.get('key');
var keys = config.keys();
config.set('key', 'value');
config.set({
    'a': 'value',
    'b': 'value'
});
config.clear();
```