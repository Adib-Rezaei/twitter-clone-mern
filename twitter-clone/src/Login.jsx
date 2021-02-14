import React, { Component } from 'react';
import axios from './axios';
import auth from './auth';
import './Login.css';
import logo from './login.png';
import { Button } from '@material-ui/core';


class Login extends Component {
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const User = {
            displayName: document.getElementById('username').value,
            password: document.getElementById('password').value
        }
        
        auth.login(User).then(isAuthenticated => {
            console.log(isAuthenticated);
            isAuthenticated ? this.props.history.push("/Home") : this.props.history.push('/login');
        })
        
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }

    componentDidMount(){

    }

    render() { 
        return ( 
            <div className="container">
                <div className="card">
                    <div className="image">
                        <img src={logo}alt="IMG"/>
                    </div>
                    
                    <div className="content">
                        <span>Member Login</span>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <input type="name" placeholder="Name" id="username" required />
                            <input type="password" placeholder="Password" id="password" required />
                            <Button type="submit" variant="outlined" className="login-btn" fullWidth>Login</Button>
                            <a href="/signup" id="link-to-signup">Create your account</a>
                        </form>
                    </div>
                    
                </div>
            </div>
         );
    }
}
 
export default Login;