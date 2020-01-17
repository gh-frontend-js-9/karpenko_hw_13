import {ResetPasswordView} from './reset_password_view';
class ResetPasswordController {
    constructor() {
        this.view = new ResetPasswordView();
        this.render();
    }

    render(){
        document.querySelector("#root").appendChild(this.view.loginSection);
    }
}
new ResetPasswordController().render()