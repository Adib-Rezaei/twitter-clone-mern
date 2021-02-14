import axios from './axios';
import { Redirect, Route } from 'react-router-dom';

class Auth {
    constructor() {
        this.authenticated = false;
        this.user = {};

        // this.login = this.login.bind(this);
        // this.logout = this.logout.bind(this);
        // this.isAuthenticated = this.isAuthenticated.bind(this);
    }
  
    async login(User) {
        return axios.post('users/', User)
            .then((res) => {
                if(res.data){
                    console.log("Authrized succesfully", res.data);
                    this.authenticated = true;
                    this.user = res.data;
                    return true;
                //    <Redirect to={"/singup"}/>
                }
                else {
                    console.log('wrong username and password');
                    this.authenticated = false;
                    return false;
                    // <Redirect to={"/login"}/>
                }
            })
            .catch(err => console.log("Error at fetching login data with /users/ ---", err));
        // return this.authenticated;
    }
  
    logout() {
        this.authenticated = false;
        this.user = {};
    }
  
    async isAuthenticated() {
        return axios.get('users/getUser')
            .then((res) => {
                if(res.data === ''){
                    this.authenticated = false;
                    return false;
                }
                else {
                    this.authenticated = true;
                    return true;
                }
            })
            .catch(err => console.log("Error at /getUser ", err));
        // return this.authenticated;
    }
  }
  
  export default new Auth();
  