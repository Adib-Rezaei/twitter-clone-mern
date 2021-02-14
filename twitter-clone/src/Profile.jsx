import React, { Component } from 'react';
import './Profile.css';
import Post from './Post';
import axios from './axios';

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: {},
            all_tweets: [],
            user_tweets: []
        }
    }


    async componentDidMount(){
        try{
            const user = await axios.get('/users/getUser');
            const all_tweets = await axios.get('/tweet');
            const user_tweets = await all_tweets.data.filter((tweet) => (tweet.username === user.data.username));
            
                this.setState({
                user: user.data,
                all_tweets: all_tweets.data,
                user_tweets,
            })
        }
        catch(err) {
            console.log("Error at fetching in Profile.jsx", err)
        };
    }


    render() { 
        return ( 
            <div className="profile">
                <div className="profile_header">
                    <h2>Profile 👦</h2>
                </div>
                
                {
                this.state.user_tweets.slice().reverse().map(tweet => {
                    const isLiked = tweet.likes.find(user_id => this.state.user._id === user_id) ? true : false;
                    const isRetweet = tweet.retweets.find(user_id => this.state.user._id === user_id) ? true : false;
                    const isComment = tweet.comments.find(user_id => this.state.user._id === user_id) ? true : false;
                    return(<Post key={tweet["_id"].toString()} data={tweet} user={this.state.user} isActive={{isLiked, isRetweet, isComment}}/>)
                })
                }
            </div>
         );
    }
}

export default Profile;
