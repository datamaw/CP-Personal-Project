import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import UserAPI from '../api/UserAPI'
import { Alert, useAlert } from 'react-alert'

function LoginPage({ handleLogin, isLoggedIn, handleLogout }) {

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
   
      </div>
      <div>
        <br/>
        <br/>
        <h6>No Account?</h6>
      <Link to='/signup'><Button variant="dark">Sign Up</Button></Link>
      </div>
    </div>
  );
};

export default LoginPage;