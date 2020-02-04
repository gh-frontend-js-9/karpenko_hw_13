(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('loginView', ['exports'], factory) :
    (global = global || self, factory(global.loginView = {}));
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

    class LoginView {
      constructor() {
        this.generateTemplate();
      }

      generateTemplate() {
        this.loginSection = document.createElement('section');
        this.loginSection.className = "auth-app-wrapper";
        let header_group = document.createElement('div');
        header_group.className = "input__group";
        let header = document.createElement('p');
        header.className = "form__header";
        header.innerHTML = 'Log in';
        let link = document.createElement('a');
        link.className = "link";
        link.innerHTML = 'Not a member?';
        link.setAttribute('href', '/dashboard'); // 

        let forgot_data_link = document.createElement('a');
        forgot_data_link.className = "link";
        forgot_data_link.setAttribute('href', '/html/auth_services/reset_password.html');
        forgot_data_link.innerHTML = "Forgot password?";
        header_group.appendChild(header);
        header_group.appendChild(link);
        header_group.appendChild(forgot_data_link);
        this.form = document.createElement('form');
        this.form.className = "form";
        this.email = document.createElement('input');
        this.email.className = "input__element";
        this.email.id = 'email';
        this.email.type = "email";
        this.email.placeholder = "Email...";
        this.password = document.createElement('input');
        this.password.className = "input__element";
        this.password.type = "password";
        this.password.id = "password";
        this.password.placeholder = "Password...";
        let input__group = document.createElement('div');
        input__group.className = "input__group";
        input__group.appendChild(this.email);
        input__group.appendChild(this.password);
        this.message_error = document.createElement('div');
        this.message_error.className = "input__message_error";
        this.message_success = document.createElement('div');
        this.message_success.className = "input__message_success";
        this.button = document.createElement('button');
        this.button.className = "form__button";
        this.button.innerHTML = "Log in";
        this.button.addEventListener('click', e => {
          e.preventDefault();
          this.login();
        });
        this.image_wrapper = document.createElement('article');
        this.image_wrapper.className = "form__image";
        let image = document.createElement('img');
        image.src = "/images/auth/logo.jpeg";
        image.className = "form__image__item";
        this.image_wrapper.appendChild(image);
        this.form.appendChild(header_group);
        this.form.appendChild(input__group);
        this.form.appendChild(this.message_error);
        this.form.appendChild(this.button);
        this.loginSection.appendChild(this.image_wrapper);
        this.loginSection.appendChild(this.form);
        document.querySelector("#root").appendChild(this.loginSection);
      }

      login() {
        new FetchTemplate(document.querySelector('.input__message_error'), document.querySelector('.input__message_success')).request("api/users/login", TYPES.post, {
          email: this.email.value,
          password: this.password.value
        });
      }

    }

    exports.LoginView = LoginView;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
