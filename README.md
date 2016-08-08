# tinyconfig

```sh
$ npm install tinyconfig --save
```

```sh
// init
var config = require('tinyconfig')('myconfig', {autosave:true, mode:0777, encoding: 'utf8'});

// set
config('key', 'value');

// get
var value = config('key');

// remove
config('key', null);

// get config object
var o = config();

// misc
var b = config.has('key');
var value = config.get('key');
var subset = config.subset('key');
config.set('key', 'value');
config.set({
    'a': 'value',
    'b': 'value'
});
config.save();
config.refresh();
config.clear();
```