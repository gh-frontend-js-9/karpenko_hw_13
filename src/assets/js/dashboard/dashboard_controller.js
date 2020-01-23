import {ContentView, UniversalTemplates} from './dashboard_view';
export class ContentController {
    constructor(){
        new UniversalTemplates();
        this.view = new ContentView();
        this._render();
    }
    _render(){
        document.body.appendChild(this.view.content);
    }
}
new ContentController();