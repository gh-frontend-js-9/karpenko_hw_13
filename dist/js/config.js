(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('config', ['exports'], factory) :
    (global = global || self, factory(global.config = {}));
}(this, (function (exports) { 'use strict';

    const config = {
      "host": "localhost",
      "port": 3000
    };

    exports.config = config;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
