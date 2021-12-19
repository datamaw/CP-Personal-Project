import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

//components
import Navbar from './components/Navbar';

// pages
import HomePage from './pages/HomePage';
import KidMainPage from './pages/KidMainPage';
import AddWishItemPage from './pages/AddWishItem';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { getLoggedInUser, login } from './api/UserAPI';
// import CallBackPage from './pages/CallBackPage';

//router
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("auth-user") !== 'null') {
        let response = await getLoggedInUser(localStorage.getItem("auth-user"));
        let data = await response.json();
        if (data.username) {
          setIsLoggedIn(true);
          setUser(data);
        }
      }
    }
    if (!user) {
      getUser();
    }
  }, [user])

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    }
    let response = await login(userObject);
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("auth-user", `${data.token}`);
      setIsLoggedIn(true);
      setUser(data.user);
    }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null);
    setIsLoggedIn(false);
    setUser(null);
  }

  const renderLoginPage = () => {
    return (
      <LoginPage
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        user={user}
      />
    )
  }

  const renderHomePage = () => {
    return (
      <HomePage
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
      />
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/cashandcandy" element={ <HomePage />} />
          <Route exact path="/login" render={renderLoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/cashandcandy/:childID" element={ <KidMainPage />} />
          <Route exact path="/cashandcandy/additem" element={ <AddWishItemPage />} />
          {/* <Route exact path="/cashandcandy/callback" element={ <CallBackPage/>} /> */}
        </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
