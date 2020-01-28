(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('getThreadsById', ['exports'], factory) :
    (global = global || self, factory(global.getThreadsById = {}));
}(this, (function (exports) { 'use strict';

    const config = {
      "host": "localhost",
      "port": 3000,
      "domain": "geekhub-frontend-js-9.herokuapp.com",
      "key": window.localStorage.getItem("key") || "",
      "interval": 5000
    };

    const TYPES = {
      "get": 'GET',
      'post': 'POST'
    };

    class GetThread {
      constructor() {}

      getThreads(id, sort) {
        console.log(config.key);
        fetch(`https://${config.domain}/api/threads/messages/${id}?sort=${sort}`, {
          method: TYPES.get,
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': config.key
          }
        });
      }

    }

    exports.GetThread = GetThread;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
