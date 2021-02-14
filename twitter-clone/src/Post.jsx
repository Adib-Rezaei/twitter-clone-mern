import { Avatar, Button } from '@material-ui/core';
import React, { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ReplyIcon from '@material-ui/icons/Reply';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import './Post.css'
import axios from './axios';
import {toast} from 'react-toastify';

toast.configure();

class Post extends Component {
    constructor(props){
        super(props); 

        this.onIncreaseLike = this.onIncreaseLike.bind(this);
        this.onIncreaseRetweet = this.onIncreaseRetweet.bind(this);
        this.onIncreaseComment = this.onIncreaseComment.bind(this);
        this.notify = this.notify.bind(this);

        this.state = {
            ...props.data,
            ...props.isActive
        }
    }

    async onIncreaseLike(){
        
        const required_data = {
            tweet_id: this.state._id,
            user_id: this.props.user._id,
            active: !this.state.isLiked,
        }
        axios.put('/tweet/likes', required_data)
        .then((res) => {
            console.log(res.data) 
            this.setState((prevState) => ({
                ...prevState,
                likes: res.data.likes,
                isLiked: !prevState.isLiked,
            }))
        })
        .catch(err => console.log(err));

    }


        

    notify(){
        toast.info("Under development 🛠", {position: 'bottom-right'});
    }

    onIncreaseRetweet(){
        this.notify();
        const required_data = {
            tweet_id: this.state._id,
            user_id: this.props.user._id,
            active: !this.state.isRetweet,
        }
        axios.put('/tweet/retweets', required_data)
        .then((res) => {
            console.log(res.data)
            this.setState((prevState)=> ({
                ...prevState,
                retweets: res.data.retweets,
                isRetweet: !prevState.isRetweet,
            }))
        })
        .catch(err => console.log(err));

    }

    onIncreaseComment(){
        this.notify();
        const required_data = {
            tweet_id: this.state._id,
            user_id: this.props.user._id,
            active: !this.state.isComment,
        }
        axios.put('/tweet/comments', required_data)
        .then((res) => {
            console.log(res.data)
            this.setState((prevState) => ({
                ...prevState,
                comments: res.data.comments,
                isComment: !prevState.isComment,
            }))
        })
        .catch(err => console.log(err));

    }

    favClass(){
        return this.state.isLiked ? "fav-btn-active" : "fav-btn";
    }
    retweetClass(){
        return this.state.isRetweet ? "retweet-btn-active" : "retweet-btn";
    }
    commentClass(){
        return this.state.isComment ? "reply-btn-active" : "reply-btn";
    }


    render(){
        const {_id, displayName, username, text, avatar_url, likes, retweets, comments} = this.state;
        // console.log(this.state);

        return (
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
                    <div className="post_footer">
                        <Button className={this.favClass()} onClick={this.onIncreaseLike}> <FavoriteIcon/> <p>{likes.length}</p> </Button> 
                        <Button className={this.retweetClass()} onClick={this.onIncreaseRetweet}> <SwapHorizIcon/> <p>{retweets.length}</p> </Button> 
                        <Button className={this.commentClass()} onClick={this.onIncreaseComment}> <ReplyIcon/> <p>{comments.length}</p> </Button> 
                    </div>
                </div>
            </div>
        )
    }
}


export default Post;