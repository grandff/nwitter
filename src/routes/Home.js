import React, { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import { dbService, storageService } from "fbase";
import Nweet from "../components/Nweet"

const Home = ( { userObj }) => {
    const [nweet, setNweet] = useState("");    
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();
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

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        // 이미지 첨부 확인
        if (attachment !== "") {            
            // 사진에 이름을 주는 작업을 랜덤으로 돌려도 되고 uuid 를 사용해도 됨 여기선 uuid 사용함
            const attchmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)        // image insert
            const response = await attchmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();            
        }

        const nweetObj = {
            text : nweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            attachmentUrl
        }

        // fire base db insert        
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {target : {value}} = event;
        setNweet(value);
    };

    // image file input
    const onFileChange = (event) => {
        const {target : {files}} = event;
        const theFile = files[0];          
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result}} = finishedEvent
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    };

    // clear image file
    const onClearAttachmentClick = () => setAttachment(null);

    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && 
                    <div>
                        <img src ={attachment} width = "50px" height="50px" />
                        <button onClick={onClearAttachmentClick}>Clear</button>
                    </div> }
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key = {nweet.id} nweetObj = {nweet} isOwner = {nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;