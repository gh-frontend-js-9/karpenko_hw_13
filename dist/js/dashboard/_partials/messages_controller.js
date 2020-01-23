(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('messagesController', ['exports'], factory) :
    (global = global || self, factory(global.messagesController = {}));
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

    class MessagesView {
      constructor() {
        this._generate();
      }

      _generate_header() {
        this.header = document.createElement('header');
        this.header.className = "main_content__messages__header";
        this.messagesControlElements = document.createElement('div');
        this.messagesControlElements.className = "main_content__messages__group";
        this.filterBlock = document.createElement('div');
        this.filterBlock.className = "main_content__messages__group__item"; // Filter block

        let filterBlock_text = document.createElement('span');
        filterBlock_text.className = "main_content__messages__group__item main_content__messages__group__item-white";
        filterBlock_text.innerText = "Filter messages:"; // 

        let filter_select_option_wrapper = document.createElement('select');
        filter_select_option_wrapper.className = "main_content__messages__header__select";
        let filter_values = ["Date", "Time", "Most popular"]; // 

        filter_values.forEach(value => {
          let option = document.createElement('option');
          option.className = "main_content__messages__header__option";
          option.value = value;
          option.innerHTML = value;
          filter_select_option_wrapper.appendChild(option);
        });
        this.filterBlock.appendChild(filterBlock_text);
        this.filterBlock.appendChild(filter_select_option_wrapper); // Inbox

        let inbox = document.createElement('span');
        let inbox_text = document.createElement('span');
        let inbox_icon = document.createElement('i');
        inbox_icon.className = "main_content__messages__header__icon fas fa-inbox";
        inbox.className = "main_content__messages__header__item";
        inbox.appendChild(inbox_icon);
        inbox_text.innerHTML = "Inbox";
        inbox.appendChild(inbox_text); // Sent

        let send = document.createElement('span');
        let send_icon = document.createElement('i');
        let send_text = document.createElement('span');
        send.className = "main_content__messages__header__item";
        send_text.innerText = "Sent";
        send_icon.className = "main_content__messages__header__icon fab fa-telegram-plane";
        send.appendChild(send_icon);
        send.appendChild(send_text); // Trash

        let trash = document.createElement('span');
        let trash_icon = document.createElement('i');
        let trash_text = document.createElement('span');
        trash.className = "main_content__messages__header__item";
        trash_icon.className = "main_content__messages__header__icon fas fa-trash";
        trash.appendChild(trash_icon);
        trash_text.innerText = "Trash";
        trash.appendChild(trash_text);
        this.messagesControlElements.appendChild(inbox);
        this.messagesControlElements.appendChild(send);
        this.messagesControlElements.appendChild(trash);
        this.header.appendChild(this.messagesControlElements);
        this.header.appendChild(this.filterBlock);
      }

      _generate__users_list() {
        this.users_list = document.createElement('article');
        this.users_list.className = "main_content__list_users";
        let list_wrapper = document.createElement('ul');
        let json = fetch(`https://${config.domain}/api/users/all`, {
          method: TYPES.get,
          headers: {
            "x-access-token": config.key,
            "Content-Type": 'application/json'
          }
        });
        Promise.resolve(json).then(resolve => {
          Promise.resolve(resolve.json()).then(array => {
            Object.values(array).forEach(user => {
              let li = document.createElement('li');
              li.className = "main_content__list_users__item box__header";
              li.innerText = user.name;
              list_wrapper.appendChild(li);
            });
          });
        });
        this.users_list.appendChild(list_wrapper);
      }

      _generate__message_field() {
        this.message_field = document.createElement('div');
        this.message_field.className = 'main_content__input_messages__wrapper';
        this.message_field__input = document.createElement('input');
        this.message_field__input.className = "main_content__input_messages__input_tag";
        this.message_field__input.placeholder = "Write a message";
        this.message_field__input.type = "text";
        let label = document.createElement('label');
        label.className = "fas fa-paperclip main_content__input_messages__icon";
        label.setAttribute('for', 'chooseFile');
        let clip = document.createElement('input');
        clip.id = "chooseFile";
        clip.style.display = 'none';
        clip.type = "file";
        this.message_field.appendChild(this.message_field__input);
        this.message_field.appendChild(label);
        this.message_field.appendChild(clip);
      }

      _generate__messages_list() {
        this._generate__message_field();

        this.messages_list = document.createElement('article');
        this.messages_list.className = "main_content__list_messages";
        let list_wrapper = document.createElement('ul');
        let responce = fetch(`https://${config.domain}/api/threads/messages/5e1a1c818ec2f49ab3e59ab2?sort=desc`, {
          headers: {
            "x-access-token": config.key
          }
        });
        Promise.resolve(responce).then(resolve => {
          Promise.resolve(resolve.json()).then(array => {
            Object.values(array).forEach(message => {
              let li = document.createElement('li');
              li.className = "main_content__list_users__item box__header";
              li.innerText = message.body;
              list_wrapper.appendChild(li);
            });
          });
        });
        this.messages_list.appendChild(list_wrapper);
        this.messages_list.appendChild(this.message_field);
      }

      _generate__user_info() {
        this.users_info = document.createElement("article");
        this.users_info.className = "main_content__list_info";
        let current_user = fetch(`https://${config.domain}/api/users/`, {
          method: TYPES.get,
          headers: {
            "x-access-token": config.key
          }
        });
        Promise.resolve(current_user).then(responce => {
          Promise.resolve(responce.json()).then(array => {
            Object.values(array).forEach(user => {});
          });
        });
      }

      _generate_main_content() {
        this.main_content = document.createElement('section');
        this.main_content.className = "main_content__section"; // 

        this._generate__messages_list();

        this._generate__users_list();

        this._generate__user_info(); // 


        let object_array = [this.users_list, this.messages_list, this.users_info];
        object_array.forEach(article => {
          this.main_content.appendChild(article);
        });
      }

      _generate() {
        this._generate_header();

        this._generate_main_content();

        this.messageBlock = document.createElement('main');
        this.messageBlock.classList = "messages";
        this.messageBlock.classList = "main_content";
        this.messageBlock.appendChild(this.header);
        this.messageBlock.appendChild(this.main_content);
      }

    }

    class MessagesController {
      constructor() {
        this.view = new MessagesView();

        this._render();
      }

      _render() {
        document.body.appendChild(this.view.messageBlock);
      }

    }

    exports.MessagesController = MessagesController;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
