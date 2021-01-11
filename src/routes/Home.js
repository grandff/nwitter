import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import Nweet from "../components/Nweet"
import NweetFactory from "components/NweetFactory";

const Home = ( { userObj }) => {
     
    const [nweets, setNweets] = useState([]);
    
    // fire base db select
    // old version
    /*const getNweets = async() => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),     // spread attribute 기능.. es6 참고
                id : document.id                
            }
            setNweets((prev) => [nweetObject, ...prev]);      // 함수를 전달할 경우 이전 값을 불러올 수 있음 리액트의 경우
        });        
    }*/

    useEffect(() => {
        //getNweets();  // old version
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map((doc) => ({id : doc.id, ...doc.data()}));
            setNweets(nweetArray);
        });
    }, []);    

    return (
        <div>
            <NweetFactory userObj ={userObj}/>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key = {nweet.id} nweetObj = {nweet} isOwner = {nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;