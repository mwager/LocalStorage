# VanillaStorage #

Simple `window.localStorage` abstraction wrapper

## Installation ##

### Via bower  ###

Add this to your `bower.json`:

    "LocalStorage": "https://raw.github.com/mwager/LocalStorage/master/src/LocalStorage.js"

Then execute:

    $ bower install

### From source  ###

    $ git clone https://github.com/mwager/LocalStorage
    $ npm install && bower install
    # -> src/LocalStorage.js

    # run the tests
    $ grunt test
    # or:
    $ open test/index.html


## API ##

```javascript
var ls = new LocalStorage();

ls.isValid() // true if environment supports localStorage

// persist:
ls.save('some-key', {foo:'bar'});

// read:
var obj = ls.get('some-key', {foo:'bar'});

// delete:
ls.delete('some-key');

// clear localStorage:
ls.nuke();
```

## Code Quality ##

    # We use jshint for static analysis, execute:
    $ jshint .
