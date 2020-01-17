import {FetchTemplate, TYPES} from '../api_fetcher/index';
export class LoginView {
    constructor() {
        this.generateTemplate();
    }

    generateTemplate() {
        this.loginSection = document.createElement('section');
        this.loginSection.className = "auth-app-wrapper";

        let header_group = document.createElement('div');
        header_group.className = "input__group"

        let header = document.createElement('p');
        header.className = "form__header";
        header.innerHTML = 'Log in';

        let link = document.createElement('a');
        link.className = "link";
        link.innerHTML = 'Not a member?';
        link.setAttribute('href', '/html/auth_services/sign_up.html')
        // 
        let forgot_data_link = document.createElement('a');
        forgot_data_link.className = "link";
        forgot_data_link.setAttribute('href', '/html/auth_services/reset_password.html')
        forgot_data_link.innerHTML = "Forgot password?";

        header_group.appendChild(header);
        header_group.appendChild(link);
        header_group.appendChild(forgot_data_link);

        this.form = document.createElement('form');
        this.form.className = "form"

        this.email = document.createElement('input');
        this.email.className = "input__element";
        this.email.id = 'email';
        this.email.type = "email";
        this.email.placeholder = "Email..."

        this.password = document.createElement('input');
        this.password.className = "input__element";
        this.password.type = "password";
        this.password.id = "password";
        this.password.placeholder = "Password..."

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
        this.button.innerHTML = "Reset";
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.login()
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
        
        this.loginSection.appendChild(this.image_wrapper)
        this.loginSection.appendChild(this.form);
        
        document.querySelector("#root").appendChild(this.loginSection);
    }

    login() {
        new FetchTemplate(document.querySelector('.input__message_error'), document.querySelector('.input__message_success')).request("api/users/login", TYPES.post, {
            email: this.email.value,
            password: this.password.value
        })
    }
}