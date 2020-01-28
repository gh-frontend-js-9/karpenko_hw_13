(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('getThreadsById', ['exports'], factory) :
    (global = global || self, factory(global.getThreadsById = {}));
}(this, (function (exports) { 'use strict';

    const config = {
      "host": "localhost",
      "port": 3000,
      "domain": "geekhub-frontend-js-9.herokuapp.com",
      "key": window.localStorage.getItem("key") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE5YzIyM2E0MTk5YzAwMjI3NTI2OGEiLCJpYXQiOjE1Nzk2ODc4OTl9.M5q83O_nP6B8SbfNKOs3CaQTu4JaQcbr_MgDLSgqnTU",
      "interval": 5000
    };

    const TYPES = {
      "get": 'GET',
      'post': 'POST'
    };

    class GetThread {
      constructor() {}

      getThreads(id, sort) {
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
