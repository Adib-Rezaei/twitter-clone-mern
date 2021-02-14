import { BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import React, { Component } from 'react';

import './App.css';

import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import auth from './auth';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedin: false,
    }

  }

  componentDidMount(){
    const status = auth.isAuthenticated();
    this.setState({ isLoggedin: status });
  }


  render() { 
    return ( 
      <Router>
        <div >
            <Switch>
                <Route path="/" exact 
                    render={() => {
                        return (
                            this.state.isLoggedin
                            ? <Redirect to="/Home"/> : <Redirect to="/login"/>
                        )
                    }
                }
                />
                <Route path="/login" exact render={(props) => (<Login {...props} />)}/>
                <Route path="/signup" exact component={Signup}/>
                <ProtectedRoute path="/Home" component={Home} isLoggedin={this.state.isLoggedin}/>
                <Route path="*" render={() => <h1>404 Not Found</h1>}/>
            </Switch>
        </div>
      </Router>
     );
  }
}

export default App;
