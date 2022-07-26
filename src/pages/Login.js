import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {

    const [credentials, setCredentials] = useState(null)
    const loginURL = 'https://kn8a-blog-api.herokuapp.com/api/users/login'
    const navigate = useNavigate()

    useEffect(() => {
        if (props.token) { //if logged in go to /
          navigate('/')
      }})

    const validateUser = (e) => { //validate login credentials
        e.preventDefault()  
        axios.post(loginURL, credentials)
        .then( (response) => {
            console.log(response)
            if (response.data.token) {
                props.tokenToState(response.data.token)
                setCredentials(null)
                navigate('/')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const onChange = (e) => {
        const value = e.target.value
        setCredentials({
            ...credentials,
            [e.target.name]: value
        })
    }


  return (
    <div>
        <form onSubmit={validateUser}>
            <input name='username' onChange={onChange}></input>
            <input name='password' onChange={onChange}></input>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login