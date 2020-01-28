import {TYPES, FetchTemplate} from "../../../api_fetcher/index";
import {config} from '../../../config';
export class SendMessage{
    constructor(){
        this._id = window.localStorage.getItem("_id");
    }
    send(data){
        console.log(data)
        // new FetchTemplate().request('api/threads/messages', TYPES.post, data)
        fetch(`http://${config.domain}/api/threads/messages`, {
            method: TYPES.post,
            headers: {
                'x-access-token': localStorage.getItem('key'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(responce => {
            console.log(responce.json())
            if(responce.ok){
                alert("OK");
            }
        })
    }
}