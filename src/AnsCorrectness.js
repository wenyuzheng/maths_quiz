export default (userAnswer, correctAnswer) => {
    for (var i = 0; i < correctAnswer.length; i++) {
        if (userAnswer[i] === undefined) return 0;
        if (userAnswer[i] !== correctAnswer[i]) return -1;
    }

    if (userAnswer.length > correctAnswer.length) return -1;
    
    return 1;
}