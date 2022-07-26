import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { DateTime } from 'luxon';
import { toast } from 'react-toastify'

function PostEdit(props) {

  const params = useParams()
  const postURL = `https://kn8a-blog-api.herokuapp.com/api/posts/${params.postId}`
  const commentsURL = `https://kn8a-blog-api.herokuapp.com/api/posts/${params.postId}/comments`

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null)


  useEffect(() => {
    axios.get(`${postURL}`).then((response) => {
      setPost(response.data);
    });
  },[]);

  useEffect(()=>{
    axios.get(`${commentsURL}`).then((response) => {
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
    axios.put(postURL, post, {headers: {'Authorization': `Bearer ${props.token}`}})
    .then(()=>{
      toast.success('Post updated successfully')
      });
    }
  

  return (
    <div>
          <form onSubmit={postSubmit}>
            <input name='title' onChange={onEdit} value={post.title}></input>
            <textarea name='content' onChange={onEdit} value={post.content}></textarea>
            <select name='status' defaultValue={post.status}>
                <option value="draft">draft</option>
                <option value="published">published</option>
                <option value="archived">archived</option>
            </select>
            <button type='submit'>Submit</button>
          </form>
        <div>
            {comments.map(comment => {
                return (
                    <div>
                    <p>{comment.comment}</p>
                    <p>Posted by {comment.author} on {DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}</p>

                    </div>
                )
            })}
        </div>
    </div>

  )
}

export default PostEdit
