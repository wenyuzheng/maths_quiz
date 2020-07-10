import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import './App.css';
import QuizPage from './QuizPage';
import RegisterPage from './RegisterPage';
import Loading from './Loading';

const App = () => {

  const [userUid, setUserUid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        console.log("Signed In: ", user);
      } else {
        console.log("NOT signed in");
      }
      setIsLoading(false);
    })
  }, [])

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <div className="App">
        {userUid ? <QuizPage userUid={userUid} setUserUid={setUserUid} /> : <RegisterPage />}
      </div>
    );
  }
}

export default App;

// TO DO:
// 1. router [done]
// 2. loading [done]
// 3. DB Objects?
// 4. css
// 5. re-factor code