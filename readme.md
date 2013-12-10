# VanillaStorage #

Simple `window.localStorage` abstraction wrapper

## Installation ##

### Via bower  ###

    # TODO raw url?
    $ bower install LocalStorage

### From source  ###

    $ git clone ...
    $ npm install && bower install
    # -> src/LocalStorage.js

    # run the tests
    $ grunt test
    # or:
    $ open test/index.html


## API ##

Usage is simple and straightforward.

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
