import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import Keyboard from './Keyboard';
import AnsCorrectness from './AnsCorrectness';
import GenerateQuestion from './GenerateQuestion';
import './QuizPage.css';
import Loading from './Loading';

const QuizPage = (props) => {

    const [userInput, setUserInput] = useState("");
    const [mathQuestion, setMathQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [correctness, setCorrectness] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        firebase.database().ref(`/users/${props.userUid}`).once('value').then(data => {
            if (data.val() === null) {
                let newObject = { score: 0, question: GenerateQuestion() };
                firebase.database().ref(`/users/${props.userUid}`).set(newObject);
                setScore(newObject.score);
                setMathQuestion(newObject.question);
            } else {
                setScore(data.val().score);
                setMathQuestion(data.val().question);
            }
        })
    }, [])

    useEffect(() => {
        if (correctness !== 0) submitHandler();
    }, [correctness, setUserInput])

    useEffect(() => {
        if (mathQuestion) setCorrectness(AnsCorrectness(userInput, mathQuestion.answer));
    }, [userInput, setCorrectness, mathQuestion])

    const nextHandler = () => {
        setUserInput("");
        const newMathQuestion = GenerateQuestion();
        setMathQuestion(newMathQuestion);
        firebase.database().ref(`/users/${props.userUid}/question`).set(newMathQuestion);
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
        firebase.database().ref(`/users/${props.userUid}/score`).set(newScore);
    }

    const signOutHanlder = () => {
        firebase.auth().signOut().then(() => {
            props.setUserUid(null);
        }).catch((error) => {
            console.log("error: " + error)
        });
    }

    if (mathQuestion) {
        return (
            <div>
                <button onClick={signOutHanlder} className="buttons">Sign Out</button>
                <h1>Maths Quiz</h1>
                <div className="quiz">
                    <h2>Your Score: {score}</h2>
                    <div className="question">{mathQuestion.question}</div>
                    <div className="userInput">{userInput}</div>
                    {correctness === 0 ? <Keyboard onClickHandler={(number) => setUserInput(userInput + number)} /> : <div>{comment}</div>}
                </div>
            </div>
        );
    } else {
        return <Loading />
    }
}

export default QuizPage;