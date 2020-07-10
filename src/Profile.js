import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import GenerateQuestion from './GenerateQuestion';
import Loading from './Loading';
import './Profile.css';

const Profile = () => {

    const [userData, setUserData] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                firebase.database().ref(`/users/${user.uid}`).once('value').then(data => {
                    if (data.val() === null) {
                        let newObject = { score: 0, question: GenerateQuestion() };
                        setUserData(newObject);
                        firebase.database().ref(`/users/${user.uid}`).set(newObject);
                    } else {
                        setUserData(data.val());
                    }
                })
            }
        })
    }, [])

    if (userData) {
        return (
            <div>
                <a href="/" className="backBtn">Back</a>
                <h1>Your Profile</h1>
                <div className="details">
                    <div>Your Email Address: {userEmail}</div> <br></br>
                    <div>Your Current Score: {userData.score}</div> <br></br>
                    <div>Your Current Question: {userData.question.question}</div>
                </div>
            </div>
        )
    } else {
        return <Loading />
    }
    
}

export default Profile;