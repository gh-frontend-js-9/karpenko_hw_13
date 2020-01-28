import {config} from '../config';
export const TYPES = {
    "get": 'GET',
    'post': 'POST'
}

const server_settings = config;
export class FetchTemplate{
    constructor(error_field = null, success_field = null){
        this.error_field = error_field
        this.success_field = success_field
    }
    request(path, type, data = null){
        if(type == TYPES.get){
            return fetch(`http://${server_settings.domain}/${path}`, {
                method: type,
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": config.key
                }
            })
            .then( async responce => {
                if(responce.status){
                    return responce.json();
                }
            })
            .catch(error => console.log(error))
        }else{
            return fetch(`http://${server_settings.domain}/${path}`, {
                method: type,
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": config.key
                },
                body: JSON.stringify(data)
            })
            .then( async responce => {
                Promise.resolve(responce.json()).then(user => {
                    Object.entries(user).forEach(([key, value]) => {
                        window.localStorage.setItem("key", config.key);
                        window.localStorage.setItem("_id", user._id);
                    })
                })
                if(responce.ok){
                    if(!this.error_field || !this.success_field){
                        alert("Success!")
                        location.href = `/html/dashboard/dashboard.html`
                    }else{
                        this.message_success.innerText = "Success!"
                        setTimeout(() => {
                            this.success_field.innerText = "";  
                            location.href = `/html/dashboard/dashboard.html`
                        }, 1500) 
                    }
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
                    if(!this.success_field || !this.error_field){
                        // alert(text);
                    }else{
                        this.error_field.innerText = text;
                        setTimeout(() => {
                            this.error_field.innerHTML = "";
                        }, 2000);
                    }
                }
            })
            .catch(error => console.log(error))
        }
    }
}