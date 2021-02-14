import { Avatar, Button } from '@material-ui/core';
import React, { Component } from 'react';
import './PostNotif.css'
import axios from './axios';

class Post extends Component {
    constructor(props){
        super(props); 

        this.state = {
            ...props.data,
            users: props.users,
        }
    }


    render(){
        const {_id, displayName, username, text, avatar_url, users} = this.state;

        return (
            <div className="postNotif_container">
                <div className="header_description">
                    {
                        users.map(user => {
                            return (<a href="#" key={user._id}>{user.displayName} </a>)
                        })
                    }
                    <p> Liked this tweet</p>
                    
                </div>
                <div className="post">
                    <div className="post_avatar">
                        <Avatar src={avatar_url}/>
                    </div>
                    <div className="post_body">
                        <div className="post_head">
                            <div className="post_headerText">
                                <h3> {displayName} <span>@{username}</span></h3>
                                
                            </div>
                            <div className="post_headerDescription">
                                <p>{text}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}


export default Post;