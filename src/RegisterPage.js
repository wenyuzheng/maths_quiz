import React, { useState } from 'react';
import firebase from './firebase';
import './RegisterPage.css';

const RegisterPage = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const registerHandler = () => {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch((error) => {
            console.log("errorCode: " + error.code);
            alert(error.message);
        });
    }

    const signInHandler = () => {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch((error) => {
            console.log("errorCode: " + error.code);
            alert(error.message);
        });
    }

    return (
        <div className="form">
            Email: <input onChange={(e) => { setUserEmail(e.target.value) }} /> <br></br>
            Password: <input type="password" onChange={(e) => { setUserPassword(e.target.value) }} /> <br></br>
            <button onClick={registerHandler} className="buttons">Register</button>
            <button onClick={signInHandler} className="buttons">Sign in</button>
        </div>
    )
}

export default RegisterPage;