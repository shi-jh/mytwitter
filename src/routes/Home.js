import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet"

const Home = ({userObj}) =>{
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]); // Empty Array
    
    useEffect(() => {
        dbService.collection("tweets").onSnapshot(snapshot =>{
          const tweetArray = snapshot.docs.map(doc =>({
              id: doc.id,
              ...doc.data() 
            }));            
            setTweets(tweetArray);
       })
    },[])
    const onSubmit = async(e) =>{
        e.preventDefault();
        await dbService.collection("tweets").add({
            text: tweet,
            createdAt: Date.now(),  
            creatorId: userObj.uid      
        });
        setTweet("");
    };
    const onChange = (event) =>{
        const {
            target: {value},
        } = event;
        setTweet(value);
    }
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input value={tweet} onChange={onChange} type="text" placeholder="What happen to You?" maxLength={100} />
            <input type="submit" value="tweet" />
        </form>
        <div>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} tweetObj={tweet} 
                isOwner={tweet.creatorId === userObj.uid} />
            ))}
        </div>
    </div>
    )
} 

export default Home;