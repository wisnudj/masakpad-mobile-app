import axios from 'axios'

export const getToken = (acces_token) => {
  return {
    type: "SIGN_IN",
    payload: {
      acces_token
    }
  }
}

export const signup = (name, email, password) => {
  return dispatch => {
    axios.post('http://192.168.58.1:3001/user/signup', {
      name: name,
      email: email,
      password: password
    })
    .then(function(tahi) {
      console.log(tahi)
      axios.post('http://192.168.58.1:3001/user/signin', {
        email: email,
        password: password
      })
      .then(function(kucing) {
        dispatch(getToken(kucing.data))
      })
    })
  }
}


export const signin = (email, password) => {
  return dispatch => {
    axios.post('http://192.168.58.1:3001/user/signin', {
      email: email,
      password: password
    })
    .then(function (response) {
      dispatch(getToken(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

