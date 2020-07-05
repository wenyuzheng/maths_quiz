import React, { useState, useEffect } from 'react';
import './App.css';
import Keyboard from './Keyboard';
// import firebase from './firebase';

const App = () => {

  const [userInput, setUserInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    // let ref = firebase.database().ref("/mathsQuiz");
    // ref.once("value", (data) => {
    //   let newData = data.val();
    //   setScore(newData);
    //   console.log(newData)
    // })
    generateQuestion();
  },[])

  const nextHandler = () => {
    generateQuestion();
    setIsSubmitted(false);
    setShouldShowAnswer(false);
    setUserInput("");
  }

  const submitHandler = () => {
    let checkAnswerComment = "";
    if (userInput === mathQuestion.answer) {
      checkAnswerComment = "Correct!"
      setScore(score + 1);
    } else {
      checkAnswerComment = "Incorrect! Answer: " + mathQuestion.answer;
    }
    setComment(checkAnswerComment);
    setShouldShowAnswer(true);
    setIsSubmitted(true);
    // firebase.database().ref('/mathsQuiz').set(score);
  }

  const onClickHandler = (number) => {
    setUserInput(userInput + number);
  }

  if (mathQuestion) {
    return (
      <div className="App">
        <h1>Maths Quiz</h1>
        <div className="quiz">
          <div className="question">{mathQuestion.question}</div>
          <div className="userInput">{userInput}</div>
          {isSubmitted ? <button onClick={nextHandler} className="buttons">next</button> : <button onClick={submitHandler} className="buttons">submit</button>}
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
// 1. custom keypad [done]
// 2. input box -> div [done]
// 3. set limit digits of input
// 4. score 1 for correct ans, 0 for incorrect [done]
// 5. save score to firebase
// 6. harder maths quiz
// 7. (hard) auto submit