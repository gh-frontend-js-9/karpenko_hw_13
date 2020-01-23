import {MessagesView} from '../dashboard_view';
export class MessagesController {
    constructor(){
        this.view = new MessagesView();
        this._render();
    }
    _render(){
        document.body.appendChild(this.view.messageBlock);
    }
}