import React from "react";
import { Route } from "react-router-dom"
import Home from './components/Home';
import Form from './components/Form';
import './App.css';


const App = () => {
  return (
    <div className="App">
    <h1>LAMBDA EATS</h1>
    <p>Get your coding fuel here!</p>
    <Route exact path="/" component={Home}/>
    <Route path="/form" component={Form}/>
  </div>
);
};
      
export default App;

