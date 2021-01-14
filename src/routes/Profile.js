import React, { useEffect, useState } from "react";
import {authService, dbService} from "fbase";
import {useHistory} from "react-router-dom";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDiplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");      // redirect 태그를 안쓰고 처리        
    };

    const getMyNweets = async () => {
        await dbService.collection("nweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
    };

    useEffect(() => {
        getMyNweets();
    }, []);


    const onSubmit = async (event) => {
        event.preventDefault();        
        if(userObj.displayName !== newDisplayName){
            // 프로필 사진 올리는거 추가하긔..!
            await userObj.updateProfile({
                displayName : newDisplayName
            });
            refreshUser();
        }
    }

    const onChange = (event) => {
        const {target : {value}} = event;
        setNewDiplayName(value);
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">            
                <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} autoFocus className="formInput" />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
}

export default Profile;