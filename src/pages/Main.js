import React from 'react'
import { useNavigate } from 'react-router-dom'



function Main(props) {

    const navigate = useNavigate()

    if (!props.token) {
        navigate('/login')
    }

  return (
    <div>Main</div>
  )
}

export default Main