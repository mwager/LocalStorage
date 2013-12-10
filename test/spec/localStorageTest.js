/**
 * LocalStorage.js testsuite
 *
 * @author Michael Wager <mail@mwager.de>
 */
define(function(require) {
    'use strict';

    // Object under test
    var LocalStorage = require('src/LocalStorage');

    // The suite
    describe('LocalStorage Tests', function () {
        before(function() {
            this.ls = new LocalStorage();
        });

        describe('Basics', function () {
            it('should save and read data by key', function (done) {
                var self = this;

                this.ls.save('test', {foo: 'bar'}, function() {
                    var data = self.ls.get('test');
                    expect(data.foo).to.equal('bar');
                    done();
                });
            });

            it('should clear by key', function (done) {
                var self = this;

                this.ls.save('tmp', 'tmp');

                expect(this.ls.get('tmp')).to.equal('tmp');

                this.ls.delete('tmp', function() {
                    expect(self.ls.get('tmp')).to.equal(null);
                    done();
                });
            });

            it('should clear all data in the storage', function (done) {
                var self = this;

                this.ls.save('test', 'test');

                this.ls.nuke(function() {
                    expect(self.ls.get('test')).to.equal(null);
                    done();
                });
            });
        });
    });
});
