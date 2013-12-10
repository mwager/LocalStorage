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
    describe('LocalStorage.js', function () {
        before(function() {
            this.ls = new LocalStorage();
        });

        describe('save() && read()', function () {
            it('should save and read data by key', function (done) {
                var self = this;

                this.ls.save('test', {foo: 'bar'}, function() {
                    var data = self.ls.get('test');
                    expect(data.foo).to.equal('bar');
                    done();
                });
            });
        });

        describe('delete() && nuke()', function () {
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

        describe('Limits', function () {
            before(function() {
                this.TOO_MUCH_DATA = {
                    arr:[]
                };

                for(var i = 0; i < 1000000; i++) {
                    this.TOO_MUCH_DATA.arr.push([1,2,3,4,5,6,7,8,9,0]);
                }
            });
            it('should pass the error in the callback if we save too much', function (done) {
                this.ls.save('test', this.TOO_MUCH_DATA, function(err) {
                    expect(err.name).to.equal('QUOTA_EXCEEDED_ERR');
                    // log(err);
                    done();
                });
            });
        });
    });
});
