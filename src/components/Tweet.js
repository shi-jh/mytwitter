import { dbService } from 'fbase';
import React,{useState} from 'react'

const Tweet = ({tweetObj, isOwner }) => {
    const [edit, setEdit] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = () => {
        const ok = window.confirm("Are you Sure?");
        if(ok){
            dbService.doc(`tweets/${tweetObj.id}`).delete();
        }
    }
    const toggleEdit = () => setEdit((prev) =>!prev);
    const onSubmit = (event) =>{
        event.preventDefault();
        dbService.doc(`tweets/${tweetObj.id}`).update({text: newTweet });
        setEdit(false);
    }
    const onChange =(event) =>{
        const {target:{value}} = event;
        setNewTweet(value);
    }
    return (
        <div>
            { edit ? (
                <>    
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="변경" 
                    value={newTweet} required onChange={onChange}/>
                    <input type="submit" value="Update Tweet" />
                </form>
                    <button onClick={toggleEdit}>취소</button>
                </>
            ) : (     
            <>         
            <h4><li>{tweetObj.text}</li></h4>
            { isOwner && ( 
                <>
                <button onClick={onDeleteClick} > Delete Tweet </button>
                <button onClick={toggleEdit}> Edit Tweet </button>
                </>
            )} </>       
            )}
        </div>            
    )
}

export default Tweet;