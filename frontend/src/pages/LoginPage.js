import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import UserAPI from '../api/UserAPI'


function LoginPage({ handleLogin, isLoggedIn, handleLogout }) {

// const Login = ({isLoggedIn, handleLogout, handleLogin}) => {

  // if (isLoggedIn) {
  //   return <div>
  //     <button onClick={handleLogout}>Logout</button>
  //     <div>
  //       <Link to='/'>Home</Link>
  //     </div>
  //   </div>
  // }

  return (
    <div>
    <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>UserName:</label>
        <input type='text' placeholder='' name='username' />
        <label>Password:</label>
        <input type='password' name='password' />
        <Button variant="success" type='submit' >Submit</Button>
      </form>
      <div>
        <Link to='/cashandcandy'>Home</Link>
      </div>
      <div>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
};

export default LoginPage;