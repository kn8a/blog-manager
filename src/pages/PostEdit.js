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

  //* Submit post edits
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
    <div>
          <form onSubmit={postSubmit}>
            <input name='title' onChange={onEdit} value={post.title}></input>
            <textarea name='content' onChange={onEdit} value={post.content}></textarea>
            <select name='status' defaultValue={post.status} onChange={onEdit}>
                <option value="draft">draft</option>
                <option value="published">published</option>
                <option value="archived">archived</option>
            </select>
            <button type='submit'>Submit</button>
          </form>
          <button onClick={deletePost}>Delete post</button>
        <div>
            {comments.map(comment => {
                return (
                    <div>
                      <p>{comment.comment}</p>
                      <p>Posted by {comment.author} on {DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)} <button id={comment._id} onClick={deleteComment}>Delete comment</button></p>
                      
                    </div>
                )
            })}
        </div>
    </div>

  )
}

export default PostEdit
