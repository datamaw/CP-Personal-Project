
const login = (userObject) => {
    return fetch('https://cashandcandy-backend.herokuapp.com/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    }).then(res => res)
  };
  
  const getLoggedInUser = (token) => {
    return fetch('https://cashandcandy-backend.herokuapp.com/cashandcandy/current_user/', {
    //   method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }).then(res => res)
  };
  
  const signupUser = (userObject) => {
    return fetch('https://cashandcandy-backend.herokuapp.com/cashandcandy/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    }).then(res => res)
  };
  
  export { login, getLoggedInUser, signupUser }