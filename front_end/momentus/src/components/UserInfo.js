import React from "react";


function UserInfo(props) {
    return (
      <div className="UserInfo">
          PFP:
        <img
        className="Profile-pic"
        src={props.pfpURL}
        alt={props.name}
        />
        <div className="UserInfo-name">Username: {props.name}</div>
      </div>
    );
}

export default UserInfo;