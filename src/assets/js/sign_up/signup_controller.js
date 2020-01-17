import {SigupView} from "./signup_view";
class SigupController {
    constructor() {
        this.view = new SigupView();
        this.render();
    }

    render(){
        document.querySelector("#root").appendChild(this.view.loginSection);
    }
}
new SigupController().render()