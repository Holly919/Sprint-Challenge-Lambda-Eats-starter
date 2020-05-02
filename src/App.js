import React from "react";
import Form from './components/Form';
import Home from './components/Home';
import './App.css';
import { Route } from "react-router-dom"

const App = () => {
  return (
    <div className="App">
    <h1>LAMBDA EATS</h1>
    <p>Get your coding fuel here!</p>
    <Route exact path="/" component={Home}/>
    <Route path="/pizza" component={Form}/>
  </div>
);
};
      
export default App;