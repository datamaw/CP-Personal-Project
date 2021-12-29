const BASE_URL = "https://cashandcandy-backend.herokuapp.com/"

async function login(credentials) {
  try {
    let init = {
      "method": "POST",
      "headers": {
      "Content-type": "application/json"
      },
      "body": JSON.stringify(credentials)
    }
    console.log(init)
    let response = await fetch(BASE_URL + "token-auth/", init)
    let data = await response.json()
    console.log(data)
    return data
  }
  catch (error) {
    console.error(error)
    return {}
  }
}

const getLoggedInUser = async (token) => {
  try {
    let init = {
      "method": "GET",
      "headers": {
      "Content-type": "application/json",
      "Authorization": `JWT ${token}`
      },
    }
    console.log(init)
    let response = await fetch(BASE_URL + "cashandcandy/current_user/", init)
    console.log(response)
    let data = await response.json()
    console.log(data)
    return data

  }
  catch(err) {
    console.error(err)
  }
}

const signupUser = (userObject) => {
  return fetch('https://cashandcandy-backend.herokuapp.com/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObject)
  }).then(res => res)
};

export { login, getLoggedInUser, signupUser }