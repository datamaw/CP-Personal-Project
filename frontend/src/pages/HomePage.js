import React from 'react';
import { useState, useEffect, useContext } from "react"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import BackendAPI from "../api/BackendAPI"
import ChildList from '../components/ChildList';
import UserContext from '../contexts/UserContext';

import "../styles.css";
import LoginPage from './LoginPage';

function HomePage({ isLoggedIn, user, handleLogout }) {

  // const user = useContext(UserContext)

  //states
  const [childList, setChildList] = useState([])
    
  // effects
  useEffect(() => {
    const getChildList = async () => {
      const data = await BackendAPI.fetchChildList()
      // console.log(data)
      if (data) {
        setChildList(data)
        console.log(childList)
      }
    }

    getChildList()
  }, [])  // empty array - only run on render

  if (isLoggedIn) {
    return (
      <div>
        <div id="welcome-page-banner">
          <h1>Welcome, {user}!</h1>
        </div>
        {/* <h2>You are logged in as <span className="user">{user}</span></h2> */}
        <>
        <img src="https://w7.pngwing.com/pngs/196/872/png-transparent-lollipop-eating-candy-graphy-child-eating-food-face-toddler.png" className="homephoto" alt="lollipop" />
      </>
      <>
      <ChildList childList={childList} />
      </>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </div>
    )
  }

  return (
    
    <div>
      {/* <h1>Welcome!</h1>
      <h2>You are logged in as <span className="user">{user}</span></h2> */}
       <h1></h1>

      {
        !isLoggedIn
        ?
        <div>
          <div>
            <Link to='/login'>Login</Link>
          </div>
          <div>
            <Link to='/signup'>Signup</Link>
          </div>
        </div>
        :
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      }
    </div>
  )
}

export default HomePage;