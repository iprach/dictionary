'use strict';
var Dictionary = function() {
    this._dic = {};
    this.add = function(key, value) {
        if (typeof key !== 'string') throw new Error('Key is not string');
        this._dic[key] = value;
        return this;
    };
    this.get = function(key) {
        if (typeof key !== 'string') throw new Error('Key is not string');
        if (typeof this._dic[key] === 'object') {
            return JSON.parse(JSON.stringify(this._dic[key]));
        } else {
            return this._dic[key];
        }
    };
    this.del = function(key) {
        if (typeof key !== 'string') throw new Error('Key is not string');
        delete this._dic[key];
        return this;
    };
};

module.exports = Dictionary;
