(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('index', ['exports'], factory) :
    (global = global || self, factory(global.index = {}));
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
        "x--token": config.key,
        "Content-Type": "application/json"
      },
      access: {
        "x-access-token": config.key,
        "Content-Type": "application/json"
      }
    };
    const server_settings = config;
    class FetchTemplate {
      constructor(error_field = null, success_field = null) {
        this.error_field = error_field;
        this.success_field = success_field;
      }

      request(path, type, data = null) {
        if (type == TYPES.get) {
          return fetch(`http://${server_settings.domain}/${path}`, {
            method: type,
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": config.key
            }
          }).then(async responce => {
            if (responce.status) {
              return responce.json();
            }
          }).catch(error => console.log(error));
        } else {
          return fetch(`http://${server_settings.domain}/${path}`, {
            method: type,
            headers: {
              'Content-Type': 'application/json',
              "x-auth-token": config.key
            },
            body: JSON.stringify(data)
          }).then(async responce => {
            if (path.includes('login') || path.includes('sigup')) {
              new FetchTemplate().PushUserDataToLocalStorage(responce);
            }

            if (responce.ok) {
              if (!this.error_field || !this.success_field) {
                alert("Success!");

                if (path.includes('login')) {
                  location.href = `/dashboard`;
                }
              } else {
                this.message_success.innerText = "Success!";
                setTimeout(() => {
                  this.success_field.innerText = "";

                  if (path.includes('login')) {
                    location.href = `/dashboard`;
                  }
                }, 1500);
              }
            } else {
              let text = '';
              Object.entries(data).forEach(([key, value]) => {
                if (key.includes('password')) {
                  if (value.length && value.length < 8) {
                    text = 'Password must include 8 symbols';
                  }
                }

                if (key.includes('email')) {
                  if (value.length && !value.includes("@") || !value.includes(".") || value.length < 4) {
                    text = 'Invalid email!';
                  }
                }

                if (!value.length) {
                  text = 'Input fields must be filled!';
                }
              });

              if (!this.success_field || !this.error_field) {
                alert(text);
              } else {
                this.error_field.innerText = text;
                setTimeout(() => {
                  this.error_field.innerHTML = "";
                }, 2000);
              }
            }
          }).catch(error => console.log(error));
        }
      }

      PushUserDataToLocalStorage(responce) {
        try {
          Promise.resolve(responce.json()).then(user => {
            Object.entries(user).forEach(([key, value]) => {
              window.localStorage.setItem("key", config.key);
              window.localStorage.setItem("_id", user._id);
            });
          });
        } catch (error) {
          throw new Error(`Error setting item to localStorage: \n${error}`);
        }
      }

    }

    exports.FetchTemplate = FetchTemplate;
    exports.TYPES = TYPES;
    exports.headers = headers;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
