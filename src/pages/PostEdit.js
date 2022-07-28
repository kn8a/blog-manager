import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { DateTime } from 'luxon';
import { toast } from 'react-toastify'

function PostEdit(props) {

  const navigate = useNavigate()
  const params = useParams()
  const postURL = `https://kn8a-blog-api.herokuapp.com/api/posts/all/${params.postId}`
  const commentsURL = `https://kn8a-blog-api.herokuapp.com/api/posts/${params.postId}/comments`
  const updatePostURL = `https://kn8a-blog-api.herokuapp.com/api/posts/${params.postId}`

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null)
  


  useEffect(() => {
    axios.get(`${postURL}`, {headers: {"Authorization": `Bearer ${props.token}`}}).then((response) => { //get post details
      setPost(response.data);
    });
  },[]);

  useEffect(()=>{
    axios.get(`${commentsURL}`).then((response) => { //get comments
      setComments(response.data);
    });
  },[])

  if (!post || !comments) return <Spinner/>

  const onEdit = (e) => {
    const value = e.target.value
    setPost({
      ...post,
      [e.target.name]: value
  });
  }

  //* update post
  const postSubmit = (e) => {
    e.preventDefault()
    axios.put(updatePostURL, post, {headers: {'Authorization': `Bearer ${props.token}`}})
    .then(()=>{
      toast.success('Post updated successfully')
      navigate('/')
      });
    }
  
  const deletePost = () => {
    axios.delete(updatePostURL, {headers: {'Authorization': `Bearer ${props.token}`}})
    .then(()=>{
      toast.success('Post deleted')
      navigate('/')
      });
  }

  const deleteComment = (e) => {
    const delCommentURL = `https://kn8a-blog-api.herokuapp.com/api/posts/${params.postId}/comments/${e.target.id}`
    axios.delete(delCommentURL, {headers: {'Authorization': `Bearer ${props.token}`}})
    .then(()=>{
      toast.success('Comment deleted')
      axios.get(`${commentsURL}`).then((response) => { //refresh comments
        setComments(response.data);
      });
      });
  }

  return (
    <div className='container is-max-desktop'>
          
          <div className='block'>
          <div class="field">
                  <button type='button'  onClick={()=>navigate('/')} className="button is-info is-rounded">{'<- '}Back to all posts</button>
                </div>
          </div>
          
          <form onSubmit={postSubmit} className="block box">
            <div className='field'>
              <label className="label">Title:</label>
              <input className='input ' name='title' onChange={onEdit} value={post.title}></input>
            </div>
            <div className='field'>
            <label className="label">Content:</label>
            <textarea className='textarea ' name='content' onChange={onEdit} value={post.content}></textarea>
            </div>
            <div className='field'>
            <label className="label">Status:</label>
            
              
            </div>
              <div class="field is-grouped">
                <div class="control">
                <div className='select'>
                <select name='status' defaultValue={post.status} onChange={onEdit}>
                    <option value="draft">draft</option>
                    <option value="published">published</option>
                    <option value="archived">archived</option>
                </select>
              </div>
                </div>
                <div class="control">
                  <button type='submit' className='button is-primary is-rounded'>Save</button>
                </div>
                <div class="control">
                  <button type='button'  onClick={deletePost} className="button is-danger is-rounded">Delete post</button>
                </div>
              </div>
                
                
          </form>
          
        <div className='block box'>
          <h1 className='title is-5'>Comments:</h1>
            {comments.map(comment => {
                return (
                    <div className='notification '>
                      <button id={comment._id} onClick={deleteComment} className="delete" title='Delete comment'>Delete comment</button>
                      <p>{comment.comment}</p>
                      <p><em>Posted by {comment.author} on {DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}</em> </p>
                      
                    </div>
                )
            })}
        </div>
    </div>

  )
}

export default PostEdit
