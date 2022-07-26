import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'

function Main(props) {

    const navigate = useNavigate()
    const postsURL = `https://kn8a-blog-api.herokuapp.com/api/posts/all`

    const [posts, setPosts] = useState()

    useEffect(() => {
      if (!props.token) {
        navigate('/login')
    } else {
      axios.get(postsURL, {headers: {"Authorization": `Bearer ${props.token}`}})
      .then((response) => {
        console.log(response.data)
        setPosts(response.data)
      })
      .catch((err)=> {
        console.log(err)
      })
    }
    }, [])
    
    if (!posts) return <Spinner/>
    console.log(posts)

  return (
    <div>Main</div>
  )
}

export default Main