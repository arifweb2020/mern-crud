import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/mynotes" component={MyNotes}  />
        
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
