import {config} from '../../../config';
import {FetchTemplate, TYPES} from '../../../api_fetcher/index';

export class UserInfoView{
    constructor(){
        this.create_info_object();
        this.render();
    }
    create_info_object(){
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
            }
        let current_user = fetch(`https://${config.domain}/api/users/`, {
            method: TYPES.get,
            headers: {
                "x-access-token": config.key
            }
        })
        let test_description_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        current_user.then(responce => {
            Promise.resolve(responce.json()).then(user => {
                this.info.name = user.name
                this.info.position = user.position
                this.info.description = user.description
                this.info.organization = user.organization
                //   
                this.info.contacts.phone = user.phone
                this.info.contacts.email = user.email
                this.info.contacts.address = user.address
                // append
                this.user_name.header.innerText = user.name;
                this.user_name.position.innerText = user.position;
                this.user_name.description.innerText =  test_description_text || user.description
                // contacts
                this.email.p.innerText = user.email;
                this.phone.p.innerText = user.phone;
                this.address.p.innerText = user.address;
                this.organization.p.innerText = user.organization
            })
        })
    }
    _create_avatar(){
        // avatar
        this.photo = document.createElement('div');
        this.photo.className = "main_content__list_info__photo"
        // 
        let img = document.createElement('img');
        img.className = "main_content__list_info__img_tag";
        img.src = "https://i.pinimg.com/originals/24/48/d1/2448d1c98e7811280d8954a8285cd488.jpg";
        // 
        this.photo.appendChild(img);
    }
    _create_header(){
        // header
        this.user_name = {
            wrapper: document.createElement('div'),
            header: document.createElement('p'),
            position: document.createElement('p'),
            description: document.createElement('p')
        }
        // 
        this.user_name.wrapper.className = "main_content__list_info__wrapper";
        // 
        this.user_name.header.className = "main_content__list_info__header main_content__list_info__wrapper__item";
        this.user_name.position.innerText = this.info.name;
        // proffession
        this.user_name.position.className = "main_content__list_info__subheader";
        this.user_name.position.innerText = this.info.position;
        // description
        this.user_name.description.className = "main_content__list_info__description main_content__list_info__wrapper__item";
        this.user_name.description.innerText = this.info.description;
        // 
        this.user_name.wrapper.appendChild(this.user_name.header);
        this.user_name.wrapper.appendChild(this.user_name.position);
        this.user_name.wrapper.appendChild(this.user_name.description);
    }
    _create_contacts(){
       // contacts
       this.contacts = document.createElement('section');
       this.contacts.className = "main_content__list_info__wrapper";
       // email
       this.email = {
           article: document.createElement('article'),
           label: document.createElement('label'),
           p: document.createElement('p')
       }
       this.email.article.className = "main_content__list_info__wrapper__item";
       this.email.label.className = "main_content__list_info__label";
       this.email.label.innerText = "Email";
       this.email.p.className = "main_content__list_info__base";
       this.email.p.innerText = this.info.contacts.email;
       // 
       this.email.article.appendChild(this.email.label);
       this.email.article.appendChild(this.email.p);
       // phone
       this.phone = {
           article: document.createElement('article'),
           label: document.createElement('label'),
           p: document.createElement('p')
       }
       this.phone.article.className = "main_content__list_info__wrapper__item";
       this.phone.label.className = "main_content__list_info__label";
       this.phone.label.innerText = "Phone";
       this.phone.p.className = "main_content__list_info__base"
       this.phone.p.innerText = this.info.contacts.phone;
       // 
       this.phone.article.appendChild(this.phone.label);
       this.phone.article.appendChild(this.phone.p);
       // address
       this.address = {
           article: document.createElement('article'),
           label: document.createElement('label'),
           p: document.createElement('p')
       }
       this.address.article.className = "main_content__list_info__wrapper__item";
       this.address.label.className = "main_content__list_info__label";
       this.address.label.innerText = "Address";
       this.address.p.className = "main_content__list_info__base"
       this.address.p.innerText = this.info.contacts.address;
       // 
       this.address.article.appendChild(this.address.label);
       this.address.article.appendChild(this.address.p);
       // organization
       this.organization = {
           article: document.createElement('article'),
           label: document.createElement('label'),
           p: document.createElement('p')
       }
       this.organization.article.className = "main_content__list_info__wrapper__item";
       this.organization.label.className = "main_content__list_info__label";
       this.organization.label.innerText = "Organization"
       this.organization.p.className = "main_content__list_info__base"
       this.organization.p.innerText = this.info.organization;
       // 
       this.organization.article.appendChild(this.organization.label);
       this.organization.article.appendChild(this.organization.p);


       // Append contacts element
    //    let append_contacts_element = [this.photo, this.user_name.wrapper, this.address.article, this.organization.article];
       let append_contacts_element = [this.photo, this.user_name.wrapper, this.email.article, this.phone.article, this.address.article, this.organization.article]
       append_contacts_element.forEach(item => {
           this.contacts.appendChild(item);
       })
    }
    render(){
        this.create_info_object();
        this._create_avatar();
        this._create_header();
        this._create_contacts();
    }
}