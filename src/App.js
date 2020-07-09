import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from './firebase';
import AnsCorrectness from './AnsCorrectness';
import GenerateQuestion from './GenerateQuestion';
import QuizPage from './QuizPage';

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [comment, setComment] = useState("");
  const [mathQuestion, setMathQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [correctness, setCorrectness] = useState(0);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Signed In: ", user);
        setUserUid(user.uid);

        firebase.database().ref(`/users/${user.uid}/score`).once('value').then(data => {
          if (data.val() === null) {
            setScore(0);
          } else {
            setScore(data.val());
          }
        })
        firebase.database().ref(`/users/${user.uid}/question`).once('value').then(data => {
          if (data.val() === null) {
            const newQuestion = GenerateQuestion();
            setMathQuestion(newQuestion);
            // setMathQuestion(GenerateQuestion());
          } else {
            setMathQuestion(data.val());
          }
        })
      } else {
        console.log("NOT signed in");
      }
    })
  },[])

  useEffect(() => {
    if (correctness !== 0) submitHandler();
  }, [correctness, setUserInput])

  useEffect(() => {
    if (mathQuestion) setCorrectness(AnsCorrectness(userInput, mathQuestion.answer));
  }, [userInput, setCorrectness, mathQuestion])

  const nextHandler = () => {
    setUserInput("");
    setMathQuestion(GenerateQuestion());
  }

  const submitHandler = () => {
    let newScore = score;
    if (correctness === 1) {
      setComment("Correct!")
      newScore += 1;

      setTimeout(() => {
        nextHandler();
      }, 500)

    } else if (correctness === -1) {
      setComment("Incorrect! Answer: " + mathQuestion.answer);

      setTimeout(() => {
        nextHandler();
      }, 2000)
    }
    setScore(newScore);
    firebase.database().ref(`/users/${userUid}/score`).set(newScore);
  }

  const registerHandler = () => {
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch((error) => {
      console.log("errorCode: " + error.code);
      alert(error.message);
    });
  }

  const signOutHanlder = () => {
    firebase.database().ref(`/users/${userUid}/question`).set(mathQuestion);
    firebase.auth().signOut().then(() => {
      setUserUid(null);
    }).catch((error) => {
      console.log("error: " + error)
    });
  }

  const signInHandler = () => {
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch((error) => {
      console.log("errorCode: " + error.code);
      alert(error.message);
    });
  }

  return (
    <div className="App">
      {userUid ?
        <div>          
          <button onClick={signOutHanlder} className="buttons">Sign Out</button>
          <QuizPage score={score} mathQuestion={mathQuestion} correctness={correctness} userInput={userInput} setUserInput={setUserInput} comment={comment}/>
        </div> :
        <div className="form">
          Email: <input onChange={(e) => { setUserEmail(e.target.value) }} /> <br></br>
          Password: <input type="password" onChange={(e) => { setUserPassword(e.target.value) }} /> <br></br>
          <button onClick={registerHandler} className="buttons">Register</button>
          <button onClick={signInHandler} className="buttons">Sign in</button>
        </div>
      }
    </div>
  );
}

export default App;

// TO DO:
// 1. create user [done]
// 2. css
// 3. save currentQuestion [done]
// 4. re-factor code