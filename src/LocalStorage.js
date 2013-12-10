/**
 * LocalStorage.js
 *
 * Simple wrapper for localStorage with optional async support
 *
 * @author  Michael Wager <mail@mwager.de>
 * @licence MIT
 */
(function() {
    'use strict';

    function ensureCallback(callback) {
        return typeof callback !== 'function' ? function() {} : callback;
    }

    function parseKey(key) {
        return 'ls_' + key;
    }


    //////////////////// 1. DEFINITION ////////////////////
    var LocalStorage = function() {
        this.storage = window.localStorage;

        // test for support
        var self = this;

        this.isValid = !!window.localStorage && (function() {
            // in mobile safari if safe browsing is enabled, window.storage
            // is defined but setItem calls throw exceptions.
            var success = true;
            var value = Math.random();
            try {
                self.storage.setItem(value, value);
            } catch (e) {
                success = false;
            }
            self.storage.removeItem(value);
            return success;
        })();
    };

    //////////////////// 2. PROTOTYPE ////////////////////
    LocalStorage.prototype = {
        isValid: function() {
            return this.isValid;
        },

        get: function(key, callback) {
            callback = ensureCallback(callback);
            key      = parseKey(key);

            /*TODO?
            if(!this.isValid) {
                callback(null, null);
            }*/

            try {
                var data = JSON.parse(
                    this.storage.getItem(key)
                );

                callback(null, data);

                // support sync api too!
                return data;
            }
            catch(e) {
                callback(e);
            }
        },

        save: function(key, data, callback) {
            callback = ensureCallback(callback);
            key      = parseKey(key);

            try {
                this.storage.setItem(key, JSON.stringify(data));
                callback(null, data);
            }
            catch(e) {
                callback(e);
            }
        },

        delete: function(key, callback) {
            callback = ensureCallback(callback);
            key      = parseKey(key);

            try {
                this.storage.removeItem(key);
                callback(null);
            }
            catch(e) {
                callback(e);
            }
        },

        nuke: function(callback) {
            callback = ensureCallback(callback);

            this.storage.clear();

            callback(null);
        }
    };



    //////////////////// 3. EXPORT ////////////////////
    // Export using AMD support...
    if(typeof define === 'function' && define.amd) {
        define([/* no deps */], function() {
            return LocalStorage;
        });
    }
    // ...or simply to the global namespace
    else {
        window.LocalStorage = LocalStorage;
    }
})();
