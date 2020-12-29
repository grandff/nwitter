import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = () => {
    const [nweet, setNweet] = useState("");    
    const [nweets, setNweets] = useState([]);
    // fire base db select
    const getNweets = async() => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),     // spread attribute 기능.. es6 참고
                id : document.id
            }
            setNweets((prev) => [nweetObject, ...prev]);      // 함수를 전달할 경우 이전 값을 불러올 수 있음 리액트의 경우
        });        
    }

    useEffect(() => {
        getNweets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        // fire base db insert
        await dbService.collection("nweets").add({
            nweet,
            createdAt : Date.now()            
        });
        setNweet("");
    };
    const onChange = (event) => {
        const {target : {value}} = event;
        setNweet(value);
    };

    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => <div key={nweet.id}>
                    <h4>{nweet.nweet}</h4>
                    </div>)}
            </div>
        </div>
    );
};
export default Home;