import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";

import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
import Notif from './Notif';
import Profile from './Profile';
import Main from './Main';


import './App.css';
import ProtectedRoute from './ProtectedRoute';

class Home extends Component {
    constructor(props){
        super(props);

        
    }

    render() { 
        console.log(this.props);
        return ( 
            <Router>
                <div className="App">
                    <Sidebar {...this.props}/>
                        <Switch>
                            <ProtectedRoute path="/Home" exact > <Redirect to="/Home/explore"/></ProtectedRoute>
                            <ProtectedRoute path="/Home/main" exact > <Main/> </ProtectedRoute>
                            <ProtectedRoute path="/Home/explore" exact > <Feed/>  </ProtectedRoute>
                            <ProtectedRoute path="/Home/notif" exact  > <Notif/> </ProtectedRoute>
                            <ProtectedRoute path="/Home/profile" exact > <Profile/> </ProtectedRoute>
                        </Switch>
                    <Widgets/>
                </div>
            </Router>
        );
    }
}
 
export default Home;