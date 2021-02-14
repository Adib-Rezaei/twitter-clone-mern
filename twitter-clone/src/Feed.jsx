import React, { Component } from 'react';
import './Feed.css';
import TweetBox from './TweetBox';
import Post from './Post';
import axios from './axios';

class Feed extends Component {
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTweet = this.onChangeTweet.bind(this);

        
        this.state = {
            user: {},
            tweets: [
                {
                    _id: 0,
                    displayName: 'Adib',
                    username: 'KhodeAdib',
                    avatar_url: './logo192.png',
                    text: '',
                    likes: [],
                    retweets: [],
                    comments: [],
                },
            ]
        }
    }

    

    async onSubmit(e) {
        e.preventDefault();
        const tweets = this.state.tweets;
        const newTweet = {...this.state.user, text: document.getElementById("input_text").value, likes: [], retweets: [], comments: []};
        delete newTweet._id;
        document.getElementById("input_text").value = '';

        axios.post('/tweet', newTweet)
            .then(res => {
                tweets.push(res.data);
                this.setState({
                    ...this.state,
                    tweets
                })
            })
            .catch(err => console.log("Error at posting new tweet to database --- ", err));
        
    }

    onChangeTweet(e){
        
    }

    async componentDidMount() {
        axios.get('/users/getUser')
            .then(res => {
                this.setState({
                    ...this.state,
                    user: res.data,
                })
                // console.log(res.data);
            })
            .catch(err => console.log("Error at fetching data in feed --- ", err));

        axios.get('/tweet')
            .then(res => {
                this.setState({
                    ...this.state,
                    tweets: res.data
                })
                // console.log("fetched from database first ", res.data);
            })

    }

    render(){
        
        return (
            <div className="feed">
                <div className="feed_header">
                    <h2>Explore 🧭</h2>
                </div>
    
                <TweetBox onSubmit={this.onSubmit} onChangeTweet={this.onChangeTweet} user={this.state.user}/>
                {
                this.state.tweets.slice().reverse().map(tweet => {
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


export default Feed ;