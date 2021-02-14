import React, { Component } from 'react';
import './Notif.css'
import PostNotif from './PostNotif';
import axios from './axios';


class Notif extends Component {
    constructor(props){
        super(props);

        this.state = {
            all_target_tweets: []
        }

    }



    async componentDidMount(){
        try{
            const user = await axios.get('/users/getUser');
            const all_tweets = await axios.get('/tweet');
            const user_tweets = await all_tweets.data.filter((tweet) => (tweet.username === user.data.username));
            const all_users = await axios.get('/users');
            const all_target_tweets = [];
            await user_tweets.forEach((tweet) => {
                const target_users = [];
                tweet.likes.forEach(like_id => {
                    all_users.data.forEach(user => {
                        if(user._id === like_id){
                            target_users.push(user);
                        }
                    })
                })
                all_target_tweets.push({target_users, tweet});
            })
            
            // console.log(all_target_tweets);
            this.setState({
                all_target_tweets,
            })
        }
        catch(err) {
            console.log("Error at fetching all tweets in notif.jsx", err)
        };
        
            
    }

    render() { 
        return ( 
            <div className="notif">
                <div className="notif_header">
                    <h2>Notification 🔔</h2>
                </div>
                <div className="notif_description">
                {
                    this.state.all_target_tweets.filter(tweet => (tweet.target_users.length)).slice().reverse().map(tweet => {

                        return (<PostNotif key={tweet.tweet._id} data={tweet.tweet} users={tweet.target_users} />)
                    })
                }
                </div>
            </div>
         );
    }
}


export default Notif;