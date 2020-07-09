import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import './App.css';
import QuizPage from './QuizPage';
import RegisterPage from './RegisterPage';

const App = () => {

  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Signed In: ", user);
        setUserUid(user.uid);
      } else {
        console.log("NOT signed in");
      }
    })
  }, [])

  return (
    <div className="App">
      { userUid ? <QuizPage userUid={userUid} setUserUid={setUserUid} /> : <RegisterPage /> }
    </div>
  );
}

export default App;

// TO DO:
// 1. router 
// 2. loading
// 3. css
// 4. re-factor code