import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) =>{
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]); // Empty Array
    const getTweets = async() =>{
        const dbtweets = await dbService.collection("tweets").get();
        dbtweets.forEach((document) => {
            const tweetObject ={
                ...document.data(),
                id: document.ld,
                creatorId: userObj.uid
            }
            setTweets((prev) =>[tweetObject,...prev])
        })
    }
    useEffect(()=>{
       getTweets();
    },[])
    const onSubmit = async(e) =>{
        e.preventDefault();
        await dbService.collection("tweets").add({
            text: tweet,
            createdAt: Date.now(),        
        });
        setTweet("");
    };
    const onChange =(event) =>{
        const {
            target: {value},
        } = event;
        setTweet(value);
    }
    console.log(tweets);
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input value={tweet} onChange={onChange} type="text" placeholder="What happen to You?" maxLength={100} />
            <input type="submit" value="tweet" />
        </form>
        <div>
            {tweets.map((tweet) => (
            <div key={tweet.id}>
                <h4>{tweet.text}</h4>
            </div>
            ))}
        </div>
    </div>
    )
} 

export default Home;