import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from './firebase';
import Keyboard from './Keyboard';
import AnsCorrectness from './AnsCorrectness';
import GenerateQuestion from './GenerateQuestion';

const App = () => {

  const [userInput, setUserInput] = useState("");
  const [comment, setComment] = useState("");
  const [mathQuestion, setMathQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [correctness, setCorrectness] = useState(0);

  useEffect(() => {
    let ref = firebase.database().ref("/mathsQuiz");
    ref.once("value", (data) => {
      let newData = data.val();
      setScore(newData);
    })
    setMathQuestion(GenerateQuestion());
  },[])

  useEffect(() => {
    if (correctness !== 0) submitHandler();
  }, [correctness, setUserInput])

  useEffect(() => {
    if (mathQuestion) {
      setCorrectness(AnsCorrectness(userInput, mathQuestion.answer))
    }
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
    firebase.database().ref('/mathsQuiz').set(newScore);
  }

  if (mathQuestion && score) {
    return (
      <div className="App">
        <h1>Maths Quiz</h1>
        <div className="quiz">
          <h2>Your Score: {score}</h2>
          <div className="question">{mathQuestion.question}</div>
          <div className="userInput">{userInput}</div>
          {correctness === 0 ? <Keyboard onClickHandler={(number) => setUserInput(userInput + number)} /> : <div>{comment}</div> }
        </div> 
      </div>
    );
  } else {
    return <h1>Loading...</h1>
  }
}

export default App;

// TO DO:
// 1. create user
// 2. css
// 3. save currentQuestion
// 4. re-factor code