import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from "./screens/SingleNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/note/:id" component={SingleNote} />
        <Route path="/createnote" component={CreateNote} />;
        <Route
          path="/mynotes"
          component={({ history }) => (
            <MyNotes search={search} history={history} />
          )}
        />
        <Route path="/profile" component={ProfileScreen} />
        
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
