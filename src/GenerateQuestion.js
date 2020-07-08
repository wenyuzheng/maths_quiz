export default () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { question: a + " + " + b, answer: (a + b).toString() };
}