import React from 'react';
import Keyboard from './Keyboard';
import './QuizPage.css';

const QuizPage = (props) => {
    if (props.mathQuestion) {
        return (
            <div>
                <h1>Maths Quiz</h1>
                <div className="quiz">
                    <h2>Your Score: {props.score}</h2>
                    <div className="question">{props.mathQuestion.question}</div>
                    <div className="userInput">{props.userInput}</div>
                    {props.correctness === 0 ? <Keyboard onClickHandler={(number) => props.setUserInput(props.userInput + number)} /> : <div>{props.comment}</div>}
                </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>
    }
}

export default QuizPage;