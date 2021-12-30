import React from 'react';
import { Alert, useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { signupUser } from '../api/UserAPI';

const SignupPage = (props) => {

  const navigate = useNavigate()
  const alert = useAlert()
//   // const { history } = props;
  const handleSignup = async (evt) => {
    evt.preventDefault();
    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
    }
    let data = await signupUser(userObject);
    if (data.error) {
      console.log('there was an error signing up');
    }
    else {
      alert.show('User Account Successfully Created. Now You Can Log In.')
      navigate('/login');
    }

  }

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <label>UserName:</label>
        <input type='text' placeholder='' name='username' />
        <label>Password:</label>
        <input type='password' name='password' />
        <Button variant="primary" type='submit' >Sign Up</Button>
      </form>
      <br/>
      <div>
        <Link to='/login'><Button variant="dark">Login</Button></Link>
      </div>
    </div>
  );
};

export default SignupPage;