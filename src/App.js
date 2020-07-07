import React, { useState, useEffect } from 'react';
import './App.css';
import Keyboard from './Keyboard';
import firebase from './firebase';

const App = () => {

  const [userInput, setUserInput] = useState("");
  const [comment, setComment] = useState("");
  const [shouldShowAnswer, setShouldShowAnswer] = useState(false);
  const [mathQuestion, setMathQuestion] = useState(null);
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const newMathQuestion = { question: a + " + " + b, answer: (a + b).toString() };
    setMathQuestion(newMathQuestion);
  }

  useEffect(() => {
    let ref = firebase.database().ref("/mathsQuiz");
    ref.once("value", (data) => {
      let newData = data.val();
      setScore(newData);
    })
    generateQuestion();
  },[])

  // useEffect(() => {
  //   submitHandler();
  // },[userInput])

  const nextHandler = () => {
    generateQuestion();
    setShouldShowAnswer(false);
    setUserInput("");
  }

  const submitHandler = () => {
    let newScore = score;
    if (userInput === mathQuestion.answer) {
      setComment("Correct!")
      newScore += 1;

      setTimeout(() => {
        nextHandler();
      }, 500)

    } else if (!(userInput === mathQuestion.answer) || !(userInput[0] === mathQuestion.answer[0])) {
      setComment("Incorrect! Answer: " + mathQuestion.answer);

      setTimeout(() => {
        nextHandler();
      }, 3000)

    }
    setScore(newScore);
    setShouldShowAnswer(true);
    firebase.database().ref('/mathsQuiz').set(newScore);
  }

  // const submitHandler = () => {
  //   let newScore = score;
  //   if (userInput === mathQuestion.answer) {
  //     setComment("Correct!");
  //     newScore += 1;
  //   } else if (!(userInput === mathQuestion.answer) || !(userInput[0] === mathQuestion.answer[0])) {
  //     setComment("Incorrect! Answer: " + mathQuestion.answer);
  //   } 
  //   setShouldShowAnswer(true);
  //   setScore(newScore);
  // }

  const onClickHandler = (number) => {
    let newInput = userInput + number;
    if (newInput.length > 2) {
      newInput = userInput;
    }
    setUserInput(newInput);
  }

  if (mathQuestion && score) {
    return (
      <div className="App">
        <h1>Maths Quiz</h1>
        <div className="quiz">
          <h2>Your Score: {score}</h2>
          <div className="question">{mathQuestion.question}</div>
          <div className="userInput">{userInput}</div>
          <button onClick={submitHandler} className="button">submit</button>
          {shouldShowAnswer ? <div>{comment}</div> : null}
          <Keyboard handler={onClickHandler}/>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>
  }
}

export default App;

// TO DO:
// 1. (hard) auto submit
// 2. auto next [done]