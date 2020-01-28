(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('send', ['exports'], factory) :
    (global = global || self, factory(global.send = {}));
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

    class SendMessage {
      constructor() {
        this._id = window.localStorage.getItem("_id");
      }

      send(data) {
        console.log(data); // new FetchTemplate().request('api/threads/messages', TYPES.post, data)

        fetch(`http://${config.domain}/api/threads/messages`, {
          method: TYPES.post,
          headers: {
            'x-access-token': localStorage.getItem('key'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(responce => {
          console.log(responce.json());

          if (responce.ok) {
            alert("OK");
          }
        });
      }

    }

    exports.SendMessage = SendMessage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
