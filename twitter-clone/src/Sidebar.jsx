import React, { Component } from 'react';
import "./Sidebar.css";
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Button } from '@material-ui/core';
import SidebarOption from './SidebarOption';

import { BrowserRouter as Router, Redirect, Route, Switch, Link} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import auth from './auth';
import axios from './axios';

toast.configure();

class Sidebar extends Component {
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this); 
        this.notify = this.notify.bind(this);
    }

    logout(props){
        axios.get('/logout')
            .then(res => {
                auth.logout();
                props.history.push('/login');
                console.log(res.data);
            })
            .catch(err => console.log("Cannot logout --- ", err));
    }

    notify(){
        toast.info("Under development 🛠", {position: 'bottom-right'});
    }

    render() { 
        return(
        <div className="sidebar">
            <TwitterIcon className="sidebar_twitterIcon"/>
            
            
            <Link to="/Home/main" className="link" onClick={()=>(this.notify())}>
                 <SidebarOption active={window.location.pathname === "/Home/main"} Icon={HomeIcon} text="Home"/>
            </Link>
            <Link to="/Home/explore" className="link" onClick={()=>(this.forceUpdate())}> 
                <SidebarOption active={window.location.pathname === "/Home/explore"} Icon={ExploreIcon} text="Explore"/>
            </Link>
            <Link to="/Home/notif" className="link" onClick={()=>(this.forceUpdate())}>
                <SidebarOption active={window.location.pathname === "/Home/notif"} Icon={NotificationsIcon} text="Notifications" />
            </Link>
            <Link to="/Home/profile" className="link" onClick={()=>(this.forceUpdate())}>
                <SidebarOption active={window.location.pathname === "/Home/profile"} Icon={AccountCircleIcon} text="Profile" /> 
            </Link>
            

            <Button variant="outlined" className="sidebar_tweet" fullWidth onClick={this.notify}> Tweet </Button>
            <Button variant="outlined" className="logout" onClick={() => this.logout(this.props)}>Logout</Button>
        </div>
    )
    }
}
 
export default Sidebar;
