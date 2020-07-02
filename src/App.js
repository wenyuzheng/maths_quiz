import React, { useState } from 'react';
import './App.css';

const App = () => {

  const questions = [
    { question: "1+1", answer: "2" }
  ]

  const [questionList, setQuestionList] = useState(questions)
  const [i, setI] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [shouldShowAnswer, setShouldShowAnswer] = useState(false);

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const newMathQuestion = { question: a + " + " + b, answer: eval(a + b).toString() };
    const newQuestionList = [...questionList, newMathQuestion];
    setQuestionList(newQuestionList);
  }

  const nextHandler = () => {
    generateQuestion();
    if (i+1 > questionList.length) {
      alert("End of quiz!")
    } else {
      setI(i+1);
    }
    setIsSubmitted(false);
    setShouldShowAnswer(false);
    setUserInput("");
  }

  const submitHandler = () => {
    const checkAnswer = userInput === questionList[i].answer ? "Correct!" : "Incorrect! Answer: " + questionList[i].answer
    setComment(checkAnswer);
    setShouldShowAnswer(true);
    setIsSubmitted(true);
  }

  return (
    <div className="App">
      <h1>Maths Quiz</h1>
      <div className="quiz">
        <div className="question">{questionList[i].question}</div>
        <input type="text" placeholder="Type your answer" value={userInput} onChange={e => setUserInput(e.target.value)} className="input" />
        {isSubmitted ? <button onClick={nextHandler}>next</button> : <button onClick={submitHandler}>submit</button>}
        {shouldShowAnswer ? <div>{comment}</div> : null}
      </div>
    </div>
  );
}

export default App;

// TO DO:
// 1. initialise questionList with random generated question