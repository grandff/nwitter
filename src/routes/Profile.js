import React, { useEffect } from "react";
import {authService, dbService} from "fbase";
import {useHistory} from "react-router-dom";

const Profile = ({userObj}) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");      // redirect 태그를 안쓰고 처리
    };

    const getMyNweets = async () => {
        const nweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();

    };

    useEffect(() => {
        getMyNweets();
    }, [])

    return (
        <>
            <button onClick = {onLogOutClick}>Log Out</button>
        </>
    );
}

export default Profile;