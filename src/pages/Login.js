import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Login(props) {

    const [credentials, setCredentials] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const loginURL = 'https://kn8a-blog-api.herokuapp.com/api/users/login'
    const navigate = useNavigate()


    useEffect(() => {
        if (props.token) { //if logged in go to /
          navigate('/')
      }})

    const validateUser = (e) => { //validate login credentials
        setIsLoading(true)
        e.preventDefault()  
        axios.post(loginURL, credentials)
        .then( (response) => {
            if (response.data.token) {
                props.tokenToState(response.data.token)
                setCredentials(null)
                setIsLoading(false)
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

    if (isLoading) return <Spinner/>


  return (
    <div className='container'>
        

        <form className="box" onSubmit={validateUser}>
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input className="input" type='text' name='username' onChange={onChange}></input>
                </div>
            </div>

        <div className="field">
            <label className="label">Password</label>
            <div className="control">
            <input className="input" type="password" name='password' onChange={onChange} placeholder="********"></input>
            </div>
        </div>

        <button className="button is-primary" type='submit'>Sign in</button>
        </form>
    </div>
  )
}

export default Login