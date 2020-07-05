import React from 'react';
import './Keyboard.css';

const Keyboard = (props) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return(
        <div className="container">
            <div className="keyboard">
                {numbers.map((number) => {
                    return <button onClick={() => props.handler(number)} key={number}>{number}</button>
                })}
                <button className="zero">0</button>
            </div>
        </div>
    )
}

export default Keyboard;