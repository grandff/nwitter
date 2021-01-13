import React from "react";
import {Link} from "react-router-dom";

const Navigation = ({userObj}) => <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li><Link to ="/">Home</Link></li>
        <li><Link to ="/profile">{userObj.displayName}의 Profile</Link></li>
    </ul>
</nav>
export default Navigation;