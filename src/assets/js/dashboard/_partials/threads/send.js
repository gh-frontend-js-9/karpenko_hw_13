import {TYPES, FetchTemplate, headers} from "../../../api_fetcher/index";
import {config} from '../../../config';
export class SendMessage{
    constructor(){
        this._id = window.localStorage.getItem("_id");
    }
    send(data){
        fetch(`http://${config.domain}/api/threads/messages`, {
            method: TYPES.post,
            headers: headers.access,
            body: JSON.stringify(data)
        }).then(responce => {
            console.log(data)
            if(responce.status >= 200 && responce.status < 400){
                alert("Succesfully send messege");
            }else{
                alert(`Occured error: ${responce.statusText}`)
            }
        })
    }
}