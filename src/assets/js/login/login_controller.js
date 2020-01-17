import {LoginView} from './login_view.js';
class LoginController {
    constructor() {
        this.view = new LoginView();
        this.render();
    }

    render(){
        document.querySelector("#root").appendChild(this.view.loginSection);
    }
}
new LoginController().render()