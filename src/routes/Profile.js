import React from "react";
import {authService} from "fbase";
import {useHistory} from "react-router-dom";


export default () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");      // redirect 태그를 안쓰고 처리
    }
    return (
        <>
            <button onClick = {onLogOutClick}>Log Out</button>
        </>
    );
}