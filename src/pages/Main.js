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

    const newPostBtn = () => {
      navigate('/posts/new')
    }

  return (
    <div className='container is-max-desktop'>
      <div className='block'>

      </div>
      <div className='block'>
        <button onClick={newPostBtn} className="button is-primary is-large is-fullwidth is-rounded">Create new post</button>
      </div>
      <div className='box'>
        {posts.map(post => {
          const id= '/posts/' + post._id
          return (
            <div className='box'>
              <h3 className='title is-4'><Link to={id}>{post.title}</Link></h3>
              <div className='content'>
              <p className='subtitle is-6'>{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATE_MED)} / {post.status}</p>
              </div>
              
              
              <button className='button is-info is-rounded is-small' onClick={() => navigate(id)}>Edit</button>
            </div>
          )

      })}
      </div>
      
    </div>
  )
}

export default Main