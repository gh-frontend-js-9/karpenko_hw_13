(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('index', ['exports'], factory) :
    (global = global || self, factory(global.index = {}));
}(this, (function (exports) { 'use strict';

    const config = {
      "host": "localhost",
      "port": 3000,
      "domain": "geekhub-frontend-js-9.herokuapp.com",
      "key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE5YzIyM2E0MTk5YzAwMjI3NTI2OGEiLCJpYXQiOjE1Nzk2ODc4OTl9.M5q83O_nP6B8SbfNKOs3CaQTu4JaQcbr_MgDLSgqnTU"
    };

    const TYPES = {
      "get": 'GET',
      'post': 'POST'
    };
    const server_settings = config;
    class FetchTemplate {
      constructor(error_field, success_field) {
        this.error_field = error_field;
        this.success_field = success_field;
      }

      request(path, type, data = null) {
        if (type == TYPES.get) {
          return fetch(`https://${server_settings.domain}/${path}`, {
            method: type,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE5YzIyM2E0MTk5YzAwMjI3NTI2OGEiLCJpYXQiOjE1Nzk2ODc4OTl9.M5q83O_nP6B8SbfNKOs3CaQTu4JaQcbr_MgDLSgqnTU"
            },
            body: JSON.stringify({
              data
            })
          }).then(async responce => {
            if (responce.ok) {
              return responce.json();
            }
          }).catch(error => console.log(error));
        } else {
          return fetch(`https://${server_settings.domain}/${path}`, {
            method: type,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE5YzIyM2E0MTk5YzAwMjI3NTI2OGEiLCJpYXQiOjE1Nzk2ODc4OTl9.M5q83O_nP6B8SbfNKOs3CaQTu4JaQcbr_MgDLSgqnTU"
            },
            body: JSON.stringify({
              data
            })
          }).then(async responce => {
            if (responce.ok) {
              responce.json();
              this.message_success.innerText = "Success!";
              setTimeout(() => {
                this.success_field.innerText = "";
                location.href = `https://${server_settings.domain}:/html/dashboard/dashboard.html`;
              }, 1500);
            } else {
              let text = '';
              Object.entries(data).forEach(([key, value]) => {
                if (key.includes('password')) {
                  if (value.length && value.length < 8) {
                    text = 'Password must include 8 symbols';
                  }
                }

                if (key.includes('email')) {
                  if (value.length && /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.toString())) {
                    text = 'Invalid email!';
                  }
                }

                if (!value.length) {
                  text = 'Input fields must be filled!';
                }
              });
              this.error_field.innerText = text;
              setTimeout(() => {
                this.error_field.innerHTML = "";
              }, 2000);
            }
          }).catch(error => console.log(error));
        }
      }

    }

    exports.FetchTemplate = FetchTemplate;
    exports.TYPES = TYPES;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
