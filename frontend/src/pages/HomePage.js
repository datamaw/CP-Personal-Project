import React from 'react';
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import BackendAPI from "../api/BackendAPI"
import ChildList from '../components/ChildList';

import "../styles.css";
// const HomePage = ({ isLoggedIn, user, handleLogout }) => {

function HomePage() {
  //states
  const [childList, setChildList] = useState([])
    
  // effects
  useEffect(() => {
    const getChildList = async () => {
      const data = await BackendAPI.fetchChildList()
      console.log(data)
      if (data) {
        setChildList(data)
        console.log(childList)
      }
    }

    getChildList()
  }, [])  // empty array - only run on render

  return (
    
    <div>
      {/* <h1>Welcome!</h1> */}
      <div style={{ 
      backgroundImage: `url("https://thumbs.dreamstime.com/b/golden-chocolate-coins-close-up-63893694.jpg")` 
    }}>
       <h1>WELCOME</h1>
      </div>
      <ChildList childList={childList} />
      {
      //   user &&
      //   <div>
      //     Hi {user.username}
      //   </div>
      // }
      // {
      //   !isLoggedIn
      //   ?
      //   <div>
      //     <div>
      //       <Link to='/login'>Login</Link>
      //     </div>
      //     <div>
      //       <Link to='/signup'>Signup</Link>
      //     </div>
      //   </div>
      //   :
      //   <button onClick={handleLogout}>Logout</button>
      }
    </div>
  )
}

export default HomePage;