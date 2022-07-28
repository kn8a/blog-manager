
import { useEffect, useState } from "react";
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from './pages/Main'
import PostEdit from "./pages/PostEdit";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Login";
import PostCreate from "./pages/PostCreate";

function App() {

  const [token, setToken] = useState(null)
  
  const tokenToState = (JWTtoken) => { //gets token from Login page
    setToken(JWTtoken)
  }

  return (
    <div className='container is-max-desktop'>
    <Router>
      <Routes>
        <Route path='/login' element={<Login token={token} tokenToState={tokenToState}/>} />
        <Route path='/' element={<Main token={token}/>} />
        <Route path='/posts/:postId' exact element={<PostEdit token={token}/>} />
        <Route path='/posts/new' exact element={<PostCreate token={token}/>} />
      </Routes>
    </Router>
    <ToastContainer/>
    </div>
  );
}

export default App;
