'use strict';
var Dictionary = require('../index.js');
var assert = require('assert');
describe('Dictionary Module', function() {

    describe('Constructor', function() {
        var dic1;
        var dic2;
        it('should new object successfully', function() {
            dic1 = new Dictionary();
            dic2 = new Dictionary();
            assert.equal(typeof new Dictionary(), 'object');
        });
        it('should has method `add`', function() {
            assert.equal(dic1.hasOwnProperty('add'), true);
        });
        it('should has method `get`', function() {
            assert.equal(dic1.hasOwnProperty('get'), true);
        });
        it('should has method `del`', function() {
            assert.equal(dic1.hasOwnProperty('del'), true);
        });
        it('should return not same value if have same key and difference value store for each object.', function() {
            var key = 'test';
            dic1.add(key, '1');
            dic2.add(key, 2);
            assert.equal(dic1.get(key), '1');
            assert.equal(dic2.get(key), 2);
        });
    });

    describe('#add(<String>)', function() {
        var dic;
        before(function() {
            dic = new Dictionary();
        });
        it('should accept only string key.', function() {
            try {
                dic.add(1, 'b');
                assert.equal(1, 'string');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
            try {
                dic.add({}, 'b');
                assert.equal({}, 'string');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
            try {
                dic.add(function() {}, 'b');
                assert.equal(function() {}, 'string');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
            try {
                dic.add('a', 'b');
                assert.equal('a', 'a');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
        });
        it('should add key-value successfully and return object class.', function() {
            assert.equal(dic.add('a', 'b') instanceof Dictionary, true);
        });
        it('should override value if update exists key.', function() {
            assert.equal(dic.add('a', 'c').get('a'), 'c');
        });
    });

    describe('#get(<String>)', function() {
        var dic;
        before(function() {
            dic = new Dictionary();
            dic.add('a', {
                'b': 'b'
            });
        });
        it('should accept only string key.', function() {
            try {
                dic.get(1);
                assert.equal(1, 'string');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
            try {
                dic.get({});
                assert.equal({}, 'string');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
            try {
                dic.get(function() {});
                assert.equal(function() {}, 'string');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
            try {
                var value = dic.get('a');
                assert.equal(value.b, 'b');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
        });
        it('should not reference to same object when call method get.', function() {
            var value = dic.get('a');
            value.b = 'c';
            var value2 = dic.get('a');
            assert.equal(value2.b, 'b');
        });
        it('should got undefined when get not exists key', function() {
            assert.equal(dic.get('b'), undefined);
        });
    });

    describe('#del(<String>)', function() {
        var dic;
        before(function() {
            dic = new Dictionary();
            dic.add('a', {
                'b': 'b'
            });
        });
        it('should accept only string key.', function() {
            try {
                dic.del(1);
                assert.equal(1, 'string');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
            try {
                dic.del({});
                assert.equal({}, 'string');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
            try {
                dic.del(function() {});
                assert.equal(function() {}, 'string');
            } catch (e) {
                assert.equal(e.message, 'Key is not string');
            }
        });
        it('should add key-value successfully and return object class.', function() {
            assert.equal(dic.del('a') instanceof Dictionary, true);
        });
        it('should remove key completely', function() {
            assert.equal(dic.get('a'), undefined);
        });
    });
});
