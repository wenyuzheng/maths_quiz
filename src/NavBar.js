import React from 'react';
import firebase from './firebase';
import './NavBar.css';

const NavBar = (props) => {

    const signOutHanlder = () => {
        firebase.auth().signOut().then(() => {
            props.setUserUid(null);
        }).catch((error) => {
            console.log("error: " + error)
        });
    }

    return (
        <div className="navbar">
            <button className="profile" >
                <a href="/Profile" >Profile</a>
            </button>
            <button className="signout" onClick={signOutHanlder}>Sign Out</button>
        </div>
    )
}

export default NavBar;