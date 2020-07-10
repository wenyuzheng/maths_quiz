import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Loading from './Loading';
import Profile from './Profile';

const Test = () => {
  return <h1>Test</h1>
}

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Load" component={Loading} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Test" component={Test}/>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
    <Root />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
