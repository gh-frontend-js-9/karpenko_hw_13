(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('dashboardController', ['exports'], factory) :
    (global = global || self, factory(global.dashboardController = {}));
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
              "x-auth-token": config.key
            },
            body: JSON.stringify({
              data
            })
          }).then(async responce => {
            if (responce.status) {
              return responce.json();
            }
          }).catch(error => console.log(error));
        } else {
          return fetch(`https://${server_settings.domain}/${path}`, {
            method: type,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "x-auth-token": config.key
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

    class UserInfoView {
      constructor() {
        this.create_info_object();
        this.render();
      }

      create_info_object() {
        this.info = {
          name: '',
          position: '',
          name: '',
          position: '',
          organization: '',
          description: '',
          contacts: {
            email: '',
            phone: '',
            address: ''
          }
        };
        let current_user = fetch(`https://${config.domain}/api/users/`, {
          method: TYPES.get,
          headers: {
            "x-access-token": config.key
          }
        });
        let test_description_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        current_user.then(responce => {
          Promise.resolve(responce.json()).then(user => {
            this.info.name = user.name;
            this.info.position = user.position;
            this.info.description = user.description;
            this.info.organization = user.organization; //   

            this.info.contacts.phone = user.phone;
            this.info.contacts.email = user.email;
            this.info.contacts.address = user.address; // append

            this.user_name.header.innerText = user.name;
            this.user_name.position.innerText = user.position;
            this.user_name.description.innerText = test_description_text ; // contacts

            this.email.p.innerText = user.email;
            this.phone.p.innerText = user.phone;
            this.address.p.innerText = user.address;
            this.organization.p.innerText = user.organization;
          });
        });
      }

      _create_avatar() {
        // avatar
        this.photo = document.createElement('div');
        this.photo.className = "main_content__list_info__photo"; // 

        let img = document.createElement('img');
        img.className = "main_content__list_info__img_tag";
        img.src = "https://i.pinimg.com/originals/24/48/d1/2448d1c98e7811280d8954a8285cd488.jpg"; // 

        this.photo.appendChild(img);
      }

      _create_header() {
        // header
        this.user_name = {
          wrapper: document.createElement('div'),
          header: document.createElement('p'),
          position: document.createElement('p'),
          description: document.createElement('p')
        }; // 

        this.user_name.wrapper.className = "main_content__list_info__wrapper"; // 

        this.user_name.header.className = "main_content__list_info__header main_content__list_info__wrapper__item";
        this.user_name.position.innerText = this.info.name; // proffession

        this.user_name.position.className = "main_content__list_info__subheader";
        this.user_name.position.innerText = this.info.position; // description

        this.user_name.description.className = "main_content__list_info__description main_content__list_info__wrapper__item";
        this.user_name.description.innerText = this.info.description; // 

        this.user_name.wrapper.appendChild(this.user_name.header);
        this.user_name.wrapper.appendChild(this.user_name.position);
        this.user_name.wrapper.appendChild(this.user_name.description);
      }

      _create_contacts() {
        // contacts
        this.contacts = document.createElement('section');
        this.contacts.className = "main_content__list_info__wrapper"; // email

        this.email = {
          article: document.createElement('article'),
          label: document.createElement('label'),
          p: document.createElement('p')
        };
        this.email.article.className = "main_content__list_info__wrapper__item";
        this.email.label.className = "main_content__list_info__label";
        this.email.label.innerText = "Email";
        this.email.p.className = "main_content__list_info__base";
        this.email.p.innerText = this.info.contacts.email; // 

        this.email.article.appendChild(this.email.label);
        this.email.article.appendChild(this.email.p); // phone

        this.phone = {
          article: document.createElement('article'),
          label: document.createElement('label'),
          p: document.createElement('p')
        };
        this.phone.article.className = "main_content__list_info__wrapper__item";
        this.phone.label.className = "main_content__list_info__label";
        this.phone.label.innerText = "Phone";
        this.phone.p.className = "main_content__list_info__base";
        this.phone.p.innerText = this.info.contacts.phone; // 

        this.phone.article.appendChild(this.phone.label);
        this.phone.article.appendChild(this.phone.p); // address

        this.address = {
          article: document.createElement('article'),
          label: document.createElement('label'),
          p: document.createElement('p')
        };
        this.address.article.className = "main_content__list_info__wrapper__item";
        this.address.label.className = "main_content__list_info__label";
        this.address.label.innerText = "Address";
        this.address.p.className = "main_content__list_info__base";
        this.address.p.innerText = this.info.contacts.address; // 

        this.address.article.appendChild(this.address.label);
        this.address.article.appendChild(this.address.p); // organization

        this.organization = {
          article: document.createElement('article'),
          label: document.createElement('label'),
          p: document.createElement('p')
        };
        this.organization.article.className = "main_content__list_info__wrapper__item";
        this.organization.label.className = "main_content__list_info__label";
        this.organization.label.innerText = "Organization";
        this.organization.p.className = "main_content__list_info__base";
        this.organization.p.innerText = this.info.organization; // 

        this.organization.article.appendChild(this.organization.label);
        this.organization.article.appendChild(this.organization.p); // Append contacts element
        //    let append_contacts_element = [this.photo, this.user_name.wrapper, this.address.article, this.organization.article];

        let append_contacts_element = [this.photo, this.user_name.wrapper, this.email.article, this.phone.article, this.address.article, this.organization.article];
        append_contacts_element.forEach(item => {
          this.contacts.appendChild(item);
        });
      }

      render() {
        this.create_info_object();

        this._create_avatar();

        this._create_header();

        this._create_contacts();
      }

    }

    class SendMessage {
      constructor() {
        this._id = '5e1a1c818ec2f49ab3e59ab2';
      }

      send(data) {
        alert(data);
        new FetchTemplate().request('api/threads/messages', TYPES.post, data);
      }

    }

    class topBarView {
      constructor() {
        this._generate();
      }

      _generate() {
        let item_class = 'bar-top__user_bar__item';
        this.topbar = document.createElement('header');
        this.topbar.className = "bar-top";
        let menu_toggler = document.createElement('button');
        menu_toggler.innerText = 'Menu';
        menu_toggler.className = "bar-top__menu_toggler";
        let logo = document.createElement('p');
        logo.className = 'bar-top__logo';
        logo.innerText = 'virtus';
        let user_bar = document.createElement('div');
        user_bar.className = 'bar-top__user_bar';
        let add_block = document.createElement('span');
        add_block.className = `${item_class} bar-top__user_bar__add_block`;
        let plus = document.createElement('i');
        plus.className = 'fas fa-plus bar-top__user_bar__plus_icon'; // 

        add_block.innerText = "Add";
        add_block.className = `${item_class} bar-top__user_bar__add_block`;
        add_block.appendChild(plus);
        let search_icon = document.createElement('span');
        search_icon.className = `${item_class} fas fa-search`;
        this.alert = document.createElement('span');
        this.alert.className = `${item_class} far fa-bell`;
        this.avatar = document.createElement('span');
        this.avatar.className = `${item_class}`;
        let img_avatar = document.createElement('img');
        img_avatar.src = 'https://i.pinimg.com/originals/24/48/d1/2448d1c98e7811280d8954a8285cd488.jpg';
        img_avatar.className = 'bar-top__user_bar__avatar'; // 

        let chevron_down = document.createElement('i');
        chevron_down.className = 'fas fa-chevron-down bar-top__user_bar__chevron-down';
        this.avatar.appendChild(img_avatar);
        this.avatar.appendChild(chevron_down);
        user_bar.appendChild(add_block);
        user_bar.appendChild(search_icon);
        user_bar.appendChild(this.alert);
        user_bar.appendChild(this.avatar);
        this.topbar.appendChild(logo);
        this.topbar.appendChild(menu_toggler);
        this.topbar.appendChild(user_bar);
      }

    }
    class TopBarController {
      constructor() {
        this.view = new topBarView();

        this._render();
      }

      _render() {
        document.body.appendChild(this.view.topbar);
      }

    }
    class SideBarView {
      constructor() {
        this._generate();
      }

      _generate() {
        let list = document.createElement('ul');
        list.className = "bar-side__list_wrapper";
        this.sidebar = document.createElement('aside');
        this.sidebar.className = "bar-side";
        this.home_icon = document.createElement('a');
        this.home_icon.className = "fas fa-home";
        this.bars_icon = document.createElement('a');
        this.bars_icon.className = "fas fa-bars";
        this.chart_icon = document.createElement('a');
        this.chart_icon.className = "fas fa-chart-line";
        this.envelope_icon = document.createElement('a');
        this.envelope_icon.className = "fas fa-envelope";
        this.group_icon = document.createElement('a');
        this.group_icon.className = "fas fa-user-friends";
        let icons = [this.home_icon, this.bars_icon, this.chart_icon, this.envelope_icon, this.group_icon];
        icons.forEach(link => {
          let list_element = document.createElement("li");
          list_element.className = 'bar-side__item';
          link.className += " bar-side__link";
          list_element.appendChild(link);
          list.appendChild(list_element);
        });
        this.sidebar.appendChild(list);
      }

    }
    class UniversalTemplates {
      constructor() {
        this._render();
      }

      _render() {
        new TopBarController(); // new SideBarController();
      }

    }
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
        this.message_field__input.addEventListener('keydown', e => {
          let key = e.keyCode || e.which;

          if (key == 13) {
            new SendMessage().send({
              message: {
                body: this.message_field.value,
                thread: {
                  _id: new SendMessage()._id
                }
              }
            });
          }
        });
        this.message_field.appendChild(this.message_field__input);
        this.message_field.appendChild(label);
        this.message_field.appendChild(clip);
      }

      _generate__messages_list() {
        this._generate__message_field();

        this.messages_list = document.createElement('article');
        this.messages_list.className = "main_content__list_messages";
        let error_field = document.createElement('span');
        error_field.className = "input__message_error";
        this.messages_list.appendChild(error_field);
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
        this.users_info.className = "main_content__list_info"; // let current_user = fetch(`https://${config.domain}/api/users/`, {
        //     method: TYPES.get,
        //     headers: {
        //         "x-access-token": config.key
        //     }
        // })
        // let info = new UserInfoView().info
        // current_user.then(responce => {
        //     Promise.resolve(responce.json()).then(user => {
        //         info.name = user.name
        //         info.position = user.position
        //         info.description = user.description
        //         info.organization = user.organization
        //         //   
        //         info.contacts.phone = user.phone
        //         info.contacts.email = user.email
        //         info.contacts.address = user.address
        //     })
        // })
        // new UserInfoView()

        this.users_info.appendChild(new UserInfoView().contacts);
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
    class ContentView {
      constructor() {
        this._generate();
      }

      _generate() {
        let sidebar = new SideBarView().sidebar;
        let main = new MessagesView().messageBlock;
        this.content = document.createElement('div');
        this.content.className = "main_content__wrapper";
        this.content.appendChild(sidebar);
        this.content.appendChild(main);
        document.body.appendChild(this.content);
      }

    }

    class ContentController {
      constructor() {
        new UniversalTemplates();
        this.view = new ContentView();

        this._render();
      }

      _render() {
        document.body.appendChild(this.view.content);
      }

    }
    new ContentController();

    exports.ContentController = ContentController;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
