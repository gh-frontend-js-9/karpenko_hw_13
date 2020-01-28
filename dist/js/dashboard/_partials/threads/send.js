(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('send', ['exports'], factory) :
    (global = global || self, factory(global.send = {}));
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
    const headers = {
      auth: {
        "x-auth-token": config.key,
        "Content-Type": "application/json"
      },
      access: {
        "x-access-token": config.key,
        "Content-Type": "application/json"
      }
    };

    class SendMessage {
      constructor() {
        this._id = window.localStorage.getItem("_id");
      }

      send(data) {
        fetch(`http://${config.domain}/api/threads/messages`, {
          method: TYPES.post,
          headers: headers.access,
          body: JSON.stringify(data)
        }).then(responce => {
          console.log(data);

          if (responce.status >= 200 && responce.status < 400) {
            alert("Succesfully send messege");
          } else {
            alert(`Occured error: ${responce.statusText}`);
          }
        });
      }

    }

    exports.SendMessage = SendMessage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
