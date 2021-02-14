import React, { Component } from 'react';
import './TweetBox.css';
import { Avatar, Button } from '@material-ui/core';

class TweetBox extends Component {
    constructor(props){
        super(props);
    }

    
    
    render(){
        const {onSubmit, onChangeTweet, user} = this.props;

        return(
            <div className="tweetBox">
                <form onSubmit={onSubmit}>
                    <div className="tweetBox_input">
                        <Avatar src={user.avatar_url}/>
                        <textarea name="name" id="textarea" maxLength="140" id="input_text"
                         rows="4" cols="20" placeholder="What's on your mind?" required></textarea>
                    </div>
                    <Button type="submit" className="tweetBox_button">Tweet</Button>
                </form>
                
            </div>
        );
    }
}

export default TweetBox;