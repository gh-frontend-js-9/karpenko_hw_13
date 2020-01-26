import {TYPES, FetchTemplate} from "../../../api_fetcher/index";
export class SendMessage{
    constructor(){
        this._id = '5e1a1c818ec2f49ab3e59ab2';
    }
    send(data){
        alert(data)
        new FetchTemplate().request('api/threads/messages', TYPES.post, data)
    }
}