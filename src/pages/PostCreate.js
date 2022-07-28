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

    const newPostURL = `https://kn8a-blog-api.herokuapp.com/api/posts`

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
        

        <div className='block'></div>
          <div className='block'>
          <div class="field">
                  <button type='button'  onClick={()=>navigate('/')} className="button is-info is-rounded">{'<- '}Back to all posts</button>
                </div>
          </div>
          
          <form onSubmit={postSubmit} className="block box">
            <div className='field'>
              <label className="label">Title:</label>
              <input className='input ' name='title' onChange={onEdit} value={newPost.title}></input>
            </div>
            <div className='field'>
            <label className="label">Content:</label>
            <textarea className='textarea ' name='content' onChange={onEdit} value={newPost.content}></textarea>
            </div>
            <div className='field'>
            <label className="label">Status:</label>
            
              
            </div>
              <div class="field is-grouped">
                <div class="control">
                <div className='select'>
                <select name='status' defaultValue={newPost.status} onChange={onEdit}>
                    <option value="draft">draft</option>
                    <option value="published">published</option>
                    <option value="archived">archived</option>
                </select>
              </div>
                </div>
                <div class="control">
                  <button type='submit' className='button is-success is-rounded'>Save</button>
                </div>
                <div class="control">
                  <button type='button'  onClick={() => navigate('/')} className="button is-danger is-rounded is-outlined">Cancel</button>
                </div>

              </div>
                
                
          </form>



    </div>
  )
}

export default PostCreate