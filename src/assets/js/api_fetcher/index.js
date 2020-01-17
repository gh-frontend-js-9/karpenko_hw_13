import {config} from '../config';
export const TYPES = {
    "get": 'GET',
    'post': 'POST'
}

const server_settings = config;
export class FetchTemplate{
    constructor(error_field, success_field){
        this.error_field = error_field
        this.success_field = success_field
    }
    request(path, type, data = null){
        return fetch(`http://${server_settings.host}:${server_settings.port}/${path}`, {
            method: type,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-auth-token": "your personal token"
            },
            body: JSON.stringify({ data })
        })
        .then( async responce => {
            if(responce.ok){
                responce.json();
                    this.message_success.innerText = "Success!"
                    setTimeout(() => {
                        this.success_field.innerText = "";
                        location.href = `http://${server_settings.host}:${server_settings.port}:/html/dashboard/dashboard.html`  
                    }, 1500)    
            }else{
                let text = '';
                Object.entries(data).forEach(([key, value]) => {
                    if(key.includes('password')){
                        if(value.length && value.length < 8){
                            text = 'Password must include 8 symbols';
                        }
                    }
                    if(key.includes('email')){
                        if(value.length && /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.toString())){
                            text = 'Invalid email!'
                        }
                    }
                    if(!value.length){
                        text = 'Input fields must be filled!';
                    }
                })
                this.error_field.innerText = text;
                setTimeout(() => {
                    this.error_field.innerHTML = "";
                }, 2000);
            }
        })
        .catch(error => console.log(error))
    }
}