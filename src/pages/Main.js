import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

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
    <div>
      {posts.map(post => {
        const id= '/posts/' + post._id
        return (
          <div>
            <h3><Link to={id}>{post.title}</Link></h3>
            <p>{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATE_MED)} / {post.status}</p>
          </div>
        )

      })}
    </div>
  )
}

export default Main