import React, { Component } from 'react';
import './Widgets.css'
import {TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed} from 'react-twitter-embed';
function Widgets(){
    return (
        <div className="widgets">
            <div className="widgets_container">
                <h2>What's happening</h2>

                <TwitterTweetEmbed tweetId={"1357269755112148993"}/>
                <TwitterTweetEmbed tweetId={"1357598622817411074"}/>
                {/* <TwitterTweetEmbed tweetId={"1357781991974834178"}/> */}

            </div>

        </div>
    )
}

export default Widgets;