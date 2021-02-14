import axios from './axios';
import React, { Component } from 'react';
import logo from './signup.jpg';
import { Button } from '@material-ui/core';
import './Signup.css';
import './Login.css';


class Signup extends Component {
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const data = {
            avatar_url: document.getElementById('input_url').value,
            displayName: document.getElementById('input_name').value,
            username: document.getElementById('input_userid').value,
            password: document.getElementById('input_password').value,
        }
        
        axios.post('/users/add', data, { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log("submitted");
                this.props.history.push('/login');
            })
            .catch(err => console.log(err));

            document.getElementById('input_url').value = '';
            document.getElementById('input_name').value = '';
            document.getElementById('input_userid').value = '';
            document.getElementById('input_password').value = '';
        
    }

    render() { 
        return ( 
            <div className="container">
                <div className="card">
                    <div className="image">
                        <img src={logo}alt="IMG"/>
                    </div>
                    
                    <div className="content">
                        <span>Register</span>
                        <form action="/login" onSubmit={this.onSubmit} autoComplete="off">
                            <input type="url" placeholder="Avatar icon URL (pick in link below)" id="input_url" />
                            <input type="name" placeholder="Name" id="input_name" required />
                            <input type="name" placeholder="UserID" id="input_userid" required />
                            <input type="password" placeholder="Password" id="input_password" required />
                            <Button type="submit" variant="outlined" className="signup-btn" fullWidth>Sign up</Button>
                            <a href="/login" id="link-to-login">Already have an account? Login</a>
                            <a href="https://icons8.com/icons/set/person" target="_blank" id="link-to-icon">Pick an icon for your profile</a>
                        </form>
                    </div>
                    
                </div>
            </div>
         );
    }
}
 
export default Signup;