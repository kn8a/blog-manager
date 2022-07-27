import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

function PostCreate(props) {

    const navigate = useNavigate()

    useEffect(() => {
        if (!props.token) {
          navigate('/login')
        }
    },[])

    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        status: 'draft'
    })

    const newPostURL = `http://localhost:5000/api/posts`

    const onEdit = (e) => {
        const value = e.target.value
        setNewPost({
          ...newPost,
          [e.target.name]: value
        })
        console.log(newPost)
    }

    const postSubmit = (e) => {
    e.preventDefault()
    axios.post(newPostURL, newPost, {headers: {'Authorization': `Bearer ${props.token}`}})
    .then(()=>{
      toast.success('Post updated successfully')
      navigate('/')
      });
    }

  return (
    <div>
        <form onSubmit={postSubmit}>
        <input name="title" onChange={onEdit}></input>
        <textarea name="content" onChange={onEdit}></textarea>
        <select name='status' defaultValue={newPost.status} onChange={onEdit}>
                <option value="draft">draft</option>
                <option value="published">published</option>
                <option value="archived">archived</option>
            </select>
        <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default PostCreate