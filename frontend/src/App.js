import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

//components
import Navbar from './components/Navbar';

// pages
import HomePage from './pages/HomePage';
import KidMainPage from './pages/KidMainPage';
import WishlistPage from './pages/WishListPage';
import AllowanceListPage from './pages/AllowanceListPage';
import ModifyWishItemPage from './pages/ModifyWishItem';
import ModifyChild from './pages/ModifyChild';
import Parents from  './pages/Parents';
import WishListAllPage from './pages/WishListAllPage';
import WishItemPage from './pages/WishItemPage';
import DeleteChild from './pages/DeleteChild'
import DeleteItemPage from './pages/DeleteItem';
import ChildViewPage from './pages/ChildViewPage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import { getLoggedInUser, login } from './api/UserAPI';
// import CallBackPage from './pages/CallBackPage';

//router
import { BrowserRouter, Routes, Route } from "react-router-dom"



function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUser = async () => {
  //     if (localStorage.getItem("auth-user") !== 'null') {
  //       let response = await getLoggedInUser(localStorage.getItem("auth-user"));
  //       let data = await response.json();
  //       if (data.username) {
  //         setIsLoggedIn(true);
  //         setUser(data);
  //       }
  //     }
  //   }
  //   if (!user) {
  //     getUser();
  //   }
  // }, [user])

  // const handleLogin = async (evt) => {
  //   evt.preventDefault();
  //   let userObject = {
  //     username: evt.target.username.value,
  //     password: evt.target.password.value,
  //   }
  //   let response = await login(userObject);
  //   let data = await response.json();
  //   if (data.token) {
  //     localStorage.setItem("auth-user", `${data.token}`);
  //     setIsLoggedIn(true);
  //     setUser(data.user);
  //   }
  // }

  // const handleLogout = () => {
  //   localStorage.setItem("auth-user", null);
  //   setIsLoggedIn(false);
  //   setUser(null);
  // }

  // const renderLoginPage = () => {
  //   return (
  //     <LoginPage
  //       isLoggedIn={isLoggedIn}
  //       handleLogin={handleLogin}
  //       handleLogout={handleLogout}
  //       user={user}
  //     />
  //   )
  // }

  // const renderHomePage = () => {
  //   return (
  //     <HomePage
  //       isLoggedIn={isLoggedIn}
  //       user={user}
  //       handleLogout={handleLogout}
  //     />
  //   )
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/cashandcandy" element={ <HomePage />} />
          {/* <Route exact path="/login" render={renderLoginPage} />
          <Route exact path="/signup" component={SignupPage} /> */}
          <Route exact path="/cashandcandy/:childID" element={ <KidMainPage />} />
          {/* <Route exact path="/cashandcandy/additem" element={ <ModifyWishItemPage />} /> */}
          <Route exact path="/cashandcandy/parents/addchild" element={ <ModifyChild />} />
          <Route exact path="/cashandcandy/parents/:childID" element={ <ChildViewPage />} /> 
          <Route exact path="/cashandcandy/parents/:childID/delete" element={ <DeleteChild /> } />
          <Route exact path="/cashandcandy/parents" element={ <Parents />} />
          <Route exact path="/cashandcandy/parents/:childID/update" element={ <ModifyChild />} />
          <Route exact path="/cashandcandy/wishlists/" element={ <WishListAllPage />} />
          <Route exact path="/cashandcandy/wishlists/:listID/" element={ <WishlistPage />} />
          <Route exact path="/cashandcandy/wishlists/:listID/item/:itemID" element={ <WishItemPage />} />
          <Route exact path="/cashandcandy/wishlists/:listID/item/create" element={ <ModifyWishItemPage />} />
          <Route path="/cashandcandy/wishlists/:listID/item/:itemID/update" element={<ModifyWishItemPage />} />
          <Route path="/cashandcandy/wishlists/:listID/item/:itemID/delete" element={<DeleteItemPage />} />
          <Route exact path="/cashandcandy/allowance" element={ <AllowanceListPage/>} />
        </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
