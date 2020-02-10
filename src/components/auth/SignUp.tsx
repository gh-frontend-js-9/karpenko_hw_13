import React , {Component} from "react";
import fetcher from "../Fetcher/index";
import { FetchConfig } from "../Fetcher/config";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

interface LoginStateItem {
    email: string,
    password: string,
    name: string
}

export default class Login extends Component<{}, LoginStateItem> {
    constructor(props:any){
        super(props);

        this.state = {
            email: "",
            password: "",
            name: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event: React.FormEvent){
        event.preventDefault();
        let {email, password} = this.state;
        const Fetcher = new fetcher();
        Fetcher.post(`https://${FetchConfig.domain}/api/users`, "auth", {
            email: email,
            password: password
        }).then(response => {
            console.log(response)
            if(response.status > 199 && response.status < 400){
                // this.props.handleSuccessfulAdmin(response.data);
            }
        })
        .catch(error => {
            console.log("login error", error)
        })
        
    }
    handleChange(event: { target: HTMLInputElement }){
        switch(event.target.name){
            case "password": {
                this.setState({
                    password: event.target.value
                })
                break;
            }
            case "email": {
                this.setState({
                    email: event.target.value
                })
                break;
            }
            case "name": {
                this.setState({
                    name: event.target.value
                })
                break;
            }
        }
    }
    render(){
        return (
            <div className="form form__auth block__centered">
                <div className="form__image">
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        size="7x"
                        color="gold"
                    />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <input 
                        className="input__element input__group"
                        type="email" 
                        name="email" 
                        value={this.state.email}
                        placeholder="Email"
                        onChange={this.handleChange}
                    />
                    <input 
                        className="input__element input__group"
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.handleChange}
                        autoComplete="password"
                    />
                    <button 
                        className="form__button"
                        type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        )
    }
}