import React, { useState, useEffect, useHistory } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

//components
import Navbar from './components/Navbar';

// pages
import HomePage from './pages/HomePage';
import KidMainPage from './pages/KidMainPage';
import WishlistPage from './pages/WishListPage';
import ModifyWishItemPage from './pages/ModifyWishItem';
import ModifyChild from './pages/ModifyChild';
import Parents from  './pages/Parents';
import WishListAllPage from './pages/WishListAllPage';
import WishItemPage from './pages/WishItemPage';
import DeleteChild from './pages/DeleteChild'
import DeleteItemPage from './pages/DeleteItem';
import ChildViewPage from './pages/ChildViewPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

//contexts
import UserContext from './contexts/UserContext';

//api
// import UserAPI from './api/UserAPI';
import { login, getLoggedInUser } from './api/UserAPI';

//router
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [userID, setUserID] = useState(null)

  //router prop
  

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("auth-token") != null) {
        let data = await getLoggedInUser(localStorage.getItem("auth-token"))
        console.log(data)
        if (data.username) {
          setIsLoggedIn(true)
          setUser(data.username)
          setUserID(data.id)
          console.log(data.id)
        }
      }
    }
    if (!user) {
      getUser()
    }
  }, [])

  console.log("username:", user)
  console.log("user ID:", userID)

  // async function handleLogin(e) {
  const handleLogin = async (e) => {
    e.preventDefault();
    let credentials = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    // let response = await login(credentials)
    // let data = await response.json();
    let data = await login(credentials)
    if (data.token) {
      localStorage.setItem("auth-token", data.token)
      setIsLoggedIn(true);
      setUser(data.user);
      localStorage.setItem("user info", data.user.id)
      // navigate("/cashandcandy")
      }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null);
    setIsLoggedIn(false)
    setUser(null)
    setUserID(null)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/cashandcandy" element={ <HomePage isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout}/> } />
          {/* <Route exact path="/cashandcandy" element={ <HomePage/> } />  */}
          <Route exact path="/login" element={ <LoginPage handleLogout={handleLogout} isLoggedIn={isLoggedIn} handleLogin={handleLogin} user={user}/> } />
          <Route exact path="/signup" element={ <SignupPage user={ user }/> } />
          <Route exact path="/cashandcandy/:childID" element={ <KidMainPage />} />
          <Route exact path="/cashandcandy/parents/addchild" element={ <ModifyChild />} />
          <Route exact path="/cashandcandy/parents/:childID" element={ <ChildViewPage />} /> 
          <Route exact path="/cashandcandy/parents/:childID/delete" element={ <DeleteChild /> } />
          <Route exact path="/cashandcandy/parents" element={ <Parents />} />
          <Route exact path="/cashandcandy/parents/:childID/update" element={ <ModifyChild userID={userID}/>} />
          <Route exact path="/cashandcandy/wishlists/" element={ <WishListAllPage />} />
          <Route exact path="/cashandcandy/wishlists/:listID/" element={ <WishlistPage />} />
          <Route exact path="/cashandcandy/wishlists/:listID/item/:itemID" element={ <WishItemPage />} />
          <Route exact path="/cashandcandy/wishlists/:listID/item/create" element={ <ModifyWishItemPage />} />
          <Route path="/cashandcandy/wishlists/:listID/item/:itemID/update" element={<ModifyWishItemPage />} />
          <Route path="/cashandcandy/wishlists/:listID/item/:itemID/delete" element={<DeleteItemPage />} />
          {/* <Route exact path="/cashandcandy/allowance" element={ <AllowanceListPage/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
